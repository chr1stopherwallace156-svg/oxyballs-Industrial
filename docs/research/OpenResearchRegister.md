# OPEN RESEARCH REGISTER

Register of OpenDataRequirements (ODRs): engineering data that is
required but not yet backed by evidence. Per the
[Engineering Constitution](../ENGINEERING_CONSTITUTION.md) (Article VII),
unknown data is never guessed — it is registered here and blocks
dependent work until resolved.

Entries are append-only. Resolution is recorded on the entry with a
reference to the evidence; entries are never deleted.

**Entry format:**

```
## ODR-NNN — <what data is required>
- Filed: YYYY-MM-DD
- Status: Open | Resolved (YYYY-MM-DD)
- Blocks: what work cannot proceed without it
- Resolution evidence: reference (when resolved)
```

---

> **Resolution gate for ODR-001..ODR-003 (owner-imposed, 2026-07-15):**
> none of these three entries may be marked resolved until every
> Revision 07 source batch is processed, all recorded contradictions
> are reviewed, the
> [Revision 07 Baseline Index](../specifications/rev07/00_BASELINE_INDEX.md)
> is complete, **and the owner explicitly approves the resolution**.
> Full conditions:
> [REV07_SOURCE_INGESTION](../roadmaps/REV07_SOURCE_INGESTION.md).

## ODR-001 — Revision 07 state machine definitions

- Filed: 2026-07-15
- Status: Open
- Blocks: Revision 07 modules (see Baseline Index); all of M10.
- Resolution evidence: —

## ODR-002 — Revision 07 normalized schema definitions

- Filed: 2026-07-15
- Status: Open
- Blocks: Revision 07 modules (see Baseline Index); M10 schema layer.
- Resolution evidence: —

## ODR-003 — Revision 07 guardrail, evidence, and configuration-locking requirements

- Filed: 2026-07-15
- Status: Open
- Blocks: Revision 07 modules (see Baseline Index); M10 evidence store
  and configuration lock storage.
- Resolution evidence: —

---

> **Platform 001 Build Package v0.1 open-data requirements (ODR-004..ODR-010).**
> These are surfaced deterministically by the build-package generator
> (`npm run platform001:generate`) as the DB-level `OpenDataRequirement` rows for
> the locked Platform 001 configuration. They are **engineering-data** requirements
> for one specific donor platform and are **entirely distinct from ODR-001..ODR-003**
> (the gated Revision 07 governance ODRs, which remain untouched). None of these may
> be resolved by guessing a value; each requires the evidence named, tied to a
> confirmed donor identity (BQ-27). Resolving them does NOT resolve ODR-001..003 and
> does NOT open M11.

## ODR-004 — Baseline front axle weight (2019 F-450 SD Chassis Cab, RegCab 4x2 DRW)

- Filed: 2026-07-22
- Status: Open
- Blocks: axle-loading analysis; traction-battery/motor mass budgeting; Platform 001 package release.
- Resolution evidence: — (Ford door-jamb label / body-builder guide, or calibrated scale measurement)

## ODR-005 — Baseline rear axle weight (2019 F-450 SD Chassis Cab, RegCab 4x2 DRW)

- Filed: 2026-07-22
- Status: Open
- Blocks: axle-loading analysis; Platform 001 package release.
- Resolution evidence: — (Ford door-jamb label / body-builder guide, or calibrated scale measurement)

## ODR-006 — GVWR (2019 F-450 SD Chassis Cab, RegCab 4x2 DRW)

- Filed: 2026-07-22
- Status: Open
- Blocks: load-budget checks; Platform 001 package release.
- Resolution evidence: — (Ford door-jamb label / body-builder guide)

## ODR-007 — Physical frame geometry measurement of the donor

- Filed: 2026-07-22
- Status: Open
- Blocks: mounting-envelope analysis; Platform 001 package release. Nominal
  geometry (wheelbase 145.3 in, cab-to-axle 60 in) is the owner-locked reference,
  NOT a physical measurement.
