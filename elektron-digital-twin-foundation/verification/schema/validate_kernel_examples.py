#!/usr/bin/env python3
"""Draft 2020-12 JSON Schema validation for kernel examples."""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from jsonschema import Draft202012Validator
from jsonschema.exceptions import SchemaError, ValidationError

ROOT = Path(__file__).resolve().parents[2]
EX = ROOT / "examples" / "2019_f450"
SCH = ROOT / "schemas"

EXAMPLE_SCHEMA_MAP = {
    "vehicle-instance.example.json": "vehicle-instance.schema.json",
    "exact-configuration.example.json": "exact-configuration.schema.json",
    "door-fl-component-instance.example.json": "component-instance.schema.json",
    "door-fl-geometry-asset.example.json": "geometry-asset.schema.json",
    "door-fl-assembly-relationship.example.json": "assembly-relationship.schema.json",
    "door-fl-interaction.example.json": "interaction-definition.schema.json",
    "door-fl-component-passport.example.json": "component-passport.schema.json",
    "component-definition-door-fl.example.json": "reusable-component-definition.schema.json",
}


def strip_extensions(instance: dict) -> dict:
    """Validate payload fields; keep $schema/$id out of additionalProperties conflicts if needed.

    Schemas set additionalProperties false and do not declare $schema/$id — strip for validation.
    """
    return {k: v for k, v in instance.items() if k not in {"$schema", "$id"}}


def run() -> dict:
    ts = datetime.now(timezone.utc).isoformat()
    results = []

    # Validate schemas themselves as Draft 2020-12 meta
    for schema_name in sorted({*EXAMPLE_SCHEMA_MAP.values(),
                               "entity-definition.schema.json",
                               "evidence-link.schema.json",
                               "cross-vehicle-comparison.schema.json"}):
        path = SCH / schema_name
        try:
            schema = json.loads(path.read_text())
            Draft202012Validator.check_schema(schema)
            results.append({
                "test_id": f"SCHEMA-META-{schema_name}",
                "execution_timestamp": ts,
                "runtime": "python3+jsonschema",
                "execution_status": "EXECUTED",
                "expected_result": "schema is valid Draft 2020-12",
                "actual_result": "OK",
                "pass_or_fail": "PASS",
                "error_message": None,
                "evidence_file": str(path),
            })
        except Exception as exc:  # noqa: BLE001
            results.append({
                "test_id": f"SCHEMA-META-{schema_name}",
                "execution_timestamp": ts,
                "runtime": "python3+jsonschema",
                "execution_status": "EXECUTED",
                "expected_result": "schema is valid Draft 2020-12",
                "actual_result": "FAIL",
                "pass_or_fail": "FAIL",
                "error_message": str(exc),
                "evidence_file": str(path),
            })

    for example_name, schema_name in EXAMPLE_SCHEMA_MAP.items():
        example_path = EX / example_name
        schema_path = SCH / schema_name
        try:
            schema = json.loads(schema_path.read_text())
            instance = strip_extensions(json.loads(example_path.read_text()))
            Draft202012Validator(schema).validate(instance)
            results.append({
                "test_id": f"EX-{example_name}",
                "execution_timestamp": ts,
                "runtime": "python3+jsonschema",
                "execution_status": "EXECUTED",
                "expected_result": f"valid against {schema_name}",
                "actual_result": "OK",
                "pass_or_fail": "PASS",
                "error_message": None,
                "evidence_file": str(example_path),
            })
        except (ValidationError, SchemaError, FileNotFoundError, json.JSONDecodeError) as exc:
            results.append({
                "test_id": f"EX-{example_name}",
                "execution_timestamp": ts,
                "runtime": "python3+jsonschema",
                "execution_status": "EXECUTED",
                "expected_result": f"valid against {schema_name}",
                "actual_result": "FAIL",
                "pass_or_fail": "FAIL",
                "error_message": str(exc),
                "evidence_file": str(example_path),
            })

    failed = sum(1 for r in results if r["pass_or_fail"] == "FAIL")
    return {
        "suite": "kernel-schema-validation",
        "execution_timestamp": ts,
        "runtime": "python3+jsonschema Draft202012Validator",
        "total": len(results),
        "passed": len(results) - failed,
        "failed": failed,
        "suite_pass_or_fail": "PASS" if failed == 0 else "FAIL",
        "results": results,
    }


if __name__ == "__main__":
    out = run()
    path = ROOT / "verification" / "results" / "kernel-schema-validation.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(out, indent=2) + "\n")
    print(json.dumps({"suite_pass_or_fail": out["suite_pass_or_fail"], "passed": out["passed"], "failed": out["failed"]}, indent=2))
    raise SystemExit(0 if out["suite_pass_or_fail"] == "PASS" else 1)
