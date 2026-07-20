# CONTROLLED HV FIRST-ENERGIZATION / CURRENT-LIMITED PRE-CHARGE OBSERVATION (Gate 05L-B)

The energization rung of the split Gate 05L in the staged post-bench gate
ladder (Decision Register D-008, amended review_51/52) for the F-450/F-550 EV
conversion (Gate 05L-B, batch_55 + owner review_52). Gate 05L-B is the **first
gate with LIVE HV PRESENT** — the first physical LOTO-pin removal, MSD connect,
and software-controlled current-limited pre-charge closure. It is attempted
**only after a signed engineering authorization out of Gate 05L-A**, and is
**purely observational: NO inverter switching · ZERO motor RPM · no vehicle
movement.** It analyzes the DC-link capacitor voltage-rise curve, verifies
contactor control synchronisation, and validates weld-detection — nothing more.

**Status (owner review_52): `DRAFT_CREATED` / `LIVE_HV_PRESENT` /
`QUALIFIED_PERSONNEL_REQUIRED` / `SUPPLIER_PRECHARGE_DATA_REQUIRED` /
`CONTACTOR_SEQUENCE_PENDING_SUPPLIER_ARCHITECTURE` /
`VCU_AUTHORITY_REQUESTER_ONLY_UNLESS_DOCUMENTED` / `NO_INVERTER_SWITCHING` /
`ZERO_MOTOR_RPM` / `NO_VEHICLE_MOVEMENT` / `NO_ROAD_TEST` /
`NO_TRACTION_COMMAND` / `TIMING_THRESHOLDS_TARGET_ONLY` /
`ENGINEERING_REVIEW_REQUIRED`.** Ladder: **05J → 05K → 05L-A (authorization) →
05L-B (THIS GATE — first live HV, pre-charge observation only) → 05L-C
(controlled HV shutdown/discharge/re-energization repeatability) → (later) 05M
(traction inverter / low-speed spin, NOT before 05L-C)** (D-008, amended
review_52).

## Blocking prerequisites — 05L-B stays BLOCKED without these (owner review_52)

- **Signed Gate 05L-A authorization** (personnel/PPE/LOTO/AVV/IMD/E-stop/
  supplier docs, `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md`).
- **Current-limit definition (RC-248, `SUPPLIER_DEFINED / ENGINEERING_APPROVED`):**
  pre-charge resistor resistance · resistor pulse-energy rating · DC-link
  capacitance · pack max voltage · expected peak pre-charge current · resistor
  temperature / thermal-recovery interval · pre-charge retry limit. Without
  these the "current-limited" title is unbacked and the gate does not run.
- **Supplier pre-charge / contactor / BMS-PDU architecture** (contactor
  sequence + ownership, RC-246/247; BQ-27).

## Value doctrine (owner review_52, RC-245) — read first

Every threshold here is an **`INITIAL_BENCH_TARGET / SUPPLIER_DATA_PENDING /
ENGINEERING_REVIEW_REQUIRED`** input, **not final gate logic** (sixteenth
artifact of the invented-values family): ≥95% pre-charge completion, ≤500 ms
pre-charge timeout, ≤50 ms contactor-feedback mirror, ≤60 V discharge target,
≤5% ΔV before main-positive closure. The operative rule is **"V_caps reaches
the supplier-defined pre-charge completion threshold within the supplier-
defined timeout; V_caps near pack voltage with acceptable ΔV before main-
positive closure."** Final thresholds pend supplier pre-charge documentation +
contactor datasheet + inverter DC-link capacitance + BMS/PDU control manual +
engineering review. IMD insulation thresholds (candidate 100 Ω/V or 500 Ω/V)
pend the IMD supplier manual + system voltage + engineering review + FMVSS
305 / ISO 6469-3 mapping (RC-251, NeedsExactSource).

## Authority split (owner review_52, RC-246/247) — read second

