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

## B-005 — A9 TRUSTED-TIME / CLOCK-ROLLBACK AUTHORIZATION BYPASS (engine)

- Filed: 2026-07-23 (adversarial harness A9; confirmed by independent review)
- Status: Active — **accepted-risk for the current scope; must be fixed before the
  engine holds any authoritative safety/time role.**
- Finding: expiry uses a caller-supplied `now` (an injectable test seam), so an
  in-process caller can pass an earlier timestamp and make an EXPIRED authorization
  appear valid again. `npm run verify:attack` reports this as `A9 — BYPASS
  (BYPASS-IS-FINDING)` and, by design, exits 0 with one open finding recorded
  (11/12 BLOCKED) rather than failing the command. Cross-referenced:
  `engine/VERIFICATION_REPORT.md` (risk R1, M10.1 backlog M2), D-013/D-014.
- Blocks (must be closed BEFORE any of these): HV energization authorization;
  vehicle activation; time-limited test permissions; safety-critical approval /
  expiry transitions. **Does NOT block** the local-runtime package, deterministic
  Platform 001 generation, or a non-authoritative camera rehearsal shoot.
- Unblocked by: removing ordinary callers' ability to supply authoritative time —
  use a trusted monotonic or system/server-controlled timestamp for expiry, and
  keep expiry transitions as append-only events (so a rollback cannot silently
  "un-expire" an authorization). Then A9 must flip to BLOCKED with a regression test.

## B-004b — RC2 local-runtime hardening backlog (non-blocking refinements)

- Filed: 2026-07-23 (independent review, RC2)
- Status: Active — **non-blocking**; enter the next hardening pass, not an RC gate.
- Items:
  1. **Live-SQLite backup:** `scripts/backup.sh` copies `engine.db` as a plain file.
     Fine while nothing writes concurrently; once the engine is an active service,
     use SQLite's online-backup API or `VACUUM INTO` and account for WAL/journal state.
  2. **Backup filename resolution:** names use `YYYYMMDD-HHMMSS` (1-second). Two
     backups in the same second could collide — add milliseconds / a collision-safe
     suffix.
  3. **Platform-seed delete-and-reinsert:** derived package rows are deleted FK-safe,
     but the platform/claim/candidate rows are delete-then-recreated. Safe for the
     present schema; as EDTS lineage grows, prefer versioned UPSERT / supersession so
     future references to claim/candidate identities cannot create a new FK conflict.
- Unblocked by: implementing the above in a future engine/runtime hardening commit
  with regression tests; none gates the current package or Mac/iPhone validation.

## B-003 — POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED

- Filed: 2026-07-15 (owner directive, review_11)
- Status: Active — **unified gate label per owner (review_16):
  `BLOCKED_PENDING_SUPPLIER_DATA`** (applies jointly to the HV wiring,
  powertrain, and cooling gates). **Allowed work (owner list):**
  research, simulation framework, decision matrices, test plans,
  failure modes, supplier comparison, packaging study. **Not allowed:**
  final fuse selection, final cable gauge, final pre-charge resistor,
  final pump/radiator sizing, final cooling-loop layout, any final
  compliance/safety claim. **Academic sources may build modeling
  logic; they can never close this gate** — closure requires the
  13 supplier-only items (review_16) + engineering review. Reason
  (owner wording, review_14):
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
