# Owner review_73 — M10 audit verdict (on the coding-agent M10 draft)

> Archived 1:1 as delivered by the owner (Constitution, Article I). Raw payload
> (the coding-agent M10 draft) archived at
> `../research_hunter/batch_77_m10_researcher_draft.md`.

---

My verdict: this is a strong M10 implementation draft, but it is not yet honest to label it "M10 Complete" or say the database and verification scripts are frozen. What you have shown proves that the core structure has been designed and some representative logic/tests exist. It does not yet prove that all Revision 07 constraints are implemented, executed, and passing inside the actual repository.

The correct current status is:
M10 — DETERMINISTIC RULE ENGINE FOUNDATION
Status:
IMPLEMENTATION_DRAFT_CREATED
CORE_SCHEMA_DRAFTED
REPRESENTATIVE_RULES_IMPLEMENTED
REPRESENTATIVE_NEGATIVE_TESTS_DRAFTED
FULL_REVISION_07_TRACEABILITY_NOT_PROVEN
DATABASE_MIGRATION_EXECUTION_NOT_PROVEN
COMPLETE_TEST_SUITE_NOT_PROVEN
M10_COMPLETION_NOT_YET_AUTHORIZED

What is genuinely strong: machine-readable block reasons; normalized SQL tables and junction tables; configuration packet references; authorization state-transition logic; runout summation logic; append-only protections for signed results; separate sessions/executions/results; fault definitions and fault authorization records; negative tests for several important blocks. The strongest chain is ConfigurationPacket → RunoutCalculations → DistanceComponent → RunoutAggregationResult → TestCellAuthorization → TestExecution → TestResult → immutable evidence.

Main corrections before calling M10 complete:

1. This may still be documentation rather than repository implementation. Require concrete evidence: git diff, file paths, migration numbers, commit hash, npm scripts, actual terminal outputs, test count, passing/failing tests. A large pasted response is not proof. Require `npm run migrate` / `npm run seed` / `npm run verify` / `npm test` / `npm run build` to all execute and return real output.
2. The conclusion overclaims physical readiness. Replace "Hardware test engineers can now safely load configuration packages into HIL cells…" with: successful M10 software verification may permit engineering review for M11 data population and later HIL-readiness planning. M10 completion alone does not authorize HIL hardware connection, live-HV testing, vehicle movement, physical fault injection, or test-cell operation. Software unit tests do not prove hardware safety.
3. Schema omitted several Revision 07 requirements. TestCellAuthorization lacks maximum_torque_rate, maximum_jerk, allowed_steering_band, allowed_regen_state, thermal_state_requirement, surface_environmental_window. It also does not preserve each numeric boundary's authority_class / source_artifact_id / uncertainty / effective_revision / unit (TypedNumericField). A number such as 15 is insufficient — the system must know value/unit/source/authority/uncertainty/revision.
4. VehicleComponentInstance is not tied to a vehicle/configuration. It needs at minimum vin or IndividualVehicle_ID, ConfigurationPacket_ID, supplier_part_number, software_or_firmware_version, installation_location, status.
5. VehicleBuild permits only one build record per VIN (`vin TEXT PRIMARY KEY`). Use a separate VehicleBuild_ID: IndividualVehicle 1:N VehicleBuild; VehicleBuild 1:N ConfigurationPacket revisions.
6. Missing configuration identity in TestExecution. verifyConfigurationLock() expects testExecutionConfigId but TestExecution has no ConfigurationPacket_ID. Add ConfigurationPacket_ID, procedure_revision, attempt_number, operator_id, execution_start, execution_end.
7. Missing FK on previous_cell_signed_result_id → TestResult(TestResult_ID). There is a circular creation-order issue; handle by declaring appropriately or restructuring the migration. Right now it is not enforced.
8. Missing proof artifact in DistanceComponent (proof_artifact_id). Enforce: authority_status = ARTIFACT_DEFINED → proof_artifact_id IS NOT NULL; ENGINEERING_APPROVED → valid signoff/approval record exists.
9. Geometry rules described but not enforced in SQL. Need constraints/triggers: zone_end_reference >= zone_start_reference; abs(distance_component_value - (zone_end_reference - zone_start_reference)) <= uncertainty_m; overlap consistency (INCLUDED_IN_OTHER_COMPONENT → included_in_L_min=0 + host not null; INCLUDED_SEPARATELY → included_in_L_min=1 + host null).
10. Runout does not verify required component categories. It sums every eligible included component; it does not prove all required terms exist (L_acceleration … L_containment_margin). Add distance_component_type with a controlled enum; verify required categories + allowed overlap before computing a releasable result.
11. No overlap-failure detection is actually implemented. It does not detect two spatially overlapping components both counted separately, an included host that does not contain the child's geometry, circular nesting, a child linked to a host from another runout, or two components counting the same physical meter. BLOCKED:OVERLAP_CHECK_FAILED exists but is never emitted.
12. No calculation hash is generated. calculation_hash / calculation_version are required but not populated. A frozen calculation should hash canonical sorted inputs + config hash + component IDs + values + authority states + version + timestamp (SHA-256).
13. No signed-release process is implemented. The engine returns DRAFT but no service enforces DRAFT → SIGNED_RELEASE only when approvers signed, snapshot frozen, config IDs match, hash verified, all checks pass.
14. The state-machine function only checks routing. It does not enforce activation prerequisites (not expired, runout signed release, config unchanged, prior signed pass, procedure approved, personnel assigned, environment valid, thermal state valid, containment ready, single active cell). Need authorizeActivation(context), not only validateStateTransition(from,to).
15. Multiple active-cell prevention is not implemented (no SQL partial unique index/trigger/repository transaction/test). The table does not even directly identify vehicle or test session.
16. Procedure approvals are disconnected from test cells. TestCellAuthorization has no ProcedureApproval_ID.
17. Signed evidence is only partly immutable. Also protect TelemetryLog, DocumentArchive, SignoffRecord, AuthorizationTransition, the RunoutAggregationComponent snapshot, and signed RunoutAggregationResult. A signed TestResult points to a TelemetryLog that can currently be updated/deleted.
18. No cryptographic hash chain is implemented. A hash field alone is not tamper evidence — need canonical serialization + artifact hashes + previous-record hash + signer identity + timestamp + a verification routine.
19. TelemetryLog.payload as raw JSON text needs validation (schema_version, ConfigurationPacket_ID, TestExecution_ID, clock_source, sampling rates, time-sync status, dropped-frame data, payload checksum).
20. Fault implementation is incomplete. PairedFaultAuthorization is missing authorization status, authorization expiry, configuration impact status, runout validity confirmation, thermal state confirmation, expected response sequence map, driver abort method, containment boundary, result status, execution status, supersession, configuration packet hash, common-cause assessment. fault_1_id/fault_2_id are not FK to FaultDefinition.
21. Fault execution domain is missing the highest domain (HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS). If deliberate, state it explicitly as deferred and blocked — not silently omitted.
22. Tests are far from comprehensive (six shown). The original M10 requirement included negative tests for: malformed runout geometry, double-counted overlap, missing source, initial-target movement authority, insufficient track, configuration mismatch, expired authorization, unsigned procedure, illegal transition, multiple active cells, missing prior SIGNED_PASS, invalid instrumentation, mutation/deletion of signed evidence, fault outside authorized domain, paired fault without hazard analysis, firmware hash changed after authorization. Also need positive tests.
23. No integration tests against SQLite are shown. Tests only call service functions. Need actual DB integration tests (FKs enabled per connection, triggers fire, transactions roll back, composite keys reject duplicates, SQL check constraints work, signed-row updates blocked, orphaned inserts fail, cross-record equality enforced) using a temporary clean SQLite database.
24. Seed data must contain no fake approvals or passes. Prove seeded records use APPROVAL_REQUIRED / NOT_STARTED / NOT_ELIGIBLE / DRAFT; do not seed APPROVED / SIGNED_PASS / SIGNED_RELEASE unless clearly isolated test fixtures that never enter production data.

