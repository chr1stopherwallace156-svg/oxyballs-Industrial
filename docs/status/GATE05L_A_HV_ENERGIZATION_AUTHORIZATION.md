# CONTROLLED HV FIRST-ENERGIZATION AUTHORIZATION & SAFETY READINESS (Gate 05L-A)

The first rung of the split Gate 05L in the staged post-bench gate ladder
(Decision Register D-008, amended review_50/51) for the F-450/F-550 EV
conversion (Gate 05L-A, batch_54 + owner review_51). Gate 05L-A is the **first
gate that contemplates live high voltage** — but it is a strict
**pre-energization authorization gate only. NO HIGH VOLTAGE IS ENERGIZED.** It
establishes the mandatory safety infrastructure, personnel qualifications, and
technical prerequisites that must be satisfied, signed off, and archived
before any HV lockout is removed. It decides only whether the system is
*allowed to attempt* Gate 05L-B — it does not energize (owner review_51).

**Permanent rule (owner review_51):** *No high-voltage potential may be
introduced to the vehicle chassis until every line item in this authorization
gate is physically verified, signed off, and archived.*

**Status (owner review_51): `HV_AUTHORIZATION_GATE_CREATED` /
`NO_HV_ENERGIZATION` / `QUALIFIED_PERSONNEL_REQUIRED` / `LOTO_REQUIRED` /
`LIVE_DEAD_LIVE_REQUIRED` / `PPE_VOLTAGE_RATING_REVIEW_REQUIRED` /
`INSULATED_TOOLING_REQUIRED` / `IMD_READINESS_REQUIRED` /
`ESTOP_HARDWIRED_PROOF_REQUIRED` / `PRECHARGE_OWNERSHIP_PENDING_CONFIRMATION` /
`CONTACTOR_OWNERSHIP_PENDING_CONFIRMATION` / `SUPPLIER_DOCS_REQUIRED` /
`EMERGENCY_RESPONSE_PLAN_REQUIRED` / `ENGINEERING_SIGNOFF_REQUIRED`.** Ladder:
**05J (fitment) → 05K (LV power-on, no-HV) → 05L-A (HV authorization, THIS
GATE — no energization) → 05L-B (controlled HV first-energization /
current-limited pre-charge observation, engineer-approved only)** (D-008,
amended review_51).

## Regulatory grounding (owner review_51, NeedsExactSource)

Owner-cited, owner-paraphrased — **not yet archived; NeedsExactSource** (see
open owner decision 13): OSHA's electrical work-practice standard — only
qualified persons may work on circuit parts/equipment not de-energized, and
they must understand safe work techniques, PPE, insulating materials, and
insulated tools; OSHA lockout/tagout — control of hazardous energy during
servicing/maintenance where unexpected energization could injure. NHTSA EV
guidance — assume EV HV batteries/components may be energized; exposed HV
components present shock hazards; EV battery incidents may involve
toxic/flammable gases and delayed ignition/re-ignition. These bind the gate
but no threshold here is a Confirmed rule until the official documents are
archived.

## Value doctrine (owner review_51) — read first

Every numeric value here is an **`INITIAL_TARGET_PROFILE /
ENGINEERING_REVIEW_REQUIRED`** input, not a rule: ≥3 m exclusion radius, the
`INITIAL_AVV_ABORT_TARGET` >0.5 V abort (RC-241), ±5% pre-charge cold
resistance, >0.2 V contactor-leakage abort, ≥800 V DC personnel-rating
reference. **PPE and instrument ratings are voltage-matched to the actual pack
maximum + transient voltage after the site electrical-safety review (RC-239),
never assumed universal.** Final insulation and pre-charge thresholds are
pending the supplier documents + engineering review (RC-243).

---

## 1. Personnel, environment, and emergency infrastructure

- **Qualified / authorized HV personnel (RC-238, not "certified technicians"):**
  a minimum of **two qualified and authorized HV personnel**. Required role
  evidence: documented HV training · task authorization · equipment-specific
  training · emergency-response briefing · assigned lead technician · assigned
  safety observer / safety buddy. The safety buddy stays outside the flash
  boundary with an insulated rescue hook and line-of-sight to the primary
  technician. (Owner: "certified" is ambiguous without a certification body.)
- **Exclusion zone (INITIAL_TARGET_PROFILE):** a physical perimeter barrier
  ≥3 m radius from the outermost vehicle body panel, marked with HV warning
  placards, with clear emergency egress.
- **Fire / emergency response (RC-240):** assets are **selected by the
  facility safety officer / AHJ / fire marshal** based on battery chemistry,
  pack size, test configuration, and the **supplier emergency response
  guide** — lithium-ion response is *not* simply "a Class D extinguisher."
  The fire watch must include: emergency shutoff plan · evacuation route ·
  upwind/uphill staging (where applicable) · direct 911/fire-department
  protocol · battery supplier ERG · post-event quarantine / re-ignition
  monitoring plan.
