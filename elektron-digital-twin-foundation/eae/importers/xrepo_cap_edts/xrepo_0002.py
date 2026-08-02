"""XREPO-CAP-EDTS-0002 — secure quarantine ingestion for .edts-pkg archives."""

from __future__ import annotations

import hashlib
import json
import shutil
import unicodedata
import uuid
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from eae.core.quarantine import (
    _is_symlink_member,
    normalize_zip_entry_name,
    zip_entry_is_unsafe,
)

from .contracts import ContractBundle, load_contract_bundle
from .result import DualGateResult
from .xrepo_0001 import evaluate_canonical_compatibility

# Phase 1 transport limits (tight for fixtures; raise via policy later).
MAX_UPLOAD_BYTES = 32 * 1024 * 1024
MAX_FILE_COUNT = 64
MAX_TOTAL_UNCOMPRESSED = 64 * 1024 * 1024
MAX_SINGLE_UNCOMPRESSED = 32 * 1024 * 1024
MAX_COMPRESSION_RATIO = 100.0
FORBIDDEN_NESTED_SUFFIXES = (".zip", ".edts-pkg", ".tar", ".tgz", ".gz")

# EDTS may assign these at commit — never upgrade content verification here.
COMMIT_EDTS_STATUSES = (
    "INGESTED_INTEGRITY_VERIFIED",
    "CONTENT_UNVERIFIED",
)


def inspect_edts_pkg_archive(path: Path) -> dict[str, Any]:
    """Inspect ZIP metadata before extraction; return structured safety report."""
    report: dict[str, Any] = {
        "archive": str(path),
        "safe": True,
        "reason_codes": [],
        "entries": [],
    }
    if not path.is_file():
        report["safe"] = False
        report["reason_codes"].append("NOT_A_FILE")
        return report

    size = path.stat().st_size
    report["upload_size_bytes"] = size
    if size > MAX_UPLOAD_BYTES:
        report["safe"] = False
        report["reason_codes"].append("UPLOAD_SIZE_EXCEEDED")

    try:
        zf = zipfile.ZipFile(path)
    except zipfile.BadZipFile as exc:
        report["safe"] = False
        report["reason_codes"].append("BAD_ZIP")
        report["error"] = str(exc)
        return report

    with zf:
        infos = zf.infolist()
        report["entry_count"] = len(infos)
        if len(infos) > MAX_FILE_COUNT:
            report["safe"] = False
            report["reason_codes"].append("FILE_COUNT_EXCEEDED")

        total_unc = 0
        norm_map: dict[str, str] = {}
        case_map: dict[str, str] = {}
        nfc_map: dict[str, str] = {}

        for info in infos:
            name = info.filename
            report["entries"].append(name)

            if info.flag_bits & 0x1:
                report["safe"] = False
                report["reason_codes"].append("ENCRYPTED_ENTRY")

            if info.compress_type not in (zipfile.ZIP_STORED, zipfile.ZIP_DEFLATED):
                report["safe"] = False
                report["reason_codes"].append("UNSUPPORTED_COMPRESSION")

            if zip_entry_is_unsafe(name):
                report["safe"] = False
                if name.startswith("/") or Path(name).is_absolute():
                    report["reason_codes"].append("ABSOLUTE_PATH")
                elif ".." in Path(normalize_zip_entry_name(name)).parts:
                    report["reason_codes"].append("PATH_TRAVERSAL")
                else:
                    report["reason_codes"].append("UNSAFE_PATH")

            if _is_symlink_member(info):
                report["safe"] = False
                report["reason_codes"].append("SYMLINK_ENTRY")

            base = normalize_zip_entry_name(name).rstrip("/").lower()
            if any(base.endswith(sfx) for sfx in FORBIDDEN_NESTED_SUFFIXES):
                report["safe"] = False
                report["reason_codes"].append("NESTED_ARCHIVE")

            if not info.is_dir():
                unc = int(info.file_size)
                comp = int(info.compress_size) or 1
                total_unc += unc
                if unc > MAX_SINGLE_UNCOMPRESSED:
                    report["safe"] = False
                    report["reason_codes"].append("ENTRY_SIZE_EXCEEDED")
                ratio = unc / comp
                if ratio > MAX_COMPRESSION_RATIO and unc > 1024 * 1024:
                    report["safe"] = False
                    report["reason_codes"].append("COMPRESSION_BOMB")

            norm = normalize_zip_entry_name(name).rstrip("/")
            if not norm:
                continue
            if norm in norm_map:
                report["safe"] = False
                report["reason_codes"].append("DUPLICATE_ENTRY")
            else:
                norm_map[norm] = name

            case_key = norm.casefold()
            if case_key in case_map and case_map[case_key] != norm:
                report["safe"] = False
                report["reason_codes"].append("CASE_COLLISION")
            else:
                case_map[case_key] = norm

            nfc = unicodedata.normalize("NFC", norm)
            if nfc in nfc_map and nfc_map[nfc] != norm:
                report["safe"] = False
                report["reason_codes"].append("UNICODE_NORMALIZATION_COLLISION")
            else:
                nfc_map[nfc] = norm

        report["total_uncompressed_bytes"] = total_unc
        if total_unc > MAX_TOTAL_UNCOMPRESSED:
            report["safe"] = False
            report["reason_codes"].append("TOTAL_UNCOMPRESSED_EXCEEDED")

    seen: set[str] = set()
    ordered: list[str] = []
    for c in report["reason_codes"]:
        if c not in seen:
            seen.add(c)
            ordered.append(c)
    report["reason_codes"] = ordered
    report["safe"] = report["safe"] and not ordered
    return report


