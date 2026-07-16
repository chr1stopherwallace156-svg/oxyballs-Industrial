# GEOMETRY_ACQUISITION_STRATEGY.md — Proposed Hybrid Sourcing Plan

## Status

**Active / Architecture Material (Non-binding for current Layer 0 lock)**

## 1. Evaluation of Geometric Sourcing Options

This table provides a planning comparison only; it does not assert any dimensions are verified until backed by evidence per `EVIDENCE_STANDARD.md`.

| Evaluation Metric | Licensed Commercial 3D Model | OEM/Body-Builder CAD Data | METROLOGY SCAN (LiDAR + SLS) | Photogrammetry Scan | Manual Modeling |
|---|---|---|---|---|---|
| Dimensional Precision | Low (Varies ±50mm) | Absolute (Nominal design) | Excellent (≤ 0.05mm) | Medium (Scale drift) | Low (Visual model) |
| Interior/Hidden Detail | Omitted | Present | Surface Only (Exposed) | Surface Only | Visual interpretation |
| Mesh Quality / Quad Topo | High (retopologized) | Dense CAD NURBS | High-density triangle mesh | Raw, noisy triangles | High (clean quads) |
| UV Layout Readiness | Pre-unwrapped | None (requires work) | None (requires work) | None | Pre-unwrapped |
| Part Isolation | Basic groups | Fully individual | Merged scans | Merged scans | Custom split |
| Commercial Usability | Restrictive license | Protected NDA | Unrestricted own IP | Unrestricted own IP | Unrestricted own IP |
| Equipment Cost | Low (~$150-$500) | Enterprise license | High ($20k-$80k) | Low (~$1k) | Zero (labor) |

## 2. Primary Acquisition Strategy (Hybrid)

Recommendation (planning):

1) Tier 2 metrology laser scan (captures actual physical state and geometry curves)
2) Hard-surface sub-D manual remodeling (retopologize into game-ready quads while preserving absolute scale)
3) Fallback constraints: manual hard-surface construction only using dimensional constraints from verified `DIMENSION_DATABASE.md` rows applicable to the locked configuration.

This document does not claim that any scan has been performed or that any model is verified.

