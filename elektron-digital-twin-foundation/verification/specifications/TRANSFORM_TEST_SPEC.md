# Transform Test Specification

## Status

**SPECIFIED — Runner NOT_EXECUTED**

Objective: evaluate mathematical validity, precision, and round-trip consistency of coordinates along the EDTS transformation graph (`registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json`).

---

## 1. Mathematical Tolerances

| Tolerance class | Limit | Purpose |
|---|---|---|
| Float64 math | 1.0e-12 mm | Numerical precision for linear transforms |
| Serialized JSON | 1.0e-6 mm | Precision after float serialization/deserialization |
| Float32 runtime | 1.0e-3 mm | GPU / float32 engine compatibility |
| Visual alignment | 1.0 mm | Rendered alignment within physical tolerance |

Plain-text declarations:

```text
float64_math_tolerance_mm = 1.0e-12
serialized_json_tolerance_mm = 1.0e-6
float32_runtime_tolerance_mm = 1.0e-3
visual_alignment_tolerance_mm = 1.0
```

---

## 2. Test Case TS-ISO-GLTF-001

**ISO to glTF axis and scale verification**

```text
input_iso_mm = [4321.5, -1234.2, 876.0]
transform = M_ISO_TO_GLTF_ASSET
expected_gltf_m = [-1.2342, 0.8760, 4.3215]
```

**Read in words:** Apply the ISO-to-glTF-asset matrix to convert millimeters to meters and remap axes. Expected output places left as X, up as Y, and forward as Z in meters.

**Round-trip:** Convert back with inverse `M_GLTF_ASSET_TO_ISO`. Absolute error vector `E = abs(x_reconstructed - x_input)` must satisfy:

```text
max(E) <= Tolerance
```

---

## 3. Test Case TS-ISO-UNREAL-001

**ISO to Unreal scale and Y reflection**

```text
input_iso_mm = [1000.0, 500.0, 200.0]
expected_unreal_cm = [100.0, -50.0, 20.0]
```

---

## 4. Quaternion-Matrix Equivalence Guard

Every transform edge must pass quaternion-to-matrix equivalence within float64 precision before registration (prevention rule for TF-FAIL-001).

---

## 5. Execution Status

See `verification/results/PENDING_IMPLEMENTATION.md` and `TRANSFORM_TEST_RESULTS.json`.
