# capture-ios Mac handoff (P1R-001 incident record + repair)

Tip: `21d24e8131426511d79dcda812721ac1e3104a7c`  
Includes `Docs/Incidents/PHASE_1_RUNTIME_INCIDENT_001.md`

| File | SHA-256 |
|------|---------|
| elektron-capture-ios-complete.bundle | `83b061ca2ced452bffe6b10277e6bb4f8aa0ffccb15678992066e5c9664589c7` |
| elektron-capture-ios-working-tree.zip | `34943780314eee07a6b0b3e7d4273e8116d97f47c30c43e26ec7d3acc47ecb77` |

```bash
git clone elektron-capture-ios-complete.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
open Docs/Incidents/PHASE_1_RUNTIME_INCIDENT_001.md
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

Status: PENDING_PHYSICAL_DEVICE_RETEST
