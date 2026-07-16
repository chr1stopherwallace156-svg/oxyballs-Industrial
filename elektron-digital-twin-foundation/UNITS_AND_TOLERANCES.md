# UNITS_AND_TOLERANCES.md — Units of Measure & Precision Rules

## Status

**Active / Architecture Material (Non-binding for current Layer 0 lock)**

## 1. Primary Units of Measure

To eliminate parsing errors, all physical quantities must use standard metric units:

- Length / Spatial Position: millimeters (mm)
- Angles / Rotations: degrees (deg) or radians (rad)
- Torque: Newton-meters (N·m)
- Mass: kilograms (kg)
- Pressure: psi or kilopascals (kPa)
- Voltage: volts (V)
- Current: amperes (A)
- Frequency: Hz
- Textures: PBR_Texture (special type)

## 2. Tolerance Notation

Tolerances must be stated explicitly next to every nominal value. Standard notation:

`(x ± σ)`

This represents a measured value `x` with symmetric uncertainties.

If tolerances are asymmetric:

`(x[+σ₁, −σ₂])`

## 3. Precision Rules

- **Nominal OEM dimensions:** Use source-document precision (e.g., 145.3 in → 3690.6 mm). Do not imply sub-millimeter precision on nominal chassis measurements (see UNIT-001 in `L00_CLAIM_ERROR_REGISTER.json`).
- **Measured dimensions:** Record to the precision justified by the Measurement Accuracy Class (MAC) and instrument certificate.
- **Angular dimensions:** Record to four decimal places when sourced from calibrated metrology (e.g., `4.1250 deg`).

## 4. Measurement Accuracy Classes

See `MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md` for MAC-A (±0.5 mm) through MAC-D (no dimensional authority).

