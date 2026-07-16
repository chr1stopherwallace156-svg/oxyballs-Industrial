# L1 Parallel Lanes (While Source Pack 01 Is Not Verified)

**Authorization:** Active under `L1_SOURCE_PACK_01_NOT_VERIFIED`  
**Superseded for sprint board by:** `L1_PARALLEL_TEAMS.md` (Teams A–D per Hard Rule 8)  
**Does not authorize:** geometry freeze, DOCUMENT_SUPPORTED promotion, or fabricated OEM page citations

---

## Lane A — 3D Asset Sourcing & Evaluation

Scan active 3D model registries, CAD marketplaces (e.g., GrabCAD, CGTrader), and simulation packages for existing 2017–2019 Ford Super Duty cabs, F-450 wheel configurations, or chassis-cab frames.

### Catalog template

| Field | Required |
|---|---|
| `asset_id` | Yes |
| `marketplace` | Yes |
| `url` | Yes |
| `claimed_year_range` | Yes |
| `claimed_body` | Cab / Chassis / Wheels / Other |
| `license` | Yes |
| `grade` | A / B / C / D (see below) |
| `notes` | Fit to Candidate C1 |

### Asset grading criteria (A–D)

| Grade | Meaning | Allowed use while pack unverified |
|---|---|---|
| **A** | High-fidelity, correct Regular Cab Super Duty proportions, clear license for internal eval | Blocking reference for silhouette studies only — not dimensional lock |
| **B** | Good cab shell / flares; uncertain year or missing DRW | Form study; mark CONFIGURATION_DEPENDENT |
| **C** | Generic Super Duty / wrong cab style / heavy cleanup needed | Mood / material study only |
| **D** | Wrong platform, license unclear, or unusable topology | Reject |

**Output path:** `research/incoming/l01_lane_a_assets/`  
**Register (active):** `layers/L01/L1_LANE_A_ASSET_CATALOG.json`  

**Component-First Acquisition (Hard Rule 0 corollary):** Lane A hunts **per component** (e.g. `CMPINST-VEH000001-DOOR-FL`, cab shell). Do not assume a complete exact-vehicle marketplace model. Filter the catalog by `target_component_instance_ids` — do not create separate door/cab shortlist files. Exact-vs-related posture stays in HR-EVI + catalog `grade` / `estimated_configuration_match` (+ `schemas/cross-vehicle-comparison.schema.json` when a formal comparison record is warranted).

---

## Lane B — Core Specification Auditing

Verify foundational platform configurations against public, independent sources (independent parts catalog numbers, fleet ordering sheets, axle manufacturer literature) to isolate **candidates** before main PDFs are acquired.

### Rules

- Results are `CANDIDATE` or `GENERAL_PLATFORM_ARCHITECTURE_SUPPORTED` — never `DOCUMENT_SUPPORTED` for OEM BBAS page claims
- Cross-link to `L1_EXTRACTION_RESULTS_VERIFICATION.json`
- Conflicting independent sources open or update `L1_CONFIGURATION_CONFLICT_REGISTER.json`

**Output path:** `research/incoming/l01_lane_b_specs/`  
**Register (to create on first entry):** `layers/L01/L1_LANE_B_SPEC_AUDIT_LOG.json`

---

## Non-interference

Lane A/B findings must not overwrite null page evidence or invent SHA-256 values. They feed the acquisition queue and conflict register only.
