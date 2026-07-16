# L00 — Reference Lock

**Status:** `REFERENCE_CONFIGURATION_BLOCKED` — **reference not locked**  
**Authoritative docs:** [`layers/L00/`](L00/)  
**Reconciliation:** [L00/CONFIGURATION_RECONCILIATION.md](L00/CONFIGURATION_RECONCILIATION.md)  
**Decision:** DT-D001 BLOCKED; DT-D005 accepted  
**Blocks:** L01 until owner selects platform (Candidate C1, P1, or P2)

> **Do not use the provisional specification below for modeling.**  
> See [L00/REFERENCE_LOCK.md](L00/REFERENCE_LOCK.md) for current lock statement.

## Gate status (2026-07-16)

| Gate | Status |
|------|--------|
| Visual | blocked |
| Dimensional | blocked |
| Structural | blocked |
| Interaction | pass (N/A) |
| Documentation | in_progress |

---

## Historical note

The content below predates configuration reconciliation and is retained for audit trail only.

Elektron operates in two vehicle classes today:

| Class | Example | Build Engine alignment | Marketing alignment |
|-------|---------|------------------------|---------------------|
| Light-duty pickup | 2015–2020 F-150 SuperCab | Partial (Transit BEMM only) | Standard Conversion tier |
| Class 4/5 truck | 2017–2020 F-450/F-550 Super Duty | **Primary** (L1 BBAS, frame rules) | Extended Range / Fleet tier |

**Recommendation:** Lock **F-450 Super Duty** first. The Build Engine already routes Super Duty BBLB acquisition, frame alteration rules, and HV architecture for GVWR > 10,000 lb platforms. F-150 remains a documented variant (DT-D001-B) for a future second reference lock.

---

## 2. Provisional reference lock

| Attribute | Locked value (provisional) | Source / confidence |
|-----------|---------------------------|---------------------|
| **Model year** | **2019** | Mid-cycle 4th-gen Super Duty (2017–2022); common fleet donor years; BBAS docs align to 2017+ refresh |
| **Make / model** | **Ford F-450 Super Duty XL** | Build Engine L1 lane |
| **Cab configuration** | **Regular Cab** | Maximizes engine-bay access; shortest wheelbase in F-450 pickup line |
| **4x2 or 4x4** | **4x2** | Simpler first-pass driveline; 4x4 documented as derivative |
| **Wheelbase** | **141.6 in (3597 mm)** | Ford Super Duty pickup dimension table — Regular Cab |
| **Bed / body** | **8 ft Styleside, DRW pickup** | Stock fleet configuration; no service body |
| **Body / upfit** | **None — stock pickup** | Upfit variants require separate reference lock |
| **Wheels and tires** | **19.5 in DRW steel (stock)** | Per 2017–2019 Super Duty DRW pickup spec sheets |
| **Engine configuration** | **6.7L Power Stroke V8 diesel** | Stock OEM — conversion removes this assembly |
| **Transmission** | **6-speed TorqShift automatic** | Stock OEM — paired with 6.7L |
| **GVWR (approx.)** | **~14,000 lb class** | Verify per axle/door sticker on physical unit |

### Dimensional anchors (Regular Cab 4x2 DRW pickup)

| Dimension | Value | Source |
|-----------|-------|--------|
| Wheelbase | 141.6 in / 3597 mm | Ford Super Duty dimension guide (2017–2019 pickup) |
| Overall length (approx.) | 231.8 in | 2019 F-450 Regular Cab 8 ft DRW — third-party spec; **verify against OEM table** |
| Width (excl. mirrors) | 105.9 in (F-450 pickup) | KBB / Ford materials — **verify** |
| Bed length | 8 ft | Configuration lock |

> **Open:** Track width, ground clearance, cab interior, and frame rail section dimensions require vehicle-specific BBLB extraction (blocker DT-B003).

---

## 3. Reference vehicle (physical)

| Field | Status |
|-------|--------|
| Shop inventory unit | **TBD** — blocker [DT-B002](../STATUS.json) |
| VIN | TBD |
| Mileage / condition | TBD |
| Location | Elektron Industrial, Victorville, CA (expected) |

**Action:** Owner assigns either (a) an in-shop donor, (b) a purchased donor spec, or (c) explicit approval to proceed OEM-only until a unit is available.

---

## 4. Geometry source strategy

### Primary — OEM published data

