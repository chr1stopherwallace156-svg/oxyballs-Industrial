# Phase 1 Inventory Validation Failure — Evidence Report

| Field | Value |
|---|---|
| Status | **CLASSIFIED + FIXED** |
| Capture tip (fix) | `7b9d118af7bb61583cf279b1f70afd202c327ba9` |
| Capture tip (diag cleanup + regressions) | see HEAD after this commit |
| Host for preserved dumps | Linux cloud (symlink-alias reproduction of macOS `/var`↔`/private/var` class) |

> Path normalization was treated as a **hypothesis** until the printed declared/discovered sets below were captured. Fix applied only after classification.

---

## Decision gate — classification

**Exactly one class:** `relative-path derivation defect`  
(with macOS `/var` vs `/private/var` symlink aliasing as the mechanism that breaks string prefix-strip)

### Ruled out with evidence

| Hypothesis | Why ruled out |
|---|---|
| inventory decode defect / empty declaration set | Preserved dump: `declaration_set_empty = false`, `decoded_inventory_entries = 7`, declared keys listed (`manifest.json`, …). Also: test asserts `paths.contains("manifest.json")` **before** the undeclared loop — Mac failures at the loop imply decode already succeeded. |
| inventory schema/key mismatch | Declared field is `path` (same as validator). Keys are package-relative filenames matching contract. |
| package-root defect (missing dir) | Package root exists; 8 regular files discovered; inventory + status readable. |
| test expectation defect | Expectations match Phase 1 completeness + self-hash omit (`EDTS_PKG_FORMAT.md`, Pass 1 classification). |
| package contract defect | No contract change required; inventory contents already correct. |
| declaration-set construction defect | Set non-empty with 7 relative entries. |

### Supporting evidence for chosen class

1. Mac: **8 failures in one test** = one undeclared assert per discovered file, including `package_inventory.json` → discovery keys were **not** equal to `"package_inventory.json"` (filter bypassed) → leftover **absolute** strings.
2. Old code: `standardizedFileURL.path` prefix-strip **without** `resolvingSymlinksInPath()`.
3. Linux reproduction: alias root path ≠ symlink-resolved file path → naive strip leaves absolute path; `PackageRelativePath.key` yields `manifest.json`.
4. Preserved dump after fix under aliased work root: `raw_ne_resolved=true`, `relative_key=manifest.json`, `FIRST_UNDECLARED=<none>`, `declared_empty=false`.

---

## Preserved diagnostic output (INV_DIAG block)

