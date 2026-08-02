# Cross-repository change request template

Use when `elektron-capture-ios` requires a change in another repository (typically `edts-core` / `edts-capture-api`).

Suggested ID: `XREPO-CAP-EDTS-####`

```markdown
## XREPO-CAP-EDTS-XXXX

| Field | Value |
|---|---|
| Request ID | XREPO-CAP-EDTS-XXXX |
| Origin repository | elektron-capture-ios |
| Target repository | edts-core / edts-capture-api |
| Problem | |
| Required contract change | |
| Reason | |
| Backward compatibility | |
| Migration plan | |
| Security impact | |
| Testing plan | |
| Required release order | |

Do **not** silently change a local contract and assume EDTS will adapt.
```

File completed requests under `Docs/Integration/XREPO/` when raised.
