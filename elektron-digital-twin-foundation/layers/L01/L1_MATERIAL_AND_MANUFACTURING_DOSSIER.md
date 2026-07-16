# L1 Material and Manufacturing Dossier

**Status:** `DRAFT — RESEARCH NOTES`  
**Purpose:** correct material shader classes and physical surface finishes for future PBR work  
**Does not authorize:** texture production

---

## Material Visual Identification Map (conceptual)

```
          [Cab: Gloss Paint/Alum]     [Frame: Semi-Gloss Powdercoat]
                     |                      |
                 __/_|______               /
                |   _|_     |_____________/
                |  /   \    |=============| <-- [C-Channel Steel Texture]
                |__\___/____|  O       O  |
                  /             \     /
       [ABS Molded Flare]      [Polished Cast Aluminum Hub]
```

## 1. Material Class Specs

### CAB-PAINT-GLOSS

- Type: automotive clearcoat on aluminum
- Visual: base color coat + highly reflective glossy clear finish
- Roughness (research target): 0.02 – 0.05
- Metalness: 0.0 (dielectric clearcoat layer)

### FRAME-POWDERCOAT-SATIN

- Type: semi-gloss electrostatic powder-coated structural steel
- Visual: micro-textured, low-luster black surface
- Roughness (research target): 0.45 – 0.55
- Metalness: 0.8 (underlying metal with thick protective coating — shader approximation pending validation)

### PLASTIC-MOLDED-MOLD-IN-COLOR (MIC)

- Type: textured polypropylene / ABS blend
- Uses: fender flares, mirror housings, cowl panels
- Visual: fine pebble grain, non-reflective dark gray/black
- Roughness (research target): 0.75 – 0.85
- Metalness: 0.0

## 2. Additional Classes to Define Later

| Class ID | Likely use | Status |
|---|---|---|
| GLASS-LAMINATED-SOLAR | windshield | DRAFT |
| GLASS-TEMPERED-CLEAR | side / backlite | DRAFT |
| RUBBER-EPDM-MATTE | gaskets / weatherstrips | DRAFT |
| CHROME-MIRROR | hub ornaments / select trim | DRAFT |
| CAST-IRON-MACHINED | axle housing | DRAFT |

## 3. Binding Rule

Roughness / metalness ranges above are research targets for shader authors. They are not measured BRDF data and must not be labeled VERIFIED until material measurement or approved look-dev signoff exists.
