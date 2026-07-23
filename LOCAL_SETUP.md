# LOCAL SETUP

## Requirements (once)

- **macOS** (Apple Silicon or Intel).
- **Node.js ≥ 22.5.0** — https://nodejs.org or `brew install node`.
- **Git** — `xcode-select --install`.
- **Python 3.11** — only for the digital-twin validation; the Build Engine does not
  need Python. The bundled wheels are **CPython 3.11**; other versions skip the twin
  offline. The installer detects 3.11 explicitly and tells you.

## Install (one click)

1. Unzip anywhere.
2. Double-click **`Install Elektron.command`**. Gatekeeper first run: right-click →
   **Open** → **Open** (or once: `xattr -dr com.apple.quarantine .`).
3. It verifies the **immutable payload checksums first** (before touching anything),
   then installs pinned Node packages offline, creates `.local/venv` and installs
   the **hash-locked** Python wheels offline, migrates (**additively — never deletes
   the database**), runs the full suite, regenerates Platform 001, and runs twin
   validation. It ends with an explicit **OUTCOME**.

Expected: **`OUTCOME: FULL_PASS`** (or `BUILD_ENGINE_ONLY` if Python 3.11 isn't
installed). Any required or integrity failure prints **`OUTCOME: FAIL`** and stops
with the exact failing step; the full log is in `.local/logs/`.

## Verify

Double-click **`Verify Elektron.command`** → expect **`OUTCOME: FULL_PASS`**.

## Diagnose (read-only)

```
bash scripts/doctor.sh
```

| Symptom | Fix |
|---|---|
| Node too old | install Node ≥ 22.5.0, re-run Install |
| git not found | `xcode-select --install` |
| twin skipped | install Python 3.11 |
| immutable payload MISMATCH | the bundle was altered/corrupted — re-download |
| ".command can't be opened" | right-click → Open, once |
