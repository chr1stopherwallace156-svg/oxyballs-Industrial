#!/usr/bin/env node
// Phase 4E — OUT-OF-BAND, read-only GOVERNANCE / CI validator (NOT the canonical numerical
// characterization engine — that is the Swift Phase4ECore target). It reads the ACTUAL
// committed Phase 4D → 4E evidence bytes and INDEPENDENTLY recomputes digests; it never
// trusts a digest copied from a PR body. Deterministic, no dependencies. Read-only.
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir) { console.error("usage: phase4e-handoff-verify.mjs <SURFACE-OUT evidence dir>"); process.exit(2); }
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const readJSON = (f) => JSON.parse(readFileSync(join(dir, f), "utf8"));

let fail = 0;
const summary = { evidence_dir: dir, checks: [] };
const ok = (name, detail = "") => { console.log("  PASS " + name + (detail ? "  " + detail : "")); summary.checks.push({ name, result: "PASS", detail }); };
const bad = (name, detail = "") => { console.log("  FAIL " + name + (detail ? "  " + detail : "")); summary.checks.push({ name, result: "FAIL", detail }); fail = 1; };

console.log("Phase 4E handoff verification (read-only, recomputed) — " + dir);
console.log("-----------------------------------------------------------");

const handoff = readJSON("phase4e_handoff.json");
const closure = readJSON("output_closure.json");
const inventory = readJSON("output_inventory.json");
const lineage = readJSON("surface_lineage_manifest.json");

// 1) handoff is a Phase4EHandoffContract with the right readiness + shape
handoff.schema_id === "Phase4EHandoffContract" ? ok("1. handoff schema_id = Phase4EHandoffContract")
  : bad("1. handoff schema_id", handoff.schema_id);
["READY_WITH_UNRESOLVED_BOUNDARIES", "READY"].includes(handoff.phase4e_readiness)
  ? ok("1. phase4e_readiness accepted", handoff.phase4e_readiness) : bad("1. phase4e_readiness", handoff.phase4e_readiness);

// 2) output_closure cross-check: handoff.output_closure_sha256 == output_closure.output_closure_sha256
handoff.output_closure_sha256 === closure.output_closure_sha256
  ? ok("2. output_closure_sha256 handoff==closure", handoff.output_closure_sha256.slice(0, 16) + "…")
  : bad("2. output_closure_sha256 mismatch", `${handoff.output_closure_sha256} != ${closure.output_closure_sha256}`);

// 3) inventory integrity — recompute sha256 of every listed file from bytes
{
  let mism = 0, n = 0;
  for (const it of inventory.items || []) {
    n++;
    let buf; try { buf = readFileSync(join(dir, it.relative_path)); } catch { bad("3. inventory file missing", it.relative_path); mism++; continue; }
    const got = sha256(buf);
    if (got !== it.sha256) { bad("3. inventory hash mismatch", `${it.relative_path} recomputed ${got.slice(0,12)}… != ${it.sha256.slice(0,12)}…`); mism++; }
    if (buf.length !== it.byte_count) { bad("3. inventory byte_count mismatch", it.relative_path); mism++; }
  }
  if (!mism) ok(`3. inventory integrity (recomputed ${n} files, all match)`);
}

// 4) canonical mesh digest — recompute surface_mesh_candidate.json, compare to lineage
{
  const got = sha256(readFileSync(join(dir, "surface_mesh_candidate.json")));
  const claimed = (lineage.output_artifact_hashes || {})["surface_mesh_candidate.json"];
  got === claimed ? ok("4. canonical mesh digest (recomputed==lineage)", got.slice(0, 16) + "…")
    : bad("4. canonical mesh digest", `recomputed ${got} != lineage ${claimed}`);
}

// 5) surface id + lineage consistency
{
  const idOK = handoff.surface_output_id === closure.reconstruction_output_id
    && handoff.surface_output_id === closure.surface_output_id;
  idOK ? ok("5. surface_output_id consistent (handoff==closure)", handoff.surface_output_id)
    : bad("5. surface_output_id inconsistent", `${handoff.surface_output_id} / ${closure.reconstruction_output_id}`);
  handoff.source_lineage_manifest_id === lineage.lineage_manifest_id
    ? ok("5. lineage manifest id consistent", handoff.source_lineage_manifest_id)
    : bad("5. lineage manifest id", `${handoff.source_lineage_manifest_id} != ${lineage.lineage_manifest_id}`);
  // parent 4C closure is INHERITED lineage only (must be present, not treated as the 4D→4E handoff)
  closure.phase4c_output_closure_sha256
    ? ok("5. inherited parent 4C closure recorded (lineage only)", closure.phase4c_output_closure_sha256.slice(0, 16) + "…")
    : bad("5. inherited parent 4C closure missing");
}

// 6) claim locks + authority ceilings
for (const k of ["engineering_metrology_claim", "production_mesh_claim", "complete_digital_twin_claim"]) {
  handoff[k] === "FORBIDDEN" ? ok(`6. ${k} = FORBIDDEN`) : bad(`6. ${k} not FORBIDDEN`, String(handoff[k]));
}

console.log("-----------------------------------------------------------");
summary.result = fail ? "FAIL" : "PASS";
console.log("RESULT: " + summary.result);
if (process.env.PHASE4E_SUMMARY_JSON) {
  const { writeFileSync } = await import("node:fs");
  writeFileSync(process.env.PHASE4E_SUMMARY_JSON, JSON.stringify(summary, null, 2));
}
process.exit(fail);
