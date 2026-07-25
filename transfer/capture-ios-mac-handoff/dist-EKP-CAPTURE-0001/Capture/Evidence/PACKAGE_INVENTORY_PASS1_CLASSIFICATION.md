# Package inventory — Pass 1 root-cause classification

| Field | Value |
|---|---|
| Status | **CLASSIFIED** |
| Pass | 1 only |
| Contract owner | Capture-side package assembly + `CaptureSidePackageValidator` |

## Defect classes (do not conflate)

| Class | Meaning | Pass 1 finding |
|---|---|---|
| **A. Package assembly order** | Inventory written before all payload/sidecars exist | **Not the defect.** Builder enumerates the package directory **after** writing payload, manifest, device, status, and sidecars; then writes `package_inventory.json`. |
| **B. Inventory-generation scope** | Enumerator / path relativization omits real files | **Not observed on Linux fixture path.** Builder lists every regular file under the package dir except `package_inventory.json` itself. |
| **C. Inventory self-reference policy** | Whether inventory lists/hashes itself | **Contract already defined:** Phase 1 **omits** `package_inventory.json` from `entries` (self-hash exclusion). Builder throws if asked to list itself. Validator flags `INVENTORY_SELF_HASH_POLICY_VIOLATION` if self appears. |
| **D. Test / validator type bridging** | Darwin `JSONSerialization` yields `NSNumber` for `byte_size`; `as? Int` can fail → false `INVENTORY_ENTRY_INVALID` | **Confirmed Pass 1 root cause for “inventory entry invalid” style failures.** Fix: accept `Int` **or** `NSNumber`. |
| **E. Completeness assertion gap** | Validator did not flag undeclared on-disk files | **Hardening in Pass 1:** emit `INVENTORY_UNDECLARED_PATH` when an on-disk regular file (≠ inventory) is missing from `entries`. Does **not** weaken coverage. |

## Contract decision (locked for Phase 1)

1. **Completeness:** Every on-disk regular file in the package directory except `package_inventory.json` **must** appear in `entries`. Every `entries[].path` **must** exist on disk with matching `byte_size` + `sha256`.
2. **Self-hash:** `package_inventory.json` is **omitted** from `entries` (not two-pass self-hash). Documented in `Docs/Evidence/EDTS_PKG_FORMAT.md` and inventory `notes`.
3. **No silent exclusions:** Do not drop failing paths to green tests. Do not switch the byte-identity or inventory gates to object-equivalence.

## What Pass 1 changed (and did not)

| Changed | Did **not** change |
|---|---|
| Validator accepts `NSNumber`/`Int` for `byte_size` | Expected inventory file set / builder listing algorithm |
| Validator flags undeclared on-disk paths | Self-hash exclusion policy |
| Regression tests for both behaviors | Status ownership / artifact hash assertions |

## Integrity guardrail

> Passing tests is not sufficient if achieved by weakening byte-identity, inventory completeness, status ownership, or artifact-integrity assertions.
