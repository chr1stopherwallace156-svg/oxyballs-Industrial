"""Streaming binary SHA-256. Never abbreviate digests."""

from __future__ import annotations

import hashlib
from pathlib import Path

CHUNK_SIZE = 1024 * 1024


def sha256_hex_file(path: Path) -> str:
    """Return 64 lowercase hex characters (no prefix)."""
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(CHUNK_SIZE), b""):
            h.update(chunk)
    return h.hexdigest()


def sha256_hex_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def content_address(sha256_hex: str) -> str:
    if len(sha256_hex) != 64 or any(c not in "0123456789abcdef" for c in sha256_hex):
        raise ValueError("sha256_hex must be 64 lowercase hex characters")
    return f"sha256:{sha256_hex}"


def asset_id_from_hash(sha256_hex: str) -> str:
    """Content-addressed asset identity using the full digest (not truncated)."""
    return f"AST-{sha256_hex}"
