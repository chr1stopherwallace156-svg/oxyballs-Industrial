from __future__ import annotations

import json
from pathlib import Path
from unittest import mock

from eae.core.hashing import asset_id_from_hash, content_address, sha256_hex_file
from eae.core.ingest import ingest_local_file
from eae.core.manifest import build_manifest, read_manifest, write_manifest_atomic
from eae.core.registry import AssetRegistry


def test_manifest_contains_only_observed_facts(cube_obj: Path, store_root: Path):
    out = ingest_local_file(cube_obj, store_root)
    assert out["result"] == "ACCEPTED"
    m = read_manifest(Path(out["manifest_path"]))
    forbidden = {
        "mesh_quality",
        "topology_score",
        "vehicle_match",
        "component_id",
        "engineering_usefulness",
        "rubric_score",
    }
    assert forbidden.isdisjoint(m.keys())
    assert m["sha256"] == sha256_hex_file(cube_obj)
    assert len(m["sha256"]) == 64
    assert m["content_address"] == content_address(m["sha256"])
    assert m["asset_id"] == asset_id_from_hash(m["sha256"])
    assert m["source_kind"] == "LOCAL_FIXTURE"
    assert m["integrity_status"] == "PASS"
    assert m["quarantine_status"] == "CLEARED"


def test_atomic_manifest_write(tmp_path: Path):
    path = tmp_path / "manifest.json"
    m = build_manifest(
        asset_id="AST-" + ("a" * 64),
        original_filename="cube.obj",
        detected_format="OBJ",
        format_detection_method="CONTENT_HEURISTIC",
        format_detection_confidence="HIGH",
        file_size_bytes=10,
        sha256_hex="a" * 64,
        content_address="sha256:" + ("a" * 64),
        created_at="2026-07-16T00:00:00+00:00",
    )
    write_manifest_atomic(path, m)
    assert path.exists()
    assert json.loads(path.read_text())["asset_id"] == m["asset_id"]
    assert not list(tmp_path.glob(".manifest.*.tmp"))


def test_failed_manifest_write_leaves_no_authoritative_record(tmp_path: Path):
    path = tmp_path / "manifest.json"
    m = build_manifest(
        asset_id="AST-" + ("b" * 64),
        original_filename="cube.obj",
        detected_format="OBJ",
        format_detection_method="CONTENT_HEURISTIC",
        format_detection_confidence="HIGH",
        file_size_bytes=10,
        sha256_hex="b" * 64,
        content_address="sha256:" + ("b" * 64),
        created_at="2026-07-16T00:00:00+00:00",
    )

    real_replace = __import__("os").replace

    def boom(src, dst):
        raise OSError("simulated interrupt before atomic rename")

    with mock.patch("eae.core.manifest.os.replace", side_effect=boom):
        try:
            write_manifest_atomic(path, m)
            assert False, "expected OSError"
        except OSError:
            pass
    assert not path.exists()
    # temp cleaned up
    assert not list(tmp_path.glob(".manifest.*.tmp"))


def test_attempted_overwrite_does_not_duplicate_registry(cube_obj: Path, store_root: Path):
    first = ingest_local_file(cube_obj, store_root)
    assert first["result"] == "ACCEPTED"
    reg = AssetRegistry(store_root)
    before = reg.count_authoritative()
    mpath = Path(first["manifest_path"])
    original = mpath.read_text(encoding="utf-8")
    # Hostile overwrite of manifest bytes
    mpath.write_text('{"corrupted": true}\n', encoding="utf-8")
    second = ingest_local_file(cube_obj, store_root)
    assert second["result"] == "ALREADY_INGESTED"
    assert second["state_mutation"] is False
    assert reg.count_authoritative() == before
    # Registry still has one entry; re-ingest must not create a second asset id
    assert second["existing_asset_id"] == first["asset_id"]
    # Note: content bytes remain immutable; corrupted manifest is a separate admin concern
    assert (store_root / "assets" / first["sha256"] / "content").read_bytes() == cube_obj.read_bytes()
    # Restore for cleanliness (not required by engine)
    mpath.write_text(original, encoding="utf-8")
