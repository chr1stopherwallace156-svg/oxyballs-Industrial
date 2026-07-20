# Research Hunter — batch 55 ("54:75")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, equations, and numeric
values are Hunter-supplied and unverified against any source document. The
owner framing that preceded this payload and the owner's verdict that followed
it are archived at `../owner_reviews/review_52_batch_55_verdict.md`.

---

## Gate 05L-A Technical Cleanups & Safety Rule Amendments

The following technical corrections and specific safety constraints are incorporated into the safety readiness phase before defining the actual first-energization execution sequence.

### 1. Stored Energy Discharge Rule

To prevent fatal shock hazards from stored capacitive energy within the system architecture:

- Stored Energy Safety Mandate: After any high-voltage exposure, active contactor closure, or failed energization attempt, personnel must wait the full supplier-defined passive discharge interval before touching, modifying, or measuring any internal high-voltage nodes. Following this wait window, the absolute absence of voltage must be physically verified using the Live-Dead-Live methodology at the target bus nodes prior to manual hardware access. Inverter DC-link capacitors can maintain lethal potential even after the physical battery pack contactors are completely isolated.

### 2. Isolation Resistance Metric Disambiguation

To maintain a legally and technically compliant non-conflated safety layer, insulation monitoring metrics must remain explicitly bounded by external hardware rules:

- The Insulation Monitoring Device (IMD) must report zero active internal hardware errors and verify that the live measured isolation status falls cleanly within the supplier-defined acceptable range.
- Target Engineering Threshold Boundaries: Final insulation resistance thresholds (e.g., 100 Ω/V or 500 Ω/V) remain pending the IMD supplier operational manual, absolute system operating voltage, internal engineering ring review, and applicable safety standard mapping (such as FMVSS 305 or ISO 6469-3).

---

## Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation

This gate governs the first physical removal of high-voltage Lockout/Tagout (LOTO) pins, the physical connection of the manual service disconnects (MSD), and the initial software-controlled closure of the pre-charge circuit under strict current limits.

This phase is purely observational and intended to analyze high-voltage DC-link capacitor voltage rise curves, verify contactor control synchronization, and validate weld-detection algorithms without motor rotation or inverter switching active.

```
                      [HIGH-VOLTAGE POTENTIAL ENERGIZATION PROFILE]
                       (NO INVERTER SWITCHING / ZERO MOTOR RPM)
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       ▼                                  ▼                                  ▼
 [Pre-Charge Closed]             [Pre-Charge Delta Check]          [Main Positive Engagement]
 - Limit inrush current          - V_caps ≥ 95% of V_batt          - Main contactor closes
 - Monitor curve (V/Δt)          - Verify timeout window (≤500ms)  - Monitor weld feedback lines
```

### 1. Pre-Charge Sequence & Delta-V Matching Rules

To protect the main contactor internal contacts from catastrophic pitting, arcing, or material welding during closing cycles, the VCU and BMS must coordinate an explicit staged step-down algorithm:

- Main Negative Closure: The main negative contactor closes first to establish the baseline high-voltage reference path.
- Pre-Charge Engagement: The current-limited pre-charge contactor/relay closes, placing the current-limiting pre-charge resistor inline with the inverter DC-link capacitor bank (C_link).
- Voltage Rise Tracking: The VCU tracks the rise of the inverter internal DC-link capacitor voltage (V_caps) relative to the raw pack voltage (V_batt). The voltage curve must follow a predictable RC time constant: V_caps(t) = V_batt × (1 − e^(−t/(R·C))).
- Delta-V Threshold Lockout: The main positive contactor is strictly blocked from closing until: ΔV = |V_batt − V_caps| ≤ Threshold (Initial Bench Target: ≤ 5% of total pack voltage).
- Pre-Charge Timeout Limit: If V_caps fails to cross the ≥ 95% target within the supplier-defined window (initial bench profile target: ≤ 500 ms), the VCU must instantly declare a Pre-Charge Fault, abort the cycle, open all contactor lines, and latch a hard restart lockout.

### 2. Contactor Weld-Detection & Feedback Validation

The VCU and BMS must poll auxiliary mirror contacts on every high-voltage contactor to verify mechanical state alignment before and after command delivery:

- Pre-Flight Weld Check: Prior to commanding any contactor closed, auxiliary feedback loops must confirm all contacts are mechanically open. If any feedback loop indicates a closed circuit while command lines are low, a Contactor Weld Fault is latched.
- Post-Flight State Check: Once a contactor command transitions to high, the feedback line must mirror the transition within ≤ 50 ms. Failure to align indicates a stuck or slow contactor mechanism, triggering an immediate shutdown sequence.

