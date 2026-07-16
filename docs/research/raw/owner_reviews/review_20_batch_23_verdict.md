[Owner framing before the payload — the "First Corrected Gate 04 state
v0.2" restatement + the "complete EHPS systems, not just hydraulic
pumps" narrowing prompt with the per-candidate extraction list, the
Ford/OEM source list, and the hard rules ("23:75").]

[Owner verdict delivered AFTER the batch-23 payload:]

My respond

My verdict: this is Gate 04 v0.4 and it is much cleaner, but it still needs two important downgrades before the Build Engine accepts it.
Brake / Steering Assist Gate:
Architecture = strong
EHPS candidate = real
ZF suitability = not proven yet
Ford baseline = useful but not official F-450/F-550 proof yet
Final selection = halted
What is strong
You now have a complete EHPS candidate, not just a hydraulic pump. That is progress. The ZF EPHS MPU 100-C factsheet supports a variable flow range of 5–12 L/min, operating pressure of 113–124.5 bar, and variable speeds from 2,500–6,000 rpm. That puts it in the same general hydraulic range as your Ford-style hydroboost target.
The Lee Power Steering source also gives a useful Ford-style hydroboost pump reference: Lee lists a dual-return reservoir for gearbox with Hydro Boost at 1750 psi / 3.25 GPM / 16x1.5 mm hose. That is useful as a benchmark for what an EHPS candidate may need to approximate.
The biggest correction
Your payload says:
6,000 RPM CAN control
But the ZF factsheet says the opposite: “No connection to the CAN bus required.” So do not ask ZF for a DBC file unless you confirm there is a different controller version with CAN diagnostics.
Change that row to:
ZF control / diagnostics:
No CAN required per cited factsheet.
Fault outputs, control mode, and diagnostics are NeedsSupplierData.
Second correction: do not call ZF commercial-duty proven yet
The ZF document calls this an EPHS motorsport steering pump, not a Class 4/5 commercial truck hydroboost pump. So this should not be labeled “designed for commercial vehicle validation” yet.
Use this status instead:
ZF EPHS MPU 100-C:
CompleteEHPSCandidate
MotorsportSupplierCandidate
NeedsCommercialDutyReview
NeedsHydroboostCompatibilityReview
NeedsCurrentMap
NeedsThermalDeratingData
Third correction: Lee is not final Ford F-450/F-550 proof
Lee’s page is useful, but it also says Ford used many pressure and flow settings depending on the vehicle. So the 1750 psi / 3.25 GPM value is a strong Ford-style hydroboost reference, not yet an official 2020–2026 F-450/F-550 factory requirement.
Use:
Lee CII-HB:
FordStyleHydroboostPumpReference
SupplierBackground
NeedsFordExactSource
Not final F-450/F-550 factory value
Your power-load warning is right
This part is good:
2.5 kW to 3.3 kW mechanical/hydraulic load
250A to 300A on 12V bus
But it should be labeled:
EngineeringEstimate / NeedsZFCurrentMap
Because the actual current depends on pump efficiency, motor efficiency, controller efficiency, relief behavior, fluid temperature, and duty cycle. The Build Engine should not size the DC-DC converter from this estimate alone.
FMVSS lane is correct
Keep FMVSS 105 as the brake-testing lane. It applies to hydraulic and electric service brake systems and associated parking brake systems, and it applies to trucks and buses over 3,500 kg GVWR with hydraulic or electric brake systems.
For your test map, do not only say “stopping distance.” FMVSS 105 also includes partial-failure behavior, fade/recovery, water recovery, stability/control during braking, parking brake, warning lamp requirements, and test procedures.
Correct Build Engine status
Gate 04 — Brake / Steering Assist v0.4

Known:
- Vacuum pump path rejected.
- Hydroboost + steering share hydraulic supply.
- EHPS replacement path is the correct lane.
- ZF EPHS MPU 100-C is a promising complete EHPS candidate.
- 12V electrical load may be severe.

Not proven:
- ZF can support F-450/F-550 hydroboost + steering simultaneously.
- ZF can survive commercial-duty high-load cycles.
- Lee 1750 psi / 3.25 GPM is the exact 2020–2026 F-450/F-550 factory value.
- DC-DC sizing is final.
- FMVSS 105 test plan is mapped.
What to ask next
Now send the ZF packet, but edit it like this:
For the ZF EPHS MPU 100-C, please confirm:

1. Current draw vs. pressure and flow.
2. Maximum continuous current.
3. Maximum peak current and allowed duration.
4. Duty cycle at 12 L/min and 124.5 bar.
5. Thermal derating curve.
6. Whether the pump is suitable for hydroboost brake assist plus steering gear supply.
7. Whether it can handle simultaneous panic braking and low-speed steering lock.
8. Required reservoir volume, hose sizes, port threads, and approved fluid.
9. Fault output or diagnostic options. The factsheet says no CAN connection is required, so please confirm what diagnostic or warning outputs are available.
10. Recommended fuse, relay, wiring, and power supply sizing.
Bottom line
This is strong. You found a real EHPS candidate close to the hydraulic target.
But the honest conclusion is:
ZF = promising candidate
Lee = useful Ford-style benchmark
Gate 04 = not closed
Next blocker = supplier confirmation + loaded steering/brake test plan
The next research after this should be FMVSS 105 brake test mapping and loaded low-speed steering test procedure, while the ZF/Ford/Lee supplier questions are waiting.
