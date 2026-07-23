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
