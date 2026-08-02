"""Build synthetic Phase 1 .edts-pkg directories and zip archives for XREPO tests."""

from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path
from typing import Any

from .canonical_json import dumps_canonical

# Minimal valid 1x1 JPEG (synthetic — not sensor evidence).
TINY_JPEG = bytes(
    [
        0xFF,
        0xD8,
        0xFF,
        0xE0,
        0x00,
        0x10,
        0x4A,
        0x46,
        0x49,
        0x46,
        0x00,
        0x01,
        0x01,
        0x00,
        0x00,
        0x01,
        0x00,
        0x01,
        0x00,
        0x00,
        0xFF,
        0xDB,
        0x00,
        0x43,
        0x00,
        0x08,
        0x06,
        0x06,
        0x07,
        0x06,
        0x05,
        0x08,
        0x07,
        0x07,
        0x07,
        0x09,
        0x09,
        0x08,
        0x0A,
        0x0C,
        0x14,
        0x0D,
        0x0C,
        0x0B,
        0x0B,
        0x0C,
        0x19,
        0x12,
        0x13,
        0x0F,
        0x14,
        0x1D,
        0x1A,
        0x1F,
        0x1E,
        0x1D,
        0x1A,
        0x1C,
        0x1C,
        0x20,
        0x24,
        0x2E,
        0x27,
        0x20,
        0x22,
        0x2C,
        0x23,
        0x1C,
        0x1C,
        0x28,
        0x37,
        0x29,
        0x2C,
        0x30,
        0x31,
        0x34,
        0x34,
        0x34,
        0x1F,
        0x27,
        0x39,
        0x3D,
        0x38,
        0x32,
        0x3C,
        0x2E,
        0x33,
        0x34,
        0x32,
        0xFF,
        0xC0,
        0x00,
        0x0B,
        0x08,
        0x00,
        0x01,
        0x00,
        0x01,
        0x01,
        0x01,
        0x11,
        0x00,
        0xFF,
        0xC4,
        0x00,
        0x14,
        0x00,
        0x01,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x08,
        0xFF,
        0xC4,
        0x00,
        0x14,
        0x10,
        0x01,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0xFF,
        0xDA,
        0x00,
        0x08,
        0x01,
        0x01,
        0x00,
        0x00,
        0x3F,
        0x00,
        0x7F,
        0xFF,
        0xD9,
    ]
)


def _sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _write_canonical(path: Path, obj: dict[str, Any]) -> bytes:
    raw = dumps_canonical(obj)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(raw)
    return raw


GOLDEN_IDS = {
    "session_id": "SESSION-GOLDEN-EDTS-001",
    "package_id": "EVD-GOLDEN-EDTS-001",
    "artifact_id": "ART-GOLDEN-EDTS-001",
    "capture_installation_id": "INSTALL-GOLDEN-EDTS-001",
    "device_enrollment_id": "DEVICE-GOLDEN-EDTS-001",
    "device_profile_id": "CAP-DEVICE-IPRO-LIDAR-001",
    "hardware_model_identifier": "iPhone17,1",
}


