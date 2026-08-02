# Research Hunter — batch 62 (owner label "60:60")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, equations, and numeric
values are Hunter-supplied and unverified against any source document. The
owner framing that preceded this payload and the owner's verdict that followed
it are archived at `../owner_reviews/review_59_batch_62_verdict.md`.

> **Regression note (not part of the raw payload):** this Hunter re-emit of
> Gate 05M-C2 REGRESSED on nearly every previously-corrected item at once —
> it defaults to a "low-friction surface" (RC-283), uses `dQ/dt` (RC-284),
> "absolute 0 Nm" (RC-288), "immediate stop" (RC-288), rollback in the first
> gate (RC-286), and the owner notes the 05M-C1 "hand-lock one lifted wheel"
> line (RC-279) is still present. It is preserved 1:1 here as evidence; the
> deliverable `GATE05M_C2_RESTRICTED_CREEP.md` already holds the corrected
> wording and is NOT regressed.

---

## Gate 05M-C2 — Restricted Creep Torque Validation

This gate governs the critical transition where the vehicle tires touch the ground for the first time under high-voltage traction power. All testing must occur on a flat, unobstructed, low-friction surface (e.g., polished concrete or smooth epoxy test-bay floors) to minimize initial tire-to-ground binding loads.

The focus of Gate 05M-C2 is to safely map the real-world physical breakaway characteristics of the vehicle chassis, validate the pedal dead-band software logic, and enforce aggressive torque ramp filters (dQ/dt) to guarantee that the vehicle cannot experience unintended or rapid acceleration during its initial ground-level rollout.

```
                    [GATE 05M-C2 GROUND-CONTACT BOUNDARY]
          (Tires on Flat, Low-Friction Floor - Low-Speed Crawl)
                                     │
      ┌──────────────────────────────┼──────────────────────────────┐
      ▼                              ▼                              ▼
[Pedal Dead-Band Logic]     [Breakaway & Ramp Filters]     [Rollback & Safe Abort]
- 0% to 5% travel = 0 Nm    - Limit dQ/dt to 20 Nm/sec     - Verify anti-rollback lock
- Handle sensor noise/drift - Clamp max creep at 30 Nm     - Confirm immediate E-stop drop
```

### 1. Control Domain & Calibration Parameters

- Pedal Travel Dead-Band Layer: The driver accelerator pedal position sensor (APPS) must apply a strict 0% to 5% travel dead-band. Any signal noise, voltage drift, or travel below 5% must map to an absolute 0 Nm torque command. Torque generation must scale linearly only after passing the 5% threshold.
- Aggressive Torque Ramp-Rate Filters (dQ/dt): The VCU torque command rate-limiter is throttled to a maximum derivative cap of 20 Nm/sec. Rapid pedal changes are heavily dampened by this filter to maintain slow, predictable chassis movement.
- Absolute Creep Torque Clamp: The maximum allowable torque request during this phase is hard-clamped at 30 Nm (or the minimal calculated torque required to overcome static vehicle inertia + 10%).

### 2. Physical Breakaway & Rollout Parameters

- Breakaway Torque Window: The torque level required to initiate physical tire rotation from a dead stop must be carefully monitored. For standard passenger/light commercial validation platforms, this target is typically expected between 15 Nm and 25 Nm.
- Low-Friction Target Slip: The wheel-speed sensors are cross-checked against the motor resolver at a millisecond rate. If wheel slip exceeds 2 km/h relative to calculated chassis speed, the VCU must immediately throttle back the creep torque request to maintain traction balance.

### Verification Matrix: Gate 05M-C2

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05M-C2-001 | Accelerator Pedal Dead-Band Verification | Slow press APPS from 0% to 4.9%. Monitor the VCU Torque_Request output register over CAN. | Torque request must remain at absolute 0 Nm throughout the dead-band zone. | No bridge switching occurs; phase currents remain within the zero-current threshold. | Any torque-producing current or shaft twitch below 5% pedal travel. | Time-aligned CAN log tracking APPS percentage vs. motor phase current. |
| 05M-C2-002 | Breakaway Torque Mapping & Rollout | Step pedal past 5% to slowly command torque up to the 30 Nm limit until the vehicle moves. | Record the exact torque value where the wheel speed sensors transition from 0 km/h to active tracking. | Driveline overcomes static friction smoothly; vehicle transitions into a controlled, low-speed crawl. | • Vehicle surging or jumping forward abruptly • Breakaway torque requirement >30 Nm (indicates mechanical binding) | CAN log tracking Torque_Request vs. wheel speed sensor transition. |
| 05M-C2-003 | Torque Ramp-Rate (dQ/dt) Sanity Check | Rapidly depress the accelerator pedal from 0% to 50% travel within <100 ms. | Measure the slope of the resulting inverter torque tracking curve over CAN. | The torque rise profile must track a linear slope restricted entirely by the ≤ 20 Nm/sec filter cap. | Inverter tracking an un-attenuated, steep torque step command. | High-resolution CAN data graph showing torque command derivative over time. |
| 05M-C2-004 | Low-Speed Rollback & Active Hold Checks | Bring the vehicle to a stop on a minor test-bay incline (<2°). Release the service brake pedal. | The vehicle control logic must manage rollback tendencies within supplier-defined limits before stabilizing. | Anti-rollback or low-speed creep holds the vehicle stationary or transitions smoothly to crawl without rolling backwards. | • Free-rolling backwards unmitigated down the incline • Sudden high-torque spikes to counter rollback | Wheel speed encoder direction bits synced with VCU state machine logs. |
| 05M-C2-005 | Low-Speed Dynamic Safety Abort | While the vehicle is crawling at its restricted creep speed (≈ 3 km/h), press the physical E-stop. | The hardwired safety loop must drop out the main HV contactors within the supplier-defined window. | Inverter torque drops to zero instantly; the vehicle coasts to a stop or is braked manually. | • Inverter continues actively driving the motor wheels • Phase current persists past the approved decay window | Scope trace tracking E-stop circuit drop vs. phase current decay under load. |

### Gate 05M-C2 Exit Criteria

The system cannot exit Gate 05M-C2 and proceed to Gate 05M-C3 (Controlled Closed-Area Low-Speed Movement) unless:

- The APPS 0% to 5% travel dead-band is completely stable, reliably blocking any torque generation from sensor drift or minor foot placement.
- The physical breakaway torque baseline of the chassis is fully mapped, proving that the vehicle can initiate movement well under the defensive 30 Nm clamp.
- The 20 Nm/sec torque ramp-rate filter successfully dampens rapid pedal inputs, preventing unexpected power step-functions.
- Low-speed safety mechanisms (anti-rollback tracking and the hardwired emergency stop loop) demonstrate positive control under active ground rolling conditions.
- All ground-roll data logs, derivative filter calculations, sensor slip metrics, and engineering validation signatures are permanently archived in the Build Engine.

Crucial Engineering Authorization: Successful Gate 05M-C2 completion satisfies the initial ground-contact and low-speed crawl milestones. It officially permits signed engineering authorization to proceed to Gate 05M-C3 (Controlled Closed-Area Low-Speed Movement), unlocking track-surface speeds up to 15 km/h.
