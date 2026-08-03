#!/usr/bin/env python3
"""Portable SHA-256 sidecar check — basename-only filenames required.

Rejects absolute paths, directory separators, and 'workspace' host paths
in the filename field. Format: `<64-hex>  <basename>` (GNU sha256sum style).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path


_HASH = re.compile(r"^[0-9a-fA-F]{64}$")


def test_sidecar(filepath: str) -> None:
    content = Path(filepath).read_text(encoding="utf-8").strip()
    if not content:
        raise SystemExit("FAIL: empty sidecar")
    for line_no, raw in enumerate(content.splitlines(), start=1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "  " in line:
            digest, filename = line.split("  ", 1)
        else:
            parts = line.split(None, 1)
            if len(parts) < 2:
                raise SystemExit(f"FAIL: Invalid sidecar format at line {line_no}")
            digest, filename = parts[0], parts[1]
        filename = filename.lstrip("*").strip()
        if not _HASH.match(digest):
            raise SystemExit(f"FAIL: bad digest at line {line_no}")
        if "/" in filename or "\\" in filename or "workspace" in filename.lower():
            raise SystemExit(
                f"FAIL: Absolute or non-portable path found in sidecar: {filename}"
            )
        if filename in (".", "..") or ".." in filename:
            raise SystemExit(f"FAIL: unsafe sidecar filename: {filename}")
    print("PASS: Sidecar is portable and basename-only.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(f"usage: {sys.argv[0]} <sidecar.sha256>")
    test_sidecar(sys.argv[1])