- Resolution evidence: — (calibrated physical measurement on the donor)

## ODR-008 — Traction-motor dimensions

- Filed: 2026-07-22
- Status: Resolved (2026-08-08)
- Resolution evidence: `SRC-DANA-000001` — Dana TM4 official public specification sheet
  `CORTM4-JRT2495-SUMOMD-0124`, archived at
  `docs/research/raw/platform001_primary_sources/`, sha256
  `e3f3f9ba1b9e204a003fee3e300bab64da105dce622d86a4285984ba2144af28`. Motor Ø 400 mm; casing L1
  length 426 mm, casing L2 length 510 mm (SC-024). Inverter CO150 432 x 304 x 111 mm,
  CO200 676 x 450 x 135 mm (SC-025).
- Note: which casing applies is fixed by variant selection, which remains open under
  ODR-012. Values are published, not yet confirmed by NONENERGIZED_PHYSICAL_METROLOGY.
- Blocks: motor mounting/packaging compatibility; Platform 001 package release.

## ODR-009 — Traction-motor mass

- Filed: 2026-07-22
- Status: Resolved (2026-08-08)
- Resolution evidence: `SRC-DANA-000001` — Dana TM4 official public specification sheet
  `CORTM4-JRT2495-SUMOMD-0124`, archived at
  `docs/research/raw/platform001_primary_sources/`, sha256
  `e3f3f9ba1b9e204a003fee3e300bab64da105dce622d86a4285984ba2144af28`. Casing L1 180 kg, casing L2
  225 kg (SC-024); inverter CO150 13 kg, CO200 25 kg (SC-025).
- Note: which casing/inverter pair applies is fixed by variant selection, which remains
  open under ODR-012. Published values, not calibrated measurements.
- Blocks: axle-loading analysis; Platform 001 package release.

## ODR-010 — Traction-motor supplier documentation (verification)

- Filed: 2026-07-22
- Status: Resolved (2026-08-08)
- Resolution evidence: `SRC-DANA-000001` — Dana TM4 official public specification sheet
  `CORTM4-JRT2495-SUMOMD-0124`, archived at
  `docs/research/raw/platform001_primary_sources/`, sha256
  `e3f3f9ba1b9e204a003fee3e300bab64da105dce622d86a4285984ba2144af28`. The sheet is now held locally
  and used without network dependency. Claims recorded as SC-022 … SC-027.
- Note: the document does NOT publish DC-link capacitance, coolant flow rate, coolant
  pressure drop, efficiency map, DC input current, or the CAN/torque-command map. Those
  remain UNKNOWN and are not resolved by this entry.
- Blocks: any motor candidate leaving UNVERIFIED; Platform 001 package release.

## ODR-011 — DANA_PRIMARY_ARTIFACT_NOT_YET_ARCHIVED_LOCALLY

- Filed: 2026-08-08
- Status: **Resolved (2026-08-08)**
- Original state: `DANA_PRIMARY_ARTIFACT_NOT_YET_ARCHIVED_LOCALLY`. Official public Dana
  evidence was always known to exist externally; this entry recorded only that it had not
  yet been archived into this repository as a local primary source.
- Resolution evidence: owner supplied the document; archived as `SRC-DANA-000001` at
  `docs/research/raw/platform001_primary_sources/SRC-DANA-000001_CORTM4-JRT2495-SUMOMD-0124.pdf`
  with acquisition manifest. `source = Dana TM4 official public specification sheet`,
  `document ID = CORTM4-JRT2495-SUMOMD-0124`, `authority = OFFICIAL_PUBLIC_DOCUMENT`,
  `sha256 = e3f3f9ba1b9e204a003fee3e300bab64da105dce622d86a4285984ba2144af28`,
  `retrieval date = 2026-08-08`. Used locally thereafter; no network dependency.