def _extract_declared_only(
    archive: Path,
    quarantine_dir: Path,
    declared_paths: set[str] | None,
) -> dict[str, Any]:
    quarantine_dir.mkdir(parents=True, exist_ok=True)
    root = quarantine_dir.resolve()
    extracted: list[str] = []
    with zipfile.ZipFile(archive) as zf:
        for info in zf.infolist():
            if info.is_dir():
                continue
            norm = normalize_zip_entry_name(info.filename)
            if declared_paths is not None and norm not in declared_paths:
                return {
                    "ok": False,
                    "reason_codes": ["UNDECLARED_FILES"],
                    "path": norm,
                }
            if zip_entry_is_unsafe(info.filename) or _is_symlink_member(info):
                return {
                    "ok": False,
                    "reason_codes": ["UNSAFE_PATH"],
                    "path": info.filename,
                }
            target = (root / norm).resolve()
            if not str(target).startswith(str(root)):
                return {
                    "ok": False,
                    "reason_codes": ["PATH_TRAVERSAL"],
                    "path": info.filename,
                }
            target.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(info) as src, target.open("wb") as out:
                out.write(src.read())
            extracted.append(norm)
    return {"ok": True, "extracted": extracted}


def _cleanup(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path, ignore_errors=True)


def _preserved_ids_from_package(package_dir: Path) -> dict[str, Any]:
    manifest = json.loads((package_dir / "manifest.json").read_text(encoding="utf-8"))
    inventory = json.loads((package_dir / "package_inventory.json").read_text(encoding="utf-8"))
    device = json.loads((package_dir / "capture_device.json").read_text(encoding="utf-8"))
    return {
        "session_id": manifest.get("session_id"),
        "package_id": inventory.get("package_id"),
        "artifact_ids": [a.get("artifact_id") for a in manifest.get("artifacts", [])],
        "capture_installation_id": device.get("capture_installation_id"),
        "device_enrollment_id": device.get("device_enrollment_id"),
    }


