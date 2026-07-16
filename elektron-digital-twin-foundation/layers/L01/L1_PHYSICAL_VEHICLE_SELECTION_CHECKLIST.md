# EDTS Layer 1 Physical Vehicle Selection Checklist

**Status:** `DRAFT`  
**Purpose:** Prevent dimensional contamination — audit any candidate truck before photogrammetry or 3D coordinate mapping.  
**Configuration target:** Regular Cab / 4x2 / DRW / 145.3 in WB / 60 in CA / bare cab-and-chassis

**VIN decode humility:** Pattern checks below are **provisional selection filters**. Confirm against an authoritative Ford VIN / model-year decoder and the actual FMVSS label before accepting a unit.

---

## 1. Primary Fleet Validation

- [ ] **Model Year Check**: Validate 10th digit of VIN is **K** (2019) — verify with OEM decoder.
- [ ] **Assembly Plant Check**: Validate 11th digit of VIN is **E** (Kentucky Truck Plant) — verify with OEM decoder; reject only after confirmed plant codes for this platform.
- [ ] **Platform Designation**: Validate VIN WMI/VDS pattern matches F-450 Chassis Cab 4x2 DRW for the candidate (provisional hunt pattern often cited: `1FDF4F…` — **CONFIRM before accept/reject**).
- [ ] **Wheelbase Match**: Measure hub centerline to hub centerline. Must read nominally **145.3 in** (3690.6 mm nominal).
- [ ] **Cab-to-Axle Match**: Measure back-of-cab sheet metal to rear axle centerline. Must read **60 inches** nominal.

## 2. Configuration Modification Audit

- [ ] **Front Fender Arches**: Verify presence of the wide-track front composite flare extension.
- [ ] **Suspension Alteration Check**: Inspect front coil bucket mounts. Reject if aftermarket leveling kits, spacer rings, or non-OEM radius arms are fitted.
- [ ] **Rear Spring Pack Validation**: Verify standard multi-leaf main / auxiliary setup. Reject if custom helper bags or helper springs are modified.
- [ ] **Bumper and Front Fascia**: Verify presence of factory standard grey or chrome utility bumper with tow-hook routing.
- [ ] **Chassis Rear Configuration**: Confirm the frame aft of the cab is slick (no aftermarket service bodies that alter original frame flanges or access holes).

## 3. Label & Tag Intake (required once selected)

- [ ] Photograph FMVSS certification label (door jamb) — full frame + crop of tire/GVWR lines.
- [ ] Capture window sticker and/or VIN build sheet if available.
- [ ] Photograph rear axle differential housing tag (expect Dana S110 — confirm tag text).
- [ ] Photograph tire sidewall brand/size for `CNF-002`.
- [ ] Photograph front axle visible architecture for `CNF-001` (monobeam vs twin-I-beam).

## 4. Decision Record

| Field | Value |
|---|---|
| Candidate VIN | |
| Accept / Reject | |
| Reject reason (if any) | |
| Inspector | |
| Date (ISO) | |
| Evidence folder | `research/intake/<VIN>/` |
