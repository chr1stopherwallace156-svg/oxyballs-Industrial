-- EDTS VPR-2: normalized domain TABLES in one database (not six microservices).
-- Target: SQLite (dev) → PostgreSQL (ops). Geometry binaries live in object storage.

-- 1. COMP
CREATE TABLE components (
  comp_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  family TEXT NOT NULL,
  category TEXT NOT NULL,
  configuration_applicability TEXT NOT NULL,
  layer TEXT,
  removable INTEGER NOT NULL DEFAULT 0,
  decon_group TEXT,
  geo_id TEXT,
  evd_id TEXT,
  sim_id TEXT
);

CREATE TABLE configuration_components (
  proposal_configuration_id TEXT NOT NULL,
  comp_id TEXT NOT NULL REFERENCES components(comp_id),
  visible_in_json TEXT NOT NULL,
  PRIMARY KEY (proposal_configuration_id, comp_id)
);

-- 2. GEO (metadata only; files in object store)
CREATE TABLE geometry_assets (
  geo_id TEXT PRIMARY KEY,
  comp_id TEXT NOT NULL REFERENCES components(comp_id),
  geometry_status TEXT NOT NULL, -- PLACEHOLDER | PHYSICALLY_MEASURED | ...
  lod TEXT NOT NULL DEFAULT 'LOD0_PROCEDURAL_PLACEHOLDER',
  mesh_ref TEXT,          -- path/URI to GLB — NULL until acquired
  step_path TEXT,         -- NULL unless registered STEP exists
  explode_x REAL, explode_y REAL, explode_z REAL
);

-- 3. EVD
CREATE TABLE evidence_sources (
  source_id TEXT PRIMARY KEY,
  title TEXT,
  content_hash TEXT,
  uri TEXT,
  acquired_status TEXT NOT NULL
);

CREATE TABLE claims (
  claim_id TEXT PRIMARY KEY,
  claim_text TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE component_claims (
  comp_id TEXT NOT NULL REFERENCES components(comp_id),
  claim_id TEXT NOT NULL REFERENCES claims(claim_id),
  source_id TEXT REFERENCES evidence_sources(source_id),
  PRIMARY KEY (comp_id, claim_id)
);

CREATE TABLE component_maturity (
  comp_id TEXT PRIMARY KEY REFERENCES components(comp_id),
  identity_status TEXT NOT NULL,
  geometry_status TEXT NOT NULL,
  placement_status TEXT NOT NULL,
  mass_status TEXT NOT NULL,
  interface_status TEXT NOT NULL
);

-- 4. EGS
CREATE TABLE relationships (
  edge_id TEXT PRIMARY KEY,
  class TEXT NOT NULL,
  kind TEXT NOT NULL, -- PHYSICAL_OR_FUNCTIONAL | PROCEDURAL
  source_comp_id TEXT NOT NULL REFERENCES components(comp_id),
  target_comp_id TEXT REFERENCES components(comp_id),
  interface_id TEXT,
  status TEXT NOT NULL
);

-- 5. SIM (null until measured)
CREATE TABLE mass_properties (
  sim_id TEXT PRIMARY KEY,
  comp_id TEXT NOT NULL UNIQUE REFERENCES components(comp_id),
  mass_kg REAL,                 -- NULL until PHYSICALLY_MEASURED or VERIFIED
  cg_x_m REAL, cg_y_m REAL, cg_z_m REAL,
  mass_status TEXT NOT NULL DEFAULT 'UNKNOWN',
  mass_source TEXT,
  CHECK (
    (mass_kg IS NULL AND mass_status = 'UNKNOWN')
    OR (mass_kg IS NOT NULL AND mass_status IN ('PHYSICALLY_MEASURED','VERIFIED','ESTIMATED'))
  )
);

-- 6. Procedures (storyboard now; graph-driven later)
CREATE TABLE procedures (
  procedure_id TEXT PRIMARY KEY,
  kind TEXT NOT NULL, -- STORYBOARD | AUTHORIZED_WSM
  title TEXT NOT NULL,
  authorized INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE procedure_steps (
  procedure_id TEXT NOT NULL REFERENCES procedures(procedure_id),
  step_index INTEGER NOT NULL,
  label TEXT NOT NULL,
  vehicle_state TEXT,
  focus_comp_id TEXT REFERENCES components(comp_id),
  note TEXT,
  PRIMARY KEY (procedure_id, step_index)
);

-- Indexes for 50k+ scale (records, not services)
CREATE INDEX idx_geo_comp ON geometry_assets(comp_id);
CREATE INDEX idx_rel_source ON relationships(source_comp_id);
CREATE INDEX idx_rel_target ON relationships(target_comp_id);
CREATE INDEX idx_claims_comp ON component_claims(comp_id);
