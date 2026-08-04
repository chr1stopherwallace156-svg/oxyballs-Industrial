#!/usr/bin/env node
// Phase 4E Tier-1A reference ORACLE (runnable spec for the Swift InputBindingValidator).
// Validates a Phase4EInput against the hardened schema + semantic/referential integrity,
// and returns the CLI exit-code taxonomy (§7). READ-ONLY. Deterministic. No deps.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const HERE = dirname(fileURLToPath(import.meta.url));
const load = (p) => JSON.parse(readFileSync(p, "utf8"));
const EXIT = { OK:0, SCHEMA:10, HASH:11, REF:12, CONTROL_DEP:20, CAL:21 };

// minimal draft-2020-12 subset (type/required/additionalProperties/enum/const/pattern/items/min-maxItems/if-then-else)
function val(s, v, path, errs) {
  if (s.const !== undefined && v !== s.const) errs.push(`${path}: != const ${JSON.stringify(s.const)}`);
  if (s.type) { const T=Array.isArray(s.type)?s.type:[s.type]; const ok=T.some(t=>
    t==="object"?v&&typeof v==="object"&&!Array.isArray(v):t==="array"?Array.isArray(v):
    t==="string"?typeof v==="string":t==="number"?typeof v==="number":t==="integer"?Number.isInteger(v):
    t==="boolean"?typeof v==="boolean":t==="null"?v===null:true);
    if(!ok){errs.push(`${path}: type ${s.type}`);return;} }
  if (s.enum && !s.enum.includes(v)) errs.push(`${path}: not in enum`);
  if (s.pattern && typeof v==="string" && !new RegExp(s.pattern).test(v)) errs.push(`${path}: !~ pattern`);
  if (v && typeof v==="object" && !Array.isArray(v)) {
    for (const r of s.required||[]) if(!(r in v)) errs.push(`${path}: missing '${r}'`);
    if (s.additionalProperties===false) for (const k of Object.keys(v)) if(!(s.properties&&k in s.properties)) errs.push(`${path}: extra '${k}'`);
    for (const [k,ss] of Object.entries(s.properties||{})) if(k in v) val(ss,v[k],`${path}.${k}`,errs);
    for (const clause of s.allOf||[]) {
      if (clause.if) { const ie=[]; val(clause.if,v,path,ie);
        const branch = ie.length? clause.else : clause.then; if (branch) val(branch,v,`${path}`,errs); }
    }
  }
  if (Array.isArray(v)) { if(s.minItems!==undefined&&v.length<s.minItems)errs.push(`${path}: <minItems`);
    if(s.maxItems!==undefined&&v.length>s.maxItems)errs.push(`${path}: >maxItems`);
    if(s.items) v.forEach((x,i)=>val(s.items,x,`${path}[${i}]`,errs)); }
}

const args = process.argv.slice(2);
const inputPath = args[0];
const expectMesh = args.includes("--expect-mesh-sha256") ? args[args.indexOf("--expect-mesh-sha256")+1] : null;
if (!inputPath) { console.error("usage: phase4e-input-oracle.mjs <input.json> [--expect-mesh-sha256 <hex>]"); process.exit(2); }
const schema = load(join(HERE,"..","schemas","phase_4e_input.v1.0.0.schema.json"));
const inp = load(inputPath);
const fails = [];
const report = (code,msg)=>{ console.log(`  EXIT_${code} ${msg}`); fails.push(code); };
console.log("Phase 4E Tier-1A input validation — "+inputPath);
console.log("-----------------------------------------------------------");

// 10: schema
{ const e=[]; val(schema,inp,"$",e); if(e.length){ report(EXIT.SCHEMA,"INPUT_SCHEMA_INVALID"); e.slice(0,6).forEach(x=>console.log("        - "+x)); }
  else console.log("  ok   schema conformance"); }

// 11: hash mismatch (only if an expected mesh sha is supplied)
if (expectMesh && inp.source_phase_4d && inp.source_phase_4d.canonical_mesh_sha256 !== expectMesh)
  report(EXIT.HASH,"INPUT_HASH_MISMATCH (canonical_mesh_sha256)");
else if (expectMesh) console.log("  ok   canonical mesh hash matches expected");

