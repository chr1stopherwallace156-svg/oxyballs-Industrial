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
- Status: Open
- Blocks: motor mounting/packaging compatibility; Platform 001 package release.
- Resolution evidence: — (motor supplier documentation)

## ODR-009 — Traction-motor mass

- Filed: 2026-07-22
- Status: Open
- Blocks: axle-loading analysis; Platform 001 package release.
- Resolution evidence: — (motor supplier documentation)

## ODR-010 — Traction-motor supplier documentation (verification)

- Filed: 2026-07-22
- Status: Open
- Blocks: any motor candidate leaving UNVERIFIED; Platform 001 package release.
- Resolution evidence: — (motor supplier datasheet / engineering documentation)

## ODR-011 — DANA_PRIMARY_ARTIFACT_NOT_YET_ARCHIVED_LOCALLY

- Filed: 2026-08-08
- Status: Open
- State: `DANA_PRIMARY_ARTIFACT_NOT_YET_ARCHIVED_LOCALLY`
- **Official public Dana evidence is known to exist externally.** Dana publishes TM4
  SUMO MD specification material publicly, and the applicable document is identified by
  ID: `CORTM4-JRT2495-SUMOMD-0124`. This entry does **not** assert that Dana
  documentation is unavailable, incomplete, or withheld — it records only that the
  artifact has not yet been archived into this repository as a local primary source.
- What is required: the document archived locally with `source = Dana TM4 official public
  specification sheet`, `document ID = CORTM4-JRT2495-SUMOMD-0124`,
  `authority = OFFICIAL_PUBLIC_DOCUMENT`, its SHA-256, and the retrieval date — after
  which it is used locally with no network dependency.
- Blocks (pending local archiving): exact-variant closure for MV2500-6P, HV1800-3P,
  HV2200-3P, HV2200-3P NEW, HV2200-6P, HV2400-6P, HV2600-6P, HV2800-6P NEW, HV3000-6P,
  HV3300-6P NEW — casing, inverter designation, continuous/peak power, continuous/peak
  torque, max RPM, DC voltage range, motor mass, inverter mass, envelope, coolant
  requirement, mechanical/interface features, standards/protection. Archiving it also
  resolves ODR-008 (motor dimensions), ODR-009 (motor mass) and ODR-010 (motor supplier
  documentation).
- Not an admissible substitute: prior research-batch material naming
  "Dana TM4 SUMO MD HV2100-6P" with 130 kW / 250–265 kW / 685 Nm / 2150–3320 Nm /
  3500–3700 RPM (`docs/research/raw/research_hunter/batch_16_powertrain_candidates.md`)
  blends alternates into a single record, which the Platform 001 baseline prohibits, and
  SC-018 already governs 265 kW / 3320 Nm / 3700 RPM as family maxima rather than a
  variant specification.
- Resolution evidence: — (the archived artifact and its acquisition record)

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
