# EDTS-SPEC-3D-001 — 3D Model Acquisition & Authoring Requirements

**Document identifier:** `EDTS-SPEC-3D-001`  
**Status:** ACCEPTED (DT-D063) — acquisition gate for Tier-2 GLB  
**Target configuration:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Purpose:** Technical criteria for purchasing, commissioning, or authoring the 3D vehicle GLB for the EDTS WebGL demonstrator (VPR-2).

**Does not authorize:** geometry freeze, procedure generation, ASSERTION_VERIFIED mesh claims, or invented mass/mount data.

---

## 1. Dimensional & configuration boundary

Any sourced or custom-authored asset **must** match the locked reference configuration:

| Parameter | Requirement | Evidence basis |
|---|---|---|
| Vehicle class | 2019 Ford F-450 Super Duty Chassis Cab (US, LHD) | Configuration lock |
| Cab | Regular Cab (2-door) | Lock |
| Drivetrain | 4×2 (RWD) | Lock |
| Rear wheels | Dual Rear Wheel (DRW) | Lock |
| Wheelbase (WB) | **145.3 in** (3690.62 mm) | ASSERTION_EXTRACTED SRC-CAND-000010 |
| Cab-to-axle (CA) | **60.0 in** (1524.00 mm) | ASSERTION_EXTRACTED SRC-CAND-000010 |
| Body state | Bare cab-and-chassis — **no** vocational upfit, flatbed, or utility box | Lock |

**Reject** pickup beds, Crew Cab, 4×4-only donors, wrong WB/CA, or merged “truck toy” meshes that cannot separate the nodes in §3.

---

## 2. Format & metric specifications

| Property | Requirement |
|---|---|
| File format | glTF 2.0 binary (`.glb`) |
| Primary units | Meters (1.0 scene unit = 1.0 m) |
| Target file size | **&lt; 25.0 MB** total GLB payload |
| Triangle budget | LOD0 **≤ 150,000** triangles total |
| Draw calls | **≤ 30** unique materials / draw calls |
| Up vector | **+Y** |

### 2.1 Coordinate reference system (LHD Vehicle Spatial Frame)

| Axis | Direction |
|---|---|
| +X | Forward (vehicle travel) |
| +Y | Up |
| +Z | Right (LHD passenger side) |

| Datum | World position |
|---|---|
| Front axle midline center | **(0, 0, 0)** |
| Ground plane | Y = 0 at tire contact (or documented tire radius offset) |
| Rear axle X | **−WB** = −3.69062 m |

**Note:** The current VPR-2 procedural placeholder scene uses a mid-wheelbase display origin for prototyping. **Ingested production GLBs must use this front-axle origin.** The R3F loader will apply a documented transform if a temporary offset is required during migration.

---

## 3. Node hierarchy & component separation

The GLB **must not** be a single merged mesh. Components export as independent named `Group` / `Mesh` nodes.

### 3.1 Naming convention

```
GEO_{SUBSYSTEM}_{PART}_{SIDE|CTR}_LOD{N}
```

Examples: `GEO_CHASSIS_FRAME_RAIL_LH_LOD0`, `GEO_POWERTRAIN_ICE_ENGINE_PROXY_CTR_LOD0`

- `LH` / `RH` / `CTR` = side or centerline
- `LOD0` = highest demonstrator LOD (only LOD0 required for first acquisition)

### 3.2 Minimum separable mesh nodes

Authoritative list: [`mesh_mapping_manifest.json`](../../edts-visible-progress/src/data/mesh_mapping_manifest.json)

