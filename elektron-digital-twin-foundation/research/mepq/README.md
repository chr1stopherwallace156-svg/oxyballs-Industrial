# Missing Evidence Procurement Queue (MEPQ)

**Decision:** `DT-D054` · **Sprint:** `RL-023`  
**Principle:** Inversion — buy/acquire evidence only when a property **cannot be safely inferred**.

## Orthogonality

| Register | Answers |
|---|---|
| **KG** | What is unknown? |
| **MISN** | What research action closes it? |
| **AJR** | May we buy this specific AID asset? |
| **MEPQ** | Which non-inferable evidence should we procure next, at what tier/ROI? |

## Active items

| ID | Priority | Status | Focus |
|---|---|---|---|
| MEPQ-001 | CRITICAL | DEFERRED | ICE CG + dry mass |
| MEPQ-002 | HIGH | DEFERRED | Trans cross-member interfaces |
| MEPQ-003 | CRITICAL | QUEUED | Firewall/cab-engine LV + CAN (EWD) |

## Deployment choice

**Option B selected** → `MISN-000006` (Mission F) LV gateway interconnect **discovery** (open questions only).  
**Option A** (Mission E ICE deconstruction) remains **deferred**; MEPQ-001/002 stay registered.

## Hard rules

- No invented pinouts, torques, CG, mass, or hole sizes.
- No false `LEVEL_4_DOCUMENTED_OEM` without hashed OEM bytes + token anchors.
- Connector IDs from operator text (e.g. `C127`) = **CANDIDATE** until EWD confirms.
