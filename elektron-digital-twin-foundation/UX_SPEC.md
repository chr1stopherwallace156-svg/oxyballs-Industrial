# UX_SPEC.md

User experience specification for the digital twin (primarily L10; conventions start L04).

## Personas

| Persona | Primary layers | Goal |
|---------|----------------|------|
| Engineer | L02–L07 | Verify clearances and interfaces |
| Technician | L04, L08 | Follow disassembly/install order |
| Fleet buyer | L10 | Visual confidence in conversion |
| Owner/QA | L00, L08 | Provenance and approval |

## Presentation modes (L10)

### Mode 1 — Full vehicle

Default fleet-facing view. LOD1. Stock or completed EV appearance toggle.

### Mode 2 — Powertrain removed

Shows empty engine bay and frame after L04 sequence. Highlights conversion zone.

### Mode 3 — EV install preview

OEM removed; L05–L07 assemblies visible. Tier B clearances optionally shown as volumes.

### Mode 4 — Dimension inspect

Click-to-measure between named anchors (wheelbase, rail width, bay length). Values show source tag.

## Interaction conventions (L04+)

- **Select:** Click part → highlight + metadata panel (component_id, layer, removable)
- **Disassemble:** Step forward/back through ordered sequence; undo restores assembly
- **Explode:** Slider for educational explode (non-destructive; separate from disassembly truth)
- **Layer visibility:** Toggle L01–L07 groups independently

## Visual language

| Element | Treatment |
|---------|-------------|
| OEM parts | Neutral gray / OEM-approximate paint |
| Removed OEM | Ghosted or hidden per step |
| EV parts | Elektron electric blue accent (#3B9EFF) |
| Tier A mounts | Highlight on inspect mode |
| HV routing | Orange conduit per shop standard (L07) |
| Unverified geometry | Hatch pattern or badge |

## Accessibility

- Keyboard navigation for disassembly steps
- High-contrast mode for shop floor tablets (L10)
- No color-only critical status — use icon + label

## Out of scope v1

- VR/XR
- Multi-user collaborative edit
- Customer VIN-specific configuration

## Approval

UX changes affecting reference lock or dimensional display require owner review.
