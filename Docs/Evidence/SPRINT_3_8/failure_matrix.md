# Sprint 3.8 — Failure matrix

| Case | Expected |
|---|---|
| Silent metadata strip | rejected |
| Unknown / expired privacy policy | rejected |
| Missing required redaction | rejected |
| Incorrect source digest / missing derivation | rejected |
| Forbidden raw in inspection | rejected |
| Privacy-first raw persistence | prohibited / nil raw |
| Truncated / modified chunk | verify fail |
| Duplicate / missing sequence | rejected |
| Offset gap / overlap | rejected |
| Cross-tenant / cross-domain dedup | rejected |
| Resume resends accepted (without request) | not resent |
| Expired / cancelled upload | fail |
| Receipt mismatch / missing | fail |
| Duplicate completion | fail |
| Reassembly byte / closure mismatch | fail |