| Source | Path | License | Status |
|--------|------|---------|--------|
| Ford BBAS portal | https://www.fordpro.com/en-us/upfit/bbas/ | Ford upfitter terms | Candidate path (Build Engine CS-05) |
| Super Duty BBLB (vehicle-specific) | BBAS download | Internal use | **Not archived** — DT-B003 |
| General BBLB | Marketing Associates token URL (CS-07) | Internal use | Candidate — not substitute for Super Duty BBLB |
| Super Duty pickup box bulletin Q-356R2 (CS-10) | BBAS | Internal use | Candidate — first SD-specific doc on file |

### Secondary — physical measurement

| Method | Scope | When |
|--------|-------|------|
| LiDAR (tripod) | Engine bay, frame rails, cab floor | After reference unit assigned |
| Photogrammetry | Exterior Tier C | L01 if OEM outline insufficient |
| Manual metrology | Tier A hole patterns | L02–L03 at mounts |

See [THREE_D_SPEC.md](../THREE_D_SPEC.md) for scanning tiers and [DT-D002](../DECISIONS.md#dt-d002--tiered-geometry-and-accuracy-strategy).

---

## 5. Scanning vs CAD strategy

```
Phase A (L00–L01): OEM tables + BBLB  →  blocking volumes, wheelbase, overall envelope
Phase B (L02–L03): Targeted LiDAR     →  frame rails, engine bay, mounts (Tier A/B)
Phase C (L04+):    Derived assembly   →  disassembly pivots from measured geometry
Phase D (L10):     LOD simplification →  presentation meshes
```

**CAD strategy:** Use Ford BBAS CAD for **internal** interface checks only. Deliverable twin uses derived glTF per DT-D003. Do not commit OEM CAD to git.

---

## 6. Licensing restrictions

| Asset | Rule |
|-------|------|
| Ford BBAS CAD | Internal use per Ford upfitter agreement; no public repo |
| Ford BBLB PDFs | Archive in Build Engine `docs/research/raw/` when obtained; cite, don't redistribute |
| Derived meshes | Elektron-owned if created without incorporating restricted CAD vertices |
| Scans | Elektron-owned; redact VIN/plates in published materials |
| Third-party spec sites | Lead-only until cross-checked against OEM |

Legal review of BBAS terms recommended before CAD import (DT-D003).

---

## 7. Accuracy requirements

Per DT-D002:

| Tier | Tolerance | L00 application |
|------|-----------|-----------------|
| A — mounting interfaces | ±2 mm | Declared at L02+; strategy locked here |
| B — powertrain envelope | ±5 mm | Engine bay bounding box from BBLB + scan |
| C — exterior cosmetic | ±10 mm | Overall length/width/height for L01 |

L00 passes the dimensional gate when Tier C envelope dimensions are sourced and Tier A/B strategy is documented — not when all Tier A dims are measured.

---

## 8. Documented variants (not locked)

### DT-D001-A — 4x4 derivative

Same as provisional lock but 4x4. Adds front axle, transfer case, and ride-height deltas. Requires separate dimensional pass before use.

### DT-D001-B — F-150 light-duty alternative

| Attribute | Value |
|-----------|-------|
| Model year | 2017 |
| Model | F-150 SuperCab XL |
| Drivetrain | 4x2 |
| Wheelbase | 145.0 in (6.5 ft bed) |
| Engine | 5.0L Coyote V8 |

**Use case:** Standard Conversion tier ($29,995). Lock only if owner prioritizes light-duty fleet over Super Duty.

---

## 9. Owner decisions required

1. **Approve or revise DT-D001** (F-450 vs F-150 vs other)
2. **Assign physical reference unit** (VIN or acquisition plan)
3. **Confirm 4x2 first** or lock 4x4 immediately
4. **Authorize BBAS access** for Super Duty BBLB download

Record approval in [APPROVAL_GATES.md](../APPROVAL_GATES.md).

---

## 10. L00 exit criteria

- [ ] Owner approval for reference lock
- [ ] All five gates `pass` in STATUS.json
- [ ] Blockers DT-B001 resolved; DT-B002/B003 documented with owner acceptance or plan
- [ ] Physical or OEM-only path explicitly chosen
- [ ] CHANGELOG updated
- [ ] `active_layer` advances to L01

---

## Research references

- Ford 2020 F-150 Tech Specs (variant comparison only): https://media.ford.com/content/dam/fordmedia/North%20America/US/product/2020/f150/2020-F150-TechSpecs.pdf
- Ford Super Duty dimension guide (2017–2019 pickup): BBAS / marketingassociates hosted PDF
- Build Engine CS-05, CS-07, CS-10 on branch `claude/docs-structure-large-projects-b6vxx5`

See [research/RESEARCH_LOG.md](../research/RESEARCH_LOG.md) entry RL-001.
