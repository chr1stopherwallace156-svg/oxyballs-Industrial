# iOS Phase 1 Runtime — Implementation Gap Report

Status after EDTS importer work + producer/consumer divergence audit (2026-07-24).

**Do not rebuild the package producer.** `EvidencePackageBuilder` already exists on the capture feature branch.

## Status matrix (authoritative)

| Dimension | Status |
|---|---|
| Implementation (code on feature branch) | **COMPLETE ON FEATURE BRANCH** |
| Repository integration | **NOT MERGED TO MAIN** |
| Xcode compilation | **UNVERIFIED** |
| Physical iPhone execution | **UNVERIFIED** |
| Real `.edts-pkg` export from device | **UNVERIFIED** |
| Synthetic importer compatibility | **VERIFIED** (capture fixture → XREPO-0001/0002 PASS) |
| Cross-language canonical JSON byte identity | **UNVERIFIED** (corpus added; Swift gate pending Mac) |
| Capture GitHub publish | **PENDING_MANUAL_GITHUB_PUBLISH** |

## Capture identity (local clone audited)

| Item | Value |
|---|---|
| Branch | `feature/phase1-single-still-runtime` |
| HEAD | `255ec4164036cc8743b4139bf26adad55f07be9c` |
| Working tree | clean |
| Merged to `main`? | no |
| Local `main` | Phase 1 **directive** baseline `338d436` (spec/baseline, not runtime) |
| Phase 0 tag | `capture-ios-phase0-approved-v0.1.3` → `c5f4795` |
| Phase 1 directive tag | `capture-ios-phase1-directive-v0.1.4` → `338d436` |

`main` currently means **specification/baseline**, not “Phase 1 implementation disappeared.” Runtime lives on the feature branch until validated and merged under team policy.

## Already present on feature branch

- Xcode/SwiftUI app shell (`Apps/Phase1StillCapture/`)
- AVFoundation still path (device validation still blocked in CI Linux)
- Exact byte persistence + read-back SHA-256
- Canonical manifest + inventory + `EvidencePackageBuilder` → `.edts-pkg`
- `package_status.json` with capture-owned `PACKAGE_EXPORTED` only
- Capture-side validator (does not assign EDTS ingest statuses)
- Synthetic fixture `TestFixtures/Phase1Runtime/EVD-FIXTURE-PHASE1-001.edts-pkg`

## Gaps that remain real

| Gap | Notes |
|---|---|
| Publish `elektron-capture-ios` remote | No remotes in audited clone; vendor `source_remote_url` still null |
| Xcode build + signing + install | Requires Mac + Apple developer identity |
| Camera permission + real still | Physical iPhone only |
| Real package export + ingest | Rehearsal set (12–20 photos), not full F-450 campaign |
| Cross-lang canonical JSON bytes | See `verification/xrepo_cap_edts/canonical_corpus/` |
| HTTP receive in front of importer | Optional for local/rehearsal ingest |
| Persistent DB beyond filesystem commit | Deferred |

## Explicitly out of Phase 1

ARKit, LiDAR, photogrammetry, AI, measurement inference, Build Engine integration,
multi-artifact sessions, guided coverage of the full vehicle program.

## Recommended sequence

1. Finish PR #9 audit docs (this refresh + corpus + ownership note).
2. Resolve cross-language canonical JSON byte identity.
3. Publish capture repository safely (branches + tags).
4. Build feature branch in Xcode → install on iPhone.
5. Take 12–20 **rehearsal** photos → export `.edts-pkg` → ingest via `xrepo_cap_edts`.
6. Only then schedule authoritative F-450 photography.

## EDTS consumer (post PR #5)

- Dedicated adapter: `eae/importers/xrepo_cap_edts/` (not general `eae/core/ingest.py`)
- Dual-gate + sealed commit statuses: `INGESTED_INTEGRITY_VERIFIED` + `CONTENT_UNVERIFIED`
- Synthetic capture fixture already dual-gate PASS
