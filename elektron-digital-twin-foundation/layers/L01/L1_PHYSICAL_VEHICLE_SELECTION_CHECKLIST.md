# EDTS Layer 1 Physical Vehicle Selection Checklist

**Status:** `DRAFT`  
**Purpose:** Grade candidate physical units before photogrammetry or coordinate mapping  
**Configuration target:** Regular Cab / 4x2 / DRW / 145.3 in WB / 60 in CA / bare cab-and-chassis preferred

A correct cab shell remains useful even if the donor chassis is modified or damaged behind the rear cab wall. Grade before reject.

```text
                         ┌──────────────────────┐
                         │ Candidate Vehicle VIN│
                         └──────────┬───────────┘
                                    │
                         ┌──────────┴──────────┐
                         │   Initial Audit     │
                         └──────────┬───────────┘
                                    │
             ┌──────────────────────┴──────────────────────┐
             ▼                                             ▼
     [Unmodified Original]                       [Modified Rear Frame]
             │                                             │
      ┌──────┴──────┐                               ┌──────┴──────┐
      │   GRADE-A   │                               │   GRADE-B   │
      │ (Full Twin) │                               │ (Cab/Fender)│
      └─────────────┘                               └─────────────┘
```

---

## 1. Primary Fleet Identification Rules

**All VIN position rules are `DOCUMENT_VERIFICATION_REQUIRED`** — do not accept/reject solely on unverified folklore patterns.

- [ ] **Model Year Validation**: VIN position 10 must match the verified year code — `[DOCUMENT_VERIFICATION_REQUIRED]`
- [ ] **Assembly Plant Code**: VIN position 11 must match the certified plant code — `[DOCUMENT_VERIFICATION_REQUIRED]`
- [ ] **Chassis Identifier Prefix**: VIN prefix must match the verified vehicle line pattern — `[DOCUMENT_VERIFICATION_REQUIRED]`
- [ ] **Wheelbase Match**: Measure hub centerline to hub centerline. Target nominally **145.3 in** (3690.6 mm). Record actual + uncertainty.
- [ ] **Cab-to-Axle Match**: Measure back-of-cab sheet metal to rear axle centerline. Target **60 in** nominal. Record actual + uncertainty.
- [ ] **Cab Style**: Regular Cab only. SuperCab / Crew Cab → **REJECT** for this configuration lock.

## 2. Configuration Modification Audit

- [ ] **Front Fender Arches**: Wide-track front composite flare present?
- [ ] **Front Suspension Geometry**: Reject (**REJECT** grade) if aftermarket leveling kits, spacer rings, or non-OEM arms alter front geometry.
- [ ] **Rear Spring Pack**: Note OEM vs helper bags / helper springs (may still be GRADE-B if front/cab intact).
- [ ] **Bumper / Fascia**: Factory utility bumper present? Note chrome vs grey.
- [ ] **Chassis Rear**: Bare slick rails vs cut/upfitted body — drives GRADE-A vs GRADE-B.

## 3. Candidate Grades

| Grade | Definition | Allowed L1 use |
|---|---|---|
| **GRADE-A** | Exact unmodified reference — complete, un-upfitted, unmodified factory chassis cab | Full structural twin (interior, frame corridors, suspension, cab) |
| **GRADE-B** | Reversible or documented modifications — rear frame cut or aftermarket accessories (utility box, helper airbags) but cab shell, front suspension, and front frame horns unaltered | Front-end structure + full cab scanning |
| **GRADE-C** | Component reference only — frame altered or engine swapped, but exterior cab sheet metal, doors, trim, and grille pristine | Panel curvature and exterior material reference only |
| **REJECT** | Structural collision damage to passenger cabin; wrong cab style; or frame mods that warp/alter front suspension geometry | Do not use |

## 4. Label & Tag Intake (accepted grades)

- [ ] FMVSS certification label (door jamb) — full + crops
- [ ] Window sticker / VIN build sheet if available
- [ ] Rear axle housing tag text
- [ ] Tire sidewall brand/size (`CNF-002`)
- [ ] Front axle architecture photos (`CNF-001`)

## 5. Decision Record

| Field | Value |
|---|---|
| Candidate VIN | |
| Assigned grade | GRADE-A / GRADE-B / GRADE-C / REJECT |
| Accept for which scan priorities | See `L1_SCAN_PRIORITY_SEQUENCE.md` |
| Reject / demote reason | |
| Inspector | |
| Date (ISO) | |
| Evidence folder | `research/intake/<VIN>/` |
