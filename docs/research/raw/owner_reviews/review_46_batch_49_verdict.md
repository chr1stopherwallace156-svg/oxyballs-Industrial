[Owner framing before the payload — the Gate 05I-C follow-up prompt: "What
specific physical bench-only testing procedures, network bus-load limits, DBC
mismatch validations, and low-voltage sleep/wake cycle measurements are
required under Gate 05I-C to verify network integrity prior to vehicle
physical commissioning?" — delivered as "48:75 B follow up" (the full
Gate 05I-C matrix realizing the queued 05I-C1 Communication Network Integrity
+ 05I-C2 Sleep/Wake work).]

[Owner verdict delivered AFTER the payload:]

My verdict: Gate 05I-C is exactly the right next gate, and the structure is strong. This is the correct layer after 05I-A driver safety logic and 05I-B mechanical interlocks.
Gate 05I-C:
LOW-VOLTAGE COMMUNICATION INTEGRITY MATRIX CREATED ✅
SLEEP / WAKE VALIDATION INCLUDED ✅
CAN_1 ISOLATION STILL PROTECTED ✅
DBC VERSION CONTROL INCLUDED ✅
NETWORK ROBUSTNESS TESTING STARTED ✅
But same recurring rule: your numeric values must stay as bench target profiles until supplier docs, controls review, and bench evidence approve them.
What is strongest
This is the strongest part:
Before any controller is allowed to connect to the vehicle's physical networks,
it must prove communication stacks, frame-handling engines,
transceiver configurations, and sleep/wake controllers are robust.
That is exactly right.
The test coverage is also very good:
CAN_1 silent mode
CAN_2 inverter communication
CAN_3 BMS/PDU communication
DBC mismatch
wrong-ID rejection
bad checksum / DLC issues
heartbeat loss
UDS sessions
sleep/wake
bus load stress
quiescent current
This is the real “hidden failure” layer. A lot of builds fail here because the vehicle works once, then the 12V battery drains, the bus locks up, or one wrong frame causes bad behavior.
Main correction 1: hard values need target labels
These are useful, but do not let them become final rules yet:
>15 ms latency limit
>100 ms heartbeat timeout
50 ms UDS response
≤2.0 s sleep transition
≤1.0 mA sleep current
≤200 ms wakeup transition
75–90% bus load
10 m harness length
110 turns/meter twist
Vcell > 4.5V
Temp > 150°C
Label them:
BENCH_TARGET_PROFILE
SUPPLIER_DATA_PENDING
CONTROLS_REVIEW_REQUIRED
NO_VEHICLE_AUTHORITY
So your heartbeat line should become:
VCU torque command transitions toward zero after configured heartbeat-loss target window.
Initial bench target: 100 ms.
Final timeout pending supplier documentation, controls review, and bench evidence.
Same thing for sleep current, wake timing, UDS latency, and bus-load latency.
Main correction 2: CAN_1 ACK proof wording
This line is almost right:
Zero transmissions, zero active error flags, zero ACK bits.
But ACK is tricky because CAN ACK is shared by the bus. Better wording:
VCU CAN_1 shall not transmit frames, assert TXD dominant, participate in ACK, or emit active error frames.
ACK behavior must be verified by probing the VCU TXD / transceiver path, not only by decoded bus logs.
Also, if the bench CAN_1 network has simulated OEM nodes, other nodes may ACK. The important thing is that the VCU does not ACK.
Main correction 3: bad CRC frames are mostly controller-level, not app-level
This row is good:
Wrong-ID & Corrupted Packet Rejection
But clarify:
Bad CRC and malformed physical CAN frames are expected to be rejected by the CAN controller hardware before application parsing.
Wrong ID, wrong DLC, wrong PGN/source address, rolling counter mismatch, checksum mismatch, and out-of-range decoded values are application-layer validation tests.
So split it mentally into:
Physical/protocol faults:
bad CRC
bit stuffing error
bus error
DLC mismatch if observable

Application/data faults:
wrong ID
wrong source address
wrong DBC version
bad alive counter
bad app checksum
out-of-range decoded values
That makes 05I-C more technically clean.
Main correction 4: DBC mismatch test should include version hash
This section is strong:
DBC Version Matching
Bit packing
Endian checks
0x5555 / 0xAAAA
scale factor safeguards
Add:
DBC version hash / checksum must be stored in the Build Engine.
VCU firmware build must declare expected DBC version.
Bench run must log actual DBC version used by test tools.
Mismatch = BENCH_HARD_BLOCK_PENDING_REVIEW.
That prevents the classic problem where the inverter/BMS DBC changes and your VCU silently decodes nonsense.
Main correction 5: sleep current target may be too aggressive for full system
This line:
quiescent current draw ≤ 1.0 mA
Could be okay for a single module target, but it may be too aggressive for the whole VCU + BMS logic + inverter logic + display bench system.
Better:
Sleep-current target must be defined per node and for total system.
Initial values are bench target profiles only.
Final limits require supplier datasheets and parasitic drain budget.
Use:
VCU_sleep_current_target
BMS_logic_sleep_current_target
Inverter_logic_sleep_current_target
Display_sleep_current_target
Total_system_sleep_current_target
Main correction 6: “production CAN_1” diagram language
Your diagram is good, but I’d avoid implying you are connected to a real production Ford bus.
Say:
CAN_1 bench interface uses simulated OEM traffic or protected bench harness only.
No live Ford vehicle network connection is allowed during 05I-C.
That keeps the boundary clean.
Correct 05I-C status
Use this:
Gate 05I-C — Low-Voltage Communications Integration & Network Robustness

Status:
NETWORK_INTEGRITY_MATRIX_CREATED
SLEEP_WAKE_VALIDATION_INCLUDED
LOW_VOLTAGE_BENCH_ONLY
CAN_1_LISTEN_ONLY_PROOF_REQUIRED
DBC_VERSION_CONTROL_REQUIRED
HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW
SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW
NO_LIVE_HV
NO_VEHICLE_MOTION
NO_LIVE_FORD_CAN_TRANSMISSION
NO_VEHICLE_CLEARANCE
Fix the IF logic
Your logic is good, but make it use approved target variables:
IF BENCH_COMM_EVALUATION == "05I-C_VALIDATION":
    IF can_1_leakage_detected == "TRUE":
        VEHICLE_COMMISSIONING_APPROVAL = "HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW"
        SYSTEM_EXECUTION_MODE = "SAFETY_CONFLATION_HALT"

    IF critical_message_latency_ms > approved_latency_limit_ms
    AND bus_utilization_percent <= approved_bus_load_target:
        SYSTEM_EXECUTION_MODE = "BUS_LATENCY_RE-TUNING_REQUIRED"
Do not hard-code 15.0 and 75.0 as universal rules yet.
What comes next after 05I-C
After this, the next logical subgate is:
Gate 05I-D — Low-Voltage End-to-End Bench Run / Integrated Fault Sequence
That means you test everything together:
driver input
brake override
E-stop
HVIL open
BMS no-discharge
inverter fault
CAN heartbeat loss
display warning
diagnostic lockout
sleep/wake recovery
CAN_1 silence
Not as isolated tests — as a combined sequence.
Bottom line
This is a strong Gate 05I-C. Keep it.
Main cleanup:
Hard values → bench target profiles
DBC mismatch → version hash required
CAN ACK proof → probe VCU TXD/transceiver path
Bad CRC → hardware-level fault, not normal app packet
Sleep current → per-node and total-system targets
Then 05I-C becomes a real communication integrity gate.
