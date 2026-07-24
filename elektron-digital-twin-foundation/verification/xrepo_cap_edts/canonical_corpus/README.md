# Cross-language canonical JSON corpus

| Field | Value |
|---|---|
| Goal | `CROSS_LANGUAGE_CANONICAL_JSON_BYTE_IDENTITY_VERIFIED` |
| Rule | Compare **raw UTF-8 bytes** and SHA-256 — do not parse-and-compare objects |
| Producer | Swift `CanonicalJSON.data` (`elektron-capture-ios`) |
| Consumer | Python `dumps_canonical` (`eae/importers/xrepo_cap_edts/canonical_json.py`) |

## Files

| File | Role |
|---|---|
| `corpus.semantic.json` | Shared semantic input (pretty; key order intentionally not canonical) |
| `corpus.python.canonical.json` | Bytes from current Python `dumps_canonical` |
| `corpus.python.canonical.sha256` | SHA-256 of those bytes |

## Current status

**UNVERIFIED** against Swift (no Swift toolchain in this environment).

### Predicted high-risk mismatch

Python currently uses `ensure_ascii=True`, so `unicode` becomes `\u00e9lectron`.  
Apple `JSONSerialization` with `.sortedKeys` typically emits UTF-8 `électron` without `\u` escapes.

`Docs/Validation/CANONICAL_JSON.md` prose says “no unnecessary escapes,” while its Implementation table still lists `ensure_ascii=True`. Resolve that conflict before claiming byte identity.

**Do not** declare success from object-equality after `json.loads` on both sides.

## Acceptance procedure (Mac + this repo)

```bash
# Industrial (Python gate — already automated)
cd elektron-digital-twin-foundation
python3 -m pytest tests/eae/test_canonical_json_corpus.py -q

# Capture (Swift gate — requires Xcode/Swift)
cd elektron-capture-ios
swift test --filter CrossLanguageCanonicalJSONTests
# Must equal corpus.python.canonical.json byte-for-byte OR
# update Python policy + regenerate golden under a reviewed contract change.
```

When both sides emit identical bytes for this corpus (and the existing phase1 manifest golden), record:

```text
CROSS_LANGUAGE_CANONICAL_JSON_BYTE_IDENTITY_VERIFIED
```
