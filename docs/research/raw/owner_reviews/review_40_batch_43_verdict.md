[Owner framing before the payload — the review_39 recap carried into the
Gate 05H v2 prompt: strongest CAN_1 proof = silent-mode register dump + no
TX mailbox allocation + no ACK participation + protocol-analyzer capture +
oscilloscope confirmation of no dominant-bit drive from the VCU; power-loss
"all driver pins float open within <2 ms" is too absolute unless backed by
the manual's engineer → measure driver-output behavior after power loss,
expected safe state depends on output-stage design / pull-ups-downs / relay
topology / hardware fail-safe design, timing + final state require bench
proof; Script B timeout must be configurable (test 20/50/100/250 ms without
claiming one is the real boundary unless proven by manual details); add the
per-HIL-run proof-artifact package (Run ID, firmware version, VCU hw
revision, test-script version, bench wiring diagram, sim-node config, fault
injected, raw CAN log, oscilloscope capture, power-rail log, state-transition
log, observed latency, expected response, result category, authority status,
engineer reviewer); keep HIL architecture / fault-injection matrix /
listen-only proof / automation scripts / proof artifacts; change PASS/FAIL →
HIL observed / needs review / model stress failure, and "instant" / exact
output behavior → measured bench behavior — "43:75".]

[Owner verdict delivered AFTER the batch-43 payload:]

My respond

My verdict: this is a strong Gate 05H draft. You fixed the earlier problem by making the timing values configurable and by changing the result language from hard “PASS” to observation categories.
Gate 05H:
HIL protocol drafted ✅
CAN_1 listen-only proof improved ✅
Artifact package is strong ✅
Still needs bench-vs-simulation status cleanup ⚠️
ACK proof needs tighter method ⚠️
500ms CAN short must stay bench-only ⚠️
What is strongest
The best part is the HIL Run Artifact Verification Dossier. That is exactly the kind of proof package your Build Engine needs:
HIL run ID
firmware version
VCU hardware revision
test script version
bench wiring diagram
simulated node config
fault injected
raw CAN log
scope capture
power rail log
state transition log
observed latency
authority status
engineer reviewer
That turns the HIL run into evidence, not just “it worked on my laptop.”
Main cleanup: 05H is not purely simulation anymore
Your text says:
restricted to Simulation-Only Model Assertions
But HIL with a real VCU as DUT, real CAN transceivers, power supply, oscilloscope, and FIU is bench/HIL evidence, not just simulation.
Better split it:
Gate 05H-A:
HIL protocol and script formulation
Status: SIMULATION_SCRIPT_DRAFT

Gate 05H-B:
Low-voltage HIL bench execution with real VCU
Status: HIL_BENCH_OBSERVED / NO_VEHICLE_CLEARANCE

Gate 05I:
Physical bench proof with production-like wiring/harness/components
Status: NOT STARTED
So after a real HIL run, the result should be:
HIL_OBSERVED_VALID
NO_LIVE_HV
NO_VEHICLE_CLEARANCE
NO_COMPLIANCE_AUTHORITY
not only:
SIMULATION_ONLY
Big technical correction: ACK proof
This line is good but needs a better proof method:
No ACK participation
A normal CAN analyzer may not always prove which node created the ACK, because ACK is a shared bus slot. To prove CAN_1 is truly silent, your test should require:
- CAN_1 controller register dump showing listen-only/silent mode
- zero TX mailbox allocation
- TX pin disabled, disconnected, or hardware-gated
- oscilloscope probe on the VCU TX pin or transceiver TXD line
- controlled bench bus where ACK-capable nodes are known
- protocol analyzer log showing no VCU-originated frames
So change the proof from:
f.is_ack_asserted
to:
VCU_TXD line remains inactive during ACK slot and all frame periods.
That is much stronger.
The CAN-H/CAN-L short test needs one hard warning
This row:
FIU forces physical short between CAN-H and CAN-L for 500ms.
is fine only on a simulated/bench CAN network, not on a real Ford network.
Add this:
This test is forbidden on a live Ford factory network.
It may only be run on a bench harness or simulated OEM node network.
Timing values are better, but still label them
This is much better:
timeout_threshold_ms=100.0
configured threshold
measured latency
NEEDS_REVIEW
Now add one field:
Timing Authority:
SimulationSweepOnly / SupplierDataPending / HILObservedOnly
So the script result means:
We observed 42.17 ms under this bench setup.
This does not become the official safety limit.
Low-voltage rail numbers need a status label too
These are plausible test profiles:
11.8V to 14.2V
≥20V/ms slew rate
0V to 5V APPS
But under your doctrine, label them:
TestBenchProfileCandidate
NotFinalVehicleRequirement
NeedsComponentSpec
That way they can guide HIL setup without becoming final vehicle electrical requirements.
Script language cleanup
Change:
return "HIL_OBSERVED_VALID"
to something even clearer:
return "HIL_OBSERVED_VALID_NO_GATE_AUTHORITY"
And in Script B, this line:
return "MODEL_STRESS_FAILURE"
could become:
return "HIL_NEEDS_REVIEW_NO_GATE_AUTHORITY"
unless the HIL script itself crashed or violated a hard bench safety rule.
Correct Gate 05H status
Use this:
Gate 05H — HIL / Bench Test Protocol

Status:
HIL_TEST_PROTOCOL_DRAFTED
LOW_VOLTAGE_HIL_ONLY
REAL_VCU_DUT_ALLOWED
NO_LIVE_HV
NO_VEHICLE_TESTING
NO_FACTORY_BUS_TRANSMISSION
TIMING_VALUES_NOT_GATE_AUTHORITY
ARTIFACT_PACKAGE_DEFINED
BENCH_EXECUTION_PENDING
After you actually run it:
Gate 05H-B:
HIL_RUN_OBSERVED
RAW_LOGS_CAPTURED
NO_VEHICLE_CLEARANCE
READY_FOR_ENGINEERING_REVIEW
Bottom line
Yes — this is the right Gate 05H direction.
The main fix is to separate:
simulation script draft
from:
real low-voltage HIL bench observation
and make the ACK/listen-only proof more physical by watching the VCU TX/TXD line, not just the decoded CAN log. Then Gate 05H becomes a serious proof protocol.
