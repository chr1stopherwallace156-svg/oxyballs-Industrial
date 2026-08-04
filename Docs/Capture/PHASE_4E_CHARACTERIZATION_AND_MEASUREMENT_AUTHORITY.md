# Phase 4E — Characterization & Measurement Authority (specification proposal)

| Field | Value |
|---|---|
| Document type | Architecture / contract **specification proposal** |
| Decision | D-032 (**Proposed**) |
| PHASE_4E_STATE | `CONTRACT_SPEC_PROPOSED` |
| IMPLEMENTATION_STATE | `NOT_IMPLEMENTED` |
| SWIFT_ENGINE_STATE | `NOT_STARTED` |
| VALIDATION_STATE | `NOT_EXECUTED` |
| PHYSICAL_VALIDATION_STATE | `NOT_EXECUTED` |

**Nothing in this document is implemented, compiled, executed, or validated.** It states
requirements for a future canonical implementation. No engine, program, script, schema file,
package manifest or test evidence accompanies this proposal.

---

## 1. Purpose and boundary

Phase 4E is a **characterization, governance and measurement-authority layer** over the
**immutable** Phase 4D surface. It evaluates geometry against declared engineering uses.
It does not reconstruct, re-mesh, re-scale, repair, or otherwise mutate geometry.

**Phase 4D geometry is read-only input. No Phase 4E behaviour may modify Phase 4D bytes.**

## 2. Authority order (normative)

Authority flows in exactly this order. Lower levels never define higher ones.

```
1. Immutable Phase 4D evidence
2. Approved Phase 4E contracts and specification
3. Canonical Swift implementation
4. Fixture truth and expected results
5. Optional independent verification tools
```

- Level 3 derives its behaviour from levels 1–2, never from levels 4–5.
- Level 4 **records** expected results derived from levels 1–2; it does not author behaviour.
- Level 5 tools may verify outputs. They may **never** define, specify, or stand as a
  reference implementation for canonical behaviour.
- No Node program, shell script, test helper, generated fixture, report, comment, or archived
  prompt may define the canonical engine's behaviour.

The canonical implementation is future **Swift** work in the established canonical source
architecture used by Phase 4A–4D. This repository must not host a substitute or parallel
implementation.

## 3. Separated authority dimensions (normative)

A single overloaded authority state is prohibited. Six dimensions are tracked independently:

| Dimension | Governs |
|---|---|
| **Geometry authority** | Provenance/integrity of the surface as reconstructed evidence |
| **Scale authority** | Whether metric scale is established, and by what evidence |
| **Datum authority** | Whether a reference frame/datum is established and resolvable |
| **Measurement authority** | Basis of a measurand (scan-only vs. combined vs. physical control) |
| **Characterization authority** | Maturity of the characterization process itself |
| **Engineering-use authority** | Whether results may inform a declared engineering use |

Each dimension carries its own state and its own evidence requirements. A high value in one
dimension must never imply a value in another.

## 4. Declared-use-specific conclusions (normative)

A universal per-region disposition is prohibited. Every conclusion is bound to a
**declared use** with its own tolerance budget and decision rule. The same region may
simultaneously hold different dispositions:

```
REGION  REG_REAR_RIGHT_BATTERY_MOUNT
  ├── BATTERY_ENVELOPE_PACKAGING     -> ACCEPTABLE
  ├── HARNESS_ROUTING                -> PROVISIONAL
  └── BRACKET_HOLE_RELEASE           -> UNSUITABLE
```

Dispositions must distinguish at minimum: evidence-supported acceptance, provisional/incomplete
evidence, demonstrated unsuitability, insufficient basis to conclude, out-of-characterized-envelope,
and not-evaluated. "Could not evaluate" must never be encoded as "fails".

## 5. Authority elevation requirements (normative)

**No authority may be elevated because an evidence identifier is present.** A non-null
evidence-ID string is not evidence. Future elevation of any authority dimension requires
verification of all of:

