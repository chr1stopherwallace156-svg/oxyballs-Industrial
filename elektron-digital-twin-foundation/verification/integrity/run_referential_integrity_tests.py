#!/usr/bin/env python3
"""Referential integrity validation beyond JSON Schema."""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EX = ROOT / "examples" / "2019_f450"


def load(name: str) -> dict:
    return json.loads((EX / name).read_text())


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
            "evidence_file": evidence or f"examples/2019_f450/{evidence or ''}",
        })

    veh = load("vehicle-instance.example.json")
    cfg = load("exact-configuration.example.json")
    comp = load("door-fl-component-instance.example.json")
    asm = load("cab-assembly-instance.example.json")
    geo = load("door-fl-geometry-asset.example.json")
    rel = load("door-fl-assembly-relationship.example.json")
    passport = load("door-fl-component-passport.example.json")
    cdef = load("component-definition-door-fl.example.json")

    # referenced records exist
    required_ids = {
        "VEH-000001": veh.get("vehicle_instance_id") == "VEH-000001",
        "CFG-000001": cfg.get("configuration_id") == "CFG-000001",
        "CMPINST-VEH000001-DOOR-FL": comp.get("component_instance_id") == "CMPINST-VEH000001-DOOR-FL",
        "ASMINST-VEH000001-CAB": asm.get("assembly_instance_id") == "ASMINST-VEH000001-CAB",
        "GEO-VEH000001-DOOR-FL-001": geo.get("geometry_asset_id") == "GEO-VEH000001-DOOR-FL-001",
        "CMPDEF-DOOR-FRONT-LH-0001": cdef.get("component_definition_id") == "CMPDEF-DOOR-FRONT-LH-0001",
        "REL-VEH000001-0001": rel.get("relationship_id") == "REL-VEH000001-0001",
        "PP-VEH000001-DOOR-FL-001": passport.get("passport_id") == "PP-VEH000001-DOOR-FL-001",
    }
    missing = [k for k, ok in required_ids.items() if not ok]
    rec("REF-EXIST-001", "all referenced records exist", "OK" if not missing else f"missing {missing}", not missing,
        None if not missing else f"missing {missing}", "examples/2019_f450/")

    # component vehicle matches assembly vehicle
    ok = comp["vehicle_instance_id"] == asm["vehicle_instance_id"] == veh["vehicle_instance_id"]
    rec("REF-VEH-001", "component/assembly/vehicle IDs align",
        f"comp={comp['vehicle_instance_id']} asm={asm['vehicle_instance_id']} veh={veh['vehicle_instance_id']}", ok,
        evidence="examples/2019_f450/door-fl-component-instance.example.json")

    # component configuration matches vehicle configuration
    ok = comp["configuration_id"] == veh["configuration_id"] == cfg["configuration_id"] == asm["configuration_id"]
    rec("REF-CFG-001", "component configuration matches vehicle configuration",
        f"comp={comp['configuration_id']} veh={veh['configuration_id']}", ok,
        evidence="examples/2019_f450/door-fl-component-instance.example.json")

    # component fingerprint matches current exact configuration
    ok = (
        comp.get("configuration_fingerprint") == cfg.get("configuration_fingerprint")
        and cfg.get("fingerprint_status") == "COMPUTED"
        and comp.get("configuration_fingerprint") is not None
    )
    rec("REF-FP-001", "component fingerprint matches exact configuration",
        f"comp={comp.get('configuration_fingerprint')} cfg={cfg.get('configuration_fingerprint')}", ok,
        evidence="examples/2019_f450/exact-configuration.example.json")

    # geometry links to correct component
    ok = geo["component_instance_id"] == comp["component_instance_id"] and geo["geometry_asset_id"] in comp.get("geometry_asset_ids", [])
    rec("REF-GEO-001", "geometry asset links to correct component instance",
        f"geo.component={geo['component_instance_id']} listed={comp.get('geometry_asset_ids')}", ok,
        evidence="examples/2019_f450/door-fl-geometry-asset.example.json")

    # relationship ends exist and share vehicle/config
    ok = (
        rel["subject_id"] == comp["component_instance_id"]
        and rel["object_id"] == asm["assembly_instance_id"]
        and rel["vehicle_instance_id"] == veh["vehicle_instance_id"]
        and rel["configuration_id"] == cfg["configuration_id"]
    )
    rec("REF-REL-001", "assembly relationship endpoints exist and align", "OK" if ok else "MISALIGNED", ok,
        evidence="examples/2019_f450/door-fl-assembly-relationship.example.json")

    # passport refs
    ok = (
        passport["component_instance_id"] == comp["component_instance_id"]
        and passport["vehicle_instance_id"] == veh["vehicle_instance_id"]
        and passport["configuration_id"] == cfg["configuration_id"]
        and passport.get("configuration_fingerprint") == cfg.get("configuration_fingerprint")
    )
    rec("REF-PP-001", "passport IDs/fingerprint align with silo", "OK" if ok else "MISALIGNED", ok,
        evidence="examples/2019_f450/door-fl-component-passport.example.json")

    failed = sum(1 for r in results if r["pass_or_fail"] == "FAIL")
    return {
        "suite": "kernel-referential-integrity-tests",
        "execution_timestamp": ts,
        "runtime": "python3",
        "total": len(results),
        "passed": len(results) - failed,
        "failed": failed,
        "suite_pass_or_fail": "PASS" if failed == 0 else "FAIL",
        "results": results,
    }


if __name__ == "__main__":
    out = run()
    path = ROOT / "verification" / "results" / "kernel-referential-integrity-tests.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(out, indent=2) + "\n")
    print(json.dumps({"suite_pass_or_fail": out["suite_pass_or_fail"], "passed": out["passed"], "failed": out["failed"]}, indent=2))
    raise SystemExit(0 if out["suite_pass_or_fail"] == "PASS" else 1)
