from __future__ import annotations

import hashlib
import json
from pathlib import Path

import pytest

from egs_v1 import RelationshipGraph, validate_edge_collection

ROOT = Path(__file__).resolve().parents[2]
SLICE = ROOT / "research" / "vertical_slices" / "fl_door_2019_f450"
INCOMING = ROOT / "research" / "incoming" / "fl_door_vertical_slice"


@pytest.fixture
def slice_edges() -> list[dict]:
    doc = json.loads((SLICE / "CANDIDATE_EDGES.json").read_text())
    return doc["edges"]


def test_vertical_slice_edges_validate(slice_edges):
    validate_edge_collection(slice_edges)


def test_vertical_slice_procedure_blocked(slice_edges):
    for edge in slice_edges:
        assert edge["verification_lifecycle"]["procedure_eligibility"] in (
            "PROCEDURE_GENERATION_NOT_AUTHORIZED",
            "BLOCKED",
            "BLOCKED_UNVERIFIED_PROCEDURE",
        )
        assert edge["applicability_context"]["model_year"] == 2019
        assert edge["applicability_context"]["model_year_range"] is None


def test_c309_edge_contradicted_on_pin_count(slice_edges):
    edge = next(e for e in slice_edges if e["edge_id"] == "EDGE-2019-F450-HARNESS-TO-REGULATOR-C309")
    assert edge["verification_lifecycle"]["edge_status"] == "CONTRADICTED"
    assert edge["claims"]["pin_count"]["status"] == "CONTRADICTED"
    assert len(edge["claims"]["pin_count"]["conflicting_assertions"]) >= 2
    # IFACE↔IFACE mating
    assert edge["source_node_id"].startswith("IFACE-")
    assert edge["target_node_id"].startswith("IFACE-")


def test_no_invented_torque_or_voltage(slice_edges):
    for edge in slice_edges:
        claims = edge.get("claims") or {}
        for key in ("torque_specification", "fastener_count", "voltage_nominal", "pin_count"):
            if key in claims and key != "pin_count":
                assert claims[key].get("value") is None


def test_acquired_pdf_hashes_match_bytes():
    bag = INCOMING / "SRC-CAND-000001_2019_Ford_Body_Application_Guide.pdf"
    nhtsa = INCOMING / "SRC-NHTSA-17S33_RCMN-17V652-1463.pdf"
    assert bag.is_file() and nhtsa.is_file()
    assert hashlib.sha256(bag.read_bytes()).hexdigest() == (
        "4c7a4bf129e91d0934cb1e7e160a3069c9486048ce643598cdd55504404df922"
    )
    assert hashlib.sha256(nhtsa.read_bytes()).hexdigest() == (
        "fb3eda01d0de7c892083a9de6986be0dd2781e2aef8de40e4e6c0af8d4a59fba"
    )


def test_graph_loads_slice_edges(slice_edges):
    g = RelationshipGraph(slice_edges)
    assert "CFGCOMP-2019-F450-RC-4X2-60CA-DRW-REGULATOR-FL" in g.nodes()
    mates = g.interface_mates("IFACE-CONNECTOR-DOOR-HARNESS-TO-REGULATOR-C309A")
    assert any(m["node"] == "IFACE-CONNECTOR-REGULATOR-FL-C309B" for m in mates)


def test_supplies_power_to_plane(slice_edges):
    edge = next(e for e in slice_edges if e["relationship_class"] == "SUPPLIES_POWER_TO")
    assert edge["graph_plane"] == "FUNCTIONAL"
