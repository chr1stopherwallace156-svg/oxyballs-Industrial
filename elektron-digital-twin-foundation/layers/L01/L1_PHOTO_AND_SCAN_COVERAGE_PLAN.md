# L1 Photo and Scan Coverage Plan

**Status:** `DRAFT — complemented by station grid`  
**Purpose:** complete exterior capture coverage for the locked F-450 chassis-cab configuration without blind spots on C-channel rails and underbody  
**Prefer for chassis rails:** `L1_CAPTURE_COVERAGE_GRID_PROPOSAL.json` (longitudinal stations) in addition to rings  
**Does not authorize:** mesh production or fabricated scan results

---

## Overview

Capture fine detail across three height rings so tight areas (C-channel rails, leaf hangers, differential) are not missed.

```
       [ Ring 3: Elevated (45-degree high) ]
                 \         /
                  \  ___  /
       [ Ring 2: Eye-Level Profile (90-degree) ] ===== [ F-450 Cab ]
                  /  ___  \
                 /         \
       [ Ring 1: Ground/Chassis Low (110-degree) ]
```

## 1. Height Rings

### Ring 1 — Low-Angle Chassis Track

- Polar θ = 1.92 rad / 110°
- Purpose: underside of C-channel frames, rear leaf spring hangers, brake lines, Dana S110 rear differential, front steering links
- Interval: every 15° azimuth (24 capture points)

### Ring 2 — Eye-Level Profile

- Polar θ = 1.57 rad / 90°
- Purpose: doors, windows, fender flares, headlights, front grille
- Interval: every 15° azimuth (24 capture points)

### Ring 3 — Elevated Angle

- Polar θ = 0.78 rad / 45°
- Purpose: hood surface, roof panel, top of chassis frame rails, inside frame bed area
- Interval: every 30° azimuth (12 capture points)

**Total ring captures (planned):** 60

## 2. High-Density Detail Insets (Micro-Scans)

Assemblies requiring high-density photogrammetry or laser scanning at close range:

| Target | Reason |
|---|---|
| Dana S110 differential housing | Irregular cast-iron surface texture |
| F-450 front wheel stepped hubs | 10-lug pattern and deep hub contours |
| Cab-to-frame bushing interfaces | Mount connections behind cab wall |

## 3. Execution Gates

Before any capture session:

1. Physical asset available (or licensed scan substitute approved)
2. Capture protocol signed
3. Landmark registry draft reviewed against planned targets
4. Licensing / rights recorded per Tier rules

Until then, this plan remains planning-only.
