<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# PERFORMANCE_AUDIT

## Executive summary

Phase 1 path is appropriate for single still images but has **known whole-package memory copies** in ZIP writing and share staging. Hashing streams on Apple (1MB-style chunked FileHandle path); Linux hasher may load full files. Concurrency model is sound: camera session queue + `@MainActor` UI + `EvidenceLibraryStore` actor.

## Evidence

| Area | Behavior | Risk |
|---|---|---|
| ZIP writer | `Data(contentsOf:)` per file; concatenate ZIP in memory | High for large future packages |
| Share support | Loads original + copy for compare | Medium |
| Thumbnail builder | Decode + re-encode; Linux 1x1 JPEG stub | Low for stills |
| Artifact persistence | Read-back full original for hash compare | Medium at high-res bursts |
| Hashing Apple | Streaming FileHandle | Good |
| Hashing Linux | Full-file load fallback | Test-only concern mostly |
| Threads | Serial session queue; MainActor controller | Good |
| Actor store | EvidenceLibraryStore | Good |

## Findings

1. Acceptable for Phase 1 single JPEG; **not** ready for burst/video/point clouds without redesign.
2. Avoid premature optimization before freeze; ticket ZIP streaming as v2 packaging debt.
3. Async: approve/export should keep heavy I/O off main actor where not already (verify on Mac Instruments later).

## Risk level

Low for current still scope; High if spatial/depth payloads reuse ZipPackageWriter unchanged.

## Recommended action

- After baseline, design streaming package writer before depth/LiDAR land.
- Add memory budget note to KNOWN_LIMITATIONS.

## Priority

P2 (after freeze); P0 if package sizes grow pre-redesign.

## Confidence

High for code structure; Low for on-device measurements (none here).
