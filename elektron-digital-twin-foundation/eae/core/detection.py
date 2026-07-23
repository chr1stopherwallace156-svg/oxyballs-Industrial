"""File-type detection. Extension is never authoritative.

OBJ content detection is heuristic (no strong binary magic).
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

OBJ_DIRECTIVES = ("v ", "vn ", "vt ", "f ", "o ", "g ", "mtllib ", "usemtl ", "s ")


def extension_claim(path: Path) -> str | None:
    suf = path.suffix.lower().lstrip(".")
    return suf or None


def detect_format(path: Path) -> dict[str, Any]:
    """Inspect bytes/content. Records method and confidence honestly."""
    head = _read_head(path, 64)
    ext = extension_claim(path)

    if head.startswith(b"glTF"):
        return {
            "detected_format": "GLB",
            "format_detection_method": "BINARY_MAGIC",
            "format_detection_confidence": "HIGH",
            "extension_claim": ext,
            "notes": ["glTF binary magic at offset 0"],
        }

    if head.startswith(b"PK\x03\x04") or head.startswith(b"PK\x05\x06") or head.startswith(b"PK\x07\x08"):
        return {
            "detected_format": "ZIP",
            "format_detection_method": "BINARY_MAGIC",
            "format_detection_confidence": "HIGH",
            "extension_claim": ext,
            "notes": ["ZIP local/end header magic"],
        }

    if head.startswith(b"MZ"):
        return {
            "detected_format": "PE_EXECUTABLE",
            "format_detection_method": "BINARY_MAGIC",
            "format_detection_confidence": "HIGH",
            "extension_claim": ext,
            "notes": ["DOS/PE MZ header"],
        }

    # Heuristic text formats (OBJ)
    raw = _read_head(path, 8192)
    obj = _detect_obj_heuristic(raw)
    if obj is not None:
        obj["extension_claim"] = ext
        return obj

    return {
        "detected_format": "UNKNOWN",
        "format_detection_method": "NONE",
        "format_detection_confidence": "NONE",
        "extension_claim": ext,
        "notes": ["No recognized magic or OBJ heuristic match"],
    }


def _read_head(path: Path, n: int) -> bytes:
    with path.open("rb") as f:
        return f.read(n)


def _detect_obj_heuristic(raw: bytes) -> dict[str, Any] | None:
    """
    OBJ has no strong binary magic. Treat as UTF-8/plain text and require
    recognizable Wavefront directives. Confidence is recorded honestly.
    """
    try:
        text = raw.decode("utf-8")
        utf8_ok = True
    except UnicodeDecodeError:
        text = raw.decode("utf-8", errors="replace")
        utf8_ok = False
        # Binary garbage with replacement chars is not OBJ
        if text.count("\ufffd") > 8:
            return None

    lines = [ln.strip() for ln in text.splitlines() if ln.strip() and not ln.strip().startswith("#")]
    if not lines and "#" in text:
        # comments only — not enough to claim OBJ
        return None

    hits = 0
    directive_kinds: set[str] = set()
    for ln in lines:
        for d in OBJ_DIRECTIVES:
            if ln.startswith(d) or ln == d.strip():
                hits += 1
                directive_kinds.add(d.strip())
                break

    if hits == 0:
        return None

    if hits >= 3 and ("v" in directive_kinds or "f" in directive_kinds) and utf8_ok:
        confidence = "HIGH"
    elif hits >= 1 and utf8_ok:
        confidence = "MEDIUM"
    else:
        confidence = "LOW"

    return {
        "detected_format": "OBJ",
        "format_detection_method": "CONTENT_HEURISTIC",
        "format_detection_confidence": confidence,
        "notes": [
            "OBJ detection is heuristic (no binary magic).",
            f"directive_hits={hits}",
            f"directive_kinds={sorted(directive_kinds)}",
            f"utf8_strict={utf8_ok}",
        ],
    }


def is_extension_format_match(ext: str | None, detected_format: str) -> bool:
    if not ext:
        return False
    mapping = {
        "obj": "OBJ",
        "glb": "GLB",
        "zip": "ZIP",
    }
    return mapping.get(ext) == detected_format
