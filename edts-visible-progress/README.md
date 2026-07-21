# EDTS Visible Progress — Release 1

Interactive 3D demonstrator for the Elektron Digital Twin System (EDTS).

**Not engineering truth.** Meshes are stylized / `PLACEHOLDER_GEOMETRY` unless a badge says otherwise. Exact layout dimensions used for axle spacing / track / frame width / overhang come only from `ASSERTION_EXTRACTED` tokens (SRC-CAND-000010). No invented torque, materials, or mounting-hole geometry.

## Locked vehicle

2019 Ford F-450 Chassis Cab · Regular Cab · 4x2 · DRW · 145.3 WB / 60 CA

- Kernel: `VEH-000001` / `CFG-000001`
- Proposal: `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`
- Decision: **DT-D058**

## States

| State | Purpose |
|---|---|
| **Factory ICE** | As-built donor layout (factory family) |
| **Deconstruction** | Interactively hide/remove ICE support systems |
| **EV Proposal** | L3 design proposals only (visually distinct from OEM) |

## Interaction

- Click any major component to inspect
- Hide / remove (decon) / explode via toolbar + inspector
- Side panel: component ID, configuration applicability, evidence status, known interfaces, missing properties, MEPQ blockers
- Data-status badges: `VERIFIED` · `PHYSICALLY_MEASURED` · `ESTIMATED` · `PLACEHOLDER_GEOMETRY` · `DESIGN_PROPOSAL` · `UNKNOWN` · `BLOCKED`

## Run

```bash
cd edts-visible-progress
npm install
npm run dev
```

Build: `npm run build` → `dist/`

## Architecture

- Vite + React + TypeScript + React Three Fiber
- Component catalog: `src/data/componentCatalog.json` (honest metadata; refine without rewriting the viewer)
- Scene uses extracted inches→meters for WB / track / frame H / overhang / BOC only; cross-sections remain placeholders
- Lives **outside** the frozen EDTS Kernel — parallel visual lane

## Honesty contract

See `catalog.honesty` and foundation decision DT-D058. This release does **not** authorize L10 public demo, procedure generation, or geometry freeze.
