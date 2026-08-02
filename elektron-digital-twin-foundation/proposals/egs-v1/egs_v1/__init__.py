"""EGS-1.0.0-proposal.2 proposal package — typed multi-plane relationship graph."""

from .errors import EgsValidationError, EgsGraphError
from .hierarchy import SCHEMA_VERSION, NodeKind, classify_node
from .lifecycle import aggregate_edge_status, procedure_eligibility_for
from .planes import GRAPH_PLANES, PLANE_MEMBERSHIP
from .validate import validate_edge, validate_edge_collection, RELATIONSHIP_CLASS_TYPES
from .graph import RelationshipGraph

__all__ = [
    "SCHEMA_VERSION",
    "NodeKind",
    "classify_node",
    "aggregate_edge_status",
    "procedure_eligibility_for",
    "GRAPH_PLANES",
    "PLANE_MEMBERSHIP",
    "EgsValidationError",
    "EgsGraphError",
    "validate_edge",
    "validate_edge_collection",
    "RELATIONSHIP_CLASS_TYPES",
    "RelationshipGraph",
]

__version__ = "1.0.0-proposal.2"
