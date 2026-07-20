"""EGS-v1 edge validation rules (proposal — non-kernel)."""

from __future__ import annotations

import re
from typing import Any

from .errors import EgsValidationError

CMPINST_RE = re.compile(r"^CMPINST-[A-Z0-9-]+$")
VEH_RE = re.compile(r"^VEH-[A-Z0-9-]+$")
CFG_RE = re.compile(r"^CFG-[A-Z0-9-]+$")
EDGE_ID_RE = re.compile(r"^REL-EGS-[0-9]{6}$")
AID_RE = re.compile(r"^AID-", re.IGNORECASE)

SCHEMA_VERSION = "egs-v1.0.0-proposal"

RELATIONSHIP_CLASS_TYPES: dict[str, frozenset[str]] = {
    "MECHANICAL_STRUCTURAL": frozenset(
        {"BOLTED_TO", "MOUNTED_TO", "HINGES_ON", "SUPPORTS", "OVERLAPS", "CONTAINS"}
    ),
    "ELECTRICAL_FLUID": frozenset({"CONNECTED_TO", "ROUTES_THROUGH", "PASSES_BEHIND"}),
    "KINEMATIC_GEOMETRIC": frozenset({"INTERFERES_WITH", "SLIDES_ALONG"}),
    "PROCEDURAL": frozenset({"BLOCKS_REMOVAL_OF"}),
}

ALL_TYPES = frozenset().union(*RELATIONSHIP_CLASS_TYPES.values())

LIFECYCLE = frozenset(
    {
        "CANDIDATE_UNVERIFIED",
        "RESEARCH_CLAIM",
        "DOCUMENT_SUPPORTED",
        "VERIFIED",
        "REJECTED",
        "SUPERSEDED",
    }
)

ENGINEERING_FIELDS = (
    "torque_nm",
    "torque_tolerance",
    "fastener_id",
    "fastener_count",
    "connector_description",
    "removal_precedence_index",
)

PROPERTY_TO_ENG_FIELDS: dict[str, tuple[str, ...]] = {
    "torque_specification": ("torque_nm", "torque_tolerance"),
    "fastener_specification": ("fastener_id", "fastener_count"),
    "connector_interface": ("connector_description",),
    "removal_precedence": ("removal_precedence_index",),
}


def _is_populated(value: Any) -> bool:
    return value is not None and value != "" and value != []


