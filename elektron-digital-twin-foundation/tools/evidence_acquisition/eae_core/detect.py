from __future__ import annotations

from pathlib import Path


def detect_file_type(path: Path) -> dict:
    """Magic-byte / content sniff; extension alone is never authoritative."""
    suffix = path.suffix.lower().lstrip(".")
    head = path.read_bytes()[:64]
    detected = "UNKNOWN"
    if head.startswith(b"glTF"):
        detected = "GLB"
    elif head.lstrip().startswith(b"{") and b'"asset"' in path.read_bytes()[:4096]:
        # cheap glTF JSON hint
        sample = path.read_text(encoding="utf-8", errors="replace")[:2000]
        if '"asset"' in sample and ("meshes" in sample or "nodes" in sample):
            detected = "GLTF"
    elif head.startswith(b"PK\x03\x04") or head.startswith(b"PK\x05\x06"):
        detected = "ZIP"
    elif b"ISO-10303" in head or head.startswith(b"ISO-10303"):
        detected = "STEP"
    else:
        text_head = path.read_bytes()[:512]
        try:
            t = text_head.decode("utf-8", errors="strict")
            if t.startswith("v ") or "\nv " in t or t.startswith("#"):
                # OBJ often starts with comment or vertex
                sample = path.read_text(encoding="utf-8", errors="replace")[:2000]
                if any(line.startswith(("v ", "f ", "o ", "g ", "vn ", "vt ")) for line in sample.splitlines()):
                    detected = "OBJ"
        except UnicodeDecodeError:
            if suffix == "fbx":
                detected = "FBX_EXTENSION_ONLY"  # no FBX parser implemented
            else:
                detected = "BINARY_UNKNOWN"

    return {
        "path": str(path),
        "extension_claim": suffix or None,
        "detected_type": detected,
        "extension_matches_content": (
            (suffix == "glb" and detected == "GLB")
            or (suffix == "gltf" and detected == "GLTF")
            or (suffix == "obj" and detected == "OBJ")
            or (suffix in {"zip"} and detected == "ZIP")
            or (suffix in {"step", "stp"} and detected == "STEP")
        ),
        "misleading_extension": bool(suffix) and detected not in {suffix.upper(), "FBX_EXTENSION_ONLY", "BINARY_UNKNOWN", "UNKNOWN"}
        and not (
            (suffix == "glb" and detected == "GLB")
            or (suffix == "gltf" and detected == "GLTF")
            or (suffix == "obj" and detected == "OBJ")
            or (suffix == "zip" and detected == "ZIP")
        ),
    }
