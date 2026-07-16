from __future__ import annotations

import zipfile
from pathlib import Path


class QuarantineError(Exception):
    pass


def _is_unsafe_zip_name(name: str) -> bool:
    # Path traversal / absolute paths
    p = Path(name)
    if p.is_absolute():
        return True
    parts = Path(name).parts
    if ".." in parts:
        return True
    if name.startswith("/") or name.startswith("\\"):
        return True
    # Windows drive
    if len(name) >= 2 and name[1] == ":":
        return True
    return False


def inspect_zip_safety(path: Path) -> dict:
    unsafe = []
    entries = []
    with zipfile.ZipFile(path) as zf:
        for info in zf.infolist():
            entries.append(info.filename)
            if _is_unsafe_zip_name(info.filename):
                unsafe.append(info.filename)
    return {
        "archive": str(path),
        "entry_count": len(entries),
        "unsafe_entries": unsafe,
        "safe": len(unsafe) == 0,
    }


def safe_extract_zip(path: Path, dest: Path) -> dict:
    """Extract only if no path-traversal entries. Never writes unsafe members."""
    dest.mkdir(parents=True, exist_ok=True)
    safety = inspect_zip_safety(path)
    if not safety["safe"]:
        raise QuarantineError(f"Unsafe zip entries rejected: {safety['unsafe_entries']}")
    extracted = []
    with zipfile.ZipFile(path) as zf:
        for info in zf.infolist():
            target = (dest / info.filename).resolve()
            if not str(target).startswith(str(dest.resolve())):
                raise QuarantineError(f"Resolved path escapes quarantine: {info.filename}")
            if info.is_dir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                with zf.open(info) as src, target.open("wb") as out:
                    out.write(src.read())
                extracted.append(str(target.relative_to(dest)))
    return {"status": "EXTRACTED", "extracted": extracted, "safety": safety}
