[Owner framing before the payload — the review_44 recap carried into the
Gate 05I-A final-baseline + 05I-B + 05I-C prompt: Gate 05I-C is the right
next lane (CAN_2 VCU↔inverter, CAN_3 VCU↔BMS/PDU, display-node comm,
diagnostic-tool comm, heartbeat, message filtering, DBC version matching,
wrong-DTC/wrong-ID rejection, bus load under maximum frame density, no CAN_1
leakage during all communication tests); and the "Blocked Outputs" column
still needs cleanup — "CAN_2 torque payload set to 0x0000" is an Expected
Safe Output, not a blocked output → split Expected Safe Output (torque →
zero) vs Blocked Outputs (non-zero torque after fault, CAN_1 transmission,
factory-cluster injection, automatic fault clear, direct contactor control
by VCU); plus 05I-B is the right "real harness" layer — "48:75".]

[Owner verdict delivered AFTER the batch-48 payload:]

My verdict: this is very strong, and yes — Gate 05I-C is the correct next move.
But one wording issue matters:
Do not say:
“With safety logic and physical interlocks validated…”

Say:
“After Gate 05I-A and 05I-B matrices are defined and bench evidence is collected…”

Current status is still:
MATRIX_CREATED / BENCH_EVIDENCE_PENDING
not fully validated yet.
05I-A and 05I-B are now much cleaner
The biggest improvement is that you fixed the table structure:
Expected Safe Output
Blocked Outputs MUST NEVER OCCUR
Measurement Method
Proof Artifact
Authority Status
Build Engine Status
That is the right Build Engine format.
The Service Clear Operational Law is also excellent. Keep it permanently.
UDS clear can clear software records only.
It cannot clear active hardwired faults, HVIL faults, E-stop, BMS no-discharge,
isolation faults, or unresolved safety latches.
That protects the system from fake software “reset = safe” thinking.
Main cleanup still needed
1. Remove “immediate” language
You still have this in a few rows:
command immediate zero-torque state
Trigger immediate shift to Neutral/Safe state
Hardwired loop opens immediately
Immediate continuity break
Change to:
within configured bench target window
measured and compared against approved target profile
final timing pending supplier datasheet / controls review / bench proof
You want measured behavior, not “instant” claims.
2. Hard values still need target labels
These are still useful, but they must be marked as bench targets, not final rules:
>10% APPS skew
>25% accelerator
>5% APPS shift inhibit
13.5V to 8.5V brownout
≥20V/ms slew
50ms APPS fault
<0.1Ω contact resistance
<0.02Ω ground continuity
≤20ms relay dropout
>75% bus utilization
>100ms heartbeat timeout
Use this label:
BENCH_TARGET_PROFILE
SUPPLIER_DATA_PENDING
ENGINEERING_REVIEW_REQUIRED
NO_VEHICLE_AUTHORITY
And change your IF logic to:
IF ground_resistance_ohms >= approved_ground_limit
OR safety_relay_dropout_ms > approved_datasheet_limit:
    VEHICLE_COMMISSIONING_APPROVAL = "HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW"
instead of hard-coding 0.02 and 20.0 as universal rules.
Gate 05I-C is the right next layer
Your 05I-C direction is correct:
CAN_2 integrity
CAN_3 integrity
display communication
diagnostic tool communication
heartbeat behavior
message filtering
DBC version matching
bus load integrity
CAN_1 isolation
That is exactly what comes after safety logic and interlocks.
But 05I-C should also include sleep/wake validation, not just communication.
Fix two terms in 05I-C
This line:
wrong-DTC, wrong-ID, or corrupted DBC packet rejection
should become:
wrong arbitration ID
wrong PGN/source address
wrong DBC version
bad checksum
rolling counter mismatch
out-of-range signal scaling
unexpected diagnostic request
A DBC is not a packet. The DBC is the database/map that explains how to decode packets.
Also change:
VCU torque command timeout drops to zero if inverter heartbeat fails for >100ms
to:
VCU torque command transitions toward zero after configured heartbeat-loss target window.
Final timeout pending supplier documentation, controls review, and bench evidence.
Correct 05I-C status
Use this:
Gate 05I-C — Low-Voltage Communication Network Integrity & Sleep/Wake Validation

Status:
STARTED
LOW_VOLTAGE_BENCH_ONLY
NETWORK_INTEGRITY_MATRIX_PENDING
SLEEP_WAKE_MATRIX_PENDING
DBC_VERSION_CONTROL_REQUIRED
HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW
NO_LIVE_HV
NO_VEHICLE_MOTION
NO_LIVE_FORD_CAN_TRANSMISSION
NO_VEHICLE_CLEARANCE
I would split 05I-C like this
05I-C1 — Communication Network Integrity
- CAN_2 VCU ↔ inverter logic board
- CAN_3 VCU ↔ BMS/PDU logic board
- display node
- diagnostic tool / UDS
- DBC version matching
- heartbeat loss
- wrong ID rejection
- checksum / rolling counter rejection
- high bus-load stress
- CAN_1 no-leakage proof

05I-C2 — Sleep / Wake / Parasitic Drain
- key-off sleep entry
- charger-plug wake
- service-tool wake
- fault-event wake
- BMS/PDU sleep behavior
- inverter logic sleep behavior
- display sleep behavior
- stuck-awake detection
- brownout recovery
- total sleep current measurement
- no unauthorized CAN_1 wake or transmit
Bottom line
This package is solid. I’d mark it:
05I-A:
FINAL BASELINE MATRIX CREATED
BENCH EVIDENCE PENDING

05I-B:
MECHANICAL INTERLOCK MATRIX CREATED
BENCH EVIDENCE PENDING

05I-C:
PROCEED NEXT
COMMUNICATION + SLEEP/WAKE VALIDATION
LOW-VOLTAGE BENCH ONLY
You are building the right chain: logic → interlocks → communications → sleep/wake → then later physical bench integration review.
