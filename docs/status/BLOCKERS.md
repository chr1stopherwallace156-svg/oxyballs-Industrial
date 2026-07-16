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
- Status: Active — **gate label per owner (review_14):
  `BLOCKED_PENDING_SUPPLIER_RESPONSE`.** Reason (owner wording):
  battery topology, system current limits, short-circuit current,
  inverter DC-link capacitance, and pre-charge responsibility are not
  yet provided by supplier documentation. **The question set does NOT
  close this gate — supplier replies + datasheets + engineering review
  do.** Allowed next action: proceed to Cooling Package Gap Closure in
  parallel. Required answer fields: 8 Webasto + 8 Dana (review_14;
  letters at `docs/research/outreach/` — Webasto READY_TO_SEND, Dana
  DRAFT awaiting owner approval).
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
- Extended (review_12, owner blockers 04–08): (04) pack topology
  1sNp vs 2sNp must be declared; (05) interface choice — see B-004;
  (06) current demand must be checked at MINIMUM pack voltage, not
  nominal/full charge; (07) DC input current must include
  inverter/motor losses, not ideal P=V×I; (08) 4/6-pack layouts must
  be checked against F-450/F-550 frame space, payload, axle load, and
  cooling. Corrected candidate ranking on file (RC-60): 800 V
  2s2p/4-pack = strongest minimum candidate for review; combined
  supplier question issued (review_12).

## B-004 — INTERFACE_SELECTION_REQUIRED (Webasto VIB vs VIG/VIG Plus)

- Filed: 2026-07-15 (owner directive, review_12)
- Status: Active
- Blocks: acceptance of ANY battery-system current limit (the VIB's
  380 A cont / 580 A 30 s peak vs the VIG/VIG Plus's higher, 18-pack
  capability changes the whole current-bottleneck picture); therefore
  also blocks the topology decision and everything under B-003.
- Unblocked by: supplier-confirmed interface selection (VIB vs
  VIG/VIG Plus) with its official datasheet archived, for the chosen
  400/800 V topology and pack count.

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
