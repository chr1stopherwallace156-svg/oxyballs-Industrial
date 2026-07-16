#!/usr/bin/env python3
"""Evidence Acquisition Engine — empirical pipeline (no frozen schema mutation).

Never invents URLs, SHA-256 digests, mesh inventories, or passport links.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import struct
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
CATALOG = ROOT / "layers" / "L01" / "L1_LANE_A_ASSET_CATALOG.json"
STAGING_ROOT = ROOT / "research" / "incoming" / "l01_lane_a_assets"
RESULTS_ROOT = ROOT / "verification" / "results"
MESH_EXTS = {".glb", ".gltf", ".fbx", ".obj", ".stl", ".step", ".stp", ".usd", ".usda", ".usdc", ".zip"}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def load_catalog() -> dict:
    return json.loads(CATALOG.read_text())


def candidate_record(catalog: dict, cand_id: str) -> dict | None:
    for a in catalog.get("assets", []):
        if a.get("candidate_asset_id") == cand_id:
            return a
    return None


def staging_dir(cand: dict, cand_id: str) -> Path:
    asset_id = cand.get("asset_id") or cand_id
    return STAGING_ROOT / str(asset_id)


def resolve_source_url(cand: dict, stage: Path) -> str | None:
    url = cand.get("url")
    if isinstance(url, str) and url.strip():
        return url.strip()
    sidecar = stage / "source_url.txt"
    if sidecar.is_file():
        text = sidecar.read_text().strip()
        if text and not text.startswith("#"):
            return text.splitlines()[0].strip()
    return None


def find_local_bytes(stage: Path) -> list[Path]:
    source = stage / "source"
    roots = [source, stage]
    found: list[Path] = []
    for root in roots:
        if not root.is_dir():
            continue
        for p in root.rglob("*"):
            if not p.is_file():
                continue
            if p.name.startswith("."):
                continue
            if p.suffix.lower() in MESH_EXTS or p.parent.name == "source":
                if p.suffix.lower() or p.parent.name == "source":
                    if p.name in {"source_url.txt", "README.md", "ASSET_AVAILABILITY_AUDIT.json"}:
                        continue
                    if "pipeline" in p.parts:
                        continue
                    found.append(p)
    # de-dupe
    uniq = []
    seen = set()
    for p in found:
        rp = p.resolve()
        if rp not in seen:
            seen.add(rp)
            uniq.append(p)
    return uniq


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return f"sha256:{h.hexdigest()}"


def extract_metadata(path: Path, digest: str) -> dict[str, Any]:
    st = path.stat()
    meta: dict[str, Any] = {
        "file_name": path.name,
        "local_path": str(path.relative_to(ROOT)),
        "file_format": path.suffix.lower().lstrip(".") or "UNKNOWN",
        "file_size_bytes": st.st_size,
        "sha256": digest,
        "mtime_utc": datetime.fromtimestamp(st.st_mtime, timezone.utc).isoformat(),
        "software_version": None,
        "author": None,
        "creation_date": None,
        "exporter": None,
        "units": "UNKNOWN",
        "coordinate_system": "UNKNOWN",
        "polygon_count": None,
        "vertex_count": None,
        "texture_count": None,
        "material_count": None,
        "hierarchy_depth": None,
        "pivot_quality": "NOT_EVALUATED",
        "metadata_status": "FILE_STAT_ONLY",
    }
    # Best-effort light parsers (no invented geometry)
    suffix = path.suffix.lower()
    try:
        if suffix == ".gltf":
            data = json.loads(path.read_text(encoding="utf-8", errors="replace"))
            meta["material_count"] = len(data.get("materials") or [])
            meta["texture_count"] = len(data.get("textures") or [])
            meta["hierarchy_depth"] = _gltf_depth(data.get("nodes") or [])
            meta["vertex_count"] = _gltf_accessor_hint(data)
            meta["metadata_status"] = "GLTF_JSON_PARSED"
            meta["exporter"] = (data.get("asset") or {}).get("generator")
        elif suffix == ".glb":
            meta.update(_probe_glb(path))
        elif suffix == ".obj":
            meta.update(_probe_obj(path))
        elif suffix in {".step", ".stp"}:
            meta.update(_probe_step_header(path))
        elif suffix == ".zip":
            with zipfile.ZipFile(path) as zf:
                meta["zip_entry_count"] = len(zf.namelist())
                meta["zip_entries_sample"] = zf.namelist()[:50]
                meta["metadata_status"] = "ZIP_LISTED"
    except Exception as exc:  # noqa: BLE001
        meta["metadata_status"] = "PARSE_ERROR"
        meta["metadata_error"] = str(exc)
    return meta


def _gltf_depth(nodes: list) -> int:
    if not nodes:
        return 0
    children_map = {i: (n.get("children") or []) for i, n in enumerate(nodes)}

    def depth(i: int, seen: set[int]) -> int:
        if i in seen:
            return 0
        seen.add(i)
        kids = children_map.get(i) or []
        if not kids:
            return 1
        return 1 + max(depth(k, seen) for k in kids)

    return max(depth(i, set()) for i in range(len(nodes))) if nodes else 0


def _gltf_accessor_hint(data: dict) -> int | None:
    accessors = data.get("accessors") or []
    if not accessors:
        return None
    return sum(int(a.get("count") or 0) for a in accessors if a.get("type") == "VEC3") or None


def _probe_glb(path: Path) -> dict[str, Any]:
    out: dict[str, Any] = {"metadata_status": "GLB_HEADER_ONLY"}
    with path.open("rb") as f:
        magic = f.read(4)
        if magic != b"glTF":
            out["metadata_status"] = "GLB_UNEXPECTED_MAGIC"
            return out
        version, length = struct.unpack("<II", f.read(8))
        out["glb_version"] = version
        out["glb_length"] = length
        # JSON chunk
        chunk_len, chunk_type = struct.unpack("<II", f.read(8))
        if chunk_type == 0x4E4F534A:  # JSON
            raw = f.read(chunk_len)
            data = json.loads(raw.decode("utf-8"))
            out["material_count"] = len(data.get("materials") or [])
            out["texture_count"] = len(data.get("textures") or [])
            out["hierarchy_depth"] = _gltf_depth(data.get("nodes") or [])
            out["vertex_count"] = _gltf_accessor_hint(data)
            out["exporter"] = (data.get("asset") or {}).get("generator")
            out["metadata_status"] = "GLB_JSON_CHUNK_PARSED"
            out["_gltf_nodes"] = data.get("nodes") or []
            out["_gltf_meshes"] = data.get("meshes") or []
    return out


def _probe_obj(path: Path) -> dict[str, Any]:
    verts = 0
    faces = 0
    objects: list[str] = []
    with path.open("r", encoding="utf-8", errors="replace") as f:
        for i, line in enumerate(f):
            if i > 500000:
                break
            if line.startswith("v "):
                verts += 1
            elif line.startswith("f "):
                faces += 1
            elif line.startswith("o ") or line.startswith("g "):
                objects.append(line[2:].strip())
    return {
        "vertex_count": verts or None,
        "polygon_count": faces or None,
        "hierarchy_depth": 1 if objects else 0,
        "obj_object_names_sample": objects[:100],
        "metadata_status": "OBJ_COUNTED",
    }


def _probe_step_header(path: Path) -> dict[str, Any]:
    head = path.read_text(encoding="utf-8", errors="replace")[:8000]
    return {
        "metadata_status": "STEP_HEADER_SNIFF",
        "step_header_present": "ISO-10303" in head or "HEADER;" in head,
        "author": None,
        "exporter": "STEP",
    }


def inventory_from_metadata(meta: dict, path: Path) -> dict[str, Any]:
    meshes: list[dict[str, Any]] = []
    nodes = meta.pop("_gltf_nodes", None)
    gltf_meshes = meta.pop("_gltf_meshes", None)
    if nodes is not None:
        for i, n in enumerate(nodes):
            name = n.get("name") or f"node_{i}"
            meshes.append(
                {
                    "mesh_id": f"NODE-{i}",
                    "name": name,
                    "kind": "GLTF_NODE",
                    "has_mesh": n.get("mesh") is not None,
                    "door_name_candidate": _looks_like_door(name),
                }
            )
    if gltf_meshes is not None and not meshes:
        for i, m in enumerate(gltf_meshes):
            name = m.get("name") or f"mesh_{i}"
            meshes.append(
                {
                    "mesh_id": f"MESH-{i}",
                    "name": name,
                    "kind": "GLTF_MESH",
                    "door_name_candidate": _looks_like_door(name),
                }
            )
    for name in meta.get("obj_object_names_sample") or []:
        meshes.append(
            {
                "mesh_id": f"OBJ-{name}",
                "name": name,
                "kind": "OBJ_OBJECT",
                "door_name_candidate": _looks_like_door(name),
            }
        )
    if path.suffix.lower() == ".zip" and meta.get("zip_entries_sample"):
        for entry in meta["zip_entries_sample"]:
            meshes.append(
                {
                    "mesh_id": f"ZIP-{entry}",
                    "name": entry,
                    "kind": "ZIP_ENTRY",
                    "door_name_candidate": _looks_like_door(entry),
                }
            )
    door_hits = [m for m in meshes if m.get("door_name_candidate")]
    return {
        "file": str(path.relative_to(ROOT)),
        "mesh_count": len(meshes),
        "meshes": meshes,
        "door_name_hits": door_hits,
        "inventory_status": "PARSED" if meshes else "NO_NAMED_MESHES_EXTRACTED",
    }


def _looks_like_door(name: str) -> bool:
    n = name.lower().replace("-", "_").replace(" ", "_")
    keys = ("door", "door_fl", "door_lf", "front_left_door", "lh_door", "door_front_lh", "door_front_left")
    return any(k in n for k in keys)


def grade_extractability(inventory: dict, meta: dict) -> tuple[str, str, str]:
    """Return grade_status, extractability, summary markdown body section."""
    hits = inventory.get("door_name_hits") or []
    fmt = (meta.get("file_format") or "").lower()
    if hits:
        return (
            "COMPONENTIZED_CANDIDATE",
            "SEPARABLE_BY_NAME_HINT",
            "Named node(s) suggest a front-left door partition exists. Logical detach still requires human verification; CAD hierarchy alone is not operational truth.",
        )
    if fmt in {"step", "stp"}:
        return (
            "PARSED_HIERARCHY_UNKNOWN",
            "UNKNOWN_UNTIL_CAD_WALK",
            "STEP present but full B-rep hierarchy walk is not executed in this lightweight engine pass. Treat as CAD candidate pending dedicated STEP inventory.",
        )
    if inventory.get("mesh_count", 0) <= 1:
        return (
            "PROMOTED_TO_REFERENCE_ONLY",
            "NOT_SEPARABLE_WITHOUT_DESTRUCTIVE_EDIT",
            "No separable door node identified. Asset remains useful as visual/reference envelope; do not claim door extract for CMPINST-VEH000001-DOOR-FL.",
        )
    return (
        "INDEXED",
        "SEPARABILITY_NOT_PROVEN",
        "Multiple nodes/meshes listed but none matched door naming heuristics. Manual hierarchy review required before extract.",
    )


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n")


def run_candidate(cand_id: str, catalog: dict, run_id: str) -> dict[str, Any]:
    ts = utc_now()
    cand = candidate_record(catalog, cand_id)
    if not cand:
        return {
            "candidate_asset_id": cand_id,
            "pipeline_status": "REJECTED",
            "lifecycle_status": "DISCOVERED",
            "error": "Candidate not found in L1_LANE_A_ASSET_CATALOG.json",
            "execution_timestamp": ts,
        }

    stage = staging_dir(cand, cand_id)
    stage.mkdir(parents=True, exist_ok=True)
    (stage / "source").mkdir(exist_ok=True)
    out_dir = stage / "pipeline" / run_id
    out_dir.mkdir(parents=True, exist_ok=True)

    url = resolve_source_url(cand, stage)
    local_files = find_local_bytes(stage)

    result: dict[str, Any] = {
        "candidate_asset_id": cand_id,
        "asset_id": cand.get("asset_id"),
        "execution_timestamp": ts,
        "run_id": run_id,
        "pipeline": "Evidence Acquisition Engine",
        "target_component_instance_ids": cand.get("target_component_instance_ids") or [],
        "source_url": url,
        "url_status": "RECORDED" if url else "NOT_RECORDED",
        "local_files": [str(p.relative_to(ROOT)) for p in local_files],
        "lifecycle_status": cand.get("evidence_status") or "DISCOVERED",
        "pipeline_stage_reached": "DISCOVER",
        "passport_updated": False,
        "passport_update_reason": "Deferred until ACQUIRED + hashed + parsed + inventoried (DT-D030/D031).",
        "primary_risk": {
            "CAND-00031-CGT": "Potential empty shell (visual-only, limited interior paneling).",
            "CAND-771-GRAB": "Unknown hierarchy (may be merged mesh without logical separation).",
        }.get(cand_id, "UNKNOWN"),
        "outputs": {},
    }

    if not url and not local_files:
        result["pipeline_status"] = "BLOCKED_BY_MISSING_SOURCE_URL"
        result["lifecycle_status"] = "DISCOVERED"
        result["pipeline_stage_reached"] = "ACQUIRE"
        result["block_reason"] = (
            "No source URL recorded and no local bytes under staging/source/. "
            "Acquisition cannot proceed without inventing a URL (Hard Rule 6)."
        )
        # Still emit empty structured outputs for transparency
        write_json(
            out_dir / "asset_manifest.json",
            {
                "candidate_asset_id": cand_id,
                "status": "NOT_ACQUIRED",
                "files": [],
                "execution_timestamp": ts,
            },
        )
        write_json(
            out_dir / "asset_hash_record.json",
            {
                "candidate_asset_id": cand_id,
                "status": "NOT_COMPUTED",
                "sha256": None,
                "reason": "No local bytes",
                "execution_timestamp": ts,
            },
        )
        write_json(
            out_dir / "metadata_record.json",
            {
                "candidate_asset_id": cand_id,
                "status": "NOT_EVALUATED",
                "execution_timestamp": ts,
            },
        )
        write_json(
            out_dir / "mesh_inventory.json",
            {
                "candidate_asset_id": cand_id,
                "status": "NOT_PARSED",
                "meshes": [],
                "execution_timestamp": ts,
            },
        )
        report = out_dir / "door_extractability_report.md"
        report.write_text(
            f"""# Door Extractability Report — {cand_id}

