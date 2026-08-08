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
- Status: Open
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
