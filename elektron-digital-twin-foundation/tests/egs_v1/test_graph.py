from __future__ import annotations

import copy

import pytest

from egs_v1 import EgsGraphError, RelationshipGraph


def test_direct_neighbors(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    out = g.direct_neighbors("CMPINST-SYN-REGULATOR", direction="out")
    targets = {n["node"] for n in out}
    assert "CMPINST-SYN-DOOR-INNER" in targets
    assert "CMPINST-SYN-GLASS" in targets

    inbound = g.direct_neighbors("CMPINST-SYN-REGULATOR", direction="in")
    sources = {n["node"] for n in inbound}
    assert "CMPINST-SYN-HARNESS" in sources
    assert "CMPINST-SYN-TRIM" in sources
    assert "CMPINST-SYN-GLASS" in sources
    assert "CMPINST-SYN-BEAM" in sources


def test_dependency_traversal(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    deps = g.dependency_traversal("CMPINST-SYN-REGULATOR")
    assert "CMPINST-SYN-DOOR-INNER" in deps
    assert "CMPINST-SYN-GLASS" in deps


def test_impacted_component_traversal(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    impacted = g.impacted_component_traversal("CMPINST-SYN-REGULATOR")
    assert "CMPINST-SYN-HARNESS" in impacted
    assert "CMPINST-SYN-TRIM" in impacted


def test_blocks_removal_query(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    blockers = g.removal_precedence_candidates("CMPINST-SYN-REGULATOR")
    blocker_nodes = {b["node"] for b in blockers}
    assert blocker_nodes == {"CMPINST-SYN-TRIM", "CMPINST-SYN-GLASS"}


def test_topological_order_subset(synthetic_edges):
    g = RelationshipGraph(synthetic_edges)
    # trim/glass block regulator; regulator bolts to inner and supports glass —
    # for procedural BLOCKS_REMOVAL_OF only, topo order of {trim, glass, regulator}
    order = g.topological_order(
        nodes={
            "CMPINST-SYN-TRIM",
            "CMPINST-SYN-GLASS",
            "CMPINST-SYN-REGULATOR",
        },
        relationship_types={"BLOCKS_REMOVAL_OF"},
    )
    assert order.index("CMPINST-SYN-TRIM") < order.index("CMPINST-SYN-REGULATOR")
    assert order.index("CMPINST-SYN-GLASS") < order.index("CMPINST-SYN-REGULATOR")


def test_cycle_detection():
    edges = [
        {
            "edge_id": "REL-EGS-910001",
            "schema_version": "egs-v1.0.0-proposal",
            "relationship_class": "MECHANICAL_STRUCTURAL",
            "relationship_type": "SUPPORTS",
            "source_component_instance_id": "CMPINST-SYN-A",
            "target_component_instance_id": "CMPINST-SYN-B",
            "directionality": "FORWARD",
            "vehicle_instance_id": "VEH-SYN-000001",
            "configuration_id": "CFG-SYN-000001",
            "lifecycle_status": "CANDIDATE_UNVERIFIED",
            "applicability": {"scope": "SYNTHETIC_FIXTURE", "cab_config": None, "option_codes": [], "notes": None},
            "property_evidence_links": [
                {
                    "property_key": "relationship_existence",
                    "evidence_link_id": None,
                    "src_cand_id": None,
                    "evidence_status": "ABSENT",
                    "notes": None,
                }
            ],
            "engineering_properties": None,
            "aliases": [],
            "notes": [],
        },
        {
            "edge_id": "REL-EGS-910002",
            "schema_version": "egs-v1.0.0-proposal",
            "relationship_class": "MECHANICAL_STRUCTURAL",
            "relationship_type": "SUPPORTS",
            "source_component_instance_id": "CMPINST-SYN-B",
            "target_component_instance_id": "CMPINST-SYN-A",
            "directionality": "FORWARD",
            "vehicle_instance_id": "VEH-SYN-000001",
            "configuration_id": "CFG-SYN-000001",
            "lifecycle_status": "CANDIDATE_UNVERIFIED",
            "applicability": {"scope": "SYNTHETIC_FIXTURE", "cab_config": None, "option_codes": [], "notes": None},
            "property_evidence_links": [
                {
                    "property_key": "relationship_existence",
                    "evidence_link_id": None,
                    "src_cand_id": None,
                    "evidence_status": "ABSENT",
                    "notes": None,
                }
            ],
            "engineering_properties": None,
            "aliases": [],
            "notes": [],
        },
    ]
    g = RelationshipGraph(edges)
    cycles = g.find_cycles()
    assert cycles
    with pytest.raises(EgsGraphError):
        g.topological_order(nodes={"CMPINST-SYN-A", "CMPINST-SYN-B"})


def test_f450_sample_graph_loads(f450_edges):
    g = RelationshipGraph(f450_edges)
    assert "CMPINST-VEH000001-DOOR-FL-REGULATOR" in g.nodes()
    blockers = g.removal_precedence_candidates("CMPINST-VEH000001-DOOR-FL-REGULATOR")
    assert {b["node"] for b in blockers} == {
        "CMPINST-VEH000001-DOOR-FL-TRIM",
        "CMPINST-VEH000001-DOOR-FL-GLASS",
    }
