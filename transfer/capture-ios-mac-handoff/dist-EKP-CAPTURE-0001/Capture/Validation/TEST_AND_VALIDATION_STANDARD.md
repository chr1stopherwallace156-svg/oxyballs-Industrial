# TEST_AND_VALIDATION_STANDARD.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All testing |
| Supersedes | (none) |

## Required layers

| Layer | Focus |
|---|---|
| Unit | Domain validation, IDs, state transitions, manifests, hashes, lineage, thresholds, transforms, timestamp maps, upload retry |
| Integration | Adapters → domain, persistence, signed manifests, package export, mock upload, interrupted recovery |
| Golden-file | Schema, serialization, hashes, migrations, API compatibility |
| Hardware validation | Camera selection, intrinsics, depth stability, pose drift, timestamp alignment, storage interrupt, low battery, thermal, airplane mode, lighting, reflective metal, black surfaces, underbody, repeat sessions |

## Phase 0

Scripts + Swift scaffolding + golden package verification. Hardware tests deferred.

## Honesty

Do not remove tests to greenwash builds. Do not claim hardware validation from simulator-only runs.