Correct completion gate — M10 is complete only when the repository proves: schema migrations PASS; fresh database creation PASS; rollback/re-run migration PASS; TypeScript compile PASS; foreign-key checks PASS; state-machine tests PASS; runout engine tests PASS; configuration-lock tests PASS; append-only ledger tests PASS; fault authorization tests PASS; seed-data audit PASS; rule-to-spec traceability COMPLETE; open deviations DOCUMENTED; no fake approvals CONFIRMED. And terminal output confirms npm run migrate/seed/verify + npm test + npm run build all PASS.

What Cursor should do next: Perform an M10 implementation audit against the frozen Revision 07 specification. Do not accept the pasted M10 narrative as proof of completion. (1) Verify which described files actually exist. (2) Report exact file paths and commit hashes. (3) Run migrations against a fresh temporary SQLite database. (4) Run the actual tests and report pass/fail counts. (5) Build a Revision-07-to-code traceability matrix. (6) Classify every requirement as IMPLEMENTED_AND_TESTED / IMPLEMENTED_NOT_TESTED / PARTIALLY_IMPLEMENTED / DOCUMENT_ONLY / MISSING / DEFERRED_WITH_BLOCK. (7) Correct missing database constraints, services and tests. (8) Do not begin M11. (9) Do not mark M10 complete until all completion commands pass. (10) Leave a cross-agent handoff with the audit evidence. Pay special attention to: TypedNumericField authority/source/uncertainty preservation; required runout component categories; overlap detection; TestExecution ConfigurationPacket linkage; ProcedureApproval linkage; activation prerequisites; multiple active-cell prevention; append-only telemetry and artifacts; PairedFaultAuthorization completeness; SQLite integration tests; no fake approvals or passes.

Bottom line: this is a very good M10 foundation, but the last paragraph is ahead of the evidence. Use "M10 IMPLEMENTATION FOUNDATION CREATED / M10 AUDIT AND COMPLETION TESTING REQUIRED", not "M10 COMPLETE / DATABASE FROZEN / HIL READY". Once Cursor proves the actual repository, fills the missing enforcement, and all verification commands pass, then you can truthfully freeze M10 and proceed to M11 — Platform 001 Open Data Register and Supplier Closure.
