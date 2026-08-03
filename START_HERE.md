# START HERE

**30-second decision tree** for any human or agent entering this repository.

If you only open one file after this, open [`CURRENT_STATE.md`](CURRENT_STATE.md).

---

## Who are you?

| Role | Go here next |
|---|---|
| **Owner / Architect** | [`CURRENT_STATE.md`](CURRENT_STATE.md) → reality vs plan; then [`SYSTEM_MAP.md`](SYSTEM_MAP.md) |
| **Capture iOS developer** | [`transfer/capture-ios-mac-handoff/`](transfer/capture-ios-mac-handoff/) (Mac bundles / ZIPs) + latest `DOWNLOAD-elektron-capture-ios-*.zip` at repo root. There is **no** in-tree `apps/capture-ios/` on Industrial — Capture source is delivered as versioned handoff artifacts. |
| **EDTS (Digital Twin) developer** | [`elektron-digital-twin-foundation/`](elektron-digital-twin-foundation/README.md) |
| **Build Engine developer** | [`engine/`](engine/) + [`docs/ENGINEERING_CONSTITUTION.md`](docs/ENGINEERING_CONSTITUTION.md) |
| **Visible Progress / 3D UI** | [`edts-visible-progress/`](edts-visible-progress/README.md) (provisional — not engineering truth) |
| **VIN / config candidates** | [`edts-vin-resolver/`](edts-vin-resolver/README.md) |
| **Operator / Tester** | [`RUNBOOK.md`](RUNBOOK.md) — clone → setup → doctor → verify |
| **AI coding agent** | [`AGENTS.md`](AGENTS.md) then [`docs/AI_INSTRUCTIONS.md`](docs/AI_INSTRUCTIONS.md) |

---

## What is this repo?

**Elektron Industrial** — gas-to-EV conversion services (Victorville, CA). Coordinated bodies of work:

1. **Capture** — physical evidence acquisition (iOS) → signed packages  
2. **EAE / XREPO ingest** — package validation, hashes, quarantine  
3. **EDTS** — vehicle configuration / twin foundation truth (layer-gated)  
4. **Build Engine** — deterministic compatibility / draft BOM (DRAFT only)  
5. **Visible Progress** — provisional 3D demonstrator  

Nothing here approves, certifies, fabricates, or energizes a vehicle by itself.

---

## Immediate product path (do not over-claim)

```text
READY_FOR_ONE_VEHICLE_REFERENCE_PILOT  = YES   → proceed at Stage 1
READY_FOR_COMPLETE_DIGITAL_TWIN        = NO    → build up the stages
```

See [`Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md`](Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md).

---

## Navigation pillars

| File | Job |
|---|---|
| **START_HERE.md** (this file) | 30-second role router |
| [`SYSTEM_MAP.md`](SYSTEM_MAP.md) | One-page data flow + authorities + gates |
| [`CURRENT_STATE.md`](CURRENT_STATE.md) | Honest runtime truth ledger |
| [`RUNBOOK.md`](RUNBOOK.md) | Clone → local green |

---

## Non-negotiables (short)

- Never invent engineering values.  
- Never delete evidence.  
- Never bypass guardrails, state machines, or configuration locks.  
- Unknown → open-data / research register — do not guess.  
- Propose README / structure changes; do not rewrite the front door silently (`docs/STRUCTURE_FREEZE.md`).
