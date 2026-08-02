# SOURCE-BACKED SIGNAL REGISTRY (Gate 05A)

The signal registry for the F-450/F-550 EV conversion controls (Gate 05A,
batch_35 + owner review_32). Every signal carries its source document,
bus/channel, protocol, PGN/ID, byte/bit map, direction, allowed/blocked
use, verification status, and proof artifact.

**Status (owner review_33): `SIGNAL_REGISTRY_STARTED` /
`UNVERIFIED_STAGE` / `LISTEN_ONLY_RESEARCH` / `NO_ACTIVE_TRANSMISSIONS` /
`NO_FACTORY_SAFETY_BUS_CONTROL` / `NO_PROPRIETARY_DBC_ASSUMPTIONS`.**

> **Transmit-config re-correction (review_33 — RC-148):** the ledger line
> "unlocks custom VCU configurations on the body-builder bus" is corrected
> **again** to: *unlocks authorized **receive/listen-only** VCU awareness
> from the body-builder bus; transmit behaviour remains **blocked** unless
> official Ford documentation explicitly allows the exact message,
> address, timing, bus, and use case.* (Recurrence of the RC-142/144
> transmit rule.)

**Strict compliance directive:** under unverified conditions **no PGN,
byte offset, or bit map is treated as confirmed**, and all structures stay
decoupled from safety-bus control routing until **official upfitter
network manuals** are appended.

---

## DBC reality (owner review_32 — RC-144)

- **Ford factory systems:** Ford may **not** provide a clean full
  proprietary DBC. Do not depend on a "Certified Ford proprietary DBC."
  Treat Ford-side signals as **`AuthorizedSourcePending / ListenOnly
  Candidate / NoTransmitAuthority`**; the realistic authorized inputs are
  Ford UIM documentation, J1939 source mapping, and Ford Pro upfitter
  docs.
- **EV / conversion-side systems (owned):** DBCs are realistic and
  ours — **BMS DBC, inverter DBC, VCU internal message map, DC-DC DBC,
  charger DBC.** These live on the isolated CAN_2 / CAN_3 loops.
- **"Authorized Ford UIM / J1939 Signal Documentation" unlocks:**
  listen-only signal registry, receive-only VCU state awareness,
  authorized upfitter interface mapping. **Transmit remains BLOCKED**
  unless Ford documentation explicitly allows the exact **message, bus,
  address, timing, and use case** (RC-142).

## Signal registry (batch_35 — all UnverifiedStage)

### Ford-side (public J1939 candidates — listen-only, no control authority)

*Label: `Public/Standard J1939 Candidate` · `UnverifiedStage /
NeedsExactStandardText / NeedsVehicleCapture` · `Listen-Only` · `No
control authority`. These may **inform** the VCU model but must NOT
directly command torque, braking, pre-charge, or safety behaviour until
proven (RC-140/145).*

| # | Signal | Source (candidate) | Bus | PGN/ID (candidate) | Byte/bit | Allowed use | Blocked use |
|---|---|---|---|---|---|---|---|
| S1 | `E_Wheel_Speed_Flanks_Raw` | public SAE J1939-71 | CAN_1 (BB gateway) | PGN 65215 (EWS1) | Unverified (pending DBC) | secondary speed-tracking comparison in sim | injecting fake wheel-slip; feeding functional-safety traction loops |
| S2 | `E_Accel_Pedal_Pos_Pct` | public SAE J1939-71 | CAN_1 | PGN 61443 (EEC2) | Unverified | **compare driver-demand trend in simulation** (RC-146) | **direct inverter torque command, physical torque arbitration, road-test torque control** |
| S3 | `E_Brake_Switch_Discrete` | public SAE J1939-71 | CAN_1 | PGN 61441 (EBC1) | Unverified | **simulation-only regen-decay logic study** (RC-146) | **physical regen disable, braking validation, or safety control without confirmed source + debounce + brake-engineer review** |
| S4 | `E_Ignition_State_Discrete` | Ford Pro upfitter electrical guidelines (framework only) | CAN_1 (BB port) | Unverified (pending Ford UIM) | Unverified | pre-charge sequence coordination logic in virtual models | controlling HV main-coil closure commands |

### EV/conversion-side (owned, isolated loops)

*The VCU may control conversion-side systems on CAN_2/CAN_3; it must NOT
transmit into Ford ABS/ESC/anti-theft/safety buses.*

| # | Signal | Source | Bus | ID | Direction | Allowed use | Blocked use |
|---|---|---|---|---|---|---|---|
| S5 | `M_EV_Torque_Command_Nm` | conversion inverter integration manual | CAN_2 (isolated EV inverter) | via inverter DBC | Receive/Transmit **within the isolated loop only** | internal traction-inverter loop modeling | forwarding commands onto factory Ford chassis components |
| S6 | `M_BMS_Pack_SOC_Pct` | conversion BMS interface guidelines | CAN_3 (isolated EV battery) | via BMS DBC | Receive **within the isolated loop only** | cabin state estimation / performance-tracking sim | HV contactor physical disconnect commands |
| S7 | `M_Inverter_Rpm` | inverter DBC | CAN_2 | via inverter DBC | Receive | VCU state-machine machine-speed input | — |
| S8 | `M_BMS_Pack_Volt` | BMS DBC | CAN_3 | via BMS DBC | Receive | VCU input-voltage monitoring | HV contactor commands |
| S9 | `M_BMS_Pack_Current` | BMS DBC | CAN_3 | via BMS DBC | Receive | VCU energy-consumption trend | — |
| S10 | `M_DCDC_Temp` | DC-DC DBC | LV supervisor | via DC-DC DBC | Receive | VCU LV thermal-trend monitoring | — |
| S11 | `M_CHG_Plug_Connected` | charger DBC | charger loop | via charger DBC | Receive | alert VCU to isolate HV during charging | — |

**Proof artifacts** (per signal): passive network-capture text exports
(no transceiver ACK) for the Ford-side listen-only rows; component/BMS
emulator code-map exports for the EV-side rows — all
`UnverifiedStage` until an authorized source + a real vehicle capture
prove them.

## Cross-links

- Gate 05 doctrine + topology: `docs/status/GATE05_CONTROLS.md`
  (RC-136/137/140/141/142).
- Accel-pedal never drives inverter torque directly (RC-141/146); the
  final torque command needs pedal plausibility + brake override + fault
  handling + controls-engineer review.

## Next — Gate 05B (Controls Dependency Map)

Map: Ford-side signals needed · EV-side signals needed · VCU decisions ·
driver warnings · fault states · what is receive-only · what is
transmit-only on the EV side · what is completely blocked.
