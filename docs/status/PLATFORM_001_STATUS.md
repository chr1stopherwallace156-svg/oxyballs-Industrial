# PLATFORM 001 STATUS — Build Package v0.1

**Milestone:** Platform 001 Build Package — Version 0.1 (owner vertical-slice
directive). **Scope:** the first visible end-to-end Build Engine workflow —
locked platform configuration → engineering-data evaluation → compatibility
evaluation → deterministic blockers → draft BOM → build-package report.

**Status: DRAFT_INCOMPLETE.** This milestone demonstrates that the architecture
turns real vehicle configuration data into a controlled engineering output and an
exact work queue. It makes **no** approval claim.

> DRAFT — INCOMPLETE · NOT AUTHORIZED FOR PROCUREMENT · NOT AUTHORIZED FOR
> FABRICATION · NOT AUTHORIZED FOR INSTALLATION · NOT AUTHORIZED FOR ENERGIZATION

---

## What was implemented

- **Schema (`migrations/005_platform_package.sql`, 7 tables):** `VehiclePlatform`,
  `EngineeringClaim`, `ComponentCandidate`, `BuildPackage`, `CompatibilityEvaluation`,
  `OpenDataRequirement`, `BomItem`. Missing values are stored as `NULL` (missing),
  never zero/assumed. `BuildPackage.status` is CHECK-locked to `DRAFT_INCOMPLETE` —
  an APPROVED/RELEASED/AUTHORIZED status is structurally impossible.
- **Locked Platform 001 dataset (`src/platform/platform001.ts`):** the owner
  reference config (2019 Ford F-450 Super Duty Chassis Cab, Regular Cab, 4x2, DRW,
  cab-to-axle 60 in, wheelbase 145.3 in, bare cab-and-chassis) + honest engineering
  claims (geometry = CANDIDATE/not-physically-verified; axle weights + GVWR =
  RESEARCH_REQUIRED, value NULL) + one honest candidate slot (a placeholder traction
  motor with all specs NULL). No product, spec, weight, or dimension is invented.
- **Compatibility rule framework (`src/platform/rules.ts`):** six rule types —
  required-data-presence, applicability-match, component-revision-status,
  source-authority-presence, unit-validity, configuration-revision-lock. Missing
  input → `BLOCKED_MISSING_DATA` (never PASS). No speculative physical calculation.
- **Open-data requirement engine (`src/platform/odr.ts`):** turns each missing
  input into a deterministic, tracked ODR (11 categories supported).
- **Draft BOM generator (`src/platform/bom.ts`):** one slot per required category
  (20 categories); UNSELECTED / CANDIDATE / BLOCKED / VERIFIED_CANDIDATE; no
  fabricated part numbers; no approved status.
- **Build-package generator (`src/platform/buildPackage.ts`) + command
  (`npm run platform001:generate`):** loads → validates identity → evaluates →
  generates ODRs → generates BOM → derives release blockers → persists ONE
  DRAFT_INCOMPLETE package + children in a single atomic transaction → writes a
  human report and a JSON artifact. Deterministic: identical canonical inputs →
  identical `input_hash`, `package_hash`, and ids (self-checked by regeneration).
- **Report + artifact (`src/platform/report.ts`):** all counts are read back from
  the database, not hard-coded.
- **Additive unit definitions (`src/units.ts`):** `in`, `mm` (length), `lb` (mass)
  — unit *definitions*, not engineering values; purely additive to M10.
- **Tests (`test/platform.test.ts`, 14):** database integration tests, not mocks.
- **Adversarial harness (`verify/packageAttack.ts`, `npm run verify:attack:package`,
  9 probes):** all BLOCKED.

## What was NOT implemented (and stays out of scope)

- No approval / release / authorization of any kind (structurally forbidden).
- No physical-compatibility calculations against absent data.
- No supplier data entered; no ODR resolved; ODR-001..ODR-003 untouched.
- No UI, digital-twin rendering, HIL, or physical vehicle authorization.
- No change to the M10 rule engine's behavior (M10 attack/determinism/tests
  unchanged).

## Exact test + command results (this milestone)

Environment: Node v22.22.2, npm 10.9.7, Linux 6.18.5 x86_64. From `engine/`:

| Command | Result |
|---|---|
| `npm run migrate` | PASS — 5 migrations, 40 tables |
| `npm test` | **54/54 pass** (40 M10 + 14 Platform 001) |
| `npm run build` | clean (tsc exit 0) |
| `npm run verify:attack` (M10) | 11/12 BLOCKED, A9 residual (unchanged) |
| `npm run verify:determinism` (M10) | ALL DETERMINISTIC — PASS |
| `npm run verify:attack:package` | **9/9 BLOCKED, 0 findings** |
| `npm run platform001:generate` | PASS — DRAFT_INCOMPLETE, determinism PASS |

## Generated output files

- `engine/output/platform-001/build-package.md` (human-readable report)
- `engine/output/platform-001/build-package.json` (machine-readable artifact)
- `build_package_id`: `BP_PLATFORM-001_d64d1b6a434a`
- `input_hash`: `d64d1b6a434aa71b877a4dbed8923711b983fb350800478d2f252298e589c7a1`
- Generated result: **20 BOM categories** (19 UNSELECTED, 1 BLOCKED), **6
  compatibility evaluations** (4 PASS, 1 FAIL, 1 BLOCKED_MISSING_DATA), **7 open
  ODRs**, **24 release blockers**.

## Unresolved open-data requirements (7 OPEN)

| Category | Subject | Evidence needed |
|---|---|---|
| BASELINE_AXLE_WEIGHT | baseline_front_axle_weight | manufacturer document or scale measurement |
| BASELINE_AXLE_WEIGHT | baseline_rear_axle_weight | manufacturer document or scale measurement |
| BASELINE_AXLE_WEIGHT | gvwr | manufacturer document or scale measurement |
| PHYSICAL_MEASUREMENT | vehicle_frame_geometry | physical measurement on the donor |
| COMPONENT_DIMENSIONS | TRACTION_MOTOR | supplier documentation |
| COMPONENT_MASS | TRACTION_MOTOR | supplier documentation |
| SUPPLIER_DOCUMENTATION | TRACTION_MOTOR | supplier documentation |

These are surfaced in the Open Research Register as ODR-004..ODR-010. They are
**distinct from ODR-001..ODR-003**, which remain gated and untouched.

## Why the package remains blocked

A DRAFT package cannot be released while (a) any open-data requirement is
unresolved and (b) any required BOM category lacks a verified component selection.
Currently 19 of 20 categories are UNSELECTED (no candidate), the one motor slot is
BLOCKED (unverified + missing dimensions/mass), baseline axle weights and GVWR are
unknown, and the frame geometry is nominal (not physically measured). That is the
correct, honest state — the engine has converted missing knowledge into an exact,
ordered work queue rather than a false green light.

## Next recommended research target

**Baseline axle weights + GVWR for the 2019 F-450 Super Duty Chassis Cab (Regular
Cab, 4x2, DRW), from an authoritative Ford source (door-jamb label / body-builder
guide) or a calibrated scale measurement of the donor.** This closes three of the
seven open ODRs, unblocks axle-loading analysis, and is a prerequisite for any
traction-battery / motor sizing rule. It is also tied to BQ-27 (donor identity /
7.3L gas confirmation) — confirm the donor before recording any measured value.
No value is entered until backed by that evidence (Article VII).
