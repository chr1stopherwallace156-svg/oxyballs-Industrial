# MERGE REPORT — PR #1

**PR:** `claude/docs-structure-large-projects-b6vxx5` → `main`
**Scope:** additive · GitHub PR diff +51,794 / −1 across 275 files (three-dot from merge-base)
**Base (merge-base):** `baf6aa9` · **Release tag:** `v0.1.0-rc1`
**Recommendation:** **Merge is safe.** The README is resolved intentionally on the
branch; nothing on the branch deletes or overwrites main's work (the digital-twin
foundation is preserved in full).

> This report is a pre-merge gate. It makes no approval/safety claim about the
> conversion itself — the Build Engine remains DRAFT-only.

---

## New Capabilities — what Elektron can do after this merge that it couldn't before

1. **Run a deterministic Build Engine.** `cd engine && npm run migrate/seed/verify/test/build`
   — a SQLite + TypeScript rule engine with a DB-enforced authorization state
   machine, canonical `L_min` runout math, config-lock cascade, and an append-only
   hash-chained evidence ledger.
2. **Generate a real build package from a real truck.** `npm run platform001:generate`
   turns the locked 2019 Ford F-450 Super Duty Chassis Cab configuration into a
   controlled `DRAFT_INCOMPLETE` package: vehicle identity, compatibility
   evaluations, open-data requirements, a draft BOM, and a report
   (`engine/output/platform-001/build-package.{md,json}`).
3. **Turn missing knowledge into an ordered work queue.** Every unknown becomes a
   tracked OpenDataRequirement + a deterministic block reason, now **categorized by
   effort** (Research / Configuration / Components / Verification).
4. **Prove the engine can't be cheated.** Two adversarial harnesses
   (`verify:attack`, `verify:attack:package`) + a determinism harness, all runnable,
   plus 55 integration tests.
5. **Govern the work.** A full paper trail — Engineering Constitution, Decision
   Register, Implementation Ledger, Changelog, cross-agent handoff protocol, and the
   Revision 07 research corpus (ingestion 75/75).

## Files Added — categories, not filenames (273 added, 0 of main's files removed)

| Area | ~Files | What it is |
|---|---:|---|
| `docs/research/` | 162 | Revision 07 raw research batches (immutable evidence) + registers |
| `docs/status/` | 33 | Phase, ledger, blockers, gate states, `PLATFORM_001_STATUS.md` |
| `engine/src/` | 22 | M10 rule engine + the `platform/` build-package layer |
| `docs/specifications/` | 14 | Revision 07 index + modules |
| `engine/migrations/` | 5 | Versioned SQL schema `001..005` |
| `docs/roadmaps/` | 5 | M10, M11, ingestion, gate queue |
| `engine/verify/`, `scripts/`, `test/` | 11 | Harnesses, CLI scripts, integration tests |
| `engine/` reports + config | ~6 | EVIDENCE_PACK, VERIFICATION_REPORT, package.json, tsconfig, .gitignore |
| Root governance | ~4 | `CLAUDE.md`, `AGENTS.md`, `.cursor/`, Constitution/registers |

## Architecture Changes

- **A dedicated deterministic engine** (`engine/`) — `node:sqlite` `DatabaseSync` +
  TypeScript, minimal deps (typescript + @types/node). Chosen for a zero-infra,
  reproducible, single-file store.
- **Enforcement pushed to the database layer.** Guardrails are DB triggers + CHECK
  constraints (state machine, activation preconditions, append-only evidence,
  single-active, VIN uniqueness), not just service code — a direct SQL write cannot
  bypass them.
- **A layered build-package system above M10** (`engine/src/platform/`). It consumes
  the rule engine but never gains write authority that bypasses the DB guards. Build
  packages are CHECK-locked to `DRAFT_INCOMPLETE`.
- **Determinism as a contract.** All ids and hashes are pure functions of canonical
  inputs; wall-clock timestamps are excluded from hashes; regeneration is
  byte-identical (self-checked).
