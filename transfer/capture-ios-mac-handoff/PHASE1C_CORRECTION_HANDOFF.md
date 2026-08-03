# Phase 1C — Freeze-prep (Commit A / Tag A isolation)

**Status:** `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE`

This tip is **Phase 1 only** — no `Specifications/`, no `Research/`.

| Field | Value |
|------|---------|
| Freeze-prep branch | `cursor/phase1c-freeze-commit-a-d881` |
| Tip | `c3dea9f8164704c8323d2c539133283bad4d6a18` |
| Parent Phase 1 baseline | `88d9a9b` |
| ZIP SHA-256 | `eb2603f1e6a47f0b62ad988397a9385c20711d49539d3eb01e93b98f82f3afb3` |
| Bundle SHA-256 | `ccf2494adc83237c6a823634a990cf1341e4eaeff5c773903612d6965dedf753` |

## Operator sequence

1. Clone **bundle**; run equivalence `diff -u` vs validated 89/0 ZIP  
2. Fill `PHASE_1C_FINAL_VALIDATION.md` with real `sw_vers` / `devicectl` / digests / evidence paths  
3. **Commit A** — validation doc only → tag `v1.0.0-phase1c` → push → confirm remote  
4. **Commit B** — apply Specs 1–3 from staging branch `cursor/phase1c-evidence-library-d881` (`a0b8299052743cb9fdaac970f9417800d6113aef`)  
5. Specs 4–6 + IR-0001 spike = after Commit B (already drafted on staging tip — do not put in freeze tag)

See `Docs/Capture/PHASE_1C_FREEZE_COMMIT_SEPARATION.md`.
