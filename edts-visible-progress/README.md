# EDTS Visible Progress — Release 2 (architecture)

Normalized 6-store digital twin viewer for `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`.

**Decisions:** DT-D058 (R1 visual) · DT-D059 (five-store path) · **DT-D060 (R2 normalized + hover-first)**

## Databases

COMP · GEO · EVD · EGS · SIM · UI — see [`src/data/ARCHITECTURE.md`](src/data/ARCHITECTURE.md)

## Interaction (Apple-style)

- Default: clean model — **no** persistent labels/badges
- Hover: glass outline + name + data-status
- Select: dims unrelated parts · opens passport · shows interface edges

## Modes

| Mode | Behavior |
|---|---|
| Inspect | Select / hide / remove / explode |
| Heatmap | Evidence maturity shader |
| Surgery | Step timeline ICE→EV (visual narrative only) |
| Mass / CG | Live engine — **blocked** until measured masses |

## Honesty

Sample `EDTSDemonstratorV2.jsx` invented masses (420/490/520 kg…), axle formulas, and VERIFIED badges **rejected**. Photoreal truck deferred until acquired assets.

```bash
cd edts-visible-progress && npm install && npm run dev
```
