# DECISION REGISTER

Record of engineering decisions with lasting consequences. Entries are
append-only: a decision is never edited or removed, only superseded by a
later entry that references it.

**Entry format:**

```
## D-NNN — <short title>
- Date: YYYY-MM-DD
- Status: Accepted | Superseded by D-NNN
- Context: why the decision was needed
- Decision: what was decided
- Consequences: what this binds or unblocks
```

---

## D-008 — Staged post-bench gate ladder to HV: no jump to live commissioning

- Date: 2026-07-16
- Status: Accepted
- Context: Through the Gate 05I low-voltage bench series (05I-A logic → 05I-B
  interlocks → 05I-C comms/sleep-wake → 05I-D integrated fault cascades), the
  Hunter's Gate 05I-D exit language read "the low-voltage bench assembly is
  certified safe for installation into the physical vehicle chassis,
  initiating the physical commissioning phases." In owner review_48 the owner
  rejected "certified safe" and the direct jump from bench to live
  commissioning, and defined a staged, gated path instead.
- Decision: The path from the low-voltage bench to high voltage is a
  **staged ladder, each stage engineer-gated**:
  1. **Gate 05I-D** completion permits **engineering review for controlled
     low-voltage vehicle fitment only** — never "certified safe," and it does
     not authorize live HV, vehicle movement, road testing, chassis-dyno
     testing, customer operation, factory Ford bus transmission, or
     compliance/certification claims.
  2. **Gate 05J — Controlled Vehicle Fitment / No-HV Installation
     Readiness:** install the VCU/harness physically; **no HV battery, no
     traction enable**; CAN_1 listen-only; verify grounds/shields, connector
     routing, no chafing, service access, LOTO, 12 V parasitic draw in the
     chassis, no Ford bus disturbance.
  3. **Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning** — no
     HV, and **no real HV contactor closure** (coils disconnected / dummy
     loads / mechanically blocked, RC-236).
  4. **Gate 05L — Controlled HV First-Energization** — engineer-approved
     only, after 05J + 05K, with a staged safety plan + LOTO/PPE (RC-117).
- **Amendment (owner review_50, batch_53, RC-237): Gate 05L splits — the
  05L rung must not open with "exact HV pre-charge timing."** It begins with
  **Gate 05L-A — HV First-Energization Authorization & Safety Readiness**, a
  pre-energization authorization gate (qualified HV personnel · written test
  plan · LOTO · PPE + insulated tools · emergency-stop plan · rescue/emergency
  response plan · fire watch/exclusion zone · absence-of-voltage verification
  · HV connector/cable inspection · isolation-monitor readiness · pre-charge
  ownership confirmation · contactor ownership confirmation · test-instrument
  calibration · supplier documentation · hard-stop conditions · proof
  artifacts · signoff), with **no final pre-charge/voltage/insulation/
  contactor timing unless supplier docs or engineering review provide them**.
  Only after 05L-A does the actual energization sequence (Gate 05L) get
  detailed. Owner cited OSHA LOTO (authorized-employee lockout; circuits
  energized until LOTO/de-energize/ground; only qualified persons on energized
  parts) + NHTSA EV HV-hazard guidance (NeedsExactSource — owner-paraphrased,
  not archived).
- Consequences: Redefines the earlier "Gate 05J = live vehicle
  commissioning" placeholder — HV first-energization is pushed to **Gate
  05L**, engineer-approved, behind two no-HV fitment/power-on gates **and the
  05L-A authorization gate**. Binds the roadmap after Gate 05I-D. The Build
  Engine never marks a bench assembly "certified safe" (RC-224). Recorded in
  `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md`,
  `docs/status/GATE05K_VEHICLE_POWER_ON.md`. Supersedes nothing.

## D-007 — Controls-authority doctrine: Coordinator ≠ Owner + Build Engine Authority Law

- Date: 2026-07-16
- Status: Accepted
- Context: Through the Gate 05 controls work (05A–05D), a recurring risk
  appeared of the VCU quietly being treated as the owner of every
  safety-critical action (pre-charge, main contactors, HV shutdown, torque,
  Ford cluster/ABS-ESC), simply because it can see the signals or
  coordinate the state machine. In owner review_35 (batch_38, Gate 05D) the
  owner elevated the coordination principle to "a permanent Build Engine
  doctrine line."
