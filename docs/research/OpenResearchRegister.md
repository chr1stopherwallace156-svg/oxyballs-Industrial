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

> **Resolution gate for ODR-001..ODR-003 (owner-imposed, 2026-07-15):**
> none of these three entries may be marked resolved until every
> Revision 07 source batch is processed, all recorded contradictions
> are reviewed, the
> [Revision 07 Baseline Index](../specifications/rev07/00_BASELINE_INDEX.md)
> is complete, **and the owner explicitly approves the resolution**.
> Full conditions:
> [REV07_SOURCE_INGESTION](../roadmaps/REV07_SOURCE_INGESTION.md).

## ODR-001 — Revision 07 state machine definitions

- Filed: 2026-07-15
- Status: Open
- Blocks: Revision 07 modules (see Baseline Index); all of M10.
- Resolution evidence: —

## ODR-002 — Revision 07 normalized schema definitions

- Filed: 2026-07-15
- Status: Open
- Blocks: Revision 07 modules (see Baseline Index); M10 schema layer.
- Resolution evidence: —

## ODR-003 — Revision 07 guardrail, evidence, and configuration-locking requirements

- Filed: 2026-07-15
- Status: Open
- Blocks: Revision 07 modules (see Baseline Index); M10 evidence store
  and configuration lock storage.
- Resolution evidence: —
