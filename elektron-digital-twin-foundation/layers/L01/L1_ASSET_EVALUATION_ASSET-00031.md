# Asset Evaluation Profile: ASSET-00031

**Protocol:** `EDTS_RESEARCH_PROTOCOL.md` Hard Rule 0 (Component-First Acquisition) + Hard Rule 10 (Efficiency Principle)  
**Team:** B (Assets)  
**Status:** `CANDIDATE — Grade B` / availability **`CANDIDATE_NOT_ACQUIRED`**  
**Does not authorize:** geometry freeze, dimensional lock, or Team C mesh adaptation

**Catalog:** `L1_LANE_A_ASSET_CATALOG.json`  
**Availability audit:** `research/incoming/l01_lane_a_assets/ASSET-00031/ASSET_AVAILABILITY_AUDIT.json`

---

## Summary

| Field | Value |
|---|---|
| Asset ID | `ASSET-00031` |
| Found asset grade | **Grade B** (strong base requiring dimensional correction) |
| Claimed coverage | 2017–2019 Super Duty Regular Cab exterior sheet metal |
| Suitability | Production-quality doors, roof, cab rear wall for body-generation match |
| Lifecycle stage | `DISCOVERED` — physical bytes **not acquired** |
| Component targets | `CMPINST-VEH000001-DOOR-FL`, `ASMINST-VEH000001-CAB` (evaluate independently) |
| Marketplace URL | `null` — not recorded; do not invent |

## Suitability Assessment

The asset provides production-quality exterior sheet metal (doors, roof, cab rear wall) matching the exact model year / body-generation band (2017–2019 Super Duty). Configuration match to **F-450 Chassis Cab 4x2 DRW 145.3/60** is **partial** — cab shell usable; pickup-style rear structure is not.

## Efficiency Analysis (Hard Rule 10)

Characterize by subsystems — not calendar schedules:

| Approach | Subsystems touched | Relative effort class |
|---|---|---|
| From-scratch cab shell | Full high-poly exterior, retopology, curvature refinement for doors/roof/back wall/greenhouse | **HIGH** (full rebuild) |
| Adapt ASSET-00031 | Clean/separate/correct doors + greenhouse on existing Grade B mesh; discard wrong rear; insert chassis-cab frame later | **LOW–MEDIUM** (adaptation) |

Efficiency conclusion: prefer audit-and-correct of ASSET-00031 over recreation for cab exterior shell work, subject to license clearance.

## Modification Map

### Keep

- Cab shell exterior
- Door geometry
- Glass paths
- Hinge lines
- Mirror mounts

### Discard

- Frame rails (pickup-bed style packaging)
- Rear axle (if present / non-matching)
- Aftermarket tire profile

### Build / Correct (provisional — Placeholder / Probability taxonomy)

- Insert straight chassis-cab frame rail assembly
- Frame outer width remains **UNVERIFIED** candidate (see `rear_frame_rail_width` in parameter DB — confidence 0% until SRC-L1-001 verified)
- Do **not** hard-lock 34.2 in / 868.7 mm as ENGINEERING VERIFIED

## License / Provenance

| Field | Value |
|---|---|
| License | `REQUIRES_COUNSEL_REVIEW` |
| Marketplace / origin | `TBD — record on intake` |
| Hash / archive path | `research/incoming/l01_lane_a_assets/ASSET-00031/` (create on acquire) |

## Team C Handoff Conditions

Team C may begin **provisional** cleanup/separation only when:

1. Local file exists with SHA-256 + mesh/texture inventory in the availability audit (`file_exists: true`)
2. License path is recorded (even if pending counsel)
3. Keep/discard map above is respected; door mesh evaluated for `CMPINST-VEH000001-DOOR-FL` on its own merits
4. All dimensional inserts tagged `Placeholder` or `Probability` per protocol taxonomy
5. Modeling baseline remains `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`

Until then: door vertical slice remains `F450_DOOR_FL_VERTICAL_SLICE_BLOCKED_BY_MISSING_ASSET`.
