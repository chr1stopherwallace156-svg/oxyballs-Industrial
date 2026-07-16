# Supplier Inquiry — Dana/TM4 01

**Status: DRAFT — AWAITING_OWNER_APPROVAL** (composed by the filter
from the owner's required-answer field list, review_11 + review_14,
mirroring the owner-approved Webasto letter's framing) · **Sent: NOT
YET** · **Reply: —**

Owner must approve or edit the wording before sending — sending is an
owner action. On approval, change Status to READY_TO_SEND. Archive any
reply 1:1 under `docs/research/raw/supplier_replies/`.

---

Subject: Technical Application Inquiry — TM4 SUMO MD Candidate Integration for a Class 4/5 Commercial Vehicle Electrification Evaluation

Hello Dana/TM4 Application Engineering Team,

My company is evaluating the Dana TM4 SUMO MD motor/inverter system for a Class 4/5 commercial vehicle electrification prototype planning process.

The candidate battery system under review is the Webasto Standard Battery Pro 40 platform (candidate preliminary topology under review: 2s2p / 800 V, four modules). The target traction profile is approximately:

- 130 kW continuous traction power
- 250–265 kW transient peak traction power
- Candidate system architecture: 400 V or 800 V

We are not requesting certification approval or final vehicle sign-off at this stage. We are requesting application engineering guidance and official technical documentation so our engineering team can determine whether this drive architecture is suitable for further review.

Could you please advise on the following:

1. What is the exact DC input voltage range for the SUMO MD inverter appropriate to this application, and is there a preferred 400 V or 800 V configuration for the stated power targets?

2. What is the continuous DC input current at the stated continuous power level, under your standard thermal conditions?

3. What is the peak DC input current and its allowed duration at the stated peak power level?

4. What is the DC-link capacitance of the inverter, as needed for external pre-charge circuit design?

5. Does the SUMO MD inverter manage pre-charge internally (software or integrated hardware), or must pre-charge be provided externally by the battery interface or a vehicle-side PDU? If external, what pre-charge completion criteria does the inverter require before main contactor closure?

6. Do you have a recommended fuse / main contactor / power distribution (PDU) layout or application note for this system at these power levels?

7. What are the required coolant flow rate, pressure drop, maximum inlet temperature, and thermal derating behavior for the motor and inverter?

8. What are the dry masses of the motor and inverter (separately, if applicable), and are mounting/driveline application guidelines available?

9. Can you provide the J1939/CAN integration documentation (DBC file, PGN/SPN list, fault outputs to be monitored), or the NDA process to obtain it?

10. For a target of approximately 130 kW continuous / 250–265 kW peak, what battery current capability and voltage window do you recommend on the DC side?

Thank you. We are trying to determine whether this architecture is appropriate for a formal engineering review before any fabrication or vehicle integration work begins.

---

## Thermal addendum (owner-authored, review_15 — append to the letter when sending)

For the SUMO MD motor/inverter system, please provide:

1. motor heat rejection at 130 kW continuous output
2. inverter heat rejection at 130 kW continuous output
3. heat rejection at 250–265 kW peak output
4. coolant inlet temperature limit
5. coolant outlet temperature limit
6. required motor flow and pressure drop
7. required inverter/MCU flow and pressure drop
8. recommended serial vs parallel cooling layout
9. thermal derating map vs coolant temperature and ambient temperature
10. coolant pump/radiator/chiller recommendations

## Field coverage check (owner's required-answer list, review_14)

| Required field | Question # |
|---|---|
| Inverter DC input voltage range | 1 |
| Continuous DC input current | 2 |
| Peak DC input current | 3 |
| DC-link capacitance | 4 |
| Pre-charge requirement | 5 |
| Recommended fuse/contactor/PDU layout | 6 |
| Coolant flow / pressure drop | 7 |
| Motor + inverter mass | 8 |
| (CAN/faults — from review_11 list) | 9 |
| (Recommended battery capability — owner combined question) | 10 |
