"""EGS-1.0.0-proposal.2 edge validation rules (proposal — non-kernel)."""

from __future__ import annotations

from typing import Any

from .errors import EgsValidationError
from .hierarchy import (
    SCHEMA_VERSION,
    NodeKind,
    classify_node,
    is_valid_instance_endpoint,
    is_valid_reference_endpoint,
)
from .lifecycle import (
    CLAIM_STATUS_RANK,
    EDGE_STATUSES,
    aggregate_edge_status,
    procedure_eligibility_for,
)
from .planes import (
    GRAPH_PLANES,
    PERMANENT_STRUCTURAL_CLASSES,
    PLANE_MEMBERSHIP,
    TRANSIENT_STATE_ALLOWED_CLASSES,
)

CLAIM_STATUSES = frozenset(CLAIM_STATUS_RANK.keys())

SCOPE_TYPES = frozenset(
    {
        "CONFIGURATION_REFERENCE",
        "PHYSICAL_ASSET_INSTANCE",
        "SYNTHETIC_FIXTURE",
        "CROSS_CONFIGURATION_COMPARISON",
        "SOURCE_APPLICABILITY_CANDIDATE",
    }
)

# Decoupled non-authoritative scopes (cross-year similarity lives here only)
NON_AUTHORITATIVE_SCOPES = frozenset(
    {"CROSS_CONFIGURATION_COMPARISON", "SOURCE_APPLICABILITY_CANDIDATE"}
)

PROCEDURE_ELIGIBILITY = frozenset(
    {
        "PROCEDURE_GENERATION_AUTHORIZED",
        "BLOCKED_UNVERIFIED_PROCEDURE",
        "PROCEDURE_GENERATION_NOT_AUTHORIZED",
        "BLOCKED",
    }
)


def _validate_node_for_scope(
    label: str, node_id: str | None, scope: str, errors: list[str]
) -> None:
    if node_id is None:
        return
    kind = classify_node(str(node_id))
    if kind == NodeKind.FORBIDDEN:
        errors.append(
            f"{label} must not be AID-*/ASSET-*/EDTS-COMP-* alias (got {node_id!r})"
        )
        return
    if kind == NodeKind.UNKNOWN:
        errors.append(f"{label} unrecognized node id pattern: {node_id!r}")
        return

    if scope in ("CONFIGURATION_REFERENCE", "SYNTHETIC_FIXTURE"):
        if kind == NodeKind.CMPINST:
            errors.append(
                f"{label}: CONFIGURATION_REFERENCE/SYNTHETIC edges must use "
                f"CFGCOMP-/IFACE-/OP-/COMPDEF- nodes, not physical CMPINST-* "
                f"(got {node_id!r})"
            )
        elif not is_valid_reference_endpoint(str(node_id)):
            errors.append(f"{label} invalid reference endpoint: {node_id!r}")
    elif scope == "PHYSICAL_ASSET_INSTANCE":
        if not is_valid_instance_endpoint(str(node_id)):
            errors.append(
                f"{label}: PHYSICAL_ASSET_INSTANCE edges use CMPINST-/IFACE-/OP- "
                f"(got {node_id!r})"
            )


