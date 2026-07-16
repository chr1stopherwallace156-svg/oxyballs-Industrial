# Configuration Fingerprint Standard

**Status:** `ACTIVE`  
**Kernel:** `1.0.0-rc1`  
**Algorithm ID:** `EDTS_CFG_FINGERPRINT_SHA256_V1`  
**Law:** HR-EVI

---

## Purpose

Every `configuration_id` is paired with an immutable **configuration fingerprint** derived from the exact physical attribute axes of that configuration.  
Fingerprints prevent silent collapse of distinct vehicles into one record.

---

## Algorithm (plain text)

```text
1. Collect fingerprint_axes as key/value pairs (exact values only — never ranges).
2. Format each numeric axis with a stable decimal representation
   (wheelbase_in / cab_to_axle_in use their dataset decimal form, e.g. 145.3, 60.0).
3. Sort keys lexicographically ascending.
4. Build canonical string:
     key1=value1|key2=value2|...|keyN=valueN
5. configuration_fingerprint = lowercase hex SHA-256 of UTF-8 canonical string
```

### Required axes (when applicable)

```text
model_year
manufacturer
model
vehicle_type
cab
body_type
drivetrain
rear_wheel_configuration
wheelbase_in
cab_to_axle_in
```

Optional axis: `series` (omit from canonical string when null — or include as empty only if policy requires; v1 omits null series from the string builder by not listing null-only keys... )

**v1.0.0-rc1 seed rule:** include only non-null axes present in the sorted map used for the published digest. The seed dataset publishes `fingerprint_canonical_string` for audit.

---

## Seed digest (dataset, not kernel)

For `CFG-000001` under `examples/ford/2019_f450_regularcab_4x2_drw/`:

```text
canonical =
body_type=Chassis Cab|cab=Regular Cab|cab_to_axle_in=60.0|drivetrain=4x2|manufacturer=Ford|model=F-450|model_year=2019|rear_wheel_configuration=DRW|vehicle_type=Chassis Cab|wheelbase_in=145.3

configuration_fingerprint =
85a3345e02776690c1c8689dbec732cf42bae1606eb4c6263f2a08630f5fa2a7
```

Changing any axis ⇒ new fingerprint ⇒ new configuration identity.

---

## Non-inheritance

Fingerprints are never reused across vehicles.  
A matching fingerprint across two datasets still requires a **cross-vehicle-comparison** record before any reusable definition link — fingerprint equality alone is discovery, not inheritance.