- **Contactor sequence is supplier-specific, not universal (RC-246):** the
  Build Engine may *model* negative-first · positive-first · pre-charge-first ·
  integrated BDU/PDU-managed topologies, but the **final sequence requires the
  BMS/PDU supplier wiring diagram + controls-engineer approval.** The
  negative-first → pre-charge → main-positive order below is one candidate
  model, not a rule.
- **The VCU does not own contactor/pre-charge closure unless assigned
  (RC-247):** VCU role = **REQUESTER / MONITOR** unless the supplier
  architecture documents direct control authority; the **BMS/PDU is the likely
  owner** of contactor/pre-charge execution; the **hardwired safety loop owns
  the emergency-interruption path** (RC-205/227; BQ-27). Every test below is
  split into request signal / actual owner / feedback signal / measured HV
  response / abort condition.

## Stored-energy rule (owner review_51/52, RC-242 — keep permanently)

After any HV exposure, active contactor closure, or failed energization
attempt, personnel wait the **full supplier-defined passive discharge
interval** before touching/modifying/measuring any internal HV node, then
verify absence of voltage with **Live-Dead-Live** at the target bus nodes
before manual access. Inverter DC-link capacitors hold lethal potential even
after the pack contactors are isolated.

---

## Gate 05L-B verification matrix (LIVE HV — observational only)

All thresholds are `INITIAL_BENCH_TARGET / SUPPLIER_DATA_PENDING` (RC-245).
Ownership per RC-247 (Requester vs Owner vs Hardwired-loop). No inverter
switching; zero motor RPM.

| Test | Scenario | Request → owner | Trigger | Expected safety cascade | Target (INITIAL_BENCH_TARGET) | Blocked (IMMEDIATE ABORT) | Proof |
|---|---|---|---|---|---|---|---|
| 05L-B-001 | main-negative closure | VCU **requests** → BMS/PDU **owns** (per supplier arch, RC-246/247) | power-up command via calibration interface (post 05L-A signoff) | the owning controller closes main-negative per the supplier sequence; poll aux feedback | contactor closes within the supplier-defined window (≤50 ms target); V_caps stays 0.0 V | main-positive closing prematurely / pre-charge engaging out of the supplier order | high-speed CAN log: contactor state bytes vs timing |
| 05L-B-002 | pre-charge inrush & curve audit | VCU requests → BMS/PDU owns | close the pre-charge relay; monitor DC-link via CAN + HV scope | current through the current-limited resistor charges C_link; V_caps rises on a clean RC curve V_caps(t)=V_batt(1−e^(−t/RC)) | V_caps reaches the **supplier-defined completion threshold** (≥95% target) within the **supplier-defined timeout** (≤500 ms target) | flat-line (0 V rise) / instantaneous spike (0 ms short-circuit) | HV differential scope capture of the DC-link rise |
| 05L-B-003 | delta-V threshold validation | VCU requests → BMS/PDU owns | allow V_caps to reach the matching boundary (≤5% ΔV target) | main-positive close request permitted **only after** the ΔV criterion is met | main-positive requested only after ΔV ≤ (supplier/target) | main-positive closing when ΔV above target (arcing/pitting risk) | time-correlated trace of V_batt, V_caps, main-positive command |
| 05L-B-004 | pre-charge timeout protection | VCU requests → BMS/PDU owns; hardwired loop backstops | inject mock bleed resistance so V_caps cannot reach the target | the owning controller detects the timeout exceeded without the delta match | pre-charge relay opens at the supplier-defined limit (≤500 ms target); main-positive blocked; fault latched | pre-charge loop energised indefinitely (resistor thermal burnout) | CAN error trace: pre-charge timeout DTC |
| 05L-B-005 | contactor weld-fault simulation | VCU monitors; BMS/PDU owns pre-flight logic | short an aux feedback loop; assert logic-high on main-positive feedback before power-up | pre-flight all-open check detects the state mismatch, refuses to cycle control lines, latches a weld fault | all contactor drive commands blocked from going high; drive lines stay 0.0 V | power-up proceeding with an active weld feedback fault | UDS fault-register printout: contactor-weld DTC |
| 05L-B-006 | passive stored-energy discharge | BMS/PDU owns contactor open; passive bleeder decays | emergency software shutdown or ignition OFF from the energized observational state | main contactors open cleanly; C_link energy passively bleeds; stored-energy wait (RC-242) applies before access | DC bus below the **supplier-defined discharge window** (≤60 V target) within the supplier time budget | bus staying high (>60 V target) beyond the approved budget with no warning | continuous scope capture of voltage decay vs time |
| 05L-B-007 | **manual abort during pre-charge (owner review_52, RC-249)** | human → **hardwired safety loop owns** the interruption; VCU logs; BMS/PDU → safe state | **press E-stop during pre-charge observation** | the hardwired loop interrupts the contactor/pre-charge control path; the VCU logs the abort if still powered; the BMS/PDU transitions to its supplier-defined safe state; **no automatic retry** | control-line drop within the hardwired-loop response (measured latency, RC-175); no auto-restart | E-stop does not interrupt the control path / any automatic retry | scope trace of control-line drop + CAN log + HV bus decay + E-stop event timestamp |

