#!/usr/bin/env python3
"""Executable fingerprint tests for EDTS_CFG_FINGERPRINT_JCS_SHA256_V1."""
from __future__ import annotations

import copy
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from generate_configuration_fingerprint import (  # noqa: E402
    FINGERPRINT_PATTERN,
    fingerprint_from_source,
)

BASE = {
    "configuration_id": "CFG-000001",
    "manufacturer": "Ford",
    "model": "F-450",
    "model_year": 2019,
    "vehicle_type": "CHASSIS_CAB",
    "cab_type": "REGULAR_CAB",
    "drivetrain": "4X2",
    "rear_wheel_configuration": "DRW",
    "wheelbase_mm": 3690.62,
    "cab_to_axle_mm": 1524.0,
    "series": "UNKNOWN",
}


def run_tests() -> dict:
    ts = datetime.now(timezone.utc).isoformat()
    results = []

    def record(test_id: str, expected: str, actual: str, ok: bool, err: str | None = None, evidence: str | None = None):
        results.append({
            "test_id": test_id,
            "execution_timestamp": ts,
            "runtime": "python3",
            "execution_status": "EXECUTED",
            "expected_result": expected,
            "actual_result": actual,
            "pass_or_fail": "PASS" if ok else "FAIL",
            "error_message": err,
            "evidence_file": evidence or "verification/fingerprint/test_configuration_fingerprint.py",
        })

    base_fp = fingerprint_from_source(BASE)["configuration_fingerprint"]

    # property ordering
    ordered = {k: BASE[k] for k in sorted(BASE.keys(), reverse=True)}
    fp_ordered = fingerprint_from_source(ordered)["configuration_fingerprint"]
    record(
        "FP-ORDER-001",
        "hash unchanged under property reorder",
        f"base={base_fp} reordered={fp_ordered}",
        base_fp == fp_ordered,
        None if base_fp == fp_ordered else "ordering altered hash",
    )

    # model_year change
    y = copy.deepcopy(BASE); y["model_year"] = 2018
    fp_y = fingerprint_from_source(y)["configuration_fingerprint"]
    record("FP-YEAR-001", "hash changes when model_year changes", f"{base_fp} -> {fp_y}", base_fp != fp_y,
           None if base_fp != fp_y else "model_year change did not alter hash")

    # drivetrain change
    d = copy.deepcopy(BASE); d["drivetrain"] = "4X4"
    fp_d = fingerprint_from_source(d)["configuration_fingerprint"]
    record("FP-DRV-001", "hash changes when drivetrain changes", f"{base_fp} -> {fp_d}", base_fp != fp_d,
           None if base_fp != fp_d else "drivetrain change did not alter hash")

    # wheelbase change
    w = copy.deepcopy(BASE); w["wheelbase_mm"] = 3700.0
    fp_w = fingerprint_from_source(w)["configuration_fingerprint"]
    record("FP-WB-001", "hash changes when wheelbase changes", f"{base_fp} -> {fp_w}", base_fp != fp_w,
           None if base_fp != fp_w else "wheelbase change did not alter hash")

    # UNKNOWN -> known
    s = copy.deepcopy(BASE); s["series"] = "XL"
    fp_s = fingerprint_from_source(s)["configuration_fingerprint"]
    record("FP-UNK-001", "hash changes when UNKNOWN becomes known", f"{base_fp} -> {fp_s}", base_fp != fp_s,
           None if base_fp != fp_s else "UNKNOWN->known did not alter hash")

    # configuration_id change must NOT change hash
    c = copy.deepcopy(BASE); c["configuration_id"] = "CFG-OTHER"
    fp_c = fingerprint_from_source(c)["configuration_fingerprint"]
    record("FP-CFGID-001", "hash unchanged when configuration_id changes", f"{base_fp} vs {fp_c}", base_fp == fp_c,
           None if base_fp == fp_c else "configuration_id leaked into fingerprint")

    # pattern
    ok_pat = bool(re.match(FINGERPRINT_PATTERN, base_fp)) and "..." not in base_fp
    record("FP-PAT-001", "matches ^sha256:[a-f0-9]{64}$", base_fp, ok_pat,
           None if ok_pat else "fingerprint pattern mismatch")

    # abbreviated prohibited
    bad = "sha256:d84f86f3..."
    ok_abbr = not bool(re.match(FINGERPRINT_PATTERN, bad))
    record("FP-ABBR-001", "abbreviated hash rejected by pattern", bad, ok_abbr,
           None if ok_abbr else "abbreviated hash incorrectly accepted")

    failed = sum(1 for r in results if r["pass_or_fail"] == "FAIL")
    return {
        "suite": "kernel-fingerprint-tests",
        "execution_timestamp": ts,
        "runtime": "python3",
        "total": len(results),
        "passed": len(results) - failed,
        "failed": failed,
        "suite_pass_or_fail": "PASS" if failed == 0 else "FAIL",
        "results": results,
    }


if __name__ == "__main__":
    out = run_tests()
    out_path = ROOT / "verification" / "results" / "kernel-fingerprint-tests.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(out, indent=2) + "\n")
    print(json.dumps({"suite_pass_or_fail": out["suite_pass_or_fail"], "passed": out["passed"], "failed": out["failed"]}, indent=2))
    raise SystemExit(0 if out["suite_pass_or_fail"] == "PASS" else 1)
