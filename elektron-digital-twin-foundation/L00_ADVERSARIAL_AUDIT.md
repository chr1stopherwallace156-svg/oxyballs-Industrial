# L00_ADVERSARIAL_AUDIT.md — Layer 0 Adversarial Audit

## Status

**ACCEPTED AS REVIEW FINDING**

Closure authorization remains rejected. Corrections tracked in `L00_CONFIRMED_CORRECTIONS.md` and `L00_PROVISIONAL_CORRECTIONS.md`.

## Executive Summary

The proposed Layer 0 configuration was infected with major pickup-truck specifications, unphysical metrology tolerances, a non-standard coordinate frame, and unverified (even future-dated) evidence entries. This audit deconstructs every parameter of the Layer 0 payload and provides an unyielding, evidence-backed reality check.

**Verdict:** `L00_CLOSURE_REJECTED`

The structural division into Layers is valid and worth keeping, but the parameters, claims, coordinates, and schemas require a total digital reset according to `L00_CORRECTION_PLAN.md`. Proceeding with the previous specifications would have guaranteed system integration failures.

---

## 1. Power & Torque Calibration Mismatch

- **The Error:** The previous baseline claimed 450 hp / 935 lb-ft of torque for the 2019 F-450.
- **The Reality:** Those are pickup ratings (Class 3 light-duty emission standards).
- **The Proof:** Per the 2019 Ford Super Duty Chassis Cab Order Guide and Skeeter Emergency Vehicles / Ford Commercial Data, the 6.7L Power Stroke V8 Turbo Diesel calibrated for Chassis Cabs (under Class 4–5 heavy-duty vocational dyno-certification rules) is rated at exactly **330 hp @ 2,600 rpm** and **750 lb-ft @ 2,000 rpm**.
- **Claim ID:** CHASSIS-001 (see `L00_CLAIM_ERROR_REGISTER.json`)

---

## 2. ISO 8855 Coordinate System Failure

- **The Error:** The previous baseline claimed +X rear, +Y right, +Z up as "ISO 8855."
- **The Reality:** This is mathematically right-handed, but completely violates ISO 8855 conventions.
- **The Proof:** ISO 8855 defines the standard vehicle coordinate system as:
  - **+X:** Forward (longitudinal direction of travel)
  - **+Y:** Left (lateral direction, toward driver side on LHD vehicles)
  - **+Z:** Upward (normal to road plane)
- **The Impact:** Forcing downstream systems (like Unreal Engine, which defaults to a left-handed +X forward, +Y right, +Z up frame) to consume flipped axes without explicit transformations would have caused catastrophic rotation matrix and camera tracking bugs in the runtime model.
- **Claim ID:** COORD-001
- **Correction:** See `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md`

---

## 3. Metrology Accuracy Claims

- **The Error:** A universal tolerance of ≤ 0.05 mm was demanded for all laser scans.
- **The Reality:** Volumetric terrestrial LiDAR systems (such as a Leica RTC360 or Faro Focus) have a 3D point accuracy of ± 1.0 to 3.0 mm at nominal ranges of 10 meters, not 50 μm. A 0.05 mm (50-micron) tolerance is only achievable using industrial structured-light systems (e.g., GOM Metry) or close-range laser trackers under laboratory thermal controls over small, rigid parts.
- **The Impact:** Demanding ≤ 0.05 mm over a 6-meter steel and aluminum commercial chassis is a physical impossibility that would cause any metrology contractor to reject the scan statement of work.
- **Claim ID:** METRO-001
- **Correction:** See `MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md`

---

## 4. Intellectually Dishonest IP Assertions

- **The Error:** Categorizing scan data as "Unrestricted Own IP."
- **The Reality:** Creating a scan of a physically owned OEM vehicle does not legally dissolve trademark rights (Ford, Power Stroke, Super Duty), industrial design patents (the CAD geometry of the panels), or commercial copyright issues. The physical capture process creates copyright over the mesh file itself, but the underlying design remains proprietary.
- **Claim ID:** IP-001

---

## 5. Non-Existent (Future) Evidence

- **The Error:** Listing SRC-005 (Metrology Lab Scan of F-450, 2026 Capture) as a "verified" source.
- **The Reality:** This scan has not physically occurred yet. Registering it as closed-loop evidence violates the scientific integrity of a Research Governance system.
- **Claim ID:** EVID-005

---

## 6. Wheelbase Formatting Precision (Minor)

- **The Error:** Wheelbase formatted as `868.70 mm / 145.30 in` implying 10-micron precision on a nominal chassis measurement.
- **The Reality:** 145.3 in nominal = 3690.6 mm (not over-precise decimal formatting).
- **Claim ID:** UNIT-001

---

## Related Artifacts

| Document | Purpose |
|---|---|
| `L00_CLAIM_ERROR_REGISTER.json` | Machine-readable error register |
| `L00_CORRECTION_PLAN.md` | Required reconciliation steps |
| `CLAIM_REGISTRY_SCHEMA_V2_PROPOSAL.json` | Proposed schema v2 with MAC classes and frame IDs |
| `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md` | Frame dictionary and transform pipeline |
| `MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md` | MAC-A through MAC-D accuracy grading |

---

## Final Evaluation Verdict

```
                       [ L00_CLOSURE_REJECTED ]
```

No work will begin on Layer 1 until corrections are applied and owner feedback is received on the correction proposals.
