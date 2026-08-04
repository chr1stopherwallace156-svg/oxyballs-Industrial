#!/usr/bin/env node
// Phase 4E read-only headless validator (Tier 1). No dependencies.
// Consumes a Phase4ECharacterizationReport (+ optional Phase4DHandoffContract and
// RecaptureContracts), validates against the committed JSON Schemas, and enforces the
// governance LOCKS that make dishonest output structurally impossible:
//   * engineering/metrology/mesh/twin claims must be FORBIDDEN unless a physical
//     validation evidence id is recorded;
//   * a use-evaluation cannot be ACCEPTABLE if expanded uncertainty overlaps the
//     tolerance budget minus guard band (ISO 14253-style guarded acceptance);
//   * PROVISIONAL/UNSUITABLE regions with a recapture_contract_id require that contract.
// It NEVER writes to any Phase 4D artifact (read-only characterization layer).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SCHEMA_DIR = join(HERE, "..", "schemas");
const load = (p) => JSON.parse(readFileSync(p, "utf8"));

// --- minimal draft-07 subset validator (type/required/additionalProperties/enum/
//     const/pattern/items/$ref/$defs/min-max/minItems) ---
function validate(root, schema, value, path, errs) {
  if (schema.$ref) {
    const t = schema.$ref.replace(/^#\//, "").split("/").reduce((a, k) => a[k], root);
    return validate(root, t, value, path, errs);
  }
  if (schema.const !== undefined && value !== schema.const)
    errs.push(`${path}: expected const ${JSON.stringify(schema.const)}`);
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const ok = types.some((t) =>
      t === "object" ? value && typeof value === "object" && !Array.isArray(value)
      : t === "array" ? Array.isArray(value)
      : t === "string" ? typeof value === "string"
      : t === "number" ? typeof value === "number"
      : t === "integer" ? Number.isInteger(value)
      : t === "boolean" ? typeof value === "boolean"
      : t === "null" ? value === null : true);
    if (!ok) { errs.push(`${path}: expected type ${schema.type}, got ${value === null ? "null" : Array.isArray(value) ? "array" : typeof value}`); return; }
  }
  if (schema.enum && !schema.enum.includes(value))
    errs.push(`${path}: ${JSON.stringify(value)} not in enum`);
  if (schema.pattern && typeof value === "string" && !new RegExp(schema.pattern).test(value))
    errs.push(`${path}: ${JSON.stringify(value)} !~ /${schema.pattern}/`);
  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) errs.push(`${path}: < minimum`);
    if (schema.maximum !== undefined && value > schema.maximum) errs.push(`${path}: > maximum`);
    if (schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) errs.push(`${path}: <= exclusiveMinimum`);
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const r of schema.required || []) if (!(r in value)) errs.push(`${path}: missing required '${r}'`);
    if (schema.additionalProperties === false)
      for (const k of Object.keys(value)) if (!(schema.properties && k in schema.properties)) errs.push(`${path}: unexpected property '${k}'`);
    for (const [k, sub] of Object.entries(schema.properties || {})) if (k in value) validate(root, sub, value[k], `${path}.${k}`, errs);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errs.push(`${path}: fewer than minItems`);
    if (schema.items) value.forEach((v, i) => validate(root, schema.items, v, `${path}[${i}]`, errs));
  }
}

function fail(msg) { console.error("  FAIL " + msg); process.exitCode = 1; }
function pass(msg) { console.log("  PASS " + msg); }

const args = process.argv.slice(2);
const reportPath = args[0];
const handoffPath = args.includes("--handoff") ? args[args.indexOf("--handoff") + 1] : null;
const recapturePaths = args.reduce((a, x, i) => (x === "--recapture" ? [...a, args[i + 1]] : a), []);
if (!reportPath) { console.error("usage: phase4e-validate.mjs <report.json> [--handoff h.json] [--recapture rc.json ...]"); process.exit(2); }

const reportSchema = load(join(SCHEMA_DIR, "Phase4ECharacterizationReport.v1.0.0.schema.json"));
const rcSchema = load(join(SCHEMA_DIR, "RecaptureContract.v1.0.0.schema.json"));
const report = load(reportPath);

