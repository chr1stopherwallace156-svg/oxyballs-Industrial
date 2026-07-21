# EDTS VPR-2 — Architecture & Interaction Prototype

**Honest label:** Architecture and Interaction Prototype — **not** a completed Release 2 product.

| Concern | Status |
|---|---|
| Data-domain separation | **PROTOTYPED** (in-memory JSON tables COMP/GEO/EVD/EGS/SIM/UI) |
| Real database persistence | **NOT IMPLEMENTED** (SQL schema drafted only) |
| Six independent DB services | **NOT ADOPTED** — one DB with normalized tables |
| Relationship graph | **PROTOTYPED** edge list JSON (not procedure engine) |
| Three.js / R3F scene | **IMPLEMENTED** procedural meshes — **no GLB yet** |
| Smart camera framing | **PROTOTYPED** (Box3 from scene object + OrbitControls tween) |
| Physics / axle loads | **DISABLED** until mass coverage |
| Procedure engine | **STORYBOARD ONLY** |
| Confidence visualization | **MESH material override** prototype (not a custom GLSL shader) |
| Photoreal / Apple-final UI | **NOT ACHIEVED** |

## What works today

Open the app → orbit a **truck-shaped** procedural F-450 chassis-cab silhouette → hover → select → isolate → search → passport with **multi-dimension maturity**.

## What does not

OEM STEP claims · measured axle loads · topological surgery · GLB streaming · microservice mesh.

## Next milestone (acceptance)

Map a real GLB (or higher-fidelity mesh set) to ≥5 `comp_id`s with raycast select, material highlight, Box3 camera frame, and evidence panel — without inventing mass or VERIFIED geometry.
