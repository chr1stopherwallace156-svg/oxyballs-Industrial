# Transform Test Specification

## Status

**SPECIFIED — Runner NOT_EXECUTED**

Evaluates mathematical validity, precision, and round-trip consistency along the EDTS transformation graph.

---

## 1. Test Profiles (Provisional Targets)

### MATH_FLOAT64_STRICT

```text
description = Strict double-precision verification of coordinate transformations
absolute_tolerance = 1.0e-12
relative_tolerance = 1.0e-15
source_unit = UNIT-MM
numeric_precision = float64
number_of_composed_edges = 1
```

### JSON_SERIALIZATION

```text
description = Precision preservation after string serialization and deserialization
absolute_tolerance = 1.0e-6
relative_tolerance = 1.0e-8
source_unit = UNIT-MM
numeric_precision = float64
number_of_composed_edges = 1
```

### RUNTIME_FLOAT32

```text
description = Compatibility with single-precision GPU shaders and game engines
absolute_tolerance = 1.0e-3
relative_tolerance = 1.0e-5
source_unit = UNIT-MM
numeric_precision = float32
number_of_composed_edges = 2
```

### VISUAL_ALIGNMENT

```text
description = Allowable alignment offsets in the 3D rendering context
absolute_tolerance = 1.0
relative_tolerance = 1.0e-1
source_unit = UNIT-MM
numeric_precision = float32
number_of_composed_edges = 2
```

---

## 2. Test Case TS-ISO-GLTF-001

**ISO to glTF axis and scale verification**

```text
input_iso_mm = [4321.5, -1234.2, 876.0]
transform_edge = TF-ISO-TO-GLTF-ASSET
expected_gltf_m = [-1.2342, 0.8760, 4.3215]
inverse_edge = TF-GLTF-ASSET-TO-ISO
expected_reconstructed_iso_mm = [4321.5, -1234.2, 876.0]
```

### Plain-Text Rule Verification

```text
max_absolute_error_mm <= applicable_tolerance_mm
```

**Read in Words:** The largest absolute difference between any reconstructed coordinate and its original coordinate must be less than or equal to the tolerance assigned to that execution environment.

---

## 3. Execution Status

See `verification/results/PENDING_IMPLEMENTATION.md` and `TRANSFORM_TEST_RESULTS.json`.
