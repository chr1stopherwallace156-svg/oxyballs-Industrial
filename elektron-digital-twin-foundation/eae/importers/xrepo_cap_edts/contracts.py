"""Load versioned capture-ios contracts. Never hand-recreate authority mappings."""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator

BUNDLE_DIR = Path(__file__).resolve().parents[2] / "contracts" / "capture_ios_0_1_4"

CONTRACT_FILES = {
    "EvidenceManifest": "EvidenceManifest.v1.0.0.schema.json",
    "PackageInventory": "PackageInventory.v1.0.0.schema.json",
    "CaptureDeviceProvenance": "CaptureDeviceProvenance.v1.0.0.schema.json",
    "IngestionStatus": "IngestionStatus.v1.0.0.schema.json",
    "StatusOwnerRegistry": "status-owner-registry.json",
    "StatusTransitions": "status-transitions.json",
}

PROVENANCE_FILENAME = "VENDOR_PROVENANCE.json"
MANIFEST_FILENAME = "CONTRACT_BUNDLE_MANIFEST.json"


class ContractBundleError(Exception):
    """Raised when vendored contracts fail integrity / provenance checks."""

    def __init__(self, reason_code: str, message: str, details: dict[str, Any] | None = None):
        super().__init__(message)
        self.reason_code = reason_code
        self.details = details or {}


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def compute_bundle_digest(digests: dict[str, str]) -> str:
    lines = "\n".join(f"{k}:{digests[k]}" for k in sorted(digests))
    return hashlib.sha256(lines.encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class ContractBundle:
    root: Path
    files: dict[str, Path]
    digests: dict[str, str]
    registry: dict[str, Any]
    transitions: dict[str, Any]
    bundle_digest: str
    registry_schema_version: str
    provenance: dict[str, Any]

    def owner_of(self, code: str) -> str | None:
        for entry in self.registry.get("statuses", []):
            if entry.get("code") == code:
                return entry.get("owner")
        return None

    def is_edts_owned(self, code: str) -> bool:
        return self.owner_of(code) == "EDTS"

    def known_status(self, code: str) -> bool:
        return self.owner_of(code) is not None

    def capture_transition_ok(self, frm: str, to: str) -> bool:
        pairs = {tuple(p) for p in self.transitions.get("capture_side_runtime", [])}
        return (frm, to) in pairs

    def schema_validator(self, name: str) -> Draft202012Validator:
        schema = json.loads(self.files[name].read_text(encoding="utf-8"))
        return Draft202012Validator(schema)


def _read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def load_contract_bundle(
    root: Path | None = None,
    *,
    enforce_pinned_digest: bool = True,
) -> ContractBundle:
    """
    Load vendored capture contracts.

    When enforce_pinned_digest is True (default), computed digests must match
    VENDOR_PROVENANCE.json / CONTRACT_BUNDLE_MANIFEST.json pinned values or
    ContractBundleError(CONTRACT_BUNDLE_DIGEST_MISMATCH) is raised.
    """
    base = Path(root) if root else BUNDLE_DIR
    files: dict[str, Path] = {}
    digests: dict[str, str] = {}
    for name, filename in CONTRACT_FILES.items():
        path = base / filename
        if not path.is_file():
            raise FileNotFoundError(f"missing capture contract: {path}")
        files[name] = path
        digests[name] = sha256_file(path)

    bundle_digest = compute_bundle_digest(digests)

    provenance_path = base / PROVENANCE_FILENAME
    if provenance_path.is_file():
        try:
            provenance = _read_json(provenance_path)
        except json.JSONDecodeError as exc:
            raise ContractBundleError(
                "CONTRACT_BUNDLE_DIGEST_MISMATCH",
                f"VENDOR_PROVENANCE.json unreadable: {exc}",
                {"bundle_digest": bundle_digest},
            ) from exc
    else:
        provenance = {
            "source_repository": "elektron-capture-ios",
            "source_tag": "unknown",
            "source_commit": "unknown",
            "contract_bundle_digest": None,
            "vendored_at": None,
            "notes": ["VENDOR_PROVENANCE.json missing"],
        }

    if enforce_pinned_digest:
        pinned = provenance.get("contract_bundle_digest")
        if not pinned:
            raise ContractBundleError(
                "CONTRACT_BUNDLE_DIGEST_MISMATCH",
                "VENDOR_PROVENANCE.json missing contract_bundle_digest",
                {"bundle_digest": bundle_digest},
            )
        if pinned != bundle_digest:
            raise ContractBundleError(
                "CONTRACT_BUNDLE_DIGEST_MISMATCH",
                "vendored contract bytes do not match pinned contract_bundle_digest",
                {
                    "expected": pinned,
                    "actual": bundle_digest,
                    "contract_digests": digests,
                    "source_tag": provenance.get("source_tag"),
                    "source_commit": provenance.get("source_commit"),
                },
            )
        manifest_path = base / MANIFEST_FILENAME
        if manifest_path.is_file():
            try:
                manifest = _read_json(manifest_path)
            except json.JSONDecodeError as exc:
                raise ContractBundleError(
                    "CONTRACT_BUNDLE_DIGEST_MISMATCH",
                    f"CONTRACT_BUNDLE_MANIFEST.json unreadable: {exc}",
                    {"bundle_digest": bundle_digest},
                ) from exc
            manifest_digest = manifest.get("bundle_digest")
            if manifest_digest and manifest_digest != bundle_digest:
                raise ContractBundleError(
                    "CONTRACT_BUNDLE_DIGEST_MISMATCH",
                    "CONTRACT_BUNDLE_MANIFEST.json digest disagrees with computed bundle",
                    {"expected": manifest_digest, "actual": bundle_digest},
                )

    try:
        registry = _read_json(files["StatusOwnerRegistry"])
        transitions = _read_json(files["StatusTransitions"])
    except json.JSONDecodeError as exc:
        raise ContractBundleError(
            "CONTRACT_BUNDLE_DIGEST_MISMATCH",
            f"contract JSON unreadable after digest gate: {exc}",
            {"bundle_digest": bundle_digest},
        ) from exc

    return ContractBundle(
        root=base,
        files=files,
        digests=digests,
        registry=registry,
        transitions=transitions,
        bundle_digest=bundle_digest,
        registry_schema_version=str(registry.get("schema_version", "")),
        provenance=provenance,
    )


def write_bundle_manifest(bundle: ContractBundle, dest: Path) -> None:
    payload = {
        "schema_id": "CaptureContractBundleManifest",
        "schema_version": "1.0.0",
        "capture_origin_version": "0.1.4",
        "registry_schema_version": bundle.registry_schema_version,
        "bundle_digest": bundle.bundle_digest,
        "contract_digests": bundle.digests,
        "source_tag": bundle.provenance.get("source_tag"),
        "source_commit": bundle.provenance.get("source_commit"),
        "notes": [
            "EDTS must load these digests; do not recreate status ownership mappings.",
        ],
    }
    dest.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
