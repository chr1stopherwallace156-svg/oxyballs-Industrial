# generated/ — derived presentation artifacts (DO NOT EDIT BY HAND)

Files in this directory are **generated presentation output**, not source.

- **Canonical source:** [`../ELEK-QUAL-STD-0000.md`](../ELEK-QUAL-STD-0000.md)
- **Generator:** `scripts/generate_standards_html.py` (deterministic, stdlib-only)
- **This file:** `ELEK-QUAL-STD-0000.html` — a self-contained, offline-viewable HTML
  rendering (all CSS inline; opens in any browser, no sign-in). It stamps the canonical
  source path, document ID + version, and the source commit SHA, and carries a
  "DERIVED — DO NOT EDIT" notice.

Rules:

- Do **not** treat anything here as authoritative (`authoritative: false` in
  `../document-metadata.json`).
- Do **not** hand-edit these files. Change the Markdown master, then regenerate:
  `make standards-generate`.
- Regeneration is **byte-reproducible**: `make standards-verify` (check 11) rebuilds
  the HTML from the current master + metadata and byte-compares it against the
  checked-in file. A hand-edit here, or a master edit committed without regenerating,
  fails the gate.

> The `v1.0` in the document ID is the **authored** target; the governing lifecycle
> state is **CONTROLLED_BASELINE / v0.1.0 / PENDING_VALIDATION** (see the master banner
> and `../HANDOFF.md`). The Markdown master always wins.
