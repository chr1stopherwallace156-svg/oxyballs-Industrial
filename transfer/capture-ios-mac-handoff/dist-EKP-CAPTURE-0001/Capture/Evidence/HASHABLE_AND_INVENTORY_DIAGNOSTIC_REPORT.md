# Diagnostic Report — Hashable Conformance & Package Inventory Mismatches

| Field | Value |
|---|---|
| Status | **STEP 0 COMPLETE → Phase A applied** (Hashable synthesis); Phase B no-op on this tip |
| Capture tip at diagnosis | `ebec0f677095f50c240913edc2692d1f984e9c23` |
| Host | Linux cloud agent (no Xcode / no `xcodebuild`) |
| Date | 2026-07-24 |

> Production source and unit tests were **not** modified for this report. Inventory dump used a throwaway `/tmp` SPM harness depending on the package path.

---

## 1. File paths and line numbers

| Symbol / test | Path | Lines |
|---|---|---|
| `EvidenceLibraryIndexRecord` | `App/Phase1/EvidenceLibrary/EvidenceLibraryModels.swift` | **75–142** (`struct` at L75; stored props L76–95) |
| Nested state enums (capture/storage/package/export/integrity) | same file | **18–48** |
| `LocalEvidenceRecordState` | same file | **51–71** |
| `NavigationLink(value: record)` + `navigationDestination(for:)` | `Apps/Phase1StillCapture/EvidenceLibraryViews.swift` | **91–101** |
| `testPackageBuildInventoryAndExtension` | `Tests/Unit/Phase1RuntimeTests.swift` | **182–247** |
| Related inventory validator tests | `Tests/Unit/Pass1CanonicalInventoryTests.swift` | entire file (L7–179) |
| Builder inventory enumeration | `App/Phase1/EvidencePackageBuilder.swift` | **154–172** |
| Inventory builder (self-hash omit) | `App/Phase1/PackageInventoryBuilder.swift` | **10–56** |

App target includes `EvidenceLibraryViews.swift` in `Phase1StillCapture.xcodeproj` Sources (pbxproj). SPM `swift test` does **not** compile that file; `make verify` / `xcodebuild` of the app target does.

---

## 2. Hashable analysis

**Finding: undeclared conformance only — not blocked by a non-hashable stored property.**

`EvidenceLibraryIndexRecord` currently declares:

```swift
public struct EvidenceLibraryIndexRecord: Codable, Sendable, Equatable, Identifiable
```

Stored properties are all value types:

| Property | Type | Hashable? |
|---|---|---|
| `id`, `sessionId`, `artifactId`, `recordId`, paths, digests | `String` / `String?` | Yes |
| `captureTimestamp`, `updatedAt`, optional dates | `Date` / `Date?` | Yes |
| `originalByteCount` | `Int` | Yes |
| `state` | `LocalEvidenceRecordState` | Struct of five `String`-raw enums — synthesizable once those types declare `Hashable` |

No reference types, closures, `UIImage`, or other synthesis blockers.

**Root cause of `NavigationLink(value:)` / `navigationDestination(for:)` compile failure:** SwiftUI requires `Hashable` on the value type. Conformance was never declared on the Phase 1C index record (or its nested state types). Adding `: Hashable` to the five state enums, `LocalEvidenceRecordState`, and `EvidenceLibraryIndexRecord` enables automatic synthesis without changing equality semantics.

---

## 3. Exact failing `swift test` case names

**On this tip (Linux):** `swift test` → **80 tests, 1 skipped, 0 failures.**

The Mac-reported “8 FAILURES” around inventory **were not reproduced** here. No Mac `swift test` failure log was attached to this run. Inventory-related / adjacent cases (candidates if Mac tip is stale or Darwin-specific):

1. `ElektronCaptureTests.Phase1RuntimeTests/testPackageBuildInventoryAndExtension`
2. `ElektronCaptureTests.Phase1RuntimeTests/testCaptureSideValidatorDoesNotClaimEdtsGates`
3. `ElektronCaptureTests.Pass1CanonicalInventoryTests/testInventoryValidatorAcceptsNSNumberByteSize`
4. `ElektronCaptureTests.Pass1CanonicalInventoryTests/testInventoryValidatorFlagsUndeclaredPath`
5. `ElektronCaptureTests.Pass1CanonicalInventoryTests/testSwiftLiteralCorpusMatchesPythonGoldenBytes`
6. `ElektronCaptureTests.Pass1CanonicalInventoryTests/testUnicodeEnsureAsciiEscapes`
7. `ElektronCaptureTests.Phase1RuntimeTests/testCanonicalManifestMatchesPythonGoldenBytes`
8. `ElektronCaptureGoldenTests.GoldenEvidencePackageTests/testGoldenPackageHashesMatchManifest`

