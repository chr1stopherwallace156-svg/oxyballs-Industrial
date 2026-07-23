# Owner directive_03 — M10 Deterministic Rule Engine Foundation (phase transition), owner label "75:75"

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence is
> immutable, never edited). This is the terminal "75:75" delivery in the Research
> Hunter batch sequence. It is NOT a Gate 05M-C3 schema draft or a review verdict —
> it is an **owner phase-transition directive**: the Rev 07 ingestion sequence is
> declared complete and the M10 implementation phase is directed. Cross-referenced
> from `../research_hunter/PROVENANCE.md`.
>
> GOVERNANCE NOTE (Build Engine, not part of the owner text): CLAUDE.md +
> Engineering Constitution + AGENTS.md forbid production code and M10 work during
> the Rev 07 ingestion phase. This directive is archived as evidence and the
> phase-transition is recorded in the Decision Register (D-010) + the M10 roadmap
> (`docs/roadmaps/M10_RULE_ENGINE_FOUNDATION.md`) as the plan-of-record. No
> production code is written from this directive without the owner formally opening
> the M10 phase (updating the active roadmap + the AI_INSTRUCTIONS operating
> manual). The M10 build prompt below is, in the owner's own words, "What to give
> your coding agent."

---

## QUESTION TOLD (owner, label "75:75")

Good. The next phase is implementation, not more Gate 05M-C3 writing.

Your position is now:
REVISION_07_ACCEPTED
CONTROLLED_SPECIFICATION_FREEZE
→ DATABASE_SCHEMA_IMPLEMENTATION

Next milestone: M10 — Deterministic Rule Engine Foundation

Build the database and enforcement layer in this exact order:
M10A — Schema normalization
M10B — State-machine enforcement
M10C — Runout calculation engine
M10D — Configuration-lock enforcement
M10E — Append-only evidence ledger
M10F — Automated negative testing
M10G — SIL validation
M10H — HIL readiness

### M10A — Schema normalization

Implement these core tables first:
ConfigurationPacket · IndividualVehicle · VehicleBuild · VehicleComponentInstance
RunoutCalculations · DistanceComponent · RunoutAggregationResult · RunoutAggregationComponent
TestCellAuthorization · TestCellRequiredApprover · TestCellAllowedFault · AuthorizationTransition · AuthorizationTransitionEvidence
TestSession · TestExecution · TestResult · TestResultAnnotation · SignoffRecord · ProcedureApproval
FaultDefinition · FaultExecutionAuthorization · FaultAuthorizationAbortCondition · PairedFaultAuthorization · HazardAnalysis
DocumentArchive · TelemetryLog · InstrumentationRecord

Do not start with the UI. Start with the database.

### M10B — Hard enforcement rules

The rule engine must mechanically block: invalid foreign keys · configuration
mismatches · illegal state transitions · unsigned procedures · expired
authorizations · multiple active test cells · initial-target values used as
authority · missing runout components · insufficient track length · failed overlap
checks · unhealthy instrumentation · out-of-order gate progression · unsigned
results · attempted modification of signed evidence.

The system should return direct reasons such as:
BLOCKED: RUNOUT_NOT_RELEASED
BLOCKED: CONFIGURATION_PACKET_MISMATCH
BLOCKED: PROCEDURE_APPROVAL_MISSING
BLOCKED: PREVIOUS_CELL_SIGNED_PASS_REQUIRED
BLOCKED: INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY

### M10C — Runout engine

The canonical equation should exist in code, not only documentation:
L_min = L_acceleration + L_stabilization + L_braking_target + L_worst_case_coast_or_stop + L_response_allowance + L_measurement_uncertainty + L_containment_margin

The calculation must: select eligible components · exclude nested overlaps ·
validate units · validate authority status · calculate L_min · compare available
track length · calculate remaining margin · freeze the component snapshot · hash the
calculation · require signed release.

### M10D — Configuration lock

Any change to the configuration must trigger: active authorizations → SUSPENDED ·
runout releases → REVOKED_PENDING_RECALCULATION · current applicability →
IMPACT_REVIEW_REQUIRED · movement authority → BLOCKED · historical evidence →
PRESERVED. Changes include: firmware · calibration · DBC · battery · inverter ·
motor · BMS/PDU · tires · mass/loading · instrumentation · test limits.

### M10E — Append-only evidence ledger

Signed evidence should support: INSERT · APPEND ANNOTATION · APPEND SUPERSESSION ·
APPEND APPLICABILITY CHANGE. It should NOT support: UPDATE signed result · DELETE
signed result · overwrite telemetry · replace an approval silently.

### What to give your coding agent

Use this prompt:

> Implement M10 — Deterministic Rule Engine Foundation for the Elektron Build Engine.
> Revision 07 is the frozen source specification for Gate 05M-C3.
> Doctrine: Database first. Rules second. No AI authority. No simulation result may
> set physical status. No INITIAL_TARGET_PROFILE value may create movement, pass,
> fail, block, or release authority. Signed evidence is append-only. Authorization,
> execution, and result statuses are separate. Any configuration mismatch blocks
> execution. Every rejected action must return a specific machine-readable block reason.
> Implementation order: 1. Normalize the SQLite schema. 2. Add all foreign keys and
> junction tables. 3. Add authorization state-transition enforcement. 4. Add
> RunoutCalculations and RunoutAggregationResult logic. 5. Add cross-record
> ConfigurationPacket equality checks. 6. Add ProcedureApproval and SignoffRecord
> enforcement. 7. Add TestSession, TestExecution, and immutable TestResult attempts.
> 8. Add FaultDefinition, FaultExecutionAuthorization, and PairedFaultAuthorization.
> 9. Add append-only triggers for signed evidence. 10. Add automated negative tests
> for every hard block.
> Required negative tests: malformed runout component · overlapping component
> counted twice · missing source · INITIAL_TARGET_PROFILE used for movement ·
> insufficient track length · configuration mismatch · expired authorization ·
> unsigned procedure · illegal state transition · two active cells for the same
> vehicle/session · missing prior SIGNED_PASS · invalid instrumentation health ·
> attempt to update or delete signed evidence · fault executed outside its
> authorized domain · paired fault executed without HazardAnalysis_ID · changed
> firmware hash after authorization.
> Do not build cosmetic UI changes until all schema migrations, rule tests, and
> verification scripts pass.
> Deliver: SQL migrations · TypeScript types · repositories/services · deterministic
> rule functions · block-reason enum · test fixtures · unit and integration tests ·
> seed data containing no fake approvals or passes · implementation report listing
> every Revision 07 rule and its code/test location.

### Completion criteria

Do not call M10 complete until this is true:
npm run migrate  PASS
npm run seed     PASS
npm run verify   PASS
npm test         PASS
npm run build    PASS

And the verification report must prove every critical rule has: schema enforcement ·
service-layer enforcement where needed · automated positive test · automated
negative test · machine-readable block reason.

After M10 passes, the next phase is:
M11 — Platform 001 Open Data Register and Supplier Closure — where you stop
designing generic controls and begin filling the system with the exact F-450/F-550
battery, motor, inverter, BMS/PDU, brake, steering, cooling, weight, and supplier
data needed to authorize the first controlled prototype.
