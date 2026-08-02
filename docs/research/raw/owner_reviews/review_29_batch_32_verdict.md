[Owner framing before the payload — the review_28 recap (park Gate 07C;
Gate 08B = source-backed test-procedure mapping) and the Gate 08B prompt
(for each of the 15 failure modes: best source + exact quote + test stage
+ required equipment + proof artifact + pass/block candidate + missing
supplier data + verification status) with the hard rules (nothing
Confirmed; no compliance; no invented timing thresholds; no live HV) —
"32:75".]

[Owner verdict delivered AFTER the batch-32 payload:]

My response

My verdict: this is the right Gate 08B structure, but it is not actually "completed" yet. It should be marked as source-candidate mapped / needs source validation, because several "Best Source" rows are good leads, but the exact quotes and pass/block rules are not safe to treat as verified yet.
Gate 08:
FMEA_REGISTRY_CREATED ✅

Gate 08B:
SOURCE_CANDIDATE_MAPPING_STARTED ✅
SOURCE-BACKED TEST PROCEDURES NOT FULLY VERIFIED YET ⚠️

Gate 08C:
NOT STARTED
SUPPLIER DATA + ENGINEERING TEST PLAN REQUIRED
The strongest part
The structure is exactly right:
Failure mode
Best source
Test stage
Required equipment
Proof artifact
Pass/block candidate
Missing supplier data
Verification status
That is how the Build Engine should think. Also, keeping the test ladder as:
Simulation -> HIL -> Bench/Dyno -> Low-speed closed-course
is correct. FMVSS 105 is a real braking-performance lane for hydraulic/electric service brakes and parking brakes, but it still needs exact vehicle-category mapping and a brake engineer/test plan.
Biggest correction: "Exact Quote" is too risky
A lot of the quoted standard language looks like a good summary, but I would not let the Build Engine store it as an Exact Quote unless you have the actual standard text in front of you.
Change this field:
Exact Quote
to:
Claim Summary / NeedsExactQuote
Then only upgrade it to ExactQuoteVerified after the official PDF/standard is uploaded, purchased, or directly cited.
Correct source status:
SAE / ISO / UL paid standard quote:
NeedsExactQuote
NeedsPageSectionTable
Do not use as final rule until verified
Source-by-source cleanup
1. HVIL Open / SAE J1742
Good failure mode. Good equipment. Good proof artifact.
But the exact quote and timing rule need downgrade.
Status:
SourceCandidate / NeedsExactStandardText / NeedsSupplierTimingData

Allowed:
HIL test planning
oscilloscope proof artifact planning

Blocked:
final timing pass/fail
compliance claim
live HV vehicle test
2. Isolation Resistance Fault
This row is strong, but keep the context split.
100 Ohm/V DC:
RegulatoryReferenceCandidate

500 Ohm/V AC:
RegulatoryReferenceCandidate

Final BMS threshold:
NeedsSupplierData / NeedsSystemContext
ISO 6469-3 is a real electrical-safety source for voltage class B propulsion circuits and connected auxiliary circuits, and it focuses on protection against electric shock and thermal incidents.
3. Contactor Weld / SAE J2344
Good failure mode, but do not treat the quote as verified.
Best Source:
SAE J2344 = SourceCandidate

Required stronger source:
contactor supplier datasheet
VCU/BMS power-up diagnostic logic
PDU supplier contactor weld detection method
Keep the pass/block candidate. It is logically correct.
4. Pre-Charge Failure / ISO 6469-3
The failure mode is correct, but ISO 6469-3 may be too broad for the exact pre-charge timeout behavior. The final timeout needs inverter/DC-link capacitance and supplier control logic.
Status:
EngineeringPrincipleCandidate
NeedsPowerElectronicsSupplierData
NeedsDCLinkCapacitance
NeedsPreChargeTimerCurve
5. Battery Overcurrent / SAE J2464 + UL 2580
This is a strong source lane. SAE J2464 is used for RESS safety and abuse testing, and it covers cells, modules, and packs across vehicle applications. UL 2580 covers safety aspects of EV battery system design, construction, installation, and operation, including hazards like electric shock and fire.
Correct status:
Source lane: strong
Final threshold: NeedsCellSupplierData
Test stage: simulation / HIL only until approved lab test
6. Inverter Shutdown During Regen
Good row, but ISO 26262 is not a direct brake test procedure. It is a functional-safety development framework. The exact safe-state, FTTI, and torque-decay rules must come from the item definition, hazard analysis, safety goals, and supplier controls.
ISO 26262:
FunctionalSafetyFrameworkCandidate

Needs:
brake engineer mapping
inverter torque decay data
VCU safety concept
dyno test plan
7. ABS / ESC Interaction with Regen Loss
This is important, but the source needs cleanup. ECE R13-H is mainly passenger-car braking, while your F-450/F-550 Class 4/5 lane needs FMVSS 105 and possibly heavy-vehicle-specific brake engineering review depending on configuration.
Best Source:
FMVSS 105 / brake engineer mapping / Ford ABS system data

