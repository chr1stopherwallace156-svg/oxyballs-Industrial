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
from .manifest import (
    build_manifest,
    manifests_physically_equivalent,
    read_manifest,
    write_manifest_atomic,
)
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
) -> dict[str, Any]:
    """
    Accept a local file into a content-addressed store with atomic manifest.

    Physical identity = complete SHA-256 of source bytes.
    Policy version is evaluation metadata only and never creates a second physical asset.
    Does not modify the source file.
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
        # Always allowed: execution log (not authoritative asset state)
        log_path = registry.write_execution_log(execution_id, dict(result))
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
    asset_id = asset_id_from_hash(sha)

    detection = detect_format(source)
    result["details"]["detection"] = detection
    ext = detection.get("extension_claim")
    detected = detection["detected_format"]

    # Security path: ZIP inspection (test/security scope; not a V0 asset format)
    if detected == "ZIP":
        safety = inspect_zip_security(source)
        result["details"]["zip_security"] = safety
        if not safety["safe"] or safety.get("error"):
            qdir = registry.quarantine_dir / sha
            extract_attempt = safe_extract_zip_to_quarantine(source, qdir)
            result["details"]["extract_attempt"] = extract_attempt
            return _finish(errors.REJECT_SECURITY, details=result["details"])
        return _finish(
            errors.REJECT_UNSUPPORTED,
            details={**result["details"], "reason": "zip_not_in_v0_allowlist"},
        )

    if ext not in ALLOWED_EXTENSIONS:
        return _finish(
            errors.REJECT_UNSUPPORTED,
            details={**result["details"], "reason": "unsupported_extension", "extension": ext},
        )

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
        # Non-OBJ binary/bytes named .obj → type mismatch quarantine
        q_target = registry.quarantine_dir / f"{sha}{source.suffix}"
        if not q_target.exists():
            shutil.copy2(source, q_target)
        return _finish(
            errors.QUARANTINE_TYPE_MISMATCH,
            details={
                **result["details"],
                "reason": "non_obj_bytes_with_obj_extension",
                "quarantine_copy": str(q_target),
            },
            state_mutation=False,
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

    proposed = build_manifest(
        asset_id=asset_id,
        original_filename=source.name,
        detected_format=detected,
        format_detection_method=detection["format_detection_method"],
        format_detection_confidence=detection["format_detection_confidence"],
        file_size_bytes=size,
        sha256_hex=sha,
        content_address=addr,
        created_at=_utc_now(),
        source_kind=source_kind,
    )

    # Physical identity: complete SHA-256 only (policy does not change asset identity)
    existing = registry.lookup(sha)
    mpath = registry.manifest_path(sha)
    content_dst = registry.content_path(sha)

    if existing:
        return _handle_existing(registry, store, existing, mpath, proposed, result, _finish, execution_id)

    # Orphaned asset dir / manifest without registry entry → integrity conflict
    if mpath.exists() or content_dst.exists():
        if mpath.exists():
            try:
                on_disk = read_manifest(mpath)
            except Exception as exc:
                return _finish(
                    errors.REGISTRY_INTEGRITY_CONFLICT,
                    details={**result["details"], "reason": "unreadable_orphan_manifest", "error": str(exc)},
                )
            if manifests_physically_equivalent(on_disk, proposed):
                # Heal index if content matches (still one physical asset)
                try:
                    registry.register(sha, asset_id, str(mpath.relative_to(store)))
                except ValueError:
                    pass
                registry.write_evaluation_log(
                    execution_id,
                    {
                        "asset_id": asset_id,
                        "sha256": sha,
                        "ingestion_policy_version": INGESTION_POLICY_VERSION,
                        "note": "healed_registry_index_from_equivalent_orphan",
                    },
                )
                return _finish(
                    errors.ALREADY_INGESTED,
                    asset_id=asset_id,
                    existing_asset_id=asset_id,
                    state_mutation=False,
                    manifest_path=str(mpath),
                    details={**result["details"], "registry_count": registry.count_authoritative()},
                )
        return _finish(
            errors.REGISTRY_INTEGRITY_CONFLICT,
            details={
                **result["details"],
                "reason": "orphan_asset_path_without_matching_identity",
                "manifest_exists": mpath.exists(),
                "content_exists": content_dst.exists(),
            },
        )

    # First ingestion — immutable content copy + atomic manifest + registry
    adir = registry.asset_dir(sha)
    adir.mkdir(parents=True, exist_ok=False)
    shutil.copyfile(source, content_dst)
    if sha256_hex_file(content_dst) != sha:
        shutil.rmtree(adir, ignore_errors=True)
        return _finish(errors.REJECT_SECURITY, details={"reason": "content_copy_hash_mismatch"})

    try:
        write_status = write_manifest_atomic(mpath, proposed, allow_overwrite=False)
    except errors.ManifestConflictError as exc:
        return _finish(
            errors.REGISTRY_INTEGRITY_CONFLICT,
            details={**result["details"], "reason": str(exc)},
        )

    if write_status == "EQUIVALENT_EXISTING":
        # Race: another writer landed equivalent manifest
        if not registry.lookup(sha):
            registry.register(sha, asset_id, str(mpath.relative_to(store)))
        return _finish(
            errors.ALREADY_INGESTED,
            asset_id=asset_id,
            existing_asset_id=asset_id,
            state_mutation=False,
            manifest_path=str(mpath),
        )

    registry.register(sha, asset_id, str(mpath.relative_to(store)))
    return _finish(
        errors.ACCEPTED,
        asset_id=asset_id,
        existing_asset_id=None,
        state_mutation=True,
        manifest_path=str(mpath),
        details={**result["details"], "registry_count": registry.count_authoritative()},
    )


def _handle_existing(
    registry: AssetRegistry,
    store: Path,
    existing: dict[str, Any],
    mpath: Path,
    proposed: dict[str, Any],
    result: dict[str, Any],
    _finish,
    execution_id: str,
) -> dict[str, Any]:
    """Same bytes → same asset. Conflicting manifest → REGISTRY_INTEGRITY_CONFLICT."""
    asset_id = existing["asset_id"]
    if not mpath.exists():
        return _finish(
            errors.REGISTRY_INTEGRITY_CONFLICT,
            asset_id=asset_id,
            existing_asset_id=asset_id,
            details={**result["details"], "reason": "registry_entry_missing_manifest"},
        )
    try:
        on_disk = read_manifest(mpath)
    except Exception as exc:
        return _finish(
            errors.REGISTRY_INTEGRITY_CONFLICT,
            asset_id=asset_id,
            existing_asset_id=asset_id,
            details={**result["details"], "reason": "manifest_unreadable", "error": str(exc)},
        )

    if not manifests_physically_equivalent(on_disk, proposed):
        return _finish(
            errors.REGISTRY_INTEGRITY_CONFLICT,
            asset_id=asset_id,
            existing_asset_id=asset_id,
            manifest_path=str(mpath),
            details={
                **result["details"],
                "reason": "existing_manifest_differs_at_same_content_identity",
                "existing_identity": {k: on_disk.get(k) for k in ("asset_id", "sha256", "content_address", "file_size_bytes", "detected_format")},
                "proposed_identity": {k: proposed.get(k) for k in ("asset_id", "sha256", "content_address", "file_size_bytes", "detected_format")},
            },
        )

    # Optional: record that a (possibly newer) policy evaluated an existing asset
    registry.write_evaluation_log(
        execution_id,
        {
            "asset_id": asset_id,
            "sha256": proposed["sha256"],
            "ingestion_policy_version": INGESTION_POLICY_VERSION,
            "result": errors.ALREADY_INGESTED,
            "note": "policy_is_evaluation_metadata_only_no_duplicate_physical_asset",
        },
    )
    return _finish(
        errors.ALREADY_INGESTED,
        asset_id=asset_id,
        existing_asset_id=asset_id,
        state_mutation=False,
        manifest_path=str(mpath),
        details={**result["details"], "registry_count": registry.count_authoritative()},
    )