**execution_timestamp:** {ts}
**status:** BLOCKED_BY_MISSING_SOURCE_URL
**target:** CMPINST-VEH000001-DOOR-FL

## Result

No acquisition performed. Record a real source URL (catalog `url` or `source_url.txt`) and place licensed bytes under:

`{stage.relative_to(ROOT)}/source/`

Then re-run the Evidence Acquisition Engine.

## Risks

{result["primary_risk"]}

## Grade

NOT_ACQUIRED — not PROMOTED_TO_REFERENCE_ONLY (no bytes to evaluate).
"""
        )
        result["outputs"] = {
            "asset_manifest": str((out_dir / "asset_manifest.json").relative_to(ROOT)),
            "asset_hash_record": str((out_dir / "asset_hash_record.json").relative_to(ROOT)),
            "metadata_record": str((out_dir / "metadata_record.json").relative_to(ROOT)),
            "mesh_inventory": str((out_dir / "mesh_inventory.json").relative_to(ROOT)),
            "door_extractability_report": str(report.relative_to(ROOT)),
        }
        write_json(out_dir / "pipeline_run.json", result)
        result["outputs"]["pipeline_run"] = str((out_dir / "pipeline_run.json").relative_to(ROOT))
        return result

    # Bytes present → INTEGRITY → METADATA → PARSE → INVENTORY → GRADE
    primary = local_files[0]
    digest = sha256_file(primary)
    result["pipeline_stage_reached"] = "INTEGRITY"
    result["lifecycle_status"] = "ACQUIRED"

    hash_record = {
        "candidate_asset_id": cand_id,
        "status": "COMPUTED",
        "file": str(primary.relative_to(ROOT)),
        "sha256": digest,
        "algorithm": "SHA-256",
        "execution_timestamp": ts,
    }
    write_json(out_dir / "asset_hash_record.json", hash_record)

    meta = extract_metadata(primary, digest)
    result["pipeline_stage_reached"] = "METADATA"
    write_json(out_dir / "metadata_record.json", {"candidate_asset_id": cand_id, **meta})

    inventory = inventory_from_metadata(meta, primary)
    result["pipeline_stage_reached"] = "INVENTORY"
    result["lifecycle_status"] = "PARSED" if inventory.get("meshes") else "VERIFIED"
    write_json(out_dir / "mesh_inventory.json", {"candidate_asset_id": cand_id, **inventory, "execution_timestamp": ts})

    grade_status, extractability, narrative = grade_extractability(inventory, meta)
    result["pipeline_stage_reached"] = "GRADE"
    result["grade_status"] = grade_status
    result["extractability"] = extractability
    if grade_status == "PROMOTED_TO_REFERENCE_ONLY":
        result["lifecycle_status"] = "PROMOTED_TO_REFERENCE_ONLY"
        result["pipeline_status"] = "PROMOTED_TO_REFERENCE_ONLY"
    elif grade_status == "COMPONENTIZED_CANDIDATE":
        result["lifecycle_status"] = "COMPONENTIZED"
        result["pipeline_status"] = "COMPONENTIZED_CANDIDATE"
    else:
        result["pipeline_status"] = grade_status

    write_json(
        out_dir / "asset_manifest.json",
        {
            "candidate_asset_id": cand_id,
            "status": "ACQUIRED",
            "files": [
                {
                    "path": str(p.relative_to(ROOT)),
                    "sha256": sha256_file(p) if p == primary else None,
                    "primary": p == primary,
                }
                for p in local_files
            ],
            "execution_timestamp": ts,
        },
    )

    report = out_dir / "door_extractability_report.md"
    report.write_text(
        f"""# Door Extractability Report — {cand_id}

