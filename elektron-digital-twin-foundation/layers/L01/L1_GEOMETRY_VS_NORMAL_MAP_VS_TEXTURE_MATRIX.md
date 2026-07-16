# L1 Geometry vs Normal Map vs Texture Matrix

**Status:** `DRAFT`  
**Purpose:** allocate exterior detail between true 3D geometry, normal maps, and textures for future production efficiency  
**Does not authorize:** mesh or map production

---

## 1. Allocation Strategy

```
      3D Geometry Model              Normal / Texture Map

        [ Frame C-Channel ]             [ Frame Part Stampings ]
        [ Hex Head Bolt Pods ]          [ Bolt Thread Spirals ]
        [ Wheel Hub Chrome Plating ]    [ Brushed Metal Micro-lines ]
```

## 2. Detail Map

| Component / Feature | Allocation Class | Rationale |
|---|---|---|
| Main C-channel profile | GEOMETRY | Structural frame edge visible from multiple angles; defines silhouette |
| Front wheel hub chrome nuts | GEOMETRY | Distinct silhouettes and reflections from profile views |
| Wheel lug threads | NORMAL_MAP | Extremely fine; geometry would waste performance |
| Cab rib stamping creases | GEOMETRY | Large shadow detail on cab back wall |
| Fender flare attachment screws | TEXTURE_AND_NORMAL | Tiny repetitive fasteners along inner wheel-well edge |
| Chassis component labels | TEXTURE_ONLY | Flat warning plates / chassis decals |

## 3. Allocation Classes (controlled vocabulary)

| Class | Meaning |
|---|---|
| GEOMETRY | Must exist as mesh silhouette / shadow caster |
| NORMAL_MAP | Surface micro-detail without topology cost |
| TEXTURE_ONLY | Color / print / flat markings |
| TEXTURE_AND_NORMAL | Combined map stack for small fasteners / grain |
| GEOMETRY_AND_NORMAL | Macro form as mesh + micro surface as normals |

## 4. Future Binding

When L01 geometry production is authorized, object registry `detail_distribution` fields must match this matrix. Conflicts open a decision record; do not silently diverge.