*(Additional package-adjacent cases that also pass here: EvidenceLibrary package re-export / hash mismatch tests.)*

---

## 4. Actual vs expected inventory

Reproduced via throwaway harness → `/tmp/edts-inventory-diag-out/` (not test teardown; production output unchanged).

### Actual `package_inventory.json` entry paths

```
capture_device.json
manifest.json
package_status.json
payload/artifact_original.jpg
sidecars/avcapture_metadata.json
sidecars/camera_calibration.json
sidecars/motion_orientation.json
```

`package_inventory.json` is **on disk** but **omitted from `entries`** (Phase 1 self-hash policy).

### On-disk package directory

Same as above **plus** `package_inventory.json`. Undeclared-on-disk set: **empty**.

### Test assertions (`testPackageBuildInventoryAndExtension`)

| Assertion | Actual |
|---|---|
| entries must include `manifest.json` | PASS |
| entries must include `payload/artifact_original.jpg` | PASS |
| entries must **not** include `package_inventory.json` | PASS |
| every on-disk file ≠ inventory appears in entries | PASS |
| `package_status.json` asserted_statuses == `["PACKAGE_EXPORTED"]` | PASS (builder writes this) |

Full dump: `/tmp/edts-inventory-diag-out/actual_vs_expected.json`.

---

## 5. Contract analysis

Authoritative Phase 1 `.edts-pkg` passages:

| Document | Passage | Implication |
|---|---|---|
| `Docs/Evidence/EDTS_PKG_FORMAT.md` L28–52, L55–92 | Required: `manifest.json`, `package_inventory.json`, `capture_device.json`, payload artifact; sidecars recommended; **Self-hash policy (Phase 1): default omit self from `entries`** | Builder matches |
| `Docs/Evidence/PACKAGE_INVENTORY_PASS1_CLASSIFICATION.md` | Completeness + self-hash omit locked; class D = Darwin `NSNumber` bridging; class E = undeclared-path hardening | Validator already accepts `Int`/`NSNumber`; completeness enforced |
| `Docs/Decisions/DECISION_LOG.md` P1-002 | Chosen: omit self + accept Int/NSNumber + flag undeclared | Implementation aligned |

**Verdict:** On tip `ebec0f6`, **`EvidencePackageBuilder` + tests are consistent with the Phase 1 contract.** No inventory expected-path drift found on Linux. If Mac still fails with 8 inventory errors, the Mac tree is likely **not at this tip**, or a Darwin-only artifact (e.g. ephemeral Finder metadata) must be captured from a Mac diagnostic dump before changing builder or tests.

`package_status.json` is written by the builder and inventoried; it is part of the capture-side status contract even though the minimal layout table in `EDTS_PKG_FORMAT.md` emphasizes the smaller required set. Tests assert its presence via undeclared-path completeness, which matches classification completeness rule #1.

---

## 6. Proposed minimal change set & risks

### Phase A (required for app compile)

- Add `Hashable` to: five orthogonal state enums, `LocalEvidenceRecordState`, `EvidenceLibraryIndexRecord`.
- Prefer synthesis; do **not** hand-write `==` / `hash(into:)`.
- **Risk:** Low. Equality semantics unchanged (same synthesized `Equatable` members). `Codable` wire format unchanged.

### Phase B (inventory)

- **No production inventory/builder change** on this tip (actual == expected == contract).
- **Do not weaken tests** to green.
- If Mac re-fails: dump actual inventory from diagnostic location on Mac tip SHA; only then decide builder vs test vs tip mismatch.
- **Risk of changing inventory without Mac dump:** high chance of wrong fix / contract drift.

### Verification notes (this host)

| Gate | Result |
|---|---|
| `make doctor` | PASS (warns: no xcodebuild / no device) |
| `swift test` | 0 failures |
| `make verify` | `HANDOFF_LAYOUT_OK` + `HANDOFF_XCODE_BUILD_SKIPPED` |
| `xcodebuild` app build | **Not available on Linux** — Mac must run |

**Authoritative workspace for app build:** repo-root `Phase1StillCapture.xcworkspace` (`make open` / `Makefile` `WORKSPACE`).  
`Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace` also exists and points at the same xcodeproj + `../..` package; prefer the **root** workspace per `Scripts/doctor.sh` / verify handoff messaging.
