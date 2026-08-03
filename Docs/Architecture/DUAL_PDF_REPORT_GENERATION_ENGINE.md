# Dual PDF Generation Engine

**Status:** Architecture + CLI scaffold (v0.1)  
**Owner:** Industrial Data Thread / report tooling  
**Related:** Phase 3 Spatial Platform; Capture evidence packages; Build Engine evidence doctrine

## Executive framing

Document generation is an extension of the **Data Thread**. Reports are **deterministic artifacts** compiled from canonical JSON state — not free-form authoring surfaces.

```text
                    [CANONICAL SYSTEM DATA]
             (Vehicle Profile, Evidence, Metrics)
                               │
                               ▼
                   [REPORT GENERATOR ENGINE]
             (Data Mapping & Structural Validation)
                               │
           ┌───────────────────┴───────────────────┐
           ▼                                       ▼
   [CLIENT PDF TEMPLATE]                 [ENGINEERING PDF TEMPLATE]
   • High visual clarity                 • Maximum metric density
   • Executive recommendations           • Bounding / clearance tolerances
   • Customer & investor facing          • Inspection & shop-floor review
```

Normative inputs (per vehicle):

| Artifact | Role |
|---|---|
| `VEHICLE_MANIFEST.json` | Identity, fleet/duty baseline, assessment rating, pathway options |
| `SPATIAL_EVIDENCE.json` | Zones, metrology deltas, missing-data registers, photo refs |

Normative outputs (under `artifacts/reports/<VEHICLE_ID>/` by default — avoids a new top-level directory under the D-016 structure freeze):

```text
artifacts/reports/VEH-000042/
├── VEH-000042-client-report.pdf
├── VEH-000042-internal-report.pdf
├── VEH-000042-photosheet.pdf
├── VEH-000042-summary.xlsx
└── VEH-000042-report-manifest.json   # SHA-256 + compilation metadata
```

## Design invariants

1. **Canonical-in → hash-out.** Every PDF/XLSX run writes `*-report-manifest.json` with SHA-256 of each artifact plus `source_hash` over the sorted canonical input files.
2. **Fail closed on schema.** Missing required fields abort before Puppeteer launches (unless `--allow-incomplete` is set for draft engineering runs).
3. **Two templates, one mapper.** Client and internal share the same mapped view-model; templates only change presentation density.
4. **No silent overwrite of sealed evidence.** Report outputs are derived products; they do not mutate Capture packages or twin geometry.
5. **Structure freeze.** Templates live in `dev/templates/reports/`; fixtures in `dev/fixtures/vehicles/`; orchestrator in `scripts/generate-reports.mjs`. Generated PDFs go to `artifacts/reports/` (gitignored).

## CLI

```bash
# Full multi-format package (client + internal + photosheet + xlsx + manifest)
npm run report:package -- --vehicle VEH-000042

# Internal engineering PDF only
npm run report:internal -- --vehicle VEH-000042

# Explicit formats / out-dir / data root
node scripts/generate-reports.mjs --vehicle VEH-000042 \
  --format pdf,xlsx --types client,internal,photosheet \
  --data-root ./dev/fixtures/vehicles \
  --out-dir ./artifacts/reports/VEH-000042
```

## Mapper contract (view-model)

The generator maps canonical JSON into Handlebars context:

| Path | Source |
|---|---|
| `report.id` | `{vehicleId}-{type}-{UTC stamp}` |
| `report.timestamp` | ISO-8601 UTC |
| `report.source_hash` | SHA-256 of concatenated sorted input JSON bytes |
| `report.has_missing_data` | any `missing_registers[].status` ∈ {`NOT_MEASURED`,`RESEARCH_REQUIRED`} |
| `vehicle.*` | `VEHICLE_MANIFEST.vehicle` |
| `assessment.*` | `VEHICLE_MANIFEST.assessment` |
| `pathways` | `VEHICLE_MANIFEST.pathways[]` |
| `inspection_photos` | `SPATIAL_EVIDENCE.photos[]` (or manifest fallback) |
| `spatial_zones` | `SPATIAL_EVIDENCE.zones[]` |
| `metrology` | `SPATIAL_EVIDENCE.metrology[]` |
| `missing_registers` | `SPATIAL_EVIDENCE.missing_registers[]` |
| `capture.session_id` | `SPATIAL_EVIDENCE.capture.session_id` |

## Templates

| File | Audience |
|---|---|
| `dev/templates/reports/client_template.html` | Executive / customer / investor |
| `dev/templates/reports/engineering_template.html` | Shop / metrology / conversion blockers |
| `dev/templates/reports/photosheet_template.html` | Visual contact sheet |

## Non-claims

- Generated PDFs are **drafts** until an operator attestation closes the related evidence gates.
- Suitability ratings and pathway tables are **compiled from JSON**; they are not certifications.
- LiDAR-derived dimensions remain subordinate to caliper / Mode-2 authority when recorded.

## 4. Next development steps

1. **JSON Schema lock** — Publish `VEHICLE_MANIFEST.schema.json` + `SPATIAL_EVIDENCE.schema.json` under `docs/contracts/` with AJV validation in the CLI (replace the current required-field checks).
2. **Golden fixtures CI** — Commit HTML snapshot hashes (not binary PDFs) for `VEH-000042`; fail CI on mapper drift.
3. **Capture package adapter** — Ingest `.edts-pkg` / Phase 1 evidence library photo digests into `SPATIAL_EVIDENCE.photos[]` without copying sealed originals.
4. **Photosheet density modes** — 2×2 / 3×3 layouts driven by evidence count; reject broken image URIs fail-closed.
5. **XLSX financial sheet** — Expand summary workbook beyond packaging grid (BOM placeholders stay `DRAFT`).
6. **Mode-2 gate banner** — When `has_missing_data`, stamp ENGINEERING PDF header with `PHYSICAL_MEASUREMENT_REQUIRED` and block `report:package` client PDF unless `--force-client-draft`.
7. **Decision Register** — If a top-level `reports/` or `data/` tree is required for production delivery, file an amendment to D-016 (paired README + STRUCTURE_FREEZE update) before relocating outputs.
8. **Offline Chromium pin** — Vendor a known Puppeteer Chromium revision for air-gapped Mac runtimes (align with Local Runtime offline doctrine).
