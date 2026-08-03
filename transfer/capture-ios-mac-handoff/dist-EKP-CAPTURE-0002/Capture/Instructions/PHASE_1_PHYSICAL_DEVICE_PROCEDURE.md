# Phase 1 Physical Device + EDTS Verification Procedure

Status: **`PHASE_1_RUNTIME_IMPLEMENTED_PENDING_DEVICE_VALIDATION`**

On non-macOS / no-device hosts: simulator and physical-device rows stay **`BLOCKED_BY_ENVIRONMENT`**.

Approved baseline tags (do not move):

- `capture-ios-phase0-approved-v0.1.3`
- `capture-ios-phase1-directive-v0.1.4` @ `338d436`

EDTS importer: Elektron-Indsutrial PR #5 (`XREPO-CAP-EDTS-0001` / `XREPO-CAP-EDTS-0002`).

## A. Local unit / fixture validation (Mac)

```bash
cd elektron-capture-ios
swift test --filter Phase1RuntimeTests
./Scripts/validate-contracts
./Scripts/test-status-owner-registry
```

Simulator is useful for UI wiring only. **Simulator is insufficient for Phase 1 acceptance.**

## B. Physical iPhone capture

Beginner steps: `Docs/PHYSICAL_IPHONE_VALIDATION_RUNBOOK.md`  
Checklist: `Docs/DEVICE_VALIDATION_REHEARSAL_CHECKLIST.md`

1. Open **Open Existing Project…** → `Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj` (local package `ElektronCapture`).
2. Confirm `NSCameraUsageDescription` is present (Info.plist).
3. Signing: Automatic + your Team; change bundle ID if needed.
4. Build/run on a supported **physical iPhone** (rear camera) — not Simulator for acceptance.
5. Grant camera permission.
6. Tap **Capture & Export**.
7. Tap **Share .edts-pkg** (AirDrop/Files) after export.
8. Record from the UI:
   - package path
   - package / evidence ID
   - artifact SHA-256
   - file size (from Finder/Files or `ls -l`)

Session labels: `DEVICE_VALIDATION_REHEARSAL` · `NON_AUTHORITATIVE` · `CONTENT_UNVERIFIED`.

## C. Export / recover package

Package is written under the app Documents directory:

`Documents/Phase1Exports/<EVD-…>.edts-pkg`

Primary transfer: in-app **Share .edts-pkg** (AirDrop).  
Also via Files (file sharing enabled) or Xcode container download.

## D. EDTS import verification

Using the EDTS importer from PR #5 (or merged main):

```python
from pathlib import Path
from eae.importers.xrepo_cap_edts import evaluate_canonical_compatibility, ingest_edts_pkg

# If you have an extracted directory:
# evaluate_canonical_compatibility(Path("extracted_pkg"))

store = Path("/tmp/edts_phase1_store")
result = ingest_edts_pkg(Path("EVD-….edts-pkg"), store, commit=True)
print(result.to_dict())
```

### Expected success tuple

```json
{
  "canonical_compatibility": "PASS",
  "secure_ingestion": "PASS",
  "committed": true
}
```

EDTS-assigned (not capture-assigned):

- `INGESTED_INTEGRITY_VERIFIED`
- `CONTENT_UNVERIFIED`

Must remain:

- `engineering_verification`: `NOT_PERFORMED` / not asserted by capture
- `metrology_status`: `NOT_ASSERTED`

### Record here after the real run

| Field | Value |
|---|---|
| Device | *pending* |
| iOS version | *pending* |
| Package path | *pending* |
| Artifact SHA-256 | *pending* |
| Byte size | *pending* |
| XREPO-0001 | *pending* |
| XREPO-0002 | *pending* |
| Committed | *pending* |
| Reason codes | *pending* |

## Phase 1 implementation complete?

**No — not until the physical-device row above is filled with both gates PASS.**

Repository runtime code for the pipeline is present on `feature/phase1-single-still-runtime`.
