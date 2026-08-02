#!/usr/bin/env python3
"""Run XREPO-CAP-EDTS-0001/0002 suite and emit compatibility + gap reports."""

from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from eae.importers.xrepo_cap_edts.contracts import load_contract_bundle, write_bundle_manifest
from eae.importers.xrepo_cap_edts.package_builder import (
    GOLDEN_IDS,
    build_golden_package_dir,
    write_hostile_zip,
    zip_package_dir,
)
from eae.importers.xrepo_cap_edts.xrepo_0001 import evaluate_canonical_compatibility
from eae.importers.xrepo_cap_edts.xrepo_0002 import ingest_edts_pkg


def main() -> int:
    out_dir = Path(__file__).resolve().parent / "results"
    out_dir.mkdir(parents=True, exist_ok=True)
    fixtures = out_dir / "fixtures"
    fixtures.mkdir(exist_ok=True)
    store = out_dir / "store"
    if store.exists():
        import shutil

        shutil.rmtree(store)
    store.mkdir()

    bundle = load_contract_bundle()
    write_bundle_manifest(bundle, out_dir / "capture_contract_bundle_manifest.json")

    golden_dir = fixtures / "GOLDEN_EDTS_PKG_001"
    build_golden_package_dir(golden_dir)
    golden_zip = fixtures / "GOLDEN_EDTS_PKG_001.edts-pkg"
    zip_package_dir(golden_dir, golden_zip)

    r0001 = evaluate_canonical_compatibility(
        golden_dir,
        contracts=bundle,
        expected_bundle_digest=bundle.bundle_digest,
        expected_ids=GOLDEN_IDS,
    ).to_dict()

    r0002 = ingest_edts_pkg(golden_zip, store, contracts=bundle, commit=True).to_dict()

    negatives_0001 = {}
    for kind in (
        "HASH_MISMATCH",
        "NONCANONICAL_MANIFEST",
        "UNSUPPORTED_SCHEMA_VERSION",
        "CAPTURE_ASSERTED_EDTS_STATUS",
        "UNKNOWN_STATUS",
        "IDENTIFIER_MUTATION",
    ):
        d = fixtures / f"NEG_{kind}"
        build_golden_package_dir(d, mutate=kind)
        kwargs = {"contracts": bundle}
        if kind == "IDENTIFIER_MUTATION":
            kwargs["expected_ids"] = GOLDEN_IDS
        negatives_0001[kind] = evaluate_canonical_compatibility(d, **kwargs).to_dict()

    negatives_0001["CONTRACT_BUNDLE_DIGEST_MISMATCH"] = evaluate_canonical_compatibility(
        golden_dir, contracts=bundle, expected_bundle_digest="0" * 64
    ).to_dict()

    hostiles = {}
    for kind in (
        "PATH_TRAVERSAL",
        "ABSOLUTE_PATH",
        "SYMLINK_ENTRY",
        "DUPLICATE_ENTRY",
        "CASE_COLLISION",
        "UNICODE_NORMALIZATION_COLLISION",
        "NESTED_ARCHIVE",
        "UNDECLARED_FILES",
    ):
        z = fixtures / f"HOSTILE_{kind}.edts-pkg"
        write_hostile_zip(z, kind, golden_dir)
        hostiles[kind] = ingest_edts_pkg(z, store / f"h_{kind}", commit=True).to_dict()

    pytest = subprocess.run(
        [sys.executable, "-m", "pytest", "tests/eae/test_xrepo_cap_edts_0001.py", "tests/eae/test_xrepo_cap_edts_0002.py", "-q"],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
    )

    report = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "request": ["XREPO-CAP-EDTS-0001", "XREPO-CAP-EDTS-0002"],
        "capture_contract_bundle_digest": bundle.bundle_digest,
        "registry_schema_version": bundle.registry_schema_version,
        "golden_0001": r0001,
        "golden_0002": r0002,
        "negatives_0001": negatives_0001,
        "hostiles_0002": hostiles,
        "pytest_returncode": pytest.returncode,
        "pytest_stdout": pytest.stdout,
        "pytest_stderr": pytest.stderr,
        "commit_rule": "Commit only when XREPO-0001=PASS AND XREPO-0002=PASS",
    }
    (out_dir / "compatibility_report.json").write_text(
        json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )

    md = out_dir.parent / "COMPATIBILITY_REPORT.md"
    md.write_text(
        _compat_md(report),
        encoding="utf-8",
    )
    gap = out_dir.parent / "IOS_PHASE1_GAP_REPORT.md"
    gap.write_text(_gap_md(), encoding="utf-8")

    print(json.dumps({"0001": r0001["canonical_compatibility"], "0002_committed": r0002["committed"], "pytest": pytest.returncode}, indent=2))
    print(pytest.stdout)
    if pytest.returncode != 0:
        print(pytest.stderr, file=sys.stderr)
    return pytest.returncode


