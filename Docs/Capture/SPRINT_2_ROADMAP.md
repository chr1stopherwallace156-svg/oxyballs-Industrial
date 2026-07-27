# Sprint 2 Roadmap — Inspection Plans (Record Only)

| Field | Value |
|---|---|
| **Status** | `2.1F IMPLEMENTED` — architecture **LOCKED**; **2.2 next** |
| **Architecture** | `Docs/Capture/SPRINT_2_1_ARCHITECTURE.md` (**LOCKED**) |
| **2.1F status** | `Docs/Capture/SPRINT_2_1F_STATUS.md` |
| **2.1F prompt** | `Docs/Capture/SPRINT_2_1F_EXECUTION_PROMPT.md` |
| **Gate** | Sprint 1.1.1 validated tag on Industrial `origin` |
| **2.0 status** | `Docs/Capture/SPRINT_2_0_STATUS.md` |
| **2.1A status** | `Docs/Capture/SPRINT_2_1A_STATUS.md` (immutable plan assignment on session) |
| **2.1B status** | `Docs/Capture/SPRINT_2_1B_STATUS.md` (versioned session envelope + store) |
| **2.1C status** | `Docs/Capture/SPRINT_2_1C_STATUS.md` (guided progression state machine) |
| **2.1D status** | `Docs/Capture/SPRINT_2_1D_STATUS.md` (evidence-to-point binding metadata) |
| **2.1E status** | `Docs/Capture/SPRINT_2_1E_STATUS.md` (guided overlay Intent–Coordinator UI) |
| **2.1E.1 status** | `Docs/Capture/SPRINT_2_1E1_STATUS.md` (evidence lifecycle + HUD polish) |
| **Progress lock** | `Docs/Capture/SPRINT_2_PROGRESS_LOCK.md` (S2-001) |
| **Snapshot hash lock** | `Docs/Capture/SPRINT_2_SNAPSHOT_HASH_LOCK.md` (S2-002) |

Do **not** begin Sprint 2 coding because the app launches. Finish formal 1.1.1 Mac validation and the validated tag first.

---

## Milestone map

```text
2.0 Foundation (plans + immutable snapshots)          ✅
        │
        ▼
2.1A–2.1E Session / progression / binding / guided HUD ✅
2.1E.1 Evidence lifecycle & HUD ergonomics             ✅
SPRINT_2_1_ARCHITECTURE.md                             🔒 LOCKED
        │
        ▼
2.1F Inspection Review · Grouped Hierarchy · Pre-Export  ✅
        │
        ▼
2.2 / 2.3 Hardening · OCC · recovery policy · evidence harness   ◄ in progress (Mac xcodebuild gate open)
        │
        ▼  STOP until Sprint 2.3 success gate COMPLETE
Phase 3  Spatial & Sensor Platform (capture + package only)
        │   Architecture v1.3.0: `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md`
        │   Normative: custody≠package bytes; dual FSMs; typed verified gateway; typed envelopes
        │   Out of scope: mesh / SfM / densification / CAD verdicts / AI segmentation
        ▼
Phases 4–8  Reconstruction · fusion · alignment · semantics     deferred
```

> Note: Earlier roadmap draft labeled “2.2 Guided Workflow (S2-001)” — core progression/UI
> intent work landed in **2.1C–2.1E**. Remaining S2-001 checklist polish may fold into 2.1F / 2.2
> hardening rather than a separate guided-workflow sprint.

---

## Sprint 2.0 — Inspection Plans (Foundation)

**Question answered:** *What inspection is this inspector supposed to perform?*

Implement (narrow scope):

- `InspectionPlan`, `InspectionPoint`
- `InspectionPlanRegistry` (seed templates; e.g. commercial intake, quick 4-point)
- immutable `InspectionPlanSnapshot` + `InspectionPlanSnapshotPayload`
- typed IDs, versioning
- definition-only `snapshotSHA256` per **S2-002** (`sha256-canonical-json-v1`); validate-before-hash; verify digest on load; `snapshotCreatedAt` metadata only
- explicit plan selection / assignment at session creation
- minimal UI only: plan selection + display of frozen plan identity

