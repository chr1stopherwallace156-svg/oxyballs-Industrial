# VIN_AND_LABEL_CAPTURE_PROTOCOL.md — Physical Asset Label Capture

## Status

**PROPOSAL**

This protocol establishes the physical data capture rules to ensure all critical baseline parameters are extracted directly from the physical vehicle upon delivery, preventing nominal document assumptions from overwriting real-world asset configurations.

**Related schemas:** `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA.json`

---

## Step 1: Establish Visual Record of the Safety Certification Label

**Duration:** 5 minutes

1. Locate the Safety Certification Label on the driver-side B-pillar or the rear edge of the driver's door.
2. Clean the surface using a dry microfibre cloth to prevent light reflection issues.
3. Take a high-resolution photograph normal to the label plane using a prime lens (no perspective distortion).

---

## Step 2: Extract and Log Core Certification Fields

**Duration:** 10 minutes

1. Manually transcribe the VIN, Gross Vehicle Weight Rating (GVWR), Front Gross Axle Weight Rating (FGAWR), and Rear Gross Axle Weight Rating (RGAWR).
2. Record these parameters directly into the physical intake schema file.
3. Take secondary photos of the axle housing tag (Dana S110 identification plaque) and any spring-pack tags.

---

## Step 3: Conduct Tire and Wheel Verification

**Duration:** 10 minutes

1. Read and photograph the tire placard (usually adjacent to the safety label).
2. Record the tire size, load index, speed rating, and recommended cold inflation pressures.
3. Measure and record the actual cold tire inflation pressure on all six tires using a calibrated digital pressure gauge (precision ± 0.1 psi).

---

## Step 4: Document Pre-Intake Ride Height States

**Duration:** 15 minutes

1. With the vehicle parked on a level surface plate, measure the distance from the wheel hub center vertically upward to the bottom edge of the metal fender lip or frame flange reference point on all four wheel positions.
2. Record these as-found ride heights to establish the baseline suspension deflection state.

---

## Resolution Targets

This protocol resolves items in:

- `L00_UNRESOLVED_REGISTER.json` — UNRES-001, UNRES-002
- `L00_FINAL_GAP_REPORT.md` — GAP-001 through GAP-004
