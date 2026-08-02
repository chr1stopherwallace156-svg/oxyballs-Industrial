# OFFLINE OPERATION

Only claims actually tested are marked "tested." This package was built and run on
**Linux**; macOS execution was **not** performed from the build environment.

## Bundled for offline install (`vendor/`)

| Vendor | Contents | Notes |
|---|---|---|
| `npm-cache/` | `typescript`, `@types/node`, `undici-types` | pure JS → **universal** across OS/CPU |
| `python-wheels/linux-x86_64/` | 7 wheels | tested end-to-end here |
| `python-wheels/macos-arm64/` | 7 wheels (cp311) | built, macOS run unverified |
| `python-wheels/macos-x86_64/` | 7 wheels (cp311) | built, macOS run unverified |
| `python-wheels/requirements-kernel-validation.lock` | hash-locked (direct + transitive) | installed with `pip --require-hashes` |

Only `rpds-py` is a compiled package (one wheel per platform); the other six are
`py3-none-any` (universal). **Python 3.11 is required** — the wheels are CPython
3.11. The installer detects 3.11 explicitly; on any other version the digital-twin
step is skipped offline (or falls back to the network).

## Platform support — honest matrix

| Platform | Node offline | Python offline (3.11) | Verified |
|---|---|---|---|
| Linux x86_64 | ✅ | ✅ | **tested end-to-end** (build + install + verify) |
| macOS Apple Silicon (arm64) | ✅ universal | ✅ wheels present | **not executed on a Mac** |
| macOS Intel (x86_64) | ✅ universal | ✅ wheels present | **not executed on a Mac** |
| Windows | ⚠️ cache universal but launchers are Unix shell | ❌ no wheels | **not supported** |

## What runs fully offline after install

Build Engine (build, migrate, 56 tests, `verify:attack`, `verify:determinism`,
`verify:attack:package`, `platform001:generate`); the static site; and the
digital-twin kernel validation **when Python 3.11 is present**. All were run with
network forced off (`npm ci --offline`, `pip --no-index --require-hashes`).

## Needs the internet (once, or as fallback)

Installing the Node.js / Python **runtimes** if absent; a Python version other than
3.11; Windows. Nothing in normal daily use. No launcher contacts GitHub, Cursor,
Claude, the npm registry, or PyPI after install.