- Provenance caveat recorded in the manifest: the archived byte stream is an owner-supplied
  browser render (Producer `iOS ... Quartz PDFContext`), not Dana's originally served file.
  The content carries document ID `CORTM4-JRT2495-SUMOMD-0124` and the Dana copyright line.
  The SHA-256 fixes the archived artifact and must not be presented as the digest of Dana's
  own hosted PDF.
- Also resolves: ODR-008, ODR-009, ODR-010.
- Claims recorded: SC-022 … SC-027.

## ODR-012 — Governed Platform 001 F-450 duty / performance requirement

- Filed: 2026-08-08
- Status: **Partially resolved (2026-08-08)** — 5 of the 7 required elements are now stated
- Partial resolution evidence: owner-issued design requirements adopted as SC-035
  (`OWNER_DESIGN_REQUIREMENT`): `TARGET_GVWR` 16,000 lb; `TOWING_REQUIREMENT` NONE for v1;
  `MAXIMUM_ROAD_SPEED_TARGET` 70 mph; `SUSTAINED_HIGHWAY_SPEED_TARGET` 65 mph;
  `SUSTAINED_GRADE` 6 % @ 55 mph for 20 min; `LOW_SPEED_GRADE` 15 % @ 15 mph;
  `STARTABILITY_GRADE` 20 %. Screening executed against these in
  `PLATFORM_001_DANA_VARIANT_SCREENING_v0.1.md` (D-035).
- **Still not stated, so this entry stays open:** (a) payload target — the split of payload
  between body, cargo and HV system; (b) duty-cycle / drive-cycle basis; (c) ambient
  operating envelope. A duration is given only for `SUSTAINED_GRADE`; `LOW_SPEED_GRADE`
  carries none, so it is screened against both the continuous and the peak rating.
- Effect of the partial resolution: gates S2a, S2b, S3, S3b and S4 became executable and
  eliminated six of the ten variants. The remaining blocker to a selection is **not** this
  entry — it is ODR-018 (HV-variant output at 333–407 Vdc), with ODR-015 second.
- Blocks: selection of any exact SUMO MD variant. A variant cannot be chosen against
  "Class 4–7" alone; selection needs a governed statement of at least: GVWR/GCWR basis,
  payload target, gradeability (grade % at speed, loaded), sustained-speed requirement,
  duty cycle / drive-cycle basis, required continuous vs peak power duration, and the
  ambient envelope. Without it there is no criterion to rank variants, and comparing a
  10-second pack rating against a peak of unpublished duration is not a decision.
- Why not already resolved: ODR-004…ODR-010 cover axle weights, GVWR, frame geometry and
  motor documentation. None of them states a duty or performance requirement, and no such
  requirement is recorded anywhere in `docs/`.
- Resolution evidence: — (owner-issued duty/performance requirement recorded as a governed
  claim, or a specification module carrying it)
- Progress (2026-08-08): `docs/research/PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` drafts the
  requirement and separates what evidence fixes (DR-E-01 … DR-E-09, backed by SC-028 …
  SC-034) from what only the owner can state (DR-OD-01 … DR-OD-16). It also fixes the
  screening gates S1–S8 and the ranking rule in advance. **This entry stays Open**: a
  draft carrying sixteen unanswered owner decisions is not a governed duty requirement.
  It closes when DR-OD-01 … DR-OD-16 are answered and the result is accepted. The draft
  additionally opened ODR-013 … ODR-017.

## ODR-013 — Donor powertrain identity, and the D-006 / SC-019 engine contradiction

- Filed: 2026-08-08
- Status: Open
- Required: which engine the donor actually carries (6.8L 3-valve gas V10 vs 6.7L Power
  Stroke diesel), the donor's model year, its as-built final-drive ratio, and its as-built
  tyre size.
- **Contradiction to resolve.** D-006 names the active build direction as *Platform 001A =
  7.3L gas*. SC-019 locks a **2019** F-450. Both archived 2019 Ford sources
  (`SRC-CAND-000010`, `SRC-CAND-000011`) publish the gas engine for this chassis as the
  **6.8L 3-valve V10**; a 7.3L gas engine appears in neither. Either the donor is a later
  model year than SC-019 states, or D-006's engine label is not correct for MY2019. This
  is not resolvable from documents — it requires knowing the actual donor.
