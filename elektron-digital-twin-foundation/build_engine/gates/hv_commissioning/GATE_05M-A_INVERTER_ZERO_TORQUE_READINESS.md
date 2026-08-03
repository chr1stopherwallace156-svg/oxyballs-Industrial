# Gate 05M-A — Inverter Enable Readiness / Zero-Torque Validation

**Status:** `DRAFT_CREATED` — staged after 05L-C; **not** baseline until wording + supplier inverter-state definitions are locked.

**Prerequisite:** Successful Gate **05L-C** exit + engineering review authorization for 05M-A only.

**Next after this gate:** Gate **05M-B** (No-Load Motor Spin Validation) — **do not** enter 05M-B until 05M-A proves live, synchronized, torque-disabled, fault-responsive inverter behavior with **no** unintended current or rotation.

---

## Gate intent (readiness, not spin)

05M-A establishes the safe transition boundary between static high-voltage distribution testing and any dynamic inverter drive operations.

**05M-A proves:**

- inverter boots correctly with live DC bus
- VCU ↔ inverter handshake is aligned
- inverter remains **torque-disabled**
- phase current sensors read within supplier offset limits
- resolver feedback is plausible
- watchdog / heartbeat loss causes **supplier-defined** safe state
- **no** unintended torque, rotation, or current generation occurs

**05M-A does not authorize:**

- intentional motor rotation
- vehicle movement
- driver torque authority
- road testing
- no-load spin (that is **05M-B**)
- controlled low-speed traction (that is **05M-C**)

---

## Status block (required)

```text
Gate 05M-A — Inverter Enable Readiness / Zero-Torque Validation

Status:
DRAFT_CREATED
LIVE_HV_PRESENT
INVERTER_READY_STATE_UNDER_TEST
TORQUE_DISABLED_STATE_REQUIRED
NO_INTENTIONAL_MOTOR_ROTATION
NO_VEHICLE_MOVEMENT
NO_DRIVER_TORQUE_AUTHORITY
SUPPLIER_INVERTER_STATE_DEFINITIONS_REQUIRED
WATCHDOG_TARGETS_PENDING_SUPPLIER_DATA
PHASE_CURRENT_OFFSET_CHECK_REQUIRED
RESOLVER_BASELINE_CHECK_REQUIRED
NO_ROAD_TEST_AUTHORITY
```

---

## Critical rule — do not assume 0% PWM is the safe state

Different inverters define “enabled,” “ready,” “gate enabled,” “torque enabled,” and “PWM active” differently. Some may use switching even at zero torque.

**Therefore Gate 05M-A validates the supplier-defined inverter ready / torque-disabled state.**

Hard constraints for this gate:

- No traction torque command
- No intentional motor rotation
- No vehicle movement
- No driver torque authority
- **No power-stage switching unless** supplier documentation explicitly defines it as part of a safe zero-torque readiness state **and** engineering approves it

Do **not** baseline language that assumes:

- “Enable inverter state to active” implies switching authority
- “0% PWM modulation” is universally the correct safe state
- “0.0 A phase current” without supplier measurement definition and noise floor

Use supplier-defined readiness / torque-disabled / safe-off vocabulary instead.

---

## Architecture layer (conceptual)

```text
[GATE 05M-A ENABLE READINESS LAYER]
(HV Bus Established — TORQUE DISABLED / NO INTENTIONAL ROTATION / 0 RPM expected)
                 │
┌────────────────┼────────────────┐
▼                ▼                ▼
[Handshake]   [Sensor plausibility]   [Zero-torque safeguard]
- VCU ready   - Resolver baseline     - Torque command clamped
- Invert echo - Temp telemetry        - Supplier torque-disabled state
- Timeouts    - Phase current offset  - Confirm no unintended motion
```

---

## 1. Inverter handshake & communications coordination

**State machine alignment:** VCU and inverter control board must maintain strict state alignment over the designated inverter CAN (documented as CAN_2 in draft plans — **confirm network map before execution**). The inverter must not transition into a torque-authorized / gating-enabled drive state unless the VCU transmits the **supplier-defined** enable token / authenticated enable sequence **and** any required hardwired interlock feedback is confirmed closed.

**Network boundary diagnostics:** If the heartbeat or watchdog signal from the VCU drops beyond the **supplier-defined** timeout (INITIAL_TARGET_PROFILE observation: ~50 ms — not baseline), the inverter must enter the **supplier-defined** Safe-Off / torque-disabled safe state and manage gate-driver / enable paths per supplier documentation.

