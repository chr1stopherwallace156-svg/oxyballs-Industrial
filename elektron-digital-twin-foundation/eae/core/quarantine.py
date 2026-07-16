"""Quarantine / security inspection. Does not claim extension==malicious."""

from __future__ import annotations

import zipfile
from pathlib import Path
from typing import Any


def zip_entry_is_unsafe(name: str) -> bool:
    """Path traversal, absolute paths, Windows drive letters."""
    if not name:
        return True
    # Normalize separators for inspection only (do not extract yet)
    norm = name.replace("\\", "/")
    if norm.startswith("/") or norm.startswith("//"):
        return True
    if len(norm) >= 2 and norm[1] == ":":
        return True
    parts = Path(norm).parts
    if ".." in parts:
        return True
    # Absolute Path() on POSIX for leading slash already handled
    p = Path(name)
    if p.is_absolute():
        return True
    return False


def inspect_zip_security(path: Path) -> dict[str, Any]:
    """Inspect ZIP members without extracting outside a caller-provided root."""
    unsafe: list[str] = []
    entries: list[str] = []
    try:
        with zipfile.ZipFile(path) as zf:
            for info in zf.infolist():
                entries.append(info.filename)
                if zip_entry_is_unsafe(info.filename):
                    unsafe.append(info.filename)
    except zipfile.BadZipFile as exc:
        return {
            "archive": str(path),
            "safe": False,
            "entries": [],
            "unsafe_entries": [],
            "error": f"BadZipFile: {exc}",
        }
    return {
        "archive": str(path),
        "safe": len(unsafe) == 0,
        "entry_count": len(entries),
        "entries": entries,
        "unsafe_entries": unsafe,
        "error": None,
    }


def safe_extract_zip_to_quarantine(path: Path, quarantine_root: Path) -> dict[str, Any]:
    """
    Extract only after security inspection.
    Refuses unsafe members; never writes outside quarantine_root.
    """
    quarantine_root.mkdir(parents=True, exist_ok=True)
    root = quarantine_root.resolve()
    safety = inspect_zip_security(path)
    if safety.get("error"):
        return {"status": "REJECT_SECURITY", "reason": safety["error"], "safety": safety}
    if not safety["safe"]:
        return {
            "status": "REJECT_SECURITY",
            "reason": "unsafe_zip_entries",
            "safety": safety,
        }

    extracted: list[str] = []
    with zipfile.ZipFile(path) as zf:
        for info in zf.infolist():
            target = (root / info.filename).resolve()
            if not str(target).startswith(str(root)):
                return {
                    "status": "REJECT_SECURITY",
                    "reason": f"resolved_path_escape:{info.filename}",
                    "safety": safety,
                }
            if info.is_dir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                with zf.open(info) as src, target.open("wb") as out:
                    out.write(src.read())
                extracted.append(str(target.relative_to(root)))
    return {"status": "EXTRACTED", "extracted": extracted, "safety": safety}