def build_golden_package_dir(dest: Path, *, mutate: str | None = None) -> dict[str, Any]:
    """
    Build a Phase 1 .edts-pkg directory. Optional mutate selects a negative fixture mode.
    """
    if dest.exists():
        import shutil

        shutil.rmtree(dest)
    dest.mkdir(parents=True)

    jpeg = TINY_JPEG
    jpeg_path = dest / "payload" / "artifact_original.jpg"
    jpeg_path.parent.mkdir(parents=True)
    jpeg_path.write_bytes(jpeg)

    sidecar = {
        "schema_id": "AVCaptureMetadata",
        "schema_version": "1.0.0",
        "notes": ["Synthetic fixture metadata — not Apple capture output."],
        "representation": "APPLE_ENCODED_JPEG",
    }
    sidecar_raw = _write_canonical(dest / "sidecars" / "avcapture_metadata.json", sidecar)

    device = {
        "schema_id": "CaptureDeviceProvenance",
        "schema_version": "1.0.0",
        "device_profile_id": GOLDEN_IDS["device_profile_id"],
        "hardware_model_identifier": GOLDEN_IDS["hardware_model_identifier"],
        "device_display_name": "Approved iPhone Pro LiDAR Capture Device (fixture)",
        "ios_version": "fixture",
        "camera_profile_id": "CAM-REAR-WIDE-001",
        "camera_position": "back",
        "lens_profile_id": "LENS-WIDE-001",
        "lens_display_name": "Approved wide lens (fixture)",
        "lidar_available": True,
        "calibration_profile_id": None,
        "calibration_version": None,
        "app_version": "0.1.4",
        "evidence_schema_version": "1.0.0",
        "capture_plan_schema_version": "1.0.0",
        "portable_package_version": "1.0.0",
        "capture_installation_id": GOLDEN_IDS["capture_installation_id"],
        "device_enrollment_id": GOLDEN_IDS["device_enrollment_id"],
        "app_attest_key_id": None,
        "notes": ["Synthetic EDTS importer golden package."],
    }

    status = {
        "schema_id": "PackageStatusDeclaration",
        "schema_version": "1.0.0",
        "capture_side_status": "PACKAGE_EXPORTED",
        "previous_capture_side_status": "CAPTURE_SEALED",
        "asserted_statuses": ["PACKAGE_EXPORTED"],
    }

    manifest = {
        "manifest_version": "1.0.0",
        "schema_id": "EvidenceManifest",
        "schema_version": "1.0.0",
        "record_id": "REC-GOLDEN-EDTS-001",
        "session_id": GOLDEN_IDS["session_id"],
        "capture_app_version": "0.1.4",
        "created_at_utc": "2026-07-23T00:00:00Z",
        "clock_domain": "wall",
        "device_profile_id": GOLDEN_IDS["device_profile_id"],
        "capture_plan_id": "PLAN-MOCK-PHASE1-STILL",
        "capture_identity": {
            "operator_id": "OPERATOR-FIXTURE",
            "capture_installation_id": GOLDEN_IDS["capture_installation_id"],
            "device_enrollment_id": GOLDEN_IDS["device_enrollment_id"],
            "app_version": "0.1.4",
            "ios_version": "fixture",
            "approved_device_profile": GOLDEN_IDS["device_profile_id"],
        },
        "spatial_context": {
            "tracking_state": "unavailable_fixture",
            "scene_depth_available": False,
        },
        "engineering_link": {"measurement_authority": "NOT_YET_VERIFIED"},
        "artifacts": [
            {
                "artifact_id": GOLDEN_IDS["artifact_id"],
                "relative_path": "payload/artifact_original.jpg",
                "sha256": _sha(jpeg),
                "media_type": "image/jpeg",
                "captured_at_utc": "2026-07-23T00:00:00Z",
                "clock_domain": "wall",
                "coordinate_frame": "camera",
                "authority": "RAW_OBSERVATION",
                "is_original": True,
                "parent_artifact_ids": [],
            }
        ],
        "notes": [
            "Synthetic golden .edts-pkg for XREPO-CAP-EDTS-0001/0002.",
            "Not physical sensor evidence.",
        ],
    }

    # Mutations for negative fixtures
    if mutate == "UNSUPPORTED_SCHEMA_VERSION":
        manifest["schema_version"] = "9.9.9"
    if mutate == "CAPTURE_ASSERTED_EDTS_STATUS":
        status["asserted_statuses"] = ["INGESTED_INTEGRITY_VERIFIED"]
        status["capture_side_status"] = "INGESTED_INTEGRITY_VERIFIED"
    if mutate == "UNKNOWN_STATUS":
        status["asserted_statuses"] = ["TOTALLY_MADE_UP_STATUS"]
        status["capture_side_status"] = "TOTALLY_MADE_UP_STATUS"
    if mutate == "IDENTIFIER_MUTATION":
        # Build valid package then caller compares against GOLDEN_IDS expecting mutation detect
        manifest["session_id"] = "MUTATED-SESSION-ID"
    if mutate == "HASH_MISMATCH":
        # Wrong hash in manifest (inventory will be built from actual bytes — mismatch manifest)
        manifest["artifacts"][0]["sha256"] = "0" * 64

    device_raw = _write_canonical(dest / "capture_device.json", device)
    status_raw = _write_canonical(dest / "package_status.json", status)

    if mutate == "NONCANONICAL_MANIFEST":
        # Pretty-print manifest (invalid for Phase 1 binding).
        (dest / "manifest.json").write_text(
            json.dumps(manifest, indent=2, ensure_ascii=True) + "\n",
            encoding="utf-8",
        )
        manifest_raw = (dest / "manifest.json").read_bytes()
    else:
        manifest_raw = _write_canonical(dest / "manifest.json", manifest)

    entries = [
        {
            "path": "payload/artifact_original.jpg",
            "byte_size": len(jpeg),
            "sha256": _sha(jpeg),
        },
        {
            "path": "manifest.json",
            "byte_size": len(manifest_raw),
            "sha256": _sha(manifest_raw),
        },
        {
            "path": "capture_device.json",
            "byte_size": len(device_raw),
            "sha256": _sha(device_raw),
        },
        {
            "path": "package_status.json",
            "byte_size": len(status_raw),
            "sha256": _sha(status_raw),
        },
        {
            "path": "sidecars/avcapture_metadata.json",
            "byte_size": len(sidecar_raw),
            "sha256": _sha(sidecar_raw),
        },
    ]

    if mutate == "HASH_MISMATCH":
        # Corrupt inventory hash for artifact while leaving file intact.
        entries[0]["sha256"] = "a" * 64

    inventory = {
        "schema_id": "PackageInventory",
        "schema_version": "1.0.0",
        "package_format_version": "1.0.0",
        "package_id": GOLDEN_IDS["package_id"],
        "entries": entries,
        "notes": ["Phase 1: package_inventory.json omitted from entries (self-hash policy)."],
    }
    _write_canonical(dest / "package_inventory.json", inventory)

    return {"dest": dest, "ids": dict(GOLDEN_IDS), "mutate": mutate}


