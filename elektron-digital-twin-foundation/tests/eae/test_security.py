from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path

from eae.core.ingest import ingest_local_file
from eae.core.registry import AssetRegistry


def test_unsupported_extension_rejected(store_root: Path, tmp_path: Path):
    p = tmp_path / "notes.txt"
    p.write_text("hello", encoding="utf-8")
    out = ingest_local_file(p, store_root)
    assert out["result"] == "REJECT_UNSUPPORTED"
    assert out["state_mutation"] is False
    assert AssetRegistry(store_root).count_authoritative() == 0


def test_unsupported_executable_rejected(store_root: Path, tmp_path: Path):
    p = tmp_path / "tool.exe"
    p.write_bytes(b"MZ" + b"\x00" * 128)
    out = ingest_local_file(p, store_root)
    assert out["result"] == "REJECT_UNSUPPORTED"


def test_extension_content_mismatch_quarantined(type_mismatch_glb: Path, store_root: Path):
    out = ingest_local_file(type_mismatch_glb, store_root)
    assert out["result"] == "QUARANTINE_TYPE_MISMATCH"
    assert out["state_mutation"] is False
    assert AssetRegistry(store_root).count_authoritative() == 0
    assert (store_root / "quarantine").exists()


def test_non_obj_bytes_named_obj_quarantined(fixtures_dir: Path, store_root: Path):
    p = fixtures_dir / "non_obj_bytes.obj"
    out = ingest_local_file(p, store_root)
    assert out["result"] == "QUARANTINE_TYPE_MISMATCH"
    assert AssetRegistry(store_root).count_authoritative() == 0


def test_malformed_obj_rejected(malformed_obj: Path, store_root: Path):
    out = ingest_local_file(malformed_obj, store_root)
    assert out["result"] == "REJECT_MALFORMED"
    assert AssetRegistry(store_root).count_authoritative() == 0


def test_zip_traversal_rejected_via_ingest(store_root: Path, tmp_path: Path):
    zpath = tmp_path / "trav.zip"
    with zipfile.ZipFile(zpath, "w") as zf:
        zf.writestr("../escape.txt", b"pwn")
    out = ingest_local_file(zpath, store_root)
    assert out["result"] == "REJECT_SECURITY"
    assert not (tmp_path / "escape.txt").exists()
    assert AssetRegistry(store_root).count_authoritative() == 0


def test_source_fixture_never_modified(cube_obj: Path, store_root: Path):
    before_bytes = cube_obj.read_bytes()
    before_hash = hashlib.sha256(before_bytes).hexdigest()
    before_mtime = cube_obj.stat().st_mtime_ns
    ingest_local_file(cube_obj, store_root)
    ingest_local_file(cube_obj, store_root)
    assert cube_obj.read_bytes() == before_bytes
    assert hashlib.sha256(cube_obj.read_bytes()).hexdigest() == before_hash
    assert cube_obj.stat().st_mtime_ns == before_mtime


def test_partial_manifest_does_not_corrupt_registry(cube_obj: Path, store_root: Path):
    junk = store_root / "assets" / ("c" * 64) / "manifest.json.partial"
    junk.parent.mkdir(parents=True)
    junk.write_text("{", encoding="utf-8")
    out = ingest_local_file(cube_obj, store_root)
    assert out["result"] == "ACCEPTED"
    reg = AssetRegistry(store_root)
    assert reg.count_authoritative() == 1
    entry = reg.load_index()["entries"][out["sha256"]]
    auth = store_root / entry["manifest_path"]
    assert auth.is_file()
    json.loads(auth.read_text(encoding="utf-8"))
    assert all("partial" not in e.get("manifest_path", "") for e in reg.load_index()["entries"].values())


def test_corrupted_manifest_is_integrity_conflict(cube_obj: Path, store_root: Path):
    first = ingest_local_file(cube_obj, store_root)
    assert first["result"] == "ACCEPTED"
    mpath = Path(first["manifest_path"])
    # Hostile overwrite of authoritative manifest identity fields
    bad = json.loads(mpath.read_text(encoding="utf-8"))
    bad["sha256"] = "0" * 64
    bad["content_address"] = "sha256:" + ("0" * 64)
    mpath.write_text(json.dumps(bad, indent=2) + "\n", encoding="utf-8")
    second = ingest_local_file(cube_obj, store_root)
    assert second["result"] == "REGISTRY_INTEGRITY_CONFLICT"
    assert second["state_mutation"] is False
    assert AssetRegistry(store_root).count_authoritative() == 1
