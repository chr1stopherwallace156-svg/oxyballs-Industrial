# REPOSITORY STRUCTURE FREEZE

**Declared:** 2026-07-23, at release `v0.1.0-rc1` (merge of PR #1).
**Authority:** Decision Register **D-016**. Subordinate to the Engineering Constitution.

The repository's top-level and second-level directory structure is **frozen**. The
layout below is now the canonical shape. Adding, renaming, moving, or removing a
directory requires an explicit Decision Register entry — it may not happen silently
or as a side effect of feature work.

## Why freeze now

The structure has stabilized across three bodies of work (Build Engine, governance
docs, digital-twin foundation) and a first end-to-end milestone. Freezing it makes
the project navigable, keeps the front door (`README.md`) intentional, and stops
incidental reorganization. This is a *clarity* freeze, not a code freeze — files may
still be added inside existing directories.

## Every directory must answer four questions

Why does it exist · Who owns it · When is it used · What milestone introduced it.
A directory that cannot answer all four should be challenged before it is added.

## Frozen layout

```
README.md                          Entry point / front door (updated by proposal only)
AGENTS.md                          Cross-agent rules + handoff protocol
CLAUDE.md                          Session entry pointer
MERGE_REPORT_PR1.md                Pre-merge gate record for PR #1
index.html                         Public static site
.cursor/                           Cursor rules mirroring AGENTS.md
# Local-runtime tooling (admitted by D-017) — the repo root IS the runnable local app:
scripts/                           Local runtime shell scripts (setup/doctor/verify/backup/restore/self-test)
*.command                          Double-clickable macOS launchers (Install/Start/Verify/Generate/Backup/Restore)
LOCAL_SETUP.md LOCAL_OPERATIONS.md OFFLINE_OPERATION.md BACKUP_AND_RECOVERY.md GENERATED_ARTIFACTS.md README-LOCAL-RUNTIME.md
.nvmrc .node-version               Node version pins
# Bundle-time-only, gitignored (NOT tracked): vendor/  .local/  IMMUTABLE_PAYLOAD_CHECKSUMS.sha256
elektron-digital-twin-foundation/  Layer-governed 3D digital-twin docs (owner: twin lead; PR #2/#3)
docs/
    ENGINEERING_CONSTITUTION.md    Rules that rarely change
    AI_INSTRUCTIONS.md             AI operating manual
    DECISION_REGISTER.md           Engineering decisions (D-001..)
    CHANGELOG.md                   Change history
    STRUCTURE_FREEZE.md            This declaration
    audits/                        Point-in-time reviews
    doctrine/                      Cross-cutting engineering doctrine
    handoffs/                      Live + archived cross-agent handoffs
    research/                      Open research register, source claims, immutable raw batches
    roadmaps/                      Per-milestone + release roadmaps
    specifications/                Active revision (07) + modules
    status/                        Phase, ledger, blockers, platform status
engine/
    migrations/                    Versioned SQL schema (001..)
    src/                           Rule engine + platform build-package layer
    scripts/                       migrate / seed / verify / platform001:generate
    verify/                        Adversarial + determinism + perf harnesses
    test/                          node:test integration suites
    output/                        Generated build packages (demonstration)
```

## Changing the structure

1. Open a Decision Register entry naming the new/renamed/removed directory and its
   answers to the four questions.
2. Update this file and `README.md` in the same change (by proposal, never silently).
3. Reference the decision in the commit.

Until then, this layout is fixed.
