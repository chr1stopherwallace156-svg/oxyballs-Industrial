"""XREPO-CAP-EDTS-0001 canonical compatibility tests."""

from __future__ import annotations

from pathlib import Path

from eae.importers.xrepo_cap_edts.contracts import load_contract_bundle, write_bundle_manifest
from eae.importers.xrepo_cap_edts.package_builder import GOLDEN_IDS, build_golden_package_dir
from eae.importers.xrepo_cap_edts.xrepo_0001 import evaluate_canonical_compatibility


def test_contract_bundle_loads_and_has_stable_digest(tmp_path: Path) -> None:
    bundle = load_contract_bundle()
    assert bundle.registry_schema_version == "1.0.0"
    assert bundle.is_edts_owned("INGESTED_INTEGRITY_VERIFIED")
    assert not bundle.is_edts_owned("PACKAGE_EXPORTED")
    assert len(bundle.bundle_digest) == 64
    write_bundle_manifest(bundle, tmp_path / "bundle_manifest.json")
    assert (tmp_path / "bundle_manifest.json").is_file()


def test_golden_package_canonical_compatibility_pass(tmp_path: Path) -> None:
    pkg = tmp_path / "GOLDEN_EDTS_PKG_001"
    build_golden_package_dir(pkg)
    bundle = load_contract_bundle()
    result = evaluate_canonical_compatibility(
        pkg,
        contracts=bundle,
        expected_bundle_digest=bundle.bundle_digest,
        expected_ids=GOLDEN_IDS,
    )
    d = result.to_dict()
    assert d["canonical_compatibility"] == "PASS"
    assert d["secure_ingestion"] == "NOT_RUN"
    assert d["committed"] is False
    assert d["reason_codes"] == []
    assert d["xrepo_gates"]["XREPO-CAP-EDTS-0001"] == "PASS"
    assert d["xrepo_gates"]["XREPO-CAP-EDTS-0002"] == "NOT_RUN"


def test_negative_hash_mismatch(tmp_path: Path) -> None:
    pkg = tmp_path / "neg"
    build_golden_package_dir(pkg, mutate="HASH_MISMATCH")
    d = evaluate_canonical_compatibility(pkg).to_dict()
    assert d["canonical_compatibility"] == "FAIL"
    assert d["secure_ingestion"] == "NOT_RUN"
    assert d["committed"] is False
    assert "HASH_MISMATCH" in d["reason_codes"]


def test_negative_noncanonical_manifest(tmp_path: Path) -> None:
    pkg = tmp_path / "neg"
    build_golden_package_dir(pkg, mutate="NONCANONICAL_MANIFEST")
    d = evaluate_canonical_compatibility(pkg).to_dict()
    assert d["canonical_compatibility"] == "FAIL"
    assert "NONCANONICAL_MANIFEST" in d["reason_codes"]


def test_negative_unsupported_schema_version(tmp_path: Path) -> None:
    pkg = tmp_path / "neg"
    build_golden_package_dir(pkg, mutate="UNSUPPORTED_SCHEMA_VERSION")
    d = evaluate_canonical_compatibility(pkg).to_dict()
    assert d["canonical_compatibility"] == "FAIL"
    assert "UNSUPPORTED_SCHEMA_VERSION" in d["reason_codes"]


def test_negative_contract_bundle_digest_mismatch(tmp_path: Path) -> None:
    pkg = tmp_path / "ok"
    build_golden_package_dir(pkg)
    d = evaluate_canonical_compatibility(
        pkg, expected_bundle_digest="0" * 64
    ).to_dict()
    assert d["canonical_compatibility"] == "FAIL"
    assert "CONTRACT_BUNDLE_DIGEST_MISMATCH" in d["reason_codes"]


def test_vendored_byte_tamper_fails_load(tmp_path: Path) -> None:
    """Mutating one vendored contract byte must fail with CONTRACT_BUNDLE_DIGEST_MISMATCH."""
    import json
    import shutil

    from eae.importers.xrepo_cap_edts.contracts import (
        BUNDLE_DIR,
        ContractBundleError,
        load_contract_bundle,
    )

    copy = tmp_path / "tampered_bundle"
    shutil.copytree(BUNDLE_DIR, copy)
    target = copy / "status-owner-registry.json"
    obj = json.loads(target.read_text(encoding="utf-8"))
    notes = list(obj.get("notes") or [])
    notes.append("tampered")
    obj["notes"] = notes
    target.write_text(json.dumps(obj, indent=2) + "\n", encoding="utf-8")

    try:
        load_contract_bundle(copy, enforce_pinned_digest=True)
        raise AssertionError("expected ContractBundleError")
    except ContractBundleError as exc:
        assert exc.reason_code == "CONTRACT_BUNDLE_DIGEST_MISMATCH"


def test_vendor_provenance_record_present() -> None:
    bundle = load_contract_bundle()
    prov = bundle.provenance
    assert prov["source_repository"] == "elektron-capture-ios"
    assert prov["source_tag"] == "capture-ios-phase1-directive-v0.1.4"
    assert prov["source_commit"].startswith("338d436")
    assert prov["contract_bundle_digest"] == bundle.bundle_digest
    assert prov.get("source_remote_url") in (None, "") or isinstance(
        prov.get("source_remote_url"), str
    )


def test_negative_unknown_status(tmp_path: Path) -> None:
    pkg = tmp_path / "neg"
    build_golden_package_dir(pkg, mutate="UNKNOWN_STATUS")
    d = evaluate_canonical_compatibility(pkg).to_dict()
    assert "UNKNOWN_STATUS" in d["reason_codes"]


def test_negative_capture_asserted_edts_status(tmp_path: Path) -> None:
    pkg = tmp_path / "neg"
    build_golden_package_dir(pkg, mutate="CAPTURE_ASSERTED_EDTS_STATUS")
    d = evaluate_canonical_compatibility(pkg).to_dict()
    assert "CAPTURE_ASSERTED_EDTS_STATUS" in d["reason_codes"]
    assert d["committed"] is False


def test_negative_identifier_mutation(tmp_path: Path) -> None:
    pkg = tmp_path / "neg"
    build_golden_package_dir(pkg, mutate="IDENTIFIER_MUTATION")
    d = evaluate_canonical_compatibility(
        pkg, expected_ids=GOLDEN_IDS
    ).to_dict()
    assert "IDENTIFIER_MUTATION" in d["reason_codes"]


def test_xrepo_0001_never_commits(tmp_path: Path) -> None:
    pkg = tmp_path / "ok"
    build_golden_package_dir(pkg)
    d = evaluate_canonical_compatibility(pkg).to_dict()
    assert d["committed"] is False
    assert d["secure_ingestion"] == "NOT_RUN"
