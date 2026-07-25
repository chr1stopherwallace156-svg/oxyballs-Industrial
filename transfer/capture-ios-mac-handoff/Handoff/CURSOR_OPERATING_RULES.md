# CURSOR_OPERATING_RULES.md

| Field | Value |
|---|---|
| Status | **APPROVED** (Phase 0 governance) |
| Version | 0.1.2 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-25 |
| Applies To | All work in this repository |
| Supersedes | 0.1.1 operating rules |

These rules are non-negotiable. They implement the **ELEKTRON CAPTURE iOS — FOUNDATIONAL IMPLEMENTATION CONTRACT**.

---

## Changelog and handoff completion (mandatory)

Official rule: [`Docs/Governance/CHANGELOG_AND_HANDOFF_GOVERNANCE.md`](Docs/Governance/CHANGELOG_AND_HANDOFF_GOVERNANCE.md)

```text
NO CHANGE WITHOUT CHANGELOG
NO COMPLETION WITHOUT HANDOFF
NO HANDOFF WITHOUT VERIFIED HASHES
NO RELEASE WITHOUT AUTHORITATIVE TAG
```

```text
CODE_OR_SPEC_COMPLETE
+ TESTS_COMPLETE
+ EVIDENCE_COMPLETE
+ CHANGELOG_COMPLETE
+ CHANGE_RECORD_COMPLETE
+ HANDOFF_REFRESHED
+ HANDOFF_HASHES_VERIFIED
= IMPLEMENTATION_COMPLETE
```

Until all pass: `IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF`.

```bash
make handoff
make handoff-verify
```

No PR/commit series is marked complete without both. Detailed records live under
`Docs/Changes/CHANGE-XXXX.md`. Handoff history: `Docs/Handoffs/HANDOFF_HISTORY.md`.

---

## Project identity

This is an **engineering evidence acquisition subsystem** for EDTS — not a generic camera, AR demo, scanner, or consumer photogrammetry app.

It must remain independently runnable and integrate later through versioned contracts with **no architectural rewrite**.

Primary capture platform: **controlled iPhone (Apple-native)**. Android references may inform algorithms/UX only; they do **not** define production architecture.

---

## Governing hierarchy (never reverse)

```
Physical observation
  → Captured evidence
  → Structured evidence record
  → Human or deterministic verification
  → Engineering claim
  → Build Engine decision
```

The app records observations. It must **not** silently turn estimates into engineering facts.

---

## System boundaries

**Owns:** guided capture; AVFoundation image/video; ARKit pose; depth when available; calibration metadata; Core Motion; technician guidance; local quality; original + derived artifacts; manifests; hashes; App Attest / Secure Enclave hooks; offline storage; upload prep; recovery; completeness reporting.

**Does not own:** conversion authorization; design approval; structural adequacy; axle compliance; safety verdicts; replacing physical metrology; final engineering confidence; mutating EDTS claims; Build Engine policy; inventing missing measurements; treating ARKit/LiDAR as certified metrology.

**Forbidden local claims:** `BUILD_AUTHORIZED`, `STRUCTURALLY_APPROVED`, `DESIGN_SAFE`, `VEHICLE_COMPLIANT`.

**Forbidden coupling:** direct EDTS/Build Engine databases; importing Build Engine source; undocumented shared folders.

---

## Layering

```
UI (SwiftUI)
  → Application Services
  → Domain Models (Elektron-owned)
  → Capture / Spatial / Motion / Security adapters
  → Local Storage + API Clients
```

- Business rules must not live only in SwiftUI views.
- `ARFrame`, `AVCapturePhoto`, `CMDeviceMotion` must convert to Elektron domain types before leaving adapters.
- EDTS depends on **contracts**, not Apple object formats.

---

## Evidence authority classes

Every value must carry an authority class, at least:

`RAW_OBSERVATION` · `DEVICE_REPORTED` · `GUIDANCE_ESTIMATE` · `ALGORITHM_ESTIMATE` · `PHYSICAL_REFERENCE` · `FIELD_VALIDATED` · `ENGINEERING_VERIFIED` · `REJECTED` · `UNKNOWN`

No automatic promotion from estimate → engineering-verified.

ARKit / LiDAR default to **GUIDANCE_ESTIMATE**.

---

## Original vs derived (immutable originals)

Never overwrite originals (photos, video, depth, metadata, motion, calibration, original manifests).

Derivatives must record: parent hash(es), processing operation, algorithm version, parameters, derived hash.

---

## Uncertainty

Measurements, poses, calibration, and derived geometry must support uncertainty. If unknown: `uncertainty_status = UNKNOWN`. Never invent a tolerance.

---

## Metrology language

Do not claim millimeter / metrology / survey / certified / regulator-approved / structurally verified accuracy unless a documented validation procedure exists for the exact device, workflow, environment, distance, target, and software version.

Prefer: estimated, guidance-grade, device-reported, unvalidated, field-validated.

---

## Approved device

v1 targets one controlled LiDAR-equipped iPhone Pro profile. Unsupported devices refuse engineering capture or enter labeled demo mode.

Do not use permanent hardware identifiers. Use: Elektron installation ID + attested app key ID + approved-device enrollment.

---

## Apple-native stack (production path)

Swift, SwiftUI, AVFoundation, ARKit, RealityKit (where appropriate), Core Motion, Core Image, Accelerate, Metal (justified), CryptoKit, Security, App Attest / DeviceCheck, URLSession, SwiftData or SQLite.

External libraries require documented purpose, license, maintenance, why Apple is insufficient, security/data impact, removal strategy.

---

## Capture session state machine

Explicit states only (no scattered Booleans). Transitions must be logged. See `Docs/Architecture/CAPTURE_SESSION_STATE_MACHINE.md`.

---

## Integration

Path A: portable evidence package. Path B: versioned capture API. Never direct DB.

Mocks must be labeled. Do not claim `EDTS_COMPATIBLE` while mock-only.

---

## Required invariants (always)

1. Every artifact belongs to a capture session.  
2. Every session references vehicle identity or records identity unresolved.  
3. Every derivative references ≥1 parent.  
4. Every sealed artifact has a hash.  
5. Sealed artifacts are never overwritten.  
6. Every pose declares source and target frames.  
7. Every measurement declares unit and authority.  
8. Estimates are distinguishable from verified evidence.  
9. Every schema is versioned.  
10. Uploads are retry-safe (no duplicate authoritative records).  
11. Every override has actor + reason.  
12. Build authorization never originates here.  
13. Unknown remains unknown.  
14. Originals are never replaced by derivatives.  
15. Historical evidence remains interpretable after updates.

---

## Cursor change protocol

Before modifying code: inspect repo; read governing docs; identify phase; identify contracts; inspect tests; state assumptions; avoid unrelated rewrites.

For every substantial change report: Objective · Files inspected · Files changed · Architecture affected · Schema affected · Migration required · Evidence implications · Security implications · Tests · Known limitations · Integration impact.

If a change conflicts with an **APPROVED** rule or contract: **stop**, propose a documented amendment, do not silently implement.

When uncertain use: `UNKNOWN` · `UNVERIFIED` · `RESEARCH_REQUIRED` · `VALIDATION_REQUIRED` · `DECISION_REQUIRED`.

---

## Current phase

**Phase 0 — Foundation** (contracts, domain, schemas, mocks, golden package).  

Do **not** begin full production AVFoundation / ARKit / LiDAR workflows until Phase 0 review is complete and Phase 1 is authorized.
