# Phase 4E — Characterization & Measurement Authority (specification proposal)

| Field | Value |
|---|---|
| Document type | Architecture / contract **specification proposal** |
| Decision | D-032 (**Proposed**) |
| Specification pass | 02A — spatial authority hardening |
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

## 2. Normative-language convention (normative)

| Term | Meaning |
|---|---|
| **MUST** / **MUST NOT** | Mandatory conformance requirement. Non-conformance is a contract failure. |
| **SHOULD** / **SHOULD NOT** | Recommended. Deviation is permitted only with a recorded rationale in the output lineage. |
| **MAY** | Permitted option. Neither required nor discouraged. |

Examples, illustrations and sample values in this document are **non-normative** unless the
example is explicitly labelled normative.

**Prose MUST NOT override a closed vocabulary, a transition table, or a stated invariant.**
Where prose and a normative table disagree, the table governs and the prose is defective.

## 3. Authority order (normative)

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
- Level 5 tools may verify outputs. They MUST NOT define, specify, or stand as a reference
  implementation for canonical behaviour.
- No Node program, shell script, test helper, generated fixture, report, comment, or archived
  prompt may define the canonical engine's behaviour.

The canonical implementation is future **Swift** work in the established canonical source
architecture used by Phase 4A–4D. This repository MUST NOT host a substitute or parallel
implementation.

## 4. Six independent authority dimensions (normative)

A single overloaded authority state is prohibited. Six dimensions are tracked independently.
Each vocabulary below is **closed**. An unknown value MUST be rejected as a contract failure and
MUST NOT be coerced to a default, nearest value, or lowest state.

Each dimension is an **authority ordering** (states are ranked least→greatest) unless marked
categorical. Ranking governs elevation and demotion only; it never implies a value in another
dimension.

### 4.1 Geometry authority — ordering

| State | Meaning | Minimum evidence basis |
|---|---|---|
| `UNVERIFIED` | Surface present; provenance not checked | none |
| `RECONSTRUCTION_ESTIMATE` | Accepted as reconstructed evidence | bound Phase 4D handoff resolves |
| `INTEGRITY_VERIFIED` | Digests, inventory and lineage independently recomputed and matched | §12 verification satisfied |
| `CHARACTERIZED_RECONSTRUCTION` | Integrity verified and characterized within a declared operating envelope | integrity + recorded envelope evidence |

Prohibited implications: geometry authority MUST NOT imply scale, datum, measurement,
characterization or engineering-use authority.

### 4.2 Scale authority — ordering

| State | Meaning | Minimum evidence basis |
|---|---|---|
| `UNRESOLVED` | No defensible metric scale | none |
| `SENSOR_DECLARED` | Source sensor declares scale; no independent anchor | sensor declaration recorded |
| `SINGLE_ANCHOR` | One valid anchor; provisional only | one anchor with valid calibration |
| `MULTI_ANCHOR` | Multiple distributed valid anchors | ≥2 distributed valid anchors |
| `FIXTURE_VALIDATED` | Independently checked against a characterized fixture | fixture comparison evidence |
| `PHYSICALLY_CONTROLLED` | Checked by valid independent physical controls | independent validation controls (§8) |

Prohibited implications: scale authority MUST NOT imply datum authority, and MUST NOT be
inferred from datum fitting (§9.4).

### 4.3 Datum authority — ordering

| State | Meaning | Minimum evidence basis |
|---|---|---|
| `UNRESOLVED` | No resolvable reference frame | none |
| `OPERATOR_DEFINED` | Frame asserted by an operator | recorded operator declaration |
| `SCAN_DERIVED` | Frame fitted from scan features | fitted features + conditioning within bound |
| `OEM_NOMINAL` | Frame aligned to a nominal/CAD reference | nominal reference identity recorded |
| `FIXTURE_TRANSFERRED` | Frame transferred from a characterized fixture | fixture transfer evidence |
| `PHYSICALLY_ESTABLISHED` | Frame established by physical control features | verified physical-control evidence |

