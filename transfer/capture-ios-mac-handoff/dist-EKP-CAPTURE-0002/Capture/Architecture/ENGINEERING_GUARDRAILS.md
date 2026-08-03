# ENGINEERING_GUARDRAILS.md

| Field | Value |
|---|---|
| Status | **APPROVED** (Phase 0) |
| Version | 0.1.1 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All implementation |
| Supersedes | 0.1.0 |

1. Never reverse the observation → evidence → verification → claim → Build Engine order.  
2. Never overwrite originals.  
3. Never invent uncertainty or missing measurements.  
4. Never treat ARKit/LiDAR as certified metrology by default.  
5. Never emit Build Engine authorization tokens.  
6. Never hard-code workflows that should be `CaptureRequirement` data.  
7. Never reduce quality to one unexplained score.  
8. Never use Laplacian blur as a universal threshold across all surfaces/devices.  
9. Never define coverage as only “ray through voxel.”  
10. Never treat VIN as proof of current physical configuration.  
11. Never silently change schema field meaning — migrate.  
12. Never discard originals solely because upload succeeded (unless retention policy allows).  
13. Never add casual third-party dependencies.  
14. Never weaken provenance for performance.  
15. Never let AI silently approve claims or fabricate dimensions.  
16. When uncertain: `UNKNOWN` / `UNVERIFIED` / `RESEARCH_REQUIRED` / `VALIDATION_REQUIRED` / `DECISION_REQUIRED`.
