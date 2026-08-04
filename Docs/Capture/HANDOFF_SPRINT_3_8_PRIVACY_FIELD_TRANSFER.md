# Handoff — Sprint 3.8 Privacy / Field Transfer

## Shipped

- Evidence privacy policies + metadata ledger
- Raw vs redacted derivation (never overwrites source)
- Inspection vs engineering delivery profiles
- Fixed-size content-addressed chunking + resumable upload + tenant-scoped dedup
- Reassembly byte-identity + closure verification
- Apple Vision / Core ML source-candidate stubs

## Remains

- Physical privacy characterization
- Background URLSession / cellular transfer
- Sprint 3.6B device package

## Restore

```bash
unzip DOWNLOAD-elektron-capture-ios-sprint-3-8-privacy-field-transfer.zip
cd elektron-capture-ios
make phase3-8-privacy-transfer-verify
swift test
```
