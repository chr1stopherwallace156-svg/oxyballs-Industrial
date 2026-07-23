from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

from eae.core.ingest import ingest_local_file
from eae.core.registry import AssetRegistry


def test_valid_obj_accepted(cube_obj: Path, store_root: Path):
    out = ingest_local_file(cube_obj, store_root)
    assert out["result"] == "ACCEPTED"
    assert out["state_mutation"] is True
    assert out["asset_id"]
    assert Path(out["manifest_path"]).is_file()


def test_repeat_ingestion_same_asset_identity(cube_obj: Path, store_root: Path):
    a = ingest_local_file(cube_obj, store_root)
    b = ingest_local_file(cube_obj, store_root)
    assert a["result"] == "ACCEPTED"
    assert b["result"] == "ALREADY_INGESTED"
    assert b["state_mutation"] is False
    assert b["existing_asset_id"] == a["asset_id"]
    assert b["asset_id"] == a["asset_id"]
    assert a["sha256"] == b["sha256"]


def test_no_duplicate_authoritative_record(cube_obj: Path, store_root: Path):
    ingest_local_file(cube_obj, store_root)
    ingest_local_file(cube_obj, store_root)
    ingest_local_file(cube_obj, store_root)
    assert AssetRegistry(store_root).count_authoritative() == 1


def test_different_filename_same_bytes_same_identity(cube_obj: Path, store_root: Path, tmp_path: Path):
    copy = tmp_path / "cube_copy.obj"
    shutil.copyfile(cube_obj, copy)
    a = ingest_local_file(cube_obj, store_root)
    b = ingest_local_file(copy, store_root)
    assert a["result"] == "ACCEPTED"
    assert b["result"] == "ALREADY_INGESTED"
    assert a["asset_id"] == b["existing_asset_id"]
    assert a["sha256"] == b["sha256"]


def test_same_filename_different_bytes_different_identity(store_root: Path, tmp_path: Path):
    d = tmp_path / "files"
    d.mkdir()
    f1 = d / "part.obj"
    f2 = d / "part.obj"
    f1.write_text("# a\no A\nv 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3\n", encoding="utf-8")
    a = ingest_local_file(f1, store_root)
    assert a["result"] == "ACCEPTED"
    f2.write_text("# b\no B\nv 0 0 0\nv 2 0 0\nv 0 2 0\nf 1 2 3\n", encoding="utf-8")
    b = ingest_local_file(f2, store_root)
    assert b["result"] == "ACCEPTED"
    assert a["sha256"] != b["sha256"]
    assert a["asset_id"] != b["asset_id"]
    assert AssetRegistry(store_root).count_authoritative() == 2


def test_repeat_across_separate_process(cube_obj: Path, store_root: Path):
    first = ingest_local_file(cube_obj, store_root)
    assert first["result"] == "ACCEPTED"
    root = Path(__file__).resolve().parents[2]
    code = f"""
from pathlib import Path
import sys
sys.path.insert(0, {str(root)!r})
from eae.core.ingest import ingest_local_file
out = ingest_local_file(Path({str(cube_obj)!r}), Path({str(store_root)!r}))
print(out['result'])
print(out['existing_asset_id'])
print(out['state_mutation'])
"""
    proc = subprocess.run([sys.executable, "-c", code], check=True, capture_output=True, text=True)
    lines = proc.stdout.strip().splitlines()
    assert lines[0] == "ALREADY_INGESTED"
    assert lines[1] == first["asset_id"]
    assert lines[2] == "False"
