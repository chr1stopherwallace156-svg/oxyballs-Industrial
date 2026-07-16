# FIRST_PRINCIPLES.md — Architecture Review (Read-Only)

Scope: Architecture-only review of the proposed FIRST_PRINCIPLES.md.  
Constraints: No implementation code, no edits to FIRST_PRINCIPLES.md, no Layer 1 work.  
Cross-references: README.md, AGENTS.md, DECISIONS.md, DATA_MODEL.md, REQUIREMENTS.md, and L00 documents.

---

## 0) Summary verdict

- The document is directionally strong as a constitutional base. It formalizes identity, state/time, evidence, and authority ranking consistent with EDTS discipline.
- However, several terms need definition alignment with existing docs, some rules risk over-constraining future implementation, and “digital twin vs shadow vs model” needs explicit taxonomy.
- Recommendation: Accept core philosophy and verification posture as constitutional; revise vocabulary alignment, coordinate conventions, and scope boundaries; add taxonomy and examples; defer anything that collides with current L00 status (platform not yet locked).

Outcome categories used below:
- ACCEPT_AS_CONSTITUTIONAL — long-lived principles that should guide all specs
- ACCEPT_AS_TECHNICAL_SPEC — prescriptive rules that fit a versioned spec
- REVISE — keep intent, adjust wording/scope
- RESEARCH_REQUIRED — needs authoritative basis or cross-doc alignment
- REJECT — inappropriate or conflicting as written

---

## 1) Comparison with existing docs

Alignment (strong):
- AGENTS.md: “No invention,” evidence-first, append-only handoffs, verification posture — matches Scientific Verification and Evidence sections.
- REQUIREMENTS.md: Layer gates and provenance expectations — consistent with Evidence and Authority Ranking.
- DATA_MODEL.md: Entities (ReferenceVehicle, Component, GeometrySource, Dimension), gate records — compatible with Universal Object Rule (identity, location, state, history, relationships, evidence).

Gaps/Conflicts:
- Coordinate system: DATA_MODEL.md sets origin at rear-axle/ground (tentative), while FIRST_PRINCIPLES references ISO 8855 without selecting an origin convention. Needs harmonization.
- Relationship predicates: DATA_MODEL currently doesn’t encode directionality vocabulary (IS_PART_OF, MECHANICALLY_COUPLED_TO, etc.) — good addition, but must be integrated as a controlled vocabulary with examples and cardinality.
- Time semantics: L00 STATUS and gate records track status snapshots, but we lack a canonical event model (event IDs, actors, timestamps, signatures). FIRST_PRINCIPLES introduces lifecycle log — good, but requires schema alignment.
- Digital twin vs shadow vs model: Not yet defined elsewhere; add explicit taxonomy to prevent over-claiming “twin” before VIN binding.
- Authority tiers mention CAD/BBAS; LEGAL_LICENSES.md flags COUNSEL_REVIEW_REQUIRED. Need explicit cross-reference that “Tier 1 use” does not imply redistribution rights.

Duplication (acceptable with clarifications):
- Evidence hierarchy vs AGENTS/QUALITY_STANDARD — acceptable overlap; centralize the hierarchy in FIRST_PRINCIPLES and reference from others.

Undefined/ambiguous terms:
- “Knowledge Engine” vs “Knowledge Graph/Semantic Engine” — unify term(s) and define role vs data store vs inference.
- “6D Object Rules” referenced in sources; not defined — add definition or relocate to EDTS Design Directives.
- “Tolerated Margin of Error” — establish project-wide tolerances and per-tier accuracy (cross-link THREE_D_SPEC tiers A/B/C).

Over-rigidity risks:
- “Two independent sources to verify” — good for constitutional high bar; allow exceptions (e.g., a single OEM drawing + measured confirmation) without blocking progress where dual-source is infeasible. Presently partly allowed; clarify.
- “Tier 4 cannot verify a specification” — correct, but Tier 4 can seed RESEARCH_REQUIRED; make this explicit (not a data dead-end).

---

## 2) Contradictions, duplication, undefined terms, over-rigid rules

- Contradictions
  - None hard, but potential tension: Authority Ranking (Tier 1 CAD/BBAS) vs LEGAL_LICENSES constraints. Classification: REVISE — add explicit “internal-use only” footnote.
  - L00 platform unresolved; examples using F-450 should be labeled illustrative, not prescriptive. Classification: REVISE (mark examples illustrative).

