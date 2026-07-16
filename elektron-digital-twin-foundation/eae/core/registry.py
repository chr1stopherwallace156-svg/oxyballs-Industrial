"""Content-addressed asset registry. Separate from execution logs."""

from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path
from typing import Any

from .policy import INGESTION_POLICY_VERSION


class AssetRegistry:
    """
    Layout under store_root:
      registry/index.json
      assets/<sha256_hex>/content
      assets/<sha256_hex>/manifest.json
      logs/executions/<execution_id>.json
      quarantine/  (security staging only)
    """

    def __init__(self, store_root: Path):
        self.store_root = store_root
        self.registry_dir = store_root / "registry"
        self.index_path = self.registry_dir / "index.json"
        self.assets_dir = store_root / "assets"
        self.logs_dir = store_root / "logs" / "executions"
        self.quarantine_dir = store_root / "quarantine"
        self.registry_dir.mkdir(parents=True, exist_ok=True)
        self.assets_dir.mkdir(parents=True, exist_ok=True)
        self.logs_dir.mkdir(parents=True, exist_ok=True)
        self.quarantine_dir.mkdir(parents=True, exist_ok=True)
        if not self.index_path.exists():
            self._write_index_atomic({"version": 1, "ingestion_policy_version": INGESTION_POLICY_VERSION, "entries": {}})

    def load_index(self) -> dict[str, Any]:
        return json.loads(self.index_path.read_text(encoding="utf-8"))

    def lookup(self, sha256_hex: str, policy_version: str = INGESTION_POLICY_VERSION) -> dict[str, Any] | None:
        idx = self.load_index()
        entry = idx.get("entries", {}).get(sha256_hex)
        if not entry:
            return None
        if entry.get("ingestion_policy_version") != policy_version:
            # Different policy → not the same authoritative identity for this policy
            return None
        return entry

    def asset_dir(self, sha256_hex: str) -> Path:
        return self.assets_dir / sha256_hex

    def content_path(self, sha256_hex: str) -> Path:
        return self.asset_dir(sha256_hex) / "content"

    def manifest_path(self, sha256_hex: str) -> Path:
        return self.asset_dir(sha256_hex) / "manifest.json"

    def register(self, sha256_hex: str, asset_id: str, manifest_relpath: str) -> None:
        idx = self.load_index()
        if sha256_hex in idx.get("entries", {}):
            raise ValueError(f"duplicate registry entry for {sha256_hex}")
        idx.setdefault("entries", {})[sha256_hex] = {
            "asset_id": asset_id,
            "sha256": sha256_hex,
            "ingestion_policy_version": INGESTION_POLICY_VERSION,
            "manifest_path": manifest_relpath,
        }
        self._write_index_atomic(idx)

    def count_authoritative(self) -> int:
        return len(self.load_index().get("entries", {}))

    def write_execution_log(self, execution_id: str, payload: dict[str, Any]) -> Path:
        path = self.logs_dir / f"{execution_id}.json"
        data = json.dumps(payload, indent=2, sort_keys=True) + "\n"
        fd, tmp_name = tempfile.mkstemp(prefix=".exec.", suffix=".tmp", dir=str(self.logs_dir))
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
        return path

    def _write_index_atomic(self, index: dict[str, Any]) -> None:
        data = json.dumps(index, indent=2, sort_keys=True) + "\n"
        fd, tmp_name = tempfile.mkstemp(prefix=".index.", suffix=".tmp", dir=str(self.registry_dir))
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                f.write(data)
                f.flush()
                os.fsync(f.fileno())
            os.replace(tmp_name, self.index_path)
        except Exception:
            try:
                if os.path.exists(tmp_name):
                    os.unlink(tmp_name)
            except OSError:
                pass
            raise