**Done when:** *This inspection uses Commercial Intake v1.2.0, and that definition will never change for this session.*

**Out of scope:** checklist UI, `InspectionPointState`, progress bars, guided camera, AR.

---

## Sprint 2.1 — Inspection Session Assignment

Wire the frozen snapshot into the session and evidence path.

```text
InspectionSession.planState: SessionPlanState
        │
        ├─ .assigned(AssignedInspectionPlan { snapshot, assignedAt })
        └─ .legacyUnassigned
```

- **2.1A (complete):** session owns immutable snapshot via `SessionPlanState` + `AssignedInspectionPlan`; registry only pre-assignment; legacy decodes as `.legacyUnassigned`. See `SPRINT_2_1A_STATUS.md`.
- **2.1B (complete):** `InspectionSessionEnvelope` (schema v1) + integrity digest + `FileInspectionSessionStore` + migration framework; legacy load without fabricate/overwrite. See `SPRINT_2_1B_STATUS.md`.
- **2.1C (complete):** singular stateless `InspectionProgressionEngine` + authoritative `InspectionProgressState` (`orderedPoints` + `activePointID`); Option A additive `v1` persistence; strictly terminal statuses; no UI/camera/evidence binding. See `SPRINT_2_1C_STATUS.md`.
- **2.1D (complete):** `EvidenceBindingService` + `EvidenceMetadata` / `EvidenceBindingCollection` on session; satisfaction derived from frozen `expectedEvidenceType`; Option A `v1`; no UI/camera/binary IO. See `SPRINT_2_1D_STATUS.md`.
- **2.1E (complete):** Intent–Coordinator guided HUD; `GuidedInspectionUIState` ephemeral; coordinator owns persistence; satisfaction-gated Next; camera warm-up untouched. See `SPRINT_2_1E_STATUS.md`.
- **2.1E.1 (complete):** replace/unbind lifecycle, reactive library, point-group preview, Retake/Replace/Delete toolbar. See `SPRINT_2_1E1_STATUS.md`.
- **Architecture (LOCKED):** `SPRINT_2_1_ARCHITECTURE.md` — UDF layers, eight invariants, Field Regression Checklist.
- **2.1F (complete):** Inspection Review tab, `PreExportValidationService`, export gates, jump-to-point. See `SPRINT_2_1F_STATUS.md`.
- **2.2 (next):** Hardening, memory/battery, interruptions, export stress. **Do not start until explicitly kicked off.**

**Still no AR.** Stop after 2.1F for Sprint **2.2 Hardening** before Phase 3.

---

## Sprint 2.2 — Hardening, Performance & Field Reliability

Inserted **after 2.1F** and **before Phase 3** (spatial/LiDAR). Do not skip.

- Memory / battery profiling under long inspection sessions
- Phone call / lock-screen / background interruption handling
- Large evidence package export stress testing
- Usability & ergonomics polish from field technician feedback
- Retain-cycle / leak audits on coordinator + capture path

---

## Historical note — former “Sprint 2.2 Guided Workflow”

Original draft (S2-001 PointState / checklist UI) was largely delivered via **2.1C progression** + **2.1E HUD**. Any remaining checklist density work is tracked under 2.1F / 2.2 hardening, not a parallel guided-workflow sprint.

---

## Later (Phase 3 — not Sprint 2)

- ARKit overlays, vehicle-aware guidance, LiDAR, quality engine, CV, EV conversion integration
- **Plan Builder**: load plans from versioned JSON so new inspection types do not require Swift changes (immutable snapshot model already anticipates this)

---

## Kickoff rule for Sprint 2.0

After the 1.1.1 validated tag exists, start **2.0 only**: domain + registry + immutable snapshots + hashing + minimal plan UI. Validate again before 2.1 evidence wiring and before Phase 3 spatial work.
