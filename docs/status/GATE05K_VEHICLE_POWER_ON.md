# LOW-VOLTAGE VEHICLE POWER-ON / NO-HV COMMISSIONING (Gate 05K)

The second rung of the staged post-bench gate ladder (Decision Register
D-008) for the F-450/F-550 EV conversion controls (Gate 05K, batch_53 + owner
review_50). Gate 05K is the **first formal power-on** of the conversion
systems inside the physical vehicle chassis, after Gate 05J physical fitment.
**All high-voltage energy storage and distribution units remain mechanically
isolated, locked out, and unpowered via physical LOTO.** It verifies
real-world power-state behaviour, driver inputs, logic feedback loops, and
network synchronisation across the in-chassis low-voltage components — and it
does **not** authorize live HV, real HV contactor closure, traction enable,
vehicle movement, or road testing.

**Status (owner review_50): `LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED` /
`NO_HV_CONNECTED` / `NO_REAL_HV_CONTACTOR_CLOSURE` / `NO_TRACTION_ENABLE` /
`NO_VEHICLE_MOTION` / `CAN_1_PASSIVE_MONITORING_ONLY` /
`IN_CHASSIS_DRIVER_INPUTS_UNDER_TEST` / `IN_CHASSIS_FAULT_LATCH_UNDER_TEST` /
`FORD_DTC_DELTA_REQUIRED` / `NO_ROAD_TEST_AUTHORITY`.** Ladder: **05J
(fitment) → 05K (LV power-on, no-HV) → 05L-A (HV first-energization
authorization & safety readiness) → 05L (HV first-energization,
engineer-approved only)** (D-008, amended review_50).

## Target-value doctrine (owner review_50, RC-235) — read first

Every value below is an **`INITIAL_TARGET_PROFILE / ENGINEERING_REVIEW_REQUIRED
/ NO_HV_AUTHORITY / NO_VEHICLE_MOTION_AUTHORITY`** input, **not a rule**
(fourteenth artifact of the invented-values family): ≤200 ms module wake,
≤500 ms display wake, ≤50 ms UDS response, ≤0.5 V rail drop, ≤5% APPS
channel correlation, ≤100 ms brake override, ≤4.0 mA conversion-added sleep
current, ≤2.0 s sleep transition. None becomes a universal final rule until it
is sourced, measured, reviewed, and tied to the actual hardware.

## Global precondition — CAN_1 strictly listen-only

Every Gate 05K test operates under the active precondition that the CAN_1
transceiver configuration remains **strictly listen-only**, verified via
firmware register checks (zero TX mailboxes, silent/listen-only mode) **and**
physical TXD monitoring (`V_TXD_CAN1 = Vcc`, recessive high, continuously).
The Gate 05J CAN_1 vehicle-connection prerequisites (Gate 05H listen-only
proof + Gate 05I-C silence proof + register dump + TXD scope + Ford
baseline/post-connection scan compare, RC-230) remain in force.

## No real HV contactor closure (owner review_50, RC-236)

Even though the HV battery is disconnected, the system must **not** practice
real contactor actuation at Gate 05K. **All HV contactor coils must remain
disconnected, replaced with approved dummy loads, or verified mechanically
unable to close. No real HV contactor closure is permitted in Gate 05K.**
Contactor drive pins are monitored and must stay at `0.0 V` under every driver
input and illegal-state request.

## Parasitic-draw separation (carried from Gate 05J, RC-231/234)

Sleep current is measured/logged as three separate values —
`OEM_baseline_sleep_current` / `conversion_added_sleep_current` (≤4.0 mA
initial target) / `total_vehicle_sleep_current` — with
`total_vehicle = OEM_baseline + conversion_added`. The ≤4.0 mA target is the
**conversion-added** draw, not the whole truck.

---

## Gate 05K verification matrix (no-HV, in-chassis)

All target values are `INITIAL_TARGET_PROFILE` (RC-235). All tests run with
CAN_1 strictly listen-only and HV under LOTO (no real contactor closure,
RC-236).

