# Active MEPQ Checklist (Export)

**Decision:** `DT-D056` · **Protocol:** [Three-Layer Separation](../../graph_layers/THREE_LAYER_SEPARATION_PROTOCOL.md)  
**Machine form:** [`MEPQ_ACTIVE_CHECKLIST.json`](MEPQ_ACTIVE_CHECKLIST.json)

**Option 2 selected:** Mission D Layer 1 focus.  
**Option 1:** Mission F already open (`MISN-000006`).

## Counts

| Status | Count | IDs |
|---|---|---|
| QUEUED | 1 | MEPQ-003 |
| DEFERRED | 6 | MEPQ-001, 002, 004, 005, 006, 007 |
| **Total** | **7** | |

## QUEUED (acquire next)

| ID | Focus | Layer need | Missions |
|---|---|---|---|
| **MEPQ-003** | Firewall LV + CAN | L1 after EWD | MISN-000006 / 000003 / 000001 |

## DEFERRED (Mission E / aft battery path)

| ID | Alias | Focus |
|---|---|---|
| MEPQ-001 | ICE-REM-001 | Powertrain CG + dry mass |
| MEPQ-002 | FRAME-INT-002 | Trans XMBR geometry |
| MEPQ-004 | DECON-006 | Fuel strap holes + torque |
| MEPQ-005 | DECON-007 | Mid XMBR thickness |
| MEPQ-006 | METROLOGY-008 | Aft hole tolerances / flatness / edge distance |
| MEPQ-007 | LOADS-009 | Frame dynamic loads / torsion / jounce-rebound |

## Layer rule

MEPQ closes **L1 UNKNOWNs** (or OEM load inputs for L2). It does **not** promote L2 estimates or L3 proposals into truth.
