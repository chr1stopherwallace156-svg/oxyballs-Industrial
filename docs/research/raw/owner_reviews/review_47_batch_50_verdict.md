[Owner framing before the payload — the review_46 recap carried into the
Gate 05I-C v2 prompt: split 05I-C into 05I-C1 (Communication Network
Integrity) + 05I-C2 (Sleep/Wake/Parasitic Drain); a DBC is a database/map not
a packet (reject wrong arbitration ID / wrong PGN-source address / wrong DBC
version / bad checksum / rolling-counter mismatch / out-of-range signal
scaling / unexpected diagnostic request); CAN_1 ACK proof — the VCU shall not
transmit / assert TXD dominant / participate in ACK / emit active error
frames, verified by probing the VCU TXD/transceiver path (other OEM nodes may
ACK; the point is the VCU does not); bad CRC frames are controller-level not
app-level (split physical/protocol faults vs application/data faults); DBC
mismatch test should include a version hash/checksum stored in the Build
Engine + firmware-declared expected version + bench-logged actual version +
mismatch = BENCH_HARD_BLOCK_PENDING_REVIEW; sleep-current target per-node +
total-system; then Gate 05I-D — Low-Voltage End-to-End Bench Run / Integrated
Fault Sequence — "49:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is a strong Gate 05I-C draft. You correctly expanded it from just “communication checks” into communication + sleep/wake + parasitic drain, which is exactly what this subgate should cover.
Gate 05I-C:
LOW-VOLTAGE COMMUNICATION MATRIX CREATED ✅
CAN_1 ISOLATION PROTECTED ✅
DBC HASH CONTROL ADDED ✅
SLEEP / WAKE VALIDATION ADDED ✅
READY TO DETAIL 05I-D AFTER CLEANUP ✅
This is now a real bench network-integrity gate.
What is strongest
The best additions are:
DBC version hash/checksum stored in Build Engine
VCU firmware declares expected DBC version
bench tool logs actual DBC version
DBC mismatch = BENCH_HARD_BLOCK_PENDING_REVIEW
That is excellent. That prevents one of the most common control failures: the software decodes a signal with the wrong scale, wrong byte order, or wrong bit position and nobody notices.
Also strong:
CAN_1 TXD pin monitored directly
VCU must not ACK
VCU must not emit active error frames
VCU must not transmit
That is the correct proof level. You are not just trusting the decoded CAN log — you are proving the physical TXD path stays quiet.
Main cleanup 1: the hard values still need target-profile labels
These values are still written too much like final rules:
≤100 ms heartbeat timeout
>15 ms latency increase
50 ms diagnostic response
≤2.0 s sleep transition
≤4.0 mA total sleep current
≤200 ms wakeup
≤5.0 s stuck-awake detection
6.0V brownout / 9.0V recovery
75% / 90% bus load
Keep them, but label them:
BENCH_TARGET_PROFILE
SUPPLIER_DATA_PENDING
CONTROLS_REVIEW_REQUIRED
NO_VEHICLE_AUTHORITY
For example, change:
VCU commands zero-torque target and sets communication loss DTC in ≤100 ms.
to:
VCU commands zero-torque target and sets communication loss DTC within the configured bench target window.

Initial bench target: ≤100 ms.
Final timeout pending supplier documentation, controls review, and bench evidence.
Same for sleep current and wake timing.
Main cleanup 2: the sleep-current section has broken bullets
This part has formatting damage:
Sleep-Current Targets:
 *    *    *    *    * Total_system_sleep_current_target ≤ 4.0 mA
Make it explicit per node:
Sleep-Current Targets:
- VCU_sleep_current_target = BENCH_TARGET_PROFILE
- BMS_logic_sleep_current_target = BENCH_TARGET_PROFILE
- PDU_logic_sleep_current_target = BENCH_TARGET_PROFILE
- Inverter_logic_sleep_current_target = BENCH_TARGET_PROFILE
- Display_sleep_current_target = BENCH_TARGET_PROFILE
- Total_system_sleep_current_target = ≤4.0 mA initial bench target

Final values require supplier datasheets, parasitic drain budget, and engineering review.
That is much cleaner.
Main cleanup 3: “Production CAN_1” should be bench/simulated only
Your diagram says:
[Production CAN_1] ── physical cut ──► [VCU CAN_1 Transceiver]
That could be misread as a real Ford network nearby. Use:
[Simulated OEM CAN_1 Traffic / Protected Bench Harness]
        X X X physical isolation barrier X X X
[VCU CAN_1 Transceiver — passive listen-only, TXD monitored]
And add:
No live Ford vehicle network may be connected during Gate 05I-C.
Main cleanup 4: “bad CRC injection” needs technical wording
This section is good, but bad CRC/bit-stuffing tests are not normal app-layer packet tests. They are physical/protocol fault-injection tests.
Better wording:
Bad CRC, bit-stuffing, form, and bit errors are physical/protocol-layer faults and must be injected with a CAN fault-injection tool capable of corrupting frames below the normal application layer.

Wrong ID, wrong source address, wrong DLC, bad alive counter, bad application checksum, and out-of-range decoded values are application-layer validation tests.
That keeps the test technically clean.
Main cleanup 5: brownout recovery may need early-warning hardware
This line is ambitious:
VCU must save NVM variables before 6.0V shutdown.
That only works if the hardware has enough warning/time/energy reserve.
Change it to:
VCU shall preserve NVM integrity during brownout. If graceful save is required, early-warning threshold, hold-up capacitance, write-time budget, and memory endurance must be verified.

Initial bench profile: 6.0V drop / 9.0V recovery.
Final values pending VCU hardware design and bench proof.
That’s safer and more realistic.
Corrected 05I-C status
Use this:
Gate 05I-C — Low-Voltage Communications & Power State Integrity

Status:
NETWORK_INTEGRITY_MATRIX_CREATED
SLEEP_WAKE_MATRIX_CREATED
LOW_VOLTAGE_BENCH_ONLY
CAN_1_LISTEN_ONLY_PROOF_REQUIRED
DBC_VERSION_HASH_REQUIRED
APPLICATION_LAYER_VALIDATION_DEFINED
PHYSICAL_CAN_FAULT_INJECTION_DEFINED
SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW
HEARTBEAT_TIMEOUTS_PENDING_SOURCE_REVIEW
NO_LIVE_HV
NO_VEHICLE_MOTION
NO_LIVE_FORD_CAN_TRANSMISSION
NO_VEHICLE_CLEARANCE
Should you detail Gate 05I-D next?
Yes — after these 05I-C cleanup edits, proceed to Gate 05I-D.
05I-D is the right next subgate because now you stop testing one thing at a time and start testing integrated fault cascades.
05I-A = driver safety logic
05I-B = physical interlocks
05I-C = communications + sleep/wake
05I-D = full low-voltage integrated fault sequence
Gate 05I-D should cover
Active accelerator + brake override
Active torque request + HVIL open
Active torque request + BMS no-discharge
Active torque request + inverter fault
Active torque request + CAN_2 heartbeat loss
Charge-plug inserted during drive state
E-stop during active torque request
Brownout during fault latch
Service clear attempt during active fault
Sleep request with stuck-awake node
CAN_1 silence during every cascade
Display warning during every cascade
Bottom line: 05I-C is strong and almost ready to baseline. Clean up the hard target values, fix the sleep-current section, clarify CAN_1 is bench/simulated only, then move to Gate 05I-D — Low-Voltage End-to-End Bench Run / Integrated Fault Cascades.