## Gate 05L-B exit criteria (owner review_52)

The system cannot exit Gate 05L-B unless:

1. The pre-charge voltage-rise curve conforms to the expected RC timeline (no
   erratic steps, no instantaneous zero-resistance jumps), measured against
   the supplier-defined completion threshold + timeout (targets only, RC-245).
2. The main-positive contactor request is locked out until the ΔV criterion is
   satisfied, per the supplier-defined sequence (RC-246).
3. The pre-charge timeout reliably aborts, isolates the pack, and latches a
   safe restart on failure — with the current-limit definition in place
   (RC-248).
4. Contactor weld-detection stops power-up when feedback lines are unaligned.
5. The passive stored-energy discharge window is mapped, scope-verified, and
   matches the supplier-defined parameters (RC-242).
6. The **manual E-stop abort path** is proven (RC-249) — the hardwired loop
   interrupts, no automatic retry.
7. All raw data logs, HV scope captures, delta verifications, and engineer
   signoffs are archived.

**Successful Gate 05L-B completion permits Gate 05L-C only** (Controlled HV
Shutdown, Discharge, and Re-Energization Repeatability). It does **not**
authorize motor spin · inverter switching · traction command · vehicle
movement · chassis dyno · road testing · customer operation. (Never "certified
safe," RC-224.)

## Standing checks

- **LIVE HV present — engineer-gated, observational only:** no inverter
  switching, zero motor RPM, no vehicle movement, no traction command (owner
  review_52). No threshold (95% / 500 ms / 50 ms / 60 V / 5% ΔV) is final gate
  logic until supplier docs + engineering review upgrade it (RC-245); the
  current-limit definition must be on file first (RC-248); the contactor
  sequence is supplier-specific (RC-246); the **VCU requests/monitors but does
  not own contactor/pre-charge closure** unless the supplier architecture
  assigns it — the BMS/PDU likely owns execution, the hardwired loop owns
  emergency interruption (RC-247/205/227; BQ-27); the stored-energy discharge
  wait guards DC-link caps (RC-242); IMD thresholds are supplier/standard-
  pending (RC-243/251); the human E-stop abort path is proven with no auto
  retry (RC-249). OSHA/NHTSA/FMVSS 305/ISO 6469-3 citations are
  NeedsExactSource.
- **Nothing ingested; nothing Confirmed; no motor spin; no "certified safe"/
  compliance claim; ODRs untouched.**

## Next — Gate 05L-C (Controlled HV Shutdown, Discharge, and Re-Energization Repeatability)

Owner review_52: do **not** jump to Gate 05M. After first energization, the
next gate proves **normal shutdown · emergency shutdown · stored-energy
discharge · restart lockout · pre-charge retry limits · IMD fault response ·
contactor-feedback consistency · no weld-detection false negatives · repeat-
cycle stability.** Only after Gate 05L-C should inverter enable / motor spin
(Gate 05M) even be considered. Gate 05L-C is engineer-gated, live-HV, still no
motor spin.
