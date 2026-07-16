# CONFIGURATION_RECONCILIATION.md — EDTS Layer 0

**Pass date:** 2026-07-16  
**Agent:** Cursor Cloud Agent  
**Rule:** No new specifications invented. No Layer 1 work. No geometry assets.

---

## Reconciliation result

# `REFERENCE_CONFIGURATION_BLOCKED`

Layer 0 reference is **not locked**. The provisional specification is **internally inconsistent with the stated EDTS commercial chassis-cab / work-truck intent**, and **cannot be confirmed as a single valid factory configuration** without owner resolution of platform type and an OEM conflict on F-450 Regular Cab pickup availability.

### Applicability

Applies To:
- 2019 Ford F-450
- Regular Cab
- DRW
- 4×2

Not Applicable To:
- F-350
- Pickup configurations that do not match the above
- Crew Cab configurations
- Other model years unless separately verified

---

## 1. Provisional specification under review

| Field | Provisional value |
|-------|-------------------|
| Model year | 2019 |
| Make / model | Ford F-450 Super Duty |
| Cab | Regular Cab |
| Drive | 4×2 |
| Wheelbase | 141.6 in |
| Body | 8 ft bed |
| Engine | 6.7L Power Stroke diesel |
| DRW | Yes (implied) |

---

## 2. Three-way determination

| Option | Verdict | Evidence summary |
|--------|---------|------------------|
| **1. F-450 pickup (factory 8 ft Styleside bed)** | **DISPUTED — cannot confirm** | Pickup dimension semantics (141.6 in WB + 8 ft box + 56.1 in back-of-cab-to-rear-axle) apply to F-250/F-350 Regular Cab in OEM pickup tables. Ford **2018 Super Duty Pickups** configuration table lists **F-450 pickup only as Crew Cab 176.0 in DRW** — Regular Cab not shown for F-450. Third-party (KBB) lists 2019 F-450 Regular Cab 141.6 in pickup — **conflicts with OEM pickup lineup table**. |
| **2. F-450 chassis cab + aftermarket 8 ft body** | **NOT what provisional describes** | Chassis cab does not use “8 ft bed” as a factory dimension. Uses **wheelbase + cab-to-axle (CA) + aft-of-axle frame extension + upfit body**. Minimum F-450 Regular Cab DRW chassis cab wheelbase is **145.3 in**, not 141.6 in. |
| **3. Internally inconsistent combination** | **YES — as stated** | Mixing **141.6 in wheelbase** and **“8 ft bed”** (pickup language) with **F-450** while EDTS original target is **commercial chassis-cab / work-truck** creates a configuration that does not map cleanly to one Ford orderable platform without owner choosing pickup vs chassis cab. |

---

## 3. Authoritative source comparison

### Source A — Ford Super Duty Pickups dimension guide (pickup platform)

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED (not yet archived in repo) |
| **Exact source** | `2018 F-250/ F-350/ F-450 Super Duty Pickups` — Configurations / Exterior Dimensions |
| **Document title** | Super Duty Pickups dimension guide (BBAS-hosted) |
| **Document model year** | 2018 (covers 2017–2019 pickup generation; **2019 MY-specific confirmation still required**) |
| **URL (tokenized)** | https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=4310018&v2=053118031741&v3=60&v4=441752a32c206ea5b65036e99b97a71370438b14c32da14f759bea6b&v5=False |
| **Page / table** | Configurations table; Code A Wheelbase; Code E Overall Length |
| **Confidence** | High for F-250/F-350 Regular Cab pickup; **Medium for F-450 applicability to 2019 MY** |
| **Applicability** | Pickup (Styleside box), not chassis cab |

**Key extractions (F-250/F-350 Regular Cab pickup — confirmed in table):**

| Dimension | Value | Code |
|-----------|------:|------|
| Wheelbase | 141.6 in | A |
| Back-of-cab to rear axle | 56.1 in | (config table) |
| Box length | 8 ft | (config table) |
| Overall length | 231.8 in | E |
| Front overhang | 38.2 in | B |
| Rear overhang | 52.0 in | C |

