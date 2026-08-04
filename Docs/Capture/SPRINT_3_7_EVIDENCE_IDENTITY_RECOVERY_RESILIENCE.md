# Sprint 3.7 — Evidence Identity, Recovery & Runtime Resilience

## Objective

Add portable contracts and Linux-fixture validation for cryptographic package identity, device-key enrollment, App Attest envelopes, crash-safe capture journaling, thermal adaptation, and performance telemetry.

## Dual-plane discipline

| Plane | Sprint 3.7 result |
|---|---|
| Source architecture | Implemented + Linux fixture validated |
| Apple physical security | Source candidates only — unvalidated |

Sprint 3.6A (PR #61) remains Validation Readiness Complete. Sprint 3.6B physical Apple execution remains pending Mac/iPhone.

## Trust layer separation

1. Package hash identity (`sha256-canonical-inventory-v1`)
2. Cryptographic signature (`PackageSignatureEnvelope`)
3. Device-key enrollment (`DeviceKeyEnrollmentRecord`)
4. App-instance attestation (`AppAttestAssertionEnvelope`)

Embedded public keys are never trusted alone. Fixture signatures are not hardware signatures.

## Primary fixtures

- `SPKG-FIXTURE-JOURNALED-CAPTURE-000001`
- `SPKG-FIXTURE-RESILIENT-CAPTURE-000001`

## Verification

```bash
make phase3-7-resilience-verify
swift test
```
