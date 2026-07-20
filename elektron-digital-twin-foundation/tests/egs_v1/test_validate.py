from __future__ import annotations

import copy

import pytest

from egs_v1 import EgsValidationError, validate_edge, validate_edge_collection


def test_synthetic_edges_validate(synthetic_edges):
    validate_edge_collection(synthetic_edges)


def test_f450_edges_are_candidate_unverified_without_engineering_specs(f450_edges):
    validate_edge_collection(f450_edges)
    for edge in f450_edges:
        assert edge["lifecycle_status"] == "CANDIDATE_UNVERIFIED"
        assert edge["engineering_properties"] is None
        assert edge["source_component_instance_id"].startswith("CMPINST-")
        assert edge["target_component_instance_id"].startswith("CMPINST-")
        assert not edge["source_component_instance_id"].startswith("AID-")


def test_rejects_aid_as_endpoint(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["source_component_instance_id"] = "AID-000009"
    errors = validate_edge(edge)
    assert any("CMPINST" in e for e in errors)


def test_rejects_edts_comp_alias_as_endpoint(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["target_component_instance_id"] = "EDTS-COMP-FL-REGULATOR"
    errors = validate_edge(edge)
    assert any("not asset/passport alias" in e for e in errors)


def test_rejects_type_class_mismatch(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["relationship_class"] = "PROCEDURAL"
    edge["relationship_type"] = "BOLTED_TO"
    errors = validate_edge(edge)
    assert any("not allowed under class" in e for e in errors)


def test_rejects_torque_without_bound_evidence(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["engineering_properties"] = {"torque_nm": 9.0, "torque_tolerance": "+/- 1.3"}
    edge["property_evidence_links"].append(
        {
            "property_key": "torque_specification",
            "evidence_link_id": None,
            "src_cand_id": None,
            "evidence_status": "ABSENT",
            "notes": None,
        }
    )
    errors = validate_edge(edge)
    assert any("BOUND" in e for e in errors)


def test_rejects_candidate_unverified_with_engineering_properties(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["lifecycle_status"] = "CANDIDATE_UNVERIFIED"
    edge["engineering_properties"] = {"fastener_count": 3}
    errors = validate_edge(edge)
    assert any("must not populate engineering_properties" in e for e in errors)


def test_overlaps_requires_bidirectional(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["relationship_class"] = "MECHANICAL_STRUCTURAL"
    edge["relationship_type"] = "OVERLAPS"
    edge["directionality"] = "FORWARD"
    errors = validate_edge(edge)
    assert any("BIDIRECTIONAL" in e for e in errors)


def test_collection_raises(synthetic_edges):
    bad = copy.deepcopy(synthetic_edges[0])
    bad["source_component_instance_id"] = "AID-000001"
    with pytest.raises(EgsValidationError) as ei:
        validate_edge_collection([bad])
    assert ei.value.errors


def test_verified_requires_bound_existence(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["lifecycle_status"] = "VERIFIED"
    edge["engineering_properties"] = None
    errors = validate_edge(edge)
    assert any("VERIFIED requires" in e for e in errors)
