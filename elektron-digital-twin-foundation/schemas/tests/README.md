# Claim Schema Test Suite

## Purpose

Fixtures for validating `schemas/CLAIM_REGISTRY_CORE_SCHEMA_V5_PROPOSAL.json`.

| Path | Expectation |
|---|---|
| `valid/valid_scalar_claim.json` | Must validate |
| `invalid/invalid_mixed_fields_claim.json` | Must fail — SCALAR structure with both `scalar_value` and `vector_value` violates oneOf exclusivity |

## Validation note

The invalid case fails because `oneOf` conditions constrain `value_details` to permit ONLY `scalar_value` when `value_structure` is `SCALAR`, rejecting additional fields such as `vector_value`.
