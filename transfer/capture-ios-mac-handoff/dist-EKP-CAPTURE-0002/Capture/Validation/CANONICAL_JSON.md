# CANONICAL_JSON.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Manifest signing, hash binding of structured metadata |
| Supersedes | (none) |

## Why this exists

Swift `Dictionary` iteration order is **not** a serialization contract.  
Two implementations (Swift exporter vs EDTS Python/TypeScript importer) must produce the **same bytes** for the same information when signing or binding hashes to structured metadata.

Artifact **file** hashes (SHA-256 of HEIC/DNG/binaries) are independent of JSON canonicalization.  
Canonical JSON applies to **manifests, package_meta, session records, and signature payloads**.

## Canonical JSON rules (binding)

| Rule | Requirement |
|---|---|
| Encoding | UTF-8 |
| Key order | Lexicographic ascending Unicode code-point order of key strings |
| Object form | No duplicate keys |
| Whitespace | None (compact): separators `,` and `:` with no spaces |
| Arrays | Preserve element order (semantic order); do not sort unless a field’s contract says so (e.g. `parent_artifact_ids` sorted by contract) |
| Strings | Non-ASCII emitted as `\uXXXX` per **reviewed escaping policy** (`Docs/Validation/CANONICAL_NON_ASCII_POLICY.md`) — not NFC/NFD normalization; not raw UTF-8 |
| Booleans | `true` / `false` lowercase |
| Null | `null` |
| Integers | Encode as JSON numbers without decimal point or exponent when the value is an integer in range of IEEE-754 exact ints used by both sides; prefer Integral JSON numbers for whole values |
| Floating point | Normalize via documented decimal string **or** reject non-finite values; do not use locale-dependent formatting; prefer test matrices of integers; when floats are required, use shortest round-trip or fixed scale declared by the field |
| Timestamps in signed payloads | Prefer already-normalized ISO-8601 UTC strings (`Z` suffix) as JSON strings — do not embed raw `Date` objects |
| Pretty-print | **Forbidden** for signed/canonical bytes (pretty files may exist for humans; signatures use canonical form) |

## Implementation

| Language | Entry point |
|---|---|
| Swift | `CanonicalJSON.data(_:)` / `CanonicalJSON.string(_:)` — uses `JSONSerialization` with `.sortedKeys` only after tree normalization; **never** iterate `Dictionary` for output order |
| Python | `json.dumps(obj, sort_keys=True, separators=(',', ':'), ensure_ascii=True)` after the same semantic normalization |

## Non-goals

- Canonicalizing binary media
- Depending on pretty-printed `manifest.json` on disk for signatures
- Claiming bit-identical floats across all CPU architectures without a fixed scale policy

## Tests

`Scripts/test-determinism` and Swift `CanonicalJSON` unit tests must prove sorted-key stability independent of insertion order.

## Cross-language proof (required for EDTS_COMPATIBLE)

Local Swift/Python determinism is necessary but **not sufficient**.

Before claiming `EDTS_COMPATIBLE`, the EDTS importer handshake (XREPO-CAP-EDTS-0001) must prove:

```
Swift CanonicalJSON(fixture)
        ↓
identical UTF-8 bytes + identical SHA-256
        ↑
EDTS server-side canonicalizer(same fixture)
```

Future shared fixture set should include difficult cases:

* Unicode text;
* escaped characters;
* negative zero;
* very small and very large finite decimals;
* nested objects;
* empty arrays and objects;
* timestamps with normalized precision;
* unordered input keys.

Until that dual-implementation test passes, keep integration status at `PACKAGE_EXPORT_READY`.
