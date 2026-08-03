# Producer ↔ Consumer Divergence Report  
## Capture `.edts-pkg` × EDTS XREPO importer

| Field | Value |
|---|---|
| Audit date (UTC) | 2026-07-23 |
| Mode | **Read-only** — no contract bytes modified |
| Industrial repo | `oxyballs-Industrial` (remote still resolves as `Elektron-Indsutrial`) |
| Industrial tip audited | `origin/main` @ `230dac27c17c3e4e5777c8582ce1958373ec92d6` (includes merged PR #5) |
| Capture clone | `/home/ubuntu/Elektron/elektron-capture-ios` (local only) |
| Capture GitHub | **`chr1stopherwallace156-svg/elektron-capture-ios` — NOT FOUND** (`PENDING_MANUAL_GITHUB_PUBLISH`) |

Classification vocabulary: `MATCH` · `COMPATIBLE_DIFFERENCE` · `DIVERGENCE` · `MISSING_ON_PRODUCER` · `MISSING_ON_CONSUMER` · `UNVERIFIED`

---

## 0. Corrected framing (EAE vs adapter)

> The repository contains the **EAE ingestion core** and related schemas. This audit verifies whether that core is the exact `.edts-pkg` importer referenced by PR #5 and the XREPO tests, or whether a **separate archive adapter** exists.

### Finding

| Layer | Path | Opens `.edts-pkg`? |
|---|---|---|
| **A. General EAE core** | `eae/core/ingest.py` (`ingest_local_file`) | **No** — allowlists `obj`/`glb` only; ZIP magic → reject (`zip_not_in_v0_allowlist`) |
| **B. Concrete adapter** | `eae/importers/xrepo_cap_edts/` (`XREPO-CAP-EDTS-0001` / `0002`) | **Yes** — **only** in-repo consumer of `.edts-pkg` |

**PR #5** (`feat(eae): XREPO-CAP-EDTS-0001/0002 capture package importer`, MERGED → `230dac2`) implements **B**, not a change to general `ingest.py`.

---

## 1. Identity (producer)

| Item | Exact value |
|---|---|
| Branch | `feature/phase1-single-still-runtime` (spelling confirmed; no space variant on disk) |
| HEAD | `255ec4164036cc8743b4139bf26adad55f07be9c` |
| Working tree | **CLEAN** |
| Merged to `main`? | **No** (feature ahead of `main` by 10 commits) |
| Local `main` tip | `338d4369dc166d23b909767d435997fd4a07e760` |
| Phase 0 tag | `capture-ios-phase0-approved-v0.1.3` → tag obj `d867137…` → peeled **`c5f479585bca6aa2929d059f58a09e4eb441de7f`** |
| Phase 1 directive tag | `capture-ios-phase1-directive-v0.1.4` → tag obj `61502eb…` → peeled **`338d4369dc166d23b909767d435997fd4a07e760`** (= local `main`) |
| Remotes | **none** in this clone |
| Package schemas | **Tracked** under `Contracts/` (not generated at build time) |

### Identity (consumer / PR #5)

| Item | Exact value |
|---|---|
| PR | https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial/pull/5 · **MERGED** |
| Merge commit | `230dac27c17c3e4e5777c8582ce1958373ec92d6` |
| Adapter package | `elektron-digital-twin-foundation/eae/importers/xrepo_cap_edts/` |
| Vendored contracts | `eae/contracts/capture_ios_0_1_4/` |
| Vendor pin | tag `capture-ios-phase1-directive-v0.1.4` @ commit `338d4369dc166d23b909767d435997fd4a07e760` |
| `contract_bundle_digest` | `8fb3e27f716225f9f585370ceb337e628f821f26dd1bfe4deb1042120c09de21` |
| Pytest (XREPO) | `27 passed` (`test_xrepo_cap_edts_0001.py` + `_0002.py`) |

---

## 2. Implementation map (10 areas)

| # | Area | Producer | Consumer (adapter B) |
|---|---|---|---|
| 1 | Archive extension / transport | `EvidencePackageBuilder` → `*.edts-pkg` via `ZipPackageWriter` | `ingest_edts_pkg` / `inspect_edts_pkg_archive` in `xrepo_0002.py` |
| 2 | Canonical JSON | Swift `CanonicalJSON` / `CanonicalJSONEncoder` | Python `canonical_json.dumps_canonical` |
| 3 | Manifest / schemas | `Contracts/*` v1.0.0 + builder emit | Vendored schemas + jsonschema in 0001 |
| 4 | Payload hashes | `ArtifactHashingService` / inventory SHA-256 | Recompute inventory + manifest artifact hashes |
| 5 | Package inventory | `PackageInventoryBuilder` (omit self) | Required; self-hash omit policy enforced |
| 6 | Status ownership | `status-owner-registry.json` + `CaptureSideStatusGuard` | Same registry digests; rejects capture-asserted EDTS statuses |
| 7 | Integrity outcome | Export asserts `PACKAGE_EXPORTED` only | Commit → `INGESTED_INTEGRITY_VERIFIED` |
| 8 | Content outcome | Never asserts | Commit → `CONTENT_UNVERIFIED` (never upgraded) |
| 9 | Dual-gate / commit | Leaves to EDTS | 0001 never commits; 0002 commits only if both PASS |
| 10 | Package security & failure semantics | Export-time path reject; no quarantine | Traversal/symlink/dup/bomb/limits/undeclared/rollback/idempotent |

---

## 3. Contract comparison table

| Contract area | Producer implementation | Consumer implementation | Result | Evidence |
|---|---|---|---|---|
| Archive extension | `.edts-pkg` (`EvidencePackageBuilder.swift`) | `.edts-pkg` ZIP reader (`xrepo_0002.py`) | **MATCH** | Capture fixture ingest: both gates PASS |
| Layout (manifest, inventory, status, payload, sidecars) | Written by builder | Required + inventory allowlist | **MATCH** | 0002 inspection entries on fixture |
| Canonical JSON (algorithm intent) | UTF-8, sorted keys, compact | Same rules in Python | **UNVERIFIED** (cross-lang byte proof) | Gap: Swift↔Python shared vector not CI-gated; golden JSON exists on producer |
| Manifest schema bytes | `EvidenceManifest.v1.0.0.schema.json` | Vendored identical | **MATCH** | digest `b58429842f06…` both sides @ tag + HEAD |
| PackageInventory schema bytes | `PackageInventory.v1.0.0.schema.json` | Vendored identical | **MATCH** | digest `1a369f0311e0…` |
| CaptureDeviceProvenance schema | tracked | Vendored identical | **MATCH** | digest `752e92f3475b…` |
| IngestionStatus schema | tracked (EDTS-owned enums) | Vendored identical | **MATCH** | digest `35b342af260e…` |
| StatusOwnerRegistry | `Contracts/Compatibility/status-owner-registry.json` | Vendored identical | **MATCH** | digest `afec15e3b290…` |
| StatusTransitions machine file | **Not tracked** in capture git | `status-transitions.json` (derived from `STATUS_TAXONOMY.md`) | **MISSING_ON_PRODUCER** | Vendor notes say derived from capture docs; no producer path at tag/HEAD |
| Extra producer schemas (CameraCalibration, Motion, …) | Present under `Contracts/` | Not in vendor bundle | **COMPATIBLE_DIFFERENCE** | Sidecar JSON validated loosely / by inventory hash, not full schema gate in 0001 |
| Payload hash algorithm | SHA-256 lowercase hex | SHA-256 recompute | **MATCH** | Artifact `c26be9355c93…` in fixture |
| Inventory self-hash policy | Omit `package_inventory.json` from entries | Enforces omit | **MATCH** | 0001 note + fixture PASS |
| Status assignment | Capture: `PACKAGE_EXPORTED` only | EDTS: `INGESTED_INTEGRITY_VERIFIED` + `CONTENT_UNVERIFIED` | **MATCH** (split ownership) | Fixture `asserted_statuses`; commitment record |
| Integrity outcome | Export-complete / capture-side validate | `INGESTED_INTEGRITY_VERIFIED` on commit | **MATCH** | Live ingest of capture fixture 2026-07-23 |
| Content outcome | Not asserted | `CONTENT_UNVERIFIED` | **MATCH** | `edts_commitment.json` |
| Dual-gate | Documented XREPO-0001/0002 | Implemented | **MATCH** | PR #5 + tests |
| General EAE `ingest.py` as `.edts-pkg` path | N/A | Does **not** consume packages | **COMPATIBLE_DIFFERENCE** | Separate product surface (OBJ/GLB) |
| Synthetic consumer `package_builder.py` | N/A | Python golden for tests | **COMPATIBLE_DIFFERENCE** | Not Swift producer; documented |
| Physical device package | Runtime exists; device blocked | Would use same gates | **UNVERIFIED** | `BLOCKED_BY_ENVIRONMENT` on capture |
| Remote publish / pin URL | No GitHub repo yet | `source_remote_url: null` | **MISSING_ON_PRODUCER** (publish) | `VENDOR_PROVENANCE.json` |
| Stale gap report text | Runtime packager **exists** on feature branch | `IOS_PHASE1_GAP_REPORT.md` still says packager not started | **DIVERGENCE** (docs drift) | Report vs `EvidencePackageBuilder.swift` @ `255ec41` |

---

## 4. Package security & failure semantics (#10)

| Concern | Producer | Consumer (0002/0001) | Result |
|---|---|---|---|
| ZIP / path traversal | `ZipPackageWriter` rejects `..` / abs | `PATH_TRAVERSAL` / `ABSOLUTE_PATH` | **MATCH** intent; producer is export-only |
| Symlink rejection | N/A at export (no symlink members) | `SYMLINK_ENTRY` | **COMPATIBLE_DIFFERENCE** (consumer-hardens) |
| Duplicate filenames | Not hostile-tested on phone | `DUPLICATE_ENTRY` (+ case/NFC) | **COMPATIBLE_DIFFERENCE** |
| Missing / extra payload | Capture-side validator checks inventory | `HASH_MISMATCH` / `UNDECLARED_FILES` | **MATCH** |
| Hash mismatch | Fail export / capture-side validate | Fail 0001; no commit | **MATCH** |
| Schema-version mismatch | Builder emits 1.0.0 | `UNSUPPORTED_SCHEMA_VERSION` | **MATCH** |
| Partial import rollback | Deletes incomplete export dir/zip | Quarantine + staging cleaned in `finally` | **MATCH** intent |
| Quarantine | EDTS duty | Quarantine dir then delete | **MATCH** |
| Idempotent re-import | N/A | Same inventory digest → `idempotent: true` | **MISSING_ON_PRODUCER** (N/A) / **MATCH** on consumer |
| Duplicate evidence | N/A | Idempotent path; refuses status tuple change | Consumer **MATCH** to dual-gate design |
| Unknown fields | JSONEncoder may include extras | jsonschema: depends on `additionalProperties` per schema | **UNVERIFIED** (per-schema audit not expanded here) |
| Max upload / counts | Not documented as hard caps on phone | 32 MiB upload, 64 files, 64 MiB uncompressed, ratio 100 | **COMPATIBLE_DIFFERENCE** (consumer limits) |
| Integrity pass + content unverified | Producer must not claim content | Explicit pair on commit | **MATCH** |

---

## 5. Live cross-repo acceptance (synthetic producer package)

**Command (executed this audit):**

```bash
# from industrial repo
python3 -c 'from eae.importers.xrepo_cap_edts import ingest_edts_pkg; …'
# package:
# /home/ubuntu/Elektron/elektron-capture-ios/TestFixtures/Phase1Runtime/EVD-FIXTURE-PHASE1-001.edts-pkg
```

| Gate | Result |
|---|---|
| Archive SHA-256 | `a68d526932a683bf991715ee26e2e91cc2be765aadd5fa2879f06ecbed685951` |
| XREPO-0001 | **PASS** (`secure_ingestion: NOT_RUN`, `committed: false` when run alone) |
| XREPO-0002 | **PASS**, `committed: true` |
| EDTS statuses | `INGESTED_INTEGRITY_VERIFIED` + `CONTENT_UNVERIFIED` |
| JPEG digest | `c26be9355c9338a1822c57de1ebd2e049f8df9e13f77e60c21ae25fadbbffc2c` |

This proves the **Swift/producer fixture layout** (not only the Python `package_builder.py` golden) is accepted by the PR #5 adapter.

---

## 6. What remains UNVERIFIED / blocked

1. **GitHub publish** of `elektron-capture-ios` (approve/add remote; push `main` + both tags + optionally feature branch).  
2. **Physical device** still → both gates (environment blocked on this Linux agent).  
3. **Swift ↔ Python canonical JSON byte identity** on a shared object (golden file exists; not wired as XREPO CI vector).  
4. **`status-transitions.json`** as a tracked producer artifact (today: consumer-derived from taxonomy docs).  
5. Refresh **`IOS_PHASE1_GAP_REPORT.md`** (stale relative to feature-branch runtime) — documentation only; separate from contracts.

---

## 7. Explicit non-actions (this pass)

- No new capture app or package specification.  
- No edits to approved capture tags or vendored contract bytes.  
- No merge of `feature/phase1-single-still-runtime` into capture `main`.  
- No change to general `eae/core/ingest.py` allowlist.

---

## 8. Recommended next integration proposals (separate from this audit)

| Priority | Proposal | Why |
|---|---|---|
| P0 | Publish capture GitHub repo; set `source_remote_url` in provenance **without** changing contract digests | Unblocks pin reproducibility |
| P1 | Add XREPO CI vector: capture fixture path or submodule → `ingest_edts_pkg` | Locks producer ZIP, not only Python golden |
| P1 | Cross-lang canonical JSON test using `canonical_manifest_phase1_golden.json` | Closes UNVERIFIED row |
| P2 | Track or formally JOINT-own `status-transitions.json` on producer | Clears MISSING_ON_PRODUCER |
| P2 | Update `IOS_PHASE1_GAP_REPORT.md` against `255ec41` | Docs drift only |
| P3 | Physical device procedure execution | True Phase 1 acceptance |

---

## 9. Bottom line

- PR #5’s **XREPO adapter** is the concrete `.edts-pkg` importer; the **general EAE core is not**.  
- Vendored contract **digests match** the capture directive tag for all shared schema files found on both sides.  
- Capture’s **synthetic Phase 1 `.edts-pkg` already dual-gate PASSes** and commits with the required integrity/content status pair.  
- Remaining gaps are **publish, physical device, canonical cross-lang proof, and status-transitions ownership decision** — not a missing second capture system.

---

## 10. Follow-ups applied (2026-07-24) — still no contract redesign

| Item | Action | Status |
|---|---|---|
| Stale gap report | Rewrote `IOS_PHASE1_GAP_REPORT.md` with status matrix | Done |
| Status-transitions | `STATUS_TRANSITIONS_OWNERSHIP.md` — do **not** copy file into producer | Decision pending |
| Cross-lang canonical JSON | Corpus + Python byte lock + Swift test (local capture clone) | Python PASS; Swift **UNVERIFIED** (no toolchain here) |
| Predicted unicode escape mismatch | Documented (`ensure_ascii=True` vs Swift UTF-8) | Needs Mac run / policy decision |
| Capture GitHub publish | Still blocked — human must create remote | **PENDING** |
| Physical rehearsal photos | Not started (requires published app on device) | Blocked on Xcode/device |
