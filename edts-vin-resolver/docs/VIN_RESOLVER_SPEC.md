# VIN Resolver Specification (DT-D067)

**Package:** `edts-vin-resolver`  
**Endpoint:** `GET https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/{VIN}?format=json`  
**Canonical CFG:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`

## Purpose

Validate a VIN, decode via official NHTSA vPIC, normalize without inventing fields, compare to registered EDTS configurations, persist raw evidence + vehicle record + markdown report, and refuse unsupported engineering claims.

## Honesty

- vPIC is manufacturer-reported; missing values are **UNKNOWN**.
- VIN decode alone **must not** yield `CONFIGURATION_CONFIRMED` or geometry **Verified**.
- WB / CA / frame holes / torque / modification state require physical verification.

## CLI

```bash
cd edts-vin-resolver
npm run vin -- <VIN>
npm run vin -- <VIN> --json
npm run vin -- <VIN> --force-refresh
npm run vin -- <VIN> --compare CFG-2019-F450-REG-CAB-4X2-60CA-DRW
npm run vin -- <VIN> --offline
```

## Outcomes

`EXACT_CANDIDATE` | `PARTIAL_CANDIDATE` | `AMBIGUOUS` | `NO_MATCH` | `INVALID_VIN` | `DECODER_ERROR` | `NETWORK_ERROR`

## Module map

| Module | Role |
|---|---|
| `validateVin.ts` | Format + check digit |
| `decodeVpic.ts` | HTTP transport + retries |
| `normalizeVpic.ts` | Typed identity |
| `resolveConfiguration.ts` | Field compare + ranking |
| `calculateConfidence.ts` | Requirements + lifecycle |
| `persistVinEvidence.ts` | Atomic JSON/MD writes |
| `pipeline.ts` | Orchestration |
| `scripts/resolve-vin.ts` | CLI |

## Maturity (three-axis)

| Axis | Status after DT-D067 |
|---|---|
| Implemented | ✅ |
| Tested | 🧪 unit + fixture pipeline |
| Verified (engineering twin) | ✖ — VIN cannot verify geometry/config lock |
