from __future__ import annotations

import json
import struct
from pathlib import Path


def parse_gltf_or_glb(path: Path) -> dict:
    suffix = path.suffix.lower()
    try:
        if suffix == ".glb":
            return _parse_glb(path)
        data = json.loads(path.read_text(encoding="utf-8"))
        return _from_gltf_json(data, "GLTF")
    except Exception as exc:  # noqa: BLE001
        return {"status": "FAIL", "format": suffix.lstrip(".").upper(), "errors": [str(exc)], "nodes": [], "meshes": []}


def _from_gltf_json(data: dict, fmt: str) -> dict:
    nodes = data.get("nodes") or []
    meshes = data.get("meshes") or []
    return {
        "status": "PASS",
        "format": fmt,
        "node_count": len(nodes),
        "mesh_count": len(meshes),
        "material_count": len(data.get("materials") or []),
        "nodes": [{"index": i, "name": n.get("name"), "mesh": n.get("mesh")} for i, n in enumerate(nodes)],
        "meshes": [{"index": i, "name": m.get("name")} for i, m in enumerate(meshes)],
        "errors": [],
    }


def _parse_glb(path: Path) -> dict:
    with path.open("rb") as f:
        magic = f.read(4)
        if magic != b"glTF":
            return {"status": "FAIL", "format": "GLB", "errors": ["bad magic"], "nodes": [], "meshes": []}
        version, _length = struct.unpack("<II", f.read(8))
        chunk_len, chunk_type = struct.unpack("<II", f.read(8))
        if chunk_type != 0x4E4F534A:
            return {"status": "FAIL", "format": "GLB", "errors": ["missing JSON chunk"], "nodes": [], "meshes": []}
        raw = f.read(chunk_len)
        data = json.loads(raw.decode("utf-8"))
        out = _from_gltf_json(data, "GLB")
        out["glb_version"] = version
        return out
