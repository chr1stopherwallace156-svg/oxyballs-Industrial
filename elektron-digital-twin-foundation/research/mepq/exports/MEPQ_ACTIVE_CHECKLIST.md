# Active MEPQ Checklist (Export)

**Decision:** `DT-D055` · **Generated:** 2026-07-20 · **Config:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Machine form:** [`MEPQ_ACTIVE_CHECKLIST.json`](MEPQ_ACTIVE_CHECKLIST.json) · **Register:** [`../MEPQ_REGISTER.json`](../MEPQ_REGISTER.json)

**Option selected:** Review/export active MEPQ (Option 2).  
**Option 1 (Mission F):** Already open as `MISN-000006` — not re-initiated.

## Summary counts

| Status | Count | IDs |
|---|---|---|
| QUEUED | 1 | MEPQ-003 |
| DEFERRED | 4 | MEPQ-001, 002, 004, 005 |
| **Total** | **5** | |

## Critical path (acquire next)

### MEPQ-003 — LV firewall / CAN gateway — **QUEUED**
- **Alias:** `MEPQ-2019-F450-ELEC-LV-003`
- **Need:** Cab-to-engine / firewall connector pinout + CAN termination architecture
- **Gap:** KG-008 · **Missions:** MISN-000006 (discovery), MISN-000003 / 000001 (EWD bytes)
- **Source tier:** Tier 1 EWD (`SRC-CAND-000006`)
- **Cost vector:** COMMERCIAL_PAYWALL
- **Forbidden:** Invented C127 pin map / ohm values

## Deferred with Mission E (registered, not authorized)

### MEPQ-001 — ICE powertrain CG + dry mass — **DEFERRED**
- **Alias:** `MEPQ-2019-F450-ICE-REM-001` · **Gap:** KG-006
- **Source:** WSM mass properties and/or physical scale

### MEPQ-002 — Transmission cross-member hole/geometry — **DEFERRED**
- **Alias:** `MEPQ-2019-F450-FRAME-INT-002` · **Gap:** KG-007
- **Source:** BAG/BBLB / OEM CAD (license)

### MEPQ-004 — Aft fuel-tank strap holes + torque — **DEFERRED** *(new DT-D055)*
- **Alias:** `MEPQ-2019-F450-DECON-006` · **Gap:** KG-009
- **Partial evidence:** 40 gal aft-of-axle tank **ASSERTION_EXTRACTED**; mount geometry **missing**
- **Source:** WSM fuel tank/lines; physical measure
- **Forbidden:** Invented M10/M12 / torque

### MEPQ-005 — Mid-chassis XMBR thickness / brackets — **DEFERRED** *(new DT-D055)*
- **Alias:** `MEPQ-2019-F450-DECON-007` · **Gap:** KG-010
- **Source:** Collision repair / BAG / WSM
- **Forbidden:** Invented sheet gauges

## Related open gaps (not MEPQ, still blocking)

| Gap | Focus | Status |
|---|---|---|
| KG-001 | FL door harness / C309 pinout | OPEN |
| KG-005 | Regulator fastener/torque | OPEN |
| KG-FS-001..005 | Mission D WSM/alignment/spring codes | OPEN (local) |

## Hard rules for this checklist

1. All numeric thresholds / torques / pinouts remain **NOT_ACQUIRED** until hashed OEM bytes + token anchors.
2. DEFERRED ≠ discarded — gaps are preserved for Mission E un-defer.
3. QUEUED items require commercial handoff before ASSERTION_EXTRACTED.
4. No procedure generation from this checklist.