def _atomic_commit(
    quarantine: Path,
    store: Path,
    *,
    ingestion_id: str,
    inv_digest: str,
    preserved_ids: dict[str, Any],
    contract_bundle_digest: str,
) -> dict[str, Any]:
    """
    Stage package + commitment record together, then atomically promote.

    Filesystem-level transactional boundary for Phase 1 (no separate DB yet):
    both the evidence tree and edts_commitment.json live under the staging
    directory and become visible only after rename succeeds. On any failure,
    staging is removed so no permanent partial record remains.
    """
    evidence_root = store / "evidence"
    evidence_root.mkdir(parents=True, exist_ok=True)
    commit_dir = evidence_root / f"EVD-{inv_digest}"
    record_name = "edts_commitment.json"

    if commit_dir.exists():
        existing_record = commit_dir / record_name
        if not existing_record.is_file():
            raise RuntimeError("commit_dir exists without edts_commitment.json")
        existing = json.loads(existing_record.read_text(encoding="utf-8"))
        if existing.get("inventory_sha256") != inv_digest:
            raise RuntimeError("idempotent path identity conflict")
        if existing.get("preserved_ids") != preserved_ids:
            raise RuntimeError("idempotent path would mutate preserved IDs")
        # Never upgrade CONTENT_UNVERIFIED on re-ingest.
        if existing.get("edts_status") != list(COMMIT_EDTS_STATUSES):
            raise RuntimeError("idempotent path would alter EDTS status tuple")
        return {
            "commit_path": str(commit_dir),
            "idempotent": True,
            "edts_status": list(COMMIT_EDTS_STATUSES),
            "commitment_record": existing,
        }

    staging = evidence_root / f".staging-{ingestion_id}"
    try:
        if staging.exists():
            _cleanup(staging)
        shutil.copytree(quarantine, staging)

        commitment = {
            "schema_id": "EdtsPackageCommitment",
            "schema_version": "1.0.0",
            "ingestion_id": ingestion_id,
            "inventory_sha256": inv_digest,
            "committed_at_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "edts_status": list(COMMIT_EDTS_STATUSES),
            "content_verification": "CONTENT_UNVERIFIED",
            "preserved_ids": preserved_ids,
            "contract_bundle_digest": contract_bundle_digest,
            "notes": [
                "Integrity verified only. Content remains unverified.",
                "Importer must not mutate incoming evidence/session/artifact IDs.",
            ],
        }
        (staging / record_name).write_text(
            json.dumps(commitment, indent=2, sort_keys=True) + "\n",
            encoding="utf-8",
        )

        # Atomic promote: staged tree (package + record) becomes the commit.
        staging.rename(commit_dir)
        return {
            "commit_path": str(commit_dir),
            "idempotent": False,
            "edts_status": list(COMMIT_EDTS_STATUSES),
            "commitment_record": commitment,
        }
    except Exception:
        _cleanup(staging)
        raise


