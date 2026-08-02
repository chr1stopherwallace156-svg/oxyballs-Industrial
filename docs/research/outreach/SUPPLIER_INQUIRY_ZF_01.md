# Supplier Inquiry — ZF Race Engineering (EPHS MPU 100-C) 01

**Status: DRAFT — AWAITING_OWNER_APPROVAL** (composed by the filter
from the owner's 10-question list in review_20, mirroring the
owner-approved Webasto/Dana letter framing) · **Sent: NOT YET** ·
**Reply: —**

Owner must approve or edit the wording before sending — sending is an
owner action. On approval, change Status to READY_TO_SEND. Archive any
reply 1:1 under `docs/research/raw/supplier_replies/`.

**Candidate reference:** ZF Race Engineering EPHS MPU 100-C factsheet
(CS-53), <https://www.zf.com/products/media/zfraceengineering/about_us_3/downloads_9/ZF_RE_Factsheet_EPHS-MPU-100-C_EN_001508000140_Screen.pdf>.
The factsheet states "No connection to the CAN bus required," so the
diagnostics question (9) is framed accordingly — do not request a
DBC/CAN map unless ZF confirms a different controller variant with CAN
diagnostics.

---

Subject: Technical Application Inquiry — EPHS MPU 100-C Electro-Hydraulic Pump for a Class 4/5 Hydroboost Brake + Steering Assist Evaluation

Hello ZF Race Engineering Application Team,

My company is evaluating the EPHS MPU 100-C electro-hydraulic motor-pump unit as a candidate to supply a combined hydroboost brake-assist and hydraulic power-steering circuit on a Class 4/5 commercial vehicle electrification prototype (the engine-driven power-steering pump is removed in the conversion, so an electric unit must supply both the hydroboost booster and the steering gear simultaneously).

We are not requesting certification approval or final sign-off at this stage. We are requesting application engineering guidance and official technical documentation so our engineering team can determine whether this unit is suitable for further review against the vehicle's hydroboost + steering requirements.

Could you please confirm the following:

1. Current draw as a function of hydraulic pressure and flow (a current-vs-pressure/flow map, if available).

2. Maximum continuous current draw.

3. Maximum peak current draw and the allowed duration at that peak.

4. Duty cycle at the upper operating point (approximately 12 L/min and 124.5 bar).

5. Thermal derating curve (output vs. fluid/ambient temperature and time at load).

6. Whether the unit is suitable to supply a hydroboost brake-assist circuit in addition to a steering gear — i.e. combined brake + steering hydraulic demand.

7. Whether it can handle simultaneous panic braking and low-speed (near lock-to-lock) steering demand without assist dropout.

8. Required reservoir volume, hose sizes, port thread specifications, and approved hydraulic fluid.

9. Available fault-output and diagnostic options. Your factsheet states that no CAN connection is required — please confirm what warning or diagnostic outputs (e.g. discrete fault line, lamp driver, analog signal) the unit provides, and whether a CAN-capable controller variant exists.

10. Recommended fuse, relay, wiring, and low-voltage power-supply sizing for this unit at the stated operating points.

Additionally, is the EPHS MPU 100-C rated or recommended for medium-duty / commercial-vehicle service (continuous high-load operation), or is it intended primarily for motorsport duty cycles?

We would be grateful for any datasheets, application notes, or performance maps you can share. Thank you for your time.

Best regards,
[Owner name / company — to be completed by owner before sending]

---

## Follow-up cadence (owner)

If no response 7 days after sending, follow up; repeat weekly until
answered or redirected. Record Sent date, each follow-up date, and the
reply here. On any reply, archive it 1:1 under
`docs/research/raw/supplier_replies/` before reconciling — it is the
first evidence that can begin to resolve the Gate 04
NeedsCurrentMap / NeedsCommercialDutyReview / NeedsThermalDeratingData /
NeedsHydroboostCompatibilityReview holds on CS-53.
