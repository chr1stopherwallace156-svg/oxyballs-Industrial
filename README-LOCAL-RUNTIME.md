# Elektron — Local Runtime & Recovery Package (RC1)

A self-contained, offline-first copy of Elektron you run on your own Mac. GitHub
stays version control and backup only.

> **Status: RC1 (release candidate) — not final.** The Build Engine, its tests,
> Platform 001 generation, and the digital-twin *validation* were built and verified
> **on Linux**. macOS execution (Apple Silicon / Intel) has **not** been run from the
> build environment. Your first `Verify Elektron.command` on the Mac is the
> acceptance test. This package does not approve, certify, or claim safety of any
> conversion. It is built from repository commit `42efa8c` (branch), which adds the
> non-destructive Platform 001 fix on top of `main` `b232de1`.

## Start here

1. **Unzip anywhere** (location doesn't matter).
2. Double-click **`Install Elektron.command`** (if Gatekeeper blocks it: right-click → **Open** → **Open**).
3. Double-click **`Verify Elektron.command`** — look for **`OUTCOME: FULL_PASS`**.
4. Double-click **`Generate Platform 001.command`** → `engine/output/platform-001/build-package.md`.

## Explicit outcomes (no more vague "all passed")

Install and Verify print one of:

- **FULL_PASS** — Build Engine + integrity + digital-twin validation all passed.
- **PASS_WITH_WARNINGS** — engine passed; something non-fatal was flagged (e.g. twin validation issue).
- **BUILD_ENGINE_ONLY** — engine + integrity passed; digital-twin not run (needs Python 3.11).
- **FAIL** — a required check or an integrity check failed.

## What's inside

`engine/` (Build Engine) · `elektron-digital-twin-foundation/` (EDTS Kernel —
schemas + data + Python **validation** tooling, **not** a 3D app) · `docs/` ·
`scripts/` + `*.command` launchers · `vendor/` (offline npm cache + Python wheels +
hash-lock) · `.local/` (your data/logs/backups; gitignored) · `index.html`.

## Documentation

`LOCAL_SETUP.md` · `LOCAL_OPERATIONS.md` · `OFFLINE_OPERATION.md` ·
`BACKUP_AND_RECOVERY.md` · `GENERATED_ARTIFACTS.md`.

## Integrity

`IMMUTABLE_PAYLOAD_CHECKSUMS.sha256` covers the source/scripts/docs/vendor and is
**verified before anything runs**. Generated outputs, the database, logs, caches,
and validation results are intentionally excluded (they change by design) — see
`GENERATED_ARTIFACTS.md`.

## Honesty notes

- The Build Engine + Platform 001 generation run **fully offline** after install.
- **Non-destructive:** no launcher deletes the database. Regeneration clears only the
  prior Platform-001 package rows in the engine, FK-safe, inside one transaction.
- The interactive 3D digital twin **does not exist yet**; the twin is validation code + data.
- Supported: macOS (Apple Silicon / Intel) **with Python 3.11**, and Linux x86_64.
  **Windows is not supported.**
