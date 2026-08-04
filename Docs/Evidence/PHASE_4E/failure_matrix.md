# Phase 4E — Proposed Validation / Failure Matrix

**This is a proposed future validation matrix. It is NOT an executed test report.**
No case below has been run. Every case is labelled `SPECIFIED_NOT_EXECUTED`.

Each case must, once the canonical Swift engine exists, fail deterministically **and for the
stated reason**. A case that fails for an unrelated reason (parse error, missing file, tooling
fault) does not satisfy its requirement.

| # | Case | Condition | Required outcome | Status |
|---|---|---|---|---|
| 1 | Phase 4D closure mismatch | Declared `output_closure_sha256` ≠ closure of bound Phase 4D output | Reject; execution error; no characterization emitted | `SPECIFIED_NOT_EXECUTED` |
| 2 | Canonical mesh digest mismatch | Recomputed canonical mesh digest ≠ lineage-declared digest | Reject; integrity failure | `SPECIFIED_NOT_EXECUTED` |
| 3 | Surface-ID substitution | `surface_output_id` substituted/mismatched across handoff, closure, lineage | Reject; identity failure | `SPECIFIED_NOT_EXECUTED` |
| 4 | Inventory mismatch | Declared inventory entry digest or byte count ≠ recomputed value | Reject; inventory integrity failure | `SPECIFIED_NOT_EXECUTED` |
| 5 | Lineage mismatch | Lineage manifest id/chain does not resolve to the bound surface | Reject; lineage failure | `SPECIFIED_NOT_EXECUTED` |
| 6 | Unknown enum | Any governance value outside the approved vocabulary | Reject; contract failure | `SPECIFIED_NOT_EXECUTED` |
| 7 | Authority elevation | Elevation attempted without all six §5 requirements satisfied | Reject; elevation refused; claim locks hold | `SPECIFIED_NOT_EXECUTED` |
| 8 | Invalid declared-use acceptance | Acceptance emitted while uncertainty violates the declared use's tolerance budget / decision rule | Reject acceptance; downgrade disposition | `SPECIFIED_NOT_EXECUTED` |
| 9 | Circular fitting/validation control | A control used to fit scale/datum reused as independent validation for the same relationship | Reject; control dependency failure | `SPECIFIED_NOT_EXECUTED` |
| 10 | Expired calibration | Reference artifact calibration expired/damaged/unverified at capture time | Reject the artifact; block dependent elevation | `SPECIFIED_NOT_EXECUTED` |
| 11 | Unresolved datum | Datum not resolvable / ambiguous within conditioning tolerance | Datum authority unresolved; dependent conclusions blocked | `SPECIFIED_NOT_EXECUTED` |
| 12 | Insufficient scale evidence | Scale unestablished, single-anchored, or conflicting | Scale authority not elevated; dependent dispositions provisional at best | `SPECIFIED_NOT_EXECUTED` |
| 13 | Orphaned recapture contract | A region references a recapture contract that does not resolve | Reject; referential failure | `SPECIFIED_NOT_EXECUTED` |
| 14 | Recapture closure | Supplemental capture evaluated back against the requesting contract | Contract closes only if closure criteria are met; otherwise remains open/superseded | `SPECIFIED_NOT_EXECUTED` |
| 15 | Multi-use disposition divergence | One region evaluated against several declared uses with different budgets | Independent per-use dispositions (e.g. acceptable / provisional / unsuitable) — never one universal verdict | `SPECIFIED_NOT_EXECUTED` |

## Invariants for every case

- Phase 4D geometry is never mutated.
- Execution errors are reported separately from engineering dispositions.
- Claim locks (`ENGINEERING_METROLOGY_CLAIM`, `MANUFACTURING_RELEASE_CLAIM`,
  `PRODUCTION_MESH_CLAIM`, `COMPLETE_DIGITAL_TWIN_CLAIM` = `FORBIDDEN`) hold in all cases.
- Expected results are derived from the approved contracts and specification. Fixtures record
  those expectations; they never define engine behaviour.
