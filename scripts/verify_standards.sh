#!/usr/bin/env bash
#
# ELEKTRON standards verifier — the canonical local command (run via `make
# standards-verify`; CI calls the same target, so local and CI never drift).
#
# Enforces the 12 Phase-0 checks over docs/standards/. JSON-heavy logic lives in
# scripts/verify_standards_checks.py; determinism/regeneration logic lives here.
# Returns non-zero if any check fails.
#
set -u

# Resolve repo root (dir above scripts/).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

STD_ROOT="docs/standards"
VOL="docs/standards/EES"
MASTER="$VOL/ELEK-QUAL-STD-0000.md"
META="$VOL/document-metadata.json"
META_SCHEMA="$VOL/schemas/document-metadata.schema.json"
OBJID_SCHEMA="$VOL/schemas/canonical-object-id.schema.json"
GEN="$VOL/generated/ELEK-QUAL-STD-0000.html"
GENERATOR="scripts/generate_standards_html.py"
CHECKS="scripts/verify_standards_checks.py"
PY="${PYTHON:-python3}"

fail=0
passc=0
report() { # name  rc  detail
  if [ "$2" -eq 0 ]; then
    echo "  PASS  $1"
    passc=$((passc+1))
  else
    echo "  FAIL  $1"
    [ -n "${3:-}" ] && printf '%s\n' "$3" | sed 's/^/        /'
    fail=1
  fi
}

echo "ELEKTRON standards verification — $STD_ROOT"
echo "-------------------------------------------------------------"

# --- Check 1: JSON schema compliance ---------------------------------------- #
out="$("$PY" "$CHECKS" schema "$META_SCHEMA" "$META" 2>&1)"; report "1. metadata conforms to JSON schema" $? "$out"
# schema files themselves must be valid JSON
out="$("$PY" - "$META_SCHEMA" "$OBJID_SCHEMA" <<'PY' 2>&1
import json,sys
for p in sys.argv[1:]:
    json.load(open(p,encoding="utf-8"))
print("schema files are valid JSON")
PY
)"; report "1b. schema files are valid JSON" $? "$out"

# --- Check 2: 11 companion artifacts present and non-empty ------------------- #
missing=""
for f in README ARCHITECTURAL_INTENT CHANGELOG DECISIONS GUARDRAILS HANDOFF ROADMAP FUTURE_WORK KNOWN_LIMITATIONS TRACEABILITY LESSONS_LEARNED; do
  if [ ! -s "$VOL/$f.md" ]; then missing="$missing $f.md"; fi
done
if [ -n "$missing" ]; then report "2. 11 companion artifacts present & non-empty" 1 "missing/empty:$missing"; else report "2. 11 companion artifacts present & non-empty" 0; fi

# --- Check 3: unique ELEK-IDs ----------------------------------------------- #
out="$("$PY" "$CHECKS" unique-ids "$STD_ROOT" 2>&1)"; report "3. unique ELEK-IDs across volumes" $? "$out"

# --- Check 4: OBJ-ID format ------------------------------------------------- #
out="$("$PY" "$CHECKS" objid "$OBJID_SCHEMA" "$MASTER" 2>&1)"; report "4. OBJ-ID format checks" $? "$out"

# --- Check 5: lifecycle/status vocabulary ----------------------------------- #
out="$("$PY" "$CHECKS" vocab "$META" 2>&1)"; report "5. lifecycle/validation vocabulary + honesty rules" $? "$out"

# --- Check 6: EASB terminology consistency ---------------------------------- #
erb_hits="$(grep -n '\bERB\b' "$MASTER" "$META" "$GEN" 2>/dev/null)"
if [ -n "$erb_hits" ]; then report "6. EASB terminology consistency (no ERB in canonical/metadata/HTML)" 1 "$erb_hits"; else report "6. EASB terminology consistency (no ERB in canonical/metadata/HTML)" 0; fi

# --- Check 7: master header <-> metadata agreement -------------------------- #
out="$("$PY" "$CHECKS" header "$MASTER" "$META" 2>&1)"; report "7. canonical markdown/metadata header agreement" $? "$out"

# --- Check 8: internal markdown reference integrity ------------------------- #
out="$("$PY" "$CHECKS" links "$VOL" 2>&1)"; report "8. internal markdown reference integrity" $? "$out"

# --- Check 9: generated HTML marked derived/non-authoritative --------------- #
d1=0; grep -q "DERIVED - DO NOT EDIT" "$GEN" || d1=1
grep -q "GENERATED FILE - DO NOT EDIT" "$GEN" || d1=1
auth="$("$PY" - "$META" <<'PY' 2>&1
import json,sys
m=json.load(open(sys.argv[1],encoding="utf-8"))
arts=m.get("generated_artifacts",[])
assert arts and all(a.get("authoritative") is False for a in arts), "a generated_artifact is not marked authoritative:false"
print("ok")
PY
)"; [ $? -ne 0 ] && d1=1
report "9. generated HTML explicitly derived / non-authoritative" $d1 "$auth"

# --- Check 10: generated output contains source commit SHA ------------------ #
SHA="$(grep -oE 'source-commit-sha: [0-9a-f]{40}' "$GEN" | awk '{print $2}' | head -1)"
if [ -n "$SHA" ]; then report "10. generated output contains source commit SHA" 0; else report "10. generated output contains source commit SHA" 1 "no 40-hex source-commit-sha marker found"; fi

# --- Check 11: deterministic regeneration produces no diff ------------------ #
if [ -z "$SHA" ]; then
  report "11. deterministic regeneration (byte-identical)" 1 "cannot rebuild: no embedded SHA"
else
  TMP="$(mktemp -d)"
  trap 'rm -rf "$TMP"' EXIT
  if "$PY" "$GENERATOR" --markdown "$MASTER" --metadata "$META" --source-sha "$SHA" --out "$TMP/regen.html" >/dev/null 2>&1; then
    if cmp -s "$TMP/regen.html" "$GEN"; then
      report "11. deterministic regeneration (byte-identical to checked-in HTML)" 0
      REGEN_OK=1
    else
      diffhead="$(diff "$GEN" "$TMP/regen.html" | head -8)"
      report "11. deterministic regeneration (byte-identical to checked-in HTML)" 1 "$diffhead"
      REGEN_OK=0
    fi
  else
    report "11. deterministic regeneration (byte-identical to checked-in HTML)" 1 "generator failed"
    REGEN_OK=0
  fi
fi

# --- Check 12: no direct HTML-only edits ------------------------------------ #
# The byte-compare in check 11 proves the checked-in HTML equals a fresh render of
# the CURRENT markdown+metadata: any hand-edit to the HTML, or any markdown/metadata
# edit committed without regenerating, changes the bytes and fails. We additionally
# require the generator provenance marker to be present.
if [ "${REGEN_OK:-0}" -eq 1 ] && grep -q "scripts/generate_standards_html.py" "$GEN"; then
  report "12. no direct HTML-only edits (HTML matches regenerated source)" 0
else
  report "12. no direct HTML-only edits (HTML matches regenerated source)" 1 "HTML does not match a fresh regeneration, or generator marker missing"
fi

echo "-------------------------------------------------------------"
if [ "$fail" -eq 0 ]; then
  echo "RESULT: PASS ($passc checks)"
  echo "CLASSIFICATION: PHASE_0_EES_CONTROLLED_BASELINE_COMPLETE"
  exit 0
else
  echo "RESULT: FAIL"
  echo "CLASSIFICATION: PHASE_0_EES_CLOSURE_BLOCKED"
  exit 1
fi
