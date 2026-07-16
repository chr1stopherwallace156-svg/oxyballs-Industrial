#!/usr/bin/env python3
"""Negative isolation tests for HR-EVI (Exact Vehicle Isolation).

Proves schemas stay vehicle-agnostic and the Ford dataset does not leak
cross-vehicle applicability. Exit code 0 = pass.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCHEMAS = ROOT / "schemas"
DATASET = ROOT / "examples" / "ford" / "2019_f450_regularcab_4x2_drw"

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
    "Ford",
    "Tesla",
    "Chevrolet",
    "Toyota",
    "GM",
    "F-450",
    "F-350",
    "Silverado",
    "Camry",
    "Model 3",
    "Super Duty",
    "Transit",
]

LEAK_BANS_IN_DOOR_INSTANCE = [
    "2017",
    "2018",
    "2020",
    "F-350",
    "F-550",
    "Crew Cab",
    "4x4",
    "SRW",
    "model_year_range",
    "platform_family",
    "Super Duty",
    "Tesla",
    "Camry",
    "Silverado",
]


def fail(msg: str) -> None:
    print(f"FAIL: {msg}")
    raise AssertionError(msg)


def test_schemas_are_draft_2020_12_and_universal() -> None:
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
        # Exclude 'not' subtrees used to forbid bad fields
        blob = json.dumps({k: v for k, v in data.items() if k != "not"})
        for ban in OEM_BANS:
            if ban in blob:
                fail(f"OEM assumption '{ban}' found in universal schema {name}")
        if "model_year_range" in data.get("properties", {}):
            fail(f"{name} defines model_year_range property")


def test_dataset_path_exists() -> None:
    if not DATASET.is_dir():
        fail(f"dataset missing: {DATASET}")


def test_door_instance_exact_binding_no_leakage() -> None:
    path = DATASET / "door-fl-component-instance.example.json"
    text = path.read_text()
    data = json.loads(text)
    if data.get("vehicle_instance_id") != "VEH-000001":
        fail("door instance must bind VEH-000001")
    if data.get("configuration_id") != "CFG-000001":
        fail("door instance must bind CFG-000001")
    if data.get("component_instance_id") != "CMPINST-VEH000001-DOOR-FL":
        fail("unexpected component_instance_id")
    if "model_year_range" in data:
        fail("model_year_range present on component instance")
    if data.get("reusable_component_definition_id") is not None:
        fail("reusable definition must not be linked until proven")
    for ban in LEAK_BANS_IN_DOOR_INSTANCE:
        if ban in text:
            fail(f"cross-vehicle leakage token '{ban}' in door instance")


def test_vehicle_year_is_single_2019() -> None:
    data = json.loads((DATASET / "vehicle-instance.example.json").read_text())
    if data.get("model_year") != 2019:
        fail("vehicle model_year must be exactly 2019 for this dataset")
    if "model_year_range" in data:
        fail("vehicle must not use model_year_range")


def test_config_axes_exact() -> None:
    data = json.loads((DATASET / "exact-configuration.example.json").read_text())
    if data.get("vehicle_instance_id") != "VEH-000001":
        fail("config must bind VEH-000001")
    if data.get("drivetrain") != "4x2":
        fail("unexpected drivetrain")
    if data.get("rear_wheel_configuration") != "DRW":
        fail("unexpected rear wheel configuration")
    if data.get("inheritance_status") != "NONE":
        fail("inheritance_status must be NONE")


def test_interaction_is_visual_preview_only() -> None:
    data = json.loads((DATASET / "door-fl-interaction.example.json").read_text())
    if data.get("interaction_class") not in ("PROTOTYPE", "VISUAL_PREVIEW_ONLY"):
        fail("interaction_class must be PROTOTYPE or VISUAL_PREVIEW_ONLY")
    if data.get("disassembly_status") == "ENGINEERING_VERIFIED":
        fail("disassembly must not be ENGINEERING_VERIFIED without proof")
    if data.get("runtime_execution_status") != "NOT_EXECUTED":
        fail("runtime_execution_status must be NOT_EXECUTED")


def test_passport_evidence_empty() -> None:
    data = json.loads((DATASET / "door-fl-component-passport.example.json").read_text())
    links = data.get("links", {})
    if links.get("evidence_link_ids"):
        fail("evidence_link_ids must be empty until real sources are linked")
    if data.get("vehicle_instance_id") != "VEH-000001":
        fail("passport must bind VEH-000001")
    if data.get("configuration_id") != "CFG-000001":
        fail("passport must bind CFG-000001")


def test_negative_fixture_rejected_by_policy() -> None:
    """Negative fixture: illicit year-range instance must not live in dataset tree."""
    illicit = ROOT / "verification" / "isolation" / "fixtures" / "illicit_year_range_instance.json"
    data = json.loads(illicit.read_text())
    if "model_year_range" not in data:
        fail("negative fixture must contain model_year_range for the test")
    # Ensure it is NOT copied into examples/
    for path in (ROOT / "examples").rglob("*.json"):
        raw = path.read_text()
        if "model_year_range" in raw:
            fail(f"illicit model_year_range leaked into dataset file {path}")


def test_foreign_vehicle_id_not_in_ford_dataset() -> None:
    foreign_tokens = ["VEH-TESLA", "VEH-TOYOTA", "VEH-CHEVROLET", "CFG-TESLA"]
    for path in DATASET.glob("*.json"):
        text = path.read_text()
        for tok in foreign_tokens:
            if tok in text:
                fail(f"foreign vehicle token {tok} in {path.name}")


def test_configuration_fingerprint_matches_canonical() -> None:
    import hashlib

    data = json.loads((DATASET / "exact-configuration.example.json").read_text())
    canonical = data.get("fingerprint_canonical_string")
    digest = data.get("configuration_fingerprint")
    algo = data.get("fingerprint_algorithm")
    if algo != "EDTS_CFG_FINGERPRINT_SHA256_V1":
        fail("unexpected fingerprint_algorithm")
    if not canonical or not digest:
        fail("fingerprint fields missing")
    expected = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
    if digest != expected:
        fail("configuration_fingerprint does not match canonical string")
    if data.get("inheritance_status") != "NONE":
        fail("inheritance_status must be NONE")


def test_schema_urn_ids() -> None:
    for name in KERNEL_SCHEMAS:
        data = json.loads((SCHEMAS / name).read_text())
        expected = f"urn:edts:schema:{name.replace('.schema.json', '')}:v1"
        # name already includes .schema.json in KERNEL_SCHEMAS entries
        stem = name[: -len(".schema.json")]
        expected = f"urn:edts:schema:{stem}:v1"
        if data.get("$id") != expected:
            fail(f"{name} $id expected {expected}, got {data.get('$id')}")


def main() -> int:
    tests = [
        test_schemas_are_draft_2020_12_and_universal,
        test_dataset_path_exists,
        test_door_instance_exact_binding_no_leakage,
        test_vehicle_year_is_single_2019,
        test_config_axes_exact,
        test_interaction_is_visual_preview_only,
        test_passport_evidence_empty,
        test_negative_fixture_rejected_by_policy,
        test_foreign_vehicle_id_not_in_ford_dataset,
        test_configuration_fingerprint_matches_canonical,
        test_schema_urn_ids,
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
