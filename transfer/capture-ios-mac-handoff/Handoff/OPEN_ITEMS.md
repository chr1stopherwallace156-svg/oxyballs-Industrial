# Open Items / Remaining Gates

## Track A — Phase 1 freeze

1. Mac device evidence substitution into `PHASE_1C_FINAL_VALIDATION.md`
2. Commit A (Phase 1 only) → annotated tag `v1.0.0-phase1c` → push
3. `REMOTE_TAG_VERIFIED` → `TAG_TARGET_VERIFIED` → protection recorded → `PHASE_1_FROZEN`

## Track B — Specs / spike

1. Phase 1 remote tag freeze complete
2. Final architectural review → future `CHANGE-0003`
3. Formal IR-0001 execution authorization (`IR_0001_EXECUTION_NOT_YET_AUTHORIZED` until then)

## Handoff packaging

1. Commit Stage 1 metadata (`make handoff-prepare` outputs)
2. `make handoff-package` on clean HEAD → `dist/HANDOFF-0034/`
3. Confirm `DIGESTS_VERIFIED` + `RESTORATION_TEST_PASSED`
