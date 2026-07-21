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

**Status (owner review_58): `FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE` /
`LIVE_HV_PRESENT` / `GROUND_CONTACT_PRESENT` / `RESTRICTED_CREEP_ONLY` /
`PREDICTABLE_TRACTION_SURFACE_REQUIRED` / `REMOTE_ESTOP_REQUIRED` /
`SPOTTERS_REQUIRED` / `BRAKE_ASSIST_VERIFICATION_REQUIRED` /
`STEERING_ASSIST_VERIFICATION_REQUIRED` / `TORQUE_CLAMP_INITIAL_TARGET_ONLY` /
`RAMP_RATE_INITIAL_TARGET_ONLY` / `NO_PUBLIC_ROAD` / `NO_CUSTOMER_OPERATION` /
`NO_NORMAL_DRIVING_AUTHORITY`.** Ladder: **… → 05M-C1 (coupled, wheels lifted)
→ 05M-C2 (THIS GATE — first ground contact; 05M-C2A → 05M-C2B → 05M-C2C) →
05M-C3 (controlled closed-area low-speed movement)** (D-008, amended review_58).

## Numeric Threshold Authority Rule (RC-267/RC-284) — read first

**All numeric values in Gate 05M-C2 are `INITIAL_TARGET_PROFILE` unless
upgraded to `SUPPLIER_DEFINED` or `ENGINEERING_APPROVED`** with supplier
documentation + engineering review + calibrated measurement method + raw proof
artifact + signed approval: the 0–5% APPS dead-band, the **`dT_command/dt` ≤20
Nm/sec torque ramp-rate (RC-284 — torque ramp rate `dT/dt`, NOT charge/heat
`dQ/dt`)**, the ≤30 Nm creep clamp, the 15–25 Nm breakaway expectation, the
≤5% wheel-speed parity, the 2 km/h slip / 3 km/h creep / <2° incline. No value
creates gate authority until sourced.

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

## Torque ramp-rate & clamp doctrine (owner review_58, RC-284)

Rapid APPS input is permitted **only as a controlled test input.** The VCU
torque output must rise **per the approved ramp-rate limiter
(`dT_command/dt`), not raw pedal slope.** The absolute creep torque clamp
(≤30 Nm target) and the ≤20 Nm/sec ramp-rate are `INITIAL_TARGET_PROFILE`.

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
| 05M-C2A-001 | static brake-hold | service brakes fully applied; shift to Drive; apply minor torque (≤10 Nm target) | wheel-speed + hub placement tracked | mechanical service brakes hold the vehicle static against the request | any tire creep / rollout / brake slippage |
| 05M-C2A-002 | pedal dead-band | sweep APPS 0–5% travel | **torque request stays within the supplier-defined zero-torque threshold (RC-288, not "absolute 0 Nm")** | no torque below the dead-band | torque produced within the dead-band |
| 05M-C2A-003 | forward creep + breakaway map | release brake; allow a tiny forward creep step (≤1 m target) | measure breakaway-torque baseline (15–25 Nm target) | driveline overcomes static friction smoothly; crawls under control | surging / hopping / accelerating past crawl; **breakaway above the approved clamp → NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not an auto "binding" diagnosis (RC-287)** |
| 05M-C2A-004 | reverse creep | stop; shift to Reverse; tiny reverse creep step (≤1 m target) | verify direction params + rearward breakaway consistency | smooth reverse crawl; matching directional velocity logged | erratic reverse acceleration / direction mismatch vs command |
| 05M-C2A-005 | accelerator-map clamp | step the pedal past 50% travel for <500 ms | VCU command limits + inverter current tracked | torque + scaling stay clamped at the ≤30 Nm target | torque/current breaking past the clamp |
| 05M-C2A-006 | torque ramp-rate limit (`dT_command/dt`) | step the pedal rapidly 0→20% travel | **VCU torque output rises per the approved `dT_command/dt` limiter (≤20 Nm/sec target), not raw pedal slope (RC-284)** | current rises slowly + predictably; no step-functions | sudden unfiltered current spikes / un-attenuated torque steps |
| 05M-C2A-007 | brake override during creep | while crawling forward, firmly depress the service brake | **VCU clears traction torque within the approved brake-override response window (RC-281/288)** | phase current decays within the approved threshold; brakes stop the vehicle without the inverter fighting them | inverter pushing drive current against the friction brakes |
| 05M-C2A-008 | E-stop during creep | at steady creep, actuate the hardwired/remote E-stop | hardwired loop interrupts coil supply within the engineering-approved window | **inverter torque command → zero + phase current decays within the supplier-approved response window (RC-288, not "instantly"); HV bus drops; vehicle coasts or is braked manually per test plan** | inverter continues actively driving / any automatic retry after E-stop (RC-262) |
| 05M-C2A-009 | shifter-neutral interrupt | at steady forward creep, shift PRND → Neutral | VCU revokes the inverter enable/torque bit over the control bus | inverter → standby/disabled within the response window; torque → 0 Nm | inverter maintaining torque / bridge switching in Neutral |
| 05M-C2A-010 | wheel-speed / motor parity | log wheel-speed (read-only, RC-282) vs resolver velocity across crawl cycles | parity within the ≤5% target window | parity bit valid; no mismatches | mismatch beyond the tolerance / wheel-speed used as control authority (RC-282) |
| 05M-C2A-011 | steering / brake assist | cycle the steering wheel + check booster pressures before/during crawl | 12 V aux nets hold power to steering/brake assist nodes | full steering + braking assist active throughout | heavy steering / diminished braking from a 12 V brownout |
| 05M-C2A-012 | CAN_1 passive integrity | continuous bus audit of CAN_1 across all creep blocks | the instrumentation node transmits zero frames onto CAN_1 | CAN_1 strictly listen-only/passive; zero injected frames/errors | any active frame / error onto the production CAN_1 bus |

## Gate 05M-C2B — Controlled Incline / Rollback Hold Validation (deferred subgate)

**PROVISIONAL — only after 05M-C2A flat-ground creep has passed (RC-286).** Do
flat-ground creep first. 05M-C2B covers: tiny incline only · rollback threshold
· brake hold · anti-rollback response (stabilise within the supplier-defined
limit, no high-torque surge) · no surge correction · manual brake recovery. The
Hunter's 05M-C2-009 rollback-prevention row (release brake on a <2° incline)
lives here, not in the first ground-contact gate.

## Gate 05M-C2C — Faulted Creep Recovery (subgate)

Covers: failed creep event · fault latch into NVM · **service-clear blocked
while the fault is active (RC-163/206)** · power-cycle recovery · **no
automatic re-drive / no autonomous creep retry after a trip.** The Hunter's
05M-C2-013 fault-latch row lives here.

## Gate 05M-C2 exit criteria (owner review_58)

The system cannot exit Gate 05M-C2 (and proceed to Gate 05M-C3) unless:

1. Static brake-holds and bidirectional flat-ground creep are mapped, with
   controlled forward/reverse steps within the breakaway envelope (15–25 Nm
   target, RC-267).
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
6. CAN_1 stays strictly passive with zero injected frames (RC-172/230).
7. Control-loop faults latch into NVM, blocking autonomous retries / unvalidated
   re-power (05M-C2C, RC-163/206).
8. All timestamped CAN logs, parity traces, current-ramp graphs, and engineer
   signoffs are archived.

**Successful Gate 05M-C2 completion permits engineering review for Gate 05M-C3
only** (Controlled Closed-Area Low-Speed Movement). It does **not** authorize
normal driving · public-road operation · customer operation · higher speeds.
(Never "certified safe," RC-224.)

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
