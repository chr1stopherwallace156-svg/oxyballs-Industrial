# EDTS Visible Progress — Release 1

Interactive 3D demonstrator + component evidence explorer for the Elektron Digital Twin System.

**Not engineering truth.** Meshes are stylized `PLACEHOLDER_GEOMETRY` or `DESIGN_PROPOSAL` unless a badge says otherwise.

## Canonical lock

`CFG-2019-F450-REG-CAB-4X2-60CA-DRW` · DT-D058 / DT-D059

## Five-store architecture (scale path)

See [`src/data/ARCHITECTURE.md`](src/data/ARCHITECTURE.md).

Component · Geometry · Evidence · Relationships · UI — joined at runtime. Authoritative edits live under `src/data/stores/`.

## Modes

| Mode | What it does |
|---|---|
| **Inspect** | Select / isolate / hide / remove / explode |
| **Heatmap** | Color by evidence maturity (green → red) |
| **Timeline** | ICE→EV surgery narrative (visual only — not a WSM procedure) |
| **Simulation** | Axle/CG scaffold — **blocked** until mass evidence (no invented ±32 kg) |

## Search

Type e.g. `fuel tank` → camera focuses · part highlights · passport opens.

## Minimal chrome

Labels appear on **hover / select**. Quiet overlays when idle. Photoreal truck deferred until acquired assets.

## Run

```bash
cd edts-visible-progress
npm install
npm run dev
```
