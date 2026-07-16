# DOCUMENT_STATUS_STANDARD.md — Document Lifecycle States

## Status

**Active / Architecture Material (Non-binding for current Layer 0 lock)**

## 1. Lifecycle States & Meanings

```
PROPOSAL
  |
  v
UNDER REVIEW
  |
  v
BINDING SPEC
  | \
  |  v
  | SUPERSEDED
  v
DEPRECATED
```

### State meanings

- **PROPOSAL:** Initial draft under active research. Does not bind downstream models or logic.
- **UNDER REVIEW:** Completed draft submitted for systematic reconciliation against existing claims and spatial baselines.
- **BINDING SPEC:** Formally approved specification. Downstream implementation must strictly match this document.
- **SUPERSEDED:** Retained historical documentation. It remains for history/reference but has been replaced by newer specification.
- **DEPRECATED:** Declared invalid, obsolete, or containing resolved errors. No new implementations may reference it.

## 2. Transition Rules & Change Controls

- No document can transition directly from **PROPOSAL** to **BINDING SPEC**. It must undergo formal conflict sweep in **UNDER REVIEW**.

## 3. Non-binding note for EDTS Layer 0

This standard defines states and transition rules. It does not override current project locking (e.g., `REFERENCE_CONFIGURATION_BLOCKED`) until the owner selects and approves the underlying platform.

