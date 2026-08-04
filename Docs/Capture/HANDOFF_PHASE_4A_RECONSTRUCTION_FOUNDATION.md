# Handoff — Phase 4A Reconstruction Foundation

## What landed

Deterministic reconstruction-engine foundation that ingests verified Spatial Evidence Packages and produces eligibility decisions, normalized observations, selected keyframes, registered fixture point sets, quality records, and derivation lineage.

Primary fixture: `SPKG-FIXTURE-RECONSTRUCTION-000001` / `SESS-FIXTURE-RECONSTRUCTION-000001`.

## Verify

```bash
cd elektron-capture-ios
make phase4a-reconstruction-verify
# or full suite
swift test
```

Emit sealed fixture + reconstruction outputs:

```bash
swift run EmitPhase4AEvidence /path/to/out
```

## Delivery

- ZIP: `DOWNLOAD-elektron-reconstruction-phase-4a-foundation.zip`
- SHA-256: `7b97887c348933a0042681a9c7fd8416f83109dd43e360d9ae2d5c1f130673ea`
- Parent (3.8): `a83af02b3677f81d9ebf8e64b8769d247ab2ce130cf3b82881b3ec3f98d48cfd`
- Decision: D-028

## Stacking

Branched from Sprint 3.8 tip (PR #63 may still be open). Merge after 3.8 when that lands on main.

## Not claimed

Physical reconstruction, engineering metrology, complete digital twin, production mesh, `SPKG-DEVICE-000001`.