- **Emergency response plan:** a written, approved rescue plan posted at the
  workspace entry — facility power drops, eye-wash stations, direct EMS
  contact protocols.

## 2. PPE & insulated tooling (RC-239 — voltage-matched, not universal)

- **Dielectric gloves:** **Class 0 (1000 V) minimum only if the system
  maximum voltage and task exposure are within that rating.** The final PPE
  class must match the pack maximum voltage, possible transient voltage, and
  the site electrical-safety review. **If the system exceeds the glove/tool
  rating, this gate must block.** Gloves get an inflation leak test
  immediately before the sequence; worn with leather protectors + arc-flash
  face shields + FR outerwear.
- **Insulated tooling:** VDE / 1000 V (or higher, voltage-matched) certified
  insulated hand tools for any terminal manipulation.
- **Test instrument calibration:** multimeters, insulation testers (Meggers),
  HV differential scope probes carry active NIST-traceable calibration
  certificates; meters rated to the exposure (CAT III 1000 V / CAT IV 600 V
  minimum, matched up per the review).

## 3. Mechanical & pre-power electrical audit

- **Absence-of-Voltage Verification / Live-Dead-Live (RC-241):** before any
  lock is removed from the battery-enclosure service disconnects, verify no
  voltage between all exposed HV points and chassis ground. **Use an approved
  proving / known source appropriate to the meter function and range being
  used, per the site electrical-safety procedure** (not merely a 12 V
  source). Acceptance = **below the approved absence-of-voltage threshold,
  considering meter resolution/noise** (not "exactly 0.0 V"). **Any unexpected
  non-zero voltage triggers a hard stop.** The >0.5 V figure is
  `INITIAL_AVV_ABORT_TARGET / ENGINEERING_REVIEW_REQUIRED`.
- **Stored-energy discharge wait (RC-242):** after any HV exposure or failed
  energization attempt, **wait the supplier-defined discharge interval** before
  touching or measuring internal HV nodes, then re-verify bus voltage with
  Live-Dead-Live before access. (Inverter DC-link capacitors can remain
  charged after the battery is isolated.)
- **HV cable & connector integrity:** every orange HV cable audited — shield
  terminations bonded to enclosures, bend radii per supplier spec, all
  connectors fully engaged with secondary locks (CPA) seated.
- **Supplier documentation package:** compile + review component datasheets,
  pre-charge resistor thermal limits, contactor maximum break-current ratings,
  and IMD firmware manuals to establish baseline operational ranges.

---

## Gate 05L-A verification matrix (safety readiness — NO energization)

All values are `INITIAL_TARGET_PROFILE` unless a supplier document/engineering
review has upgraded them. No test in this gate energizes the HV bus.

| Test | Safety domain | Prerequisite | Procedure | Expected safe outcome | Hard stop (IMMEDIATE ABORT) | Proof |
|---|---|---|---|---|---|---|
| 05L-A-001 | qualified personnel | roles mapped (lead tech, safety buddy, test engineer) — RC-238 | audit HV training, task authorization, equipment-specific training, emergency-response briefing, first-aid logs | all personnel qualified + authorized for the actual pack working voltage (≥800 V DC reference target) | any unqualified person in the workspace / safety buddy absent or distracted | signed training log + role-assignment roster |
| 05L-A-002 | PPE & tool certification | voltage-matched gloves + insulated tools + calibrated meters (RC-239) | visual audit + glove inflation leak test; confirm calibration stickers; confirm ratings ≥ pack max + transient | no cuts/tears/pinholes; insulation intact; unexpired calibration; ratings cover the exposure | defective/unrated insulation / expired calibration / rating below system voltage | inspection sheet with meter serials + expiry |
| 05L-A-003 | exclusion perimeter | hard barrier around the vehicle | deploy barricade; measure radius from outermost body panel | continuous perimeter ≥3 m (initial target) with danger placards + clear egress | unauthorized entry / blocked emergency egress | wide-angle photo of the test cell |
| 05L-A-004 | Live-Dead-Live absence check | lockouts closed; probe HV terminals (RC-241) | prove meter on an approved source → probe HV terminals (dead) → re-prove on the approved source, per site procedure | HV nodes below the approved AVV threshold (meter resolution/noise considered) | unexpected non-zero voltage (INITIAL_AVV_ABORT_TARGET >0.5 V) / tester fails proving | timestamped meter-display photos |
| 05L-A-005 | IMD readiness | IMD logic-power checkout (RC-243) | power the LV network (Gate 05K state); interrogate the IMD via diagnostics | IMD reports no internal error + isolation status within the **supplier-defined acceptable range** (final thresholds pending supplier manual + system voltage + engineering review + standard mapping) | IMD internal error / comms failure on the IMD line | diagnostic trace of IMD status registers |
| 05L-A-006 | hardwired E-stop verification | LV safety interlock loop test | actuate every E-stop + the crash inertia switch sequentially | VCU registers the open loop and drops all contactor command outputs to 0.0 V (measured latency vs schematic, RC-175) | contactor drive pins retain leakage voltage (>0.2 V target) on E-stop | scope pin-capture of the drop to ground |
| 05L-A-007 | pre-charge loop integrity (LOW-VOLTAGE ONLY, RC-244) | pre-charge paths + ownership | verify pre-charge control-line assignments in firmware; measure **cold** resistance of the pre-charge resistor loop; **low-voltage logic/coil verification only** | resistance within ±5% of nominal (target); control relay responds to LV commands — **no HV bus charging, no DC-link rise, no live pre-charge event** | open/shorted resistor path / unmapped control-logic ownership / any DC-link voltage rise | resistance log + firmware config dump |

