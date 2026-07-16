# OPEN_QUESTIONS.md

Unresolved questions. Do not guess answers in locked fields — file here instead.

| ID | Layer | Question | Blocks | Owner action |
|----|-------|----------|--------|--------------|
| OQ-001 | L00 | **Platform lock:** Chassis cab (C1) vs F-450 pickup Regular Cab (P1) vs F-450 pickup Crew Cab (P2)? | Entire L00 | Decide — see CONFIGURATION_RECONCILIATION.md |
| OQ-002 | L00 | Does 2019 F-450 **Regular Cab pickup** at 141.6 in WB actually exist? KBB yes; OEM pickup table shows F-450 only as Crew Cab 176.0. | P1 validity | Obtain 2019 MY Ford pickup ordering guide |
| OQ-003 | L00 | If chassis cab (C1): which wheelbase/CA — 145.3/60 (shortest) or longer? | Dimension lock | Decide |
| OQ-004 | L00 | If chassis cab: what upfit body (if any) for L01 — bare chassis only or named work body? | L01 scope | Decide |
| OQ-005 | L00 | Physical reference unit (VIN) or explicit OEM-only platform reference? | Tier A verification | Assign VIN or approve OEM-only label |
| OQ-006 | L00 | 4×2 confirmed for chosen config — lock 4×4 as derivative or primary? | Driveline | Decide after platform lock |
| OQ-007 | L00 | BBAS account available for official document archive? | DT-B003 | Confirm access |
| OQ-008 | L00 | Mirror variant (standard vs tow) for locked configuration? | Exterior width | Decide at L01 |
| OQ-009 | L00 | Exact tire/wheel specification for locked configuration? | L01 wheels | OEM table or door sticker |
| OQ-010 | L02 | Confirm coordinate origin (rear axle center, ground)? | All layers | Engineer confirm |

## Resolved

| ID | Resolution | Date |
|----|------------|------|
| OQ-PICKUP-CC | Provisional spec mixes pickup (141.6 + 8 ft bed) with chassis-cab work-truck intent — **platform type must be chosen first** | 2026-07-16 |

## Superseded

| ID | Note |
|----|------|
| Former OQ-001 (F-450 vs F-150) | Superseded by OQ-001 platform reconciliation — F-150 (DT-D001-B) deferred until F-450 platform locked |
