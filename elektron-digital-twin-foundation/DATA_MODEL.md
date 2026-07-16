# DATA_MODEL.md

Entities, relationships, and identifiers for the digital twin.

## Core entities

### ReferenceVehicle

The locked L00 configuration. One active instance per project version.

| Field | Type | Example (provisional) |
|-------|------|------------------------|
| `id` | string | `ref-f450-2019-rc-8ft-4x2` |
| `make` | string | Ford |
| `model` | string | F-450 Super Duty |
| `model_year` | integer | 2019 |
| `cab` | enum | Regular Cab \| SuperCab \| Crew Cab |
| `drivetrain` | enum | 4x2 \| 4x4 |
| `wheelbase_mm` | number | 3597 (141.6 in) |
| `bed` | string | 8 ft Styleside DRW |
| `body_upfit` | string | Stock pickup |
| `stock_engine` | string | 6.7L Power Stroke V8 diesel |
| `wheels_tires` | string | 19.5 in DRW steel |
| `vin` | string \| null | TBD |
| `status` | enum | provisional \| locked \| superseded |

### Component

Any discrete part or assembly in the twin.

| Field | Type | Notes |
|-------|------|-------|
| `component_id` | string | Stable ID, e.g. `oem.engine.6p7_ps` |
| `layer` | L01–L10 | Introduced at |
| `parent_id` | string \| null | Assembly hierarchy |
| `oem_part_number` | string \| null | When known |
| `name` | string | Human label |
| `category` | enum | exterior, chassis, powertrain, ev, wiring, cooling, … |
| `removable` | boolean | L04+ |
| `disassembly_order` | integer \| null | L04+ |

### GeometrySource

Provenance for dimensions or meshes.

| Field | Type | Notes |
|-------|------|-------|
| `source_id` | string | e.g. `src.ford.bblas.sd_bblb` |
| `type` | enum | oem_table, bblb, scan, photo, measurement, derived |
| `uri` | string | URL or internal path |
| `retrieved_at` | ISO date | |
| `license` | string | internal_use_only, derived_ok, … |
| `accuracy_tier_mm` | number | Per DT-D002 |

### Dimension

| Field | Type | Notes |
|-------|------|-------|
| `dimension_id` | string | |
| `component_id` | string | |
| `name` | string | e.g. `wheelbase`, `rail_web_height` |
| `value_mm` | number | Canonical storage |
| `value_display` | string | Optional inches string |
| `source_id` | string | |
| `verified` | boolean | |

### GateRecord

| Field | Type | Notes |
|-------|------|-------|
| `layer` | L00–L10 | |
| `gate` | visual \| dimensional \| structural \| interaction \| documentation | |
| `status` | pending \| in_progress \| pass \| fail \| blocked | |
| `reviewer` | string | agent or owner |
| `evidence_uri` | string \| null | |
| `notes` | string | |

## Relationships

```
ReferenceVehicle 1──* Component
Component *──* GeometrySource (via Dimension or mesh manifest)
Component 0──1 Component (parent/child tree)
Layer 1──5 GateRecord
```

## ID conventions

- Reference: `ref-{platform}-{year}-{cab}-{bed}-{drive}`
- OEM components: `oem.{subsystem}.{descriptor}`
- EV components: `ev.{subsystem}.{descriptor}`
- Sources: `src.{authority}.{document}`

## Component mapping

See [schemas/component-mapping.example.json](schemas/component-mapping.example.json) for JSON shape. Production mapping file is created at L03 completion.

## Coordinate system

- **Origin:** Center of rear axle, ground plane (shop convention — confirm at L02)
- **Axes:** +X forward, +Y left (driver side), +Z up
- **Units:** millimeters in all machine files

## State machine (reference vehicle)

```
provisional → locked (owner approval)
locked → superseded (new DT-D decision)
```

Superseding a reference invalidates gates from the lowest affected layer upward.
