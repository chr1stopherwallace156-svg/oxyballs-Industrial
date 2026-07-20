"""Deterministic edge lifecycle aggregation (EGS-1.0.0-proposal.2)."""

from __future__ import annotations

from typing import Any

# Evidence / claim status progression (strict hierarchy; unread index ≠ verified)
CLAIM_STATUS_RANK = {
    "UNRESOLVED_SOURCE_REQUIRED": 0,
    "CANDIDATE_UNVERIFIED": 1,
    "SOURCE_DISCOVERED": 2,
    "SOURCE_ACQUIRED": 3,
    "SOURCE_APPLICABILITY_CONFIRMED": 4,
    "ASSERTION_EXTRACTED": 5,
    "ASSERTION_VERIFIED": 6,
    "CONTRADICTED": -1,
    "REJECTED": -2,
}

EDGE_STATUSES = frozenset(
    {
        "VERIFIED",
        "PARTIALLY_VERIFIED",
        "CANDIDATE_UNVERIFIED",
        "CONTRADICTED",
        "REJECTED",
        "SUPERSEDED",
    }
)

VERIFIED_CLAIM = "ASSERTION_VERIFIED"
EXISTENCE_UNVERIFIED = frozenset(
    {
        "UNRESOLVED_SOURCE_REQUIRED",
        "CANDIDATE_UNVERIFIED",
        "SOURCE_DISCOVERED",
        "SOURCE_ACQUIRED",
        "SOURCE_APPLICABILITY_CONFIRMED",
        "ASSERTION_EXTRACTED",
    }
)


def _claim_status(claim: dict[str, Any] | None) -> str | None:
    if not claim or not isinstance(claim, dict):
        return None
    return claim.get("status")


def aggregate_edge_status(claims: dict[str, Any], *, supersedes: str | None = None) -> str:
    """
    Derive edge_status from claims.

    Rules:
    - SUPERSEDED if supersedes_edge_id set by caller override (handled externally)
    - CONTRADICTED if existence claim CONTRADICTED
    - REJECTED if existence claim REJECTED
    - VERIFIED if existence ASSERTION_VERIFIED and every mandatory claim ASSERTION_VERIFIED
    - PARTIALLY_VERIFIED if existence ASSERTION_VERIFIED but optional claims unresolved
    - CANDIDATE_UNVERIFIED if existence itself is not ASSERTION_VERIFIED
    """
    if not isinstance(claims, dict):
        return "CANDIDATE_UNVERIFIED"

    existence = claims.get("relationship_existence")
    ex_status = _claim_status(existence)

    if ex_status == "CONTRADICTED":
        return "CONTRADICTED"
    if ex_status == "REJECTED":
        return "REJECTED"

    # Any claim CONTRADICTED → edge CONTRADICTED (no generative smoothing)
    for key, claim in claims.items():
        if isinstance(claim, dict) and _claim_status(claim) == "CONTRADICTED":
            return "CONTRADICTED"

    if ex_status != VERIFIED_CLAIM:
        return "CANDIDATE_UNVERIFIED"

    # Existence verified — check mandatory property claims
    unresolved_mandatory = []
    for key, claim in claims.items():
        if key == "relationship_existence":
            continue
        if not isinstance(claim, dict):
            continue
        # Default: property claims are optional (flexible edge claims rule)
        mandatory = bool(claim.get("mandatory", False))
        if not mandatory:
            continue
        st = _claim_status(claim)
        if st != VERIFIED_CLAIM:
            unresolved_mandatory.append(key)

    if unresolved_mandatory:
        return "PARTIALLY_VERIFIED"

    # Optional claims may still be unresolved → PARTIALLY_VERIFIED
    optional_unresolved = []
    for key, claim in claims.items():
        if key == "relationship_existence":
            continue
        if not isinstance(claim, dict):
            continue
        if claim.get("mandatory", False):
            continue
        st = _claim_status(claim)
        if st in EXISTENCE_UNVERIFIED or st is None:
            # Only count if claim declares a value expectation / is present as gap
            if st != VERIFIED_CLAIM:
                optional_unresolved.append(key)

    if optional_unresolved:
        return "PARTIALLY_VERIFIED"

    return "VERIFIED"


def procedure_eligibility_for(edge_status: str) -> str:
    """Procedural generation blocked until VERIFIED (proposal.2 lock)."""
    if edge_status == "VERIFIED":
        return "PROCEDURE_GENERATION_AUTHORIZED"
    if edge_status == "SUPERSEDED":
        return "PROCEDURE_GENERATION_NOT_AUTHORIZED"
    if edge_status in ("CONTRADICTED", "REJECTED"):
        return "PROCEDURE_GENERATION_NOT_AUTHORIZED"
    # CANDIDATE_UNVERIFIED / PARTIALLY_VERIFIED
    return "PROCEDURE_GENERATION_NOT_AUTHORIZED"


def unread_manual_is_not_verified(claim_status: str) -> bool:
    """Indexed/unread listing = SOURCE_DISCOVERED at most — never ASSERTION_VERIFIED."""
    return claim_status in (
        "SOURCE_DISCOVERED",
        "UNRESOLVED_SOURCE_REQUIRED",
        "CANDIDATE_UNVERIFIED",
    )
