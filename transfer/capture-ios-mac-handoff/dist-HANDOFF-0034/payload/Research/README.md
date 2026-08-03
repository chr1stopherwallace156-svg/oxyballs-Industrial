# Research — Elektron Capture Lab

Isolated from SPM production targets (`App/`, `Tests/`).

```text
Research/
├── References/          # Upstream clones, vendor SDKs, papers (not production)
│   ├── Apple/
│   ├── GitHub/
│   ├── VendorSDKs/
│   └── Papers/
├── Spikes/              # Throwaway experiments (e.g. IR-0001/) — NOT linked to production
├── IntegrationReports/  # Atomic IR-0001+
└── Deferred/            # ML / YOLO / interpretation — NO production interfaces
```

Active spike: `Spikes/IR-0001/` — AVFoundation exposure/focus; outputs only under Research.

## Provenance decisions (mandatory in every IR)

`REFERENCE ONLY` | `ALGORITHM REIMPLEMENTATION` | `WRAPPED DEPENDENCY` | `VENDOR SDK INTEGRATION`
