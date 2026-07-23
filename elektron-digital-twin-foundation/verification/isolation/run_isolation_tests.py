#!/usr/bin/env python3
"""Structural + fingerprint isolation checks for EDTS Kernel v1.0.0-rc1.

Runtime Instance Resolver tests are recorded in KERNEL_TEST_RESULTS.json as NOT_EXECUTED.
"""
from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCHEMAS = ROOT / "schemas"
DATASET = ROOT / "examples" / "2019_f450"

KERNEL_SCHEMAS = [
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

OEM_BANS = [
    "Ford", "Tesla", "Chevrolet", "Toyota", "GM",
    "F-450", "F-350", "Silverado", "Camry", "Model 3", "Super Duty", "Transit",
]

EXAMPLE_FILES = [
    "vehicle-instance.example.json",
    "exact-configuration.example.json",
    "door-fl-component-instance.example.json",
    "door-fl-geometry-asset.example.json",
    "door-fl-assembly-relationship.example.json",
    "door-fl-interaction.example.json",
    "door-fl-component-passport.example.json",
]


def fail(msg: str) -> None:
    print(f"FAIL: {msg}")
    raise AssertionError(msg)


def test_schemas_materialized() -> None:
    for name in KERNEL_SCHEMAS:
        path = SCHEMAS / name
        if not path.exists():
            fail(f"missing schema {name}")
        data = json.loads(path.read_text())
        if data.get("$schema") != "https://json-schema.org/draft/2020-12/schema":
            fail(f"{name} not Draft 2020-12")
        for key in ("$id", "type", "properties", "required", "additionalProperties"):
            if key not in data:
                fail(f"{name} missing {key}")
        if data.get("additionalProperties") is not False:
            fail(f"{name} additionalProperties must be false")
        blob = json.dumps({k: v for k, v in data.items() if k != "not"})
        for ban in OEM_BANS:
            if ban in blob:
                fail(f"OEM assumption '{ban}' found in universal schema {name}")


def test_schema_urn_ids() -> None:
    for name in KERNEL_SCHEMAS:
        data = json.loads((SCHEMAS / name).read_text())
        stem = name[: -len(".schema.json")]
        expected = f"urn:edts:schema:{stem}:v1"
        if data.get("$id") != expected:
            fail(f"{name} $id expected {expected}, got {data.get('$id')}")


def test_examples_materialized() -> None:
    if not DATASET.is_dir():
        fail(f"dataset missing: {DATASET}")
    for name in EXAMPLE_FILES:
        if not (DATASET / name).exists():
            fail(f"missing example {name}")


def test_vehicle_instance_scope() -> None:
    data = json.loads((DATASET / "vehicle-instance.example.json").read_text())
    if data.get("vehicle_instance_id") != "VEH-000001":
        fail("vehicle_instance_id mismatch")
    if data.get("configuration_id") != "CFG-000001":
        fail("configuration_id mismatch")
    if data.get("instance_scope") != "CONFIGURATION_REFERENCE":
        fail("instance_scope mismatch")
    if data.get("physical_asset_status") != "NOT_ASSIGNED":
        fail("physical_asset_status mismatch")


def test_door_instance_isolation_binding() -> None:
    data = json.loads((DATASET / "door-fl-component-instance.example.json").read_text())
    text = (DATASET / "door-fl-component-instance.example.json").read_text()
    if data.get("component_instance_id") != "CMPINST-VEH000001-DOOR-FL":
        fail("component_instance_id mismatch")
    if data.get("vehicle_instance_id") != "VEH-000001":
        fail("vehicle binding missing")
    if data.get("configuration_id") != "CFG-000001":
        fail("configuration binding missing")
    if data.get("engineering_verification_status") != "NOT_EVALUATED":
        fail("engineering_verification_status must be NOT_EVALUATED")
    if data.get("geometry_asset_ids") != []:
        fail("geometry_asset_ids must be empty until explicit link on instance (passport may list GEO)")
    for ban in ["2017", "2018", "2020", "model_year_range", "platform_family", "F-350", "4x4", "Crew Cab"]:
        if ban in text:
            fail(f"leakage token {ban}")


def test_configuration_fingerprint_rfc8785_style() -> None:
    data = json.loads((DATASET / "exact-configuration.example.json").read_text())
    if data.get("model_year") != 2019:
        fail("model_year must be 2019")
    if data.get("fingerprint_version") != 1:
        fail("fingerprint_version must be 1")
    canon = data.get("fingerprint_canonical_json")
    fp = data.get("configuration_fingerprint")
    if not canon or not fp:
        fail("fingerprint fields missing")
    expected = "sha256:" + hashlib.sha256(canon.encode("utf-8")).hexdigest()
    if fp != expected:
        fail(f"fingerprint mismatch: {fp} != {expected}")
    if data.get("inheritance_status") != "NONE":
        fail("inheritance_status must be NONE")
    if "wheelbase_mm" not in data or "cab_to_axle_mm" not in data:
        fail("lengths must be mm fields")


def test_interaction_visual_preview_only() -> None:
    data = json.loads((DATASET / "door-fl-interaction.example.json").read_text())
    if data.get("interaction_class") not in ("PROTOTYPE", "VISUAL_PREVIEW_ONLY"):
        fail("interaction_class must be visual preview class")
    if data.get("disassembly_status") == "ENGINEERING_VERIFIED":
        fail("disassembly must not be ENGINEERING_VERIFIED")
    if data.get("runtime_execution_status") != "NOT_EXECUTED":
        fail("runtime_execution_status must be NOT_EXECUTED")


def test_negative_fixture_not_in_examples() -> None:
    illicit = ROOT / "verification" / "isolation" / "fixtures" / "illicit_year_range_instance.json"
    data = json.loads(illicit.read_text())
    if "model_year_range" not in data:
        fail("negative fixture malformed")
    for path in (ROOT / "examples").rglob("*.json"):
        if "model_year_range" in path.read_text():
            fail(f"illicit model_year_range in {path}")


def test_kernel_test_results_runtime_not_executed() -> None:
    results = json.loads((ROOT / "KERNEL_TEST_RESULTS.json").read_text())
    if results.get("suite_status") != "EDTS_EXACT_VEHICLE_KERNEL_VALIDATION_PENDING":
        fail("suite_status must be VALIDATION_PENDING until runtime tests execute")
    runtime = [r for r in results["results"] if r["test_type"] == "RUNTIME_ISOLATION"]
    if not runtime:
        fail("missing runtime isolation tests")
    for r in runtime:
        if r.get("execution_status") != "NOT_EXECUTED":
            fail(f"{r['test_id']} must remain NOT_EXECUTED until harness exists")


def main() -> int:
    tests = [
        test_schemas_materialized,
        test_schema_urn_ids,
        test_examples_materialized,
        test_vehicle_instance_scope,
        test_door_instance_isolation_binding,
        test_configuration_fingerprint_rfc8785_style,
        test_interaction_visual_preview_only,
        test_negative_fixture_not_in_examples,
        test_kernel_test_results_runtime_not_executed,
    ]
    failed = 0
    for t in tests:
        try:
            t()
            print(f"PASS: {t.__name__}")
        except AssertionError:
            failed += 1
        except Exception as exc:  # noqa: BLE001
            print(f"FAIL: {t.__name__}: {exc}")
            failed += 1
    print(f"summary: {len(tests) - failed}/{len(tests)} passed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