Prohibited implications: datum authority MUST NOT imply scale authority or measurement authority.

### 4.4 Measurement authority — categorical (per measurand, not globally ranked)

| State | Meaning | Minimum evidence basis |
|---|---|---|
| `NOT_EVALUATED` | No measurement attempted | none |
| `SCAN_DERIVED` | Derived from surface geometry alone | resolved endpoints |
| `DATUM_REFERENCED_SCAN_DERIVED` | Scan-derived and expressed in an established datum | datum authority ≠ `UNRESOLVED` |
| `FIXTURE_COMPARED` | Compared against a characterized fixture | fixture comparison evidence |
| `MANUALLY_MEASURED` | Value obtained by manual instrument | instrument + calibration + operator + timestamp |
| `PHYSICALLY_CONTROLLED` | Established by verified physical control | verified physical-control evidence |
| `COMBINED_SCAN_AND_PHYSICAL_CONTROL` | Scan-derived and corroborated by independent physical control | both bases recorded, controls independent (§8) |

This dimension is **categorical**: values describe the *basis* of a measurand. Basis MUST NOT be
treated as a quality ranking, and a "higher-sounding" basis MUST NOT be substituted when its
evidence is absent.

### 4.5 Characterization authority — ordering

| State | Meaning | Minimum evidence basis |
|---|---|---|
| `NOT_STARTED` | No characterization process | none |
| `CONTRACT_DEFINED` | Contracts and specification approved | approved specification |
| `SYNTHETIC_FIXTURE_EVALUATED` | Evaluated against synthetic fixtures | executed synthetic fixture evidence |
| `REFERENCE_FIXTURE_VALIDATED` | Validated against a characterized reference artifact | reference artifact evidence |
| `PHYSICAL_FIELD_VALIDATED` | Validated in field conditions | physical validation evidence |

### 4.6 Engineering-use authority — ordering

| State | Meaning | Minimum evidence basis |
|---|---|---|
| `FORBIDDEN` | Results may not inform any engineering use | default |
| `FIXTURE_ONLY` | Results may inform fixture/development work only | contracts defined |
| `PROVISIONAL_FIELD_USE` | Limited field use under recorded constraints | reference-fixture validation + envelope evidence |
| `AUTHORIZED_WITHIN_ENVELOPE` | Authorized for the named declared use **inside a stated envelope** | physical validation + envelope + declared-use applicability |

There is **no generic `AUTHORIZED` state**. Authorization is always envelope-bound and
declared-use-bound. A token meaning unconditional authorization MUST NOT be introduced.

## 5. Transition rules (normative)

### 5.1 Universal transition laws

1. **No skipped elevation** unless the destination state's complete evidence requirements are
   independently satisfied. Passing through an intermediate state does not itself confer evidence.
2. **Elevation MUST NOT be inferred** from the state of another dimension.
3. **Demotion / revocation is permitted and required** when evidence becomes invalid,
   contradictory, superseded, or falls outside scope.
4. **Monotonicity:** within one completed evaluation, states MUST be monotonic, except for a
   recorded integrity-triggered revocation.
5. Every transition MUST record: `previous_state`, `requested_state`, `resulting_state`,
   `evidence_ids`, `transition_reason_code`, `evaluated_at`, `evaluator_version`.
6. A requested elevation that fails its evidence requirements MUST resolve to the unchanged
   previous state with a recorded reason code. It MUST NOT silently succeed or partially apply.

### 5.2 Permitted transitions

`→` denotes a permitted elevation edge; every edge additionally requires the destination's
evidence basis in §4 and the six prerequisites of §11.

