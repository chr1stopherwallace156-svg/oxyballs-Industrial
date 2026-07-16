# MATERIAL_STANDARD.md — L00 Exterior Material Standards (Research Baseline)

Rule: No generic descriptions. Tie each material to how it exists on the 2019 F‑450 Regular Cab DRW pickup. Mark gaps clearly.

## Automotive paint (Ford fleet colors)
- Real material: OEM multi‑layer basecoat/clearcoat
- Manufacturing: Electrocoat + primer + base + clear (Ford truck line)
- Visual: metallic/solid variants; orange‑peel micro‑roughness
- PBR: baseColor, metallicRoughness (low roughness on clear), clearcoat (if supported)
- Geometry: panel curvature must be accurate; no fake bevels on panel gaps
- Common mistakes: mirror‑perfect reflections; panel gaps painted as black textures
- Examples/evidence: RESEARCH_REQUIRED (2019 Super Duty paint system references)

## Automotive glass (windshield/side/rear)
- Real: Laminated windshield; tempered side/rear
- Manufacturing: OEM glazing with DOT marks
- Visual: slight green/blue tint; specular highlights; edge frit
- PBR: low roughness; thin transmission; normal‑mapped frit band
- Geometry: true curvature per cab; glass thickness ≈ UNVERIFIED (measure)
- Examples: RESEARCH_REQUIRED (Super Duty glazing specs)

## Rubber (tires, seals)
- Tires: DRW commercial tires; tread/model UNVERIFIED
- Seals: EPDM door and window weatherstrips; cross‑section UNVERIFIED
- PBR: mid roughness; subtle anisotropy on sidewall text if baked

## Plastics (bumpers, grille, trim)
- Likely TPO/ABS blends; texture: fine stipple
- PBR: higher roughness; minimal metallic
- Evidence: RESEARCH_REQUIRED (part numbers for 2019 XL trim)

## Metals (steel, aluminum)
- Body: Aluminum body panels on F‑Series (verify for F‑450 pickup 2019)
- Frame: High‑strength steel (verify spec)
- PBR: roughness varies by finish; avoid chrome unless part confirmed

## Lighting assemblies
- Headlamp: Housing + lens with internal reflectors; exact lamp family UNVERIFIED
- PBR: clear lens with transmission; internal reflector metallic
- Evidence: RESEARCH_REQUIRED (2019 XL headlamp assembly ID)

Each subsection requires OEM part references or on‑vehicle photos before L01 authoring.