- Blocks: correct platform tagging of removed-component weight and CG data (D-006);
  the curb-weight and front-GAWR baseline (SC-028 differs by 749 lbs of curb mass and
  400 lbs of front GAWR between the two engines); the available final-drive ratio set
  (SC-030: 4.88 for gas, 4.10/4.30 for diesel), which is the multiplier in SC-034;
  `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-OD-02 and DR-OD-11.
- Resolution evidence: — (donor VIN decode, door-jamb / certification label, or physical
  inspection of the exact donor)

## ODR-014 — Rolling radius / revolutions-per-mile for the fitted 225/70R19.5G tyre

- Filed: 2026-08-08
- Status: Open
- Required: dynamic rolling radius, or revolutions per mile, for the fitted tyre at the
  applicable load and inflation.
- Why open: `SRC-CAND-000010` page 64 publishes **static loaded radius 15.00 in**
  (SC-031). Static loaded radius is not rolling radius. SC-034 currently sets them equal
  as a **stated assumption**, which makes the derived road-speed table mildly conservative
  by an UNKNOWN margin.
- Blocks: using SC-034 to reject a SUMO MD variant on a small speed margin; the wheel-torque
  conversion in `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-M-02; screening gate S2.
- Resolution evidence: — (tyre manufacturer data for the exact fitment, or measurement on
  the donor)

## ODR-015 — Road-load coefficients for the converted vehicle

- Filed: 2026-08-08
- Status: Open
- Required: rolling-resistance coefficient `Cr`, frontal area `A`, drag coefficient `Cd`,
  and driveline efficiency `eta_driveline` for the converted Platform 001 vehicle at its
  intended body configuration.
- Why open: none of these appears in any archived source. Without them the road-load
  equation in `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-M-02 cannot be evaluated even
  once the owner states a gradeability requirement.
- Blocks: screening gates S3 and S4; any required-torque or required-power figure.
- Resolution evidence: — (coastdown measurement on the donor, applicable published
  coefficients for the exact body configuration, or a controlled characterization)
- **Documentary closure attempted and failed (2026-08-08, D-036).** Every archived Ford
  artifact was searched — `SRC-CAND-000001` (Body Application Guide), `SRC-CAND-000010`
  (fleet specification), `SRC-CAND-000011` (brochure) — for drag coefficient, `Cd`, frontal
  area, aerodynamic data, rolling resistance, `Crr`, coastdown data, road-load coefficients
  and driveline efficiency. **No value for any of them exists in the corpus.** The single
  textual hit for "frontal area" is a Body Application Guide footnote directing the reader
  to the VECI label for restrictions — a constraint pointer, not a coefficient.
- Term-by-term classification: vehicle test mass applicability is
  `PRIMARY_DOCUMENT_SUPPORTED` (SC-028 + SC-035, with the ODR-004/005/006 donor caveat);
  aerodynamic drag, rolling resistance, driveline efficiency and effective rolling radius
  are all **`PHYSICAL_MEASUREMENT_REQUIRED`**.
- Minimum physical evidence, recorded at
  `PLATFORM_001_ODR_015_017_018_CLOSURE_ATTEMPT.md` §3.3: (1) low-speed zero-torque
  coastdown — **already governed as Gate 05M-C3B / C3B-001**; (2) **high-speed coastdown
  across 55–70 mph, bidirectional and wind-corrected**, for `CdA`; (3) wheel speed against
  independent ground speed during (1) and (2), which also closes ODR-014; (4) dynamometer
  or in-line torque measurement to separate driveline efficiency, which a coastdown cannot.
- **Scope finding for the owner:** item (2) is **not covered by any currently authorised
  gate.** Gate 05M-C3 is bounded `NO_PUBLIC_ROAD / NO_NORMAL_DRIVING_AUTHORITY`, and at the
  low speeds it authorises the aerodynamic term is negligible — so C3B-001 alone yields no
  usable `CdA`, while the binding duty points (55/65/70 mph) are squarely where aero
  dominates. Closing the aerodynamic term requires separate owner authorisation.
- Applicability caveat: a coastdown on the **donor ICE vehicle** transfers only for terms
  the conversion does not change (aerodynamics if the body is unchanged, tyre rolling
  resistance). It does **not** transfer for driveline losses — the driveline is what the
  conversion replaces.
- The SC-036 sensitivity band is **not** promoted by any of this and remains
  `SENSITIVITY_BAND_NOT_EVIDENCE`.

## ODR-016 — Coolant-loop compatibility between the Webasto pack and the Dana system

- Filed: 2026-08-08
- Status: Open
- Required: whether one coolant loop can serve both the Webasto Standard Battery Pro 40
  and the selected SUMO MD system, or whether two loops are required.
- Why open: the two published sets do not compose. Dana publishes coolant type
  **40/60 water-glycol** and **maximum inlet 65 °C** but neither flow rate nor pressure
  drop (SC-026). Webasto publishes **10 L/min** and **< 50 mbar** but neither coolant type
  nor a maximum inlet temperature (SC-008, SC-009). The pack operating range
  −30 … +55 °C (SC-011) is an ambient/cell range, not a coolant inlet limit, and must not
  be substituted for one.
- Blocks: cooling-package sizing; screening gate S7; the ambient-envelope clause
  (`PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-OD-10).
