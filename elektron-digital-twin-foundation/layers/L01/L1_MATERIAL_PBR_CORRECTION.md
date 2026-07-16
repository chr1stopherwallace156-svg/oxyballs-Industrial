# L1 Material PBR Correction

**Status:** `CORRECTION_APPLIED`  
**Trigger:** Adversarial audit claim `CLM-011-FRAME-METALNESS`  
**Related:** `L1_MATERIAL_AND_MANUFACTURING_DOSSIER.md`, `L1_ADVERSARIAL_SOURCE_AUDIT.md`

---

## 1. Realignment of Layer Material Logic

Distinguish structural substrate from visible surface coating:

```text
                         MATERIAL VISUAL LAYERING

       [ Optical Surface ]  --> PBR dielectric clearcoat/coating properties
               |
       [ Coated Film ]      --> Color coat, primer, and base paint
               |
       [ Substrate ]        --> Structural metal sheet (aluminum or steel)
```

### Binding rule

Metalness for painted, e-coated, and powder-coated parts = **`0.0` (dielectric)** unless wear exposes bare metal.

---

## 2. Corrected Material Specifications

### FRAME-POWDERCOAT-SATIN

| Field | Value |
|---|---|
| Physical substrate | High-strength structural steel |
| Surface coating | Satin powdercoat layer |
| Visible PBR behavior | Dielectric coating |
| Metalness | **0.0** (provisional baseline; corrected from invalid 0.8) |
| Roughness | 0.50 (provisional; pending controlled-lighting measurement) |
| Exposed wear behavior | Scratches/chips exposing steel → metalness 1.0, roughness ~0.20 |

### CAB-PAINT-GLOSS

| Field | Value |
|---|---|
| Physical substrate | Aluminum alloy (6000-series) — research claim pending archive |
| Surface coating | Basecoat + glossy clearcoat |
| Visible PBR behavior | Dielectric clearcoat |
| Metalness | **0.0** |
| Roughness | 0.03 (provisional; pending measurement on clean panels) |
| Exposed wear behavior | Clearcoat breach exposing aluminum → metalness 1.0, roughness ~0.30 |

---

## 3. What Changed From Draft V1

| Material | Old metalness | New metalness | Reason |
|---|---|---|---|
| FRAME-POWDERCOAT-SATIN | 0.8 | 0.0 | Coating is dielectric; non-zero metalness causes false metallic reflections |
| CAB-PAINT-GLOSS | 0.0 | 0.0 (unchanged) | Already correct |

Roughness ranges remain **UNVERIFIED** (`CLM-010`, `CLM-012`) until optical capture.
