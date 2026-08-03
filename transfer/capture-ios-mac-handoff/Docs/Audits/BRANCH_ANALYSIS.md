<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# BRANCH_ANALYSIS

## Executive summary

Audited tip `b5fe020` on `cursor/capture-v2-engineering-audit-d881` (= `cursor/ekp-knowledge-artifacts-d881`). Working tree clean. **`main` is stale** (0 ahead / many behind feature tips). Phase 1 freeze tag missing. Valuable **unmerged** work: Commit A freeze isolation, professional UX + black-frame guard. Many historical pass* branches are subsumed or superseded by tip lineage.

## Evidence

### Tips (short SHA)

| Branch | Tip | Role |
|---|---|---|
| `main` | `338d436` | Stale baseline; no Specifications/ |
| `cursor/phase1c-freeze-commit-a-d881` | `658fde7` | Commit A — Phase 1 only + CHANGE-0001 |
| `cursor/phase1c-evidence-library-d881` | `1f5e817` | Specs + Phase1C staging ancestor |
| `cursor/phase1c-evidence-library-handoff-d881` | `d78446b` | Two-stage handoff |
| `cursor/ekp-knowledge-artifacts-d881` | `b5fe020` | Five artifacts + EKP (Track B tip) |
| `cursor/capture-v2-engineering-audit-d881` | `b5fe020`+ | This audit (extends Track B) |
| `cursor/professional-capture-ux-d881` | `2f61be3` | UX + depends on blackframe |
| `cursor/lifecycle-blackframe-instrument-d881` | `413dfe5` | Black-frame guard |
| `feature/phase1-single-still-runtime` | `c3581d0` | Historical Phase1 |
| `handoff/005382b` | `005382b` | Historical handoff |

### Tags

- `capture-ios-phase0-approved-v0.1.3`
- `capture-ios-phase1-directive-v0.1.4`
- **Missing:** `v1.0.0-phase1c`

### Ahead of audited tip (not contained)

| Branch | Commits not in `b5fe020` |
|---|---|
| `cursor/phase1c-freeze-commit-a-d881` | 3 (intentional isolation) |
| `cursor/professional-capture-ux-d881` | 2 |
| `cursor/lifecycle-blackframe-instrument-d881` | 1 |

### Orphan / likely superseded

Pass1/Pass2 feature branches, `canonicalization-failed-repair`, `developer-help-system`, `operations-guardrail-system` — verify before deletion; do not mass-delete without operator ack. Prefer archive notes over silent branch deletion.

### Release history

No Capture v2 release. Phase 0/1 directive tags only. Handoffs HANDOFF-0032…0034 and EKP-CAPTURE-0001/0002 are process packages, not product releases.

## Findings

1. **Never freeze from Track B tip** — use Commit A branch for `v1.0.0-phase1c`.
2. UX/black-frame should be evaluated as Phase1 hardening cherry-picks, not silent main merges.
3. `main` merge strategy needed after freeze (industrial delivery may differ).

## Risk level

**High** if wrong branch tagged or Specs land on freeze tag.

## Recommended action

Operator checklist: equivalence on Commit A → tag → protect → then merge/review Track B separately.

## Priority

P0

## Confidence

High
