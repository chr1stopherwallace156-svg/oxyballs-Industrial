# Phase 4E — Proposed Validation / Failure Matrix

**This is a proposed future validation matrix. It is NOT an executed test report.**
No case below has been run. Every case is labelled `SPECIFIED_NOT_EXECUTED`.

Each case MUST, once the canonical Swift engine exists, fail deterministically, **for the stated
reason**, and **with the stated execution identifier** (specification identifiers per
`PHASE_4E_CHARACTERIZATION_AND_MEASUREMENT_AUTHORITY.md` §13.2 — not implemented exit codes).
A case that fails for an unrelated reason (parse fault, missing file, tooling error) does not
satisfy its requirement.

| # | Case | Condition | Required execution identifier | Required outcome | Status |
|---|---|---|---|---|---|
| 1 | Phase 4D closure mismatch | Declared `output_closure_sha256` ≠ closure of bound Phase 4D output | `INPUT_INTEGRITY_FAILURE` | Fail closed; no dispositions emitted | `SPECIFIED_NOT_EXECUTED` |
| 2 | Canonical mesh digest mismatch | Recomputed canonical mesh digest ≠ lineage-declared digest | `INPUT_INTEGRITY_FAILURE` | Fail closed; no dispositions emitted | `SPECIFIED_NOT_EXECUTED` |
| 3 | Surface-ID substitution | `surface_output_id` substituted/mismatched across handoff, closure, lineage | `INPUT_IDENTITY_FAILURE` | Fail closed; identity rejected | `SPECIFIED_NOT_EXECUTED` |
| 4 | Inventory mismatch | Declared inventory entry digest or byte count ≠ recomputed value | `INPUT_INTEGRITY_FAILURE` | Fail closed | `SPECIFIED_NOT_EXECUTED` |
| 5 | Lineage mismatch | Lineage manifest id/chain does not resolve to the bound surface | `INPUT_IDENTITY_FAILURE` | Fail closed | `SPECIFIED_NOT_EXECUTED` |
| 6 | Unknown enum | Any governance value outside an approved closed vocabulary (§4) | `INPUT_SCHEMA_INVALID` | Reject; never coerce to a default | `SPECIFIED_NOT_EXECUTED` |
| 7 | Duplicate identifier | Same governed ID twice within its artifact scope | `DUPLICATE_ID_FAILURE` | Hard failure; last-write-wins prohibited | `SPECIFIED_NOT_EXECUTED` |
| 8 | Orphaned reference | A reference does not resolve before evaluation | `ORPHAN_REFERENCE_FAILURE` | Hard failure; never nulled or ignored | `SPECIFIED_NOT_EXECUTED` |
| 9 | Authority elevation without evidence | Elevation attempted without all six §11 requirements satisfied | *(no execution failure)* | Elevation refused; previous state retained with reason code; claim locks hold | `SPECIFIED_NOT_EXECUTED` |
| 10 | Invalid declared-use acceptance | Acceptance emitted while uncertainty violates the declared use's budget/decision rule | *(no execution failure)* | Acceptance refused; disposition downgraded | `SPECIFIED_NOT_EXECUTED` |
| 11 | Circular fitting/validation control | A fitting relationship identity reused as independent validation (§8) | `CONTROL_DEPENDENCY_FAILURE` | Deterministic contract failure | `SPECIFIED_NOT_EXECUTED` |
| 12 | Expired calibration | Reference artifact calibration expired/damaged/unverified at capture time | `CALIBRATION_EVIDENCE_FAILURE` | Reject artifact; block dependent elevation | `SPECIFIED_NOT_EXECUTED` |
| 13 | Unresolved datum | Reflection, scale-bearing, singular, unstable inverse, or ambiguous fit (§9.3) | `DATUM_UNRESOLVED` | Datum authority `UNRESOLVED`; no arbitrary candidate chosen | `SPECIFIED_NOT_EXECUTED` |
| 14 | Insufficient scale evidence | Scale unestablished, single-anchored where more is required, or conflicting | `SCALE_UNRESOLVED` | Scale authority not elevated; dependent acceptance blocked | `SPECIFIED_NOT_EXECUTED` |
| 15 | Anisotropy exceeds threshold | Per-axis differences exceed the approved anisotropy threshold (§7.2) | *(no execution failure)* | Single scalar scale MUST NOT be reported; per-axis/regional retained | `SPECIFIED_NOT_EXECUTED` |
| 16 | Unit/convention not inherited | Phase 4D coordinate convention or unit not explicitly inherited and recorded (§9.1–9.2) | `INPUT_SCHEMA_INVALID` | Fail closed; implicit conversion prohibited | `SPECIFIED_NOT_EXECUTED` |
| 17 | Non-deterministic output | Identical canonical inputs + configuration + version produce differing canonical bytes | `OUTPUT_SERIALIZATION_FAILURE` | Determinism requirement (§14) unmet | `SPECIFIED_NOT_EXECUTED` |
| 18 | Orphaned recapture contract | A region references a recapture contract that does not resolve | `ORPHAN_REFERENCE_FAILURE` | Hard failure | `SPECIFIED_NOT_EXECUTED` |
| 19 | Recapture closure | Supplemental capture evaluated back against the requesting contract | *(no execution failure)* | Closes only if closure criteria met; else remains open/superseded | `SPECIFIED_NOT_EXECUTED` |
| 20 | Multi-use disposition divergence | One region evaluated against several declared uses with different budgets | *(no execution failure)* | Independent per-use dispositions; never one universal verdict | `SPECIFIED_NOT_EXECUTED` |

## Invariants for every case

- Phase 4D geometry is never mutated.
- Execution status and engineering dispositions are never encoded as one another (§13.1).
- Blocking input failures are fail-closed; no partial authoritative output (§13.3).
- Claim locks (§15) hold in all cases.
- Expected results are derived from the approved contracts and specification. Fixtures record
  those expectations; they never define engine behaviour.

*Cases whose required execution identifier is marked “(no execution failure)” are engineering
outcomes: the run completes successfully and the constraint is expressed in the characterization
output, not as a process failure.*