- Duplicated rules (benign)
  - “Evidence-first” appears in AGENTS/QUALITY_STANDARD. Classification: ACCEPT_AS_CONSTITUTIONAL; de-duplicate by referencing FIRST_PRINCIPLES from those docs during future refactors.

- Undefined terms
  - “Knowledge Engine” vs “Knowledge Graph”: REVISE — either define both (Engine = reasoning + services; Graph = RDF/OWL store), or consolidate.
  - “6D Object Rules”: RESEARCH_REQUIRED — define the six dimensions (likely 3D space + time + state + provenance) or correct term.
  - “Tolerated Margin of Error”: RESEARCH_REQUIRED — bind to THREE_D_SPEC accuracy tiers and metrology procedures.

- Over-rigidity
  - Dual-source verification bar: REVISE — adopt “two independent Tier 1–3 sources OR one Tier 1 plus metrology confirmation,” already implied but should be explicit.
  - Bi-directional relationship requirement: REVISE — allow directional predicates where appropriate; mirror links can be materialized by query or inference, not duplicated facts.

---

## 3) Classification of major statements

Philosophy & Axiom
- “Visualization is a projection of identity/relationships/state/evidence” — ACCEPT_AS_CONSTITUTIONAL
- “3D without knowledge = puppetry” — ACCEPT_AS_CONSTITUTIONAL

Universal Object Rule (6 Pillars)
- Identity, Location, State, History, Relationships, Evidence — ACCEPT_AS_CONSTITUTIONAL
- Location uses ISO 8855; origin policy TBD — REVISE (harmonize with DATA_MODEL/THREE_D_SPEC origin and units; define transforms)

Core System Definitions
- Vehicle, Assembly, Component definitions — ACCEPT_AS_CONSTITUTIONAL (align with DATA_MODEL terms)
- Procedure (preconditions/execution/postconditions) — ACCEPT_AS_TECHNICAL_SPEC (to be enforced in L04+)
- Evidence classes (design records, physical observations, telemetry) — ACCEPT_AS_CONSTITUTIONAL; licensing caveat REVISE

Time/History
- Immutable lifecycle log with event snapshots — ACCEPT_AS_TECHNICAL_SPEC (requires schema and IDs)
- Standard transitions list — REVISE (enumerate in a versioned spec to allow extension per subsystem)

Relationship Model
- Predicate set (IS_PART_OF, MECHANICALLY_COUPLED_TO, THERMALLY_COUPLED_TO, ELECTRICALLY_CONNECTED_TO, AFFECTS_STATE_OF) — ACCEPT_AS_TECHNICAL_SPEC; REVISE to add inverse semantics and cardinality rules; link to ontology module

Data Integrity & Scientific Verification
- Tiered authority (Tier 1..4) — ACCEPT_AS_CONSTITUTIONAL
- Conflict handling via discrepancy node — ACCEPT_AS_TECHNICAL_SPEC (requires schema/process hook)
- “Tier 4 cannot verify” — ACCEPT_AS_CONSTITUTIONAL; REVISE to note Tier 4 can seed leads only
- “Two independent sources” — REVISE (allow Tier1+metrology)

Naming Standard
- Hierarchical snake_case with postfixes — ACCEPT_AS_TECHNICAL_SPEC; REVISE to bind to DATA_MODEL identifiers and add canonical examples for vehicles/components/procedures

13 Cognitive Layers
- Informational map — ACCEPT_AS_CONSTITUTIONAL (guidance), with note to keep alignment to existing project milestones (Rev07 / M10)

Research Dossier Template
- Structure — ACCEPT_AS_TECHNICAL_SPEC (adopt as Layer B baseline); the “Blast Radius” section — ACCEPT_AS_TECHNICAL_SPEC (high value for impact analysis)

Digital twin vs shadow vs model (missing)
- Taxonomy definition — RESEARCH_REQUIRED (add explicit section; propose: Model = visual only; Shadow = one-way state feed; Twin = bi-directional or tightly bound to a specific VIN with lifecycle sync)

Coordinate frames
- ISO 8855 acceptance — ACCEPT_AS_CONSTITUTIONAL; origin & unit policy — REVISE to bind with THREE_D_SPEC (mm internal; rear-axle/ground or an alternative canonical datum, plus transforms)

Component decomposition levels
- Lowest “maintainable/inspectable/replaceable” — ACCEPT_AS_TECHNICAL_SPEC; REVISE to define thresholds (e.g., fastener-as-component rules, grouped hardware conventions)

Evidence sufficiency
- “Verified” bar — REVISE per above; add example decision trees

