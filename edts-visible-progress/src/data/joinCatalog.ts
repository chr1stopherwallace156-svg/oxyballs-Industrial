import manifest from './stores/manifest.json'
import componentsStore from './stores/components.json'
import geometryStore from './stores/geometry.json'
import evidenceStore from './stores/evidence.json'
import relationshipsStore from './stores/relationships.json'
import uiStore from './stores/ui.json'
import timelineStore from './stores/timeline.json'
import simulationStore from './stores/simulation.json'
import type {
  Catalog,
  DataStatus,
  TwinComponent,
  TimelineDoc,
  SimulationDoc,
} from '../types'

type Rec<T> = Record<string, T>

/**
 * Five-store join — Component index + Geometry + Evidence + Relationships + UI.
 * Keeps the runtime TwinComponent view for the viewer while allowing each store
 * to scale / version independently toward 50k+ objects.
 */
export function joinCatalog(): Catalog {
  const componentsRec = componentsStore.records as Rec<Record<string, unknown>>
  const geometryRec = geometryStore.records as Rec<Record<string, unknown>>
  const evidenceRec = evidenceStore.records as Rec<Record<string, unknown>>
  const relationshipsRec = relationshipsStore.records as Rec<Record<string, unknown>>

  const components: TwinComponent[] = Object.keys(componentsRec).map((id) => {
    const c = componentsRec[id]
    const g = geometryRec[id] ?? {}
    const e = evidenceRec[id] ?? {}
    const r = relationshipsRec[id] ?? {}
    return {
      id,
      display_name: String(c.display_name),
      family: c.family as TwinComponent['family'],
      category: String(c.category),
      scene_group: String(c.scene_group),
      decon_group: c.decon_group as TwinComponent['decon_group'],
      data_classification: String(c.data_classification),
      configuration_applicability: String(c.configuration_applicability),
      layer: String(c.layer),
      visible_in: c.visible_in as TwinComponent['visible_in'],
      removable: Boolean(c.removable),
      decon_intent: (c.decon_intent as string | null) ?? undefined,
      data_status: e.data_status as TwinComponent['data_status'],
      procedure_eligibility: e.procedure_eligibility as TwinComponent['procedure_eligibility'],
      evidence_ledger: (e.evidence_ledger ?? []) as TwinComponent['evidence_ledger'],
      missing_properties: (e.missing_properties ?? []) as TwinComponent['missing_properties'],
      mepq_blockers: (e.mepq_blockers ?? []) as TwinComponent['mepq_blockers'],
      mass_kg: (e.mass_kg as number | null) ?? null,
      cg_m: (e.cg_m as number[] | null) ?? null,
      mass_status: String(e.mass_status ?? 'UNKNOWN'),
      known_interfaces: (r.known_interfaces ?? []) as TwinComponent['known_interfaces'],
      dependency_highlights: (r.dependency_highlights ?? {
        blocks_access_to: [],
        must_disconnect_before: [],
      }) as TwinComponent['dependency_highlights'],
      geometry_role: String(g.geometry_role ?? 'unknown'),
      explode_vector: (g.explode_vector as number[]) ?? [0, 0, 0],
      geometry_type: String(g.geometry_type ?? 'PLACEHOLDER'),
    }
  })

  return {
    release: manifest.release,
    decision: manifest.decision,
    schema: manifest.schema,
    architecture: manifest.architecture as string[],
    locked_configuration: manifest.locked_configuration as Catalog['locked_configuration'],
    honesty: manifest.honesty as Catalog['honesty'],
    badge_colors: uiStore.badge_colors as Record<DataStatus, string>,
    states: manifest.states as Catalog['states'],
    scene_tree: uiStore.scene_tree as Catalog['scene_tree'],
    search_aliases: uiStore.search_aliases as Record<string, string[]>,
    chrome_policy: String(uiStore.chrome_policy),
    components,
  }
}

export const timeline = timelineStore as unknown as TimelineDoc
export const simulation = simulationStore as unknown as SimulationDoc
