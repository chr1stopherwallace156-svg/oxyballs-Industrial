# Handoff — Sprint 3.7 Identity / Recovery / Resilience

## What shipped

- Signature + enrollment + App Attest portable contracts
- Hash-chained `CaptureEpochJournal` + recovery scanner
- Adaptive thermal/resource policy + performance telemetry
- Fixture packages (journaled + resilient) with enrolled fixture signatures
- `SecureEnclavePackageSigner` / `AppleAppAttestClient` Linux stubs (Apple candidates)

## What remains

- Sprint 3.6B physical Apple hardware capture (`SPKG-DEVICE-000001`)
- Physical Secure Enclave signing validation
- Physical App Attest validation
- Real thermal / crash recovery on device

## Restore

```bash
unzip DOWNLOAD-elektron-capture-ios-sprint-3-7-identity-recovery-resilience.zip
cd elektron-capture-ios
make phase3-7-resilience-verify
swift test
```