| Node name | Classification | Notes |
|---|---|---|
| `GEO_CHASSIS_FRAME_RAIL_LH_LOD0` | Left frame rail | Isolated C-channel |
| `GEO_CHASSIS_FRAME_RAIL_RH_LOD0` | Right frame rail | Isolated C-channel |
| `GEO_CHASSIS_FRAME_CROSSMEMBER_01_CTR_LOD0` | Front crossmember | Independent member |
| `GEO_CHASSIS_FRAME_CROSSMEMBER_02_CTR_LOD0` | Mid/cab crossmember | Independent member |
| `GEO_BODY_CAB_SHELL_CTR_LOD0` | Regular cab outer shell | Material not asserted by name |
| `GEO_BODY_DOOR_INNER_LH_LOD0` | FL door assembly | Separable from shell |
| `GEO_BODY_DOOR_INNER_RH_LOD0` | FR door assembly | Separable from shell |
| `GEO_DRIVETRAIN_AXLE_REAR_DANA_M300_CTR_LOD0` | Rear DRW axle proxy | Identity DOCUMENT_SUPPORTED class — geometry PLACEHOLDER until measured |
| `GEO_CHASSIS_SUSP_FRONT_MONOBEAM_CTR_LOD0` | Front monobeam axle | Architecture ASSERTION_EXTRACTED; spring detail UNKNOWN |
| `GEO_POWERTRAIN_ICE_ENGINE_PROXY_CTR_LOD0` | Engine envelope proxy | **OPTION_DEPENDENT** — do not assert 6.7L without instance lock |
| `GEO_POWERTRAIN_ICE_TRANS_PROXY_CTR_LOD0` | Transmission envelope proxy | **OPTION_DEPENDENT** — 6R140 not instance-locked |
| `GEO_CHASSIS_WHEEL_FRONT_LH_LOD0` | FL wheel + tire | |
| `GEO_CHASSIS_WHEEL_FRONT_RH_LOD0` | FR wheel + tire | |
| `GEO_CHASSIS_WHEEL_REAR_DUALLY_LH_LOD0` | RL dually set | Outer+inner may be one group initially |
| `GEO_CHASSIS_WHEEL_REAR_DUALLY_RH_LOD0` | RR dually set | |

**Honesty on powertrain node names:** Prefer `*_PROXY_*` names. If a vendor delivers `*_6.7L_*` / `*_6R140_*`, map them in the manifest as **OPTION_DEPENDENT** identity — not ASSERTION_VERIFIED for VEH-000001 until build sheet confirms.

---

## 4. Material & shading

- PBR metallic-roughness compatible with R3F `<meshStandardMaterial />` / glTF PBR.
- ORM packing preferred: R=AO, G=Roughness, B=Metalness at 1024² or 2048².
- **No** baked directional lighting/shadows in albedo. AO maps allowed.
- Glass: independent material, `transparent: true`, opacity ≈ 0.3 for internal inspection.

---

## 5. Procurement options

```
                [Sourcing decision]
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
[A] Commercial mesh + retopo     [B] Custom blueprint CAD
 Hum3D / TurboSquid 2017–2022    Blender over EDTS-CAND vector
 F-450/F-550 Reg Cab chassis     Exact WB/CA alignment
 Rename → mesh_mapping_manifest  Structural envelopes first
```

### Option A — commercial (fast baseline)

- Acceptable class: 2017–2022 F-450 / F-550 Regular Cab chassis cab donors.
- **Mandatory:** retopo / separate / rename to GEO_ syntax before Tier-2 admit.
- Geometry maturity remains `PLACEHOLDER_GEOMETRY` or `SIMPLIFIED_SURFACE` until metrology verifies.

### Option B — custom (exact baseline)

- Reference: vector blueprint candidate (e.g. EDTS-CAND-001 class outlines) — URL/hash must be registered before use as ASSERTION_*.
- Model frame, cab shell, rear axle envelope, engine envelope over 2D projections at exact WB/CA.

---

## 6. QA & acceptance checklist (Tier-2 gate)

Before accepting any GLB into object storage:

| Check | Criterion |
|---|---|
| Scale audit | Frame length ≈ **3.69 m ± 0.05 m** (WB span axle-to-axle) |
| Origin | Front axle midpoint at **(0,0,0)** |
| Node parser | `verifyMeshMapping()` matches **100%** of primary nodes in `mesh_mapping_manifest.json`; no unexplained orphan meshes (or orphans listed as `UNMAPPED_IGNORE`) |
| Raycast | Pointer hits per-component bounds; no inverted normals |
| Performance | ≥ 60 FPS on standard integrated GPU with LOD0 |

Checklist form: [`qa/GLB_ACCEPTANCE_CHECKLIST.md`](../../edts-visible-progress/qa/GLB_ACCEPTANCE_CHECKLIST.md)  
Verifier: [`verifyMeshMapping.ts`](../../edts-visible-progress/src/data/verifyMeshMapping.ts)

---

## 7. Repository placement (3-tier)

| Tier | Path / system |
|---|---|
| Tier 1 | `comp_id` / `geo_id` rows; `mesh_node` FK to manifest name |
| Tier 2 | `edts-visible-progress/public/assets/glb/` (git-LFS or external object store) — **empty until acquired** |
| Tier 3 | R3F selection / hover / heatmap (existing) |

**No GLB in-repo until QA pass.** Procedural placeholders remain the VPR-2 visual until then.

---

## Related

- VPR-2 prototype: `edts-visible-progress/PROTOTYPE_STATUS.md`
- General twin 3D rules: `THREE_D_SPEC.md` (this SPEC specializes demonstrator GLB acquisition)
- Decision: `DT-D063`
