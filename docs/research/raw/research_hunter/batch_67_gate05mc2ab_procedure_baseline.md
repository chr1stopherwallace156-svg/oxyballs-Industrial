# Research Hunter — batch 67 (owner label "65:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, and numeric values are Hunter-supplied and
> UNVERIFIED against source documents. Owner framing and the owner verdict are
> archived separately at `../owner_reviews/review_64_batch_67_verdict.md`.
>
> Context: the Hunter converged on the batch_66 corrections — it now carries the
> software Restricted Creep Torque Clamp (RC-301), the Dual-Channel APPS
> Plausibility Framework (RC-302), the electrical CAN passivity rule (RC-304),
> the C2B Rollback Containment Rule (RC-305), the split 05M-C2A-005A/005B
> torque-command vs phase-current rows (RC-303), the 05M-C2A-010B assistance
> interlock inhibition test (RC-306), the pre-movement assistance interlock
> (RC-298), and bounded fault injection (RC-297). The owner then adds EIGHT
> further items before baseline lock: (residuals) the "Approved by" column
> (RC-299, still not applied by the Hunter) + the missing Numeric Threshold
> Authority Rule (RC-300, still not applied) — plus a new `INVALID_TEST`
> signoff value; and (new) RC-307..312. Reconciled as RC-307..312.

---

## Owner framing (chat, label "65:75")

**QUESTION TOLD** — re-issued the review_63 items (rename the clamp; dual-channel
APPS plausibility; prove electrical CAN passivity, not "zero errors"; C2B
rollback containment; assistance-interlock inhibition test 05M-C2A-010B) plus
the summary list: 1. Rename the software "absolute/hard" torque clamp. 2. Add
dual-channel APPS plausibility. 3. Separate torque-rate validation from
current-response validation. 4. Define CAN passivity electrically. 5. Strengthen
incline rollback containment. 6. Test that failed brake/steering readiness truly
inhibits torque. (Full framing text preserved in the owner chat log; the
substantive content is reproduced in the RESEARCHER RESPONSE below and in the
review_64 verdict.)

---

## RESEARCHER RESPONSE

Architectural Safety Amendments & Engineering Rules
1. Empirical Breakaway Tracking and Mechanical Audit Rules — Breakaway Torque Evaluation Rule: map the actual baseline torque empirically; divergence due to tire load / axle ratio / cold brake drag → halt automated tracking and flag MECHANICAL_BINDING_CHECK, not an automatic component failure.
2. Quantitative System State Definitions — State Quantification Rule: bound vehicle dynamics by creep-speed / torque / runout limits; validate steering & braking support against explicit pressure / voltage / response-time thresholds.
3. Measurable Displacement During Static Holding Checks — Brake-Hold Measurement Metric: confirm physical displacement remains below approved structural thresholds during full torque application, cross-verified across wheel-speed / hub markers / external position sensors.
4. Auxiliary System Interlocks and Pre-Movement Verification — Pre-Movement Assistance Interlock: no creep torque until auxiliary power / booster / steering-assist loops pass formal pre-movement verification; status registers are active soft-start prerequisites.
5. Bounded Safety Fault Simulation Protocols — Fault Simulation Control Protocol: random live hardware fault creation / uncontrolled wiring disconnection while moving is forbidden; use a pre-approved / supplier-supported / simulation-controlled method for bounded predictable tracking errors.
6. Dual-Channel APPS Plausibility Framework — APPS Dead-Band Acceptance Rule: a normalized pedal percentage alone cannot authorize traction torque. Zero-torque validation demands: both physical APPS channels within approved idle ranges; channel-to-channel correlation within approved cross-check tolerances; no stuck-high or implausible-transition faults; approved idle stabilization time fully satisfied; all brake/steering preconditions remain completely valid.
7. Electrical Definition of Network Passivity — CAN Passivity Enforcement Rule: passivity is absolute electrical silence, not absence of logged errors. No dominant-bit transmission, acknowledgement, error flag, wake request, diagnostic request, or other active electrical influence on CAN_1. Observed OEM network errors are separately logged and attributed; their mere presence does not prove instrumentation transmission.
8. Controlled Incline Rollback Containment Boundaries — C2B Rollback Containment Rule: before service-brake release on any grade, verify downhill runout clear, an independent secondary restraint / mechanical capture method physically deployed, remote E-stop active, test driver primed for immediate service-brake reapplication. Define maximum permitted rollback distance, maximum hold duration, motor thermal limits. Traction torque must never be a permanent parking restraint; temporary hill-hold assistance must be logically separated from the mechanical parking brake system.