**execution_timestamp:** {ts}
**file:** `{primary.relative_to(ROOT)}`
**sha256:** `{digest}`
**target:** CMPINST-VEH000001-DOOR-FL
**grade_status:** {grade_status}
**extractability:** {extractability}

## Evaluation

{narrative}

## Inventory summary

- mesh/node entries: {inventory.get("mesh_count")}
- door name hits: {len(inventory.get("door_name_hits") or [])}

## Rules

- CAD/node hierarchy is discovery-only until relationship verification.
- Do not update passport geometry links until extract is confirmed and linked only to the exact component instance.
- If not separable: keep as PROMOTED_TO_REFERENCE_ONLY and continue searching for a separable door asset.
"""
    )

    result["outputs"] = {
        "asset_manifest": str((out_dir / "asset_manifest.json").relative_to(ROOT)),
        "asset_hash_record": str((out_dir / "asset_hash_record.json").relative_to(ROOT)),
        "metadata_record": str((out_dir / "metadata_record.json").relative_to(ROOT)),
        "mesh_inventory": str((out_dir / "mesh_inventory.json").relative_to(ROOT)),
        "door_extractability_report": str(report.relative_to(ROOT)),
    }
    # passport still not auto-updated in this pass when extract not runtime-ready
    if result.get("lifecycle_status") not in {"COMPONENTIZED"}:
        result["passport_updated"] = False
    write_json(out_dir / "pipeline_run.json", result)
    result["outputs"]["pipeline_run"] = str((out_dir / "pipeline_run.json").relative_to(ROOT))
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description="EDTS Evidence Acquisition Engine")
    parser.add_argument(
        "--candidates",
        default="CAND-00031-CGT,CAND-771-GRAB",
        help="Comma-separated candidate IDs",
    )
    args = parser.parse_args()
    cand_ids = [c.strip() for c in args.candidates.split(",") if c.strip()]
    run_id = datetime.now(timezone.utc).strftime("run_%Y%m%dT%H%M%SZ")
    catalog = load_catalog()

    runs = [run_candidate(cid, catalog, run_id) for cid in cand_ids]
    summary = {
        "suite": "evidence-acquisition-engine",
        "execution_timestamp": utc_now(),
        "run_id": run_id,
        "kernel_status": "EDTS_EXACT_VEHICLE_KERNEL_VALIDATED",
        "posture": "EVIDENCE_ACQUISITION_IN_PROGRESS",
        "schema_freeze": "ACTIVE",
        "passport_auto_update": False,
        "candidates": runs,
        "suite_pass_or_fail": "PASS",
        "notes": [
            "PASS means the engine executed honestly; blocked candidates are expected until URLs/bytes exist.",
            "Do not treat BLOCKED_BY_MISSING_SOURCE_URL as geometry success.",
        ],
    }
    RESULTS_ROOT.mkdir(parents=True, exist_ok=True)
    out = RESULTS_ROOT / "evidence-acquisition-engine-run.json"
    write_json(out, summary)

    # Human summary
    md = RESULTS_ROOT / "EVIDENCE_ACQUISITION_ENGINE_REPORT.md"
    lines = [
        "# Evidence Acquisition Engine Report",
        "",
        f"**run_id:** `{run_id}`",
        f"**execution_timestamp:** `{summary['execution_timestamp']}`",
        f"**posture:** `{summary['posture']}`",
        f"**kernel:** frozen / `{summary['kernel_status']}`",
        "",
        "| Candidate | Pipeline status | Lifecycle | Passport updated |",
        "|---|---|---|---|",
    ]
    for r in runs:
        lines.append(
            f"| {r.get('candidate_asset_id')} | {r.get('pipeline_status')} | {r.get('lifecycle_status')} | {r.get('passport_updated')} |"
        )
    lines += [
        "",
        "## Next actions",
        "",
        "1. Record real source URLs (catalog or `source_url.txt`).",
        "2. Place licensed files under each candidate `source/` directory.",
        "3. Re-run this engine to hash, extract metadata, parse, inventory, and grade.",
        "4. Update passport links only after a usable door extract exists.",
        "",
        f"Machine evidence: `{out.relative_to(ROOT)}`",
        "",
    ]
    md.write_text("\n".join(lines))
    print(json.dumps({"run_id": run_id, "report": str(md.relative_to(ROOT)), "results": str(out.relative_to(ROOT)), "candidates": [
        {"id": r.get("candidate_asset_id"), "status": r.get("pipeline_status")} for r in runs
    ]}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
