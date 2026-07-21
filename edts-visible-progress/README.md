# EDTS Visible Progress — Release 1

Interactive 3D demonstrator + component evidence explorer for the Elektron Digital Twin System.

**Not engineering truth.** Meshes are stylized `PLACEHOLDER_GEOMETRY` or `DESIGN_PROPOSAL` unless a badge says otherwise. Exact layout dimensions (WB / track / frame width / overhang / BOC) come only from `ASSERTION_EXTRACTED` tokens (SRC-CAND-000010).

## Canonical configuration lock

```
CFG-2019-F450-REG-CAB-4X2-60CA-DRW
```

Kernel: `VEH-000001` / `CFG-000001` · Decision: **DT-D058**

## Architecture

| Layer | Role |
|---|---|
| Factory ICE | As-built donor baseline |
| Deconstruction | Retained (translucent) vs extracted (pulse) + dependency lines |
| EV Proposal | Muted factory retained + high-vis L3 proposal pack |
| Controls | Select · isolate · hide · remove · explode 0–1 |
| Passport panel | ID, lock, evidence ledger, interfaces, KG gaps, MEPQ |

Badge colors match the Release 1 handoff table. **Statuses stay honest** — the sample JSX that marked frame/cab/axle `VERIFIED` and invented 110 kWh / 250 kW / 1,100 lb was **rejected** (see `catalog.honesty.handoff_sample_rejected`).

## Run

```bash
cd edts-visible-progress
npm install
npm run dev
```

Build: `npm run build` → `dist/`

## Data

- Catalog / passport models: `src/data/componentCatalog.json`
- Scene tree + evidence ledger + MEPQ/KG fields are catalog-driven (refine without rewriting the viewer)
- Outside frozen EDTS Kernel — parallel visual lane

## Non-claims

Not VERIFIED geometry · not L10 public demo · not procedure generation · not geometry freeze.