| Test | Scenario | Initial state | Trigger | Expected coordinated behaviour | Target (INITIAL_TARGET_PROFILE) | Blocked (MUST NEVER OCCUR) | Proof |
|---|---|---|---|---|---|---|---|
| 05K-001 | ignition-off / quiescent draw | LV harness connected, key removed | measure conversion draw at isolated 12 V block | VCU + peripherals stay in low-power sleep; no bus traffic | `conversion_added_sleep_current` ≤4.0 mA after ≤2.0 s | spurious wakeups / stuck-awake (>4.0 mA) / active CAN frame TX | current-logger trace over 15-min window |
| 05K-002 | accessory state transition | key → ACC | rotate to ACC; monitor VCU + display lines | display inits; VCU checks LV rail limits; non-driving status | display operational ≤500 ms; VCU in basic logic mode | contactor driver pins changing state / spurious error flags | boot time-stamp + CAN analyzer trace |
| 05K-003 | key-on / run awake sequence | key → RUN | rotate ACC → RUN | VCU wakes, inits app loops, wakes CAN_2/CAN_3; display home screen | VCU + display operational ≤200 ms of RUN transition | init delays (>200 ms) / transceiver latch-up | scope capture of IGN pin vs CAN active traffic |
| 05K-004 | CAN_1 passive monitoring | VCU in RUN; OEM Ford running normal cycles | monitor Ford network while VCU awake on CAN_2/CAN_3 | CAN_1 transceiver absolute silent — zero TX / active errors / ACK bits | `V_TXD_CAN1 = Vcc` (recessive) continuously | VCU asserting dominant bits on CAN_1 / dropped Ford packets | scope capture of CAN_1 TXD pin + Ford scan-tool log |
| 05K-005 | isolated network comms | VCU in RUN | audit CAN_2 + CAN_3 background traffic | error-free loops with chassis inverter + BMS logic boards | frame-counter errors + bus timeouts = 0 over 5-min window | bus errors / active error frames / frame drop rate >0% | network error-register statistics log |
| 05K-006 | UDS diagnostic session access | VCU in RUN; diag tool connected | UDS sessions 0x10 / 0x22 / 0x2E for internal chassis params | grants read to configured PIDs / calibration / interlock states | UDS response latency ≤50 ms | app loop slowing / dropping control frames during diagnostics | UDS transaction log capture |
| 05K-007 | HV lockout enforcement | VCU in RUN; shifter → DRIVE | command drive + 50% APPS | VCU rejects drive-enable (HV interlocks open); forces torque 0, blocks contactor drivers | commanded torque strictly 0 Nm; contactor pins 0.0 V (coils disconnected/dummy/mech-blocked, RC-236) | non-zero torque target / contactor lines changing state (>0.5 V) | CAN trace of torque bytes vs physical pin meter read |
| 05K-008 | Ford system error immunity | VCU in RUN; systems running 30 min | full Ford diagnostic scan across all OEM modules | Ford modules show no new U-codes / dropouts / module errors | zero new DTCs vs the Gate 05J baseline scan | any new Ford network fault or module comms warning | post-power-on Ford factory-tool scan report |
| 05K-009 | in-chassis fault-latch behaviour | VCU in RUN; inject LV sensor fault (break an APPS wire) | induce fault → ignition OFF → sleep → ignition RUN | VCU latches fault, displays DTC, holds fault state across the power cycle | fault present on boot; drive pre-conditions blocked | fault clearing / self-resetting on ignition cycle alone | NVM error-log read before + after key cycle |

## Gate 05K exit criteria (owner review_50)

The system cannot exit Gate 05K unless:

1. VCU, display, and low-voltage conversion nodes transition cleanly across
   all power modes (OFF, ACC, RUN) within configured timing windows.
2. Absolute CAN_1 silence is verified via physical TXD scope probes and
   network logs with zero OEM Ford DTC disruptions or U-code side-effects.
3. No HV contactor activity or torque commands are produced under any driver
   input sequence or illegal-state request (real contactor closure blocked,
   RC-236).
4. Conversion-added parasitic draw drops to ≤4.0 mA (initial chassis target)
   within ≤2.0 s of sleep entry.
5. Critical safety-fault latches survive an ignition power cycle without
   clearing or causing state corruption.
6. All diagnostics records, scope captures, vehicle-scan differentials, and
   test-engineer validations are archived.

**Successful Gate 05K completion permits Gate 05L-A only** (HV
First-Energization Authorization & Safety Readiness — the pre-energization
authorization gate). It does **not** authorize live HV connection · real HV
contactor closure · traction enable · vehicle movement · chassis dyno · road
testing · customer operation · compliance claims. (Never "certified safe,"
RC-224.)

## Standing checks

- No HV connected/energized; no real HV contactor closure (coils
  disconnected / dummy loads / mechanically blocked, RC-236); no traction
  enable; no vehicle motion. CAN_1 stays strictly listen-only (register +
  TXD-pin proof, RC-186/216/230); CAN_2/CAN_3 isolated. Parasitic draw
  separated OEM/conversion/total (RC-231/234). No 05K value becomes a rule
  until engineering review + supplier/hardware confirm it
  (RC-235). Every fault defaults toward torque inhibit + restart lockout +
  engineering review, and a fault latch must survive a power cycle
  (RC-179). The VCU requests but does not own HV isolation — the hardwired
  loop owns physical interruption (RC-205/227; BQ-27). UDS service-clear must
  never clear an active physical fault (RC-163/206).
- **Nothing ingested; nothing Confirmed; no "certified safe"/compliance
  claim; ODRs untouched.**

## Next — Gate 05L-A (HV First-Energization Authorization & Safety Readiness)

Owner review_50 (citing OSHA LOTO + NHTSA EV HV-hazard guidance): the Gate
05L rung must **not** open with "exact HV pre-charge timing." Gate 05L begins
with **Gate 05L-A**, a pre-energization authorization gate covering qualified
HV personnel · written test plan · LOTO · PPE + insulated tools · emergency
stop plan · exclusion zone · fire/emergency-response plan · absence-of-voltage
verification · HV connector/cable inspection · isolation-monitor readiness ·
pre-charge ownership confirmation · contactor ownership confirmation · test
instrument calibration · supplier documentation required · hard-stop
conditions · proof artifacts · signoff requirements. **No final pre-charge /
voltage / insulation / contactor timing** is defined unless supplier documents
or engineering review provide them. Hard rules: no vehicle movement · no road
testing · no customer operation · no compliance claim; live HV proceeds only
after engineering signoff + safety-protocol activation. Only after 05L-A does
the actual energization sequence (Gate 05L) get detailed.
