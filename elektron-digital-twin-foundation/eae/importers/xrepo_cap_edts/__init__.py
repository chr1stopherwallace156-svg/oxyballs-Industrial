"""XREPO-CAP-EDTS-0001 / 0002 — capture package canonical compatibility + secure ingest."""

from .result import DualGateResult
from .xrepo_0001 import evaluate_canonical_compatibility
from .xrepo_0002 import ingest_edts_pkg

__all__ = [
    "DualGateResult",
    "evaluate_canonical_compatibility",
    "ingest_edts_pkg",
]
