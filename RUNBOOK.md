# RUNBOOK

Deterministic path from **git clone → local green**. Prefer this over tribal memory.

For *what* is ready vs not, see [`CURRENT_STATE.md`](CURRENT_STATE.md).  
For *where* systems connect, see [`SYSTEM_MAP.md`](SYSTEM_MAP.md).

---

## 0. Prerequisites

- Git  
- Node.js **≥ 20** (root EDE) — Build Engine wants **≥ 22.5** when working in `engine/`  
- macOS + Xcode only when running Capture iOS device/Mac gates (Linux cloud cannot close those)

---

## 1. Clone and workstation bootstrap (EDE)

```bash
git clone <repo-url> elektron-industrial
cd elektron-industrial

./scripts/setup.sh
# or
npm run setup

./scripts/doctor.sh
# EDE namespaced doctor (workstation):
npm run ede:doctor

./scripts/verify.sh
```

Optional:

```bash
npm run dashboard
npm run check
```

**Note:** `npm run doctor` / `npm run backup` are **Local Runtime** contracts. EDE uses `ede:*`.

---

## 2. Build Engine (independent)

```bash
cd engine
npm install
npm test
npm run platform001:generate   # produces DRAFT_INCOMPLETE package artifacts
cd ..
```

Expect: tests green; Platform 001 remains **DRAFT_INCOMPLETE** — not an approval.

---

## 3. Visible Progress (provisional 3D)

```bash
cd edts-visible-progress
npm install
npm run dev
```

Open the local URL printed by Vite. Treat renders as **provisional**, not twin truth.

---

## 4. VIN resolver (candidates only)

```bash
cd edts-vin-resolver
npm install
npm run vin -- 1HTKHPVK8KH805188
```

Outputs configuration **candidates**, not geometry-verified twins.

---

## 5. Capture iOS (Mac / device)

Industrial delivers Capture as **versioned handoff artifacts**, not an in-tree app folder.

```bash
# Prefer a versioned DOWNLOAD + matching .sha256
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-<name>.zip.sha256

# Or restore from transfer/capture-ios-mac-handoff/ pin-named .bundle
cd transfer/capture-ios-mac-handoff
# follow README historical / pin sections for the tip you intend
git clone <pin>.bundle elektron-capture-ios
cd elektron-capture-ios
./Scripts/verify-xcode-handoff.sh   # expect HANDOFF_LAYOUT_OK when script present
swift test                          # Linux/cloud may run package tests; xcodebuild needs Mac
open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
```

Device Capture & Export proof is an **operator gate** — cloud agents cannot close it.

---

## 6. EDTS foundation

```bash
cd elektron-digital-twin-foundation
# Read README + layer docs; follow foundation verification instructions for the layer you are on
```

Do not claim geometry lock without the foundation’s own acceptance criteria.

---

## 7. Reference pilot (Stage 1)

When running the first physical vehicle:

1. Read [`Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md`](Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md)  
2. Execute **Stage 1 only** (photos + metadata + SHA-256)  
3. Record digests; do not skip to “complete twin” language  

---

## Failure doctrine

| Symptom | Action |
|---|---|
| `doctor` / `verify` fail | Fix environment; do not bypass |
| Build Engine test red | Stop feature work; restore green |
| Capture layout script fails | Reject handoff ZIP/bundle; use pin digests |
| Urge to invent a dimension | Stop → open-data / research register |

---

## Related

- Local runtime docs: `LOCAL_SETUP.md`, `LOCAL_OPERATIONS.md`, `OFFLINE_OPERATION.md`  
- EDE: `ENVIRONMENT.md`, `docs/README.md`  
- Agents: `AGENTS.md`
