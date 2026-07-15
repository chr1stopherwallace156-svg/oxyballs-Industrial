# BLOCKERS

Active blockers and what unblocks them. Entries are closed by marking
`Cleared` with a reference to the clearing evidence — never deleted.

**Entry format:**

```
## B-NNN — <what is blocked and why>
- Filed: YYYY-MM-DD
- Status: Active | Cleared (YYYY-MM-DD, evidence ref)
- Blocks: <work that cannot proceed>
- Unblocked by: <the concrete event or evidence that clears it>
```

---

## B-002 — Verbatim extraction from .gov/CARB sources blocked in current environment

- Filed: 2026-07-15
- Status: Active
- Blocks: page/section/table locator extraction for RH-01 candidate
  claims RC-01..RC-03, RC-05..RC-09
  (`docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`); their
  promotion to SourceClaims.
- Unblocked by: owner-supplied source PDFs archived under
  `docs/research/raw/`, or an agent/session whose network policy can
  reach federalregister.gov, govinfo.gov, ecfr.gov, and
  ww2.arb.ca.gov (current environment receives HTTP 403 via proxy).

## B-001 — Revision 07 doctrine content not yet ingested

- Filed: 2026-07-15
- Status: Active
- Blocks: consolidation of all rev07 modules beyond shells; resolution
  of ODR-001..ODR-003; all of M10.
- Unblocked by: owner delivering the ~75 research exchanges in
  topic-based Markdown batches (processed per
  `docs/roadmaps/REV07_SOURCE_INGESTION.md`), followed by contradiction
  review, a complete Baseline Index, and explicit owner approval of the
  ODR resolutions.