// gather ids for uniqueness + referential resolution
const ids = { anchor:new Set(), datum:new Set(), control:new Set(), meas:new Set(), region:new Set(), feature:new Set() };
const dup = [];
const addUniq = (set,id,kind)=>{ if(set.has(id)) dup.push(`${kind}:${id}`); set.add(id); };
for (const a of inp.scale_anchors||[]) { addUniq(ids.anchor,a.anchor_id,"anchor");
  for (const nf of a.nominal_features||[]) ids.feature.add(nf.feature_id); }
for (const d of inp.datums||[]) { addUniq(ids.datum,d.datum_id,"datum");
  for (const rf of d.reference_features||[]) ids.feature.add(rf); }
for (const c of inp.physical_controls||[]) { addUniq(ids.control,c.control_id,"control"); }
// NOTE: declared feature sources = anchor nominal_features + datum reference_features (NOT a control's own features).
for (const m of inp.manual_measurements||[]) { addUniq(ids.meas,m.measurement_id,"measurement"); ids.region.add(m.region_id); }
if (dup.length) report(EXIT.REF,"REFERENCE_INTEGRITY_FAILURE (duplicate ids: "+dup.join(", ")+")");
else console.log("  ok   identifier uniqueness (anchor/datum/control/measurement)");

// 12: referential resolution — control features must resolve to a declared feature source
{ const unresolved=[];
  for (const c of inp.physical_controls||[]) { for (const f of [c.feature_a_id,c.feature_b_id])
    if (!ids.feature.has(f)) unresolved.push(`${c.control_id}:${f}`); }
  if (unresolved.length) report(EXIT.REF,"REFERENCE_INTEGRITY_FAILURE (unresolved feature refs: "+unresolved.join(", ")+")");
  else console.log("  ok   referential resolution (control feature ids resolve)"); }

// 20: circular control — a FITTING_ONLY control must not also appear as a VALIDATION control
{ const fitting=new Set(), validation=new Set();
  for (const c of inp.physical_controls||[]) { if(c.use_role==="FITTING_ONLY") fitting.add(c.control_id);
    if(c.use_role==="VALIDATION_ONLY") validation.add(c.control_id); }
  // circularity is keyed on shared feature pairs used for both fitting and validation
  const fitPairs=new Set(), valPairs=new Set();
  const pk=(c)=>[c.feature_a_id,c.feature_b_id].sort().join("|");
  for (const c of inp.physical_controls||[]) { if(c.use_role==="FITTING_ONLY") fitPairs.add(pk(c)); if(c.use_role==="VALIDATION_ONLY") valPairs.add(pk(c)); }
  const circ=[...fitPairs].filter(p=>valPairs.has(p));
  if (circ.length) report(EXIT.CONTROL_DEP,"CONTROL_DEPENDENCY_INVALID (fitting pair reused for validation: "+circ.join(", ")+")");
  else console.log("  ok   no circular control (fitting vs validation disjoint)"); }

// 21: calibration evidence — non-intrinsic anchors' valid_until must be >= latest capture timestamp
{ const caps=[...(inp.physical_controls||[]).map(c=>c.measured_at),...(inp.manual_measurements||[]).map(m=>m.measured_at)].filter(Boolean).map(t=>Date.parse(t));
  const latestCap = caps.length? Math.max(...caps) : null;
  const expired=[];
  for (const a of inp.scale_anchors||[]) { if(a.anchor_type==="INTRINSIC_SENSOR_SCALE") continue;
    if (a.calibration_state==="EXPIRED") expired.push(a.anchor_id);
    else if (latestCap!=null && a.valid_until && Date.parse(a.valid_until) < latestCap) expired.push(a.anchor_id+"(valid_until<capture)"); }
  if (expired.length) report(EXIT.CAL,"CALIBRATION_EVIDENCE_INVALID ("+expired.join(", ")+")");
  else console.log("  ok   calibration evidence valid at capture time"); }

console.log("-----------------------------------------------------------");
const code = fails.length ? Math.min(...fails.filter(c=>c>0)) : 0; // report first (lowest) real failure
console.log(`RESULT: ${code===0?"EXECUTION_SUCCESS (exit 0)":"BLOCKED (exit "+code+")"}`);
process.exit(code);