def validate_edge(edge: dict[str, Any], *, require_schema_fields: bool = True) -> list[str]:
    """Validate one edge. Returns list of error strings (empty if valid)."""
    errors: list[str] = []

    if require_schema_fields:
        for key in (
            "schema_version",
            "record_version",
            "edge_id",
            "graph_plane",
            "relationship_class",
            "source_node_id",
            "target_node_id",
            "directionality",
            "applicability_context",
            "verification_lifecycle",
            "claims",
        ):
            if key not in edge:
                errors.append(f"missing required field: {key}")

    if edge.get("schema_version") not in (None, SCHEMA_VERSION):
        errors.append(f"schema_version must be {SCHEMA_VERSION!r}")

    rv = edge.get("record_version")
    if rv is not None and (not isinstance(rv, int) or rv < 1):
        errors.append("record_version must be integer >= 1")

    plane = edge.get("graph_plane")
    if plane is not None and plane not in GRAPH_PLANES:
        errors.append(f"invalid graph_plane: {plane!r}")

    rclass = edge.get("relationship_class")
    if rclass is not None and rclass not in PLANE_MEMBERSHIP:
        errors.append(f"unknown relationship_class: {rclass!r}")
    elif rclass in PLANE_MEMBERSHIP and plane is not None:
        expected = PLANE_MEMBERSHIP[rclass]
        if plane != expected:
            errors.append(
                f"relationship_class {rclass!r} belongs to plane {expected!r}, "
                f"not {plane!r}"
            )

    direction = edge.get("directionality")
    if direction is not None and direction not in (
        "FORWARD",
        "BACKWARD",
        "BIDIRECTIONAL",
    ):
        errors.append(f"invalid directionality: {direction!r}")
    if rclass == "OVERLAPS" and direction not in (None, "BIDIRECTIONAL"):
        errors.append("OVERLAPS requires directionality=BIDIRECTIONAL")

    appl = edge.get("applicability_context")
    scope = None
    if appl is not None:
        if not isinstance(appl, dict):
            errors.append("applicability_context must be an object")
        else:
            scope = appl.get("scope_type")
            if scope not in SCOPE_TYPES:
                errors.append(f"invalid applicability_context.scope_type: {scope!r}")
            # Exact-vehicle lock: no model_year_range on CONFIGURATION_REFERENCE
            if scope == "CONFIGURATION_REFERENCE":
                if appl.get("model_year_range") not in (None,):
                    errors.append(
                        "CONFIGURATION_REFERENCE forbids model_year_range — "
                        "cross-year data belongs in CROSS_CONFIGURATION_COMPARISON / "
                        "SOURCE_APPLICABILITY_CANDIDATE with inheritance=NOT_INHERITED"
                    )
                if not appl.get("configuration_id"):
                    errors.append(
                        "CONFIGURATION_REFERENCE requires configuration_id"
                    )
                if appl.get("model_year") is None:
                    errors.append("CONFIGURATION_REFERENCE requires model_year")
                if appl.get("inheritance") not in (None, "NOT_INHERITED", "N/A"):
                    errors.append(
                        "CONFIGURATION_REFERENCE inheritance must be NOT_INHERITED"
                    )
            if scope == "SYNTHETIC_FIXTURE" and appl.get("model_year_range") not in (
                None,
            ):
                errors.append("SYNTHETIC_FIXTURE forbids model_year_range")

    src = edge.get("source_node_id")
    tgt = edge.get("target_node_id")
    if src and tgt and src == tgt:
        errors.append("source_node_id and target_node_id must differ")

    effective_scope = scope or "CONFIGURATION_REFERENCE"
    _validate_node_for_scope("source_node_id", src, effective_scope, errors)
    _validate_node_for_scope("target_node_id", tgt, effective_scope, errors)

    # Transient state isolation
    transient = edge.get("transient_state")
    if transient:
        if rclass in PERMANENT_STRUCTURAL_CLASSES:
            errors.append(
                f"transient_state forbidden on permanent structural class {rclass!r} "
                "— use ACCESSIBLE_WHEN / procedural precondition edges"
            )
        elif rclass not in TRANSIENT_STATE_ALLOWED_CLASSES:
            errors.append(
                f"transient_state not allowed on relationship_class {rclass!r}"
            )

    claims = edge.get("claims")
    if claims is not None:
        if not isinstance(claims, dict):
            errors.append("claims must be an object")
        elif "relationship_existence" not in claims:
            errors.append("claims.relationship_existence is required")
        else:
            for key, claim in claims.items():
                if not isinstance(claim, dict):
                    errors.append(f"claims[{key}] must be object")
                    continue
                st = claim.get("status")
                if st not in CLAIM_STATUSES:
                    errors.append(f"claims[{key}].status invalid: {st!r}")
                # Unread index never equals verified
                ids = claim.get("evidence_assertion_ids") or []
                if st == "ASSERTION_VERIFIED" and not ids:
                    errors.append(
                        f"claims[{key}]: ASSERTION_VERIFIED requires "
                        "non-empty evidence_assertion_ids"
                    )
                if st == "CONTRADICTED":
                    conflicts = claim.get("conflicting_assertions")
                    if not isinstance(conflicts, list) or len(conflicts) < 2:
                        errors.append(
                            f"claims[{key}]: CONTRADICTED requires conflicting_assertions "
                            "with at least two sources (no generative smoothing)"
                        )

    # Lifecycle aggregation consistency
    life = edge.get("verification_lifecycle")
    if isinstance(life, dict) and isinstance(claims, dict):
        declared = life.get("edge_status")
        if declared is not None and declared not in EDGE_STATUSES:
            errors.append(f"invalid edge_status: {declared!r}")
        if edge.get("supersedes_edge_id") and declared not in (None, "SUPERSEDED"):
            errors.append("supersedes_edge_id requires edge_status=SUPERSEDED")
        if declared != "SUPERSEDED" and isinstance(claims, dict):
            derived = aggregate_edge_status(claims)
            if declared is not None and declared != derived:
                errors.append(
                    f"verification_lifecycle.edge_status {declared!r} inconsistent "
                    f"with claims aggregation (derived {derived!r})"
                )
        elig = life.get("procedure_eligibility")
        if elig is not None and elig not in PROCEDURE_ELIGIBILITY:
            errors.append(f"invalid procedure_eligibility: {elig!r}")
        # Real-data promotion lock: non-VERIFIED must not authorize procedures
        if declared and declared != "VERIFIED":
            if elig == "PROCEDURE_GENERATION_AUTHORIZED":
                errors.append(
                    "procedure_eligibility=PROCEDURE_GENERATION_AUTHORIZED "
                    "requires edge_status=VERIFIED"
                )
            expected_elig = procedure_eligibility_for(declared)
            # Allow BLOCKED / BLOCKED_UNVERIFIED_PROCEDURE as aliases of NOT_AUTHORIZED
            blocked_ok = {
                "PROCEDURE_GENERATION_NOT_AUTHORIZED",
                "BLOCKED_UNVERIFIED_PROCEDURE",
                "BLOCKED",
            }
            if elig not in blocked_ok and elig != expected_elig:
                if declared != "VERIFIED":
                    errors.append(
                        "non-VERIFIED edges require procedure_eligibility in "
                        f"{sorted(blocked_ok)} (got {elig!r})"
                    )

    # Non-authoritative scopes must declare NOT_INHERITED
    if isinstance(appl, dict) and appl.get("scope_type") in NON_AUTHORITATIVE_SCOPES:
        if appl.get("inheritance") not in (None, "NOT_INHERITED"):
            errors.append(
                f"{appl.get('scope_type')} records must set inheritance=NOT_INHERITED"
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


# Back-compat alias for older imports
RELATIONSHIP_CLASS_TYPES = {
    plane: frozenset(k for k, v in PLANE_MEMBERSHIP.items() if v == plane)
    for plane in GRAPH_PLANES
}
