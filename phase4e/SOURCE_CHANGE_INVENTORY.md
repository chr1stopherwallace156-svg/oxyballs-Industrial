# Phase 4E Tier 1 — Source change inventory (relative to main `48e6c1e`)

## Added (all under `phase4e/`, self-contained; not wired into the root Swift build)
- phase4e/Package.swift
- phase4e/README.md
- phase4e/SOURCE_CHANGE_INVENTORY.md
- phase4e/SOURCE_TREE_MANIFEST.txt
- phase4e/Sources/Phase4ECLI/main.swift
- phase4e/Sources/Phase4EContracts/ExitCodes.swift
- phase4e/Sources/Phase4EContracts/Phase4EHandoffContract.swift
- phase4e/Sources/Phase4EContracts/Phase4EInput.swift
- phase4e/Sources/Phase4ECore/InputBindingValidator.swift
- phase4e/Tests/Phase4EContractTests/InputBindingValidatorTests.swift
- phase4e/bin/phase4e-handoff-verify.mjs
- phase4e/bin/phase4e-input-oracle.mjs
- phase4e/bin/phase4e-report-validate.mjs
- phase4e/evidence/summary.json
- phase4e/evidence/validator_log.txt
- phase4e/fixtures/FIX-4E-01_nominal.input.json
- phase4e/fixtures/FIX-4E-05_circular_control.input.json
- phase4e/fixtures/FIX-4E-12ref_unresolved.input.json
- phase4e/fixtures/FIX-4E-14_expired_cal.input.json
- phase4e/fixtures/phase4e_report.good.json
- phase4e/fixtures/recapture_contract.good.json
- phase4e/schemas/Phase4ECharacterizationReport.v1.0.0.schema.json
- phase4e/schemas/RecaptureContract.v1.0.0.schema.json
- phase4e/schemas/phase4e_governance_enums.json
- phase4e/schemas/phase_4e_input.v1.0.0.schema.json
- phase4e/verify-phase4e.sh

## Modified (repository governance)
- docs/DECISION_REGISTER.md — D-032 (Proposed)
- CURRENT_STATE.md — Phase 4E Tier 1 status plane
- Docs/Architecture/PHASE_3_VALIDATION_BACKLOG.md — Phase 4E Tier 1 backlog

## Not modified
- No Phase 4D evidence bytes changed (read-only). No root Package.swift / Makefile change.
