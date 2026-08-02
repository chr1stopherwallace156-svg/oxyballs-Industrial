# IR-0001 Research Spike — AVFoundation Manual Exposure & Focus

| Field | Value |
|---|---|
| Status | `APPROVED_FOR_ISOLATED_SPIKE` — wait for Specs 1–6 `BASELINE_APPROVED` |
| Production code | **Forbidden** in this directory’s outputs |
| Governing IR | `Research/IntegrationReports/IR-0001-AVFoundation-Manual-Exposure-and-Focus.md` |
| Spec gates | Capability Matrix (Spec 4) + Sensor Framework (Spec 3) |

## Purpose

Validate AVFoundation custom exposure and locked focus **queries and lock orchestration patterns** on physical devices, feeding the Capability Matrix — without landing camera actors in production SPM targets.

## Allowed outputs (this folder)

```text
Research/Spikes/IR-0001/
  README.md                 ← this file
  NOTES.md                  ← operator observations
  RESULTS.md                ← measured capability table (fill on device)
  fixtures/                 ← optional logs / Instruments exports
  sandbox/                  ← optional throwaway Xcode sample (NOT linked to ElektronCapture)
```

## Forbidden

- Importing spike code into `App/`, `Apps/Phase1StillCapture/`, or production targets
- Claiming thermal/CPU improvement without Instruments numbers (`UNMEASURED` until profiled)
- Declaring “hardware register locking” beyond documented AVFoundation APIs

## Exit criteria (promotion gate — later)

1. Specs 4–6 reviewed  
2. `RESULTS.md` filled for target devices with capability keys  
3. IR status promoted only via explicit decision — not by merging sandbox into production silently