- **Atomicity via nestable SAVEPOINTs** (`atomic()`), so multi-write operations
  commit or roll back as one unit.

## Breaking Changes

**None.** The branch is purely additive relative to `main`:
- It adds `engine/` and `docs/`; it does **not** modify or delete
  `elektron-digital-twin-foundation/` (main's PR #2/#3 work) — verified: all 480 of
  those files are present in the simulated merged tree.
- The only file changed on both sides is `README.md` (see below).
- No public API, schema, or script that main depends on is changed or removed.

## Risk Assessment

**HIGH — none.** No data loss, no overwrite of main's work, no runtime coupling
between the two workstreams (they share no code, only the repo root + README).

**MEDIUM**
- **README merge conflict** — the repo's front door. Must be resolved intentionally,
  not auto-merged (done on the branch; confirm at merge).
- **Large PR (180 commits).** Reviewers should lean on this report + the governance
  docs rather than reading 273 files linearly.

**LOW**
- Documented M10 residuals (all tracked, none blocking): A9 clock-trust (accepted
  risk), no PKI on signatures, single-writer/no-WAL concurrency, telemetry
  unmanaged, float-epsilon geometry. These are prototype-scope limits, not defects —
  see `engine/VERIFICATION_REPORT.md`.
- Committed generated artifact (`engine/output/...`) carries a `generated_at`
  timestamp, so regenerating produces a diff. Intentional (demonstration file).

## Prototype Impact — how much closer to Prototype 001?

**Materially closer on the software/spine; the physical gap is now precisely named.**
Before this merge, "what's missing for the F-450 conversion" lived in people's heads.
After it, the engine emits the **exact, ordered, categorized queue** for one real
truck: **24 release blockers → Research 3 · Configuration 0 · Components 19 ·
Verification 2**, backed by **7 open OpenDataRequirements** (ODR-004..010).

- **Done:** deterministic pipeline config → evaluation → blockers → BOM → report;
  the first reference platform is locked and loadable.
- **Not done (and honestly blocked):** every physical/engineering value (axle
  weights, GVWR, component specs), component selection for 19 of 20 categories, and
  physical frame verification. No supplier data; no SIL/HIL; no physical work.

Net: Prototype 001 is no longer a vague goal — it is a finite checklist the engine
maintains. The next unit of progress is closing ODR-004..006 (baseline axle
weights + GVWR), which also unlocks the first Weight→CG calculator.

## Technical Debt

**Removed (fixed with regression tests):**
- Multi-write atomicity gap → SAVEPOINT `atomic()` wrapper.
- O(n) join (missing indexes) → migration `004`, ~16.5 ms → ~0.013 ms/query at 100k.
- Un-approvable build-package status enforced at the DB (CHECK); package-scoped child ids.

**Created (small, tracked):**
- Committed generated artifact drifts on regen (timestamp).
- Two additive unit definitions (`in`, `mm`, `lb`) broaden the shared unit model.

**Deferred (tracked, out of scope — see `PLATFORM_001_STATUS.md` / `VERIFICATION_REPORT.md`):**
- PKI on signatures; WAL/concurrency model; telemetry ingestion/partitioning;
  attested time (A9); integer-mm geometry; Platform Calculator Library; functional
  digital twin; Build Package v0.2; guided prototype workflow; M10G SIL / M10H HIL.

## Rollback Strategy

- **Before merging:** nothing to undo — `main` is untouched. Simply don't merge.
- **After merging, if problems appear:** the merge is additive and isolated to
  `engine/` + `docs/` + README, so recovery is clean:
  1. `git revert -m 1 <merge-commit>` on `main` (reverts the whole PR in one commit;
     the digital-twin foundation and site are unaffected because they aren't in the PR).
  2. Or, if only the README is wrong: revert just `README.md` to the intended version.
  3. The branch remains intact for re-work; re-open a corrected PR.
- **Data safety:** the engine ships no production data — the DB is generated locally
  and gitignored; deleting `engine/data/*.db` and re-running `migrate` fully rebuilds.

## README Conflict

- `README.md` is the **only** real merge conflict (both sides edited the original
  one-line file).
- **Resolved intentionally on the branch:** the branch README now combines main's
  front-door content (company line, Victorville CA, digital-twin foundation pointer,
  website link) **and** the Build Engine entry point (current baseline, reading
  order, layout — updated to reflect M10 built + Platform 001 v0.1). At merge, take
  the **branch** version; it already contains main's content, so nothing is lost.
- This keeps the front door deliberate — no GitHub auto-merge of documentation.

## Directory Justification (restructuring for clarity, not reorganizing for its own sake)

Every retained directory answers: **why it exists · who owns it · when it's used ·
which milestone introduced it.**

| Directory | Why | Owner | When used | Introduced |
|---|---|---|---|---|
| `docs/` | Human/AI-readable doctrine + history | Engineering governance | Before any code change | D-001 |
| `docs/specifications/` | The one active spec (Revision 07) + modules | Spec owner | Deciding what is in scope | Rev 07 |
| `docs/roadmaps/` | Per-milestone build plans | Milestone lead | Planning the next milestone | D-002 |
| `docs/research/` | Immutable raw evidence + open-data register | Research | Sourcing/verifying any value | Rev 07 ingestion |
| `docs/status/` | Live truth: phase, ledger, blockers, platform status | Handoff owner | Every session start | Governance |
| `docs/handoffs/` | Cross-agent/session continuity | Current agent | Start/stop of work | Handoff protocol |
| `docs/audits/`, `docs/doctrine/` | Point-in-time reviews / cross-cutting doctrine | Reviewer | On review or doctrine change | as needed |
| `engine/migrations/` | Versioned schema (Article VI) | Engine dev | Any schema change | M10 |
| `engine/src/` | Rule engine + platform build-package layer | Engine dev | All engine behavior | M10 / D-015 |
| `engine/scripts/`, `verify/`, `test/` | CLI, adversarial/determinism harnesses, tests | Engine dev | Build/verify/CI | M10 |
| `engine/output/` | Generated demonstration packages | Generated | Reviewing results | D-015 |
| `elektron-digital-twin-foundation/` | Layer-governed 3D twin docs (from `main`) | Digital-twin lead | Twin work | PR #2/#3 |

If a future folder can't fill this row, challenge whether it belongs.

## Release Tagging (adopted — see `docs/roadmaps/RELEASE_ROADMAP.md`, D-016)

This merge is tagged **`v0.1.0-rc1` — Engineering Foundation (release candidate)**.
It is a candidate, not a final: Prototype 001 does not physically exist, so the tag
communicates "engineering-ready, not product-proven."

Adopted version line (pre-product milestones tag as `-rcN`):

| Version | Name |
|---|---|
| v0.1 | Engineering Foundation |
| v0.2 | Platform 001 Engineering |
| v0.3 | Reference Vehicle Characterization |
| v0.4 | Prototype 001 Assembly |
| v0.5 | Prototype Validation |
| v0.6 | Pilot Customer |
| v1.0 | Commercial Engineering Platform |

## Repository Structure Freeze (declared — see `docs/STRUCTURE_FREEZE.md`, D-016)

Effective at this merge, the top-level and second-level directory layout is frozen.
Adding/renaming/moving/removing a directory requires a Decision Register entry plus a
paired `README.md` + `STRUCTURE_FREEZE.md` update — never silently.

---

## Merge checklist

- [ ] README resolved intentionally (take branch version) — prepared on branch
- [ ] Reviewer has read this report + `PLATFORM_001_STATUS.md`
- [ ] `cd engine && npm ci && npm test` green on a clean checkout (55/55)
- [ ] Confirm `elektron-digital-twin-foundation/` present in the merged tree
- [ ] Tag the merge commit `v0.1.0-rc1` after merge
