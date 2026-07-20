from __future__ import annotations

import copy

import pytest

from egs_v1 import (
    EgsValidationError,
    aggregate_edge_status,
    validate_edge,
    validate_edge_collection,
)


def test_synthetic_edges_validate(synthetic_edges):
    validate_edge_collection(synthetic_edges)


def test_f450_edges_locked_candidate_unverified(f450_edges):
    validate_edge_collection(f450_edges)
    for edge in f450_edges:
        assert edge["verification_lifecycle"]["edge_status"] == "CANDIDATE_UNVERIFIED"
        assert edge["verification_lifecycle"]["procedure_eligibility"] in (
            "PROCEDURE_GENERATION_NOT_AUTHORIZED",
            "BLOCKED_UNVERIFIED_PROCEDURE",
            "BLOCKED",
        )
        assert edge["applicability_context"]["scope_type"] == "CONFIGURATION_REFERENCE"
        assert edge["applicability_context"]["model_year_range"] is None
        assert edge["applicability_context"]["model_year"] == 2019
        src = edge["source_node_id"]
        tgt = edge["target_node_id"]
        assert not src.startswith("AID-")
        assert not tgt.startswith("AID-")
        assert not src.startswith("CMPINST-")
        assert not tgt.startswith("CMPINST-")


def test_f450_audit_aliases(f450_sample_doc):
    aliases = {a for e in f450_sample_doc["edges"] for a in e.get("aliases", [])}
    assert aliases == {
        "REL-REG-01",
        "REL-REG-02",
        "REL-REG-03",
        "REL-REG-04",
        "REL-REG-05",
        "REL-REG-06",
    }
    assert f450_sample_doc["authority_status"] == "REAL_DATA_PROMOTION_BLOCKED"


def test_rejects_aid_endpoint(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["source_node_id"] = "AID-000009"
    errors = validate_edge(edge)
    assert any("AID" in e or "EDTS-COMP" in e or "must not be" in e for e in errors)


def test_rejects_cmpinst_on_configuration_reference(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["applicability_context"]["scope_type"] = "CONFIGURATION_REFERENCE"
    edge["applicability_context"]["configuration_id"] = "CFG-2019-F450-REG-CAB-4X2-60CA-DRW"
    edge["applicability_context"]["model_year"] = 2019
    edge["source_node_id"] = "CMPINST-VIN-1FD8X4GT1KDAXXXXX-REGULATOR-FL"
    errors = validate_edge(edge)
    assert any("CMPINST" in e for e in errors)


def test_rejects_model_year_range_on_configuration_reference(f450_edges):
    edge = copy.deepcopy(f450_edges[0])
    edge["applicability_context"]["model_year_range"] = "2017-2019"
    errors = validate_edge(edge)
    assert any("model_year_range" in e for e in errors)


def test_rejects_transient_state_on_bolted_to(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["transient_state"] = {"window_position": "CLOSED"}
    errors = validate_edge(edge)
    assert any("transient_state forbidden" in e for e in errors)


def test_rejects_wrong_plane(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["graph_plane"] = "PROCEDURAL"
    errors = validate_edge(edge)
    assert any("belongs to plane" in e for e in errors)


def test_aggregation_candidate_when_existence_unverified():
    claims = {
        "relationship_existence": {"status": "SOURCE_DISCOVERED", "mandatory": True},
        "torque_specification": {"status": "UNRESOLVED_SOURCE_REQUIRED", "mandatory": False},
    }
    assert aggregate_edge_status(claims) == "CANDIDATE_UNVERIFIED"


def test_aggregation_partially_verified_optional_gaps():
    claims = {
        "relationship_existence": {
            "status": "ASSERTION_VERIFIED",
            "evidence_assertion_ids": ["EVD-1"],
            "mandatory": True,
        },
        "torque_specification": {
            "status": "UNRESOLVED_SOURCE_REQUIRED",
            "mandatory": False,
        },
    }
    assert aggregate_edge_status(claims) == "PARTIALLY_VERIFIED"


def test_aggregation_verified_when_all_mandatory_verified():
    claims = {
        "relationship_existence": {
            "status": "ASSERTION_VERIFIED",
            "evidence_assertion_ids": ["EVD-1"],
            "mandatory": True,
        }
    }
    assert aggregate_edge_status(claims) == "VERIFIED"


def test_lifecycle_mismatch_rejected(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["verification_lifecycle"]["edge_status"] = "VERIFIED"
    edge["verification_lifecycle"]["procedure_eligibility"] = (
        "PROCEDURE_GENERATION_AUTHORIZED"
    )
    errors = validate_edge(edge)
    assert any("inconsistent" in e for e in errors)


def test_assertion_verified_requires_evidence_ids(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["claims"]["relationship_existence"] = {
        "value": True,
        "status": "ASSERTION_VERIFIED",
        "evidence_assertion_ids": [],
        "mandatory": True,
    }
    edge["verification_lifecycle"]["edge_status"] = "PARTIALLY_VERIFIED"
    edge["verification_lifecycle"]["procedure_eligibility"] = (
        "PROCEDURE_GENERATION_NOT_AUTHORIZED"
    )
    # Add optional unresolved so aggregation = PARTIALLY_VERIFIED if existence verified
    edge["claims"]["torque_specification"] = {
        "value": None,
        "status": "UNRESOLVED_SOURCE_REQUIRED",
        "mandatory": False,
    }
    errors = validate_edge(edge)
    assert any("ASSERTION_VERIFIED requires" in e for e in errors)


def test_collection_raises(synthetic_edges):
    bad = copy.deepcopy(synthetic_edges[0])
    bad["source_node_id"] = "AID-000001"
    with pytest.raises(EgsValidationError) as ei:
        validate_edge_collection([bad])
    assert ei.value.errors


def test_contradicted_requires_conflicting_assertions(synthetic_edges):
    edge = copy.deepcopy(synthetic_edges[0])
    edge["claims"]["fastener_count"] = {
        "value": None,
        "status": "CONTRADICTED",
        "evidence_assertion_ids": [],
        "mandatory": False,
    }
    edge["verification_lifecycle"]["edge_status"] = "CONTRADICTED"
    edge["verification_lifecycle"]["procedure_eligibility"] = (
        "PROCEDURE_GENERATION_NOT_AUTHORIZED"
    )
    errors = validate_edge(edge)
    assert any("conflicting_assertions" in e for e in errors)
    edge["claims"]["fastener_count"]["conflicting_assertions"] = [
        {"source_id": "EVD-A", "claimed_value": 4},
        {"source_id": "EVD-B", "claimed_value": 3},
    ]
    assert validate_edge(edge) == []
