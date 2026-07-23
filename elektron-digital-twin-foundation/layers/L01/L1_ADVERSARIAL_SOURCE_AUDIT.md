# L1 Adversarial Source Audit

**Document ID:** `L1_ADVERSARIAL_SOURCE_AUDIT`  
**Status:** `ACCEPTED_AS_REVIEW_FINDING`  
**Applies to:** Layer 1 exterior visual reference research draft package  
**Vehicle:** 2019 Ford F-450 Chassis Cab — Regular Cab / 4x2 / DRW / 145.3 in WB / 60 in CA

---

## 1. Audit Scope & Executive Summary

This document registers the strict adversarial verification of all spatial, physical, and optical assertions found in the previous Layer 1 draft. To eliminate hallucinated details and confidently guide asset development, each claim is evaluated against authoritative documentation (Ford Body Builder Advisory Service [BBAS], Ford Order Guides, and manufacturer spec sheets) where available.

Every claim has been downgraded to its appropriate verification state. See:

- `L1_CLAIM_REGISTER_PROPOSAL.json`
- `L1_CONFIGURATION_CONFLICT_REGISTER.json`
- `L1_FINAL_GAP_REPORT.md`

### Status banners after audit

| Field | Value |
|---|---|
| Current status | `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE` |
| Current phase | `L1_FACTUAL_VERIFICATION_REQUIRED` |
| Gate status | `L1_REQUIRES_MORE_REFERENCE_DATA` |

Geometry / mesh production remains **BLOCKED**.

---

## 2. Suspension Configuration Resolution

A primary blocking contradiction existed in the initial draft regarding the front suspension architecture of the 2019 Ford F-450 Regular Cab DRW 4x2.

### Contradiction

The initial hierarchy named the node `FRONT_AXLE_MONOBEAM` while simultaneously noting "(Twin-I-Beam for 4x2 or Monobeam structure)".

### Audit reconciliation

While F-250 and F-350 4x2 series commonly use independent Twin-I-Beam front suspension, heavy-duty F-450 Chassis Cab fleet packaging is reported (Ford BBAS / Order Guide ranking) as a wide-track monobeam solid axle with coil springs for both 4x2 and 4x4.

### Humility protocol

To align with engineering review boundaries and avoid premature locking, the node remains generalized to **`FRONT_AXLE_ASSEMBLY` / `OBJ-FRONT-AXLE-ASSEMBLY`** with:

- `status: CONFIGURATION_UNRESOLVED`
- `candidate_types: [MONOBEAM, TWIN_I_BEAM]`

until the reference vehicle is physically inspected. See conflict `CNF-001-FRONT-SUSPENSION-TYPE`.

---

## 3. PBR Optical Standards Realignment

The previous draft asserted metalness `0.8` for satin-coated frame rails. In standard PBR metallic/roughness pipelines, any non-conductive top layer (paint, primer, powdercoat) acts as a **dielectric** surface layer. Non-zero metalness on coated metal creates rendering artifacts and unrealistic reflections.

### Rule

Metalness for all painted, e-coated, and powder-coated parts must be **`0.0` (dielectric)** unless physical wear has scraped away the coating to expose bare metal.

Correction details: `L1_MATERIAL_PBR_CORRECTION.md`  
Claim: `CLM-011-FRAME-METALNESS` → `PBR_CORRECTION_REQUIRED` (corrected in material dossier)

---

## 4. Claim Downgrade Summary

| Class | Action |
|---|---|
| Numeric dimensions without archived Tier 1 cite | `UNVERIFIED` / `RESEARCH_REQUIRED` / `PHYSICAL_CAPTURE_REQUIRED` |
| Order-guide / BBAS-supported values | `DOCUMENT_SUPPORTED` + `PHYSICAL_VERIFICATION_PENDING` |
| Tire brand / rim material trim variants | `CONFIGURATION_DEPENDENT` |
| Software performance gates (px/m, model tolerance) | `PROVISIONAL_SPECIFICATION_ONLY` |
| Invalid PBR metalness on coatings | Correct to dielectric `0.0` |

---

## 5. Binding Consequences

1. Do not promote draft L1 claims to VERIFIED without archived evidence + physical cross-check where required.
2. Prefer V2 hierarchy / registries / landmark classes over V1 drafts for ongoing work.
3. Capture planning prefers station grid (`L1_CAPTURE_COVERAGE_GRID_PROPOSAL.json`) over ring-only coverage for chassis rails.
4. Gate remains `L1_REQUIRES_MORE_REFERENCE_DATA` until gap report items close.
