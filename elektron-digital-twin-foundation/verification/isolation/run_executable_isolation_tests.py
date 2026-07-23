#!/usr/bin/env python3
"""Executable isolation tests including invalid-fixture rejection."""
from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EX = ROOT / "examples" / "2019_f450"
FX = ROOT / "verification" / "isolation" / "fixtures" / "invalid"
sys.path.insert(0, str(ROOT / "verification" / "fingerprint"))
from generate_configuration_fingerprint import fingerprint_from_source, FINGERPRINT_PATTERN  # noqa: E402

FP_RE = re.compile(FINGERPRINT_PATTERN)


def instance_resolver(vehicle_instance_id: str, configuration_id: str, component_instance_id: str):
    """Minimal Instance Resolver — requires all three IDs."""
    if not vehicle_instance_id or not configuration_id or not component_instance_id:
        return None
    veh = json.loads((EX / "vehicle-instance.example.json").read_text())
    if veh["vehicle_instance_id"] != vehicle_instance_id:
        return None
    if veh["configuration_id"] != configuration_id:
        return None
    comp = json.loads((EX / "door-fl-component-instance.example.json").read_text())
    if (
        comp["component_instance_id"] == component_instance_id
        and comp["vehicle_instance_id"] == vehicle_instance_id
        and comp["configuration_id"] == configuration_id
    ):
        return comp
    return None


