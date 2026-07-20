# CONTROLLED VEHICLE FITMENT / NO-HV INSTALLATION READINESS (Gate 05J)

The first rung of the staged post-bench gate ladder (Decision Register
D-008) for the F-450/F-550 EV conversion controls (Gate 05J, batch_52 +
owner review_49). Gate 05J is the transition from the synthetic lab bench to
the physical vehicle chassis — **the first gate where the conversion
physically touches the vehicle**. It verifies **controlled physical
installation and passive/no-HV in-chassis checks only**; it does **not**
authorize active conversion control, traction enable, live HV, vehicle
movement, or road testing (RC-229). **No high-voltage system is connected or
energized.**

**Status (owner review_50): `CONTROLLED_VEHICLE_FITMENT_DEFINED` /
`NO_HV_CONNECTED` / `NO_TRACTION_ENABLE` / `NO_VEHICLE_MOTION` /
`CAN_1_PASSIVE_ONLY` / `FORD_BASELINE_SCAN_REQUIRED` /
`FORD_POST_CONNECTION_SCAN_REQUIRED` /
`CONVERSION_ADDED_PARASITIC_DRAW_TRACKED` /
`GROUNDING_AND_SHIELDING_UNDER_REVIEW` / `NO_ROAD_TEST_AUTHORITY`.** Owner:
"the right next boundary: controlled vehicle fitment with no HV connected."
Ladder: **05J (fitment) → 05K (LV power-on, no-HV,
`GATE05K_VEHICLE_POWER_ON.md`) → 05L-A (HV first-energization authorization &
safety readiness) → 05L (HV first-energization, engineer-approved only)**
(D-008, amended review_50).

## Target-value doctrine (owner review_49, RC-232) — read first

Every value is an **`INITIAL_TARGET_PROFILE / ENGINEERING_REVIEW_REQUIRED /
FINAL_LIMIT_PENDING_SOURCE-TEST-VEHICLE-PACKAGE / NO_HV_AUTHORITY`** input,
not a rule (thirteenth artifact of the invented-values family): ≥50 mm
moving-part clearance, ≥100 mm heat-source clearance, <0.1 Ω ground bond,
≤4.0 mA conversion-added sleep current, ≤2.0 s sleep transition. The real
clearance rule depends on temperature / abrasion risk / movement envelope /
protection method.

---

## CAN_1 live-Ford connection — precondition + passive-only rule (owner review_49, RC-230)

Gate 05J is the first point the VCU CAN_1 transceiver connects to the **live
OEM Ford CAN_1 network**. Permitted **only** after:

- Gate 05H CAN_1 listen-only proof complete
- Gate 05I-C CAN_1 silence proof complete
- TXD pin monitored · no TX mailboxes allocated · silent/listen-only
  register verified · no ACK participation verified on bench

**Procedure:** run a **Ford baseline scan → connect the VCU in passive
listen-only mode → run a Ford post-connection scan → compare before/after
DTCs, network errors, and cluster warnings.** A "clean cluster" alone is not
enough — capture the baseline scan + post scan + TXD scope + CAN analyzer log
+ firmware/register dump.

**Hard rule:** the VCU may **only** connect in passive listen-only — **no
transmit path · no ACK participation · no active error frames · no wake
commands · no spoofed Ford modules.**

## Parasitic-draw measurement — separate the three (owner review_49, RC-231)

The Ford chassis has its own OEM sleep draw. Measure and log separately:

- `OEM_baseline_sleep_current` — the truck's own draw before the conversion.
- `conversion_added_sleep_current` — Elektron's addition (≤4.0 mA
  initial target).
- `total_vehicle_sleep_current` — the whole vehicle, measured against the
  OEM baseline.

Do not confuse the conversion-added draw with the whole-vehicle draw.

---

## Gate 05J verification matrix (no-HV, in-chassis)

