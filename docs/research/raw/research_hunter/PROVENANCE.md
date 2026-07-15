# Provenance — research_hunter/

This directory archives raw output of the external **Research Hunter**
agent, 1:1 as delivered by the owner. Files here are evidence:
immutable, never edited (Constitution, Article I). This directory is
run-scoped, not module-scoped — the rev07 module mapping for
regulatory/incentive material is an open owner decision (see next-action
item 8 in `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`).

| File | Received | Delivered by | Description |
|---|---|---|---|
| `batch_01_research_map.md` | 2026-07-15 | Owner, via chat ("This is the start. Send this one first 1:1") | Research Hunter run RH-01: "Research Map & Candidate Ingestion", including the Hunter's own claimed "Second-Stage Research Filter Evaluation" (superseded — see note below) |
| `batch_02_strict_source_map.md` | 2026-07-15 | Owner, via chat ("2:75") | Research Hunter tightened second pass: "Strict Technical Source Map" — 4 source rows with quoted text and claim locations, downgrade registry, missing-source and next-action lists. Quoted text is Hunter-supplied and unverified against the source documents. |
| `batch_03_finalized_output.md` | 2026-07-15 | Owner, via chat ("3;75") | Research Hunter finalized output (the run the owner graded PASS): FMVSS 305a promoted to final rule + delay notice with citations (89 FR 104318; 90 FR 9609), CARB/HVIP/BBAS rows, downgrade registry, missing-source list, explicit "no SQLite / no StageGate assertions" guardrail. Quoted text is Hunter-supplied and unverified against the source documents. |
| *(delivery "4:75" — no separate file)* | 2026-07-15 | Owner, via chat ("4:75") | Received and diff-verified **byte-identical to `batch_03_finalized_output.md`** — an exact duplicate delivery. Content is preserved 1:1 in the batch_03 file, which serves as the archival copy for both deliveries; no filter changes resulted. Flagged to owner as a possible mis-send. |
| `batch_05_unparaphrased_payload.md` | 2026-07-15 | Owner, via chat ("5:75") | Research Hunter "un-paraphrased data payload": first frame-alteration quotes from the Ford General BBLB (cross members, fasteners, welding precautions — two quotes visibly truncated), the full per-class FMVSS 305a DATES sentence (2027 ≤4,536 kg / 2028 >4,536 kg), extended CARB cert-family quote (EO per family) and §2.2.1 ESS fragment, first quote from inside the HVIP Implementation Manual, updated gaps registry. Quotes are Hunter-supplied and unverified. |
| `batch_06_deep_dive_payload.md` | 2026-07-15 | Owner, via chat ("6:75") | Research Hunter "Deep-Dive Source Payload": full CARB applicability quote (MY2021+, "may be certified"); FMVSS summary language attributed to 90 FR 9609; secondary J1673 review (Lectromec) with cable-sizing and splice-avoidance claims; Transit/E-Transit BEMM via unofficial mirror; internal-doctrine self-fence; quantum FUTURE_ONLY. Contains discrepancies caught in filter §13: FR doc URL 2025-02584 vs verified 2025-02582; alternate 2019-05 CARB PDF URL; derived Sept-1-2029 date (arithmetic, not source text); 6×–8× bend multiplier conflicting with batch_05's 4×/6× (both fenced). Quotes Hunter-supplied and unverified. |

**Related archive:** `docs/research/raw/owner_reviews/` holds the
owner's verdicts on Hunter batches (see `review_01_batch_05_verdict.md`,
received 2026-07-15). Owner reviews may relay source content; inline
citation markers visible in the owner's original were stripped in
transit, so owner-relayed specifics are candidate claims pending exact
locators, not verified extractions.

**Standing note:** the archived text is raw research, not doctrine, and
its self-described statuses have no authority. In particular, the
"Second-Stage Research Filter Evaluation" section at the end of
batch_01 is the Hunter's own claim and is superseded by the actual
second-stage filter output in
`docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`.
