# EDTS Open-Source Maximum-Leverage Research Mission

**Document type:** Technical research & open-source integration specification  
**Canonical configuration:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Decision:** DT-D064  
**Execution scope:** **Non-invasive research pass — zero production code mutation**  
**Date:** 2026-07-21

## Outputs

| # | Document | Path |
|---|---|---|
| 1 | Open-source ecosystem index | [`OPEN_SOURCE_ECOSYSTEM_INDEX.md`](OPEN_SOURCE_ECOSYSTEM_INDEX.md) |
| 2 | Mobile scan pipeline | [`MOBILE_SCAN_PIPELINE.md`](MOBILE_SCAN_PIPELINE.md) |
| 3 | Vehicle scan capture protocol | [`VEHICLE_SCAN_CAPTURE_PROTOCOL.md`](VEHICLE_SCAN_CAPTURE_PROTOCOL.md) |
| 4 | Scan registration & QA | [`SCAN_REGISTRATION_AND_QA_SPEC.md`](SCAN_REGISTRATION_AND_QA_SPEC.md) |
| 5 | VIN configuration resolver | [`VIN_CONFIGURATION_RESOLVER_SPEC.md`](VIN_CONFIGURATION_RESOLVER_SPEC.md) |
| 6 | Mathematical methods registry | [`MATHEMATICAL_METHODS_REGISTRY.md`](MATHEMATICAL_METHODS_REGISTRY.md) |
| 7 | Quantum applicability assessment | [`QUANTUM_APPLICABILITY_ASSESSMENT.md`](QUANTUM_APPLICABILITY_ASSESSMENT.md) |
| 8 | 90-day implementation backlog | [`90_DAY_IMPLEMENTATION_BACKLOG.md`](90_DAY_IMPLEMENTATION_BACKLOG.md) |

## Executive rules (locked by DT-D064)

1. **Metric isolation** — NeRF / Gaussian splats / photoreal textures = `VISUALIZATION_ONLY`. Metric work routes through scale-anchored Open3D / COLMAP + AprilTags.
2. **Configuration lock** — Quarantine scan data until NHTSA vPIC + door-jamb OCR confirm match to `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`.
3. **Quantum realism** — Quantum / QUBO = `REFERENCE_ONLY`. Production optimization uses classical ILP.
4. **No code mutation this pass** — Specs and backlog only; do not treat backlog tasks as executed.
5. **Honesty** — Accuracy envelopes and classical/quantum timing figures are **capability / formulated assessments**, not measured on VEH-000001 unless an evidence source is cited.

## Related

- GLB gate: `specs/EDTS-SPEC-3D-001_GLB_ACQUISITION.md` (DT-D063)
- Existing VIN protocol: `VIN_AND_LABEL_CAPTURE_PROTOCOL.md`
- VPR-2 prototype: `edts-visible-progress/` (R3F presentation layer already started — backlog Sprint 5 is continuity, not greenfield)
