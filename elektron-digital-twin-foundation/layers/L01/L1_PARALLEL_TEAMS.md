# L1 Parallel Teams A–D (Protocol Hard Rule 8) — EDTS-OS v3

**Protocol:** `EDTS_RESEARCH_PROTOCOL.md` v2.0.0  
**OS:** `EDTS_OS.md` v3.0.0  
**Source pack posture:** `L1_SOURCE_PACK_01_NOT_VERIFIED`  
**Geometry freeze:** `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`  
**Confidence %:** `DEPRECATED` — use Evidence Graph tiers + verification status

Research blockage must not paralyze asset acquisition, provisional geometry prep, or software architecture.

```text
[TEAM A: Research] ─────► SRC-OEM-001/002 audit → INGESTED ➔ NORMALIZED (files pending)
[TEAM B: Assets] ───────► Dana M300 housing models → CMP-AXL-M300 DISCOVERED ➔ INGESTED
[TEAM C: Geometry] ─────► Separate cab/door from ASSET-00031 → CMP-SD-044-L draft passport
[TEAM D: Software] ─────► Dynamic passport loader / component tree (EDTS-OS runtime)
```

---

## Current sprints (V3 OS)

| Team | Current Active Target | Dependent Components | Target Status |
| :--- | :--- | :--- | :--- |
| **Team A** (Research) | Audit SRC-OEM-001 (BBAS) & SRC-OEM-002 (WSM) | `CMP-FORD-SD-DOOR-FL-001`, `CMP-SD-FRAME-001` | `AWAITING_FILE` → `INGESTED` → `NORMALIZED` |
| **Team B** (Assets) | Source Dana M300-class housing models | `CMP-AXL-M300` | `DISCOVERED` → `INGESTED` |
| **Team C** (Geometry) | Separate FL door from ASSET-00031 → `GEO-00001` | `CMP-FORD-SD-DOOR-FL-001` | Discovery → provisional metrics |
| **Team D** (Software) | Kernel acceptance T03–T05 harness | `INT-00001` | `NOT_EXECUTED` until mesh bound |
| **Kernel** | Composable schemas + door instances | `EVL-00001` first link | **VERTICAL_SLICE_READY** |

---

## Team A — Research

| Field | Value |
|---|---|
| Focus | Tier A OEM PDF acquisition + hash + Evidence Graph edge promotion |
| Primary artifacts | `L1_SOURCE_ARTIFACT_FILE_MANIFEST.json`, `L1_EVIDENCE_GRAPH.json` |
| Sprint now | Isolate access for SRC-OEM-001 / SRC-OEM-002 (= SRC-L1-001 / SRC-L1-003) |
| Blocked on | Local PDF bytes |
| Must not | Assert `NORMALIZED` or page quotes without file hash |

## Team B — Assets

| Field | Value |
|---|---|
| Focus | Discover/grade existing 3D assets (Hard Rule 10); supplier axle hunt |
| Active profiles | `ASSET-00031` Grade B; `CMP-AXL-M300` discovery |
| Sprint now | License capture + keep/discard; M300 housing candidates |
| Must not | Treat Grade B / supplier previews as dimensional truth |

## Team C — Geometry

| Field | Value |
|---|---|
| Focus | Provisional adapt; door passport geometry fields |
| Sprint now | Prep clean/separate doors & greenhouse on ASSET-00031; hinge calibration prep |
| Taxonomy | Outputs = Placeholder / Probability; passport `DRAFT_CANDIDATE` |
| Must not | Mark passport `FROZEN` or invent hinge_axis mm |

## Team D — Software

| Field | Value |
|---|---|
| Focus | EDTS-OS component tree + passport dynamic load (Hard Rule 0 / 7) |
| Sprint now | Three.js/React hierarchy keyed by `component_id` + version pin from vehicle config |
| Provenance | Each node carries passport path, evidence_tier, verification_status |
| Must not | Claim `RUNTIME ENGINE COMPLETED` without executable loader + tests; bake unverified mm as constants |

---

## Cross-team sync rules

1. Team A promotions update Evidence Graph `verification_status` (not confidence %).
2. Team B grades feed passport `mesh_source` / discovery only.
3. Team C writes geometry fields on passports; never skips lifecycle.
4. Team D reads `configurations/*` → `components/*` → Evidence Graph for claims UI.
5. Geometry freeze remains blocked until dimensional edges reach required stages.
