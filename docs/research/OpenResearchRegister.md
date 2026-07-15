# OPEN RESEARCH REGISTER

Register of OpenDataRequirements (ODRs): engineering data that is
required but not yet backed by evidence. Per the
[Engineering Constitution](../ENGINEERING_CONSTITUTION.md) (Article VII),
unknown data is never guessed — it is registered here and blocks
dependent work until resolved.

Entries are append-only. Resolution is recorded on the entry with a
reference to the evidence; entries are never deleted.

**Entry format:**

```
## ODR-NNN — <what data is required>
- Filed: YYYY-MM-DD
- Status: Open | Resolved (YYYY-MM-DD)
- Blocks: what work cannot proceed without it
- Resolution evidence: reference (when resolved)
```

---

## ODR-001 — Revision 07 state machine definitions

- Filed: 2026-07-15
- Status: Open
- Blocks: `specifications/Revision_07.md` sections 2 and 6; all of M10.
- Resolution evidence: —

## ODR-002 — Revision 07 normalized schema definitions

- Filed: 2026-07-15
- Status: Open
- Blocks: `specifications/Revision_07.md` section 3; M10 schema layer.
- Resolution evidence: —

## ODR-003 — Revision 07 guardrail, evidence, and configuration-locking requirements

- Filed: 2026-07-15
- Status: Open
- Blocks: `specifications/Revision_07.md` sections 4–5; M10 evidence
  store and configuration lock storage.
- Resolution evidence: —
