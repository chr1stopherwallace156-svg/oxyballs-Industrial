# Configuration Fingerprint Canonicalization Standard

**Status:** `ACTIVE`  
**Kernel:** `1.0.0-rc1`  
**Fingerprint version:** `1`  
**Method:** Canonical JSON (RFC 8785–style) + SHA-256

---

## Method

1. Build a JSON object of **fingerprint axes** for the exact configuration.
2. Apply EDTS normalization rules (below).
3. Serialize with **RFC 8785-style** canonical JSON (sorted keys, minimal separators, UTF-8).
4. Compute `SHA-256` over the UTF-8 bytes.
5. Store as:

```text
configuration_fingerprint = "sha256:" + lowercase_hex_digest
fingerprint_version = 1
```

---

## Excluded fields

Do **not** include in the canonical object:

- any field whose value is `null`
- any field whose value is `NOT_EVALUATED`
- internal IDs such as `configuration_id`, `vehicle_instance_id`
- meta fields such as `$id`, `$schema`, `schema_version`, `notes`, `configuration_fingerprint`, `fingerprint_version`, `fingerprint_canonical_json`

---

## Normalization

| Kind | Rule |
|---|---|
| Lengths | Millimetres as JSON numbers with **2 decimal places** (e.g. `3690.62`, `1524.00` → `1524.0`) |
| Text | Uppercase |
| Keys | Lexicographically sorted (RFC 8785) |
| Separators | Compact `{"a":1,"b":2}` (no spaces) |

---

## Seed (dataset only)

For `CFG-000001` in `examples/2019_f450/`:

```text
canonical_json =
{"cab_to_axle_mm":1524.0,"cab_type":"REGULAR_CAB","drivetrain":"4X2","manufacturer":"FORD","model":"F-450","model_year":2019,"rear_wheel_configuration":"DRW","vehicle_type":"CHASSIS_CAB","wheelbase_mm":3690.62}

configuration_fingerprint =
sha256:39162085dcee611d8713522a771dcf3b7cdeb0e948825a0dd2d2d087530a928e
```

(`145.3 in × 25.4 = 3690.62 mm`; `60 in × 25.4 = 1524.0 mm`)

Changing any axis ⇒ new fingerprint ⇒ new configuration identity. Fingerprint equality across vehicles is discovery only — never inheritance.
