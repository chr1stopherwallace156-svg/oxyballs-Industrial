-- Platform 001 Build Package — Version 0.1 (owner vertical-slice directive).
-- The first end-to-end Build Engine workflow: a locked platform configuration →
-- engineering-data evaluation → compatibility evaluation → deterministic blockers
-- → draft BOM → build-package report. This layer sits ABOVE the M10 rule engine
-- and does NOT touch it. It NEVER emits an approved/released/authorized status:
-- a build package can only ever be DRAFT_INCOMPLETE (enforced by CHECK below).
--
-- Doctrine held: a missing value is stored as NULL (missing) — never zero, never
-- an assumed default. Every unknown becomes an OpenDataRequirement + a deterministic
-- block reason. No engineering value is invented here; the only owner-provided
-- values are the locked Platform 001 identity/geometry (source_authority recorded).

-- ── The locked vehicle platform (owner reference configuration) ───────────────
CREATE TABLE VehiclePlatform (
  platform_id               TEXT PRIMARY KEY,
  manufacturer              TEXT NOT NULL,
  model                     TEXT NOT NULL,
  model_year                INTEGER NOT NULL,
  cab_configuration         TEXT NOT NULL,
  drive_configuration       TEXT NOT NULL,
  rear_wheel_configuration  TEXT NOT NULL,
  -- Nominal geometry from the owner-locked reference config (value + unit kept
  -- separately so unit-validity is checkable). NULL value = not provided.
  cab_to_axle_value         REAL,
  cab_to_axle_unit          TEXT,
  wheelbase_value           REAL,
  wheelbase_unit            TEXT,
  body_state                TEXT NOT NULL,
  status                    TEXT NOT NULL DEFAULT 'LOCKED_REFERENCE',
  revision                  TEXT NOT NULL,
  source_authority          TEXT NOT NULL,
  created_at                TEXT NOT NULL,
  released_at               TEXT
);

-- ── Engineering claim: one recorded engineering value + its verification state ─
-- value is NULL when the value is unknown. Missing is missing, not zero.
CREATE TABLE EngineeringClaim (
  claim_id                     TEXT PRIMARY KEY,
  platform_id                  TEXT REFERENCES VehiclePlatform(platform_id),
  subject                      TEXT NOT NULL,
  value                        REAL,
  unit                         TEXT,
  applicability                TEXT,
  claim_type                   TEXT NOT NULL,
  status                       TEXT NOT NULL
    CHECK (status IN ('UNVERIFIED','RESEARCH_REQUIRED','CANDIDATE',
                      'VERIFIED_DOCUMENT','VERIFIED_PHYSICAL','CONFLICT','SUPERSEDED')),
  confidence                   TEXT,
  source_reference             TEXT,
  source_revision              TEXT,
  uncertainty                  REAL,
  physical_verification_status TEXT NOT NULL DEFAULT 'NOT_PHYSICALLY_VERIFIED',
  supersedes_claim_id          TEXT REFERENCES EngineeringClaim(claim_id),
  created_at                   TEXT NOT NULL
);

-- ── Component candidate: a slot for a conversion component. Unknown specs = NULL ─
CREATE TABLE ComponentCandidate (
  component_candidate_id     TEXT PRIMARY KEY,
  component_type             TEXT NOT NULL,
  manufacturer               TEXT,
  model                      TEXT,
  revision                   TEXT,
  supplier_reference         TEXT,
  engineering_status         TEXT NOT NULL
    CHECK (engineering_status IN ('UNVERIFIED','RESEARCH_REQUIRED','CANDIDATE',
                      'VERIFIED_DOCUMENT','VERIFIED_PHYSICAL','CONFLICT','SUPERSEDED')),
  -- Each of the following is JSON when known, NULL when unknown (never zero).
  dimensions                 TEXT,
  mass                       TEXT,
  electrical_limits          TEXT,
  thermal_limits             TEXT,
  communication_requirements TEXT,
  mounting_requirements      TEXT,
  source_references          TEXT,
  created_at                 TEXT NOT NULL
);

