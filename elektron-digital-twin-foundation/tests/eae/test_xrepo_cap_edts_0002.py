"""XREPO-CAP-EDTS-0002 secure quarantine ingestion tests."""

from __future__ import annotations

import json
from pathlib import Path

from eae.importers.xrepo_cap_edts.package_builder import (
    build_golden_package_dir,
    write_hostile_zip,
    zip_package_dir,
)
from eae.importers.xrepo_cap_edts.xrepo_0002 import ingest_edts_pkg, inspect_edts_pkg_archive


def test_golden_zip_both_gates_pass_and_commit(tmp_path: Path) -> None:
    pkg = tmp_path / "pkg"
    build_golden_package_dir(pkg)
    zpath = tmp_path / "GOLDEN_EDTS_PKG_001.edts-pkg"
    zip_package_dir(pkg, zpath)
    store = tmp_path / "store"
    result = ingest_edts_pkg(zpath, store)
    d = result.to_dict()
    assert d["canonical_compatibility"] == "PASS"
    assert d["secure_ingestion"] == "PASS"
    assert d["committed"] is True
    assert d["reason_codes"] == []
    assert "INGESTED_INTEGRITY_VERIFIED" in d["details"]["edts_status"]
    assert "CONTENT_UNVERIFIED" in d["details"]["edts_status"]
    # Quarantine cleaned
    assert not (store / "quarantine").exists() or not any((store / "quarantine").iterdir())
    assert Path(d["details"]["commit_path"]).is_dir()


def test_commit_only_when_both_pass_hash_mismatch_zip(tmp_path: Path) -> None:
    pkg = tmp_path / "pkg"
    build_golden_package_dir(pkg, mutate="HASH_MISMATCH")
    zpath = tmp_path / "bad.edts-pkg"
    zip_package_dir(pkg, zpath)
    d = ingest_edts_pkg(zpath, tmp_path / "store").to_dict()
    # Archive security OK, canonical fails — honest dual gate
    assert d["secure_ingestion"] == "PASS"
    assert d["canonical_compatibility"] == "FAIL"
    assert d["committed"] is False
    assert "HASH_MISMATCH" in d["reason_codes"]
    assert not list((tmp_path / "store" / "evidence").glob("EVD-*")) if (tmp_path / "store" / "evidence").exists() else True


def test_hostile_path_traversal(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "PATH_TRAVERSAL", tmp_path)
    d = ingest_edts_pkg(z, tmp_path / "store").to_dict()
    assert d["secure_ingestion"] == "FAIL"
    assert d["canonical_compatibility"] == "NOT_RUN"
    assert d["committed"] is False
    assert "PATH_TRAVERSAL" in d["reason_codes"] or "UNSAFE_PATH" in d["reason_codes"]


def test_hostile_absolute_path(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "ABSOLUTE_PATH", tmp_path)
    d = ingest_edts_pkg(z, tmp_path / "store").to_dict()
    assert d["secure_ingestion"] == "FAIL"
    assert "ABSOLUTE_PATH" in d["reason_codes"] or "UNSAFE_PATH" in d["reason_codes"]


def test_hostile_symlink(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "SYMLINK_ENTRY", tmp_path)
    d = ingest_edts_pkg(z, tmp_path / "store").to_dict()
    assert d["secure_ingestion"] == "FAIL"
    assert "SYMLINK_ENTRY" in d["reason_codes"]


def test_hostile_duplicate_entry(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "DUPLICATE_ENTRY", tmp_path)
    report = inspect_edts_pkg_archive(z)
    assert report["safe"] is False
    assert "DUPLICATE_ENTRY" in report["reason_codes"]


def test_hostile_case_collision(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "CASE_COLLISION", tmp_path)
    report = inspect_edts_pkg_archive(z)
    assert "CASE_COLLISION" in report["reason_codes"]


def test_hostile_unicode_normalization_collision(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "UNICODE_NORMALIZATION_COLLISION", tmp_path)
    report = inspect_edts_pkg_archive(z)
    assert "UNICODE_NORMALIZATION_COLLISION" in report["reason_codes"]


