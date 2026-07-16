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

- Linear dimensions: record to exactly two decimal places (e.g., `868.70 mm`)
- Angular dimensions: record to four decimal places (e.g., `4.1250 deg`)

