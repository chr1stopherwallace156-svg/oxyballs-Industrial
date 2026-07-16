# FL Door Evidence Graph — ILLUSTRATIVE ONLY

**authority_status:** `ILLUSTRATIVE_ONLY`  
**silo:** `VEH-000001` / `CFG-000001` / `CMPINST-VEH000001-DOOR-FL`  
**sprint:** RL-010 / DT-D041

This diagram maps *intended* evidence edges. It does **not** admit torque specs, YouTube IDs, workshop sections, or CAD bytes as verified.

```text
[EDTS-COMP-FL-SHELL] (draft passport — ILLUSTRATIVE)
       │
       ├──► [OEM Part No. claim] ──────────► FL3Z-1520125-A  (CL-001 CANDIDATE)
       ├──► [Workshop Manual Section] ─────► SRC-CAND-000002 / EDTS-OEM-003
       │                                      Sec 501-14 claim — NOT_ACQUIRED
       ├──► [Torque Spec (Hinge)] ─────────► 45 Nm claim — PENDING_WORKSHOP_CONFIRMATION
       ├──► [Removal Procedure] ───────────► Narrative steps — NOT verified
       ├──► [Geometry Source] ─────────────► CAND-000043-GRAB / EDTS-COMP-CAD-001
       │                                      DISCOVERED / NOT_ACQUIRED
       └──► [Teardown Video] ──────────────► YouTube ID `d89G-f_mS01`
                                              status: NOT_CONFIRMED (Hard Rule 6)
```

## Admission rules

| Edge | Admit when |
|---|---|
| OEM PN | Local parts-catalog page hash (`SRC-CAND-000007`) + VIN filter |
| Workshop section / torque / procedure | Hashed WSM pages (`SRC-CAND-000002`) with page cites |
| Geometry | Local STEP/OBJ bytes + SHA-256 + Hard Rule 4 lifecycle |
| Media | Confirmed URL + local capture hash — never from unverified IDs alone |

Kernel passport geometry remains **`ABSENT`**.
