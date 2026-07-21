import manifest from './stores/manifest.json'
import compStore from './stores/COMP.json'
import geoStore from './stores/GEO.json'
import evdStore from './stores/EVD.json'
import egsStore from './stores/EGS.json'
import simStore from './stores/SIM.json'
import uiStore from './stores/UI.json'
import timelineStore from './stores/timeline.json'
import type {
  Catalog,
  DataStatus,
  TwinComponent,
  TimelineDoc,
  SimulationDoc,
  GraphEdge,
  SimRecord,
} from '../types'

type Rec<T> = Record<string, T>

/** Join COMP←GEO/EVD/SIM/EGS into a transient TwinComponent view for the R2 viewer. */
export function joinCatalog(): Catalog {
  const comps = compStore.records as Rec<Record<string, unknown>>
  const geos = geoStore.records as Rec<Record<string, unknown>>
  const evds = evdStore.records as Rec<Record<string, unknown>>
  const sims = simStore.records as Rec<Record<string, unknown>>
  const edges = (egsStore.edges ?? []) as GraphEdge[]

  const components: TwinComponent[] = Object.keys(comps).map((comp_id) => {
    const c = comps[comp_id]
    const g = geos[String(c.geo_id)] ?? {}
    const e = evds[String(c.evd_id)] ?? {}
    const s = sims[String(c.sim_id)] ?? {}

    const related = edges.filter(
      (edge) => edge.source_comp_id === comp_id || edge.target_comp_id === comp_id,
    )
    const known_interfaces = related
      .filter((edge) => edge.kind !== 'PROCEDURAL' || edge.interface_id)
      .filter((edge) => edge.interface_id)
      .map((edge) => ({
        interface_id: String(edge.interface_id),
        class: edge.class,
        target_component:
          edge.source_comp_id === comp_id ? edge.target_comp_id : edge.source_comp_id,
        status: edge.status,
      }))

    const blocks_access_to = related
      .filter((edge) => edge.class === 'BLOCKS_ACCESS_TO' && edge.source_comp_id === comp_id)
      .map((edge) => edge.target_comp_id)
      .filter((x): x is string => !!x)

    const must_disconnect_before = related
      .filter(
        (edge) => edge.class === 'MUST_DISCONNECT_BEFORE' && edge.source_comp_id === comp_id,
      )
      .map((edge) => edge.target_comp_id)
      .filter((x): x is string => !!x)

    return {
      id: comp_id,
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
      geo_id: String(c.geo_id),
      evd_id: String(c.evd_id),
      sim_id: String(c.sim_id),
      data_status: e.data_status as TwinComponent['data_status'],
      procedure_eligibility: e.procedure_eligibility as TwinComponent['procedure_eligibility'],
      evidence_ledger: (e.evidence_ledger ?? []) as TwinComponent['evidence_ledger'],
      missing_properties: (e.missing_properties ?? []) as TwinComponent['missing_properties'],
      mepq_blockers: (e.mepq_blockers ?? []) as TwinComponent['mepq_blockers'],
      mass_kg: (s.mass_kg as number | null) ?? null,
      cg_m: (s.cg_m as number[] | null) ?? null,
      mass_status: String(s.mass_status ?? 'UNKNOWN'),
      maturity: (e.maturity as TwinComponent['maturity']) ?? {
        identity_status: 'UNKNOWN',
        geometry_status: 'PLACEHOLDER',
        placement_status: 'UNKNOWN',
        mass_status: 'UNKNOWN',
        interface_status: 'UNKNOWN',
      },
      known_interfaces,
      dependency_highlights: { blocks_access_to, must_disconnect_before },
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
    prototype_status: (manifest as { prototype_status?: Record<string, string> }).prototype_status,
  }
}

export const timeline = timelineStore as unknown as TimelineDoc

export const simulationMeta = {
  store: simStore.store,
  status: simStore.status,
  honesty: simStore.honesty,
  wheelbase_m: simStore.wheelbase_m,
  wheelbase_status: simStore.wheelbase_status,
  rejected_sample_masses_kg: simStore.rejected_sample_masses_kg,
  records: simStore.records as Rec<SimRecord>,
}

export const simulation: SimulationDoc = {
  store: 'SIM',
  id: 'SIM-AXLE-LOAD-R2',
  title: 'Live Mass & CG Engine',
  status: String(simStore.status),
  honesty: String(simStore.honesty),
  required_before_enable: [
    'Every active component mass_kg PHYSICALLY_MEASURED or VERIFIED',
    'MEPQ-001 closed for ICE powertrain',
  ],
  demo_fields: {
    front_axle_delta_kg: null,
    rear_axle_delta_kg: null,
    cg_shift_mm: null,
  },
  interacting_component_id: null,
}