| Dimension | Permitted elevation edges | Demotion |
|---|---|---|
| Geometry | `UNVERIFIED` → `RECONSTRUCTION_ESTIMATE` → `INTEGRITY_VERIFIED` → `CHARACTERIZED_RECONSTRUCTION` | to any lower state on integrity or scope failure |
| Scale | `UNRESOLVED` → `SENSOR_DECLARED` → `SINGLE_ANCHOR` → `MULTI_ANCHOR` → `FIXTURE_VALIDATED` → `PHYSICALLY_CONTROLLED` | to any lower state on anchor invalidation, contradiction, or control failure |
| Datum | `UNRESOLVED` → {`OPERATOR_DEFINED`, `SCAN_DERIVED`, `OEM_NOMINAL`} → `FIXTURE_TRANSFERRED` → `PHYSICALLY_ESTABLISHED` | to `UNRESOLVED` on ambiguity, conditioning or validity failure (§9.3) |
| Measurement | categorical: any state MAY be assigned when its own evidence basis is satisfied | to `NOT_EVALUATED` when its basis is invalidated |
| Characterization | `NOT_STARTED` → `CONTRACT_DEFINED` → `SYNTHETIC_FIXTURE_EVALUATED` → `REFERENCE_FIXTURE_VALIDATED` → `PHYSICAL_FIELD_VALIDATED` | to any lower state on withdrawn or superseded evidence |
| Engineering-use | `FORBIDDEN` → `FIXTURE_ONLY` → `PROVISIONAL_FIELD_USE` → `AUTHORIZED_WITHIN_ENVELOPE` | to any lower state on envelope, evidence or applicability failure |

### 5.3 Implication versus prerequisite

- **Implication (prohibited):** state in dimension A *causing* or *justifying* a state in
  dimension B.
- **Prerequisite (explicitly permitted):** state in dimension B being *blocked* unless dimension A
  satisfies a stated condition. A prerequisite never grants; it only blocks.

Normative prerequisite laws:

1. A declared-use acceptance that depends on a dimensional measurement MUST NOT be issued while
   scale authority is `UNRESOLVED`.
2. `DATUM_REFERENCED_SCAN_DERIVED` measurement authority MUST NOT be assigned while datum
   authority is `UNRESOLVED`.
3. `PHYSICALLY_CONTROLLED` measurement authority requires verified physical-control evidence
   satisfying §11.
4. Engineering-use authority MUST NOT exceed characterization authority, and MUST NOT exceed what
   the recorded operating-envelope evidence supports.

## 6. Stable identity and reference laws (normative)

### 6.1 Identifier grammars

All governed identifiers use uppercase ASCII letters, digits and hyphens only. Patterns:

```
SURFACE-OUT-[A-Z0-9-]+
REGION-[A-Z0-9-]+
FEATURE-[A-Z0-9-]+
SCALE-ANCHOR-[A-Z0-9-]+
DATUM-[A-Z0-9-]+
CONTROL-[A-Z0-9-]+
MEASUREMENT-[A-Z0-9-]+
POLICY-[A-Z0-9-]+
RECAPTURE-[A-Z0-9-]+
REPORT-PHASE4E-[A-Z0-9-]+
LINEAGE-PHASE4E-[A-Z0-9-]+
```

Identifiers are **case-sensitive**. Whitespace normalization MUST NOT be applied; an identifier
containing whitespace is invalid rather than trimmed. Identifiers that do not match their class
grammar MUST be rejected.

### 6.2 Uniqueness, resolution, duplicates and orphans

- Each governed identifier MUST be unique within its defined artifact scope.
- A duplicate identifier is a **hard contract failure**.
- Every reference MUST resolve before evaluation begins.
- An unresolved reference (**orphan**) is a **hard contract failure**.
- Duplicate failures and orphan failures MUST receive **different stable error identifiers**
  (§13.2) so they are distinguishable in evidence.
- Last-write-wins resolution of duplicates is **prohibited**.
- An unresolved reference MUST NOT be converted to null, empty, or silently ignored.

### 6.3 Relationship identity

The identity of a control relationship MUST be the **ordered canonical feature relationship**
(the participating `FEATURE-*` identities in a defined canonical order), **not** the
human-readable `CONTROL-*` label. Renaming a control MUST NOT create a new relationship.