def _compat_md(report: dict) -> str:
    g1 = report["golden_0001"]
    g2 = report["golden_0002"]
    lines = [
        "# XREPO-CAP-EDTS Compatibility Report",
        "",
        f"Generated: `{report['generated_at_utc']}`",
        "",
        "## Contract bundle",
        "",
        f"- Registry schema version: `{report['registry_schema_version']}`",
        f"- Bundle digest: `{report['capture_contract_bundle_digest']}`",
        "",
        "## Golden package",
        "",
        "### XREPO-0001 (canonical compatibility only)",
        "",
        "```json",
        json.dumps(
            {
                "canonical_compatibility": g1["canonical_compatibility"],
                "secure_ingestion": g1["secure_ingestion"],
                "committed": g1["committed"],
            },
            indent=2,
        ),
        "```",
        "",
        "### XREPO-0002 (secure ingest + commit)",
        "",
        "```json",
        json.dumps(
            {
                "canonical_compatibility": g2["canonical_compatibility"],
                "secure_ingestion": g2["secure_ingestion"],
                "committed": g2["committed"],
                "edts_status": g2.get("details", {}).get("edts_status"),
            },
            indent=2,
        ),
        "```",
        "",
        "## Negative fixtures (0001)",
        "",
        "| Fixture | Result | Reason codes |",
        "|---|---|---|",
    ]
    for k, v in report["negatives_0001"].items():
        lines.append(f"| `{k}` | {v['canonical_compatibility']} | {', '.join(v['reason_codes'])} |")
    lines += [
        "",
        "## Hostile fixtures (0002)",
        "",
        "| Fixture | secure_ingestion | committed | Reason codes |",
        "|---|---|---|---|",
    ]
    for k, v in report["hostiles_0002"].items():
        lines.append(
            f"| `{k}` | {v['secure_ingestion']} | {v['committed']} | {', '.join(v['reason_codes'])} |"
        )
    lines += [
        "",
        "## Pytest",
        "",
        f"Return code: `{report['pytest_returncode']}`",
        "",
        "```",
        report["pytest_stdout"].strip() or "(no stdout)",
        "```",
        "",
        "## Rules preserved",
        "",
        "- Failures keep separate reason codes (never collapsed to `PACKAGE_INVALID`).",
        "- Commit only when both gates PASS.",
        "- XREPO-0001 alone never commits (`secure_ingestion: NOT_RUN`).",
        "- Status ownership loaded from vendored `status-owner-registry.json` digests.",
        "",
    ]
    return "\n".join(lines)


def _gap_md() -> str:
    return """# iOS Phase 1 Runtime — Implementation Gap Report

Status after EDTS importer work: **capture repository tagged baseline remains frozen**.
No further speculative design changes to `elektron-capture-ios`.

## Already present in capture-ios (contracts / foundation)

- EvidenceManifest / PackageInventory / CaptureDeviceProvenance schemas
- Status owner registry + CaptureSideStatusGuard
- Canonical JSON rules (Swift)
- Phase 1 directive (approved, runtime not started)
- Mock exporters / golden Path A session package (not Phase 1 `.edts-pkg` zip yet)

## Gaps required for first real end-to-end still

| Gap | Notes |
|---|---|
| Xcode / SwiftUI application shell | Not started |
| AVFoundation camera permission + one still capture | Not started |
| Exact byte persistence (no UIImage round-trip) | Not started |
| Read-back + SHA-256 | Domain hashing exists; not wired to capture |
| Canonical manifest + inventory writer for `.edts-pkg` | Partial domain models; no Phase 1 packager |
| `package_status.json` with `PACKAGE_EXPORTED` only | Not started |
| Export/upload to EDTS quarantine endpoint | Mock client only |
| Device provenance filled from real enrollment | Fixture placeholders only |
| App Attest / attestation hooks | Not started |

## Explicitly out of Phase 1

ARKit, LiDAR, photogrammetry, AI, measurement inference, Build Engine integration,
multi-artifact sessions, guided coverage.

## Recommended sequence after importer green

1. Publish `elektron-capture-ios` (`main` + both baseline tags).
2. Keep EDTS importer fixtures as the acceptance oracle.
3. Build minimal iOS Phase 1 runtime only.
4. Capture one JPEG/HEIF → package → both EDTS gates → `CONTENT_UNVERIFIED`.

## EDTS side remaining (post this report)

- HTTP receive API in front of `ingest_edts_pkg` (not required for local fixture proof)
- Persistent object store / DB records for committed evidence
- Cross-language canonical byte proof against Swift `CanonicalJSON` on shared fixtures
"""


if __name__ == "__main__":
    raise SystemExit(main())
