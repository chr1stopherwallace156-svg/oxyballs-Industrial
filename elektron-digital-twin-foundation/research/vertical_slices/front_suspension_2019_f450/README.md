# Front Suspension Vertical Slice — Mission D

**Decision:** `DT-D053` · **Mission:** `MISN-000004` · **Sprint:** `RL-022`  
**Locked config:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW` / `CFG-000001` / `VEH-000001`

## Verdict

Operator Mission D dump was **honesty-gated**. Mission D is **IN_PROGRESS**, not complete.

| Claim class | Result |
|---|---|
| Front track 74.8 in | **ASSERTION_EXTRACTED** (SRC-CAND-000010) |
| F-450/F-550 4x2 front axle = **Monobeam** (forged steel, Dana) | **ASSERTION_EXTRACTED** (SRC-CAND-000010 Front Axle Specs — 4x2) |
| F-350 4x2 Twin I-beam contrast | **CROSS_CONFIGURATION_COMPARISON only** |
| “Standard FGAWR = 5600 lb” | **REJECTED** for Reg Cab 4x2 145.3 — fleet table shows **4800 (6.8L) / 5200 (6.7L)** max standard |
| Optional path to 7500 lb FGAWR | **DOCUMENT_SUPPORTED** (package-dependent; Extra Heavy-Duty Front-End / available GAWR table) |
| Torque / camber / caster “EXACT_MATCH” table | **REJECTED** — WSM `SRC-CAND-000002` **NOT_ACQUIRED** |
| Steering Haltenberger topology detail | **CANDIDATE_UNVERIFIED** |
| Operator cites ford.ca / 2026 blog / 2013 brochure / CarBuzz / CarsDirect | **NOT authoritative** |

## Artifacts

| Artifact | Path |
|---|---|
| Evidence brief | [`ENGINEERING_EVIDENCE_BRIEF_D.json`](ENGINEERING_EVIDENCE_BRIEF_D.json) |
| Structural nodes | [`STRUCTURAL_NODES.json`](STRUCTURAL_NODES.json) |
| Candidate edges | [`CANDIDATE_EDGES.json`](CANDIDATE_EDGES.json) |
| Operator claim scrub | [`OPERATOR_CLAIM_SCRUB.json`](OPERATOR_CLAIM_SCRUB.json) |
| Knowledge gaps | [`KNOWLEDGE_GAPS.json`](KNOWLEDGE_GAPS.json) |

## Next (do not skip)

1. Keep **MISN-000005 (Mission E)** deferred.
2. Do **not** open Mission F until Mission D architecture + torque/alignment evidence path is clearer **or** as an explicit parallel discovery mission.
3. Immediate Mission D work: parse **SRC-CAND-000001** (BAG) for suspension pages; acquire **SRC-CAND-000002** (WSM) via MISN-000003 commercial handoff; acquire **SRC-CAND-000003** (parts catalog) if needed.
4. No procedure generation. No geometry freeze.
