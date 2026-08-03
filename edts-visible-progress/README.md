# EDTS VPR-2 — Architecture & Interaction Prototype

Honest baseline (DT-D061 / DT-D062 / DT-D063). **Not production-ready.**

Real **React Three Fiber** WebGL scene (not CSS cards). Procedural truck-shaped placeholders; no GLB binary yet.

## Audit (implementation truth)

Foundation (DT-D065 / DT-D066):

- [`IMPLEMENTATION_AUDIT.md`](../elektron-digital-twin-foundation/IMPLEMENTATION_AUDIT.md)
- [`IMPLEMENTATION_EVIDENCE.md`](../elektron-digital-twin-foundation/IMPLEMENTATION_EVIDENCE.md) — Implemented / Tested / Verified
- [`MISSING_FEATURES.md`](../elektron-digital-twin-foundation/MISSING_FEATURES.md)
- [`NEXT_IMPLEMENTATION_PRIORITY.md`](../elektron-digital-twin-foundation/NEXT_IMPLEMENTATION_PRIORITY.md) — **P0 = real GLB**

## Audit (prototype scope)

See [`PROTOTYPE_STATUS.md`](PROTOTYPE_STATUS.md).

## GLB acquisition gate

- Spec: [`../elektron-digital-twin-foundation/specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md`](../elektron-digital-twin-foundation/specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md)
- Manifest: [`src/data/mesh_mapping_manifest.json`](src/data/mesh_mapping_manifest.json)
- Verifier: [`src/data/verifyMeshMapping.ts`](src/data/verifyMeshMapping.ts)
- Checklist: [`qa/GLB_ACCEPTANCE_CHECKLIST.md`](qa/GLB_ACCEPTANCE_CHECKLIST.md)
- Object-store placeholder: [`public/assets/glb/`](public/assets/glb/) (empty until QA pass)

## Run

```bash
cd edts-visible-progress && npm install && npm run dev
```

Orbit · hover · select · isolate · search (Box3 frame) · confidence material overlay · storyboard · maturity matrix. Axle loads disabled.
