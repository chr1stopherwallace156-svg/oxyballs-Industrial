# HANDOFF TEMPLATE

Copy this template into `docs/handoffs/CURRENT_HANDOFF.md` (after
appending the previous handoff to `docs/handoffs/HANDOFF_LOG.md`).
Every field is mandatory; write `none` explicitly rather than omitting
a field. An incomplete handoff is invalid — the receiver must treat the
repository state, not the handoff, as ground truth.

---

```markdown
# CURRENT HANDOFF

## Session

- From agent: <Claude Code | Cursor | other — and model if known>
- Date (UTC): YYYY-MM-DD HH:MM
- Reason for handoff: <stopping | context/usage limit | agent switch | milestone complete>

## Git state

- Branch: <branch name>
- **Agent owner: <the ONLY agent allowed to modify this branch —
  current owner, or the receiving agent if this handoff transfers
  ownership>**
- Start commit: <hash + subject — HEAD when this session began>
- End commit: <hash + subject, or "the commit containing this handoff
  update — verify with git log -1">
- Working tree at handoff: <clean | uncommitted changes listed explicitly>

## Work performed

- Files changed: <list every file, or "see git diff <start>..<end>">
- Summary: <what was actually done — claims, not certifications>

## Verification

- Tests run: <exact commands, or "none — no test suite exists as of <commit>">
- Test results: <pass/fail counts, failures verbatim, or "n/a">
- Verified vs claimed: <what the agent verified with evidence vs what
  is merely claimed; ledger entries updated in
  docs/status/IMPLEMENTATION_LEDGER.md>

## State

- Current phase: <from docs/status/CURRENT_PHASE.md>
- Blockers: <list, cross-referenced to docs/status/BLOCKERS.md, or "none">

## Next exact action

<One concrete, unambiguous action the receiving agent should take
first. Not a goal — an action.>

## Forbidden actions

<What the receiving agent must NOT do, e.g.:>
- Do not implement M10 or any production code (ingestion phase).
- Do not resolve ODR-001..ODR-003 (owner-approval gate).
- Do not edit files under docs/research/raw/.
- Do not mark work complete without verification evidence.

## Receiving-agent checklist (complete BEFORE modifying any file)

- [ ] **Agent owner field names ME** — if not, branch ownership has
      not been transferred; do not edit (AGENTS.md single-writer rule)
- [ ] `git status` — clean tree, expected branch
- [ ] `git log -1` — HEAD matches end commit above
- [ ] Active spec checked (`docs/specifications/Revision_07.md`,
      `rev07/00_BASELINE_INDEX.md`)
- [ ] Claimed tests re-run and results compared (or absence of a test
      suite verified explicitly)
- [ ] `docs/status/CURRENT_PHASE.md` and `docs/status/BLOCKERS.md` read
```