- Resolution evidence: — (applicable primary documentation for both components, or
  controlled hydronic bench characterization)

## ODR-017 — Maximum input torque rating of the retained Dana M300 rear axle

- Filed: 2026-08-08
- Status: Open
- Required: the maximum continuous and peak input torque the Dana M300 rear axle
  (SC-029) accepts at the pinion.
- Why open: neither Ford source publishes an axle input torque rating — only the maximum
  rating **@ ground** in pounds (13,660 lbs), which is a vertical load limit, not a torque
  limit. The SUMO MD variants span 1,775–3,320 Nm peak torque (SC-022) and drive the axle
  directly without a gearbox (SC-017), so the axle input limit is a hard ceiling on how
  much of a variant's peak torque is usable.
- Blocks: screening gate S4; any claim that a high-peak-torque variant is usable on the
  retained axle.
- Resolution evidence: — (Dana axle documentation for the exact M300 application, Ford
  body-builder / powertrain documentation, or controlled characterization)
- **Documentary closure attempted and failed (2026-08-08, D-036).** `ODR_017_STATUS = OPEN`
  confirmed against the complete archived corpus. Every Ford artifact was searched for input
  torque, torque capacity, pinion torque and maximum input: **nothing.** There is **no Dana
  or Spicer axle document archived in this repository at all** — `SRC-DANA-000001` is a
  motor/inverter sheet. (That is a statement about the corpus, not a claim that such
  documentation does not exist externally.)
- **Nothing was inferred**, though the inputs for a tempting inference were all present and
  were deliberately not used: the 13,660 lb maximum rating **@ ground** is a vertical load
  limit and is not convertible to torque; the 11.8 in ring-gear pitch diameter recorded in
  SC-029 is **not** a basis for a torque estimate; and neither donor engine torque, GCWR,
  nor any other Dana/Spicer axle family was used.
- Screening consequence unchanged: gate S4 stays `INDETERMINATE` for every candidate. The
  demand is bounded at ~1,513 Nm (D3 at i = 4.10), so the question put to the evidence is
  narrow — does the M300 accept ~1.5 kNm continuously and transiently in this application?

## ODR-018 — Dana SUMO MD HV-variant output at the governed 333–407 Vdc operating point

- Filed: 2026-08-08
- Status: Open
- Required: continuous and peak power and torque for **HV2200-6P**, **HV2600-6P** and
  **HV2800-6P NEW** at 333–407 Vdc — the governed Webasto normal operating window (SC-005).
