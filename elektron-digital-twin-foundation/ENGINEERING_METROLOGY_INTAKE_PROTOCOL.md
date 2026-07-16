# ENGINEERING_METROLOGY_INTAKE_PROTOCOL.md — Structural Metrology Pipeline

## Status

**PROVISIONAL — Locked for Layer 2; blocked until physical vehicle receipt**

This protocol establishes the rigorous metrology pipeline required for heavy structural integration, chassis modifications, and safety-critical mechanical packaging.

Conformance class: MAC-A / Class A (see `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md`).

---

## 1. Equipment Requirements

| Equipment | Specification |
|---|---|
| Metrology device | Leica Absolute Tracker or equivalent laser tracker (radial accuracy less than or equal to +/- 0.015 mm at 5.0 m) |
| Tactile probe | Six-degrees-of-freedom contact probe (FaroArm or Leica T-Probe) |
| Environmental monitoring | Digital thermometer and hygrometer with NIST-traceable calibration |

---

## 2. Operational Procedure

### Step 1: Isolate and Rigidly Fixture Chassis Frame

**Duration:** 30 minutes

Drive the vehicle onto certified flat steel surface plates. Elevate the truck frame using rigid leveling jacks, keeping the frame level relative to gravity. Remove all wheels to expose the wheel hubs and spindle face configurations.

### Step 2: Register Primary and Secondary Datums

**Duration:** 45 minutes

Using the laser tracker, probe the flat top surfaces of both chassis frame rails to establish the Frame Baseline datum (DTM-FIX-001). Probe the left and right spindle hub faces to construct the Front Axle Centerline (DTM-KIN-001). Map these readings to construct the global origin point.

### Step 3: Direct Point Probing of Structural Hardpoints

**Duration:** 60 minutes

Probe critical chassis interface points, including engine mount block bosses, transmission crossmember mounting holes, suspension control arm pivot bolts, and steering gear mounts. Record each coordinate with an explicit single-sigma uncertainty metric.

---

## Related Documents

- `DATUM_CONSTRUCTION_STANDARD.md` — construction methods for DTM-FIX and DTM-KIN
- `DATUM_STATE_MODEL_PROPOSAL.md` — datum class hierarchy
- `registries/TRANSFORM_REGISTRY_V2_PROPOSAL.json` — coordinate export transforms