**F-450 pickup row in same document:**

| Configuration | Wheelbase | Box | DRW | Status |
|---------------|----------:|-----|-----|--------|
| Crew Cab 4×2 | 176.0 in | 8 ft | X | DOCUMENTED |
| Crew Cab 4×4 | 176.0 in | 8 ft | X | DOCUMENTED |
| Regular Cab | — | — | — | **Not listed for F-450** |

**F-450 DRW pickup GVWR table (same document):** only Crew Cab 176.0 in entries; GVWR 14,000 lb with 6.7L.

| Field | Value |
|-------|-------|
| **Conflict** | KBB lists 2019 F-450 Regular Cab Pickup 2D 8 ft at 141.6 in WB — **not corroborated in OEM F-450 pickup configuration row** |

---

### Source B — 2019 F-350/F-450/F-550 SD Chassis Cabs Specs (chassis cab platform)

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED (not yet archived in repo) |
| **Exact source** | Ford dealerconnection printable specs — Chassis Cab |
| **Document title** | `2019 F-350/F-450/F-550 SD Chassis Cabs - Specs` |
| **Document model year** | 2019 |
| **URL** | https://www.b2dauthor.dealerconnection.com/content/ret-ford/en/vehicles/truck/f350/2019/specs.printable.section.html |
| **Page / table** | Dimensions/Weights/Capacities → Regular Cab Chassis Cab |
| **Confidence** | High |
| **Applicability** | Chassis cab only — **not pickup** |

**F-450 Regular Cab DRW chassis cab — wheelbase / CA options:**

| Wheelbase (in.) | Cab-to-axle (in.) | Aft-axle frame extension (in.) | Overall length (in.) |
|----------------:|------------------:|-------------------------------:|---------------------:|
| 145.3 | 60 | 42.2 | 230.7 |
| 169.3 | 84 | 32.4 | 254.8 |
| 193.3 | 108 | — | 278.8 |
| 205.3 | 120 | — | 290.7 |

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Conflict with provisional** | **141.6 in wheelbase does not appear** in F-450 chassis cab wheelbase table. **“8 ft bed” is not a chassis cab dimension.** |

**GVWR (F-450 chassis cab):**

| Field | Value | Source |
|-------|-------|--------|
| Max GVWR | 16,500 lb | Vehicle Class Ratings table; F-450 Chassis Cab weight ratings |
| F-450 pickup GVWR | 14,000 lb | Same document family — pickup vs chassis cab explicitly separated |

**4×2 availability:** DOCUMENTED — Regular Cab 4×2 rows present at 145.3 in and longer wheelbases.

**6.7L diesel:** DOCUMENTED — available on F-450 chassis cab DRW configurations.

**Fuel tank (Regular Cab chassis cab, DRW 6.7L):**

| Configuration | Location | Capacity |
|---------------|----------|----------|
| Standard | Aft-of-axle | 40.0 gal |
| Optional (65C) | Midship + aft-of-axle | 26.5 + 40.0 gal (66.5 total) |

**Mirrors (chassis cab — Regular Cab DRW):**

| Measure | Value | Status |
|---------|------:|--------|
| Width with mirrors | 105.9 in | DOCUMENTED |
| Width mirrors folded | RESEARCH_REQUIRED | Not extracted for Regular Cab in this pass |
| Width mirrors extended | RESEARCH_REQUIRED | Not extracted for Regular Cab in this pass |

**Suspension / axles / wheels / tires:** RESEARCH_REQUIRED — specific spring codes, GAWR rows, and tire sizes not extracted in this pass; tables exist in same document.

---

### Source C — 2019 Super Duty Chassis Cab brochure (supporting)

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Document title** | `2019 Super Duty® Chassis Cab` |
| **Document model year** | 2019 |
| **URL** | https://pictures.dealer.com/raypricestroudfordfd/da3388c10a0e09a772ab9b79fe44501b.pdf |
| **Confidence** | High |
| **Applicability** | Chassis cab marketing/spec summary — corroborates Source B wheelbase/CA/length table |

---

