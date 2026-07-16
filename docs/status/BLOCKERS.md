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

## B-003 — POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED

- Filed: 2026-07-15 (owner directive, review_11)
- Status: Active
- Blocks: all HV Wiring Package component selections (cable gauge,
  connector insert, main fuse, contactor, pre-charge R/relay, MSD
  rating); powertrain candidate advancement; any range/gradeability
  simulation inputs.
- Reason (owner wording): candidate battery output current may not
  support candidate motor/inverter continuous and peak power demand.
  At face values: Webasto VIB 150 A cont / 250 A peak at ≤400 V yields
  ≤60/100 kW vs the Dana SUMO MD 130/250 kW target needing ≈325/625 A
  (RC-58).
- Unblocked by: the Powertrain Compatibility Check (owner-prompted next
  payload), answers to the 20 recorded supplier questions
  (10 Webasto + 10 Dana — review_11), confirmation of system
  architecture (400 vs 800 V, pack count, VIB limits, current
  production status), and engineering review of the resulting numbers.

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