Source authority
- Accept hierarchy — ACCEPT_AS_CONSTITUTIONAL; add license caveats — REVISE

---

## 4) Specific focus reviews

- Entity classes: Compatible with DATA_MODEL; map “Assembly/Component/Procedure/Evidence” to existing JSON schemas (REVISE: create ontology mapping table in a future spec module).
- Temporal/event semantics: Strong; needs event schema (id, actor, timestamp, signature, origin/source, affected_entity, before/after state) — ACCEPT_AS_TECHNICAL_SPEC with REVISE.
- Relationship directionality: Define inverses (CONTAINS inverse of IS_PART_OF), avoid storing both directions unless materialized — REVISE.
- Evidence sufficiency: Add dual-path verification (Tier1+metrology) and approval workflow — REVISE.
- Source authority: Align with LEGAL_LICENSES (COUNSEL_REVIEW_REQUIRED for BBAS; internal-use only) — REVISE.
- Coordinate frames: Bind ISO 8855 with explicit project origin and transforms; record unit policy (mm internal) — REVISE.
- Component decomposition: Add guidance for fasteners, consumables, and wiring harness subcomponents — REVISE (technical spec).
- Digital model vs shadow vs twin: Add explicit taxonomy with criteria and gating (VIN binding, state sync, telemetry) — RESEARCH_REQUIRED → future addendum.

---

## 5) Proposed edits (do not apply yet; owner review first)

Shortlist of targeted revisions:
1) Vocabulary alignment: choose canonical term(s) — “Knowledge Engine (services) over Knowledge Graph (store)” — add definitions.
2) Add “Digital Model vs Digital Shadow vs Digital Twin” taxonomy with acceptance criteria and examples.
3) Authority ranking + licensing note: explicitly state internal-use only for OEM CAD/BBAS; cross-link LEGAL_LICENSES.md.
4) Verification rule: “Two independent Tier1–3 sources OR one Tier1 + Tier2 metrology cross-check.”
5) Coordinate system and origin: adopt ISO 8855 + project origin/units (mm, with transforms); link to THREE_D_SPEC.
6) Event schema: introduce standard fields and storage conventions; link to STATUS/ledger once defined.
7) Relationship ontology: define inverse semantics, allowed cardinalities, and domain/range examples; centralize as an ontology module.
8) Fastener/component granularity: guidance when a fastener is a first-class Component vs attribute of an Assembly; wiring harness treatment.
9) Clarify that all F-450 examples are illustrative pending L00 platform lock.

Classification for each proposed edit: REVISE.

---

## 6) Acceptance table (condensed)

| Section | Statement class | Classification |
|--------|------------------|----------------|
| Axiom | Visualization is projection of identity/relationships/state/evidence | ACCEPT_AS_CONSTITUTIONAL |
| 6 Pillars | Identity/Location/State/History/Relationships/Evidence | ACCEPT_AS_CONSTITUTIONAL |
| Evidence classes | Design/Physical/Telemetry | ACCEPT_AS_CONSTITUTIONAL |
| Authority tiers | Tier1..Tier4 + discrepancy handling | ACCEPT_AS_CONSTITUTIONAL (licensing note REVISE) |
| Time/history | Immutable lifecycle + snapshots | ACCEPT_AS_TECHNICAL_SPEC (event schema REVISE) |
| Relationships | Predicate set | ACCEPT_AS_TECHNICAL_SPEC (inverse/cardinality REVISE) |
| Naming | Hierarchical snake_case | ACCEPT_AS_TECHNICAL_SPEC (bind to DATA_MODEL REVISE) |
| Research dossier | Structure + Blast Radius | ACCEPT_AS_TECHNICAL_SPEC |
| Coordinate system | ISO 8855 reference | REVISE (origin/transform policy) |
| Digital twin taxonomy | Model/Shadow/Twin | RESEARCH_REQUIRED |
| Dual-source rule | Two independent sources | REVISE (add Tier1+metrology path) |
| Tier 4 usage | Cannot verify | ACCEPT_AS_CONSTITUTIONAL (clarify can seed research) |

---

## 7) Next steps (no edits applied)

- Owner review of this architecture assessment.
- If approved, prepare a minimal, surgical revision PR limited to FIRST_PRINCIPLES.md with the REVISE/RESEARCH_REQUIRED items above, and add an ontology stub file for relationships and event schema (architecture-only, no implementation code).

Note: Layer 1 remains blocked; L00 is still `REFERENCE_CONFIGURATION_BLOCKED` pending platform selection.