### Source D — 2019 Ford Body Application Guide (upfit context)

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Document title** | `2019 Ford Body Application Guide` |
| **Document model year** | 2019 |
| **URL** | https://xr793.com/wp-content/uploads/2020/03/2019-Ford-Body-Application-Guide.pdf |
| **Confidence** | Medium (third-party host — **official BBAS copy preferred**) |
| **Applicability** | Upfit/body application on chassis cab and pickup box delete — reinforces that **chassis cab upfit uses CA/WB**, not pickup bed length |

---

### Source E — KBB 2019 F-450 Regular Cab (third party — LEAD ONLY)

| Field | Value |
|-------|-------|
| **Status** | UNVERIFIED |
| **Exact source** | Kelley Blue Book |
| **URL** | https://www.kbb.com/ford/f450-super-duty-regular-cab/2019/specs/ |
| **Confidence** | Low until OEM corroboration |
| **Conflict** | Claims 141.6 in wheelbase F-450 Regular Cab pickup exists — **conflicts with Source A F-450 pickup configuration row** |

---

## 4. Item-by-item reconciliation

| Item | Provisional | Pickup platform | Chassis cab platform | Resolution |
|------|-------------|-----------------|----------------------|------------|
| **Pickup vs chassis cab** | Unstated | Pickup | Chassis cab | **OWNER DECISION REQUIRED** — EDTS work-truck intent favors chassis cab |
| **Factory bed vs upfit** | “8 ft bed” | Factory Styleside (if pickup) | Aftermarket/upfit body on bare frame | **Mutually exclusive framing** |
| **Wheelbase** | 141.6 in | 141.6 in (F-250/F-350 Reg Cab); F-450 **disputed** | 145.3 in minimum (F-450 Reg Cab) | **Conflict — blocked** |
| **Cab-to-axle** | Not stated | 56.1 in (pickup Reg Cab) | 60 in at 145.3 in WB | Chassis cab metric not applicable to pickup framing |
| **Rear frame length** | Not stated | Defined by 8 ft box | Aft-of-axle extension 42.2 in (60 CA) | RESEARCH_REQUIRED after platform lock |
| **Overall length** | UNVERIFIED | 231.8 in (OEM pickup table, F-250/F-350 Reg Cab) | 230.7 in at 145.3 in WB chassis cab | Depends on platform |
| **DRW** | Implied | Available F-350/F-450 pickup | Available F-450 chassis cab | DOCUMENTED both |
| **4×2** | Stated | DOCUMENTED pickup tables | DOCUMENTED chassis cab tables | Both available **on respective platforms** |
| **Engine 6.7L diesel** | Stated | DOCUMENTED F-450 pickup (Crew Cab table) | DOCUMENTED F-450 chassis cab | Both — **configuration still blocked** |
| **GVWR** | UNVERIFIED | 14,000 lb (F-450 pickup class) | 16,500 lb (F-450 chassis cab) | **Different by platform** |
| **Axle ratings** | UNVERIFIED | Pickup GAWR tables | Chassis cab GAWR tables | RESEARCH_REQUIRED after platform lock |
| **Wheels / tires** | UNVERIFIED | LT245/75R17E cited in pickup option weights | RESEARCH_REQUIRED | RESEARCH_REQUIRED |
| **Mirrors** | UNVERIFIED | Pickup dimensions differ from chassis cab | 105.9 in width w/ mirrors (chassis cab) | RESEARCH_REQUIRED after platform lock |
| **Fuel tank** | UNVERIFIED | 48 gal (F-450 DRW pickup powertrain table) | 40 aft standard; optional dual tank | Platform-dependent |
| **Suspension** | UNVERIFIED | Pickup spring packages | Chassis cab heavier spring packs | Platform-dependent |

---

## 5. Candidate configurations (not locked — for owner selection)

### Candidate C1 — Chassis cab (aligns with EDTS commercial / work-truck intent)

