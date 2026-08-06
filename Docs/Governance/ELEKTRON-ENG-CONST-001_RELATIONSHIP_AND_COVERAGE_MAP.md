# ELEKTRON-ENG-CONST-001 — Relationship and Coverage Map

## Relationship

```
ELEKTRON-ENG-CONST-BASE-001            ACTIVE_FOUNDATIONAL_CONSTITUTION
  docs/ENGINEERING_CONSTITUTION.md     enduring foundational principles
            │
            │  extends / formalizes / operationalizes  (additive; never replaces)
            ▼
ELEKTRON-ENG-CONST-001                 PROPOSED_FOR_RATIFICATION · NOT_ACTIVE
  Docs/Governance/ELEKTRON-ENG-CONST-001.md
                                       additive operational formalization
```

Where both address the same subject: **BASE-001 supplies the enduring foundational principle;
ENG-CONST-001 supplies the detailed operational interpretation, which must remain compatible with it.**
Unresolved conflict produces `CONSTITUTIONAL_CONFLICT` and blocks enforcement pending explicit human
resolution. Neither document may be silently selected as the convenient winner.

## Citation form (mandatory where ambiguity is possible)

| Prohibited | Required |
|---|---|
| `Article III` | `BASE-CONST Article III` — *No AI authority* |
| `Article III` | `ENG-CONST-001 Article III` — *Separation of Responsibilities* |

The two documents number articles independently. Article numbers are **not** interchangeable.

## Coverage map — foundational article → operational formalization

| BASE-CONST article | Enduring principle | ENG-CONST-001 operational formalization | Relationship |
|---|---|---|---|
| **I** — Evidence is immutable | Evidence once recorded is never edited, overwritten or deleted; corrections supersede additively | **Art. IV** (lineage, immutable history, additive correction, ephemeral vs governed outputs); **Art. V.3** (quarantine of suspect evidence, no silent overwrite); **Art. XIII.2/.7** (preserve artifact state and lineage) | Extends |
| **II** — Safety before convenience | Safety, validation rigor and traceability outrank speed | **Art. V** (unknown over invented; verified over assumed); **Art. VII** (no claim without evidence); **Art. XIII** (halt elevation on conflict) | Extends |
| **III** — No AI authority | AI does not hold engineering authority | **Art. X.1–X.2** (human governance authority; AI drafting permitted, authority only by human sign-off); **Art. X.3** (instruction provenance, untrusted repository content) | Extends |
| **IV** — Deterministic state machines | State transitions are deterministic and explicit | **Art. VI** (three declared determinism/reproducibility classes; false `BYTE_DETERMINISTIC` claims prohibited); **Art. VIII** (unidirectional phase flow, no cycles); **Art. IX.2** (DAG authority) | Extends |
| **V** — Configuration locking | Configuration is locked and cannot drift silently | **Art. II** (single canonical implementation; non-canonical tooling designated); **Art. IX.1/.3** (no duplicate canonical paths; no synthetic evidence elevation) | Extends |
| **VI** — Version everything | Everything carries an explicit version | **Art. XII** (ratification protocol, isolated PR, additive archival); **Art. XV.4** (versioned schemas, migration records, no silent reinterpretation) | Extends |
| **VII** — Unknown data creates obligations, not guesses | Missing data yields obligations, never invention | **Art. V.1** (`UNKNOWN` over invented); **Art. V.2** (controlled interpolation must declare derivation, model, boundary, uncertainty, permitted uses); **Art. VII** (evidence chain fields) | Extends |
| **VIII** — One active specification | Exactly one specification is active | **Art. I** (truth hierarchy, Level 3 canonical specifications); **Art. III** (one primary role per artifact); **Art. VIII.1** (one authoritative primary handoff per phase); **Art. IX.4** (specification precedence over implementation) | Extends |

**Coverage result:** 8 of 8 foundational articles are covered and extended. **None is narrowed,
removed, weakened, reinterpreted or contradicted.**

## Operational content with no BASE-001 antecedent (net-new, additive)

| ENG-CONST-001 article | Net-new operational contribution |
|---|---|
| **Art. I** | Explicit eight-level truth hierarchy with Level 7 explanatory documentation holding zero authority |
| **Art. IX.5** | **No auxiliary behavioral authority** — no verifier, fixture, harness, script, executable specification, reference model, "oracle", golden engine or generated artifact may define canonical behavior; renaming does not legitimize inversion |
| **Art. XI** | Binding definitions, including the **verification vs validation** distinction |
| **Art. XIII** | Seven-step deterministic conflict-resolution and quarantine procedure |
| **Art. XIV** | Six-criterion architectural review gate for new subsystems |
| **Art. XV** | Growth-by-decomposition and lineage-interpretability laws |

These add operational surface without altering any foundational principle.
