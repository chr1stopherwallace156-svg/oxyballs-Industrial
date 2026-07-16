# CONFLICT_RESOLUTION_STANDARD.md — Discrepancy Handling Protocol

## Status

**Active / Architecture Material (Non-binding for current Layer 0 lock)**

## 1. Handling Discrepancies

When physical metrology scans (Tier 2) diverge from nominal OEM specifications (Tier 1), the system must never delete or overwrite either data point.

## 2. Resolution Protocol

A mathematical discrepancy is handled via this progression:

1) Log Discrepancy Node: create a joint entity listing both values:  
   `A = |X_physical - X_nominal|`

2) Evaluate Threshold:
   - If `A ≤ Allowed Manufacturing Tolerance`: resolve the claim status to `CROSS_REFERENCED` and use the nominal value for downstream alignment.

3) Evaluate Variation:
   - If `A > Tolerance`: trigger a variant/wear investigation.
   - Flag whether this variation is caused by:
     * Frame Wear / Crash Distortion
     * Aftermarket Upfit / Modification
     * Alternative Production Run

4) Isolate & Retain:
   - Preserve both values in the registry.
   - The digital representation uses the physical scan path.
   - Design logic links back to OEM nominal spec.

## 3. Relationship to this repo

This file defines procedure and vocabulary; it does not implement or alter any existing Layer 0 gate state.