Gate 05M-C2A — Flat-Ground Restricted Creep
Global Constraints:
APPS Status Management: Controlled under the multi-variable APPS Dead-Band Acceptance Rule. Signal noise or travel outside valid idle correlation thresholds forces the zero-torque threshold.
Torque Command Filter (dT_{command}/dt): Throttled to a maximum derivative cap of <=20 Nm/sec.
Restricted Creep Torque Clamp: Software-limited to the approved restricted-creep boundary (<=30 Nm).
Network Passivity: CAN_1 (Factory Chassis Bus) must remain strictly passive under the electrical passivity enforcement rule.

Verification Matrix: Gate 05M-C2A (columns: Test ID | Element | Procedure | Target | Expected Safe Output | Blocked States | Proof Artifact | Authority Status | Build Engine Status)
- 05M-C2A-001 Static Brake-Hold — Fully apply mechanical service brakes, shift to Drive, apply minor torque request (<=10 Nm). Track wheel speed + physical hub placement. Vehicle displacement remains below approved measurement threshold during brake-hold torque request. Blocked: Any tire creep / rollout / brake slippage exceeding structural tolerances. Proof: CAN log brake pressure vs. wheel speed; physical encoder trace. Authority: Approved by Lead Controls Engineer. Build Engine: LOCKED / UNDER REVIEW.
- 05M-C2A-002 Forward Creep — Enforce brake/steering assist pre-movement checks. Release service brake, allow <=1 meter forward step. Map the empirical breakaway torque baseline; values outside expected targets trigger MECHANICAL_BINDING_CHECK. Driveline overcomes static friction; crawls forward within approved creep-speed / torque / runout limits. Blocked: surging / hopping / accelerating past crawl. Proof: high-speed breakaway torque time-series. Authority: Approved by Lead Mechanical Engineer. Build Engine: STAGED FOR LOG.
- 05M-C2A-003 Reverse Creep — Enforce brake/steering assist pre-movement checks. Shift to Reverse, <=1 meter reverse step. Verify direction params + rearward breakaway consistency. Smooth reverse crawl; directional velocity logged within approved limits. Blocked: erratic reverse acceleration / direction mismatch. Proof: directional register printout; velocity delta log. Authority: Approved by Test Lead. Build Engine: STAGED FOR LOG.
- 05M-C2A-004 Accelerator Map Clamp — Step pedal past 50% travel for <500 ms. Verify VCU command limits + inverter current tracking. Torque + scaling stay clamped below the <=30 Nm threshold. Blocked: torque/current exceeding the approved restricted-creep torque limit. Proof: VCU parametric snapshot over UDS. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-005A Torque Command Ramp-Rate Limit — Step pedal rapidly 0→20% travel. Evaluate software command trajectory. VCU torque command slope must strictly track the linear <=20 Nm/sec constraint profile (dT_{command}/dt). Torque commands rise predictably; no step-functions over the internal VCU loop. Blocked: sudden unfiltered command steps or raw bypasses of the rate filter. Proof: high-resolution VCU internal CAN log. Authority: Approved by Systems Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-005B Phase Current Response Validation — Correlate filtered torque commands with real-world phase current development slopes. Inverter phase current rise must dynamically map to the validated dT_{command}/dt profile without lagging or oscillating. Current develops smoothly under real inertia, matching command limits. Blocked: uncontrolled phase current spikes or step transients at the power bridge. Proof: high-bandwidth oscilloscope current probe trace. Authority: Approved by Power Electronics Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-006 Brake Override During Creep — While crawling forward, firmly depress service brake. VCU must clear traction torque within the approved brake-override response window. Inverter phase current decays within approved threshold; brakes slow/stop wheels without the inverter fighting them. Blocked: inverter pushing drive current against friction brakes outside the response window. Proof: time-correlated brake switch vs. phase current decay log. Authority: Approved by Controls Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-007 E-Stop During Creep — At steady creep, actuate hardwired/remote E-stop. Hardwired safety loop interrupts contactor/control supply path within the approved response window. Inverter torque command → zero + phase current decays within approved threshold. Vehicle coasts or is braked per test plan. Blocked: inverter continues actively driving / automatic retry after E-stop. Proof: high-speed hardware interlock voltage-drop recording. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-008 Shifter Neutral Interrupt — At steady forward creep, shift PRND → Neutral. VCU revokes inverter enable / torque command within the approved response window. Inverter → standby/disabled within the response window; traction torque → zero-torque threshold. Blocked: inverter maintaining torque generation or bridge switching while in Neutral. Proof: time-aligned CAN transaction trace. Authority: Approved by Test Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-009 Wheel-Speed / Motor Parity — Log wheel speed vs. resolver tracking during forward/reverse crawl. Read-only speed data + resolver velocity track within <=5% parity. Parity bit valid; no mismatches. Blocked: deviations beyond tolerance. Proof: unified CAN chart resolver velocity vs. wheel sensors. Authority: Approved by Calibration Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-010A Steering / Brake Assist Monitored Check — Cycle steering + check booster pressures before movement; continuously monitor during creep. No creep torque until brake assist + steering assist pass pre-movement verification. Steering + braking assist within approved pressure / voltage / response thresholds throughout. Blocked: heavy steering / diminished braking from 12V brownout, voltage sag, pressure drop. Proof: 12V aux bus rail diagnostic voltage log. Authority: Approved by Electrical Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-010B Assistance Interlock Inhibition — Use a pre-approved bounded simulation / low-voltage test method to assert a failed assist state before movement. Verify VCU logic when brake assist, steering assist, or auxiliary voltage drop below approved windows. VCU remains torque-inhibited and records the specific blocking reason. Blocked: any traction enable while a required assistance-ready state is invalid. Proof: simulation trace diagnostic capture. Authority: Approved by Systems Safety Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-011 CAN_1 Passive Integrity — Continuous bus diagnostic audits of CAN_1 across all creep blocks. Instrumentation produces no dominant-bit transmission, acknowledgement, error flag, wake request, or diagnostic request on CAN_1. CAN_1 strictly listen-only / passive; observed OEM network errors separately logged and attributed. Blocked: any active frame transmission, dominant-bit override, or error generation onto CAN_1 by the test node. Proof: bus analyzer interface statistics file. Authority: Approved by Integration Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-012 Bounded Fault Latch Interlock — Use a pre-approved / supplier-supported / simulation-controlled fault-injection method to create a bounded tracking fault during creep. System enters a hard fault state within the approved window. Blocks re-energization or creep retries until diagnostic review, fault-source correction, approved service clear, and engineering/test-lead authorization. Blocked: clearing autonomously or immediate creep retry after a trip or hard power cycle. Proof: UDS NVM fault memory validation log. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.

