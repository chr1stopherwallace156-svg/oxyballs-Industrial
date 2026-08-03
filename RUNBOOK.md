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

Exact clone URL (canonical GitHub location):

```bash
git clone https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial.git
cd oxyballs-Industrial

./scripts/setup.sh
# or
npm run setup

./scripts/doctor.sh
# EDE namespaced doctor (workstation):
npm run ede:doctor

./scripts/verify.sh
```

Where a package lockfile exists, prefer **`npm ci`** over `npm install` for reproducible installs.

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
npm ci
npm test
npm run platform001:generate   # produces DRAFT_INCOMPLETE package artifacts
cd ..
```

Expect: tests green; Platform 001 remains **DRAFT_INCOMPLETE** — not an approval.

---

## 3. Visible Progress (provisional 3D)

```bash
cd edts-visible-progress
npm ci
npm run dev
```

Open the local URL printed by Vite. Treat renders as **provisional**, not twin truth.

---

## 4. VIN resolver (candidates only)

```bash
cd edts-vin-resolver
npm ci
npm run vin -- 1HTKHPVK8KH805188
```

Outputs configuration **candidates**, not geometry-verified twins.

---

## 5. Capture iOS (Mac / device)

Industrial delivers Capture as **versioned handoff artifacts**, not an in-tree app folder.

```bash
# Prefer a versioned DOWNLOAD + matching .sha256 — never a mutable "latest" alias
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-<name>.zip.sha256

# Or restore from transfer/capture-ios-mac-handoff/ pin-named .bundle
cd transfer/capture-ios-mac-handoff
# follow README historical / pin sections for the tip you intend
git clone <pin>.bundle elektron-capture-ios
cd elektron-capture-ios
./Scripts/verify-xcode-handoff.sh   # expect HANDOFF_LAYOUT_OK when script present
swift test                          # Linux/cloud may run package tests; xcodebuild needs Mac
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

Confirmed open path for Mac operators in this Industrial handoff set:  
`Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj`  
(Do not treat an unverified `.xcworkspace` path as authoritative from this runbook.)

Device Capture & Export proof is an **operator gate** — cloud agents cannot close it.  
Until Mac `xcodebuild` + device gates pass:  
`CAPTURE_APP_VALIDATED_STAGE_1_EXECUTION = PENDING_MAC_XCODEBUILD_AND_DEVICE_GATE`.

Capture produces **sealed, hash-bound evidence packages**. Digests verify content identity; repository/custody controls enforce immutability.

---

## 6. EDTS foundation

```bash
cd elektron-digital-twin-foundation
# Read README + layer docs; follow foundation verification instructions for the layer you are on
python3 verification/run_kernel_validation.py
```

Kernel is validated/frozen; active research layer is **L01 Exterior**. Do not claim geometry freeze without the foundation’s own acceptance criteria.

---

## 7. Reference pilot (Stage 1 — manual)

When running the first physical vehicle:

1. Read [`Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md`](Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md)  
2. Use identities: `vehicle_id=VEH-000001`, `pilot_id=PILOT-000001`, `current_stage=STAGE_1_EVIDENCE_ONLY`  
3. Execute **manual Stage 1 only** (photos + metadata + digests under custody)  
4. Meet expanded Stage 1 exit criteria in that document  

`MANUAL_STAGE_1_EVIDENCE_PILOT = AUTHORIZED`  
`CAPTURE_APP_VALIDATED_STAGE_1_EXECUTION = PENDING_MAC_XCODEBUILD_AND_DEVICE_GATE`

---

## Failure doctrine

| Symptom | Action |
|---|---|
| `doctor` / `verify` fail | Fix environment; do not bypass |
| Build Engine test red | Stop feature work; restore green |
| Capture layout script fails | Reject handoff ZIP/bundle; use pin digests |
| Urge to invent a dimension | Stop → open-data / research register |
| Urge to use `*-latest.zip` | Stop → use versioned `DOWNLOAD-*` + `.sha256` |

---

## Related

- Local runtime docs: `LOCAL_SETUP.md`, `LOCAL_OPERATIONS.md`, `OFFLINE_OPERATION.md`  
- EDE: `ENVIRONMENT.md`, `docs/README.md`  
- Agents: `AGENTS.md`
