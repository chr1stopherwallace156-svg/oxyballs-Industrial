# Decision Log — Industrial (Phase 3 Sprint 3.0 pointers)

Append-only pointers to Capture ADRs delivered in
`DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip`
(`Docs/Decisions/` inside the Capture tree). Industrial Decision Register
entry **D-018** records industrial-facing acceptance.

Do not treat this file as a substitute for the Capture Decision Log bytes
inside the versioned ZIP.

---

## P3-001 — Capture custody vocabulary vs EDTS PACKAGE_QUARANTINED

| Field | Value |
|---|---|
| Decision ID | **P3-001** |
| ADR | `Docs/Decisions/ADR-P3-001-CAPTURE-CUSTODY-VS-EDTS-QUARANTINE.md` |
| Chosen | Capture `EVIDENCE_CUSTODY_QUARANTINED`; never emit EDTS `PACKAGE_QUARANTINED` |

---

## P3-002 — PACKAGED vs .edts-pkg

| Field | Value |
|---|---|
| Decision ID | **P3-002** |
| ADR | `Docs/Decisions/ADR-P3-002-PACKAGED-VS-EDTS-PKG.md` |
| Chosen | PACKAGED = spatial boundary event; `.edts-pkg` remains Phase 1 transport |

---

## P3-003 — Session / vehicle / package binding

| Field | Value |
|---|---|
| Decision ID | **P3-003** |
| ADR | `Docs/Decisions/ADR-P3-003-SESSION-VEHICLE-PACKAGE-BINDING.md` |
| Chosen | Manifest binds vehicle_id + capture_session_id + package_id; envelope v1 unchanged |

---

## P3-004 — Custody OCC

| Field | Value |
|---|---|
| Decision ID | **P3-004** |
| ADR | `Docs/Decisions/ADR-P3-004-CUSTODY-OCC.md` |
| Chosen | Separate custody revision plane; side-effect-free stale reject; bytes immutable |

---

## P3-005 — Verified handle issuance

| Field | Value |
|---|---|
| Decision ID | **P3-005** |
| ADR | `Docs/Decisions/ADR-P3-005-VERIFIED-HANDLE-ISSUANCE.md` |
| Chosen | Capture custody store issues handles only when VERIFIED/ARCHIVED |

---

## P3-006 — Spatial schema compatibility

| Field | Value |
|---|---|
| Decision ID | **P3-006** |
| ADR | `Docs/Decisions/ADR-P3-006-SPATIAL-SCHEMA-COMPATIBILITY.md` |
| Chosen | Distinct spatial schemas; additive ClockDomain.synthetic_deterministic; fail closed |
