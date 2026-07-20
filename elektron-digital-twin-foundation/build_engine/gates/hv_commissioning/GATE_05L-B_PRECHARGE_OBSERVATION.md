# Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation

**Status:** `READY_WITH_WORDING_CLEANUP_APPLIED`  
**Prerequisite:** Gate 05L-A complete  
**Next (only):** Gate 05L-C  
**Operational constraints:** Traction inverter switching **DISABLED**. Motor RPM = **0**. No vehicle movement.

See [`GLOBAL_INITIAL_TARGET_PROFILE.md`](GLOBAL_INITIAL_TARGET_PROFILE.md) — all numeric values are **INITIAL_TARGET_PROFILE** only.

## Ownership

| Role | Actor |
|---|---|
| Request / monitor | VCU (`HV_Enable_Request`, status observe) |
| Contactor + pre-charge execution | BMS/PDU |
| Emergency interruption | Hardwired safety loop |

## Pre-charge prerequisites (must exist before live 05L-B)

Documented and approved values for: \(R_{pre}\), \(E_{pulse}\), \(C_{link}\), \(V_{batt\_max}\), \(I_{peak}\), thermal recovery interval, retry limit.

## Topology rule (Main Negative first close)

**Corrected:** After Main Negative closes, there must be **no unintended DC-link rise** beyond the **approved leakage/noise threshold**. \(V_{caps}\) behavior must match **supplier-defined topology expectations**.

**Forbidden assumption:** Demanding absolute \(V_{caps} = 0.0\,\mathrm{V}\) after Main Negative alone.

## Pre-charge envelope (not a perfect RC identity)

A first-order model \(V_{caps}(t) = V_{batt}\times(1-e^{-t/RC})\) may be used for **comparison only**.

**Required:** \(V_{caps}\) rise must fall within the **supplier-approved expected pre-charge envelope** based on \(R_{pre}\), \(C_{link}\), \(V_{batt}\), measurement tolerance, leakage paths, bleeders, pack sag, sensor filtering, and BMS/PDU sampling delay.

## Verification matrix

### 05L-B-001 — Main Negative Control Sequence

| Field | Content |
|---|---|
| Request (VCU) | Broadcast `HV_Enable_Request = TRUE` (e.g. CAN_3) |
| Owner (BMS/PDU) | Validate pre-flight safety; energize Main Negative coil |
| Feedback | Poll Main Negative auxiliary mirror |
| Measured HV response | Main Negative mechanically closes. **No unintended DC-link rise** beyond approved leakage/noise threshold. \(V_{caps}\) matches supplier topology expectations. |
| Abort / failure | Aux feedback fails to transition within **INITIAL_TARGET_PROFILE ≤ 50 ms** of coil drive |
| Proof | CAN request vs feedback log; DMM/scope trace |

### 05L-B-002 — Current-Limited Pre-Charge Engagement

| Field | Content |
|---|---|
| Request (VCU) | Continue `HV_Enable_Request = TRUE` |
| Owner (BMS/PDU) | Hold Main Negative; energize Pre-Charge relay |
| Feedback | Pre-Charge aux status |
| Measured HV response | Current through \(R_{pre}\). \(V_{caps}\) rises within **supplier-approved envelope** (RC model = first-order comparison only) |
| Abort / failure | Instantaneous step to pack potential (short / stuck-closed indicator); envelope violation |
| Proof | HV differential scope of DC-link rise |

### 05L-B-003 — Delta-V Threshold Matching

| Field | Content |
|---|---|
| Request (VCU) | Maintain `HV_Enable_Request = TRUE` |
| Owner (BMS/PDU) | Monitor ΔV; when **supplier / INITIAL_TARGET_PROFILE** threshold met, command Main Positive |
| Feedback | Main Positive aux mirror |
| Measured HV response | Main Positive closes; Pre-Charge de-energized; live DC bus established |
| Abort / failure | Main Positive coil driven while ΔV condition unsatisfied (**INITIAL_TARGET_PROFILE:** ΔV > 5% of \(V_{batt}\) unless supplier differs) |
| Proof | Time-correlated \(V_{batt}\), \(V_{caps}\), Main Positive command |

### 05L-B-004 — Pre-Charge Timeout Protection

| Field | Content |
|---|---|
| Request (VCU) | `HV_Enable_Request = TRUE` |
| Owner (BMS/PDU) | Attempt pre-charge against induced bus leakage / incomplete charge condition |
| Feedback | Internal timer + \(V_{caps}\) tracking |
| Measured HV response | \(V_{caps}\) **fails to reach the supplier-defined pre-charge completion threshold before the supplier-defined timeout expires**. **Initial observation target: 500 ms. Final timeout: supplier-defined.** |
| Abort / failure (expected protective path) | BMS/PDU **aborts**, opens contactor/pre-charge outputs, logs pre-charge timeout DTC, **blocks retry** per approved retry policy |
| Proof | CAN error log with time delta + timeout DTC |

**Note:** Timeout is when elapsed time **exceeds** the limit — not when a counter “crosses ≤500 ms.”

### 05L-B-005 — Pre-Flight Contactor Weld Detection

| Field | Content |
|---|---|
| Request (VCU) | Boot / enable sequencing |
| Owner (BMS/PDU) | Pre-flight scan of aux circuits **before** any coil drive |
| Feedback | Main Positive mirror forced “Closed” (simulated weld) |
| Measured HV response | Coil drive lines remain unpowered (0.0 V on coil supply). Power-up blocked |
| Abort / failure | Any contactor coil driven while unaligned pre-power feedback asserted |
| Proof | UDS weld DTC lockout printout |

### 05L-B-006 — Passive Stored Energy Decay

| Field | Content |
|---|---|
| Request (VCU) | `HV_Enable_Request = FALSE` (normal key-off) |
| Owner (BMS/PDU) | Open Main Positive and Main Negative coils |
| Feedback | Mirror contacts open |
| Measured HV response | Contactors open; \(C_{link}\) decays via bleeders |
| Abort / failure | \(V_{caps}\) remains above safe threshold (**INITIAL_TARGET_PROFILE > 60 V DC**) past **supplier-defined** discharge window |
| Proof | Continuous HV scope of decay |

### 05L-B-007 — Manual Abort During Pre-Charge

| Field | Content |
|---|---|
| Request (VCU) | `HV_Enable_Request = TRUE`; pre-charge active |
| Owner | BMS/PDU cycling pre-charge; **E-stop depressed** |
| Response | **Hardwired safety loop interrupts contactor/pre-charge coil supply.** Dropout timing is **measured** and compared to **supplier-approved dropout target**. **No automatic retry is permitted.** |
| Blocked / failure conditions | • Automatic retry occurs after manual E-stop • Dropout timing exceeds supplier-approved target • Contactor/pre-charge coil supply remains energized after E-stop |
| Proof | Scope of control-line drop; HV bus decay; E-stop timestamp |

## Exit criteria (all required)

1. Pre-charge rise stays within supplier-approved envelope (no erratic steps / zero-resistance jumps).
2. Main Positive closure locked out until ΔV / completion condition verified by BMS/PDU.
3. Timeout path aborts, isolates pack, logs DTC, enforces retry policy.
4. Weld pre-flight blocks coil drive on unaligned feedback.
5. Manual abort: hardware-driven dropout within supplier-approved timing; **no auto-retry**.
6. Logs, scope captures, and approvals archived.

**Authorization:** Exit 05L-B → **Gate 05L-C only**. Not 05M.
