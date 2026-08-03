# Inventory undeclared-path failures — classification

| Field | Value |
|---|---|
| Status | **CLASSIFIED + FIXED** |
| Defect class | **relative-path derivation defect** (macOS path aliasing / URL canonicalization of the package root) |
| Not | inventory decode defect, package-root missing, test expectation defect, contract defect |

## Evidence

Mac reported 8 failures in a single test (`testPackageBuildInventoryAndExtension`), one per discovered file, including `package_inventory.json`. That pattern means the undeclared loop compared **absolute** discovery strings against **relative** inventory keys:

1. Inventory decode still produced relative entries (`manifest.json`, …) — early `paths.contains("manifest.json")` can pass while the loop fails.
2. The old discovery path used string prefix-strip of `root.path` / `standardizedFileURL.path` **without** `resolvingSymlinksInPath()`.
3. On macOS, `FileManager.temporaryDirectory` is often `/var/folders/...` while enumerated URLs surface as `/private/var/folders/...` (symlink). Prefix strip fails → relative key remains absolute → every `Set.contains` misses, including inventory (because `f != "package_inventory.json"` no longer filters).
4. Linux reproduction: symlink-aliased package root + resolved file path → naive strip stays absolute; `PackageRelativePath.key` returns `manifest.json`.

## Fix

Shared `PackageRelativePath.key(for:packageRoot:)` (symlink-resolved, standardized, package-relative) used by:

- `EvidencePackageBuilder` (inventory listing)
- `CaptureSidePackageValidator` (undeclared-path scan)
- `ZipPackageWriter` (entry names)
- the inventory completeness test

Contract unchanged: inventory still omits `package_inventory.json`; completeness still required.