| Test | Domain | Procedure | Target (INITIAL_TARGET_PROFILE, RC-232) | Blocked (MUST NEVER OCCUR) |
|---|---|---|---|---|
| 05J-001 | physical routing & chafing audit | trace all LV wire paths; check full-lock/suspension travel | ≥50 mm from moving parts, ≥100 mm from heat, min bend radius (initial targets; final depends on temp/abrasion/movement/protection) | wire tension on full suspension travel / contact with moving chassis parts |
| 05J-002 | ground-bond resistance | micro-ohmmeter VCU case + ground pins → primary chassis battery ground | <0.1 Ω (initial chassis-fitment target; final pending grounding architecture + instrument method + engineering review) | ground loop / R ≥ 0.1 Ω |
| 05J-003 | in-chassis parasitic draw | current clamp/ammeter at 12 V battery; sleep transition | `conversion_added_sleep_current` ≤4.0 mA (initial chassis target); `OEM_baseline_sleep_current` and `total_vehicle_sleep_current` measured + logged separately (RC-231/234); sleep within ≤2.0 s (target) | conversion-added draw above target after sleep |
| 05J-004 | CAN_1 silence (chassis verification) | **Ford baseline scan → connect VCU passive listen-only → Ford post-connection scan → compare (RC-230)**; monitor with a diagnostic scanner | zero VCU active frames / ACK / error frames on the live OEM Ford bus; no new OEM DTCs/cluster warnings vs baseline | VCU asserting dominant on Ford CAN / new Ford network DTCs or cluster errors |
| 05J-005 | LOTO verification | physical audit of all HV connection points | all HV orange connectors unplugged/capped/tagged; MSD removed + locked | uncapped HV terminals / MSD installed or unlocked |

## Gate 05J exit criteria (owner review_49)

The system cannot exit Gate 05J unless:

1. VCU, display, and LV harness are physically mounted without chafing,
   pinch points, heat exposure, or moving-part interference.
2. Grounding + shielding are verified against approved target profiles.
3. Ford baseline scan **and** post-connection scan show **no new network
   faults** caused by the passive VCU connection.
4. CAN_1 TXD pin remains inactive during all in-chassis passive monitoring.
5. Conversion-added parasitic draw is measured and within the approved
   target.
6. All HV connectors remain disconnected, capped, tagged, and locked out.
7. All logs, photos, scans, scope traces, **firmware/register dumps**,
   harness revisions, and reviewer signoffs are archived (review_50).

**Successful Gate 05J completion permits Gate 05K only**
(`GATE05K_VEHICLE_POWER_ON.md` — Low-Voltage Vehicle Power-On / No-HV
Commissioning). It does **not** authorize live HV connection · traction
enable · vehicle movement · chassis dyno · road testing · customer operation ·
compliance claims. (Never "certified safe," RC-224.)

## Standing checks

- No HV connected/energized; no traction enable; no vehicle motion; the VCU
  connects to the live OEM Ford CAN_1 **only** in passive listen-only after
  the bench proofs (RC-230); parasitic draw separated OEM/conversion/total
  (RC-231); no fitment value becomes a rule until engineering review + the
  vehicle package confirm it (RC-232); the VCU requests but does not own HV
  isolation — the hardwired loop owns physical interruption (RC-205/227;
  BQ-27).
- **Nothing ingested; nothing Confirmed; no "certified safe"/compliance
  claim; ODRs untouched.**

## Next — Gate 05K (Low-Voltage Vehicle Power-On / No-HV Commissioning)

Owner scope: ignition off · accessory · key-on/run · VCU wake · display wake
· CAN_1 passive monitoring · CAN_2/CAN_3 isolated activity · diagnostic
access · **no HV contactor activity · no torque command · no Ford DTCs** ·
parasitic draw after sleep · fault-latch behaviour in the chassis. No HV; no
traction enable; no vehicle motion. (Then Gate 05L — Controlled HV
First-Energization, engineer-approved only, D-008.)
