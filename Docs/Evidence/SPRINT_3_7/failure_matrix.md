# Sprint 3.7 — Failure / trust matrix

| Case | Expected result |
|---|---|
| Valid enrolled-key signature | `VALID_ENROLLED` |
| Unknown-key signature | `VALID_BUT_UNTRUSTED_ORIGIN` / `UNKNOWN_KEY` |
| Revoked-key signature | `VALID_BUT_UNTRUSTED_ORIGIN` / `REVOKED_KEY` |
| Signature-byte mutation | `INVALID` / `SIGNATURE_BYTE_MUTATION` |
| Package-digest mutation | `INVALID` / `PACKAGE_BINDING_MISMATCH` |
| Enrollment-record mismatch | `INVALID` / `ENROLLMENT_MISMATCH` |
| App-attest challenge replay | `ASSERTION_REPLAYED` |
| Expired challenge | `CHALLENGE_EXPIRED` |
| Package-binding mismatch (attest) | `ATTESTATION_FAILED` |
| Complete hash chain | `RECOVERED_TO_LAST_COMMITTED_BLOCK` |
| Broken prior-block link | `HASH_CHAIN_BROKEN` |
| Truncated / uncommitted tail | `INCOMPLETE_TAIL_QUARANTINED` |
| Duplicate / missing sequence | `JOURNAL_CORRUPT` |
| Resumed capture | no duplicate sample IDs |
| Cancellation with unsealed journal | no sealed package |
| Silent required-stream degradation | rejected |
| Fixture signatures | `TEST_FIXTURE` only — not hardware |
| Secure Enclave / App Attest hardware | `PENDING_PHYSICAL_VALIDATION` |