## 7. Scale model and authority requirements (normative)

### 7.1 Representation

Scale MUST be represented **separately from the datum transform**. The conceptual scale
transform is:

```
S = diag(sx, sy, sz, 1)
```

The implementation MUST characterize: **uniform scale**, **per-axis scale**, **anisotropic
distortion**, and **regional residual distortion**.

### 7.2 Anisotropy and residuals

- A **uniform** scale MAY be reported only when per-axis differences remain within an approved
  anisotropy threshold.
- That threshold is **policy/configuration data**. It MUST be identified, versioned, recorded, and
  included in output lineage. It MUST NOT be embedded as an undocumented constant.
- If the threshold is exceeded, a single scalar MUST NOT be used to characterize the surface.
- Regional residuals MUST be retained. They MUST NOT be averaged away into a global figure.

### 7.3 Non-mutation

Scale correction MUST produce a characterized derivative or a transform record. It MUST NOT
mutate Phase 4D vertices, and MUST NOT write to any Phase 4D artifact.

### 7.4 Threshold discipline

This pass defines **no universal numeric thresholds**. Every numeric threshold used by the future
implementation MUST be: identified, versioned, recorded in configuration or policy, and included
in output lineage.

## 8. Fitting versus validation controls (normative)

Control roles are a closed set:

```
FITTING_ONLY
VALIDATION_ONLY
EXCLUDED
```

- A control relationship used for fitting MUST NOT be reused as an independent validation
  relationship for the same relationship identity (§6.3).
- Overlap between fitting and validation relationship identities is a **deterministic contract
  failure**, not a warning.
- A scale state above `SINGLE_ANCHOR` MUST require at least one independent validation
  relationship. Exact counts, distribution and placement thresholds remain **versioned
  configuration values** subject to later approval and are not fixed in this pass.

## 9. Datum frames and transform semantics (normative)

### 9.1 Frame declaration

Every coordinate frame MUST declare: `frame_id`, `handedness`, `unit`, `axis convention`,
`source frame`, `target frame`, `matrix storage order`, and `vector convention`.

The Phase 4D input convention MUST be **inherited explicitly** and recorded. It MUST NOT be
assumed. *(Non-normative observation: the bound Phase 4D → 4E handoff object does not itself carry
a coordinate-convention block; the convention must therefore be resolved through the declared
lineage and recorded in the Phase 4E output.)*

### 9.2 Units and operation order

The canonical length unit for Phase 4E records is **millimetres**. Any Phase 4D coordinate
expressed in metres requires an **explicit, recorded conversion**; implicit conversion is
prohibited.

The scale/datum operation order is normatively:

```
p_engineering = T_datum × S_scale × p_phase4d        (column vectors)
```

unless the inherited Phase 4D convention requires an explicitly documented equivalent, in which
case the equivalent MUST be recorded. Multiplication order MUST NOT be left implicit.

### 9.3 Rigid-transform validity

`T_datum` MUST be a rigid transform in **SE(3)** — never a similarity or affine transform. It MUST
satisfy, within configured tolerance:

```
final row = [0, 0, 0, 1]
RᵀR       = I
det(R)    = +1
all values finite
inverse numerically stable
condition metric within configured bound
```

Numeric tolerances and conditioning bounds MUST be identified, versioned configuration values
(§7.4). A reflection, a scale-bearing transform, a singular transform, an unstable inverse, or an
ambiguous datum fit MUST yield datum authority `UNRESOLVED`. The implementation MUST NOT select an
arbitrary candidate among ambiguous fits.

### 9.4 Scale/datum independence

Scale MUST NOT be absorbed into `T_datum`. Satisfying datum fitting MUST NOT elevate scale
authority.

## 10. Declared-use-specific conclusions (normative)

A universal per-region disposition is prohibited. Every conclusion is bound to a **declared use**
with its own tolerance budget and decision rule. The same region may simultaneously hold different
dispositions:

```
REGION-REAR-RIGHT-BATTERY-MOUNT           (non-normative example)
  ├── BATTERY_ENVELOPE_PACKAGING     -> ACCEPTABLE
  ├── HARNESS_ROUTING                -> PROVISIONAL
  └── BRACKET_HOLE_RELEASE           -> UNSUITABLE
```

Dispositions MUST distinguish at minimum: evidence-supported acceptance, provisional/incomplete
evidence, demonstrated unsuitability, insufficient basis to conclude, out-of-characterized-envelope,
and not-evaluated. "Could not evaluate" MUST NOT be encoded as "fails".

*(The closed disposition token set, reason-code vocabulary, policy registry and decision-rule
definitions are deferred to specification Pass 02B.)*

## 11. Authority elevation requirements (normative)

**No authority may be elevated because an evidence identifier is present.** A non-null
evidence-ID string is not evidence. Elevation of any authority dimension requires verification of
all of:

1. **Existence** — the referenced evidence exists in committed repository bytes;
2. **Integrity** — its digest recomputes and matches its declared value;
3. **Lineage** — it resolves through the declared lineage chain to the bound Phase 4D surface;
4. **Scope** — it covers the region/measurand it is being used to support;
5. **Operating envelope** — capture conditions fall inside the declared characterized envelope;
6. **Declared-use applicability** — it satisfies the tolerance budget and decision rule of the
   specific declared use being elevated.

Failing any of the six blocks elevation. Claim locks (§15) remain in force regardless.

## 12. Bound Phase 4D input (normative)

The authoritative Phase 4D → Phase 4E input is:

```
Docs/Evidence/PHASE_4D/SURFACE-OUT-FIXTURE-000001/phase4e_handoff.json
schema_id             = Phase4EHandoffContract
surface_output_id     = SURFACE-OUT-FIXTURE-000001
output_closure_sha256 = fe043fdb7d2ce97562b8144826a873023c4f12417c2595dbfc058daa6366c641
```

The `4d92e539…` object (`Phase4DHandoffContract`, `RECON-OUT-FIXTURE-DENSE-FUSION-000001`, with
`CONTRADICTORY` / `LOW_CONFIDENCE` classifications and the `DUP-VX:200:0:600` quarantined region)
is **inherited Phase 4C → Phase 4D lineage only**. It is not the Phase 4E primary input and MUST
NOT be described or validated as such.

Phase 4D evidence MUST be referenced in place. **Phase 4E MUST NOT copy or duplicate any Phase 4D
evidence file.**

## 13. Execution semantics (normative)

### 13.1 Execution status is not an engineering disposition

- **Execution status** reports whether the process ran and whether its inputs were admissible.
- **Engineering disposition** reports a characterization conclusion about geometry for a declared
  use.

An engineering `UNSUITABLE` is **not** an execution failure. An execution failure is **not** an
engineering disposition. Neither may be encoded as the other.

### 13.2 Stable execution identifiers

The following are **specification identifiers**, not implemented exit codes in this PR:

```
EXECUTION_SUCCESS
INPUT_SCHEMA_INVALID
INPUT_INTEGRITY_FAILURE
INPUT_IDENTITY_FAILURE
DUPLICATE_ID_FAILURE
ORPHAN_REFERENCE_FAILURE
CONTROL_DEPENDENCY_FAILURE
CALIBRATION_EVIDENCE_FAILURE
SCALE_UNRESOLVED
DATUM_UNRESOLVED
NUMERICAL_FAILURE
POLICY_DEFINITION_FAILURE
OUTPUT_SERIALIZATION_FAILURE
```

Each failure condition MUST map to exactly one identifier, so a failure can be asserted by
identifier rather than by message text.

### 13.3 Fail-closed behaviour

- An input **identity**, **integrity** or **reference** failure is **fail-closed**.
- After a blocking input failure, **no engineering dispositions may be emitted**.
- **Partial output is prohibited** for authoritative characterization.
- Diagnostic-only output MAY exist, but it MUST be explicitly marked non-authoritative and MUST
  NOT contain use dispositions.