1. **Existence** — the referenced evidence exists in committed repository bytes;
2. **Integrity** — its digest recomputes and matches its declared value;
3. **Lineage** — it resolves through the declared lineage chain to the bound Phase 4D surface;
4. **Scope** — it covers the region/measurand it is being used to support;
5. **Operating envelope** — capture conditions fall inside the declared characterized envelope;
6. **Declared-use applicability** — it satisfies the tolerance budget and decision rule of the
   specific declared use being elevated.

Failing any of the six blocks elevation. Claim locks (§8) remain in force regardless.

## 6. Bound Phase 4D input (normative)

The authoritative Phase 4D → Phase 4E input is:

```
Docs/Evidence/PHASE_4D/SURFACE-OUT-FIXTURE-000001/phase4e_handoff.json
schema_id             = Phase4EHandoffContract
surface_output_id     = SURFACE-OUT-FIXTURE-000001
output_closure_sha256 = fe043fdb7d2ce97562b8144826a873023c4f12417c2595dbfc058daa6366c641
```

The `4d92e539…` object (`Phase4DHandoffContract`, `RECON-OUT-FIXTURE-DENSE-FUSION-000001`, with
`CONTRADICTORY` / `LOW_CONFIDENCE` classifications and the `DUP-VX:200:0:600` quarantined region)
is **inherited Phase 4C → Phase 4D lineage only**. It is not the Phase 4E primary input and must
never be described or validated as such.

Phase 4D evidence must be referenced in place. **Phase 4E must not copy or duplicate any Phase 4D
evidence file.**

## 7. Required capabilities of the future canonical implementation

Stated as requirements. **None of these is implemented or validated.**

1. **Immutable input binding** — bind to the Phase 4D handoff above; treat all Phase 4D artifacts as read-only.
2. **Direct verification of committed evidence bytes** — verify against repository bytes; never trust a
   digest transcribed from a pull-request body, report, comment, or archived text.
3. **Closure / inventory / mesh-digest / lineage consistency** — recompute and cross-check the output
   closure, the output inventory entries, the canonical mesh digest, and the lineage manifest linkage.
4. **Surface-ID substitution detection** — detect a substituted or mismatched `surface_output_id`.
5. **Authority-ceiling enforcement** — never emit a state above the ceiling permitted by §5.
6. **Claim locks** — enforce §8 unconditionally.
7. **Execution errors separated from engineering dispositions** — process/system failures are reported
   through execution status; engineering conclusions live only in the characterization output. A failed
   run must never be reported as an engineering disposition, and an engineering disposition must never
   be encoded as a process failure.
8. **Declared-use-specific evaluation** — per §4, each with tolerance budget and decision rule.
9. **Fitting controls separated from validation controls** — a control used to fit scale/datum must not
   also serve as an independent validation control for the same relationship.
10. **Calibration validity** — reject reference artifacts whose calibration is expired, damaged, or
    unverified relative to the capture time.
11. **Recapture contracts** — unresolved/provisional regions yield structured, machine-readable capture
    directives with closure criteria and explicit lifecycle/supersession, evaluated back against the
    contract that requested them.
12. **Deterministic tamper-test requirements** — the cases in `Docs/Evidence/PHASE_4E/failure_matrix.md`
    must fail deterministically and for the stated reason.
13. **No Phase 4D geometry mutation** — invariant.

## 8. Claim locks (normative, unconditional in this phase)

```
ENGINEERING_USE_AUTHORITY   = FIXTURE_ONLY
ENGINEERING_METROLOGY_CLAIM = FORBIDDEN
MANUFACTURING_RELEASE_CLAIM = FORBIDDEN
PRODUCTION_MESH_CLAIM       = FORBIDDEN
COMPLETE_DIGITAL_TWIN_CLAIM = FORBIDDEN
```

Software determinism and physical reproducibility are distinct properties and must be tracked
separately. Physical reproducibility remains unverified until physical validation is executed,
which is outside this proposal.

## 9. Explicitly out of scope

Engine implementation; any package manifest, source, schema file, executable or generated test
evidence in this repository; Tier 1B (datum/scale resolution); Tier 1C (uncertainty propagation,
policy and recapture engines); Tier 2 (adversarial fixture suite); physical calibration; any
metrology or manufacturing-release claim.
