# Phase 1 Freeze Notice

| Field | Value |
|---|---|
| Status | **PENDING** — not frozen |
| Milestone | `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_GIT_FREEZE` |
| Short | `PHASE_1C_VALIDATION_PASSED_PENDING_REPOSITORY_TAG` |
| Tag | *None authoritative* until `v1.0.0-phase1c` exists on `origin` |
| Validation record | `Docs/Capture/PHASE_1C_FINAL_VALIDATION.md` |

## Freeze mechanism (authoritative clone only)

1. Confirm git context: `git status --short`, `git branch --show-current`, `git rev-parse HEAD`, `git remote -v`
2. Fill full 64-character SHA-256 digests + physical evidence citations in the validation record
3. Commit; create annotated tag `v1.0.0-phase1c`; `git push origin HEAD` and `git push origin v1.0.0-phase1c`
4. Enable GitHub branch/tag protection for `main` and `v1.0.0-phase1c`

There is **no** `git lock-branch` command.

## Intended frozen contracts (when freeze completes)

- Phase 1A `.edts-pkg` layout and PackageInventory self-hash omit policy
- Canonical JSON byte-identity rules
- Artifact JPEG write-once / SHA-256 freeze semantics
- Capture-side status ownership (no EDTS-owned status assignment)
- Canonical Identity Pattern for package-relative paths (`PackageRelativePath`)

## Allowed now (pre-freeze)

- Correct validation metadata and evidence citations
- Capture v2 **draft** specifications under `Specifications/`
- Research spikes and Integration Reports under `Research/`
