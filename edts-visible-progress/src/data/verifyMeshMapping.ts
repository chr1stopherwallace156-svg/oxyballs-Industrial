/**
 * EDTS-SPEC-3D-001 node parser — verify GLB scene node names against
 * mesh_mapping_manifest.json before Tier-2 admit.
 *
 * Does not load a GLB itself; callers supply discovered node names
 * (from Blender export list, glTF JSON, or R3F traverse).
 */
import manifest from './mesh_mapping_manifest.json'

export type MeshMappingPrimaryNode = {
  mesh_node: string
  comp_id: string
  geo_id: string
  geometry_role: string
  required: boolean
}

export type MeshMappingManifest = {
  primary_nodes: MeshMappingPrimaryNode[]
  aliases: { from: string; to: string; reason: string }[]
  unmapped_ignore_prefixes: string[]
  minimum_unique_comp_ids: number
}

export type VerifyMeshMappingResult = {
  pass: boolean
  matched_primary: string[]
  missing_primary: string[]
  orphan_meshes: string[]
  aliased: { from: string; to: string }[]
  unique_comp_ids: string[]
  unique_comp_id_count: number
  meets_minimum_comp_ids: boolean
}

const m = manifest as MeshMappingManifest

function shouldIgnore(name: string): boolean {
  return m.unmapped_ignore_prefixes.some(
    (p) => name === p || name.startsWith(`${p}_`) || name.startsWith(p),
  )
}

function resolveAlias(name: string): { canonical: string; aliasedFrom: string | null } {
  const hit = m.aliases.find((a) => a.from === name)
  if (hit) return { canonical: hit.to, aliasedFrom: hit.from }
  return { canonical: name, aliasedFrom: null }
}

/** Normalize a raw GLB node list to canonical GEO_ names. */
export function canonicalizeNodeNames(rawNames: string[]): {
  canonical: Set<string>
  aliased: { from: string; to: string }[]
} {
  const canonical = new Set<string>()
  const aliased: { from: string; to: string }[] = []
  for (const raw of rawNames) {
    if (!raw || shouldIgnore(raw)) continue
    const { canonical: c, aliasedFrom } = resolveAlias(raw)
    canonical.add(c)
    if (aliasedFrom) aliased.push({ from: aliasedFrom, to: c })
  }
  return { canonical, aliased }
}

/**
 * Compare discovered GLB node names to the primary manifest.
 * Pass = 100% of required primary nodes present; orphans only allowed if ignored.
 */
export function verifyMeshMapping(discoveredNodeNames: string[]): VerifyMeshMappingResult {
  const { canonical, aliased } = canonicalizeNodeNames(discoveredNodeNames)
  const required = m.primary_nodes.filter((n) => n.required)
  const primarySet = new Set(required.map((n) => n.mesh_node))

  const matched_primary: string[] = []
  const missing_primary: string[] = []
  for (const node of required) {
    if (canonical.has(node.mesh_node)) matched_primary.push(node.mesh_node)
    else missing_primary.push(node.mesh_node)
  }

  const orphan_meshes: string[] = []
  for (const name of canonical) {
    if (!primarySet.has(name) && name.startsWith('GEO_')) {
      orphan_meshes.push(name)
    }
  }

  const unique_comp_ids = [
    ...new Set(
      matched_primary.map(
        (mesh) => required.find((n) => n.mesh_node === mesh)!.comp_id,
      ),
    ),
  ]

  const meets_minimum_comp_ids = unique_comp_ids.length >= m.minimum_unique_comp_ids
  const pass =
    missing_primary.length === 0 && orphan_meshes.length === 0 && meets_minimum_comp_ids

  return {
    pass,
    matched_primary,
    missing_primary,
    orphan_meshes,
    aliased,
    unique_comp_ids,
    unique_comp_id_count: unique_comp_ids.length,
    meets_minimum_comp_ids,
  }
}

/** Primary mesh_node list from the locked manifest (for authoring checklists). */
export function listRequiredMeshNodes(): string[] {
  return m.primary_nodes.filter((n) => n.required).map((n) => n.mesh_node)
}

/** Look up comp_id for a mesh node (after alias resolution). */
export function getCompIdForMeshNode(meshNode: string): string | null {
  const { canonical } = resolveAlias(meshNode)
  const hit = m.primary_nodes.find((n) => n.mesh_node === canonical)
  return hit?.comp_id ?? null
}

/** Register all primary mappings into the runtime mesh registry. */
export function ingestManifestIntoRegistry(
  register: (comp_id: string, geometry_role: string) => void,
): void {
  const seen = new Set<string>()
  for (const n of m.primary_nodes) {
    const key = `${n.comp_id}::${n.geometry_role}`
    if (seen.has(key)) continue
    seen.add(key)
    register(n.comp_id, n.geometry_role)
  }
}

/** Self-check: perfect primary set must pass; empty set must fail. */
export function runVerifyMeshMappingSelfCheck(): { ok: boolean; detail: string } {
  const perfect = verifyMeshMapping(listRequiredMeshNodes())
  const empty = verifyMeshMapping([])
  if (!perfect.pass) {
    return { ok: false, detail: `perfect fixture failed: ${JSON.stringify(perfect)}` }
  }
  if (empty.pass) {
    return { ok: false, detail: 'empty fixture unexpectedly passed' }
  }
  const aliased = verifyMeshMapping([
    ...listRequiredMeshNodes().filter(
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
    return { ok: false, detail: `alias fixture failed: ${JSON.stringify(aliased)}` }
  }
  return { ok: true, detail: 'self-check passed' }
}
