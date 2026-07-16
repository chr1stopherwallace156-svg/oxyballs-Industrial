# KERNEL_INITIAL_AUDIT_AND_CORRECTIONS

**Purpose:** Preserve the correction trail as regression memory.  
**Related audit snapshot:** `KERNEL_INITIAL_FILE_AUDIT.md`

---

## AUD-001 — Duplicate example silo

| Field | Value |
|---|---|
| Finding | Parallel authoritative-looking instances under `examples/ford/2019_f450_regularcab_4x2_drw/` in addition to `examples/2019_f450/` |
| Resolution | Duplicate JSON files **removed**; path marked **DEPRECATED**; sole authoritative silo = `examples/2019_f450/` |
| Verification | No duplicate authoritative JSON records remain under the ford path (README-only) |
| Date | 2026-07-16 |

---

## AUD-002 — Missing assembly/definition records

| Field | Value |
|---|---|
| Finding | Door instance referenced `ASMINST-VEH000001-CAB` and `CMPDEF-DOOR-FRONT-LH-0001` without local records |
| Resolution | Created `examples/2019_f450/cab-assembly-instance.example.json` and `examples/2019_f450/component-definition-door-fl.example.json` |
| Verification | Referential-integrity suite **7/7 PASS** (`kernel-referential-integrity-tests.json`) |
| Date | 2026-07-16 |

---

## AUD-003 — jsonschema absent

| Field | Value |
|---|---|
| Finding | Draft 2020-12 validation could not run; `jsonschema` missing at audit time |
| Resolution | Installed and pinned: `jsonschema==4.26.0`, `rfc8785==0.1.4`, `referencing==0.37.0` in `verification/requirements-kernel-validation.txt` |
| Verification | Schema suite **19/19 PASS** (`kernel-schema-validation.json`) |
| Date | 2026-07-16 |

---

## Notes retained for regression memory

- Abbreviated fingerprints (`sha256:d84f86f3...`) remain prohibited.
- Fingerprints use RFC 8785 JCS + whitelist + UNKNOWN preservation.
- Instance Resolver requires `(vehicle_instance_id, configuration_id, component_instance_id)`.