console.log("Phase 4E validation — " + reportPath);
console.log("-----------------------------------------------------------");

// 1) schema conformance
{ const e = []; validate(reportSchema, reportSchema, report, "$", e);
  e.length ? (fail("report schema conformance:"), e.forEach((x) => console.error("        - " + x))) : pass("report conforms to Phase4ECharacterizationReport schema"); }

// 2) CLAIM LOCKS — no authorized claim without physical validation evidence
{
  const cl = report.claim_locks || {};
  const evid = cl.physical_validation_evidence_id;
  const anyAuthorized = ["engineering_metrology_claim","production_vehicle_mesh_claim","manufacturing_geometry_claim","complete_digital_twin_claim"].some((k) => cl[k] === "AUTHORIZED");
  if (anyAuthorized && !evid) fail("a claim is AUTHORIZED with no physical_validation_evidence_id (FORBIDDEN lock)");
  else pass("claim locks honest (no unbacked AUTHORIZED)");
  if (report.engineering_use_authority === "AUTHORIZED" && !evid)
    fail("engineering_use_authority=AUTHORIZED with no physical_validation_evidence_id");
  else pass("engineering_use_authority consistent with evidence");
  if (report.determinism && report.determinism.physical_reproducibility === "VERIFIED" && !evid)
    fail("physical_reproducibility=VERIFIED with no physical evidence id");
}

// 3) decision-rule honesty (guarded acceptance): ACCEPTABLE requires U <= budget - guard_band
{
  let bad = 0;
  for (const m of report.measurements || []) {
    const U = m.uncertainty?.expanded_uncertainty_mm;
    for (const ue of m.use_evaluations || []) {
      const effective = (ue.tolerance_budget_mm ?? 0) - (ue.guard_band_mm ?? 0);
      if (ue.disposition === "ACCEPTABLE" && !(typeof U === "number" && U <= effective)) {
        fail(`${m.measurement_id}/${ue.declared_use}: ACCEPTABLE but U(${U}) > budget-guard(${effective})`); bad++;
      }
      if (ue.disposition === "ACCEPTABLE" && report.global_scale_status?.state === "UNSCALED") {
        fail(`${m.measurement_id}/${ue.declared_use}: ACCEPTABLE while global scale UNSCALED`); bad++;
      }
    }
  }
  if (!bad) pass("use dispositions honor guard-band + scale (no unbacked ACCEPTABLE)");
}

// 4) region ↔ recapture linkage
{
  const rcById = {};
  for (const p of recapturePaths) { const rc = load(p); const e = []; validate(rcSchema, rcSchema, rc, "$", e);
    e.length ? (fail(`recapture ${p} schema:`), e.forEach((x)=>console.error("        - "+x))) : pass(`recapture ${rc.recapture_contract_id} conforms`);
    rcById[rc.recapture_contract_id] = rc; }
  for (const r of report.region_dispositions || []) {
    if (["PROVISIONAL","UNSUITABLE","INDETERMINATE"].includes(r.disposition) && r.recapture_contract_id) {
      if (!rcById[r.recapture_contract_id]) fail(`region ${r.region_id} names recapture ${r.recapture_contract_id} not provided`);
      else pass(`region ${r.region_id} → recapture ${r.recapture_contract_id} present`);
    }
  }
}

// 5) read-only handoff cross-check (never writes 4D)
if (handoffPath) {
  const h = load(handoffPath);
  if (h.schema_id !== "Phase4DHandoffContract") fail("handoff schema_id != Phase4DHandoffContract");
  else if ((report.source_phase_4d?.output_closure_sha256 || "").replace(/^sha256:/, "") !== (h.output_closure_sha256 || ""))
    fail("report.source_phase_4d.output_closure_sha256 does not match provided Phase 4D handoff");
  else pass("source Phase 4D handoff matches (read-only cross-check)");
}

console.log("-----------------------------------------------------------");
console.log(process.exitCode ? "RESULT: FAIL" : "RESULT: PASS");
