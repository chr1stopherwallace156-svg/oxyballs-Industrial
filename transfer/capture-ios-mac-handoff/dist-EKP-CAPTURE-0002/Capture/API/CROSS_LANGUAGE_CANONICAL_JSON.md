# Cross-language canonical JSON

Shared corpus with EDTS:

- Industrial: `elektron-digital-twin-foundation/verification/xrepo_cap_edts/canonical_corpus/`
- This repo: `Tests/Unit/Fixtures/canonical_corpus/` (copied for SPM resources)

Acceptance token when Swift bytes == Python golden bytes:

```text
CROSS_LANGUAGE_CANONICAL_JSON_BYTE_IDENTITY_VERIFIED
```

Run: `swift test --filter CrossLanguageCanonicalJSONTests`

Do not accept object-equality after parsing as a substitute.
