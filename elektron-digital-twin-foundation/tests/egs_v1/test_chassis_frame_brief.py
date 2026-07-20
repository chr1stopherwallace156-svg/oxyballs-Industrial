from __future__ import annotations

import hashlib
import json
from pathlib import Path

import pytest

from egs_v1 import RelationshipGraph, validate_edge_collection

ROOT = Path(__file__).resolve().parents[2]
SLICE = ROOT / "research" / "vertical_slices" / "chassis_frame_2019_f450"
INCOMING = ROOT / "research" / "incoming" / "chassis_frame_ab"


def test_chassis_frame_edges_validate():
    edges = json.loads((SLICE / "CANDIDATE_EDGES.json").read_text())["edges"]
    validate_edge_collection(edges)
    g = RelationshipGraph(edges)
    assert "CFGCOMP-2019-F450-RC-4X2-60CA-DRW-FRAME" in g.nodes()
    assert "IFACE-UPFITTER-AFT-CAB" in g.nodes()


def test_fleet_and_brochure_hashes():
    fleet = INCOMING / "SRC-CAND-000010_2019_F350_450_550_Chassis_Cabs_Fleet_Spec.pdf"
    skeeter = INCOMING / "SRC-CAND-000011_SkeeterFordChassis2019.pdf"
    assert hashlib.sha256(fleet.read_bytes()).hexdigest() == (
        "7a92e4ea839a3a7d163e2c374e6cfde0a24d277e1ee40013217cc6b3cab9c030"
    )
    assert hashlib.sha256(skeeter.read_bytes()).hexdigest() == (
        "f71e9eebf97ebe4f90ab5aaa5d780504e73df63d5008a7f5af8e4e35c8c6589f"
    )


def test_brief_locks_exact_wb_ca():
    brief = json.loads((SLICE / "ENGINEERING_EVIDENCE_BRIEF_AB.json").read_text())
    assert brief["locked_configuration"]["proposal_configuration_id"] == (
        "CFG-2019-F450-REG-CAB-4X2-60CA-DRW"
    )
    dims = {d["attr"]: d for d in brief["global_dimensions"]}
    assert dims["wheelbase_L101"]["value_in"] == 145.3
    assert dims["cab_to_axle_D"]["value_in"] == 60.0
    assert dims["wheelbase_L101"]["status"] == "ASSERTION_EXTRACTED"
    # F-350 pollution rejected for H width note
    frame = {f["attr"]: f for f in brief["frame_geometry"]}
    assert frame["outside_frame_rail_width_H"]["value_in"] == 34.2
    assert "34.1" in frame["outside_frame_rail_width_H"]["cross_config_warning"]


def test_mission_d_selected():
    brief = json.loads((SLICE / "ENGINEERING_EVIDENCE_BRIEF_AB.json").read_text())
    assert brief["next_mission_selected"] == "MISN-000004"
    misn = json.loads((ROOT / "research/missions/MISN-000004.json").read_text())
    assert "Twin-I-Beam" in " ".join(misn["notes"]) or "invent" in " ".join(misn["notes"]).lower()
