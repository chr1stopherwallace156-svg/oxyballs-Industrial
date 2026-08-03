# Canonical non-ASCII serialization policy (Pass 1)

| Field | Value |
|---|---|
| Status | **REVIEWED / ENFORCED** |
| Decision date | 2026-07-24 |
| Pass | 1 only |
| Tags | Do **not** move `capture-ios-phase0-approved-v0.1.3` / `capture-ios-phase1-directive-v0.1.4` |

## What failed (observed)

The cross-language byte gate failed because of an **escaping-policy mismatch**, not NFC/NFD Unicode normalization:

```text
Swift (pre-fix JSONSerialization):  "électron"   (raw UTF-8 C3 A9 …)
Python golden (ensure_ascii=True):     "\u00e9lectron"
```

Those strings are **semantically equivalent JSON** but **not byte-identical**.  
The gate requires **identical UTF-8 bytes + identical SHA-256**. Object-equality after parse is **forbidden** as a substitute.

## Chosen policy (single rule)

| Rule | Binding |
|---|---|
| Non-ASCII code points in canonical JSON strings | Emit as `\uXXXX` (BMP) or surrogate pair `\uHHHH\uLLLL` (supplementary) |
| ASCII (`U+0000`…`U+007F`) | Unchanged (existing RFC 8259 escapes for controls/`"`/`\` remain) |
| Solidus `/` | Not escaped (`\/` rewritten to `/` for Linux Foundation parity) |
| Alignment | Matches Python `json.dumps(..., sort_keys=True, separators=(',', ':'), ensure_ascii=True)` |

**Rejected alternative:** raw UTF-8 for non-ASCII (would require regenerating the Python golden and EDTS importer to `ensure_ascii=False`). Not chosen for Pass 1 because the shared golden already uses `ensure_ascii=True`.

**Not in scope:** NFC/NFD string normalization of character content. Do not “normalize Unicode” casually.

## Enforcement

| Side | Mechanism |
|---|---|
| Swift | `CanonicalJSON.ensureAsciiEscapes` after sorted-key serialization |
| Python / golden | `Tests/Unit/Fixtures/canonical_corpus/corpus.python.canonical.json` |
| Tests | `Pass1CanonicalInventoryTests.testSwiftLiteralCorpusMatchesPythonGoldenBytes` (Swift Bool literals — no JSON reparse) + Darwin `CrossLanguageCanonicalJSONTests` |

## Integrity guardrail

> Passing tests is not sufficient if achieved by weakening byte-identity, inventory completeness, status ownership, or artifact-integrity assertions.
