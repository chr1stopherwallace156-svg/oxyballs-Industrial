# HV Commissioning Gates — 05L / 05M Chain

**Decision:** `DT-D052`  
**Status:** `05L-B` / `05L-C` wording **CLEANED**; `05M-*` **STAGED DRAFT ONLY**  
**Authority:** Build Engine HV commissioning doctrine (EDTS twin repo mirror)

## Gate chain (do not skip)

```
05L-A  HV authorization / safety readiness
  ↓
05L-B  First live HV pre-charge observation     ← CLEANED
  ↓
05L-C  Shutdown / discharge / repeatability     ← CLEANED (must be complete before 05M)
  ↓
05M-A  Inverter enable readiness / zero-torque  ← DRAFT staged (not live-authorized)
  ↓
05M-B  No-load motor spin validation            ← STAGED outline only
  ↓
05M-C  Controlled low-speed traction readiness  ← STAGED outline only
```

**Hard staging rule:** Do **not** proceed to Gate **05M** execution until **05L-C is fully cleaned and defined** (this package). After 05L-C exit criteria are met in the Build Engine, advance only to **05M-A**, then **05M-B**, then **05M-C**.

## Control ownership partition (permanent)

| Owner | Owns |
|---|---|
| **VCU** | Requests / monitors (`HV_Enable_Request`, torque commands, mode) |
| **BMS/PDU** | Contactor coils, pre-charge execution, weld scan, retry/thermal lockouts |
| **Hardwired safety loop** | Emergency interruption of contactor/pre-charge coil supply |

VCU must never be assumed to directly own HV contactors.

## Documents

| Gate | Path | Status |
|---|---|---|
| Thresholds | [`GLOBAL_INITIAL_TARGET_PROFILE.md`](GLOBAL_INITIAL_TARGET_PROFILE.md) | Binding note |
| 05L-B | [`GATE_05L-B_PRECHARGE_OBSERVATION.md`](GATE_05L-B_PRECHARGE_OBSERVATION.md) | READY WITH MINOR WORDING CLEANUP applied |
| 05L-C | [`GATE_05L-C_SHUTDOWN_REPEATABILITY.md`](GATE_05L-C_SHUTDOWN_REPEATABILITY.md) | CORRECT NEXT HV GATE — cleaned |
| 05M-A | [`GATE_05M-A_INVERTER_ZERO_TORQUE_READINESS.md`](GATE_05M-A_INVERTER_ZERO_TORQUE_READINESS.md) | DRAFT — torque-disabled readiness only |
| 05M-B | [`GATE_05M-B_NO_LOAD_SPIN.md`](GATE_05M-B_NO_LOAD_SPIN.md) | STAGED outline — blocked until 05M-A |
| 05M-C | [`GATE_05M-C_LOW_SPEED_TRACTION.md`](GATE_05M-C_LOW_SPEED_TRACTION.md) | STAGED outline — blocked until 05M-B |
| Machine index | [`GATE_INDEX.json`](GATE_INDEX.json) | Status machine form |

## Safety posture

Gates 05L-B and 05L-C are **qualified-personnel, controlled-HV-only**. Assume HV may be energized (OSHA LOTO / electrical work-practice + NHTSA EV energized-component guidance). No road-test authority from these gates.