Downgrade:
ECE R13-H = ContextCheckNeeded
Also change this:
transferring complete slip control to the hydraulic brakes
to:
regen torque is removed or reduced so friction braking and factory ABS/ESC logic are not opposed by drive-axle motor torque.
8. EHPS Pump Failure
This source row is weak. ISO 5010 is for earth-moving machinery, and FMVSS 121/135 are not the clean steering source for your Class 4/5 hydroboost steering problem.
Better:
Best source:
Ford steering system source
ZF EHPS supplier data
hydroboost/steering specialist test plan
SAE/ISO steering standard only if exact road-vehicle applicability is verified

Status:
NeedsBetterSource
NeedsPhysicalVerification
The failure mode itself is correct. The source match is the problem.
9. Brake Assist Pressure Loss
This is one of the strongest rows. FMVSS 105 is the right lane because it covers hydraulic/electric service brake systems and associated parking brake systems.
Keep it, but status should be:
RegulatoryTestLane
NeedsBrakeEngineerMapping
NeedsHydroboostAccumulatorData
NeedsPedalForceInstrumentation
10. Steering Assist Pressure Loss
Good failure mode, but SAE J2672 needs verification before you treat it as the best source.
Status:
SourceCandidate / NeedsExactStandardVerification

Better immediate sources:
ZF EHPS data
Ford steering gear data
hydraulic pressure sensor supplier scaling
physical bench pressure-decay test
11. Low-Voltage DC-DC Brownout
Good source lane. ISO 16750-2 is the right family for automotive electrical loads, voltage drops, interruptions, and related electrical-load testing. The exact Ford module voltage cutoffs still need OEM/supplier data.
Status:
StrongTestFrameworkCandidate
NeedsFordModuleVoltageThresholds
NeedsDC_DCTransientResponseData
12. Coolant Pump Failure
This needs downgrade. IEC 60529 and ISO 16750-4 are environmental/climatic protection lanes, not direct coolant-pump failure logic.
Better source:
pump supplier datasheet
inverter/battery thermal derating data
thermal controller diagnostic logic
coolant flow sensor supplier data

Status:
NeedsThermalSupplierData
13. Battery/Inverter/Motor Overtemperature
Good failure mode. But do not rely on a generic standard for exact derating behavior.
Status:
ThermalDeratingFrameworkCandidate
NeedsBatterySupplierCurve
NeedsInverterSupplierCurve
NeedsMotorSupplierCurve
14. CAN Communication Loss
SAE J1939-21 / ISO 11898 are useful network-source lanes, but they do not automatically define your safe state. The safe state comes from the VCU/BMS/inverter control strategy.
Protocol source: J1939 / ISO 11898
Safe-state rule: NeedsControlsArchitecture
Timeout values: NeedsSupplierData
15. Water Intrusion / IP Seal Failure
This row is strong, with one correction: pressure-decay leak testing is not automatically the same thing as IP67/IP69K certification. It can be a production-quality or engineering leak-screen method, but formal IP validation needs the correct ISO 20653 test method or lab documentation.
ISO 20653 applies to IP-code protection for electrical equipment enclosures on road vehicles against foreign objects, water, and access.
Correct status:
ISO 20653:
StrongSourceLane

Pressure decay:
ProductionScreenCandidate / NeedsCorrelationToIPTest

Final proof:
Certified lab IP67/IP6K9K/IP69K report or supplier certification
The biggest status correction
This part is too optimistic:
Gate 08B: COMPLETED
Use this instead:
Gate 08B:
SOURCE_CANDIDATE_MAPPING_COMPLETE
EXACT_QUOTE_VERIFICATION_REQUIRED
SUPPLIER_PARAMETER_DATA_REQUIRED
TEST_PROCEDURE_FINALIZATION_BLOCKED
And:
Gate 08C:
NOT STARTED
Requires:
- verified exact source text
- supplier thresholds
- engineering test plan
- LOTO/PPE/ESD procedure
- proof artifact templates
Clean corrected Build Engine status
Gate 08 - FMEA Registry:
CREATED

Gate 08B - Source-Backed Test Procedure Mapping:
SOURCE_CANDIDATES_MAPPED
NOT FINAL
NEEDS_EXACT_QUOTES
NEEDS_PAGE_SECTION_TABLE
NEEDS_SUPPLIER_THRESHOLDS
NO LIVE_HV_TESTING_APPROVED
NO_TRACK_TESTING_APPROVED
NO_COMPLIANCE_CLAIMS

Gate 08C - Final Validation:
NOT STARTED
Should you move to Gate 05 now?
Yes, but with this label:
Gate 08B is parked, not closed.
Move to Gate 05 in parallel while waiting on exact standards, supplier data, and engineering review.
Bottom line: the structure is excellent. The issue is not the workflow. The issue is source authority. Most of this should be stored as:
SourceCandidate / TestMethodCandidate / NeedsExactQuote / NeedsSupplierData
not:
Completed / Verified / Final Test Rule
