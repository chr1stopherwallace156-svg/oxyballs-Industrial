# CAN / CONTROLS / CLUSTER INTEGRATION (Gate 05)

The controls-integration record for the F-450/F-550 EV conversion (Gate
05, started batch_33 + owner review_30). Gate 08C tells you *what* signals
and faults matter; Gate 05 maps *how* those signals are communicated
through the VCU, BMS, inverter, ABS/ESC, cluster, and service tools.

**Status (owner review_31): `STARTED` / `LISTEN_ONLY_RESEARCH` /
`AUTHORIZED_CHANNELS_ONLY` / `NO_FACTORY_SAFETY_BUS_TRANSMIT` /
`NO_IMMOBILIZER_OR_SECURITY_BYPASS` / `NO_PROPRIETARY_DBC_ASSUMPTIONS`.**

---

## Authorized-integration doctrine (owner review_30) — RC-136 (SAFETY-CRITICAL)

Gate 05 operates in the **authorized, listen-only** lane. This is the same
class of rule as the standing PATS prohibition — the program never frames
work as defeating a Ford safety or anti-theft system.

**ALLOWED:**
- authorized Ford-compatible integration
- **listen-only** data capture / logging
- public / authorized **J1939 / OBD-II** data
- Ford Pro **upfitter interface documentation** (BBLB, upfitter manuals —
  CS-05 BBAS portal)
- **supplier-provided BMS / inverter DBC files**

