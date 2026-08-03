# VIN Resolver Runbook

## Install

```bash
cd edts-vin-resolver
npm install
```

## Decode a VIN

```bash
npm run vin -- 1HTKHPVK8KH805188
```

Artifacts:

- `data/evidence/vin/<VIN>.raw.json` — immutable raw evidence + hash
- `data/vehicles/VEH-<VIN>.json` — candidate vehicle record
- `reports/vin/<VIN>.md` — human report

## Offline

Requires prior evidence file:

```bash
npm run vin -- 1HTKHPVK8KH805188 --offline
```

## Tests

```bash
npm test
npm run typecheck
npm run build
# opt-in live API:
npm run vin:test-live
```

## Exit codes

| Code | Meaning |
|---:|---|
| 0 | Decode + report OK |
| 1 | Invalid VIN |
| 2 | Network / decoder failure |
| 3 | Persistence failure |
| 4 | Configuration registry error |

## Do not

- Scrape unofficial VIN sites
- Invent WB/CA/DRW from VIN
- Mark `CONFIGURATION_CONFIRMED` from decode alone
- Share UI decoding logic separate from this package — import `resolveVin` instead
