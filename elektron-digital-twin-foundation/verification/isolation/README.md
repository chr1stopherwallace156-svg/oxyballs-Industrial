# Isolation Test Suite (HR-EVI)

Negative tests proving Exact Vehicle Isolation.

```bash
python3 verification/isolation/run_isolation_tests.py
```

| Test | Proves |
|---|---|
| Universal schemas | No OEM literals in kernel schemas |
| Dataset path | Ford exact config lives under `examples/ford/...` |
| Door binding | `VEH-000001` + `CFG-000001` only |
| No leakage tokens | No other years/models/drivetrains on door instance |
| Negative fixtures | Year-range / inheritance fixtures stay out of `examples/` |
| Foreign IDs | No Tesla/Toyota/Chevrolet vehicle IDs in Ford dataset |

Fixtures under `fixtures/` are **illicit by design** and must never be promoted to datasets.
