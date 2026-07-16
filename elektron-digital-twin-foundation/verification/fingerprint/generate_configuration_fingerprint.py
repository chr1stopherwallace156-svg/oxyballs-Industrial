#!/usr/bin/env python3
"""EDTS configuration fingerprint generator (JCS + SHA-256)."""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path
from typing import Any, Mapping

try:
    import rfc8785
except ImportError as exc:  # pragma: no cover
    raise SystemExit("rfc8785 package required") from exc

WHITELIST = (
    "manufacturer",
    "model",
    "model_year",
    "vehicle_type",
    "cab_type",
    "drivetrain",
    "rear_wheel_configuration",
    "wheelbase_mm",
    "cab_to_axle_mm",
    "series",
)

TEXT_KEYS = {
    "manufacturer",
    "model",
    "vehicle_type",
    "cab_type",
    "drivetrain",
    "rear_wheel_configuration",
    "series",
}

FINGERPRINT_VERSION = 1
FINGERPRINT_PATTERN = r"^sha256:[a-f0-9]{64}$"


def build_identity_object(source: Mapping[str, Any]) -> dict[str, Any]:
    """Build whitelist-only identity object.

    - Known text → uppercase
    - Explicit UNKNOWN preserved
    - null preserved for whitelist keys present as null
    - Missing whitelist keys default to null (explicit absence)
    - configuration_id ignored even if present
    """
    identity: dict[str, Any] = {}
    for key in WHITELIST:
        if key not in source:
            identity[key] = None
            continue
        value = source[key]
        if value is None:
            identity[key] = None
        elif isinstance(value, str):
            if value == "UNKNOWN":
                identity[key] = "UNKNOWN"
            else:
                identity[key] = value.upper()
        else:
            identity[key] = value
    return identity


def canonical_bytes(identity: Mapping[str, Any]) -> bytes:
    return rfc8785.dumps(dict(identity))


def fingerprint_from_identity(identity: Mapping[str, Any]) -> str:
    digest = hashlib.sha256(canonical_bytes(identity)).hexdigest()
    return f"sha256:{digest}"


def fingerprint_from_source(source: Mapping[str, Any]) -> dict[str, Any]:
    identity = build_identity_object(source)
    fp = fingerprint_from_identity(identity)
    return {
        "fingerprint_version": FINGERPRINT_VERSION,
        "fingerprint_status": "COMPUTED",
        "configuration_fingerprint": fp,
        "identity_object": identity,
        "canonical_jcs_utf8": canonical_bytes(identity).decode("utf-8"),
    }


def apply_to_configuration_file(path: Path) -> dict[str, Any]:
    data = json.loads(path.read_text())
    result = fingerprint_from_source(data)
    data["configuration_fingerprint"] = result["configuration_fingerprint"]
    data["fingerprint_version"] = result["fingerprint_version"]
    data["fingerprint_status"] = result["fingerprint_status"]
    data["fingerprint_identity_object"] = result["identity_object"]
    data["fingerprint_canonical_jcs"] = result["canonical_jcs_utf8"]
    path.write_text(json.dumps(data, indent=2) + "\n")
    return result


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("usage: generate_configuration_fingerprint.py <exact-configuration.json>")
        return 2
    path = Path(argv[1])
    result = apply_to_configuration_file(path)
    print(json.dumps({k: result[k] for k in ("configuration_fingerprint", "fingerprint_version", "fingerprint_status", "canonical_jcs_utf8")}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
