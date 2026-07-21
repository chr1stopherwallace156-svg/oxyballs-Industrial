# RESTRICTED CREEP TORQUE VALIDATION (Gate 05M-C2)

The second rung of the split 05M-C traction phase in the post-bench gate ladder
(Decision Register D-008, amended review_57/58) for the F-450/F-550 EV
conversion (Gate 05M-C2, batch_61 + owner review_58). Gate 05M-C2 is the
**first powered ground-contact movement gate** — the tires touch the ground
under live traction power for the first time. It is stricter than lifted-wheel
testing: **restricted creep only, this is not a normal driving gate.** It is
**split** (owner review_58, RC-286): **05M-C2A Flat-Ground Restricted Creep →
05M-C2B Controlled Incline / Rollback Hold Validation → 05M-C2C Faulted Creep
Recovery.** Flat-ground creep is proven first; rollback/incline is deferred to
05M-C2B.

**Status (05M-C2A, owner review_59/61/63): `BASELINE_CANDIDATE` /
`PROCEDURE_REVIEW_REQUIRED` / `FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE` /
`LIVE_HV_PRESENT` / `GROUND_CONTACT_PRESENT` / `RESTRICTED_CREEP_ONLY` /
`PREDICTABLE_TRACTION_SURFACE_REQUIRED` / `BRAKE_ASSIST_INTERLOCK_REQUIRED` /
`STEERING_ASSIST_INTERLOCK_REQUIRED` / `REMOTE_ESTOP_REQUIRED` /
`SPOTTERS_REQUIRED` / `CAN_1_PASSIVE_ONLY` /
`NUMERIC_LIMITS_INITIAL_TARGET_PROFILE` / `CONTROLLED_FAULT_INJECTION_ONLY` /
`REQUIRED_APPROVERS_DEFINED` / `PROOF_ARTIFACTS_DEFINED` /
`FAULT_LATCH_REQUIRED` / `NO_PUBLIC_ROAD` / `NO_CUSTOMER_OPERATION` /
`NO_NORMAL_DRIVING_AUTHORITY` / `NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`**
(owner review_63 added `BASELINE_CANDIDATE`, `PROCEDURE_REVIEW_REQUIRED`,
`BRAKE_ASSIST_INTERLOCK_REQUIRED`, `STEERING_ASSIST_INTERLOCK_REQUIRED`,
`NUMERIC_LIMITS_INITIAL_TARGET_PROFILE`, `CONTROLLED_FAULT_INJECTION_ONLY`,
`NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`, RC-297..306).**
**Status (05M-C2B, owner review_61/63): `PROVISIONAL_LOCKED` /
`UNLOCKS_ONLY_AFTER_05M_C2A_SIGNED_PASS` / `GROUND_CONTACT_PRESENT` /
`CONTROLLED_INCLINE_ONLY` / `ROLLBACK_CONTAINMENT_PLAN_REQUIRED` /
`SECONDARY_RESTRAINT_REQUIRED` / `TEMPORARY_HILL_HOLD_ONLY` /
`PARKING_HOLD_AUTHORITY_NOT_GRANTED` /
`ROLLBACK_LIMITS_SUPPLIER_OR_ENGINEERING_APPROVED` /
`NUMERIC_LIMITS_INITIAL_TARGET_PROFILE` / `NO_PUBLIC_ROAD` /
`NO_CUSTOMER_OPERATION`.** After all ten review_63 edits the gate pair labels
as `GATE_05M_C2A_C2B_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — a
**procedure baseline, not evidence that the physical vehicle has passed**
(nothing Confirmed). Ladder: **… → 05M-C1 (coupled, wheels lifted) → 05M-C2
(THIS GATE — first ground contact; 05M-C2A → 05M-C2B → 05M-C2C) → 05M-C3
(controlled closed-area low-speed movement)** (D-008, amended review_63).

## Approval / execution record model (owner review_61/63, RC-292/RC-299) — GLOBAL Build Engine rule

**Every matrix row carries a Proof Artifact and a four-field approval/execution
record (owner review_63, RC-299)** — the same evidence structure as earlier
gates, now split so procedure approval is never confused with test-result
signoff. The Authority Status column must NOT read "Approved by &lt;role&gt;"
(RC-292): a procedure can be approved before execution, but a row marked
`PENDING_EXECUTION` / `STAGED FOR LOG` that also says "Approved by" is a
contradictory record. Each row instead carries **four separate fields:**

- **`Required Approver: <role>`** (e.g. Lead Controls Engineer, Safety Director).
- **`Procedure Approval Status`**: `APPROVAL_REQUIRED` → `APPROVED_FOR_CONTROLLED_EXECUTION`.
- **`Execution Status`**: `NOT_EXECUTED` → `PENDING_EXECUTION` → `EXECUTED`.
- **`Result Signoff Status`**: `NOT_ELIGIBLE` (until executed) → `SIGNED_PASS` /
  `SIGNED_FAIL` / `NEEDS_REVIEW`.

All Gate 05M-C2A/C2B rows currently sit at `Procedure Approval Status:
APPROVAL_REQUIRED` (or `APPROVED_FOR_CONTROLLED_EXECUTION` once the written
procedure is reviewed) · `Execution Status: NOT_EXECUTED` · `Result Signoff
Status: NOT_ELIGIBLE`. **No `SIGNED_PASS` exists — nothing has been executed
(`NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`).** Proof artifacts include the
time-synced APPS/brake/CAN torque-command log, phase-current rise/decay trace,
DC-bus current, vehicle-acceleration trace, video record, and the discipline
signoff. Gate-level authority stays `RESTRICTED_CREEP_ONLY /
NO_NORMAL_DRIVING_AUTHORITY`; Build Engine Status = candidate/target (nothing
Confirmed).

## Numeric Threshold Authority Rule (RC-267/RC-284/RC-293/RC-300) — read first

**All numeric thresholds in Gate 05M-C2A / 05M-C2B are `INITIAL_TARGET_PROFILE`
unless explicitly upgraded to `SUPPLIER_DEFINED` or `ENGINEERING_APPROVED`**
(owner review_61/63, RC-293/300): the 0–5% APPS dead-band, the **`dT_command/dt`
≤20 Nm/sec torque ramp-rate (RC-284 — torque ramp rate `dT/dt`, NOT charge/heat
`dQ/dt`)**, the ≤30 Nm creep clamp, the 15–25 Nm breakaway range, the ≤10 Nm
brake-hold request, the ≤1 m movement limit, the ≤5% wheel-speed parity, the
<2° incline, the <500 ms pedal-step test, and the 2 km/h slip / 3 km/h creep.
**No threshold has pass, fail, block, or movement authority until linked to
(owner review_63, RC-300):**

- a **source or engineering calculation**,
- the **applicable hardware/software configuration**,
- a **calibrated measurement method**,
- a stated **uncertainty or tolerance**,
- a **proof artifact**,
- an **approved procedure revision**, and
- a **signed engineering authorization**.

Until then the value is a target, not a criterion — it must not be written or
read as a final pass/fail limit.

## Test-surface rule (owner review_58, RC-283 re-emphasized) — HARD BLOCK

First ground contact must **not** use a low-friction surface (no polished
concrete / epoxy test-bay floor). The default surface is **flat, controlled,
closed, with predictable traction, a clear runout zone, wheel chocks/barriers
staged, a remote E-stop active, spotters positioned outside the movement path,
no public road, and no customer operation.** Low-friction testing is a **later
separate gate** (low friction causes wheel slip / weird ABS-ESC reactions /
poor brake feedback / misleading breakaway data).

## Ground Movement Precondition (owner review_58, RC-285) — HARD BLOCK

**No creep torque may be commanded unless all of the following are verified
first:** service-brake function · brake assist · steering assist · E-stop armed
· remote E-stop active · spotters clear · runout path clear · torque clamp
active · ramp-rate limit active · **engineer / test-lead explicit start
authorization.** This is the first time the vehicle can actually roll.

## Torque ramp-rate & Restricted Creep Torque Clamp doctrine (owner review_58/63, RC-284/RC-301)

Rapid APPS input is permitted **only as a controlled test input.** The VCU
torque output must rise **per the approved ramp-rate limiter
(`dT_command/dt`), not raw pedal slope.** The clamp is the **Restricted Creep
Torque Clamp (owner review_63, RC-301 — renamed from "Absolute Creep Torque
Clamp"): a VCU software limit, software-limited to the approved restricted-creep
boundary (≤30 Nm target), NOT a "hard clamp"** — "hard clamp" would wrongly
imply a hardware-independent safety mechanism; this is a software limit. The
clamp (≤30 Nm target) and the ≤20 Nm/sec ramp-rate are `INITIAL_TARGET_PROFILE`.

## APPS Dead-Band Acceptance Rule (owner review_63, RC-302) — dual-channel plausibility

**A normalized pedal percentage alone cannot authorize torque.** Zero-torque
eligibility (and any transition out of the dead-band) requires **all** of:
**both APPS channels within their approved idle ranges · channel-to-channel
correlation within the approved tolerance · no stuck-high or
implausible-transition fault · the approved idle-stabilization time satisfied ·
the brake/steering pre-movement preconditions valid.** This makes the control
rule robust against channel disagreement or a sensor fault — a single-channel
percentage is never a torque authority.

## Pre-Movement Assistance Interlock (owner review_63, RC-298) — HARD BLOCK

**No creep torque may be commanded by the VCU or executed by the inverter until
brake assist and steering assist have passed formal pre-movement
verification** — auxiliary power networks, hydraulic/electronic booster
circuits, and steering-assist loops are active soft-start prerequisites, and
their status registers gate the enable. During creep the same channels are
**continuously monitored** for voltage sag / pressure drop. Failed assistance
readiness must **inhibit torque**, and that inhibition is itself a tested
interlock (05M-C2A-010B, RC-306), not an assumed one.

## Bounded fault-injection rule (owner review_63, RC-297) — HARD BLOCK

**Random live hardware fault creation or uncontrolled wiring disconnection
while the vehicle is moving is strictly forbidden.** Any fault-response
verification uses **a pre-approved, supplier-supported, or
simulation-controlled fault-injection method** to introduce a bounded,
predictable tracking error during restricted creep. The Build Engine must never
imply ad-hoc live fault creation on a moving vehicle.

## Authority (carried from 05M-C1, RC-247/265/282)

The inverter owns its gating; the BMS/PDU owns contactors/pre-charge; the
**hardwired loop + service brakes own the stopping/interruption path**; the VCU
requests/monitors + enforces the clamp. **Wheel-speed data stays read-only —
never traction-control authority without Ford-authorized docs + engineering
review (RC-282).** CAN_1 stays listen-only/passive (RC-172/230).

---

## Gate 05M-C2A — Flat-Ground Restricted Creep (verification matrix)

All values `INITIAL_TARGET_PROFILE` (RC-267/284). The RC-283 predictable-traction
surface and the RC-285 Ground Movement Precondition hold for every test.

| Test | Element | Procedure | Target (INITIAL_TARGET_PROFILE) | Expected safe output | Blocked (MUST NEVER OCCUR) |
|---|---|---|---|---|---|
| 05M-C2A-001 | static brake-hold | service brakes fully applied; shift to Drive; apply minor torque (≤10 Nm target) | wheel-speed + hub placement tracked | **vehicle displacement remains below the approved measurement threshold during the brake-hold torque request (owner review_61, RC-296 — measurable via wheel-speed / hub marker / video / external position sensor, not "completely hold static")** | displacement above the approved threshold / brake slippage |
| 05M-C2A-002 | pedal dead-band (dual-channel plausibility) | sweep APPS 0–5% travel; check both channels | **torque request stays within the supplier-defined zero-torque threshold (RC-288); zero-torque eligibility requires both APPS channels within idle range + correlation within tolerance + no stuck-high/implausible transition + idle-stabilization time + brake/steering preconditions valid (RC-302) — a normalized % alone cannot authorize torque** | no torque below the dead-band; a channel-disagreement fault inhibits torque | torque produced within the dead-band / single-channel % authorizing torque (RC-302) |
| 05M-C2A-003 | forward creep + breakaway map | **enforce the brake + steering pre-movement interlock first (RC-298);** release brake; allow a tiny forward creep step (≤1 m target) | **map the actual breakaway-torque baseline (15–25 Nm is an EXPECTED range, not a pass envelope — RC-294; may be too light for an F-450/F-550 given gearing / tire load / brake drag / axle ratio / grade / tire pressure)** | **driveline overcomes static friction smoothly; vehicle crawls forward within approved creep-speed, torque, and runout limits (owner review_61, RC-295 — not "absolute control")** | surging / hopping / accelerating past crawl; **breakaway outside the initial expected range → NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not automatic failure (RC-294/287)** |
| 05M-C2A-004 | reverse creep | **enforce the brake + steering pre-movement interlock first (RC-298);** stop; shift to Reverse; tiny reverse creep step (≤1 m target) | verify direction params + rearward breakaway consistency | smooth reverse crawl; matching directional velocity logged within approved limits | erratic reverse acceleration / direction mismatch vs command |
| 05M-C2A-005 | accelerator-map / Restricted Creep Torque Clamp | step the pedal past 50% travel for <500 ms | VCU command limits + inverter current tracked | torque + scaling stay software-limited below the ≤30 Nm restricted-creep target (RC-301) | **torque/current exceeding the approved restricted-creep torque limit (RC-301, not "the hard safety clamp")** |
| 05M-C2A-006 | torque ramp-rate vs current response (`dT_command/dt`) | step the pedal rapidly 0→20% travel | **VCU commanded torque stays within the approved `dT_command/dt` envelope (≤20 Nm/sec target), not raw pedal slope (RC-284); measured inverter torque feedback + phase-current response stay within the supplier-approved tracking envelope for that command profile — torque slope and current slope are related but NOT identical (RC-303)** | commanded torque rises within the envelope; torque feedback + current track within the supplier envelope; no step-functions | commanded slope, reported torque slope, phase-current rise/decay, DC-bus current, and vehicle acceleration all logged; sudden unfiltered current spikes / un-attenuated torque steps |
| 05M-C2A-007 | brake override during creep | while crawling forward, firmly depress the service brake | **VCU clears traction torque within the approved brake-override response window (RC-281/288)** | phase current decays within the approved threshold; brakes stop the vehicle without the inverter fighting them | inverter pushing drive current against the friction brakes |
| 05M-C2A-008 | E-stop during creep | at steady creep, actuate the hardwired/remote E-stop | hardwired loop interrupts coil supply within the engineering-approved window | **inverter torque command → zero + phase current decays within the supplier-approved response window (RC-288, not "instantly"); HV bus drops; vehicle coasts or is braked manually per test plan** | inverter continues actively driving / any automatic retry after E-stop (RC-262) |
| 05M-C2A-009 | shifter-neutral interrupt | at steady forward creep, shift PRND → Neutral | VCU revokes the inverter enable/torque bit over the control bus | inverter → standby/disabled within the response window; torque → 0 Nm | inverter maintaining torque / bridge switching in Neutral |
| 05M-C2A-010 | wheel-speed / motor parity | log wheel-speed (read-only, RC-282) vs resolver velocity across crawl cycles | parity within the ≤5% target window | parity bit valid; no mismatches | mismatch beyond the tolerance / wheel-speed used as control authority (RC-282) |
| 05M-C2A-011 | steering / brake assist — pre-movement interlock + monitored check | cycle the steering wheel + check booster pressures **before movement (interlock, RC-298)**, then continuously monitor during creep | **no creep torque may be commanded until brake assist + steering assist pass pre-movement verification (RC-298);** 12 V aux nets hold power to those nodes | **steering and braking assist remain within approved pressure, voltage, and response thresholds (owner review_61, RC-295 — not "completely active")** | heavy steering / diminished braking from a 12 V brownout, voltage sag, or pressure drop |
| 05M-C2A-011B | assistance-interlock inhibition (prove the block) | via an approved bounded simulation / low-voltage method, assert brake-assist-not-ready · steering-assist-not-ready · aux-voltage-below-approved-window (RC-306) | VCU torque-inhibit path exercised against each invalid assistance-ready state | **VCU remains torque-inhibited and records the specific blocking reason (RC-306)** — the prerequisite is a tested interlock, not an assumption | **any traction enable while a required assistance-ready state is invalid** |
| 05M-C2A-012 | CAN_1 electrical passivity | continuous bus audit of CAN_1 across all creep blocks | **prove electrical passivity, not "zero errors" (RC-304)** | **instrumentation produces no dominant-bit transmission, acknowledgement, error flag, wake request, diagnostic request, or other active influence on CAN_1; any observed OEM network errors are separately logged and attributed — their mere presence does not prove instrumentation transmission (RC-304)** | any dominant-bit tx / ACK / error flag / wake / diagnostic request / active influence onto the production CAN_1 bus |

## Gate 05M-C2B — Controlled Incline / Rollback Hold Validation (deferred subgate)

**PROVISIONAL — unlocks only after 05M-C2A reaches `SIGNED_PASS` (RC-286/299).**
Do flat-ground creep first. 05M-C2B covers: tiny incline only · rollback
threshold · brake hold · anti-rollback response (stabilise within the
supplier-defined limit, no high-torque surge) · no surge correction · manual
brake recovery. The Hunter's rollback-prevention row (release brake on a <2°
incline) lives here, not in the first ground-contact gate; its pre-movement
brake + steering interlock (RC-298) still applies.

**C2B Rollback Containment Rule (owner review_63, RC-305) — HARD BLOCK.**
Before any service-brake release on an incline, **all** of the following must
hold: **the downhill runout zone is clear · an independent secondary restraint
or capture method is available · the remote E-stop is active · the driver is
ready to reapply the service brake · a maximum permitted rollback distance is
defined · a maximum hold duration is defined · thermal limits are defined · and
traction torque is NOT relied on as the sole parking restraint.** **Temporary
hill-hold assistance and a parking-hold function are NOT the same (RC-305):**
the traction system must not become a substitute for a mechanical parking brake
unless it is formally designed and approved for that role
(`PARKING_HOLD_AUTHORITY_NOT_GRANTED`, `TEMPORARY_HILL_HOLD_ONLY`).

## Gate 05M-C2C — Faulted Creep Recovery (subgate)

Covers: failed creep event · fault latch into NVM · **service-clear blocked
while the fault is active (RC-163/206)** · power-cycle recovery · **no
automatic re-drive / no autonomous creep retry after a trip.** The fault-latch
row lives here. **The bounded fault-injection rule (owner review_63, RC-297)
governs how the fault is created: a pre-approved, supplier-supported, or
simulation-controlled method only — never ad-hoc live hardware fault creation
or wiring disconnection on a moving vehicle.** **A hard reset alone must NOT
clear a motion-related fault (owner review_59, RC-290): re-energization or
creep retries stay blocked until diagnostic review + fault-source correction +
approved service clear + engineering/test-lead authorization.**

## Gate 05M-C2 exit criteria (owner review_58)

The system cannot exit Gate 05M-C2 (and proceed to Gate 05M-C3) unless:

1. Static brake-holds and bidirectional flat-ground creep are mapped by
   **measuring the actual breakaway-torque baseline (owner review_61, RC-294)** —
   15–25 Nm is an EXPECTED range, not a final pass envelope (it may be too light
   for an F-450/F-550); values outside the initial expected range trigger
   NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not automatic failure (RC-294/287).
   Static brake-hold displacement stays below the approved measurement
   threshold (RC-296).
2. The APPS dead-band, the ≤30 Nm clamp, and the `dT_command/dt` ≤20 Nm/sec
   ramp-rate are validated under real vehicle inertia (targets only, RC-284).
3. Brake-override, shifter-neutral, and remote/hardwired E-stop loops drop
   torque **within the approved response windows with zero automatic retries**
   (RC-288/262).
4. Anti-rollback (05M-C2B) and wheel-speed/resolver parity (≤5% target) hold
   under tire-to-surface loading — wheel-speed as verification, not control
   (RC-282).
5. Steering + braking auxiliary power hold stable across all blocks (the
   Ground Movement Precondition, RC-285).
6. CAN_1 stays **electrically passive** — no dominant-bit tx / ACK / error flag
   / wake / diagnostic request / active influence; observed OEM errors logged +
   attributed, not attributed to instrumentation (RC-304).
7. Control-loop faults latch into NVM, blocking autonomous retries / unvalidated
   re-power (05M-C2C, RC-163/206); the fault is created only by a pre-approved /
   supplier-supported / simulation-controlled method (RC-297).
8. Control-loop faults latch into NVM and stay blocked until diagnostic review
   + fault-source correction + approved service clear + engineering/test-lead
   authorization — a hard reset alone does not clear a motion fault (RC-290).
9. The brake + steering pre-movement interlock is **proven** (05M-C2A-011B):
   failed assistance readiness inhibits torque and records the blocking reason
   (RC-298/306); the C2B Rollback Containment Rule is satisfied before any
   incline brake-release (RC-305).
10. Every row's four-field record (Required Approver / Procedure Approval /
    Execution / Result Signoff) is complete, and all timestamped CAN logs,
    parity traces, torque-slope + current-response graphs, video records, and
    discipline signoffs are archived (RC-289/299). No `SIGNED_PASS` exists until
    the row is `EXECUTED` (`NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`).

**Successful Gate 05M-C2 completion permits engineering review for Gate 05M-C3
only** (Controlled Closed-Area Low-Speed Movement). It does **not** authorize
normal driving · public-road operation · customer operation · higher speeds.
**It does NOT automatically "unlock 15 km/h" (owner review_59, RC-291) — any
speed ceiling in Gate 05M-C3 remains `INITIAL_TARGET_PROFILE` until
engineering-approved.** (Never "certified safe," RC-224.)

## Standing checks

- **First powered ground contact, restricted creep only, flat predictable-
  traction closed surface (not low-friction, RC-283), remote E-stop + spotters,
  no public road / no customer / no normal-driving authority** (owner
  review_58). The Ground Movement Precondition (RC-285) gates every creep
  command; torque is heavily clamped (≤30 Nm target) and ramp-limited
  (`dT_command/dt` ≤20 Nm/sec, RC-284); rollback/incline deferred to 05M-C2B
  (RC-286); breakaway above the clamp → NEEDS_REVIEW, not an auto diagnosis
  (RC-287); no "absolute zero"/"instant" wording — supplier response/tolerance
  windows (RC-288); wheel-speed read-only (RC-282); CAN_1 listen-only
  (RC-172/230); no automatic retry after an E-stop (RC-262); every number is
  INITIAL_TARGET_PROFILE (RC-267); the inverter owns gating, the BMS/PDU owns
  contactors/pre-charge, the hardwired loop + service brakes own the stopping
  path, the VCU requests/monitors + enforces the clamp (RC-247/265/205/227;
  BQ-27); never "certified safe" (RC-224).
- **Pre-baseline cleanups (owner review_61):** the Authority Status column
  names a `Required Approver` with `SIGNOFF_REQUIRED / NOT_EXECUTED` +
  `PENDING_EXECUTION` — never "Approved by" (no test executed yet, RC-292);
  every threshold (0–5% APPS, ≤20 Nm/sec `dT_command/dt`, ≤30 Nm clamp, 15–25
  Nm breakaway, ≤5% parity, ≤10 Nm brake-hold, ≤1 m creep, <2° incline) is
  `INITIAL_TARGET_PROFILE` until sourced (RC-293); 15–25 Nm breakaway is an
  expected range, not a pass envelope — out-of-range → NEEDS_REVIEW, not
  auto-fail (RC-294); measurable thresholds replace "absolute control" /
  "completely active" (RC-295); static brake-hold uses a displacement
  threshold, not "completely hold static" (RC-296).
- **Baseline-candidate cleanups (owner review_63, RC-297..306):** bounded /
  supplier-supported / simulation-controlled fault injection only — never ad-hoc
  live fault creation on a moving vehicle (RC-297); brake + steering assist are a
  pre-movement HARD interlock + monitored during creep (RC-298), and the block is
  itself tested (05M-C2A-011B, RC-306); the approval record is four fields
  (`Required Approver` / `Procedure Approval Status` / `Execution Status` /
  `Result Signoff Status`) so procedure approval ≠ result signoff, a global rule
  (RC-299); the Numeric Threshold Authority Rule links every value to source/calc
  + config + calibrated method + uncertainty + proof + procedure revision +
  signed authorization (RC-300); the clamp is the software `Restricted Creep
  Torque Clamp`, not a "hard/absolute clamp" (RC-301); zero-torque needs
  dual-channel APPS plausibility, not a single % (RC-302); torque-rate and
  phase-current-response are validated separately (RC-303); CAN_1 passivity is
  defined electrically (RC-304); C2B has a Rollback Containment Rule and
  hill-hold ≠ parking-hold (RC-305). Gate pair labels
  `GATE_05M_C2A_C2B_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — a procedure
  baseline, not physical-pass evidence.
- **Nothing ingested; nothing Confirmed; no normal driving; no public road; no
  customer operation; no "certified safe"/compliance claim; ODRs untouched.**

## Next — Gate 05M-C3 (Controlled Closed-Area Low-Speed Movement)

Owner review_58: only after 05M-C2 (05M-C2A flat-ground creep, then 05M-C2B
incline/rollback, then 05M-C2C faulted-creep recovery) is proven, Gate 05M-C3 is
the **controlled closed-area low-speed movement** gate (the Hunter's "track-
surface speeds up to 15 km/h" is an `INITIAL_TARGET_PROFILE` pending supplier +
engineering approval, RC-267). Still engineer-gated, closed-area only, no public
road / no customer operation. Its scope is defined when the owner sends that
batch.
