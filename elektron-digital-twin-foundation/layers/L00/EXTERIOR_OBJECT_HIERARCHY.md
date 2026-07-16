# EXTERIOR_OBJECT_HIERARCHY.md — L00 Object Tree (Draft)

Permanent IDs assigned at L01; here we define scope and structure only.

Vehicle (VEHICLE_ROOT)\n
├─ Cab (CAB_ASM)\n
│  ├─ Door_L (CAB_DOOR_L)\n
│  │  ├─ Window_L (CAB_WINDOW_L)\n
│  │  ├─ Mirror_L (CAB_MIRROR_L)\n
│  │  └─ Handle_L (CAB_HANDLE_L)\n
│  ├─ Door_R (CAB_DOOR_R)\n
│  │  ├─ Window_R (CAB_WINDOW_R)\n
│  │  ├─ Mirror_R (CAB_MIRROR_R)\n
│  │  └─ Handle_R (CAB_HANDLE_R)\n
│  ├─ Windshield (CAB_GLASS_F)\n
│  ├─ RearGlass (CAB_GLASS_R)\n
│  └─ InteriorShell (CAB_INT_SHELL)\n
├─ Hood (HOOD_ASM)\n
├─ Fender_L (FENDER_L)\n
├─ Fender_R (FENDER_R)\n
├─ Grille (GRILLE_ASM)\n
├─ Headlamp_L (LAMP_F_L)\n
├─ Headlamp_R (LAMP_F_R)\n
├─ Bumper_Front (BUMP_F)\n
├─ Bed_8ft (BED_ASM)\n
│  ├─ Taillamp_L (LAMP_R_L)\n
│  ├─ Taillamp_R (LAMP_R_R)\n
│  └─ Bumper_Rear (BUMP_R)\n
├─ Wheel_FL (WHL_FL)\n
├─ Wheel_FR (WHL_FR)\n
├─ Wheel_RL (WHL_RL)\n
├─ Wheel_RR (WHL_RR)\n
└─ DRW_Extra (WHL_RL_INNER, WHL_RR_INNER)\n

Notes:\n
- Mirror type (standard vs tow) UNVERIFIED — decide at L01 start.\n
- DRW requires inner/outer wheel/tire instances each side.\n
- Pivots at logical hinges/mounts; identifiers frozen at L01 gate.\n