### Verification Matrix: Gate 05L-B

| Test ID | Scenario Description | Initial Chassis State | Trigger Action / Input | Expected Coordinated Safety Cascade | Target Measurement Criteria | Blocked States (IMMEDIATE ABORT) | Proof Artifact |
|---|---|---|---|---|---|---|---|
| 05L-B-001 | Main Negative Contactor Closure | Gate 05L-A passed; LOTO removed; MSD closed. Key to RUN. | Initiate the high-voltage power-up command sequence via calibration interface. | VCU commands the Main Negative contactor to close. Polls auxiliary feedback lines. | Contactor closes within ≤ 50 ms of command output. V_caps remains at 0.0V. | • Main Positive contactor closing prematurely • Pre-charge relay engaging out-of-order | High-speed CAN log showing contactor state bytes vs. timing. |
| 05L-B-002 | Pre-Charge Inrush & Curve Audit | Main Negative contactor closed. | Command the Pre-Charge Relay to close. Monitor DC-link voltage via CAN. | Pre-charge loop engages. Current streams through current-limiting resistor to charge C_link capacitors. | V_caps rises along a clean logarithmic curve. V_caps ≥ 95% of V_batt within ≤ 500 ms. | • Flat-line voltage (0V rise indicator) • Instantaneous voltage spike (0 ms short) | High-voltage differential probe scope capture of DC-link voltage rise. |
| 05L-B-003 | Delta-V Threshold Validation | Pre-charge sequence active; V_caps rising. | Allow V_caps to reach the matching boundary target (≤ 5% voltage differential). | VCU validates that the voltage delta criterion is fully met, then commands Main Positive contactor closure. | Main Positive contactor receives close command only after ΔV ≤ 5% condition is true. | Main Positive closing when ΔV > 5% (violates arcing prevention rules). | Time-correlated trace logging V_batt, V_caps, and Main Positive Command state. |
| 05L-B-004 | Pre-Charge Timeout Protection | Initiate power-up sequence with a mock load leakage present on the DC bus. | Inject an artificial bleed resistance across the DC bus to prevent V_caps from reaching 95%. | VCU detects that pre-charge time has exceeded the maximum window limit without matching the delta. | Pre-charge relay opens at exactly 500 ms. Main Positive is blocked. Fault state latched. | System keeping the pre-charge loop energized indefinitely (resistor thermal burnout hazard). | CAN error trace capturing the pre-charge timeout DTC generation. |
| 05L-B-005 | Contactor Weld-Fault Simulation | System unpowered. Simulate a welded contactor by mechanically shorting an auxiliary feedback loop. | Apply logic high to Main Positive auxiliary feedback line prior to powering up the system. | VCU executes pre-flight check, detects state mismatch, refuses to cycle control lines, and flags weld fault. | System blocks all contactor drive commands from transitioning high. Drive lines remain at 0.0V. | Power-up routine proceeding when an active weld feedback fault is asserted. | UDS fault register printout showing specific contactor weld DTC active. |
| 05L-B-006 | Passive Stored Energy Discharge | System fully energized under live potential (observational state). | Issue an immediate emergency software shutdown or turn the ignition key to OFF. | Main contactors open cleanly. High-voltage energy stored in C_link begins passive bleeder decay. | DC bus voltage drops below ≤ 60V DC within the exact supplier-defined discharge window. | DC bus voltage remaining high (>60V DC) beyond the approved time budget without warning indicators. | Continuous scope monitoring capture of voltage decay vs. elapsed time. |

### Gate 05L-B Exit Criteria

The system cannot exit Gate 05L-B unless:

- The pre-charge voltage rise curve conforms precisely to the expected mathematical RC timeline without erratic steps or instantaneous zero-resistance jumps.
- The main positive contactor strictly locks out closure execution until the ΔV ≤ 5% target condition is structurally satisfied.
- Pre-charge timeout thresholds (≤ 500 ms) reliably abort the sequence, isolate the battery pack, and latch safe restarts upon failure.
- Contactor weld-detection logic stops power-up sequences when feedback lines show unaligned states.
- The passive stored energy discharge window is mapped, verified via scope traces, and matches the supplier-defined parameters.
- All raw data logs, high-voltage scope captures, mathematical delta verifications, and engineer signoffs are archived in the Build Engine.

Crucial Safety Milestone Authorization: Successful Gate 05L-B completion permits progression to Gate 05M (Traction Inverter Control Loop & Low-Speed Spin Validation) only under controlled spin profiles.
