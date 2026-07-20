"""EGS-1.0.0-proposal.2 graph plane isolation."""

from __future__ import annotations

from typing import FrozenSet

GRAPH_PLANES: FrozenSet[str] = frozenset({"PHYSICAL", "FUNCTIONAL", "PROCEDURAL"})

# relationship_class → owning plane
PLANE_MEMBERSHIP: dict[str, str] = {
    # Plane 1 — Physical topology
    "BOLTED_TO": "PHYSICAL",
    "WELDED_TO": "PHYSICAL",
    "MOUNTED_TO": "PHYSICAL",
    "HINGES_ON": "PHYSICAL",
    "SUPPORTS": "PHYSICAL",
    "OVERLAPS": "PHYSICAL",
    "CONTAINS": "PHYSICAL",
    "MATES_WITH": "PHYSICAL",
    "GUIDES_MOTION_OF": "PHYSICAL",
    "EXTRACTION_PATH_PASSES_ADJACENT_TO": "PHYSICAL",
    "BLOCKS_ACCESS_TO": "PHYSICAL",
    "ROUTES_THROUGH": "PHYSICAL",
    "PASSES_BEHIND": "PHYSICAL",
    # Plane 2 — Functional topology
    "TRANSMITS_LIN_DATA_TO": "FUNCTIONAL",
    "TRANSMITS_SIGNAL_TO": "FUNCTIONAL",
    # Plane 3 — Procedural
    "MUST_PRECEDE": "PROCEDURAL",
    "MUST_BE_DISCONNECTED_BEFORE": "PROCEDURAL",
    "ACCESSIBLE_WHEN": "PROCEDURAL",
    "BLOCKS_REMOVAL_OF": "PROCEDURAL",
}

# Permanent structural classes — must NOT carry transient_state
PERMANENT_STRUCTURAL_CLASSES: FrozenSet[str] = frozenset(
    {
        "BOLTED_TO",
        "WELDED_TO",
        "MOUNTED_TO",
        "HINGES_ON",
        "SUPPORTS",
        "OVERLAPS",
        "CONTAINS",
        "MATES_WITH",
        "GUIDES_MOTION_OF",
        "ROUTES_THROUGH",
        "PASSES_BEHIND",
    }
)

# Classes allowed to carry transient_state
TRANSIENT_STATE_ALLOWED_CLASSES: FrozenSet[str] = frozenset(
    {"ACCESSIBLE_WHEN", "MUST_BE_DISCONNECTED_BEFORE", "MUST_PRECEDE"}
)

# Structural classes require ONLY relationship_existence as mandatory claim
STRUCTURAL_EXISTENCE_ONLY: FrozenSet[str] = frozenset(PERMANENT_STRUCTURAL_CLASSES) | frozenset(
    {
        "EXTRACTION_PATH_PASSES_ADJACENT_TO",
        "BLOCKS_ACCESS_TO",
        "BLOCKS_REMOVAL_OF",
        "GUIDES_MOTION_OF",
    }
)
