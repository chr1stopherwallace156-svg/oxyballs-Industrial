#!/usr/bin/env bash
# Deterministic Phase 4E Tier-1 verification (governance/CI). Read-only against committed
# Phase 4D evidence; tamper cases operate on TEMP copies only. Emits an evidence log + JSON
# summary. This is the OUT-OF-BAND governance validator, not the canonical numerical engine
# (that is the Swift Phase4ECore target, which must be built/tested on a Swift host).
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
EV="Docs/Evidence/PHASE_4D/SURFACE-OUT-FIXTURE-000001"
P4E="phase4e"
LOG="$P4E/evidence/validator_log.txt"; SUM="$P4E/evidence/summary.json"
mkdir -p "$P4E/evidence"
: > "$LOG"; pass=0; fail=0; results=()
run() { # name  expect(PASS|FAIL)  cmd...
  local name="$1" expect="$2"; shift 2
  local out rc
  out="$("$@" 2>&1)"; rc=$?
  local got=$([ $rc -eq 0 ] && echo PASS || echo FAIL)
  { echo "### $name (expect $expect, got $got, exit $rc)"; echo "$out"; echo; } >> "$LOG"
  if [ "$got" = "$expect" ]; then pass=$((pass+1)); echo "  OK   $name ($expect)"; results+=("{\"case\":\"$name\",\"expect\":\"$expect\",\"got\":\"$got\",\"ok\":true}")
  else fail=$((fail+1)); echo "  BAD  $name (expected $expect, got $got)"; results+=("{\"case\":\"$name\",\"expect\":\"$expect\",\"got\":\"$got\",\"ok\":false}"); fi
}
tamper_dir() { local d; d="$(mktemp -d)"; cp -a "$EV/." "$d/"; echo "$d"; }

echo "== Phase 4E Tier-1 verification =="
# A) real handoff evidence — must PASS
run "handoff_real_evidence" PASS node "$P4E/bin/phase4e-handoff-verify.mjs" "$EV"

# B) handoff tamper matrix (temp copies)
T=$(tamper_dir); node -e 'const f=process.argv[1]+"/output_closure.json";const o=require(f);o.output_closure_sha256="0".repeat(64);require("fs").writeFileSync(f,JSON.stringify(o))' "$T"
run "tamper_4d_closure_mismatch" FAIL node "$P4E/bin/phase4e-handoff-verify.mjs" "$T"; rm -rf "$T"

T=$(tamper_dir); printf '\n// tampered byte' >> "$T/surface_mesh_candidate.json"
run "tamper_canonical_mesh_digest" FAIL node "$P4E/bin/phase4e-handoff-verify.mjs" "$T"; rm -rf "$T"

T=$(tamper_dir); node -e 'const f=process.argv[1]+"/phase4e_handoff.json";const o=require(f);o.surface_output_id="SURFACE-OUT-SUBSTITUTED-999";require("fs").writeFileSync(f,JSON.stringify(o))' "$T"
run "tamper_surface_id_substitution" FAIL node "$P4E/bin/phase4e-handoff-verify.mjs" "$T"; rm -rf "$T"

T=$(tamper_dir); node -e 'const f=process.argv[1]+"/phase4e_handoff.json";const o=require(f);o.engineering_metrology_claim="AUTHORIZED";require("fs").writeFileSync(f,JSON.stringify(o))' "$T"
run "tamper_metrology_authority_elevation" FAIL node "$P4E/bin/phase4e-handoff-verify.mjs" "$T"; rm -rf "$T"

# C) report-level — good must PASS
run "report_good" PASS node "$P4E/bin/phase4e-report-validate.mjs" "$P4E/fixtures/phase4e_report.good.json" --recapture "$P4E/fixtures/recapture_contract.good.json"

# D) report tamper matrix
TR="$(mktemp)"; node -e 'const o=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));o.measurements[0].use_evaluations[0].guard_band_mm=9.9;require("fs").writeFileSync(process.argv[2],JSON.stringify(o))' "$P4E/fixtures/phase4e_report.good.json" "$TR"
run "tamper_acceptable_violates_decision_rule" FAIL node "$P4E/bin/phase4e-report-validate.mjs" "$TR" --recapture "$P4E/fixtures/recapture_contract.good.json"; rm -f "$TR"

run "tamper_orphaned_recapture_reference" FAIL node "$P4E/bin/phase4e-report-validate.mjs" "$P4E/fixtures/phase4e_report.good.json"

TR="$(mktemp)"; node -e 'const o=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));o.region_dispositions[0].disposition="SUPER_ACCEPTABLE";require("fs").writeFileSync(process.argv[2],JSON.stringify(o))' "$P4E/fixtures/phase4e_report.good.json" "$TR"
run "tamper_impermissible_governance_enum" FAIL node "$P4E/bin/phase4e-report-validate.mjs" "$TR" --recapture "$P4E/fixtures/recapture_contract.good.json"; rm -f "$TR"

echo "-----------------------------------------------------------"
total=$((pass+fail))
printf '{\n  "suite": "phase4e-tier1", "passed": %d, "failed": %d, "total": %d,\n  "result": "%s",\n  "cases": [%s]\n}\n' \
  "$pass" "$fail" "$total" "$([ $fail -eq 0 ] && echo PASS || echo FAIL)" "$(IFS=,; echo "${results[*]}")" > "$SUM"
echo "RESULT: $([ $fail -eq 0 ] && echo PASS || echo FAIL) ($pass/$total)  log=$LOG summary=$SUM"
[ $fail -eq 0 ]