-- ── Build package: the generated controlled engineering output ─────────────────
-- status is LOCKED to DRAFT_INCOMPLETE for this milestone. A package can NEVER be
-- APPROVED / RELEASED / AUTHORIZED_FOR_BUILD / AUTHORIZED_FOR_HV here — the CHECK
-- makes that structurally impossible.
CREATE TABLE BuildPackage (
  build_package_id       TEXT PRIMARY KEY,
  platform_id            TEXT NOT NULL REFERENCES VehiclePlatform(platform_id),
  platform_revision      TEXT NOT NULL,
  status                 TEXT NOT NULL DEFAULT 'DRAFT_INCOMPLETE'
                           CHECK (status IN ('DRAFT_INCOMPLETE')),
  component_selections   TEXT NOT NULL,
  bom_items              TEXT NOT NULL,
  compatibility_results  TEXT NOT NULL,
  open_data_requirements TEXT NOT NULL,
  block_reasons          TEXT NOT NULL,
  generated_at           TEXT NOT NULL,
  engine_version         TEXT NOT NULL,
  input_hash             TEXT NOT NULL,
  package_hash           TEXT NOT NULL
);

-- ── Compatibility evaluation: one rule applied to one platform/component input ─
CREATE TABLE CompatibilityEvaluation (
  evaluation_id          TEXT PRIMARY KEY,
  build_package_id       TEXT REFERENCES BuildPackage(build_package_id),
  platform_id            TEXT NOT NULL REFERENCES VehiclePlatform(platform_id),
  platform_revision      TEXT NOT NULL,
  component_candidate_id TEXT REFERENCES ComponentCandidate(component_candidate_id),
  rule_id                TEXT NOT NULL,
  result                 TEXT NOT NULL
                           CHECK (result IN ('PASS','FAIL','BLOCKED_MISSING_DATA','NOT_APPLICABLE')),
  block_reason           TEXT,
  input_snapshot         TEXT NOT NULL,
  calculation_snapshot   TEXT NOT NULL,
  evidence_references    TEXT,
  evaluated_at           TEXT NOT NULL,
  engine_version         TEXT NOT NULL
);

-- ── Open-data requirement: a missing input turned into a tracked work item ─────
CREATE TABLE OpenDataRequirement (
  odr_id                TEXT PRIMARY KEY,
  build_package_id      TEXT REFERENCES BuildPackage(build_package_id),
  category              TEXT NOT NULL
    CHECK (category IN ('VEHICLE_GEOMETRY','BASELINE_AXLE_WEIGHT','COMPONENT_MASS',
                        'COMPONENT_DIMENSIONS','MOUNTING_ENVELOPE','ELECTRICAL_LIMIT',
                        'THERMAL_LIMIT','COOLING_REQUIREMENT','COMMUNICATION_INTERFACE',
                        'SUPPLIER_DOCUMENTATION','PHYSICAL_MEASUREMENT')),
  subject               TEXT NOT NULL,
  reason                TEXT NOT NULL,
  required_for_rule     TEXT,
  required_evidence_type TEXT NOT NULL,
  status                TEXT NOT NULL
    CHECK (status IN ('OPEN','EVIDENCE_RECEIVED','UNDER_REVIEW','RESOLVED','REJECTED','SUPERSEDED')),
  blocking_scope        TEXT NOT NULL,
  created_at            TEXT NOT NULL,
  resolved_by_claim_id  TEXT REFERENCES EngineeringClaim(claim_id)
);

-- ── BOM item: one required category slot within a build package ────────────────
CREATE TABLE BomItem (
  bom_item_id            TEXT PRIMARY KEY,
  build_package_id       TEXT NOT NULL REFERENCES BuildPackage(build_package_id),
  category               TEXT NOT NULL,
  selected_component_id  TEXT REFERENCES ComponentCandidate(component_candidate_id),
  selection_status       TEXT NOT NULL
    CHECK (selection_status IN ('UNSELECTED','CANDIDATE','BLOCKED','VERIFIED_CANDIDATE')),
  quantity               REAL,
  unit                   TEXT,
  required_by_rule       TEXT,
  source_authority       TEXT,
  open_data_requirements TEXT,
  block_reasons          TEXT,
  UNIQUE (build_package_id, category)
);

-- Query indexes (FK-driven reads, consistent with the M10 indexing convention).
CREATE INDEX idx_claim_platform       ON EngineeringClaim(platform_id);
CREATE INDEX idx_eval_package          ON CompatibilityEvaluation(build_package_id);
CREATE INDEX idx_odr_package           ON OpenDataRequirement(build_package_id);
CREATE INDEX idx_bom_package           ON BomItem(build_package_id);

-- A build package is a regenerable derived artifact, but its evidence trail is not
-- rewritten silently: regeneration DELETEs the prior package + its children in one
-- transaction and re-inserts. (Unlike M10 signed evidence, a DRAFT package carries
-- no signed authority, so replacement is permitted and is the deterministic path.)