```text
=== INV_DIAG testPackageBuildInventoryAndExtension ===
INV_DIAG classification_hypothesis = relative-path derivation defect (symlink aliasing)
INV_DIAG package_root.raw = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001
INV_DIAG package_root.standardized = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001
INV_DIAG package_root.symlink_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001
INV_DIAG package_root.absoluteString = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/
INV_DIAG macos_path_aliasing raw_has_/var/=false raw_has_/private/var/=false resolved_has_/private/var/=false raw_ne_resolved=true
INV_DIAG comparison_key = PackageRelativePath.key (symlink-resolved package-relative)
INV_DIAG discovered_count = 8
INV_DIAG decoded_inventory_entries = 7
INV_DIAG normalized_declared_paths = 7
INV_DIAG declaration_set_empty = false
INV_DIAG disk[0].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/manifest.json
INV_DIAG disk[0].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/manifest.json
INV_DIAG disk[0].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/manifest.json
INV_DIAG disk[0].relative_naive_prefix_strip = manifest.json
INV_DIAG disk[0].relative_standardized_prefix_strip = manifest.json
INV_DIAG disk[0].relative_key = manifest.json
INV_DIAG disk[0].naive_broke=false key_absolute=false
INV_DIAG disk[1].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/package_inventory.json
INV_DIAG disk[1].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/package_inventory.json
INV_DIAG disk[1].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/package_inventory.json
INV_DIAG disk[1].relative_naive_prefix_strip = package_inventory.json
INV_DIAG disk[1].relative_standardized_prefix_strip = package_inventory.json
INV_DIAG disk[1].relative_key = package_inventory.json
INV_DIAG disk[1].naive_broke=false key_absolute=false
INV_DIAG disk[2].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/capture_device.json
INV_DIAG disk[2].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/capture_device.json
INV_DIAG disk[2].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/capture_device.json
INV_DIAG disk[2].relative_naive_prefix_strip = capture_device.json
INV_DIAG disk[2].relative_standardized_prefix_strip = capture_device.json
INV_DIAG disk[2].relative_key = capture_device.json
INV_DIAG disk[2].naive_broke=false key_absolute=false
INV_DIAG disk[3].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/package_status.json
INV_DIAG disk[3].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/package_status.json
INV_DIAG disk[3].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/package_status.json
INV_DIAG disk[3].relative_naive_prefix_strip = package_status.json
INV_DIAG disk[3].relative_standardized_prefix_strip = package_status.json
INV_DIAG disk[3].relative_key = package_status.json
INV_DIAG disk[3].naive_broke=false key_absolute=false
INV_DIAG disk[4].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/payload/artifact_original.jpg
INV_DIAG disk[4].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/payload/artifact_original.jpg
INV_DIAG disk[4].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/payload/artifact_original.jpg
INV_DIAG disk[4].relative_naive_prefix_strip = payload/artifact_original.jpg
INV_DIAG disk[4].relative_standardized_prefix_strip = payload/artifact_
original.jpg
INV_DIAG disk[4].relative_key = payload/artifact_original.jpg
INV_DIAG disk[4].naive_broke=false key_absolute=false
INV_DIAG disk[5].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/sidecars/camera_calibration.json
INV_DIAG disk[5].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/sidecars/camera_calibration.json
INV_DIAG disk[5].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/sidecars/camera_calibration.json
INV_DIAG disk[5].relative_naive_prefix_strip = sidecars/camera_calibration.json
INV_DIAG disk[5].relative_standardized_prefix_strip = sidecars/camera_calibration.json
INV_DIAG disk[5].relative_key = sidecars/camera_calibration.json
INV_DIAG disk[5].naive_broke=false key_absolute=false
INV_DIAG disk[6].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/sidecars/motion_orientation.json
INV_DIAG disk[6].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/sidecars/motion_orientation.json
INV_DIAG disk[6].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/sidecars/motion_orientation.json
INV_DIAG disk[6].relative_naive_prefix_strip = sidecars/motion_orientation.json
INV_DIAG disk[6].relative_standardized_prefix_strip = sidecars/motion_orientation.json
INV_DIAG disk[6].relative_key = sidecars/motion_orientation.json
INV_DIAG disk[6].naive_broke=false key_absolute=false
INV_DIAG disk[7].absolute_url = file:///tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/sidecars/avcapture_metadata.json
INV_DIAG disk[7].absolute_path = /tmp/phase1-alias-2A76248D-D1B8-4919-BBF0-76034BA42622/EVD-TEST-PKG-001/sidecars/avcapture_metadata.json
INV_DIAG disk[7].absolute_resolved = /tmp/phase1-tests-EE931D7C-E6FE-475D-815F-73EB5DE623D5/EVD-TEST-PKG-001/sidecars/avcapture_metadata.json
INV_DIAG disk[7].relative_naive_prefix_strip = sidecars/avcapture_metadata.json
INV_DIAG disk[7].relative_standardized_prefix_strip = sidecars/avcapture_metadata.json
INV_DIAG disk[7].relative_key = sidecars/avcapture_metadata.json
INV_DIAG disk[7].naive_broke=false key_absolute=false
INV_DIAG declared[0].raw = capture_device.json
INV_DIAG declared[0].normalized = capture_device.json
INV_DIAG declared[1].raw = manifest.json
INV_DIAG declared[1].normalized = manifest.json
INV_DIAG declared[2].raw = package_status.json
INV_DIAG declared[2].normalized = package_status.json
INV_DIAG declared[3].raw = payload/artifact_original.jpg
INV_DIAG declared[3].normalized = payload/artifact_original.jpg
INV_DIAG declared[4].raw = sidecars/avcapture_metadata.json
INV_DIAG declared[4].normalized = sidecars/avcapture_metadata.json
INV_DIAG declared[5].raw = sidecars/camera_calibration.json
INV_DIAG declared[5].normalized = sidecars/camera_calibration.json
INV_DIAG declared[6].raw = sidecars/motion_orientation.json
INV_DIAG declared[6].normalized = sidecars/motion_orientation.json
INV_DIAG lookup key=manifest.json paths.contains=true naive=manifest.json naive.contains=true
INV_DIAG lookup key=capture_device.json paths.contains=true naive=capture_device.json naive.contains=true
INV_DIAG lookup key=package_status.json paths.contains=true naive=package_status.json naive.contains=true
INV_DIAG lookup key=payload/artifact_original.jpg paths.contains=true naive=payload/artifact_original.jpg naive.contains=true
INV_DIAG lookup key=sidecars/camera_calibration.json paths.contains=true naive=sidecars/camera_calibration.json naive.contains=true
INV_DIAG lookup key=sidecars/motion_orientation.json paths.contains=true naive=sidecars/motion_orientation.json naive.contains=true
INV_DIAG lookup key=sidecars/avcapture_metadata.json paths.contains=true naive=sidecars/avcapture_metadata.json naive.contains=true
INV_DIAG FIRST_UNDECLARED = <none>
=== INV_DIAG END ===
```

