from __future__ import annotations

import json
from pathlib import Path
from unittest import mock

import pytest

from eae.core.errors import ManifestConflictError
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
    assert write_manifest_atomic(path, m) == "WRITTEN"
    assert path.exists()
    assert json.loads(path.read_text())["asset_id"] == m["asset_id"]
    assert not list(tmp_path.glob(".manifest.*.tmp"))


def test_equivalent_manifest_not_overwritten(tmp_path: Path):
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
    m2 = dict(m)
    m2["original_filename"] = "other_name.obj"
    m2["ingestion_policy_version"] = "9.9.9"
    m2["created_at"] = "2099-01-01T00:00:00+00:00"
    assert write_manifest_atomic(path, m2) == "EQUIVALENT_EXISTING"
    on_disk = read_manifest(path)
    assert on_disk["original_filename"] == "cube.obj"  # not silently overwritten


def test_conflicting_manifest_raises(tmp_path: Path):
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
    bad = dict(m)
    bad["sha256"] = "b" * 64
    bad["content_address"] = "sha256:" + ("b" * 64)
    bad["asset_id"] = "AST-" + ("b" * 64)
    with pytest.raises(ManifestConflictError):
        write_manifest_atomic(path, bad)


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

    def boom(src, dst):
        raise OSError("simulated interrupt before atomic rename")

    with mock.patch("eae.core.manifest.os.replace", side_effect=boom):
        with pytest.raises(OSError):
            write_manifest_atomic(path, m)
    assert not path.exists()
    assert not list(tmp_path.glob(".manifest.*.tmp"))


def test_policy_metadata_does_not_duplicate_physical_asset(cube_obj: Path, store_root: Path, monkeypatch):
    first = ingest_local_file(cube_obj, store_root)
    assert first["result"] == "ACCEPTED"
    import eae.core.policy as policy
    import eae.core.ingest as ingest_mod
    import eae.core.manifest as manifest_mod

    monkeypatch.setattr(policy, "INGESTION_POLICY_VERSION", "2.0.0")
    monkeypatch.setattr(ingest_mod, "INGESTION_POLICY_VERSION", "2.0.0")
    monkeypatch.setattr(manifest_mod, "INGESTION_POLICY_VERSION", "2.0.0")
    second = ingest_local_file(cube_obj, store_root)
    assert second["result"] == "ALREADY_INGESTED"
    assert second["existing_asset_id"] == first["asset_id"]
    assert AssetRegistry(store_root).count_authoritative() == 1
    # Evaluation log may exist for newer policy
    eval_logs = list((store_root / "logs" / "evaluations").glob("*.json"))
    assert eval_logs
