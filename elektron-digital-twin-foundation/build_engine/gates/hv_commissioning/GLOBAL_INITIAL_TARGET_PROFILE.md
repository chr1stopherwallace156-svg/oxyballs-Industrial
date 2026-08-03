# Global note — INITIAL_TARGET_PROFILE

**Binding for Gates 05L-B, 05L-C, and 05M-A (draft).**

All numeric thresholds appearing in these gates are **`INITIAL_TARGET_PROFILE`** values only.

Final limits require **all** of:

1. `SUPPLIER_DATA`
2. `ENGINEERING_REVIEW`
3. `LIVE_HV_TEST_PLAN_APPROVAL`
4. `BENCH/CHASSIS PROOF`

## Initial target profile values (not final limits)

| Symbol / item | Initial target | Notes |
|---|---|---|
| Contactor aux feedback window | ≤ 50 ms | Coil drive → mirror transition |
| ΔV Main Positive allow | ≤ 5% of \(V_{batt}\) | Supplier may redefine |
| Pre-charge completion | ≥ 95% \(V_{batt}\) (if used) | Supplier-defined completion threshold controls |
| Pre-charge timeout observation | 500 ms | **Final timeout = supplier-defined** |
| Discharge safe threshold | > 60 V DC remaining = fail past window | Supplier discharge window controls |
| E-stop dropout observation | ≤ 20 ms (if cited) | Compare to supplier-approved dropout target |
| Pre-charge consecutive failures before lockout | ≤ 2 | Then hard lockout |
| Nominal cycle sample size (weld FP) | 10 cycles | With thermal delays |
| Inverter watchdog / heartbeat loss | ≤ 50 ms | Supplier safe-off definition controls |
| Phase current at torque-disabled | 0 A intentional | Measurement within supplier noise floor |
| PWM / modulation | Do **not** assume 0% PWM | Supplier-defined torque-disabled state |

## Forbidden language

- Do not use “instantly” / “immediately” for contactor dropout.
- Do not require \(V_{caps} = 0.0\,\mathrm{V}\) after Main Negative alone.
- Do not require a perfect \(V_{caps}(t)=V_{batt}(1-e^{-t/RC})\) fit.
- Do not assume universal Main-Positive-first shutdown order without supplier architecture.
- Do not perform ad-hoc live HV resistance insertion for IMD tests.
