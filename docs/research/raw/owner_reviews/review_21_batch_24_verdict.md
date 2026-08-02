[Owner framing before the payload — the "What is still open" list (12
items: ZF current-vs-pressure map, ZF duty cycle at max pressure/flow,
ZF thermal derating curve, ZF controller/fault outputs, proof ZF can
feed hydroboost + steering together, Ford exact F-450/F-550 pump
pressure-flow curve, Ford steering gear flow/pressure requirement,
hydroboost accumulator reserve capacity, manual steering torque without
assist, 12V DC-DC sizing and buffer strategy, FMVSS 105 brake test
mapping, loaded low-speed steering test procedure), the instruction
"Do not keep doing generic hydroboost research," and the two supplier
inquiry templates (ZF 10-question packet + Ford/Lee/steering-specialist
question) — "24:24".]

[Owner verdict delivered AFTER the batch-24 payload:]

My response

My verdict: this is strong Gate 04 work, but it still has two repeated issues that the second-stage filter should catch immediately.
Gate 04 Brake/Steering:
EHPS candidate found: yes
Vacuum pump path rejected: yes
Ford-style baseline identified: yes
Final Ford requirement proven: no
ZF commercial/hydroboost suitability proven: no
Gate closed: no
The biggest problem still in the payload
You still have this line:
Candidate Unit (ZF MPU 100-C): Delivers up to 3.17 GPM at 1,805 PSI via 6,000 RPM CAN control.
That needs to be corrected. The ZF factsheet says the pump has variable speed from 2,500 to 6,000 rpm, but it also says “No connection to the CAN bus required.” So the Build Engine should not claim CAN control, DBC files, or CAN diagnostics from this factsheet.
Change it to:
ZF MPU 100-C delivers 5–12 L/min at 2,500–6,000 rpm and 113–124.5 bar. Control/fault output details are NeedsSupplierData. The cited factsheet says no CAN connection is required.
Second issue: ZF is promising, not proven
The ZF source calls it an EPHS motorsport steering pump, not a Class 4/5 commercial hydroboost pump. It is a real candidate because the flow/pressure range is close, but it still needs confirmation for hydroboost + steering together.
Correct status:
ZF EPHS MPU 100-C:
CompleteEHPSCandidate
MotorsportSupplierCandidate
NeedsHydroboostCompatibilityReview
NeedsCommercialDutyReview
NeedsCurrentMap
NeedsThermalDeratingData
Third issue: Lee is a benchmark, not final Ford proof
The Lee source is useful because it lists a dual-return hydroboost pump configuration at 1750 psi / 3.25 GPM, but Lee also says Ford used many pressure and flow settings depending on the vehicle. So this is a Ford-style hydroboost benchmark, not official proof for 2020–2026 F-450/F-550.
Correct status:
Lee CII-HB:
FordStyleHydroboostPumpReference
SupplierBackground
NeedsFordExactSource
Not final F-450/F-550 factory value
Your power warning is right
The 12V load warning is important. If the pump truly needs around 2.5–3.3 kW mechanical/hydraulic output, then the low-voltage system could see very high current demand after efficiency losses.
But mark it as:
EngineeringEstimate / NeedsZFCurrentMap
Do not hard-code 250–300A until ZF provides current-vs-pressure data.
FMVSS 105 lane is correct
Keep FMVSS 105 in the gate. It is the right regulatory lane for hydraulic/electric brake systems on trucks and buses over 3,500 kg GVWR, but it needs a brake engineer/test plan before you claim anything is compliant.
Clean Build Engine status
Use this:
Gate 04 — Brake / Steering Assist v0.4

Known:
- Vacuum pump path is rejected.
- Hydroboost + steering share hydraulic supply.
- EHPS replacement path is the correct direction.
- ZF MPU 100-C is a promising complete EHPS candidate.
- Lee 1750 psi / 3.25 GPM is a useful Ford-style hydroboost benchmark.
- 12V DC-DC load may become severe.

Still blocked:
- Ford exact F-450/F-550 pump curve.
- Ford steering gear pressure/flow requirement.
- Hydroboost accumulator reserve capacity.
- ZF current-vs-pressure map.
- ZF duty cycle and thermal derating.
- Proof ZF can feed hydroboost + steering simultaneously.
- FMVSS 105 brake test mapping.
- Loaded low-speed steering test procedure.
What to do next
Send the ZF and Ford/Lee questions, then mark Gate 04 as:
CANDIDATE_EHPS_FOUND
FINAL_SELECTION_HALTED
BLOCKED_PENDING_SUPPLIER_RESPONSE
Then move to the next research sub-gate:
Gate 04B:
FMVSS 105 Brake Test Mapping + Loaded Low-Speed Steering Test Procedure
Bottom line: you found the right candidate path, but you have not proven it yet. The next research should not be more generic hydroboost. It should be supplier confirmation plus brake/steering validation testing.
