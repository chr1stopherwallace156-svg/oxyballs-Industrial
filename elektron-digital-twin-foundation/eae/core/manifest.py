"""Atomic authoritative manifest writing. Observed/computed facts only."""

from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path
from typing import Any

from .policy import INGESTION_POLICY_VERSION, MANIFEST_VERSION


def build_manifest(
    *,
    asset_id: str,
    original_filename: str,
    detected_format: str,
    format_detection_method: str,
    format_detection_confidence: str,
    file_size_bytes: int,
    sha256_hex: str,
    content_address: str,
    created_at: str,
    source_kind: str = "LOCAL_FIXTURE",
    integrity_status: str = "PASS",
    quarantine_status: str = "CLEARED",
) -> dict[str, Any]:
    """Authoritative manifest — no quality / vehicle / component claims."""
    return {
        "manifest_version": MANIFEST_VERSION,
        "asset_id": asset_id,
        "source_kind": source_kind,
        "original_filename": original_filename,
        "detected_format": detected_format,
        "format_detection_method": format_detection_method,
        "format_detection_confidence": format_detection_confidence,
        "file_size_bytes": file_size_bytes,
        "sha256": sha256_hex,
        "ingestion_policy_version": INGESTION_POLICY_VERSION,
        "integrity_status": integrity_status,
        "quarantine_status": quarantine_status,
        "created_at": created_at,
        "content_address": content_address,
    }


def write_manifest_atomic(path: Path, manifest: dict[str, Any]) -> None:
    """
    Write via temporary file in the same directory, then os.replace (atomic on POSIX).
    Partial writes never become the authoritative path.
    """
    path.parent.mkdir(parents=True, exist_ok=True)
    data = json.dumps(manifest, indent=2, sort_keys=True) + "\n"
    fd, tmp_name = tempfile.mkstemp(prefix=".manifest.", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(data)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp_name, path)
    except Exception:
        try:
            if os.path.exists(tmp_name):
                os.unlink(tmp_name)
        except OSError:
            pass
        raise


def read_manifest(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))
