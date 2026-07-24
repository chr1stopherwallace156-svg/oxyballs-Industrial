# capture-ios CANDIDATE handoff for P1R-001 physical retest

**NOT a physically validated release snapshot.**

| Field | Value |
|-------|-------|
| Tip SHA | `cca69f88a7ffe1d4323da4da3bfc12126eb88977` |
| Branch | `cursor/canonicalization-failed-repair-d881` |
| Incident | P1R-001 OPEN / PENDING_PHYSICAL_DEVICE_RETEST |
| Candidate repair | `1b132f4` (unapproved for baseline until physical proof) |
| Bundle SHA-256 | `b29ac788c227e85f7050d13dee655725f20fb31494111b906b38dfd8e54c81f1` |
| ZIP SHA-256 | `efe71f14f032b5004cc9927bfdecb091338ab786afe508779e0057e5b1dc2e0e` |

## Mac workflow

```bash
git clone elektron-capture-ios-complete.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
# or: git checkout cca69f88a7ffe1d4323da4da3bfc12126eb88977

swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
# Build → Install on iPhone → Capture & Export
# Then fill Docs/Incidents/PHASE_1_RUNTIME_INCIDENT_001.md Acceptance Evidence
```

Reject Industrial/EDTS hash bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7.