## Debug-facility sample (`EDTS_INV_PATH_DIAG=1`)

```text
Test Case 'Phase1RuntimeTests.testPackageBuildInventoryAndExtension' started at 2026-07-24 23:55:00.374
INV_VAL_DIAG package_root.raw=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001
INV_VAL_DIAG package_root.standardized=/tmp/phase1-tests-539F0CC7-9E29-4A29-81E9-8CB39EBDABE3/EVD-TEST-PKG-001
INV_VAL_DIAG package_root.symlink_resolved=/tmp/phase1-tests-539F0CC7-9E29-4A29-81E9-8CB39EBDABE3/EVD-TEST-PKG-001
INV_VAL_DIAG alias raw_has_/var/=false resolved_has_/private/var/=false raw_ne_resolved=true
INV_VAL_DIAG counts discovered_pending entries=7 declared=7 declared_empty=false
INV_VAL_DIAG declared=capture_device.json
INV_VAL_DIAG declared=manifest.json
INV_VAL_DIAG declared=package_status.json
INV_VAL_DIAG declared=payload/artifact_original.jpg
INV_VAL_DIAG declared=sidecars/avcapture_metadata.json
INV_VAL_DIAG declared=sidecars/camera_calibration.json
INV_VAL_DIAG declared=sidecars/motion_orientation.json
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/manifest.json relative_key=manifest.json
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/package_inventory.json relative_key=package_inventory.json
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/capture_device.json relative_key=capture_device.json
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/package_status.json relative_key=package_status.json
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/payload/artifact_original.jpg relative_key=payload/artifact_original.jpg
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/sidecars/camera_calibration.json relative_key=sidecars/camera_calibration.json
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/sidecars/motion_orientation.json relative_key=sidecars/motion_orientation.json
INV_VAL_DIAG disk.absolute=/tmp/phase1-alias-D7ABAACD-3742-43F0-A8DF-1F2D8C47724E/EVD-TEST-PKG-001/sidecars/avcapture_metadata.json relative_key=sidecars/avcapture_metadata.json
Test Case 'Phase1RuntimeTests.testPackageBuildInventoryAndExtension' passed (0.025 seconds)
Test Suite 'Phase1RuntimeTests' passed at 2026-07-24 23:55:00.399
Test Suite 'Selected tests' passed at 2026-07-24 23:55:00.399

```

---

## Comparison type (final)

- Declared keys: relative strings from inventory JSON `entries[].path`
- Discovered keys: `PackageRelativePath.key` = symlink-resolved + standardized **package-relative** string
- Membership: `Set<String>.contains` on those relative keys
- Not: absolute string compare, URL equality, temp-dir prefix compare

---

## Fix summary

Shared `PackageRelativePath.key(for:packageRoot:)` used by builder, validator, ZIP writer, and inventory test.

Temporary always-on `INV_DIAG` prints removed. Optional validator dumps remain behind `EDTS_INV_PATH_DIAG=1`.