- Why open: SC-023 states the SC-022 figures are published at 600 Vdc (or 650 Vdc for the
  NEW rows), at 45 °C. The HV variants' DC input ranges (300–750 / 300–800 Vdc) accept
  333–407 V, so operating-range compatibility is `PASS`; their **performance** at that
  point is `NOT_RATED_AT_THIS_OPERATING_POINT` and is not derivable — no efficiency map,
  no torque-speed curves and no derate data are published (SC-022 gap list).
- Why it is decisive: the binding duty point D1 (6 % @ 55 mph for 20 minutes, SC-035) sits
  at 2,527–3,007 rpm and 142.9–179.4 kW continuous (SC-037) — the high-speed corner where
  available power is governed by bus voltage. After screening, **every surviving candidate
  is an HV variant**, and the only variant rated inside the pack window (MV2500-6P at
  350 Vdc) fails D1 by at least 27.9 kW. This entry is therefore the single item standing
  between a ranking and a defensible selection.
- Blocks: screening gate S3 for all surviving candidates;
  `PREFERRED_EXACT_SUMO_MD_VARIANT`; and, downstream, the Webasto topology question
  (B-004), which is not started.
- Resolution evidence: — (Dana application data or torque-speed/efficiency curves at the
  applicable bus voltage for the exact variant, or controlled bench characterization)
- **Documentary closure attempted and failed (2026-08-08, D-036).**
  `ODR_018_STATUS = CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED` for all four survivors
  (HV2200-6P, HV2600-6P, HV2800-6P NEW, HV3000-6P). `SRC-DANA-000001` — the only Dana
  document archived — publishes a **single rated operating point per variant** (600 Vdc, or
  650 Vdc for the NEW rows, at 45 °C) and contains no torque-speed curve, no efficiency map,
  no power-versus-voltage data, no base-speed or field-weakening information, no derating
  table and no peak-power duration. The document was additionally checked for graphed data
  that text extraction would miss: it holds exactly one embedded raster image, the product
  photograph.
- Per-variant outcome, with the two findings kept separate throughout:
  `OPERATING_RANGE_COMPATIBLE = YES` for all four on published DC input range;
  `PERFORMANCE_RATED_AT_333_407_V = NO` for all four. **A variant accepting a voltage is not
  a variant rated at it.**
- **Dana's own Application Policy, verbatim from the artifact:** *"Capacity ratings,
  features, and specifications vary depending upon the model and type of service.
  Application approvals must be obtained from Dana TM4; contact your representative for
  application approval."* The sheet does not present itself as an application rating.
- Nothing inferred: no field-weakening curve, no linear scaling of power with voltage, no
  derating factor, no family maximum (SC-018) used to fill a per-variant gap, no
  cross-variant borrowing.
- **Documentary route remains open and is cheaper than the bench.** Dana-issued application
  data for the exact variants across 333–407 Vdc would close this at
  `VERIFIED_COMPONENT_DOCUMENTATION`. This is consistent with B-006, not a regression to it:
  B-006 removed the *dependency* on a supplier reply, it did not make supplier documentation
  inadmissible — and Dana's own document names this route. It should be attempted before a
  bench programme is scoped, with the bench retained as the fallback that keeps the project
  independent of a reply.
- Characterization evidence outputs (measured quantities only, no procedure, no energized-HV
  instructions, no safety control bypassed) defined at
  `PLATFORM_001_ODR_015_017_018_CLOSURE_ATTEMPT.md` §5, including the requirement to measure
  the variant's **own published rating point** alongside 333/370/407 V so the bench result
  can be correlated back to `SRC-DANA-000001`. Result authority would be
  `CONTROLLED_BENCH_CHARACTERIZATION` — never aliased to `MANUFACTURER_VERIFIED` or
  `VEHICLE_VERIFIED` (baseline invariant 1).
