#!/usr/bin/env python3
"""Master executable validation runner for EDTS Exact-Vehicle Kernel v1.0.0-rc1."""
from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # elektron-digital-twin-foundation/
RESULTS = ROOT / "verification" / "results"


def run_step(cmd: list[str]) -> int:
    print("+", " ".join(cmd))
    return subprocess.call(cmd, cwd=str(ROOT))


def main() -> int:
    RESULTS.mkdir(parents=True, exist_ok=True)
    steps = [
        [sys.executable, "verification/fingerprint/test_configuration_fingerprint.py"],
        [sys.executable, "verification/schema/validate_kernel_examples.py"],
        [sys.executable, "verification/isolation/run_executable_isolation_tests.py"],
        [sys.executable, "verification/integrity/run_referential_integrity_tests.py"],
    ]
    codes = [run_step(cmd) for cmd in steps]

    suites = {
        "fingerprint": json.loads((RESULTS / "kernel-fingerprint-tests.json").read_text()),
        "schema": json.loads((RESULTS / "kernel-schema-validation.json").read_text()),
        "isolation": json.loads((RESULTS / "kernel-isolation-tests.json").read_text()),
        "referential": json.loads((RESULTS / "kernel-referential-integrity-tests.json").read_text()),
    }

    # Required eleven schemas exist
    required_schemas = [
        "entity-definition.schema.json",
        "vehicle-instance.schema.json",
        "exact-configuration.schema.json",
        "component-instance.schema.json",
        "reusable-component-definition.schema.json",
        "evidence-link.schema.json",
        "geometry-asset.schema.json",
        "assembly-relationship.schema.json",
        "interaction-definition.schema.json",
        "component-passport.schema.json",
        "cross-vehicle-comparison.schema.json",
    ]
    missing_schemas = [n for n in required_schemas if not (ROOT / "schemas" / n).exists()]
    required_examples = [
        "vehicle-instance.example.json",
        "exact-configuration.example.json",
        "door-fl-component-instance.example.json",
        "door-fl-geometry-asset.example.json",
        "door-fl-assembly-relationship.example.json",
        "door-fl-interaction.example.json",
        "door-fl-component-passport.example.json",
    ]
    missing_examples = [n for n in required_examples if not (ROOT / "examples" / "2019_f450" / n).exists()]

    not_executed = 0
    for suite in suites.values():
        for r in suite.get("results", []):
            if r.get("execution_status") == "NOT_EXECUTED":
                not_executed += 1

    suite_fails = [name for name, s in suites.items() if s.get("suite_pass_or_fail") != "PASS"]
    any_fail = bool(suite_fails or missing_schemas or missing_examples or not_executed or any(codes))

    if missing_schemas or missing_examples:
        final = "EDTS_EXACT_VEHICLE_KERNEL_VALIDATION_BLOCKED"
    elif any_fail or not_executed:
        final = "EDTS_EXACT_VEHICLE_KERNEL_VALIDATION_FAILED"
    else:
        final = "EDTS_EXACT_VEHICLE_KERNEL_VALIDATED"

    ts = datetime.now(timezone.utc).isoformat()
    report = f"""# KERNEL_VALIDATION_REPORT

**execution_timestamp:** `{ts}`  
**runtime:** `python3`  
**kernel_version:** `1.0.0-rc1`  
**final_status:** `{final}`

## Initial audit

See `verification/results/KERNEL_INITIAL_FILE_AUDIT.md` (recorded before corrections).

## Required files

- Schemas present: **{11 - len(missing_schemas)}/11** {('(missing: ' + ', '.join(missing_schemas) + ')') if missing_schemas else ''}
- Examples present: **{7 - len(missing_examples)}/7** {('(missing: ' + ', '.join(missing_examples) + ')') if missing_examples else ''}

## Suite results

| Suite | Result file | pass_or_fail | passed | failed | NOT_EXECUTED |
|---|---|---|---|---|---|
| Fingerprint | kernel-fingerprint-tests.json | {suites['fingerprint']['suite_pass_or_fail']} | {suites['fingerprint']['passed']} | {suites['fingerprint']['failed']} | 0 |
| Schema validation | kernel-schema-validation.json | {suites['schema']['suite_pass_or_fail']} | {suites['schema']['passed']} | {suites['schema']['failed']} | 0 |
| Isolation | kernel-isolation-tests.json | {suites['isolation']['suite_pass_or_fail']} | {suites['isolation']['passed']} | {suites['isolation']['failed']} | {suites['isolation'].get('not_executed_count', 0)} |
| Referential integrity | kernel-referential-integrity-tests.json | {suites['referential']['suite_pass_or_fail']} | {suites['referential']['passed']} | {suites['referential']['failed']} | 0 |

## Final status decision

```text
missing_schemas = {missing_schemas}
missing_examples = {missing_examples}
suite_fails = {suite_fails}
not_executed = {not_executed}
=> {final}
```

## Notes

- Fingerprints use RFC 8785 JCS + SHA-256; abbreviated digests prohibited.
- Instance Resolver requires `(vehicle_instance_id, configuration_id, component_instance_id)`.
- Canonical-name-only lookup is rejected by policy/tests.
"""
    (RESULTS / "KERNEL_VALIDATION_REPORT.md").write_text(report)

    # Update STATUS.json from executed result only
    status_path = ROOT / "STATUS.json"
    status = json.loads(status_path.read_text())
    status["phase"] = final
    status["updated_at"] = ts
    status["kernel_validation_report"] = "verification/results/KERNEL_VALIDATION_REPORT.md"
    status["kernel_validation_final_status"] = final
    gov = status.setdefault("governance_status", {})
    gov["EDTS_EXACT_VEHICLE_KERNEL"] = final.replace("EDTS_EXACT_VEHICLE_KERNEL_", "")
    gov["RUNTIME_ISOLATION_TESTS"] = "EXECUTED"
    status["layers"]["L01"]["phase"] = final
    status_path.write_text(json.dumps(status, indent=2) + "\n")

    # Update KERNEL_TEST_RESULTS and manifest
    ktr = {
        "kernel_version": "1.0.0-rc1",
        "suite_status": final,
        "execution_timestamp": ts,
        "summary": {
            "schemas_materialized": f"{11 - len(missing_schemas)}/11",
            "examples_materialized": f"{7 - len(missing_examples)}/7",
            "fingerprint_standard_defined": True,
            "isolation_standards_defined": True,
            "runtime_tests_executed": True,
            "final_status": final,
        },
        "suite_files": {
            "schema": "verification/results/kernel-schema-validation.json",
            "fingerprint": "verification/results/kernel-fingerprint-tests.json",
            "isolation": "verification/results/kernel-isolation-tests.json",
            "referential": "verification/results/kernel-referential-integrity-tests.json",
            "report": "verification/results/KERNEL_VALIDATION_REPORT.md",
            "initial_audit": "verification/results/KERNEL_INITIAL_FILE_AUDIT.md",
        },
    }
    (ROOT / "KERNEL_TEST_RESULTS.json").write_text(json.dumps(ktr, indent=2) + "\n")

    manifest = json.loads((ROOT / "KERNEL_MANIFEST.json").read_text())
    manifest["status"] = final
    (ROOT / "KERNEL_MANIFEST.json").write_text(json.dumps(manifest, indent=2) + "\n")

    print(final)
    return 0 if final == "EDTS_EXACT_VEHICLE_KERNEL_VALIDATED" else 1


if __name__ == "__main__":
    raise SystemExit(main())