def validate_edge(edge: dict[str, Any], *, require_schema_fields: bool = True) -> list[str]:
    """Validate one edge. Returns list of error strings (empty if valid)."""
    errors: list[str] = []

    if require_schema_fields:
        for key in (
            "edge_id",
            "schema_version",
            "relationship_class",
            "relationship_type",
            "source_component_instance_id",
            "target_component_instance_id",
            "directionality",
            "vehicle_instance_id",
            "configuration_id",
            "lifecycle_status",
            "applicability",
            "property_evidence_links",
        ):
            if key not in edge:
                errors.append(f"missing required field: {key}")

    edge_id = edge.get("edge_id")
    if edge_id is not None and not EDGE_ID_RE.match(str(edge_id)):
        errors.append(f"edge_id must match REL-EGS-######, got {edge_id!r}")

    if edge.get("schema_version") not in (None, SCHEMA_VERSION):
        errors.append(f"schema_version must be {SCHEMA_VERSION!r}")

    src = edge.get("source_component_instance_id")
    tgt = edge.get("target_component_instance_id")
    for label, node in (("source", src), ("target", tgt)):
        if node is None:
            continue
        node_s = str(node)
        if AID_RE.match(node_s) or node_s.startswith("EDTS-COMP-") or node_s.startswith("ASSET-"):
            errors.append(
                f"{label}_component_instance_id must be CMPINST-* "
                f"(component-instance), not asset/passport alias {node_s!r}"
            )
        elif not CMPINST_RE.match(node_s):
            errors.append(f"{label}_component_instance_id invalid: {node_s!r}")

    if src and tgt and src == tgt:
        errors.append("source and target component-instance IDs must differ")

    veh = edge.get("vehicle_instance_id")
    if veh is not None and not VEH_RE.match(str(veh)):
        errors.append(f"invalid vehicle_instance_id: {veh!r}")

    cfg = edge.get("configuration_id")
    if cfg is not None and not CFG_RE.match(str(cfg)):
        errors.append(f"invalid configuration_id: {cfg!r}")

    rclass = edge.get("relationship_class")
    rtype = edge.get("relationship_type")
    if rclass is not None and rclass not in RELATIONSHIP_CLASS_TYPES:
        errors.append(f"unknown relationship_class: {rclass!r}")
    if rtype is not None and rtype not in ALL_TYPES:
        errors.append(f"unknown relationship_type: {rtype!r}")
    if rclass in RELATIONSHIP_CLASS_TYPES and rtype is not None:
        if rtype not in RELATIONSHIP_CLASS_TYPES[rclass]:
            errors.append(
                f"relationship_type {rtype!r} not allowed under class {rclass!r}"
            )

    direction = edge.get("directionality")
    if direction is not None and direction not in ("FORWARD", "BACKWARD", "BIDIRECTIONAL"):
        errors.append(f"invalid directionality: {direction!r}")

    # OVERLAPS should be bidirectional
    if rtype == "OVERLAPS" and direction not in (None, "BIDIRECTIONAL"):
        errors.append("OVERLAPS requires directionality=BIDIRECTIONAL")

    life = edge.get("lifecycle_status")
    if life is not None and life not in LIFECYCLE:
        errors.append(f"invalid lifecycle_status: {life!r}")

    appl = edge.get("applicability")
    if appl is not None:
        if not isinstance(appl, dict):
            errors.append("applicability must be an object")
        elif "scope" not in appl:
            errors.append("applicability.scope is required")
        elif appl["scope"] not in (
            "EXACT_CONFIGURATION",
            "PLATFORM_BAND",
            "SYNTHETIC_FIXTURE",
            "UNKNOWN",
        ):
            errors.append(f"invalid applicability.scope: {appl.get('scope')!r}")

    links = edge.get("property_evidence_links")
    link_status: dict[str, Any] = {}
    if links is not None:
        if not isinstance(links, list):
            errors.append("property_evidence_links must be an array")
        else:
            keys = []
            for i, link in enumerate(links):
                if not isinstance(link, dict):
                    errors.append(f"property_evidence_links[{i}] must be object")
                    continue
                if "property_key" not in link or "evidence_status" not in link:
                    errors.append(
                        f"property_evidence_links[{i}] requires property_key and evidence_status"
                    )
                keys.append(link.get("property_key"))
                if "property_key" in link:
                    link_status[link["property_key"]] = link.get("evidence_status")
            if "relationship_existence" not in keys:
                errors.append(
                    "property_evidence_links must include relationship_existence"
                )

    # VERIFIED lifecycle requires BOUND existence evidence (independent of eng props)
    if life == "VERIFIED":
        if link_status.get("relationship_existence") != "BOUND":
            errors.append(
                "lifecycle_status=VERIFIED requires "
                "relationship_existence evidence_status=BOUND"
            )

    # Engineering properties require BOUND evidence for the matching property_key
    eng = edge.get("engineering_properties")
    if eng:
        if not isinstance(eng, dict):
            errors.append("engineering_properties must be object or null")
        else:
            for prop_key, fields in PROPERTY_TO_ENG_FIELDS.items():
                if any(_is_populated(eng.get(f)) for f in fields):
                    status = link_status.get(prop_key)
                    if status != "BOUND":
                        errors.append(
                            f"engineering_properties fields {fields} require "
                            f"property_evidence_links[{prop_key}].evidence_status=BOUND "
                            f"(got {status!r}) — do not invent F-450 specs without verified evidence"
                        )

    # CANDIDATE_UNVERIFIED must not carry populated engineering specs
    if life == "CANDIDATE_UNVERIFIED" and eng:
        if any(_is_populated(eng.get(f)) for f in ENGINEERING_FIELDS):
            errors.append(
                "CANDIDATE_UNVERIFIED edges must not populate engineering_properties "
                "(torque/fastener/connector/removal) until verified evidence exists"
            )

    return errors


def validate_edge_collection(edges: list[dict[str, Any]]) -> None:
    """Validate a list of edges; raise EgsValidationError on any failure."""
    all_errors: list[str] = []
    seen_ids: set[str] = set()
    for edge in edges:
        eid = edge.get("edge_id", "<missing>")
        if eid in seen_ids:
            all_errors.append(f"duplicate edge_id: {eid}")
        seen_ids.add(str(eid))
        for err in validate_edge(edge):
            all_errors.append(f"{eid}: {err}")
    if all_errors:
        raise EgsValidationError(
            f"{len(all_errors)} validation error(s)", errors=all_errors
        )
