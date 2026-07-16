# Supplier Inquiry — Webasto 01

**Status: READY_TO_SEND** (owner-approved wording, review_13,
2026-07-15) · **Sent: NOT YET** · **Reply: —**

Owner-authored supplier-ready version (supersedes the batch_18 draft,
whose "selected/approve/eliminates throttling" language was softened —
see filter register §25). Update the Status line when sent; archive
any reply 1:1 under `docs/research/raw/supplier_replies/` — a supplier
email is the first evidence class that can start resolving B-003/B-004.

---

Subject: Technical Application Inquiry — Standard Battery Pro 40 Configuration for Dana TM4 SUMO MD Candidate Integration

Hello Webasto Commercial Vehicle Battery Systems Team,

My company is evaluating the Webasto Standard Battery Pro 40 system for a Class 4/5 commercial vehicle electrification prototype planning process.

The candidate traction drive under review is the Dana TM4 SUMO MD system. The target traction profile is approximately:

- 130 kW continuous traction power
- 250–265 kW transient peak traction power
- Minimum energy target: 120 kWh or higher
- Candidate system architecture: 400 V or 800 V
- Candidate preliminary topology under review: 2s2p / four Standard Battery Pro 40 modules

We are not requesting certification approval or final vehicle sign-off at this stage. We are requesting application engineering guidance and official technical documentation so our engineering team can determine whether this battery architecture is suitable for further review.

Could you please advise on the following:

1. For this load profile, should the Standard Battery Pro 40 system be integrated through the Vehicle Interface Box, Vehicle Interface Gateway, or Vehicle Interface Gateway Plus?

2. Does Webasto have an application-approved configuration or integration guideline for a 2s2p / 800 V arrangement using four Standard Battery Pro 40 modules?

3. What is the certified system-level continuous discharge current for the recommended interface and pack topology, especially in high-ambient chassis conditions around 50°C?

4. What is the certified system-level peak discharge current and allowed duration for the recommended configuration?

5. Can Webasto provide the pack internal resistance, worst-case bolted short-circuit current, or fuse coordination data needed for downstream main traction fuse selection?

6. Does the recommended Webasto interface provide integrated pre-charge control for an external traction inverter, or must pre-charge be managed externally inside the vehicle-side PDU?

7. Can Webasto provide the J1939 integration guide, DBC file, PGN/SPN list, or NDA process for CAN communication documentation?

8. Can Webasto confirm whether the 10 L/min coolant flow and pressure drop values are per pack, and how those requirements should be handled across a 2s2p multi-pack cooling manifold?

9. Are there any Webasto application notes, integration manuals, mounting guidelines, HV cable recommendations, fuse/contactor recommendations, or thermal derating curves available for this configuration?

Thank you. We are trying to determine whether this architecture is appropriate for a formal engineering review before any fabrication or vehicle integration work begins.

---

## Status block (owner, review_13)

- SupplierQuestionSet: **READY_TO_SEND**
- PowertrainCompatibility: BLOCKED_PENDING_SUPPLIER_REPLY (B-003)
- HVWiringCalculations: HALTED
- PackTopology: Candidate 2s2p / 800 V (RC-60 — candidate only)
- InterfaceChoice: OpenGap — VIB vs VIG/VIG Plus (B-004)
- PreChargeResponsibility: OpenGap
- Isc/FuseCoordination: OpenGap
- CANIntegration: OpenGap
- CoolingManifold: OpenGap