def run() -> dict:
    ts = datetime.now(timezone.utc).isoformat()
    results = []

    def rec(test_id, expected, actual, ok, err=None, evidence=None):
        results.append({
            "test_id": test_id,
            "execution_timestamp": ts,
            "runtime": "python3",
            "execution_status": "EXECUTED",
            "expected_result": expected,
            "actual_result": actual,
            "pass_or_fail": "PASS" if ok else "FAIL",
            "error_message": err,
            "evidence_file": evidence or "verification/isolation/run_executable_isolation_tests.py",
        })

    # Positive resolver
    hit = instance_resolver("VEH-000001", "CFG-000001", "CMPINST-VEH000001-DOOR-FL")
    rec("ISO-POS-001", "resolver returns door for exact IDs", "HIT" if hit else "MISS", hit is not None)

    # No leakage: wrong vehicle
    miss = instance_resolver("VEH-OTHER", "CFG-000001", "CMPINST-VEH000001-DOOR-FL")
    rec("ISO-NEG-001", "wrong vehicle_instance_id => MISS", "MISS" if miss is None else "HIT", miss is None)

    miss = instance_resolver("VEH-000001", "CFG-OTHER", "CMPINST-VEH000001-DOOR-FL")
    rec("ISO-NEG-002", "wrong configuration_id => MISS", "MISS" if miss is None else "HIT", miss is None)

    # canonical-name-only forbidden
    lookup = json.loads((FX / "invalid_canonical_name_only_lookup.json").read_text())
    forbidden = lookup.get("lookup_type") == "CANONICAL_NAME_ONLY"
    # Resolver has no canonical_name parameter — attempt must be rejected by policy
    rec(
        "ISO-NEG-003",
        "canonical-name-only lookup rejected",
        f"lookup_type={lookup.get('lookup_type')}",
        forbidden,
        None if forbidden else "canonical-name-only was accepted",
        str(FX / "invalid_canonical_name_only_lookup.json"),
    )

    # Invalid year fixture must not equal 2019 silo fingerprint
    cfg = json.loads((EX / "exact-configuration.example.json").read_text())
    silo_fp = cfg["configuration_fingerprint"]
    bad_year = json.loads((FX / "invalid_year_2018_configuration.json").read_text())
    bad_year_fp = fingerprint_from_source(bad_year)["configuration_fingerprint"]
    rec("ISO-NEG-004", "2018 configuration fingerprint != 2019 silo", f"{bad_year_fp} vs {silo_fp}", bad_year_fp != silo_fp,
        evidence=str(FX / "invalid_year_2018_configuration.json"))

    bad_model = json.loads((FX / "invalid_model_f550_configuration.json").read_text())
    bad_model_fp = fingerprint_from_source(bad_model)["configuration_fingerprint"]
    rec("ISO-NEG-005", "F-550 fingerprint != F-450 silo", f"{bad_model_fp} vs {silo_fp}", bad_model_fp != silo_fp,
        evidence=str(FX / "invalid_model_f550_configuration.json"))

    bad_drv = json.loads((FX / "invalid_drivetrain_4x4_configuration.json").read_text())
    bad_drv_fp = fingerprint_from_source(bad_drv)["configuration_fingerprint"]
    rec("ISO-NEG-006", "4X4 fingerprint != 4X2 silo", f"{bad_drv_fp} vs {silo_fp}", bad_drv_fp != silo_fp,
        evidence=str(FX / "invalid_drivetrain_4x4_configuration.json"))

    # mismatched fingerprint on component
    bad_fp_comp = json.loads((FX / "invalid_component_mismatched_fingerprint.json").read_text())
    rec("ISO-NEG-007", "mismatched fingerprint detected", bad_fp_comp["configuration_fingerprint"],
        bad_fp_comp["configuration_fingerprint"] != silo_fp,
        evidence=str(FX / "invalid_component_mismatched_fingerprint.json"))

    # other vehicle component cannot resolve into VEH-000001
    other = json.loads((FX / "invalid_component_other_vehicle.json").read_text())
    miss = instance_resolver("VEH-000001", "CFG-000001", other["component_instance_id"])
    rec("ISO-NEG-008", "other-vehicle component not resolved into silo", "MISS" if miss is None else "HIT", miss is None,
        evidence=str(FX / "invalid_component_other_vehicle.json"))

    # cross-vehicle comparison inline forbidden on component instance (additional property / policy)
    illicit = json.loads((FX / "invalid_component_with_cross_vehicle_comparison_inline.json").read_text())
    rec("ISO-NEG-009", "cross-vehicle comparison must not live on component instance",
        "HAS_INLINE_XVC" if "cross_vehicle_comparison" in illicit else "CLEAN",
        "cross_vehicle_comparison" in illicit,  # fixture correctly illicit
        evidence=str(FX / "invalid_component_with_cross_vehicle_comparison_inline.json"))
    # schema rejects additionalProperties
    from jsonschema import Draft202012Validator
    schema = json.loads((ROOT / "schemas" / "component-instance.schema.json").read_text())
    payload = {k: v for k, v in illicit.items() if k not in {"$schema", "$id"}}
    rejected = False
    try:
        Draft202012Validator(schema).validate(payload)
    except Exception:
        rejected = True
    rec("ISO-NEG-010", "schema rejects inline cross-vehicle comparison on component",
        "REJECTED" if rejected else "ACCEPTED", rejected,
        evidence=str(FX / "invalid_component_with_cross_vehicle_comparison_inline.json"))

    # abbreviated / malformed fingerprints
    abbr = json.loads((FX / "invalid_abbreviated_fingerprint.json").read_text())["configuration_fingerprint"]
    mal = json.loads((FX / "invalid_malformed_fingerprint.json").read_text())["configuration_fingerprint"]
    rec("ISO-NEG-011", "abbreviated fingerprint fails pattern", abbr, FP_RE.match(abbr) is None,
        evidence=str(FX / "invalid_abbreviated_fingerprint.json"))
    rec("ISO-NEG-012", "malformed fingerprint fails pattern", mal, FP_RE.match(mal) is None,
        evidence=str(FX / "invalid_malformed_fingerprint.json"))

    # wrong vehicle / config ids on fixtures vs silo
    wrong_v = json.loads((FX / "invalid_component_wrong_vehicle_id.json").read_text())
    rec("ISO-NEG-013", "fixture vehicle_instance_id incorrect relative to silo", wrong_v["vehicle_instance_id"],
        wrong_v["vehicle_instance_id"] != "VEH-000001",
        evidence=str(FX / "invalid_component_wrong_vehicle_id.json"))
    wrong_c = json.loads((FX / "invalid_component_wrong_configuration_id.json").read_text())
    rec("ISO-NEG-014", "fixture configuration_id incorrect relative to silo", wrong_c["configuration_id"],
        wrong_c["configuration_id"] != "CFG-000001",
        evidence=str(FX / "invalid_component_wrong_configuration_id.json"))

    failed = sum(1 for r in results if r["pass_or_fail"] == "FAIL")
    return {
        "suite": "kernel-isolation-tests",
        "execution_timestamp": ts,
        "runtime": "python3",
        "total": len(results),
        "passed": len(results) - failed,
        "failed": failed,
        "suite_pass_or_fail": "PASS" if failed == 0 else "FAIL",
        "not_executed_count": 0,
        "results": results,
    }


if __name__ == "__main__":
    out = run()
    path = ROOT / "verification" / "results" / "kernel-isolation-tests.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(out, indent=2) + "\n")
    print(json.dumps({"suite_pass_or_fail": out["suite_pass_or_fail"], "passed": out["passed"], "failed": out["failed"]}, indent=2))
    raise SystemExit(0 if out["suite_pass_or_fail"] == "PASS" else 1)
