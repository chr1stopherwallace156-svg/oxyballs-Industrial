# EDTS Kernel

**Version:** `1.0.0-rc1` — see [KERNEL_MANIFEST.json](KERNEL_MANIFEST.json)  
**Status:** `EDTS_EXACT_VEHICLE_KERNEL_READY`  
**Primary directive:** Exact-Vehicle Isolation ([documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md](documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md))

| Area | Path |
|---|---|
| Universal schemas | `schemas/*.schema.json` |
| Seed vehicle silo | `examples/ford/2019_f450_regularcab_4x2_drw/` |
| Isolation tests | `python3 verification/isolation/run_isolation_tests.py` |
| Fingerprints | `documentation/CONFIGURATION_FINGERPRINT_STANDARD.md` |

The kernel never changes for a new OEM. Only datasets under `examples/<manufacturer>/<exact_configuration>/` are added.
