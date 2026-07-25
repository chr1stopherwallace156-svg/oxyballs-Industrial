# Capture v2 — Specs 1–6 Cross-Contract Consistency Review

| Field | Value |
|---|---|
| Prior premature result | `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED` — **RETRACTED** |
| Current result | `CROSS_SPEC_REVIEW_COMPLETED_WITH_REQUIRED_CORRECTIONS` |
| Correction pass | **Applied** (semantic mattes, capability identity, lifecycle split, EvidenceValue, clocks, transforms, packaging typo, processing classes, override authority, determinism profile) |
| Registry | `V2_CROSS_SPEC_ENTITY_STATE_REGISTRY.md` |
| Gate | `BASELINE_APPROVAL_PENDING_CORRECTION_PASS` → pending **final sign-off** |

## Why baseline was not approved

The prior review marked all checks PASS while these conflicts remained open:

1. Semantic segmentation mattes vs learned-interpretation ban  
2. Sensor lifecycle overloaded with VERIFY/COMMIT  
3. Telemetry “required fields” vs unavailable-value rules  

Those are addressed in the correction pass. Baseline approval still requires explicit human sign-off after this tip.

## Checklist (post-correction)

| # | Item | Result |
|---|---|---|
| 1 | Every entity has one authoritative owner | **PASS** — see registry |
| 2 | Every state name has one meaning | **PASS** — separated machines |
| 3 | Capture decisions distinct from export decisions | **PASS** |
| 4 | Processing classes distinguish sensor-reported / fused / derived | **PASS** |
| 5 | Derived records preserve lineage | **PASS** |
| 6 | Timestamps declare clock domains; high-rate wall-clock not mandatory | **PASS** |
| 7 | Capability `UNKNOWN` ≠ `UNSUPPORTED`; no subjective confidence | **PASS** |
| 8 | Required/optional from workflow policy | **PASS** |
| 9 | Retakes never overwrite artifacts | **PASS** |
| 10 | Phase 1 backward-compatible | **PASS** |
| 11 | No ML / semantic mattes in production boundary | **PASS** |
| 12 | IR-0001 remains isolated (execution not yet authorized) | **PASS** |

## Status strings

```text
V2_SPECIFICATIONS_4_TO_6_DRAFTED
CROSS_SPEC_REVIEW_COMPLETED_WITH_REQUIRED_CORRECTIONS
CORRECTION_PASS_APPLIED
BASELINE_APPROVAL_PENDING_FINAL_SIGN_OFF
```

**Do not use yet:**

```text
V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED
AUTHORIZED_FOR_IR_0001_EXECUTION
```

## Next sequence

1. ~~Apply twelve targeted corrections~~  
2. ~~Terminology and ownership review~~  
3. ~~Generate cross-spec entity/state registry~~  
4. Mark Specs 1–6 `BASELINE_APPROVED` (human sign-off)  
5. Authorize isolated IR-0001 execution  
6. Capability discovery on physical hardware → `Research/Spikes/IR-0001/RESULTS.md`  
7. `recommendation.md` + v2.0A implementation directive  