## 14. Deterministic canonicalization requirements (normative)

The future engine's canonical output MUST satisfy:

- UTF-8 encoding; **no byte-order mark**;
- canonical object-key ordering;
- stable array ordering by explicitly defined sort keys;
- **no NaN and no infinity** values;
- negative zero normalized to zero;
- numeric representation governed by a **versioned canonical formatting policy**;
- timestamps and other environment-dependent fields excluded from canonical hashed payloads, or
  isolated in explicitly non-canonical metadata;
- identical canonical inputs + approved configuration + implementation version MUST produce
  **byte-identical** canonical outputs;
- output inventory and output closure MUST be computed from the canonical bytes;
- the canonicalization policy ID and version MUST be included in output lineage.

This pass does **not** define a numeric decimal precision. Precision MUST be an explicit,
versioned policy approved before implementation.

## 15. Claim locks (normative, unconditional in this phase)

```
ENGINEERING_USE_AUTHORITY   = FIXTURE_ONLY
ENGINEERING_METROLOGY_CLAIM = FORBIDDEN
MANUFACTURING_RELEASE_CLAIM = FORBIDDEN
PRODUCTION_MESH_CLAIM       = FORBIDDEN
COMPLETE_DIGITAL_TWIN_CLAIM = FORBIDDEN
```

Software determinism and physical reproducibility are distinct properties and MUST be tracked
separately. Physical reproducibility remains unverified until physical validation is executed,
which is outside this proposal.

## 16. Required capabilities of the future canonical implementation

Stated as requirements. **None of these is implemented or validated.**

1. **Immutable input binding** — bind to the Phase 4D handoff (§12); treat all Phase 4D artifacts as read-only.
2. **Direct verification of committed evidence bytes** — verify against repository bytes; never trust a
   digest transcribed from a pull-request body, report, comment, or archived text.
3. **Closure / inventory / mesh-digest / lineage consistency** — recompute and cross-check the output
   closure, the output inventory entries, the canonical mesh digest, and the lineage manifest linkage.
4. **Surface-ID substitution detection** — detect a substituted or mismatched `surface_output_id`.
5. **Authority-ceiling enforcement** — never emit a state above the ceiling permitted by §11.
6. **Claim locks** — enforce §15 unconditionally.
7. **Execution errors separated from engineering dispositions** — per §13.
8. **Declared-use-specific evaluation** — per §10, each with tolerance budget and decision rule.
9. **Fitting controls separated from validation controls** — per §8.
10. **Calibration validity** — reject reference artifacts whose calibration is expired, damaged, or
    unverified relative to the capture time.
11. **Recapture contracts** — unresolved/provisional regions yield structured, machine-readable capture
    directives with closure criteria and explicit lifecycle/supersession, evaluated back against the
    contract that requested them.
12. **Deterministic tamper-test requirements** — the cases in `Docs/Evidence/PHASE_4E/failure_matrix.md`
    MUST fail deterministically, for the stated reason, and with the stated execution identifier.
13. **No Phase 4D geometry mutation** — invariant.
14. **Deterministic canonical output** — per §14.

## 17. Explicitly out of scope

Engine implementation; any package manifest, source, schema file, executable or generated test
evidence in this repository; physical calibration; any metrology or manufacturing-release claim.

**Deferred to specification Pass 02B** (not defined in this pass): measurement-record schemas;
GUM uncertainty budgets (Type A/B components, correlation and covariance, coverage factor,
effective degrees of freedom); engineering-use policy registries with policy ID/version, tolerance
budgets and decision-rule identity; guard-band semantics; the closed disposition and reason-code
vocabularies; recapture-contract schemas and lifecycle states; and the characterization-report
schema including report identity, output closure and inventory structure.

**Deferred to implementation** (separate approval): Tier 1B datum/scale resolution; Tier 1C
uncertainty, policy and recapture engines; Tier 2 adversarial fixture suite.
