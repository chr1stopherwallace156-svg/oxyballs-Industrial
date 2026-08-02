<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# SECURITY_AUDIT

## Executive summary

No live API keys/tokens found in Swift sources. Strong **authority boundary** code rejects Build Engine / EDTS ownership claims. Cryptographic **attestation/signing is mock or NOT_IMPLEMENTED** — acceptable only while labeled non-production for those features. Logging generally avoids dumping JPEG bytes; hashes and paths may appear in diagnostics. Hard-coded device profile IDs and Documents/temp paths are operational risks, not credential leaks.

## Evidence

| Check | Result |
|---|---|
| Secrets/credentials in Swift | None found in audit scan |
| AuthorityGuard / forbidden claims | Present + tested |
| Manifest signer / Secure Enclave / App Attest | README deferred; excluded from SPM |
| MockAttestationVerifier | Always returns true |
| Package seal | `NOT_IMPLEMENTED` string in builder |
| JPEG byte logging | Explicitly avoided; SHA + byteCount logged |
| Path diagnostics | `EDTS_INV_PATH_DIAG=1` prints absolute paths |
| CanonicalJSON diagnostics | May print to stdout/stderr |
| Default device id | `CAP-DEVICE-IPRO-LIDAR-001` style defaults |
| Privacy | Local Evidence Library on device; share sheet export — no cloud upload code in compiled surface |

## Findings

1. **Do not mistake mock attestation for security product.**
2. Seal/sign must be a future CHANGE with real threat model work (`THREAT_MODEL.md` exists — not implemented).
3. Diagnostic env flags should stay off in production builds.
4. Device identity placeholders must not be presented as attested hardware identity.

## Risk level

**Medium** (false security claims); **Low** for credential exfiltration from repo contents.

## Recommended action

- Keep mocks behind ProductionConfigurationGuard.
- Add Security test target when seal/attest lands.
- Review console log redaction before App Store / field pilots.

## Priority

P1

## Confidence

Med-High
