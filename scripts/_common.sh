#!/usr/bin/env bash
# Shared helpers for the Elektron local runtime. Paths resolve from THIS file's
# location so the bundle runs wherever it is extracted. macOS (BSD) + Linux (GNU)
# compatible: no GNU-only flags on the hot paths.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENGINE="$ROOT/engine"
TWIN="$ROOT/elektron-digital-twin-foundation"
VENDOR="$ROOT/vendor"
NPM_CACHE="$VENDOR/npm-cache"
WHEELS="$VENDOR/python-wheels"
LOCAL_DIR="$ROOT/.local"
DATA_DIR="$LOCAL_DIR/data"; LOG_DIR="$LOCAL_DIR/logs"; CACHE_DIR="$LOCAL_DIR/cache"; BACKUP_DIR="$LOCAL_DIR/backups"
VENV_DIR="$LOCAL_DIR/venv"
mkdir -p "$DATA_DIR" "$LOG_DIR" "$CACHE_DIR" "$BACKUP_DIR"
IMMUTABLE_MANIFEST="$ROOT/IMMUTABLE_PAYLOAD_CHECKSUMS.sha256"

if [ -t 1 ]; then C_G=$'\033[32m'; C_R=$'\033[31m'; C_Y=$'\033[33m'; C_B=$'\033[36m'; C_0=$'\033[0m'; else C_G=; C_R=; C_Y=; C_B=; C_0=; fi
section() { printf '\n%s== %s ==%s\n' "$C_B" "$1" "$C_0"; }
ok()   { printf '%s  OK  %s%s\n' "$C_G" "$1" "$C_0"; }
warn() { printf '%s  !   %s%s\n' "$C_Y" "$1" "$C_0"; }
info() { printf '      %s\n' "$1"; }
fail() { printf '%s  X   %s%s\n' "$C_R" "$1" "$C_0" 1>&2; }

# ---- platform ------------------------------------------------------------
OS=""; ARCH=""; PYPLAT=""
detect_platform() {
  case "$(uname -s)" in Darwin) OS=macos;; Linux) OS=linux;; *) OS=unknown;; esac
  case "$(uname -m)" in arm64|aarch64) ARCH=arm64;; x86_64|amd64) ARCH=x86_64;; *) ARCH="$(uname -m)";; esac
  if [ "$OS" = macos ] && [ "$ARCH" = arm64 ]; then PYPLAT=macos-arm64
  elif [ "$OS" = macos ]; then PYPLAT=macos-x86_64
  elif [ "$OS" = linux ] && [ "$ARCH" = x86_64 ]; then PYPLAT=linux-x86_64
  else PYPLAT=""; fi
}

ver_ge() { [ "$1" = "$2" ] && return 0; [ "$(printf '%s\n%s\n' "$1" "$2" | sort -t. -k1,1n -k2,2n -k3,3n | head -1)" = "$2" ]; }
need_cmd() { command -v "$1" >/dev/null 2>&1; }

# ---- portable SHA-256 (macOS shasum OR GNU sha256sum) --------------------
# Emits "shasum -a 256" or "sha256sum"; both produce/verify the "<hash>  <path>" format.
HASH_BIN=""
hash_tool() {
  if [ -n "$HASH_BIN" ]; then printf '%s' "$HASH_BIN"; return 0; fi
  if need_cmd shasum; then HASH_BIN="shasum -a 256"; elif need_cmd sha256sum; then HASH_BIN="sha256sum"; else return 1; fi
  printf '%s' "$HASH_BIN"
}

# ---- Python 3.11 detection ----------------------------------------------
PY311=""            # path to a python3.11 interpreter, or empty
detect_python311() {
  local c
  for c in python3.11 python3 python; do
    if need_cmd "$c"; then
      if "$c" -c 'import sys;exit(0 if sys.version_info[:2]==(3,11) else 1)' 2>/dev/null; then PY311="$(command -v "$c")"; return 0; fi
    fi
  done
  PY311=""; return 1
}

# ---- portable SQLite integrity check (via Node — no sqlite3 CLI needed) --
# db_integrity_ok <path> : returns 0 iff PRAGMA integrity_check == 'ok'.
db_integrity_ok() {
  local p="$1"
  [ -f "$p" ] || return 1
  node --no-warnings -e '
    const {DatabaseSync}=require("node:sqlite");
    try { const db=new DatabaseSync(process.argv[1]); const r=db.prepare("PRAGMA integrity_check").get();
      db.close(); process.exit(r && r.integrity_check==="ok" ? 0 : 1); }
    catch(e){ process.exit(1); }
  ' "$p" >/dev/null 2>&1
}

# ---- non-destructive Platform 001 regeneration --------------------------
# Ensures the schema exists (migrate is additive; it never drops data) and then
# regenerates the Platform 001 package. Does NOT delete the database. The engine's
# seedPlatform001 clears only the prior Platform-001 package rows in FK-safe order.
regen_platform001() {
  ( cd "$ENGINE" && npm run migrate >/dev/null 2>&1 && npm run platform001:generate )
}

# ---- immutable payload verification -------------------------------------
# Verifies IMMUTABLE_PAYLOAD_CHECKSUMS.sha256 (source/scripts/docs/vendor only;
# generated outputs/db/logs/results are excluded). Returns non-zero on mismatch.
verify_immutable() {
  [ -f "$IMMUTABLE_MANIFEST" ] || { warn "no immutable manifest present"; return 2; }
  local tool; tool="$(hash_tool)" || { warn "no sha256 tool"; return 2; }
  ( cd "$ROOT" && $tool -c "$IMMUTABLE_MANIFEST" >/dev/null 2>&1 )
}
