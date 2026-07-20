"""EGS-v1 proposal package — typed relationship graph (non-kernel)."""

from .errors import EgsValidationError, EgsGraphError
from .validate import validate_edge, validate_edge_collection, RELATIONSHIP_CLASS_TYPES
from .graph import RelationshipGraph

__all__ = [
    "EgsValidationError",
    "EgsGraphError",
    "validate_edge",
    "validate_edge_collection",
    "RELATIONSHIP_CLASS_TYPES",
    "RelationshipGraph",
]

__version__ = "0.1.0-proposal"