## Hard-stop conditions (owner review_51 — IMMEDIATE ABORT)

The gate hard-stops if: an unqualified person enters the exclusion zone · the
safety buddy is absent · PPE/tool rating is missing, expired, or below the
system voltage · meter calibration is expired · Live-Dead-Live fails ·
unexpected voltage is detected · the IMD reports a fault or cannot communicate
· an E-stop does not remove the low-voltage contactor command path ·
pre-charge/contactor ownership is unclear · supplier documentation is missing
· the emergency response plan is not posted · the fire watch / safety observer
is not assigned.

## Gate 05L-A exit criteria (owner review_51)

The system cannot exit Gate 05L-A — and is **blocked from any physical HV
energization** — unless:

1. All qualified/authorized personnel are verified, assigned to distinct
   safety roles, and positioned in the cell (RC-238).
2. The exclusion zone is locked down with fire/emergency assets selected per
   chemistry/pack/config/supplier ERG and ready (RC-240).
3. The Live-Dead-Live absence-of-voltage check confirms all accessible nodes
   below the approved AVV threshold, using an approved proving source (RC-241).
4. All voltage-matched PPE and test gear pass inspection and show unexpired
   calibration (RC-239).
5. The hardwired safety interlock loops provide a **direct hardware** breakdown
   of contactor power when tripped (VCU requests, hardwired loop owns the
   interruption — RC-205/227).
6. The stored-energy discharge-wait rule and IMD supplier-defined range are
   documented (RC-242/243), and the pre-charge test was low-voltage-only with
   no DC-link rise (RC-244).
7. All signed checklists, calibration numbers, safety plans, and pre-test scan
   logs are permanently archived.

**Successful Gate 05L-A completion permits signed engineering authorization to
proceed to Gate 05L-B only** (Controlled HV First-Energization / Current-
Limited Pre-Charge Observation). It authorizes **no energization by itself**;
live HV proceeds only after engineer signoff + safety-protocol activation.
(Never "certified safe," RC-224.)

## Standing checks

- **NO HV energized in this gate** — 05L-A is authorization only (owner
  review_51). Personnel are *qualified/authorized*, not vaguely "certified"
  (RC-238); PPE + tools are voltage-matched to the actual pack, and the gate
  blocks above their rating (RC-239); fire/emergency assets are AHJ/supplier-
  ERG-selected (RC-240); Live-Dead-Live uses an approved proving source with a
  resolution-aware threshold, not "0.0 V" off a 12 V source (RC-241); the
  stored-energy discharge wait guards DC-link caps (RC-242); IMD thresholds
  are supplier-defined (RC-243); the pre-charge test is low-voltage-only —
  no DC-link rise (RC-244). The VCU requests but does not own HV isolation —
  the hardwired loop owns physical interruption (RC-205/227; BQ-27);
  pre-charge/contactor ownership stays pending the BMS/PDU supplier
  architecture (BQ-27). OSHA/NHTSA citations are NeedsExactSource until the
  official documents are archived (RC-237/238..244).
- **Nothing ingested; nothing Confirmed; no "certified safe"/compliance
  claim; no HV energization; ODRs untouched.**

## Next — Gate 05L-B (Controlled HV First-Energization / Current-Limited Pre-Charge Observation)

Owner review_51: after this cleanup, Gate 05L-B is the **first controlled
live-HV sequence** — but it must **not** start with final timing values. Start
with: **supplier-defined pre-charge target · supplier-defined timeout ·
current-limited setup · remote observation** — and **no vehicle movement · no
wheels-on-ground drive · no road test · no traction command · no customer
operation.** Gate 05L-B may only be attempted after a signed engineering
authorization out of Gate 05L-A.
