"""Quarantine / security inspection. Does not claim extension==malicious."""

from __future__ import annotations

import stat
import zipfile
from collections import Counter
from pathlib import Path
from typing import Any

# Reject archives whose declared uncompressed size vs compressed size is extreme,
# or whose total uncompressed payload exceeds the cap (zip-bomb guard).
MAX_COMPRESSION_RATIO = 100.0
MAX_TOTAL_UNCOMPRESSED_BYTES = 64 * 1024 * 1024  # 64 MiB for CORE test scope
MAX_SINGLE_UNCOMPRESSED_BYTES = 32 * 1024 * 1024


def normalize_zip_entry_name(name: str) -> str:
    """Normalize for duplicate-destination and traversal checks."""
    norm = name.replace("\\", "/")
    while "//" in norm:
        norm = norm.replace("//", "/")
    # Drop explicit current-dir segments
    parts = [p for p in norm.split("/") if p not in ("", ".")]
    return "/".join(parts)


def zip_entry_is_unsafe(name: str) -> bool:
    """Path traversal, absolute paths, Windows drive letters / backslash traversal."""
    if not name:
        return True
    norm = normalize_zip_entry_name(name)
    if norm.startswith("/") or norm.startswith("//"):
        return True
    if len(norm) >= 2 and norm[1] == ":":
        return True
    # Windows-style absolute UNC-ish
    if norm.startswith("//") or name.startswith("\\\\"):
        return True
    parts = Path(norm).parts
    if ".." in parts:
        return True
    # Raw backslash parent refs before normalize edge cases
    if ".." in name.replace("/", "\\").split("\\"):
        return True
    p = Path(name)
    if p.is_absolute():
        return True
    return False


def _is_symlink_member(info: zipfile.ZipInfo) -> bool:
    """Unix symlink bit in external attributes (create_system == 3)."""
    # High 16 bits are Unix mode when create_system is 3 (Unix)
    mode = (info.external_attr >> 16) & 0xFFFF
    if mode and stat.S_ISLNK(mode):
        return True
    # Some creators mark symlinks via create_system without full mode — treat linkname markers
    if info.external_attr == 0o120777 << 16:
        return True
    return False


def inspect_zip_security(path: Path) -> dict[str, Any]:
    """Validate archive members before any extraction."""
    unsafe: list[str] = []
    symlink_entries: list[str] = []
    ratio_violations: list[dict[str, Any]] = []
    entries: list[str] = []
    normalized_dests: list[str] = []
    total_uncompressed = 0

    try:
        with zipfile.ZipFile(path) as zf:
            for info in zf.infolist():
                entries.append(info.filename)
                if zip_entry_is_unsafe(info.filename):
                    unsafe.append(info.filename)

                if _is_symlink_member(info):
                    symlink_entries.append(info.filename)
                    unsafe.append(info.filename)

                # Compression / expansion guards (skip directories)
                if not info.is_dir():
                    unc = int(info.file_size)
                    comp = int(info.compress_size) or 1
                    total_uncompressed += unc
                    if unc > MAX_SINGLE_UNCOMPRESSED_BYTES:
                        ratio_violations.append(
                            {"entry": info.filename, "reason": "single_entry_too_large", "uncompressed": unc}
                        )
                    ratio = unc / comp
                    if ratio > MAX_COMPRESSION_RATIO and unc > 1024 * 1024:
                        ratio_violations.append(
                            {
                                "entry": info.filename,
                                "reason": "excessive_compression_ratio",
                                "ratio": ratio,
                                "uncompressed": unc,
                                "compressed": info.compress_size,
                            }
                        )

                normalized_dests.append(normalize_zip_entry_name(info.filename).rstrip("/"))

    except zipfile.BadZipFile as exc:
        return {
            "archive": str(path),
            "safe": False,
            "entries": [],
            "unsafe_entries": [],
            "symlink_entries": [],
            "duplicate_destinations": [],
            "ratio_violations": [],
            "total_uncompressed_bytes": 0,
            "error": f"BadZipFile: {exc}",
        }

    dup_counts = Counter(d for d in normalized_dests if d)
    duplicate_destinations = sorted([d for d, c in dup_counts.items() if c > 1])

    if total_uncompressed > MAX_TOTAL_UNCOMPRESSED_BYTES:
        ratio_violations.append(
            {
                "entry": "*",
                "reason": "total_uncompressed_too_large",
                "uncompressed": total_uncompressed,
            }
        )

    if duplicate_destinations:
        unsafe.extend(duplicate_destinations)

    safe = (
        len(unsafe) == 0
        and len(symlink_entries) == 0
        and len(ratio_violations) == 0
        and len(duplicate_destinations) == 0
    )

    return {
        "archive": str(path),
        "safe": safe,
        "entry_count": len(entries),
        "entries": entries,
        "unsafe_entries": sorted(set(unsafe)),
        "symlink_entries": symlink_entries,
        "duplicate_destinations": duplicate_destinations,
        "ratio_violations": ratio_violations,
        "total_uncompressed_bytes": total_uncompressed,
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
            # Re-check each name at extract time
            if zip_entry_is_unsafe(info.filename) or _is_symlink_member(info):
                return {
                    "status": "REJECT_SECURITY",
                    "reason": f"unsafe_member_at_extract:{info.filename}",
                    "safety": safety,
                }
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