---

## 2. Sensor offsets & zero-torque enforcement

**Phase current sensor calibration:** With the inverter in the approved torque-disabled readiness state, read phase current telemetry and execute the supplier-defined offset zeroing / baseline routine. Offset readings outside supplier limits → initialization error; do not proceed.

**Resolver alignment verification:** Read and log static motor resolver (or position sensor) feedback. Verify plausible, stable baseline without unexplained drift or noise that would invalidate later spin calibration. Exact acceptance bounds = supplier + engineering.

**Zero-torque request verification:** VCU forces commanded torque to **0 Nm** (or supplier equivalent null torque). Inverter must remain in torque-disabled / null-torque tracking per supplier definition. Confirm:

- no unintended motor rotation
- no vehicle movement
- no unexpected phase current generation beyond supplier noise floor
- no transition into driver torque authority

---

## Verification Matrix — Gate 05M-A (DRAFT)

| Test ID | Scenario | Evaluation procedure | Target criteria (INITIAL_TARGET_PROFILE / supplier) | Expected safe output | Blocked states (MUST NEVER OCCUR) | Proof artifact |
|---|---|---|---|---|---|---|
| **05M-A-001** | Inverter power-up handshake | Execute approved HV power-up to live DC bus; request inverter pre-ready / ready-to-handshake per supplier | Inverter transitions through boot states and reports supplier Pre-Ready (or equivalent) on inverter CAN | Handshake bits match; inverter ready for enable token evaluation only | Automatic transition to torque-authorized gating; unexplained boot timeouts | Time-stamped CAN handshake trace |
| **05M-A-002** | Phase current sensor offset check | Query phase current calibration / offset registers in torque-disabled state | Offsets within supplier-defined noise / offset limits | Baselines accepted; offsets nulled per supplier routine | Offset drift beyond supplier limits treated as pass | UDS / calibration register dump |
| **05M-A-003** | Static resolver baseline audit | Monitor resolver position over a defined static window (draft observation: ~5 min) with shaft locked / vehicle static | Angular reading stable within supplier noise / drift limits | Plausible static position baseline | Unexplained drift / noise spikes while shaft locked | Resolver telemetry capture |
| **05M-A-004** | Zero-torque / torque-disabled verification | VCU clamps torque command to 0 Nm (or supplier null); request supplier torque-disabled readiness state only | Inverter remains in supplier-defined torque-disabled / zero-torque readiness state; no intentional rotation | DC bus stable; no unintended phase current beyond noise floor; shaft stationary | Unintended bridge switching outside supplier-approved zero-torque definition; spontaneous shaft movement; driver torque authority | Phase current / command logs; motion observation record |
| **05M-A-005** | Watchdog / heartbeat disruption | Force communication dropout on inverter CAN during Pre-Ready / torque-disabled readiness | Inverter enters supplier-defined Safe-Off within supplier timeout (draft observation: ≤50 ms — not baseline) | Enable loops dropped per supplier; communication-loss DTC / fault logged as required | Holding last known active torque-ready state after bus loss | Scope / timestamp of bus drop vs fault / safe-state transition |

---

## Gate 05M-A Exit Criteria

Cannot exit 05M-A and proceed to **05M-B** unless:

1. Inverter state machine demonstrates synchronization with VCU request protocols on the designated inverter network.
2. Phase current sensor offsets are within supplier specifications and stable at the approved null/baseline.
3. Static resolver (position) telemetry confirms a plausible, noise-bounded baseline suitable for later spin work.
4. Zero-torque / torque-disabled enforcement is proven with **no** unintended torque, rotation, or current generation.
5. Network watchdog / heartbeat loss forces the **supplier-defined** Safe-Off / torque-disabled safe state within the approved timeout.
6. All telemetry, calibrations, handshake logs, and engineering signoffs are archived in the Build Engine.

**Crucial authorization:** Successful 05M-A permits engineering review for **Gate 05M-B — No-Load Motor Spin Validation** only.

---

## Honesty / safety notes

- All numeric values remain **INITIAL_TARGET_PROFILE** until supplier + engineering lock (see `GLOBAL_INITIAL_TARGET_PROFILE.md`).
- Live HV + inverter work remains **qualified-personnel only**; LOTO / energized-work practices apply.
- This document does **not** invent Ford, BMS, PDU, or inverter pinouts, torque maps, or PWM state names.
- Do not treat “0% PWM” or “0.0 A” as universal pass criteria without supplier definitions.
