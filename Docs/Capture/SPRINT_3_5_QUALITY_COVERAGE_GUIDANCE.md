# Sprint 3.5 — Quality, Coverage, and Operator Guidance

| Field | Value |
|---|---|
| Baseline | `185120496a64a6e56b95dc3ea409f09064398e25` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-5-quality-coverage-guidance.zip` |
| Delivery ZIP SHA-256 | `b2323ac018ab80effe45b85e14dbb4cc46f67704c6d588dd4c01efc25f497eed` |
| Primary | `SPKG-FIXTURE-GUIDED-CAPTURE-000001` / `SESS-FIXTURE-GUIDED-CAPTURE-000001` |

## Authority

- `evidence_origin_authority = TEST_FIXTURE`
- `guidance_authority = GUIDANCE_ESTIMATE`
- Fixture thresholds: `DETERMINISTIC_TEST_FIXTURE` / `PENDING_PHYSICAL_CHARACTERIZATION` / `NO_SYSTEM_TOLERANCE_ASSIGNED`
- `SUFFICIENT_FOR_PACKAGE_FINALIZATION` means configured capture policy only — not geometry/reconstruction/engineering completeness.

## Verify

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-5-quality-coverage-guidance.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-5-quality-coverage-guidance.zip
cd elektron-capture-ios
make phase3-5-guidance-verify
swift test
```
