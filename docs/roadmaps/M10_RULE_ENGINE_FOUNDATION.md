# M10 — Deterministic Rule Engine Foundation (plan-of-record)

**Status: IN PROGRESS — the owner opened this bounded M10 scope (Decision Register
D-011).** This is the plan-of-record and the authoritative build plan; the
implementation lives under `engine/`. Scope is bounded to the Gate 05M-C3
Deterministic Rule Engine Foundation (directive_03); the broad Revision 07
baseline-schema M10 (`M10_IMPLEMENTATION.md`) and ODR-001..ODR-003 remain gated.

> **Governance gate (READ FIRST).** M10 is production code. Under the active
> governance state — Engineering Constitution, `CLAUDE.md`, `AGENTS.md`, and the
> active roadmap `REV07_SOURCE_INGESTION.md` — **no production code and no M10 work
> is performed during the Rev 07 ingestion phase.** The owner has *directed* the
> M10 phase (directive_03) and the Rev 07 ingestion batch sequence is complete
> (75/75), but opening M10 is a formal phase transition that requires:
> 1. the active roadmap pointer to move from `REV07_SOURCE_INGESTION.md` to this
>    file (owner-approved);
> 2. the `docs/AI_INSTRUCTIONS.md` operating manual + `CLAUDE.md` "no M10 /
>    no production code" rule to be updated (proposed, never silently rewritten —
>    Constitution);
> 3. explicit owner confirmation of who executes the build (the owner's directive
>    routes the prompt to "your coding agent").
>
> Until that gate is opened, this document records the plan only. See Decision
> Register **D-010**.

## Frozen source specification

The frozen source specification for M10 is **Gate 05M-C3 Revision 08**
(`docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md`,
`GATE_05M_C3_REVISION_08_CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE`) and the
second-stage filter register rows **RC-313..425**
(`docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`, sections 68–85). The
owner's directive names "Revision 07" as the frozen spec; the deliverable carries
those rules through Revision 08 (the review_71/72 schema-completion corrections
RC-398..425), which is the authoritative artifact M10 implements.

## Doctrine carried into M10 (non-negotiable)

- **Database first, rules second, UI last.** Start with the schema, not the UI.
- **No AI authority.** No AI/simulation result may set physical status.
- **No `INITIAL_TARGET_PROFILE` value** may create movement, pass, fail, block, or
  release authority (RC-267/293/300/412 — the authority-class gate).
- **Signed evidence is append-only** (RC-374/410/422/423) — `INSERT` + append
  annotation/supersession/applicability only; never `UPDATE`/`DELETE` a signed row.
- **Authorization, Execution, and Result statuses are separate** (RC-371/387/408).
- **Any configuration mismatch blocks execution** (RC-409/421/425).
- **Every rejected action returns a specific machine-readable block reason.**
- **Nothing "certified safe"; no public road / no customer / no normal driving**
  (RC-224 + the no-claim/scope rules RC-382/397/411).

## Sub-phase order (owner directive_03)

1. **M10A — Schema normalization.** Core tables (all as specified, arrays → junction
   tables, composite keys RC-400/417): `ConfigurationPacket` · `IndividualVehicle` ·
   `VehicleBuild` · `VehicleComponentInstance` (config-linked, RC-420) ·
   `RunoutCalculations` · `DistanceComponent` · `RunoutAggregationResult` ·
   `RunoutAggregationComponent` · `TestCellAuthorization` · `TestCellRequiredApprover`
   · `TestCellAllowedFault` · `AuthorizationTransition` ·
   `AuthorizationTransitionEvidence` · `TestSession` · `TestExecution` · `TestResult`
   · `TestResultAnnotation` · `SignoffRecord` · `ProcedureApproval` ·
   `FaultDefinition` · `FaultExecutionAuthorization` · `FaultAuthorizationAbortCondition`
   · `PairedFaultAuthorization` · `HazardAnalysis` · `DocumentArchive` ·
   `TelemetryLog` · `InstrumentationRecord`.
2. **M10B — State-machine enforcement.** Mechanically block invalid FKs ·
   configuration mismatches · illegal state transitions (RC-408/413) · unsigned
   procedures (RC-355/389) · expired authorizations (RC-388/424) · multiple active
   test cells (RC-386) · initial-target values used as authority (RC-412) · missing
   runout components (RC-372/401) · insufficient track length (RC-383) · failed
   overlap checks (RC-373) · unhealthy instrumentation (RC-391/403) · out-of-order
   gate progression · unsigned results · modification of signed evidence
   (RC-410/422). Return direct machine-readable reasons (e.g. `BLOCKED:
   RUNOUT_NOT_RELEASED`, `BLOCKED: CONFIGURATION_PACKET_MISMATCH`, `BLOCKED:
   PROCEDURE_APPROVAL_MISSING`, `BLOCKED: PREVIOUS_CELL_SIGNED_PASS_REQUIRED`,
   `BLOCKED: INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY`).
3. **M10C — Runout calculation engine.** The canonical 7-term `L_min` equation
   (RC-340) in code: select eligible components → exclude nested overlaps → validate
   units (canonical SI, RC-385) → validate authority status → calculate `L_min` →
   compare available track length → calculate remaining margin → freeze the component
   snapshot (RC-401) → hash the calculation → require signed release (RC-372).
4. **M10D — Configuration-lock enforcement.** A configuration change (firmware ·
   calibration · DBC · battery · inverter · motor · BMS/PDU · tires · mass/loading ·
   instrumentation · test limits) drives active authorizations → SUSPENDED · runout
   releases → REVOKED_PENDING_RECALCULATION · applicability → IMPACT_REVIEW_REQUIRED ·
   movement authority → BLOCKED · historical evidence → PRESERVED (RC-325/353/425).
5. **M10E — Append-only evidence ledger.** `INSERT` + append annotation/supersession/
   applicability-change only; no `UPDATE`/`DELETE` on signed results, no telemetry
   overwrite, no silent approval replacement; hash-chain per RC-423.
6. **M10F — Automated negative testing.** One negative test per hard block (see the
   required-negative-test list in directive_03), each proving the block fires and
   returns its machine-readable reason.
7. **M10G — SIL validation.** Software-in-the-loop validation against the
   implemented rules.
8. **M10H — HIL readiness.** Hardware-in-the-loop readiness for single-fault,
   paired-fault, and E-stop sequences (frozen passing signatures) — supplier data
   dependent (NeedsSupplierData; BQ-27 etc.).

## Completion criteria (owner directive_03)

`npm run migrate` PASS · `npm run seed` PASS · `npm run verify` PASS · `npm test`
PASS · `npm run build` PASS. The verification report must prove every critical rule
has: schema enforcement · service-layer enforcement where needed · an automated
positive test · an automated negative test · a machine-readable block reason. **Seed
data contains no fake approvals or passes** (RC-355/389 — nothing is `SIGNED_PASS`;
everything seeds `APPROVAL_REQUIRED` / `NOT_STARTED` / `NOT_ELIGIBLE`).

## After M10

**M11 — Platform 001 Open Data Register and Supplier Closure:** stop designing
generic controls; fill the system with the exact F-450/F-550 battery / motor /
inverter / BMS-PDU / brake / steering / cooling / weight / supplier data needed to
authorize the first controlled prototype (resolving the accumulated
`NeedsSupplierData` items + BQ-01..BQ-27; confirm donor 7.3L gas = 001A, BQ-27).

## What this document is NOT

It is not M10 code, an M10 database, or an authorization to begin coding. It is the
frozen plan-of-record that the M10 build (by a coding agent or an explicitly
authorized session) will follow once the owner opens the M10 phase.
