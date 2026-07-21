# Research Hunter — batch 73 (owner label "71:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). Owner framing and the owner verdict are archived
> separately at `../owner_reviews/review_69_batch_73_verdict.md`.
>
> NOTE ON THIS DELIVERY: the message references **Gate 05M-C3 Revision 05** (the
> Hunter's re-emit applying the batch_72 corrections RC-351..363) but does NOT
> re-paste the full Revision 05 draft — it goes straight from the owner's
> re-issued corrections ("QUESTION TOLD") to the owner's verdict ("My verdict …
> Revision 05 is the strongest … version yet"). What the owner reports about
> Revision 05: it still carries the `L_min` transcription errors (Umin /
> Lworst_case_coastor.stop / containment margi — RC-340/351 already clean in the
> deliverable) but otherwise applied the RC-351..363 architecture (distance
> value preservation, immutable ledger lifecycle, authorization state machine,
> etc.). The authoritative Revision-05-equivalent lives in the deliverable
> `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`.

---

## Owner framing (chat, label "71:75") — QUESTION TOLD (re-issued review_68 corrections)

Corrections still required:
1. Correct the equation text (transcription errors Umin / Lworst_case_coastor.stop / containment margi) → the clean 7-term `L_min` equation.
2. Do not erase a response value by "clamping it to zero" → every distance component retains its value; the aggregation record declares INCLUDED_SEPARATELY / INCLUDED_IN_OTHER_COMPONENT / NOT_APPLICABLE / BLOCKED_PENDING_REVIEW with `distance_component_value` / `distance_component_method` / `included_in_L_min` / `included_within_component_id` / `overlap_review_status` / `overlap_review_approver` (e.g. L_response_allowance = 2.4 m, included_in_L_min=false, included_within_component_id=L_worst_case_coast_or_stop).
3. The overlap rule must cover more than response allowance → Distance Accounting Integrity Rule (every metre counted once; each component declares start/end boundary, method, overlap relationship) + component schema (component_id, zone_start_reference, zone_end_reference, distance_m, method, uncertainty_m, included_in_total, parent_component_id, overlap_status, proof_artifact_id, authority_status).
4. Finish the immutable ledger lifecycle sentence → SIGNED_RESULT → CONFIGURATION_CHANGE_DETECTED → IMPACT_REVIEW_REQUIRED → REUSABLE | PARTIALLY_REUSABLE | REPEAT_TEST_REQUIRED | INVALIDATED_FOR_CURRENT_CONFIGURATION → REPLACEMENT_TEST_LINKED → SUPERSEDED_FOR_CURRENT_CONFIGURATION; historical evidence immutable + searchable; invalidated ≠ deleted.
7. Regeneration residual downgraded but refine → ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE + NO_PASS_FAIL_AUTHORITY; measured torque feedback + phase-current + DC-bus current within the supplier/engineering zero-regeneration tracking envelope; remove "reactive field-weakening" unless the inverter engineering documents it at low speed.
8. C3A-006 separated from C3B (good) → don't claim "driver maintains braking control" without measuring pedal state / hydraulic pressure / assist availability / deceleration → "Driver brake input, brake-assist state and hydraulic pressure remain within the approved C3A operating envelope throughout the event."
9. C3A-009B correctly locked → add BlockReason: EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED + prerequisites (interface architecture approved · signal-integrity analysis complete · latency budget approved · stale/missing-data behaviour approved · failure-mode analysis complete · independent control-authority review signed · HIL validation passed).
10. C3C-007 independent physical-state evidence → phase-current · DC-bus current · motor accel/decel · shaft/wheel-speed response · inverter hardware fault output · contactor state.
11. Steering STALE correct → add signal_validity_state + signal_freshness_state; states VALID_AND_FRESH / VALID_BUT_DEGRADED / IMPLAUSIBLE_BUT_FRESH / STALE / UNAVAILABLE.
12. Fault-execution arrows are review paths → Execution Domain Progression Rule (prior-domain SIGNED_PASS + approved injection method + updated hazard analysis + valid runout calc + active TestCellAuthorization + configuration lock + test-lead authorization).
13. Moving-fault tighter limits → brake-assist-not-ready moving blocked by default (simulate status input, never physically remove braking assist); steering-assist-not-ready never removed while moving (bounded logical status simulation while real assist available); aux-voltage-low bounded supply test needs min guaranteed brake-assist voltage · min guaranteed steering-assist voltage · independent supply protection · hardware undervoltage limits · abort threshold · recovery behaviour.

BOTTOM LINE: 1 correct L_min transcription; 2 preserve component values not zeroing overlap fields; 3 full distance-overlap accounting; 4 immutable result lifecycle; 5 TestCellAuthorization status transitions; 7 ±2 Nm non-authoritative and engineering-dependent; 8 C3A-009B blocking prerequisites; 9 independent evidence after inverter communication loss; 10 separate steering freshness from signal plausibility; 11 fault-domain arrows review paths not automatic permission; 12 formalize paired-fault order/timing/authorization.

## RESEACHER — Gate 05M-C3 Revision 05

*(Referenced by the owner as "Revision 05" but not re-pasted in this message; per
the owner it applies the RC-351..363 architecture but still carries the `L_min`
transcription errors. The owner's verdict with 16 further corrections is archived
in review_69.)*