Gate 05M-C2B — Controlled Incline / Rollback Hold Validation
PROVISIONAL: unlocked only after all 05M-C2A entries receive documented engineer signoff and validation clearance.
- 05M-C2B-001 Incline Breakaway Tracking — Enforce brake and steering assist pre-movement checks. Hold on brake, release, command forward crawl under C2B Rollback Containment Rules. Map empirical breakaway torque under loading; deviations trigger MECHANICAL_BINDING_CHECK. Driveline scales torque smoothly to counter incline gravity; moves forward within approved creep-speed and runout limits. Blocked: mechanical rolling slip backwards exceeding supplier-specified safety distances. Proof: incline breakaway torque profile CAN graph. Authority: Approved by Calibration Lead. Build Engine: PROVISIONAL / LOCKED.
- 05M-C2B-002 Rollback Prevention / Active Hold — Bring vehicle to a stop on the incline and fully release service brake under active containment parameters. Monitor motor velocity direction bits + tracking parity over specified hold limits. Anti-rollback prevents free-rolling or stabilizes within supplier-defined limits. Temporary assistance does not act as permanent park function. Blocked: unmitigated backwards free-rolling or abrupt high-torque surges. Proof: wheel-speed encoder direction bits synced with VCU logs. Authority: Approved by Safety Director. Build Engine: PROVISIONAL / LOCKED.

Gate 05M-C2A & Gate 05M-C2B Exit Criteria — (as before) static brake-holds + bidirectional creep mapped with displacement below approved thresholds; multi-variable APPS dead-band + <=30 Nm clamp + <=20 Nm/sec dT_{command}/dt validated under real inertia; brake-override / neutral / E-stop drop torque within approved response windows with zero automatic retries; anti-rollback + <=5% parity synchronized under tire-to-surface loading under strict containment; control-loop faults latch into NVM blocking autonomous retries / hard resets / unvalidated re-power until diagnostic review + physical correction + authorization; all evidence ledgers (Proof Artifacts, signed Authority Status, Build Engine Status) complete and validated. Crucial Engineering Authorization: completing 05M-C2A + 05M-C2B permits a comprehensive safety audit for Gate 05M-C3 baseline constraints.

Next Gate: Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement. Track testing within a physically secure closed-circuit area: multi-turn steering geometry torque compliance, dynamic friction + baseline regenerative braking deceleration windows, initial active traction stability logging. Specific speed boundaries and ramp targets held under strict engineering restriction; will NOT automatically unlock — all limits managed by explicit manual calibration parameters backed by completed proof artifacts.