**BLOCKED (NoGo):**
- proprietary-DBC **assumptions** (guessing Ford's internal arbitration IDs)
- **anti-theft bypass** of any kind (never "PATS bypass/override")
- **fake / spoofed ABS/ESC messages**
- **transmitting onto factory Ford safety buses without approval**
- any "vehicle reverse-engineering" framing that implies defeating safety
  or immobilizer systems

> The batch's ledger row "Factory Ford proprietary CAN DBC arbitration IDs
> via Vehicle Reverse Engineering Group / signal sniffing" is corrected to
> **"Authorized Ford-compatible CAN / controls interface documentation"**,
> status **NeedsAuthorizedSource** (BQ-25). Ford Pro's upfitter portal is
> the right official path.

## Candidate network topology (RC-137 — listen-only candidate)

A split, gateway-isolated architecture between the factory Ford backbone
and the conversion powertrain, with the VCU gateway **reading** the Ford
side and **owning** the EV side. **No transmit onto Ford safety buses
without OEM/upfitter authorization.**

```
[FACTORY FORD BACKBONE]                         [CONVERSION EV POWERTRAIN]
 Ford Chassis CAN (500k) ──┐                 ┌──► EV Traction Inverter loop (500k)
                           │                 │
 Ford Body Builder CAN ────┼─► [VCU GATEWAY]─┼──► EV BMS loop (500k)
                           │    (router)     │
 Ford Comfort/Cab CAN ─────┘                 └──► EV Aux monitoring loop (250k J1939)
```

**Candidate channel matrix (listen-only capture targets — all
`NeedsAuthorizedSource`, none verified):**

| Ch | Bus (candidate) | Rate / proto | Listen-only capture targets |
|---|---|---|---|
| CAN_0 | Ford secondary chassis | 500 k / std | wheel-speed, accelerator-pedal position, brake-switch state |
| CAN_1 | Ford upfitter gateway | 500 k / std | dashboard warning bytes, ignition state, engine-speed-request feedback |
| CAN_2 | EV drivetrain (owned) | 500 k / CAN-FD | inverter torque feedback, voltage/current loops, diagnostic error arrays |
| CAN_3 | EV battery (owned) | 500 k / std | min/max cell voltage, thermistor arrays, contactor-state flags |

The channel names, bit rates, and source-address allocations are
**Hunter-drafted candidates**, not verified Ford values — every Ford-side
ID/rate is `NeedsAuthorizedSource` (official upfitter docs or supplier
DBC). The 0xEF/0x22 "diagnostic tool" slots are for **listening**, not
injecting.

## J1939 listen-only signal candidates (RC-140 — NOT confirmed)

Ford Pro's upfit integration provides vehicle data in **J1939** format for
equipped vehicles, so an authorized upfitter/J1939 *research path* is
reasonable — but the specific PGNs, byte/bit maps, buses, and rates below
are **candidates**, not verified Ford values. Each is
**`J1939SignalCandidate / NeedsOfficialFordUIMSource / ListenOnlyCandidate
/ NoTransmitAuthority`** until official Ford/UIM documentation proves the
exact mapping (Gate 05A source-backed signal registry).

| Candidate PGN / source | Candidate byte/bit | Candidate content | Status |
|---|---|---|---|
| PGN 61444 (EEC1) | bytes 3–4 | engine speed | J1939SignalCandidate / NeedsOfficialFordUIMSource |
| PGN 61443 (EEC2) | byte 2 | accelerator-pedal position | J1939SignalCandidate / NeedsOfficialFordUIMSource (**see accel-pedal caution**) |
| PGN 65265 (CCVS) | bytes 2–3 | wheel-based vehicle speed | J1939SignalCandidate / NeedsOfficialFordUIMSource |
| Ford UIM status | byte 0, bit 2 | ignition-key position | J1939SignalCandidate / NeedsOfficialFordUIMSource |
| CAN_1 body-builder bus | — | 500 kbps J1939 frame | NeedsOfficialFordUIMSource |

**Accelerator-pedal caution (RC-141):** the batch's "accelerator pedal →
scaled **directly** into the EV inverter torque loop" is **too strong**.
Corrected: *the accel-pedal signal, if available through an authorized
source, may only **inform** a VCU torque-demand model. The final torque
command requires pedal-plausibility checks, brake-override logic, fault
handling, and controls-engineer review.* Never drive inverter torque
directly from an unverified Ford signal.

## Transmit rule + VCU boundary (RC-142 — owner review_31)

- **Receive/listen first.** Authorized VCU **receive/listen** logic is the
  starting point. **Transmit behaviour stays BLOCKED** until Ford/UIM
  documentation explicitly allows the exact **message, bus, address, and
  use case.**
- **VCU boundary (stricter):** the VCU may **read** authorized
  vehicle-state signals; it may **command only conversion-side
  components** unless Ford documentation explicitly permits otherwise;
  the **factory safety modules remain authoritative** for ABS/ESC/brake
  warnings.

### Upfitter-gateway isolation (candidate architecture)

```
[FORD BASE VEHICLE NETWORK]  ABS · ESC · PCM (authoritative)
        │
[PHYSICAL ISOLATION GATEWAY]  Ford Pro UIM connector ◄── safe-lane boundary
        │
[AUTHORIZED INTERFACE BUS]  CAN_1 body-builder bus (listen-only deck)
        │
   [CENTRAL VCU GATEWAY]  processes allowed messages only (read authorized;
        │                 command conversion-side only)
[CONVERSION CORES]  CAN_2 EV inverter loop · CAN_3 EV BMS loop (owned)
```

Conversion controls interact **solely through factory-designated upfitter
channels** — no unfiltered access to core powertrain/safety paths.

## Gate 05 deep-dive scope (owner review_22, standing)

Ford Super Duty CAN architecture; BCM / instrument-cluster / ABS-traction-
stability dependencies; PCM-removal risks; upfitter interface module
limits; J1939 gateway options; EV inverter/BMS J1939 integration; DTC
behavior; **immobilizer-safe serviceable architecture**; warning-lamp
strategy; post-conversion scan-tool / service requirements. Forum posts =
LeadOnly; Ford/OEM/service docs preferred; **no OEM-compatibility claim**;
nothing Confirmed.

## Cross-links

- Driver-warning strings from the FMEA registry are
  `DriverWarningCandidate / NeedsControlsIntegration` (RC-121) — Gate 05
  is where they get real Ford controls integration.
- FM-14 (CAN loss) safe-state + timeout are `NeedsControlsArchitecture`
  (RC-129) — resolved here + by supplier data.