- Decision: Adopt as permanent Build Engine doctrine —
  **Coordinator ≠ Owner · Requesting ≠ Commanding · Monitoring ≠ Approving ·
  Seeing a signal ≠ having authority to act on it** — paired with the
  **Build Engine Authority Law:** *No state transition may become
  physical-control authority until every action inside that transition has
  an assigned owner, an allowed requester, a blocked-controller list, and a
  proof artifact. If ownership is unknown, the VCU may simulate, monitor, or
  request only — it may not directly control.* A state may be **simulated**
  while ownership is pending; it may **not control physical hardware** until
  every action inside it has owner · requester · monitor · blocked
  controllers · proof artifact · verified source · test status.
- Consequences: Binds all controls gates (Gate 05x and downstream). Every
  state/action must carry an ownership label; the VCU coordinates but owns
  nothing safety-critical without documentation (contactor / pre-charge /
  HV-shutdown / torque ownership remain PENDING supplier architecture,
  BQ-27). Ford-side factory networks stay listen-only unless officially
  authorized; EV-side outputs stay isolated. Recorded in
  `docs/status/GATE05D_OWNERSHIP_MATRIX.md`. Supersedes nothing.

## D-006 — Split the donor platform: 001A (7.3L gas) vs 001B (6.7L diesel)

- Date: 2026-07-16
- Status: Accepted
- Context: The batch_26 Gate 07 payload introduced factory-component CG
  and weight data for a **6.7L Power Stroke diesel + 10R140**
  transmission, but the active build direction is the **7.3L gas**
  F-450/F-550 chassis cab. Diesel and gas powertrains differ in mass and
  CG, so mixing them would corrupt the weight/axle/CG model.
- Decision: Formalize two donor platforms — **Platform 001A =
  F-450/F-550 7.3L gas** (the active direction) and **Platform 001B =
  F-450/F-550 6.7L diesel** (separate, only if the donor is actually
  diesel). Removed-component weight and CG data must be tagged to the
  correct platform; diesel data may not enter the 001A model unless the
  donor truck is diesel.
- Consequences: Gate 07 (and the removed-mass ledger, Gate 07B) tracks
  component weights per platform; the engine/trans CG blocker (BQ-13) is
  a 001A gas value, not a diesel one. Binds which weight/CG figures are
  valid inputs; supersedes nothing.

## D-005 — Park supplier-only questions; proceed with supplier-independent research

- Date: 2026-07-16
- Status: Accepted
- Context: Gate 04 (and the powertrain gates) reached
  BLOCKED_PENDING_SUPPLIER_RESPONSE / BLOCKED_PENDING_SUPPLIER_DATA. The
  supplier letters are drafted but not yet sent (sending is an owner
  action), so the final numbers could be days or weeks away. Waiting
  idle wastes the interval; guessing the values would violate the
  Constitution.
