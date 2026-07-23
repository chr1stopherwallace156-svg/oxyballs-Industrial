"""Ingestion policy constants — bump only when authoritative identity rules change."""

from __future__ import annotations

INGESTION_POLICY_VERSION = "1.0.0"
MANIFEST_VERSION = "1.0.0"

# V0 allowlist: local single-file formats only.
ALLOWED_EXTENSIONS = frozenset({"obj", "glb"})
ALLOWED_DETECTED_FORMATS = frozenset({"OBJ", "GLB"})