| Field | Value | Status |
|-------|-------|--------|
| Platform | **F-450 chassis cab** | DOCUMENTED |
| Model year | 2019 | DOCUMENTED |
| Cab | Regular Cab | DOCUMENTED |
| Drive | 4×2 DRW | DOCUMENTED |
| Wheelbase | **145.3 in** | DOCUMENTED (Source B) |
| Cab-to-axle | **60 in** | DOCUMENTED (Source B) |
| Aft-axle frame extension | **42.2 in** | DOCUMENTED (Source B footnote 3) |
| Overall length (bare chassis) | **230.7 in** | DOCUMENTED (Source B) |
| Body / upfit | **None at L00 — upfit TBD** | RESEARCH_REQUIRED |
| Engine | 6.7L Power Stroke diesel | DOCUMENTED available |
| GVWR | **16,500 lb** (max class for F-450 CC) | DOCUMENTED |
| L01 geometry scope | **OEM cab + chassis frame only** until upfit body is specified | RECOMMENDED |

### Candidate P1 — Pickup (provisional as stated — OEM disputed for F-450 Reg Cab)

| Field | Value | Status |
|-------|-------|--------|
| Platform | **F-450 pickup** | DISPUTED for Regular Cab |
| Model year | 2019 | LEAD_ONLY (KBB) |
| Cab | Regular Cab | **CONFLICT** — OEM pickup table shows F-450 only as Crew Cab |
| Drive | 4×2 DRW | LEAD_ONLY |
| Wheelbase | 141.6 in | DOCUMENTED for F-250/F-350; **DISPUTED for F-450** |
| Body | 8 ft Styleside | Pickup framing |
| Engine | 6.7L diesel | DOCUMENTED for F-450 DRW pickup (Crew Cab table) |
| GVWR | 14,000 lb | DOCUMENTED (pickup class) |
| L01 geometry scope | Factory pickup complete vehicle | Only valid if platform confirmed |

### Candidate P2 — Pickup (OEM-confirmed F-450 pickup configuration)

| Field | Value | Status |
|-------|-------|--------|
| Platform | F-450 pickup | DOCUMENTED |
| Cab | **Crew Cab** | DOCUMENTED |
| Wheelbase | **176.0 in** | DOCUMENTED (Source A) |
| Body | 8 ft Styleside DRW | DOCUMENTED |
| Drive | 4×2 or 4×4 | DOCUMENTED |

---

## 6. Layer 1 geometry scope (blocked until configuration locked)

| Scope option | When to use |
|--------------|-------------|
| OEM cab + chassis only | **Chassis cab (C1)** — default for work-truck / upfit path |
| Factory pickup | **Pickup (P1 or P2)** — only after platform confirmed |
| Completed work-truck upfit | **Requires named upfit body** — cannot start at L00 without body builder spec |

**Current answer:** **None — configuration blocked.**

---

## 7. Licensing note (unchanged)

BBAS / OEM document use: **DOCUMENTED** terms not reviewed. Legal approval: **COUNSEL_REVIEW_REQUIRED**. See [LEGAL_LICENSES.md](LEGAL_LICENSES.md).

---

## 8. Required owner actions to unblock

1. **Select platform:** Chassis cab (C1) vs Pickup (P1/P2) vs other.
2. **If chassis cab:** Confirm wheelbase/CA (recommend 145.3 in / 60 in as shortest Regular Cab DRW).
3. **If chassis cab:** State whether L01 models bare chassis only or includes a specific upfit body (name the body).
4. **If pickup:** Resolve OEM conflict — obtain **2019 MY Ford pickup ordering guide** to confirm or reject F-450 Regular Cab 141.6 in.
5. **Assign physical VIN** or explicitly approve **OEM-only platform reference** (not verified twin of one truck).

---

## 9. Layer 0 status after this pass

| Checklist item | Status |
|----------------|--------|
| Reference vehicle locked | **FAIL — BLOCKED** |
| Platform type resolved | **FAIL** |
| Dimensions documented with sources | **PARTIAL — platform-dependent tables started** |
| Geometry strategy selected | PASS (hybrid — unchanged) |
| Licensing reviewed | **COUNSEL_REVIEW_REQUIRED** |
| Unknowns documented | PASS |
| Exterior requirements approved | **BLOCKED** |

**Layer 0 is not approved. Do not begin Layer 1.**
