# KERNEL_VALIDATION_REPORT

**execution_timestamp:** `2026-07-16T17:34:19.483561+00:00`  
**runtime:** `python3`  
**kernel_version:** `1.0.0-rc1`  
**final_status:** `EDTS_EXACT_VEHICLE_KERNEL_VALIDATED`

## Initial audit

See `verification/results/KERNEL_INITIAL_FILE_AUDIT.md` (recorded before corrections).

## Required files

- Schemas present: **11/11** 
- Examples present: **7/7** 

## Suite results

| Suite | Result file | pass_or_fail | passed | failed | NOT_EXECUTED |
|---|---|---|---|---|---|
| Fingerprint | kernel-fingerprint-tests.json | PASS | 8 | 0 | 0 |
| Schema validation | kernel-schema-validation.json | PASS | 19 | 0 | 0 |
| Isolation | kernel-isolation-tests.json | PASS | 15 | 0 | 0 |
| Referential integrity | kernel-referential-integrity-tests.json | PASS | 7 | 0 | 0 |

## Final status decision

```text
missing_schemas = []
missing_examples = []
suite_fails = []
not_executed = 0
=> EDTS_EXACT_VEHICLE_KERNEL_VALIDATED
```

## Notes

- Fingerprints use RFC 8785 JCS + SHA-256; abbreviated digests prohibited.
- Instance Resolver requires `(vehicle_instance_id, configuration_id, component_instance_id)`.
- Canonical-name-only lookup is rejected by policy/tests.
