# L1_EXTERIOR_OBJECT_HIERARCHY.md — Assembly Tree

## Status

**SUPERSEDED for ongoing work by `L1_EXTERIOR_OBJECT_HIERARCHY_V2_PROPOSAL.md`**

Retained as V1 audit trail. Locked configuration: 2019 F-450 Chassis Cab Reg Cab 4x2 DRW 145.3/60.

Parent-child tree for transform inheritance (wheels, doors, etc.). Front axle type remains **CONFIGURATION_UNRESOLVED** (see `L1_CONFIGURATION_CONFLICT_REGISTER.json` CNF-001).
```text
ROOT_VEHICLE
├── CHASSIS_FRAME_SYSTEM (Main structural C-channel rails, 34-inch outer width — PROVISIONAL)
│   ├── FRONT_SUSPENSION_SYSTEM
│   │   ├── FRONT_AXLE_ASSEMBLY (RESEARCH_REQUIRED: monobeam vs twin-I-beam for 4x2)
│   │   │   ├── WHEEL_ASSEMBLY_FRONT_LEFT
│   │   │   └── WHEEL_ASSEMBLY_FRONT_RIGHT
│   ├── REAR_SUSPENSION_SYSTEM
│   │   └── REAR_AXLE_DANA_S110 (PROVISIONAL — confirm axle tag at intake)
│   │       ├── WHEEL_ASSEMBLY_REAR_LEFT_INNER
│   │       ├── WHEEL_ASSEMBLY_REAR_LEFT_OUTER
│   │       ├── WHEEL_ASSEMBLY_REAR_RIGHT_INNER
│   │       └── WHEEL_ASSEMBLY_REAR_RIGHT_OUTER
│   └── REAR_BUMPER_TEMPORARY (Shipping/transport bumper bar — see open questions)
└── CAB_BODY_SYSTEM
    ├── HOOD_ASSEMBLY
    ├── FRONT_FENDER_LEFT (With F-450 wide-track flare extension)
    ├── FRONT_FENDER_RIGHT (With F-450 wide-track flare extension)
    ├── FRONT_GRILLE_ASSEMBLY
    ├── FRONT_BUMPER_STEEL
    ├── CAB_DOOR_LEFT
    │   └── SIDE_MIRROR_LEFT (Trailer tow mirror — type RESEARCH_REQUIRED)
    ├── CAB_DOOR_RIGHT
    │   └── SIDE_MIRROR_RIGHT (Trailer tow mirror — type RESEARCH_REQUIRED)
    ├── CAB_GLASS_GREEN_TINT (Windshield, side glass, rear backlite)
    └── CAB_LIGHTING_SYSTEM
        ├── HEADLIGHT_ASSEMBLY_LEFT
        ├── HEADLIGHT_ASSEMBLY_RIGHT
        └── CAB_ROOF_CLEARANCE_LIGHTS (5-piece amber marker set)
```

## Coordinate Frame

All object pivots declared in `EDTS_ISO_ALIGNED_VEHICLE_FRAME` unless otherwise noted.
