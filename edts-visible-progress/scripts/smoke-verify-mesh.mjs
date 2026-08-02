/**
 * Smoke test for mesh_mapping_manifest.json structure and verifyMeshMapping logic.
 * Mirrors TypeScript verifier without requiring a TS runner.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(
  readFileSync(join(root, 'src/data/mesh_mapping_manifest.json'), 'utf8'),
)

function shouldIgnore(name) {
  return manifest.unmapped_ignore_prefixes.some(
    (p) => name === p || name.startsWith(`${p}_`) || name.startsWith(p),
  )
}

function resolveAlias(name) {
  const hit = manifest.aliases.find((a) => a.from === name)
  return hit ? hit.to : name
}

function verifyMeshMapping(discoveredNodeNames) {
  const canonical = new Set()
  const aliased = []
  for (const raw of discoveredNodeNames) {
    if (!raw || shouldIgnore(raw)) continue
    const c = resolveAlias(raw)
    if (c !== raw) aliased.push({ from: raw, to: c })
    canonical.add(c)
  }
  const required = manifest.primary_nodes.filter((n) => n.required)
  const primarySet = new Set(required.map((n) => n.mesh_node))
  const matched = []
  const missing = []
  for (const node of required) {
    if (canonical.has(node.mesh_node)) matched.push(node.mesh_node)
    else missing.push(node.mesh_node)
  }
  const orphans = [...canonical].filter((n) => !primarySet.has(n) && n.startsWith('GEO_'))
  const uniqueComps = [
    ...new Set(matched.map((mesh) => required.find((n) => n.mesh_node === mesh).comp_id)),
  ]
  const meetsMin = uniqueComps.length >= manifest.minimum_unique_comp_ids
  return {
    pass: missing.length === 0 && orphans.length === 0 && meetsMin,
    matched,
    missing,
    orphans,
    aliased,
    uniqueComps,
  }
}

const requiredNames = manifest.primary_nodes.filter((n) => n.required).map((n) => n.mesh_node)
if (requiredNames.length < 13) {
  console.error('FAIL: expected ≥13 primary required nodes, got', requiredNames.length)
  process.exit(1)
}

const perfect = verifyMeshMapping(requiredNames)
if (!perfect.pass) {
  console.error('FAIL: perfect fixture', perfect)
  process.exit(1)
}

const empty = verifyMeshMapping([])
if (empty.pass) {
  console.error('FAIL: empty fixture passed')
  process.exit(1)
}

const aliased = verifyMeshMapping([
  ...requiredNames.filter(
    (n) =>
      n !== 'GEO_POWERTRAIN_ICE_ENGINE_PROXY_CTR_LOD0' &&
      n !== 'GEO_POWERTRAIN_ICE_TRANS_PROXY_CTR_LOD0' &&
      n !== 'GEO_BODY_CAB_SHELL_CTR_LOD0',
  ),
  'GEO_POWERTRAIN_ICE_ENGINE_6.7L_V8_CTR_LOD0',
  'GEO_POWERTRAIN_ICE_TRANS_6R140_CTR_LOD0',
  'GEO_BODY_CAB_SHELL_ALUMINUM_CTR_LOD0',
])
if (!aliased.pass || aliased.aliased.length < 3) {
  console.error('FAIL: alias fixture', aliased)
  process.exit(1)
}

const uniqueComps = new Set(manifest.primary_nodes.map((n) => n.comp_id))
if (uniqueComps.size < manifest.minimum_unique_comp_ids) {
  console.error('FAIL: unique comp_ids below minimum', uniqueComps.size)
  process.exit(1)
}

console.log(
  JSON.stringify(
    {
      ok: true,
      primary_nodes: requiredNames.length,
      unique_comp_ids: uniqueComps.size,
      aliases: manifest.aliases.length,
      glb_status: manifest.glb_status,
    },
    null,
    2,
  ),
)
