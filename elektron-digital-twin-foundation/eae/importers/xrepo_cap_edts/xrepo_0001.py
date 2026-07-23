"""XREPO-CAP-EDTS-0001 — canonical compatibility (no commit)."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any

from .canonical_json import dumps_canonical, loads_json_object
from .contracts import ContractBundle, load_contract_bundle
from .result import DualGateResult

REQUIRED_FILES = (
    "manifest.json",
    "package_inventory.json",
    "capture_device.json",
    "package_status.json",
)

ID_FIELDS = {
    "session_id": re.compile(r"^SESSION-"),
    "artifact_id": re.compile(r"^ART-"),
    "package_id": re.compile(r"^EVD-"),
    "capture_installation_id": re.compile(r"."),
    "device_enrollment_id": re.compile(r"."),
}


def _sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _fail(codes: list[str], details: dict[str, Any]) -> DualGateResult:
    return DualGateResult(
        canonical_compatibility="FAIL",
        secure_ingestion="NOT_RUN",
        committed=False,
        reason_codes=codes,
        details=details,
    )


def evaluate_canonical_compatibility(
    package_dir: Path | str,
    *,
    contracts: ContractBundle | None = None,
    expected_bundle_digest: str | None = None,
    expected_ids: dict[str, str] | None = None,
) -> DualGateResult:
    """
    Prove semantic + cryptographic compatibility of an extracted .edts-pkg directory.

    Does not perform secure ZIP quarantine (that is XREPO-0002).
    Never commits evidence.
    """
    root = Path(package_dir)
    bundle = contracts or load_contract_bundle()
    details: dict[str, Any] = {
        "package_dir": str(root),
        "registry_schema_version": bundle.registry_schema_version,
        "contract_digests": dict(bundle.digests),
        "bundle_digest": bundle.bundle_digest,
    }

    if expected_bundle_digest is not None and expected_bundle_digest != bundle.bundle_digest:
        return _fail(
            ["CONTRACT_BUNDLE_DIGEST_MISMATCH"],
            {
                **details,
                "expected_bundle_digest": expected_bundle_digest,
                "actual_bundle_digest": bundle.bundle_digest,
            },
        )

    for name in REQUIRED_FILES:
        if not (root / name).is_file():
            return _fail(["MISSING_REQUIRED_FILE"], {**details, "missing": name})

    # --- package_status: capture may only assert CAPTURE-owned codes ---
    status_raw = (root / "package_status.json").read_bytes()
    try:
        status_obj = loads_json_object(status_raw)
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        return _fail(["NONCANONICAL_MANIFEST"], {**details, "error": str(exc), "file": "package_status.json"})

    asserted = status_obj.get("asserted_statuses") or []
    if isinstance(status_obj.get("capture_side_status"), str):
        asserted = list(asserted) + [status_obj["capture_side_status"]]
    asserted = list(dict.fromkeys(asserted))  # preserve order, unique
    details["asserted_statuses"] = asserted

    for code in asserted:
        if not bundle.known_status(code):
            return _fail(["UNKNOWN_STATUS"], {**details, "status": code})
        if bundle.is_edts_owned(code):
            return _fail(
                ["CAPTURE_ASSERTED_EDTS_STATUS"],
                {**details, "status": code, "owner": "EDTS"},
            )
        if bundle.owner_of(code) not in ("CAPTURE",):
            # JOINT / other planes are not capture-side runtime assertions
            if code not in {
                e["code"]
                for e in bundle.registry["statuses"]
                if e.get("owner") == "CAPTURE" and e.get("plane") == "runtime_capture"
            }:
                return _fail(
                    ["CAPTURE_ASSERTED_NON_CAPTURE_STATUS"],
                    {**details, "status": code, "owner": bundle.owner_of(code)},
                )

    # --- schemas + canonical JSON for structured docs ---
    checks = [
        ("manifest.json", "EvidenceManifest", "manifest"),
        ("package_inventory.json", "PackageInventory", "inventory"),
        ("capture_device.json", "CaptureDeviceProvenance", "device"),
    ]
    parsed: dict[str, Any] = {"package_status": status_obj}

    for filename, schema_name, key in checks:
        path = root / filename
        raw = path.read_bytes()
        try:
            obj = loads_json_object(raw)
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            return _fail(["NONCANONICAL_MANIFEST"], {**details, "error": str(exc), "file": filename})

        schema_version = obj.get("schema_version")
        validator = bundle.schema_validator(schema_name)
        # Unsupported schema versions fail closed via const in schema, but surface clear code.
        if schema_version not in (None, "1.0.0"):
            return _fail(
                ["UNSUPPORTED_SCHEMA_VERSION"],
                {**details, "file": filename, "schema_version": schema_version},
            )

        errors = sorted(validator.iter_errors(obj), key=lambda e: list(e.path))
        if errors:
            # Distinguish const schema_version failures
            for err in errors:
                if list(err.path) == ["schema_version"]:
                    return _fail(
                        ["UNSUPPORTED_SCHEMA_VERSION"],
                        {**details, "file": filename, "schema_version": schema_version, "error": err.message},
                    )
            return _fail(
                ["SCHEMA_VALIDATION_FAILED"],
                {
                    **details,
                    "file": filename,
                    "errors": [e.message for e in errors[:8]],
                },
            )

        try:
            canonical = dumps_canonical(obj)
        except (TypeError, ValueError) as exc:
            return _fail(["NONCANONICAL_MANIFEST"], {**details, "file": filename, "error": str(exc)})

        if raw != canonical:
            # Allow UTF-8 BOM-free exact match only; pretty-printed on-disk fails.
            return _fail(
                ["NONCANONICAL_MANIFEST"],
                {
                    **details,
                    "file": filename,
                    "packaged_sha256": _sha256_bytes(raw),
                    "canonical_sha256": _sha256_bytes(canonical),
                },
            )

        details[f"{key}_canonical_sha256"] = _sha256_bytes(canonical)
        parsed[key] = obj

    inventory = parsed["inventory"]
    manifest = parsed["manifest"]
    device = parsed["device"]

    # Inventory self-hash policy: package_inventory.json omitted from entries.
    entry_paths = [e["path"] for e in inventory["entries"]]
    if "package_inventory.json" in entry_paths:
        return _fail(
            ["INVENTORY_SELF_HASH_POLICY_VIOLATION"],
            {**details, "note": "Phase 1 omits package_inventory.json from entries"},
        )

    # Every on-disk file (except inventory itself) must be declared; every entry must exist.
    on_disk: list[str] = []
    for p in sorted(root.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(root).as_posix()
        if rel == "package_inventory.json":
            continue
        on_disk.append(rel)

    missing = sorted(set(entry_paths) - set(on_disk))
    extra = sorted(set(on_disk) - set(entry_paths))
    if missing or extra:
        return _fail(
            ["INVENTORY_MISMATCH"],
            {**details, "missing_entries": missing, "undeclared_files": extra},
        )

    for entry in inventory["entries"]:
        path = root / entry["path"]
        data = path.read_bytes()
        size = len(data)
        digest = _sha256_bytes(data)
        if size != int(entry["byte_size"]):
            return _fail(
                ["HASH_MISMATCH"],
                {
                    **details,
                    "path": entry["path"],
                    "reason": "byte_size",
                    "expected": entry["byte_size"],
                    "actual": size,
                },
            )
        if digest != entry["sha256"]:
            return _fail(
                ["HASH_MISMATCH"],
                {
                    **details,
                    "path": entry["path"],
                    "reason": "sha256",
                    "expected": entry["sha256"],
                    "actual": digest,
                },
            )

    # Manifest artifact hashes must match payload bytes.
    for art in manifest.get("artifacts", []):
        rel = art["relative_path"]
        path = root / rel
        if not path.is_file():
            return _fail(["HASH_MISMATCH"], {**details, "path": rel, "reason": "missing_artifact"})
        actual = _sha256_file(path)
        if actual != art["sha256"]:
            return _fail(
                ["HASH_MISMATCH"],
                {
                    **details,
                    "path": rel,
                    "reason": "manifest_artifact_sha256",
                    "expected": art["sha256"],
                    "actual": actual,
                },
            )
        if art.get("authority") == "ENGINEERING_VERIFIED":
            return _fail(
                ["FORBIDDEN_AUTHORITY_CLAIM"],
                {**details, "artifact_id": art.get("artifact_id")},
            )

    # Identifier preservation / shape
    ids = {
        "session_id": manifest.get("session_id"),
        "package_id": inventory.get("package_id"),
        "artifact_id": (manifest.get("artifacts") or [{}])[0].get("artifact_id"),
        "capture_installation_id": device.get("capture_installation_id"),
        "device_enrollment_id": device.get("device_enrollment_id"),
        "device_profile_id": device.get("device_profile_id"),
        "hardware_model_identifier": device.get("hardware_model_identifier"),
    }
    details["preserved_ids"] = ids

    if expected_ids:
        for key, expected in expected_ids.items():
            if ids.get(key) != expected:
                return _fail(
                    ["IDENTIFIER_MUTATION"],
                    {
                        **details,
                        "field": key,
                        "expected": expected,
                        "actual": ids.get(key),
                    },
                )

    for key, pattern in ID_FIELDS.items():
        val = ids.get(key)
        if val is None:
            continue
        if not pattern.search(str(val)):
            return _fail(
                ["IDENTIFIER_MUTATION"],
                {**details, "field": key, "value": val, "reason": "shape"},
            )

    # Provenance: display name must not equal authoritative hardware id (separation).
    if device.get("device_display_name") == device.get("hardware_model_identifier"):
        return _fail(
            ["PROVENANCE_DISPLAY_AUTHORITY_COLLISION"],
            {**details},
        )

    # Capture-side transition sanity: if previous_status provided, must be legal.
    prev = status_obj.get("previous_capture_side_status")
    cur = status_obj.get("capture_side_status")
    if prev and cur and not bundle.capture_transition_ok(prev, cur):
        # Allow equal (idempotent) only if same code
        if prev != cur:
            return _fail(
                ["ILLEGAL_STATUS_TRANSITION"],
                {**details, "from": prev, "to": cur},
            )

    return DualGateResult(
        canonical_compatibility="PASS",
        secure_ingestion="NOT_RUN",
        committed=False,
        reason_codes=[],
        details=details,
    )