def zip_package_dir(package_dir: Path, zip_path: Path) -> Path:
    zip_path.parent.mkdir(parents=True, exist_ok=True)
    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(package_dir.rglob("*")):
            if path.is_file():
                zf.write(path, path.relative_to(package_dir).as_posix())
    return zip_path


def write_hostile_zip(dest: Path, kind: str, base_package: Path) -> Path:
    """Create a hostile .edts-pkg zip for XREPO-0002 tests."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        dest.unlink()

    if kind == "PATH_TRAVERSAL":
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr("../evil.txt", b"nope")
            zf.writestr("manifest.json", b"{}")
        return dest

    if kind == "ABSOLUTE_PATH":
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr("/tmp/evil.txt", b"nope")
        return dest

    if kind == "DUPLICATE_ENTRY":
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr("manifest.json", b"{}")
            # ZipFile allows duplicate names via ZipInfo
            info = zipfile.ZipInfo("manifest.json")
            zf.writestr(info, b"{}")
        return dest

    if kind == "CASE_COLLISION":
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr("Manifest.json", b"{}")
            zf.writestr("manifest.json", b"{}")
        return dest

    if kind == "UNICODE_NORMALIZATION_COLLISION":
        # é as e+combining accent vs precomposed
        name1 = "caf" + "\u0065\u0301" + ".txt"  # e + combining acute
        name2 = "caf" + "\u00e9" + ".txt"  # precomposed
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr(name1, b"a")
            zf.writestr(name2, b"b")
        return dest

    if kind == "NESTED_ARCHIVE":
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr("payload/inner.zip", b"PK\x05\x06" + b"\x00" * 18)
            zf.writestr("manifest.json", b"{}")
        return dest

    if kind == "SYMLINK_ENTRY":
        with zipfile.ZipFile(dest, "w") as zf:
            info = zipfile.ZipInfo("link-to-etc")
            info.create_system = 3
            info.external_attr = 0o120777 << 16
            zf.writestr(info, b"/etc/passwd")
        return dest

    if kind == "UNDECLARED_FILES":
        # Valid golden zip plus extra undeclared file
        zip_package_dir(base_package, dest)
        with zipfile.ZipFile(dest, "a") as zf:
            zf.writestr("payload/extra_undeclared.bin", b"surprise")
        return dest

    if kind == "COMPRESSION_BOMB":
        # High ratio sparse-ish payload via DEFLATE of zeros (may still be flagged by size)
        with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("bomb.bin", b"\x00" * (2 * 1024 * 1024))
        return dest

    raise ValueError(f"unknown hostile kind: {kind}")