def ingest_edts_pkg(
    archive_path: Path | str,
    store_root: Path | str,
    *,
    contracts: ContractBundle | None = None,
    expected_bundle_digest: str | None = None,
    commit: bool = True,
) -> DualGateResult:
    """
    Secure receive → quarantine → inspect → extract → XREPO-0001 → atomic commit.

    Commit only when 0001 PASS and 0002 PASS.
    Quarantine cleaned on all failure paths. Staging cleaned if promote fails.
    """
    archive = Path(archive_path)
    store = Path(store_root)
    bundle = contracts or load_contract_bundle()
    ingestion_id = f"ING-{uuid.uuid4().hex}"
    quarantine = store / "quarantine" / ingestion_id
    details: dict[str, Any] = {
        "ingestion_id": ingestion_id,
        "archive": str(archive),
        "contract_bundle_digest": bundle.bundle_digest,
        "vendor_provenance": {
            "source_tag": bundle.provenance.get("source_tag"),
            "source_commit": bundle.provenance.get("source_commit"),
            "source_remote_url": bundle.provenance.get("source_remote_url"),
        },
    }

    try:
        safety = inspect_edts_pkg_archive(archive)
        details["archive_inspection"] = safety
        if not safety["safe"]:
            return DualGateResult(
                canonical_compatibility="NOT_RUN",
                secure_ingestion="FAIL",
                committed=False,
                reason_codes=list(safety["reason_codes"]) or ["ARCHIVE_REJECTED"],
                ingestion_id=ingestion_id,
                details=details,
            )

        first = _extract_declared_only(archive, quarantine, declared_paths=None)
        if not first.get("ok"):
            return DualGateResult(
                canonical_compatibility="NOT_RUN",
                secure_ingestion="FAIL",
                committed=False,
                reason_codes=list(first.get("reason_codes") or ["EXTRACT_FAILED"]),
                ingestion_id=ingestion_id,
                details={**details, "extract": first},
            )

        inv_path = quarantine / "package_inventory.json"
        if not inv_path.is_file():
            return DualGateResult(
                canonical_compatibility="NOT_RUN",
                secure_ingestion="FAIL",
                committed=False,
                reason_codes=["MISSING_INVENTORY"],
                ingestion_id=ingestion_id,
                details=details,
            )

        inventory = json.loads(inv_path.read_text(encoding="utf-8"))
        declared = {e["path"] for e in inventory.get("entries", [])}
        allowed_on_disk = declared | {"package_inventory.json"}

        extras = sorted(set(first["extracted"]) - allowed_on_disk)
        if extras:
            return DualGateResult(
                canonical_compatibility="NOT_RUN",
                secure_ingestion="FAIL",
                committed=False,
                reason_codes=["UNDECLARED_FILES"],
                ingestion_id=ingestion_id,
                details={**details, "undeclared_files": extras},
            )

        missing = sorted(declared - set(first["extracted"]))
        if missing:
            return DualGateResult(
                canonical_compatibility="NOT_RUN",
                secure_ingestion="FAIL",
                committed=False,
                reason_codes=["INVENTORY_INCOMPLETE"],
                ingestion_id=ingestion_id,
                details={**details, "missing": missing},
            )

        compat = evaluate_canonical_compatibility(
            quarantine,
            contracts=bundle,
            expected_bundle_digest=expected_bundle_digest,
        )
        details["xrepo_0001"] = compat.to_dict()

        if compat.canonical_compatibility != "PASS":
            return DualGateResult(
                canonical_compatibility="FAIL",
                secure_ingestion="PASS",
                committed=False,
                reason_codes=list(compat.reason_codes),
                ingestion_id=ingestion_id,
                details=details,
            )

        if not commit:
            return DualGateResult(
                canonical_compatibility="PASS",
                secure_ingestion="PASS",
                committed=False,
                reason_codes=[],
                ingestion_id=ingestion_id,
                details={**details, "note": "commit disabled by caller"},
            )

        inv_digest = hashlib.sha256(inv_path.read_bytes()).hexdigest()
        preserved_ids = _preserved_ids_from_package(quarantine)
        # Guard: IDs from 0001 details must match on-disk package (no importer mutation).
        if compat.details.get("preserved_ids"):
            for key in ("session_id", "package_id", "artifact_id"):
                left = compat.details["preserved_ids"].get(key)
                if key == "artifact_id":
                    right = (preserved_ids.get("artifact_ids") or [None])[0]
                else:
                    right = preserved_ids.get(key)
                if left is not None and right is not None and left != right:
                    return DualGateResult(
                        canonical_compatibility="FAIL",
                        secure_ingestion="PASS",
                        committed=False,
                        reason_codes=["IDENTIFIER_MUTATION"],
                        ingestion_id=ingestion_id,
                        details={**details, "field": key, "left": left, "right": right},
                    )

        try:
            commit_info = _atomic_commit(
                quarantine,
                store,
                ingestion_id=ingestion_id,
                inv_digest=inv_digest,
                preserved_ids=preserved_ids,
                contract_bundle_digest=bundle.bundle_digest,
            )
        except Exception as exc:
            return DualGateResult(
                canonical_compatibility="PASS",
                secure_ingestion="FAIL",
                committed=False,
                reason_codes=["COMMIT_FAILED"],
                ingestion_id=ingestion_id,
                details={**details, "error": str(exc)},
            )

        return DualGateResult(
            canonical_compatibility="PASS",
            secure_ingestion="PASS",
            committed=True,
            reason_codes=[],
            ingestion_id=ingestion_id,
            details={**details, **commit_info},
        )
    finally:
        _cleanup(quarantine)
        # Also scrub any leaked staging for this ingestion id.
        _cleanup(store / "evidence" / f".staging-{ingestion_id}")
