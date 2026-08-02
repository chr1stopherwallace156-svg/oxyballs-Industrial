# Pass 2 — physical device validation (Mac / iPhone)

| Field | Value |
|---|---|
| Pass | 2 |
| Authority on Linux cloud agent | **CANNOT EXECUTE** (no Xcode / no physical device) |
| Operator role | Run on Mac after cloning the Pass 2 handoff tip |
| Status for this evidence package | **PROCEDURE_SUBMITTED — PENDING_OPERATOR_MAC** |

## Integrity reminder

Pass 2 device validation must not weaken Pass 1 gates. Exported packages must still pass capture-side inventory + canonical checks; artifact SHA must equal the post-delegate freeze shown in review.

## Preconditions

1. Fresh clone of Pass 2 tip (bundle or ZIP) — see `PASS2_APPROVAL_EVIDENCE/IDENTITY.txt`
2. `git rev-parse HEAD` matches claimed tip SHA
3. Open `Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj`
4. Scheme `Phase1StillCapture`, physical iPhone, signing as in `Docs/PHYSICAL_IPHONE_VALIDATION_RUNBOOK.md`

## Pass 2 UI checklist (required)

| Step | Expected |
|---|---|
| 1. Launch | Full-bleed live camera preview (not a one-shot Capture & Export button alone) |
| 2. Warm-up | Take Photo disabled until session running + preview attached + ~1.5s warm-up (`readinessText` → Ready) |
| 3. Take Photo | Transition to Review; still image shown (throwaway decode) |
| 4. Review chrome | Shows frozen `sha256` prefix; **Retake** and **Use Photo** only (no flash/torch/lens Pass 3 controls) |
| 5. Retake | Returns to live preview; prior pending discarded |
| 6. Use Photo | Approved confirmation; frozen SHA unchanged |
| 7. Export Package | Status exporting → Package Exported; path under Documents/CapturePackages |
| 8. Artifact check | On-disk `payload/artifact_original.jpg` SHA-256 **equals** frozen review SHA |
| 9. Interrupt (optional) | Background/interrupt → Interrupted → Resume → previewing |

## Failure cases to record

- Permission denied → Camera Access Required + Settings
- Export failure → remains Approved with same frozen SHA (Decision P2-003)
- Illegal skip of review must be impossible in UI (no direct Export from preview)

## Evidence to attach after Mac run

Operator should add (or paste into the Industrial handoff):

1. Device model + iOS version
2. Screenshot or note of Review SHA prefix
3. `shasum -a 256` of exported `artifact_original.jpg`
4. Confirmation that Export SHA matches Review freeze
5. Pass/fail for each checklist row

Linux `swift test` alone is **not** a substitute for this device checklist.