- Decision: (1) Adopt a **park-and-proceed** operating rule — a gate
  that is blocked only on a supplier value is marked
  BLOCKED_PENDING_SUPPLIER_RESPONSE, its open question is logged in the
  new **Blocked Questions Ledger** (`docs/status/BLOCKED_QUESTIONS_LEDGER.md`,
  owner-specified 8-field structure), and research continues on the
  supplier-*independent* work: test plans, failure-mode logic, controls,
  mechanical mounting, and weight. (2) Adopt the owner's ordered,
  supplier-independent research plan — **Gate 04B → 04C → 05 → 06 →
  07 → 08** — captured with verbatim prompts in
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md`. (3) Supplier data closes final
  numbers only; nothing researched in the interim may be marked
  Confirmed, claim compliance, or state the vehicle is safe.
- Consequences: the project is never idle on supplier latency; every
  parked value has a home, a follow-up date, and an explicit
  "alternative research allowed" path, so no blocked question is lost;
  the 7-day follow-up clock starts on each letter's actual send date.
  Supersedes nothing; extends the review_16 gate roadmap ordering.

## D-004 — Handoff fallback triggers, branch single-writer rule, deferred validity hashes

- Date: 2026-07-15
- Status: Accepted
- Context: "Nearing usage/context limits" is not reliably
  self-detectable by an agent, so continuity could fail on a missed
  prediction; and the protocol could still fail if two agents edited
  the same branch simultaneously.
- Decision: (1) Operational fallback triggers — a handoff is also
  mandatory after every completed source-ingestion batch, every
  meaningful commit, every two hours of uninterrupted work, any
  unresolved contradiction recorded, and any dirty working tree before
  switching agents. (2) Branch single-writer rule — only one agent may
  own and modify an active branch at a time; ownership lives in the
  handoff's `Agent owner` field; transfer requires commit-or-document,
  push, END_COMMIT, and owner reassignment; receivers must not edit
  until ownership names them. (3) Handoff validity hashes
  (handoff_file_hash, active_spec_hash, implementation_ledger_hash,
  blockers_file_hash) are deferred to M10 start — an enhancement, not
  a blocker; source ingestion is not delayed for it.
- Consequences: Continuity no longer depends on usage prediction;
  concurrent-edit conflicts are a protocol violation with a defined
  transfer procedure; the hash enhancement is tracked in the M10
  roadmap so it cannot be silently forgotten.

## D-003 — Install the Elektron cross-agent handoff protocol

- Date: 2026-07-15
- Status: Accepted
- Context: Multiple AI agents (Claude Code, Cursor) work in this
  repository across sessions with practical context limits. Without a
  shared handoff format, state is lost between agents and completion
  claims go unverified.
- Decision: One handoff format for all agents, defined in `AGENTS.md`
  (mirrored for Cursor in `.cursor/rules/elektron-build-engine.mdc`)
  with the template in `docs/handoffs/templates/`. Handoffs are
  mandatory before stopping, nearing usage/context limits, switching
  agents, or completing a milestone, and must include branch, start/end
  commit, files changed, tests run, test results, blockers, next exact
  action, and forbidden actions. Receiving agents verify git status,
  commit hash, active spec, and tests before modifying files. Work is
  never marked complete on agent statements alone — verification
  evidence goes in `docs/status/IMPLEMENTATION_LEDGER.md`. Phase truth
  lives in `docs/status/CURRENT_PHASE.md`; blockers in
  `docs/status/BLOCKERS.md`. `HANDOFF_LOG.md` is append-only evidence.
- Consequences: Any agent can resume from a cold start by reading
  `CURRENT_HANDOFF.md` and re-verifying. Unverified completion claims
  are structurally visible as `Claimed` ledger entries.

## D-002 — Modularize Revision 07; add source-ingestion phase before M10

- Date: 2026-07-15
- Status: Accepted
- Context: A single enormous Revision_07.md would be hard to review,
  version, and supersede. The approved Revision 07 doctrine exists as
  ~75 raw research exchanges that must be consolidated, not pasted in
  as-is.
- Decision: Revision 07 is constituted by modules 00–12 under
  `docs/specifications/rev07/`, indexed by `Revision_07.md` and
  `00_BASELINE_INDEX.md`; no module may override the Engineering
  Constitution. A dedicated phase — Revision 07 Source Ingestion and
  Consolidation (`roadmaps/REV07_SOURCE_INGESTION.md`) — precedes M10:
  raw batches are archived immutably under `docs/research/raw/`, then
  consolidated per module with full traceability. ODR-001..ODR-003 may
  not be resolved until all batches are processed, contradictions
  reviewed, the Baseline Index is complete, and the owner explicitly
  approves. No production code during ingestion.
- Consequences: M10 entry conditions now depend on the ingestion phase.
  Raw research is evidence (immutable); consolidated modules are the
  only path from research to active doctrine.

## D-001 — Adopt entry-point documentation structure

- Date: 2026-07-15
- Status: Accepted
- Context: Engineering doctrine will grow to hundreds of pages; a single
  README cannot hold it and remain maintainable.
- Decision: The README is the entry point only. Doctrine is split into
  the Engineering Constitution (stable rules), AI Instructions
  (operating manual), versioned specifications (one active), roadmaps
  (per milestone), and research registers, all under `/docs`.
- Consequences: Exactly one specification is marked
  `ACTIVE_SPECIFICATION` at a time; superseded revisions are archived in
  place. README baseline updates are made by proposal at milestone
  boundaries, never silently.
