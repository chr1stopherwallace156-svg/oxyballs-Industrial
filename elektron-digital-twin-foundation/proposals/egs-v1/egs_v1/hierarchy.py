"""EGS-1.0.0-proposal.2 node hierarchy and ID patterns."""

from __future__ import annotations

import re
from enum import Enum

SCHEMA_VERSION = "EGS-1.0.0-proposal.2"

COMPDEF_RE = re.compile(r"^COMPDEF-[A-Z0-9-]+$")
CFGCOMP_RE = re.compile(r"^CFGCOMP-[A-Z0-9-]+$")
CMPINST_RE = re.compile(r"^CMPINST-[A-Z0-9-]+$")
IFACE_RE = re.compile(
    r"^IFACE-(CONNECTOR|GROMMET|MOUNT-HOLE|FLANGE|SERVICE-PORT|UPFITTER|BODY-MOUNT|AXLE-DATUM|CAB-PLANE)-[A-Z0-9-]+$"
)
OP_RE = re.compile(r"^OP-[A-Z0-9-]+$")
AID_RE = re.compile(r"^AID-", re.IGNORECASE)
ASSET_RE = re.compile(r"^ASSET-", re.IGNORECASE)
EDTS_COMP_RE = re.compile(r"^EDTS-COMP-", re.IGNORECASE)

# Forbidden as graph endpoints in any proposal.2 edge
FORBIDDEN_ENDPOINT_PREFIXES = (AID_RE, ASSET_RE, EDTS_COMP_RE)


class NodeKind(str, Enum):
    COMPDEF = "COMPDEF"
    CFGCOMP = "CFGCOMP"
    CMPINST = "CMPINST"
    IFACE = "IFACE"
    OP = "OP"
    UNKNOWN = "UNKNOWN"
    FORBIDDEN = "FORBIDDEN"


def classify_node(node_id: str) -> NodeKind:
    s = str(node_id)
    if any(p.match(s) for p in FORBIDDEN_ENDPOINT_PREFIXES):
        return NodeKind.FORBIDDEN
    if COMPDEF_RE.match(s):
        return NodeKind.COMPDEF
    if CFGCOMP_RE.match(s):
        return NodeKind.CFGCOMP
    if CMPINST_RE.match(s):
        return NodeKind.CMPINST
    if IFACE_RE.match(s):
        return NodeKind.IFACE
    if OP_RE.match(s):
        return NodeKind.OP
    return NodeKind.UNKNOWN


def is_valid_reference_endpoint(node_id: str) -> bool:
    """Configuration-reference / synthetic research edges use CFGCOMP, IFACE, OP, COMPDEF."""
    return classify_node(node_id) in {
        NodeKind.CFGCOMP,
        NodeKind.IFACE,
        NodeKind.OP,
        NodeKind.COMPDEF,
    }


def is_valid_instance_endpoint(node_id: str) -> bool:
    """Physical asset instance scope may use CMPINST (+ IFACE/OP for local interfaces)."""
    return classify_node(node_id) in {
        NodeKind.CMPINST,
        NodeKind.IFACE,
        NodeKind.OP,
    }
