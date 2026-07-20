from __future__ import annotations

from egs_v1 import aggregate_edge_status, classify_node, NodeKind, procedure_eligibility_for


def test_classify_hierarchy_kinds():
    assert classify_node("COMPDEF-WINDOW-REGULATOR-FL") == NodeKind.COMPDEF
    assert classify_node("CFGCOMP-2019-F450-RC-4X2-60CA-DRW-REGULATOR-FL") == NodeKind.CFGCOMP
    assert classify_node("CMPINST-VIN-1FD8X4GT1KDAXXXXX-REGULATOR-FL") == NodeKind.CMPINST
    assert classify_node("IFACE-CONNECTOR-HARNESS-FL-C309A") == NodeKind.IFACE
    assert classify_node("IFACE-MOUNT-HOLE-DOOR-INNER-FL-01") == NodeKind.IFACE
    assert classify_node("OP-SECURE-GLASS-FL") == NodeKind.OP
    assert classify_node("AID-000009") == NodeKind.FORBIDDEN


def test_procedure_eligibility_lock():
    assert procedure_eligibility_for("CANDIDATE_UNVERIFIED") == (
        "PROCEDURE_GENERATION_NOT_AUTHORIZED"
    )
    assert procedure_eligibility_for("PARTIALLY_VERIFIED") == (
        "PROCEDURE_GENERATION_NOT_AUTHORIZED"
    )
    assert procedure_eligibility_for("VERIFIED") == "PROCEDURE_GENERATION_AUTHORIZED"


def test_contradicted_aggregates():
    assert (
        aggregate_edge_status(
            {"relationship_existence": {"status": "CONTRADICTED", "mandatory": True}}
        )
        == "CONTRADICTED"
    )
