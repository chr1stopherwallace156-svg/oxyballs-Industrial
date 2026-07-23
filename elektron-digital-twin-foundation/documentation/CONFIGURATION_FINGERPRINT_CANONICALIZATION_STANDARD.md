# Configuration Fingerprint Canonicalization Standard

**Status:** `ACTIVE`  
**Kernel:** `1.0.0-rc1`  
**fingerprint_version:** `1`  
**Algorithm ID:** `EDTS_CFG_FINGERPRINT_JCS_SHA256_V1`

---

## Rules

1. Use an **explicit identity-field whitelist** (below). No other fields enter the digest.
2. Preserve explicit `UNKNOWN` values. Do **not** drop `UNKNOWN`. Whitelisted fields with JSON `null` are retained as JSON `null` in the canonical object.
3. Use **canonical units**: lengths as millimetres (`wheelbase_mm`, `cab_to_axle_mm`).
4. Serialize with **RFC 8785 JSON Canonicalization Scheme (JCS)**.
5. Hash with **SHA-256**.
6. Store digest as full lowercase 64-character hex with prefix:

```text
configuration_fingerprint = "sha256:" + lowercase_hex64
```

Pattern: `^sha256:[a-f0-9]{64}$`

7. Keep `configuration_id` **separate** — it is never an input to the fingerprint.
8. Record `fingerprint_version` (integer). Current: `1`.
9. Do **not** apply universal two-decimal rounding to every engineering measurement. Numbers enter JCS as provided in the identity object; JCS defines number encoding.

---

## Identity-field whitelist

```text
manufacturer
model
model_year
vehicle_type
cab_type
drivetrain
rear_wheel_configuration
wheelbase_mm
cab_to_axle_mm
series
```

Text fields that are known MUST be stored uppercase in the identity object before canonicalization.  
If a value is not known, use the string `UNKNOWN` (not omission).

---

## Computation (plain text)

```text
1. Build identity object containing ONLY whitelist keys.
2. Normalize known text fields to uppercase; leave UNKNOWN as UNKNOWN; leave null as null.
3. Exclude configuration_id and all non-whitelist fields.
4. bytes = RFC8785_JCS(identity_object)
5. configuration_fingerprint = "sha256:" + sha256_hex(bytes)
6. fingerprint_version = 1
7. fingerprint_status = COMPUTED
```

Until computation runs:

```text
configuration_fingerprint = null
fingerprint_status = NOT_COMPUTED
```

Abbreviated hashes such as `sha256:d84f86f3...` are **prohibited**.

---

## Tooling

- Generator: `verification/fingerprint/generate_configuration_fingerprint.py`
- Tests: `verification/fingerprint/test_configuration_fingerprint.py`
