/**
 * Mesh ↔ component registry for the R3F scene.
 * Scene groups set userData.compId; search/camera resolve via this map + scene.traverse.
 */
export type MeshRegistryEntry = {
  comp_id: string
  geometry_role: string
  scene_user_data_key: 'compId'
}

const byComp = new Map<string, MeshRegistryEntry>()
const byRole = new Map<string, string>()

export function registerMesh(comp_id: string, geometry_role: string) {
  const entry: MeshRegistryEntry = {
    comp_id,
    geometry_role,
    scene_user_data_key: 'compId',
  }
  byComp.set(comp_id, entry)
  byRole.set(geometry_role, comp_id)
}

export function getCompIdForRole(geometry_role: string) {
  return byRole.get(geometry_role) ?? null
}

export function listRegisteredCompIds() {
  return [...byComp.keys()]
}

export function clearMeshRegistry() {
  byComp.clear()
  byRole.clear()
}