def test_hostile_undeclared_files(tmp_path: Path) -> None:
    pkg = tmp_path / "pkg"
    build_golden_package_dir(pkg)
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "UNDECLARED_FILES", pkg)
    d = ingest_edts_pkg(z, tmp_path / "store").to_dict()
    assert d["secure_ingestion"] == "FAIL"
    assert d["committed"] is False
    assert "UNDECLARED_FILES" in d["reason_codes"]


def test_hostile_nested_archive(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "NESTED_ARCHIVE", tmp_path)
    report = inspect_edts_pkg_archive(z)
    assert "NESTED_ARCHIVE" in report["reason_codes"]


def test_never_collapse_to_package_invalid(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "PATH_TRAVERSAL", tmp_path)
    d = ingest_edts_pkg(z, tmp_path / "store").to_dict()
    assert "PACKAGE_INVALID" not in d["reason_codes"]
    assert "reason_codes" in d


def test_0001_pass_without_commit_when_commit_disabled(tmp_path: Path) -> None:
    pkg = tmp_path / "pkg"
    build_golden_package_dir(pkg)
    zpath = tmp_path / "g.edts-pkg"
    zip_package_dir(pkg, zpath)
    d = ingest_edts_pkg(zpath, tmp_path / "store", commit=False).to_dict()
    assert d["canonical_compatibility"] == "PASS"
    assert d["secure_ingestion"] == "PASS"
    assert d["committed"] is False
    assert not (tmp_path / "store" / "evidence").exists() or not list(
        (tmp_path / "store" / "evidence").glob("EVD-*")
    )


def test_failed_extraction_leaves_no_permanent_record(tmp_path: Path) -> None:
    z = write_hostile_zip(tmp_path / "h.edts-pkg", "PATH_TRAVERSAL", tmp_path)
    store = tmp_path / "store"
    ingest_edts_pkg(z, store)
    assert not (store / "evidence").exists() or not list((store / "evidence").glob("EVD-*"))
    # Quarantine for failed ingest should be cleaned
    q = store / "quarantine"
    assert not q.exists() or not any(q.iterdir())


def test_identical_package_reingest_is_idempotent(tmp_path: Path) -> None:
    pkg = tmp_path / "pkg"
    build_golden_package_dir(pkg)
    zpath = tmp_path / "g.edts-pkg"
    zip_package_dir(pkg, zpath)
    store = tmp_path / "store"
    first = ingest_edts_pkg(zpath, store).to_dict()
    second = ingest_edts_pkg(zpath, store).to_dict()
    assert first["committed"] is True
    assert second["committed"] is True
    assert second["details"]["idempotent"] is True
    assert first["details"]["commit_path"] == second["details"]["commit_path"]
    # IDs unchanged across reingest
    assert (
        first["details"]["commitment_record"]["preserved_ids"]
        == second["details"]["commitment_record"]["preserved_ids"]
    )
    assert second["details"]["commitment_record"]["content_verification"] == "CONTENT_UNVERIFIED"
    assert second["details"]["edts_status"] == [
        "INGESTED_INTEGRITY_VERIFIED",
        "CONTENT_UNVERIFIED",
    ]


def test_commitment_record_coexists_with_artifact_tree(tmp_path: Path) -> None:
    pkg = tmp_path / "pkg"
    build_golden_package_dir(pkg)
    zpath = tmp_path / "g.edts-pkg"
    zip_package_dir(pkg, zpath)
    d = ingest_edts_pkg(zpath, tmp_path / "store").to_dict()
    commit_path = Path(d["details"]["commit_path"])
    assert (commit_path / "manifest.json").is_file()
    assert (commit_path / "edts_commitment.json").is_file()
    record = json.loads((commit_path / "edts_commitment.json").read_text(encoding="utf-8"))
    assert record["content_verification"] == "CONTENT_UNVERIFIED"
    assert "ENGINEERING_VERIFIED" not in json.dumps(record)
