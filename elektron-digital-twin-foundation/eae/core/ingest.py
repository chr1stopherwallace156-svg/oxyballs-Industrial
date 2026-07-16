"""EAE CORE INGESTION — local single-file pipeline."""

from __future__ import annotations

import shutil
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from . import errors
from .detection import detect_format, is_extension_format_match
from .hashing import asset_id_from_hash, content_address, sha256_hex_file
from .manifest import build_manifest, write_manifest_atomic
from .policy import ALLOWED_DETECTED_FORMATS, ALLOWED_EXTENSIONS, INGESTION_POLICY_VERSION
from .quarantine import inspect_zip_security, safe_extract_zip_to_quarantine
from .registry import AssetRegistry


def _utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _looks_like_broken_obj(text: str) -> bool:
    """UTF-8 text under .obj that mentions OBJ-ish tokens but fails heuristic."""
    lowered = text.lower()
    cues = ("vertex", "face", "mesh", "obj", "mtllib", "usemtl", "wavefront")
    return any(c in lowered for c in cues) or text.strip().startswith("#")


def ingest_local_file(
    source_path: Path | str,
    store_root: Path | str,
    *,
    source_kind: str = "LOCAL_FIXTURE",
    allow_zip_security_inspect: bool = True,
) -> dict[str, Any]:
    """
    Accept a local file into a content-addressed store with atomic manifest.

    Does not modify the source file.
    Does not score geometry, update passports, or download remotes.
    """
    source = Path(source_path)
    store = Path(store_root)
    execution_id = f"EXE-{uuid.uuid4().hex}"
    registry = AssetRegistry(store)

    result: dict[str, Any] = {
        "execution_id": execution_id,
        "ingestion_policy_version": INGESTION_POLICY_VERSION,
        "source_path": str(source.resolve()) if source.exists() else str(source),
        "result": None,
        "state_mutation": False,
        "asset_id": None,
        "existing_asset_id": None,
        "sha256": None,
        "content_address": None,
        "manifest_path": None,
        "details": {},
    }

    def _finish(code: str, **extra: Any) -> dict[str, Any]:
        result["result"] = code
        result.update(extra)
        result["recorded_at"] = _utc_now()
        log_path = registry.write_execution_log(execution_id, result)
        result["execution_log_path"] = str(log_path)
        return result

    if not source.is_file():
        return _finish(errors.REJECT_UNSUPPORTED, details={"reason": "not_a_file"})

    # Integrity hash first (streaming). Source never opened for write.
    sha = sha256_hex_file(source)
    addr = content_address(sha)
    size = source.stat().st_size
    result["sha256"] = sha
    result["content_address"] = addr
    result["file_size_bytes"] = size

    detection = detect_format(source)
    result["details"]["detection"] = detection
    ext = detection.get("extension_claim")
    detected = detection["detected_format"]

    # Security path: ZIP with traversal / absolute members
    if detected == "ZIP":
        safety = inspect_zip_security(source)
        result["details"]["zip_security"] = safety
        if not safety["safe"] or safety.get("error"):
            # Attempt extract into quarantine to prove no escape (will refuse)
            qdir = registry.quarantine_dir / sha
            extract_attempt = safe_extract_zip_to_quarantine(source, qdir)
            result["details"]["extract_attempt"] = extract_attempt
            return _finish(errors.REJECT_SECURITY, details=result["details"])
        # Safe ZIP is still out of V0 asset allowlist
        return _finish(
            errors.REJECT_UNSUPPORTED,
            details={**result["details"], "reason": "zip_not_in_v0_allowlist"},
        )

    # Unsupported extension (not malicious by itself)
    if ext not in ALLOWED_EXTENSIONS:
        # Harmless but unsupported types (e.g. .txt, .exe) reject cleanly
        return _finish(
            errors.REJECT_UNSUPPORTED,
            details={**result["details"], "reason": "unsupported_extension", "extension": ext},
        )

    # Claimed allowlisted extension but content does not match → quarantine mismatch
    # Special case: .obj that looks like broken Wavefront text → REJECT_MALFORMED
    if ext == "obj" and detected != "OBJ":
        sample = source.read_bytes()[:8192]
        try:
            text = sample.decode("utf-8")
            textish = True
        except UnicodeDecodeError:
            textish = False
            text = ""
        if textish and _looks_like_broken_obj(text):
            return _finish(
                errors.REJECT_MALFORMED,
                details={**result["details"], "reason": "obj_extension_but_not_parseable_obj"},
            )

    if not is_extension_format_match(ext, detected):
        q_target = registry.quarantine_dir / f"{sha}{source.suffix}"
        if not q_target.exists():
            shutil.copy2(source, q_target)
        return _finish(
            errors.QUARANTINE_TYPE_MISMATCH,
            details={
                **result["details"],
                "reason": "extension_differs_from_detected_type",
                "quarantine_copy": str(q_target),
            },
            state_mutation=False,
        )

    if detected not in ALLOWED_DETECTED_FORMATS:
        return _finish(
            errors.REJECT_UNSUPPORTED,
            details={**result["details"], "reason": "unsupported_detected_format"},
        )

    # OBJ structural minimum: at least one vertex or face directive
    if detected == "OBJ":
        if detection.get("format_detection_confidence") == "LOW":
            return _finish(
                errors.REJECT_MALFORMED,
                details={**result["details"], "reason": "obj_heuristic_confidence_low"},
            )
        sample = source.read_bytes()[:65536]
        try:
            text = sample.decode("utf-8")
        except UnicodeDecodeError:
            return _finish(errors.REJECT_MALFORMED, details={**result["details"], "reason": "obj_not_utf8"})
        has_v = any(ln.strip().startswith("v ") for ln in text.splitlines())
        has_f = any(ln.strip().startswith("f ") for ln in text.splitlines())
        if not (has_v or has_f):
            return _finish(
                errors.REJECT_MALFORMED,
                details={**result["details"], "reason": "obj_missing_v_or_f"},
            )

    # Idempotency: same bytes + same policy → same asset, no duplicate registry
    existing = registry.lookup(sha, INGESTION_POLICY_VERSION)
    if existing:
        return _finish(
            errors.ALREADY_INGESTED,
            asset_id=existing["asset_id"],
            existing_asset_id=existing["asset_id"],
            state_mutation=False,
            manifest_path=str(store / existing["manifest_path"]),
            details={**result["details"], "registry_count": registry.count_authoritative()},
        )

    # First ingestion — immutable content copy + atomic manifest + registry
    asset_id = asset_id_from_hash(sha)
    adir = registry.asset_dir(sha)
    adir.mkdir(parents=True, exist_ok=False)
    content_dst = registry.content_path(sha)
    shutil.copyfile(source, content_dst)
    # Verify stored bytes match
    if sha256_hex_file(content_dst) != sha:
        shutil.rmtree(adir, ignore_errors=True)
        return _finish(errors.REJECT_SECURITY, details={"reason": "content_copy_hash_mismatch"})

    created_at = _utc_now()
    manifest = build_manifest(
        asset_id=asset_id,
        original_filename=source.name,
        detected_format=detected,
        format_detection_method=detection["format_detection_method"],
        format_detection_confidence=detection["format_detection_confidence"],
        file_size_bytes=size,
        sha256_hex=sha,
        content_address=addr,
        created_at=created_at,
        source_kind=source_kind,
    )
    mpath = registry.manifest_path(sha)
    write_manifest_atomic(mpath, manifest)
    rel_manifest = str(mpath.relative_to(store))
    registry.register(sha, asset_id, rel_manifest)

    return _finish(
        errors.ACCEPTED,
        asset_id=asset_id,
        existing_asset_id=None,
        state_mutation=True,
        manifest_path=str(mpath),
        details={**result["details"], "registry_count": registry.count_authoritative()},
    )
