# TIMESTAMP_STANDARD.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All timestamps |
| Supersedes | (none) |

## Clock domains

| Domain | Source |
|---|---|
| `wall` | Device wall clock (UTC preferred when available) |
| `monotonic_uptime` | System uptime |
| `arkit_frame` | ARFrame timestamp |
| `core_motion` | CMMotion timestamps (relative to boot) |
| `avfoundation_capture` | AV capture timestamp |
| `server_receipt` | Server receipt time |
| `server_challenge` | Trusted challenge time |

## Rules

- Every timestamp declares `clock_domain`.
- Do not compare domains without a documented mapping (`mapping_method`, `mapping_residual`).
- Do not claim camera/IMU “exact sync” without validation.
- Core Motion windows store capture timestamp + sample window (start/end/samples).
