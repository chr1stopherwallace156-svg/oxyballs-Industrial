# assets/

Derived 3D assets and manifests for the digital twin.

## Rules

- **No Ford BBAS CAD** in this directory (see DT-D003).
- Raw scans (`.las`, `.ply`) live in private storage; only derived glTF may appear here after review.
- Each asset requires a manifest with `source_ids`, `accuracy_tier`, and checksum.

## Structure (created as layers progress)

```
assets/
├── manifests/
├── L01/
├── L02/
...
└── L10/
```

## Status

Empty — assets begin at L01 after L00 lock.
