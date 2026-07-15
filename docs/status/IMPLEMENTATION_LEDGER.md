# IMPLEMENTATION LEDGER

Ledger of implementation work: what has been **claimed** done versus
what has been **verified** done. Append-only; entries are corrected by
follow-up entries, never edited.

**Trust rule:** work is never marked `Verified` based only on an
agent's statement — including the statement of the agent writing the
entry. `Verified` requires reproducible evidence: a command another
agent (or the owner) can re-run, or an artifact they can inspect, cited
in the entry.

**Statuses:** `Claimed` → `Verified` (with evidence) or `Refuted`
(with evidence). Only `Verified` counts toward milestone completion.

**Entry format:**

```
## L-NNN — <what was implemented>
- Date: YYYY-MM-DD
- Agent: <who did the work>
- Status: Claimed | Verified | Refuted
- Commits: <range>
- Evidence: <re-runnable command or inspectable artifact; "-" while Claimed>
- Verified by: <agent/owner + date; "-" while Claimed>
```

---

## L-001 — Documentation governance infrastructure (no production code)

- Date: 2026-07-15
- Agent: Claude Code
- Status: Verified
- Commits: `58bc986`, `7939635`, plus the handoff-protocol commit
  (`git log --oneline` shows the full sequence)
- Evidence: files exist in-tree and match the structure recorded in
  `docs/CHANGELOG.md`; verify with
  `ls docs/specifications/rev07/ docs/handoffs/ docs/status/`
- Verified by: inspection of committed tree (any receiving agent can
  re-verify with the command above)

*(No M10 or other production implementation entries exist — none has
begun. The first such entry must start as `Claimed`.)*
