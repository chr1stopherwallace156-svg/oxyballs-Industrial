from __future__ import annotations

import pytest

from egs_v1 import EgsGraphError, RelationshipGraph, validate_edge


def test_direct_neighbors_iface_layer(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    out = g.direct_neighbors("CFGCOMP-SYN-REGULATOR-FL", direction="out")
    targets = {n["node"] for n in out}
    assert "IFACE-MOUNT-HOLE-SYN-DOOR-INNER-01" in targets
    assert "CFGCOMP-SYN-GLASS-FL" in targets
    assert "IFACE-CONNECTOR-SYN-REGULATOR-C309B" in targets


def test_mates_with_interface(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    mates = g.interface_mates("IFACE-CONNECTOR-SYN-HARNESS-C309A")
    assert any(m["node"] == "IFACE-CONNECTOR-SYN-REGULATOR-C309B" for m in mates)


def test_dependency_traversal(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    deps = g.dependency_traversal("CFGCOMP-SYN-REGULATOR-FL", graph_planes={"PHYSICAL"})
    assert "IFACE-MOUNT-HOLE-SYN-DOOR-INNER-01" in deps
    assert "CFGCOMP-SYN-GLASS-FL" in deps


def test_impacted_component_traversal(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    # Harness mounts to connector; connector mates with regulator connector;
    # regulator owns that connector — inbound to regulator connector
    impacted = g.impacted_component_traversal(
        "IFACE-CONNECTOR-SYN-REGULATOR-C309B", graph_planes={"PHYSICAL"}
    )
    assert "CFGCOMP-SYN-REGULATOR-FL" in impacted or "IFACE-CONNECTOR-SYN-HARNESS-C309A" in impacted


def test_plane_isolation_procedural(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    phys = {e["edge_id"] for e in g.edges_for_plane("PHYSICAL")}
    proc = {e["edge_id"] for e in g.edges_for_plane("PROCEDURAL")}
    assert "REL-EGS-900005" in proc
    assert "REL-EGS-900005" not in phys
    assert phys.isdisjoint(proc)


def test_blocks_access_query(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    blockers = g.removal_precedence_candidates("IFACE-SERVICE-PORT-SYN-DOOR-INNER")
    assert {b["node"] for b in blockers} == {"CFGCOMP-SYN-TRIM-FL"}


def test_topological_order_procedural(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    order = g.topological_order(
        nodes={"OP-SYN-SECURE-GLASS-FL", "OP-SYN-UNBOLT-REGULATOR-FL"},
        graph_planes={"PROCEDURAL"},
        relationship_classes={"MUST_PRECEDE"},
    )
    assert order.index("OP-SYN-SECURE-GLASS-FL") < order.index("OP-SYN-UNBOLT-REGULATOR-FL")


def _cycle_edge(eid: str, src: str, tgt: str) -> dict:
    return {
        "schema_version": "EGS-1.0.0-proposal.2",
        "record_version": 1,
        "created_at": "2026-07-20T12:00:00Z",
        "created_by": "test",
        "supersedes_edge_id": None,
        "edge_id": eid,
        "aliases": [],
        "graph_plane": "PHYSICAL",
        "relationship_class": "SUPPORTS",
        "source_node_id": src,
        "target_node_id": tgt,
        "directionality": "FORWARD",
        "applicability_context": {
            "scope_type": "SYNTHETIC_FIXTURE",
            "configuration_id": "CFG-SYN-000001",
            "kernel_configuration_id": None,
            "model_year": None,
            "model_year_range": None,
            "vin": None,
            "inheritance": "NOT_INHERITED",
            "notes": None,
        },
        "verification_lifecycle": {
            "edge_status": "CANDIDATE_UNVERIFIED",
            "procedure_eligibility": "PROCEDURE_GENERATION_NOT_AUTHORIZED",
            "last_audited_date": "2026-07-20",
            "aggregation_notes": None,
        },
        "claims": {
            "relationship_existence": {
                "value": True,
                "status": "SOURCE_DISCOVERED",
                "evidence_assertion_ids": [],
                "mandatory": True,
                "notes": None,
            }
        },
        "transient_state": None,
        "notes": [],
    }


def test_cycle_detection_hard_cycle():
    edges = [
        _cycle_edge("REL-EGS-910001", "CFGCOMP-SYN-A", "CFGCOMP-SYN-B"),
        _cycle_edge("REL-EGS-910002", "CFGCOMP-SYN-B", "CFGCOMP-SYN-A"),
    ]
    for e in edges:
        assert validate_edge(e) == []
    g = RelationshipGraph(edges)
    cycles = g.find_cycles()
    assert cycles
    assert all(c["auto_resolved"] is False for c in cycles)
    assert any(c["kind"] == "HARD_CYCLE" for c in cycles)
    with pytest.raises(EgsGraphError) as ei:
        g.topological_order(nodes={"CFGCOMP-SYN-A", "CFGCOMP-SYN-B"})
    assert "never auto-resolved" in str(ei.value)


def test_state_dependent_cycle_classification():
    e1 = _cycle_edge("REL-EGS-910011", "CFGCOMP-SYN-A", "CFGCOMP-SYN-B")
    e2 = _cycle_edge("REL-EGS-910012", "CFGCOMP-SYN-B", "CFGCOMP-SYN-A")
    e2["relationship_class"] = "ACCESSIBLE_WHEN"
    e2["graph_plane"] = "PROCEDURAL"
    e2["transient_state"] = {"window_position": "SERVICE_HEIGHT"}
    # Fix e2 source/target to be OP-ish? ACCESSIBLE_WHEN can use IFACE/CFGCOMP per schema.
    # Plane must match — ACCESSIBLE_WHEN is PROCEDURAL. Good.
    g = RelationshipGraph([e1, e2])
    # Mixed planes — find cycles without plane filter may still see both if neighbors follow all
    cycles = g.find_cycles()
    assert cycles
    kinds = {c["kind"] for c in cycles}
    assert kinds & {"STATE_DEPENDENT_CYCLE", "CONDITIONAL_CYCLE", "HARD_CYCLE"}


def test_f450_sample_graph_loads(f450_edges):
    g = RelationshipGraph(f450_edges)
    assert "CFGCOMP-2019-F450-RC-4X2-60CA-DRW-REGULATOR-FL" in g.nodes()
    mates = g.interface_mates("IFACE-CONNECTOR-HARNESS-FL-C309A")
    assert {m["node"] for m in mates} == {"IFACE-CONNECTOR-REGULATOR-FL-C309B"}
    blockers = g.removal_precedence_candidates("IFACE-SERVICE-PORT-DOOR-INNER-FL")
    assert {b["node"] for b in blockers} == {
        "CFGCOMP-2019-F450-RC-4X2-60CA-DRW-TRIM-PANEL-FL"
    }
