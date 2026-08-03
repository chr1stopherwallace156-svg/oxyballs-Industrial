export type DataStatus =
  | 'VERIFIED'
  | 'PHYSICALLY_MEASURED'
  | 'ESTIMATED'
  | 'PLACEHOLDER_GEOMETRY'
  | 'DESIGN_PROPOSAL'
  | 'UNKNOWN'
  | 'BLOCKED'

export type VehicleState = 'FACTORY_ICE' | 'DECONSTRUCTION' | 'EV_PROPOSAL'
export type ComponentFamily = 'FACTORY' | 'EV_PROPOSAL'
export type DeconGroup = 'RETAINED' | 'EXTRACTED' | 'EV_PROPOSAL'
export type ProcedureEligibility =
  | 'ELIGIBLE'
  | 'PROVISIONAL_ONLY'
  | 'PROPOSAL_ONLY'
  | 'BLOCKED'

export type ViewMode = 'INSPECT' | 'HEATMAP' | 'TIMELINE' | 'SIMULATION'

export type EvidenceClaimStatus =
  | 'ASSERTION_VERIFIED'
  | 'ASSERTION_EXTRACTED'
  | 'DOCUMENT_SUPPORTED'
  | 'OPERATOR_CANDIDATE'
  | 'CANDIDATE_UNVERIFIED'
  | 'NOT_ACQUIRED'
  | 'UNKNOWN'
  | 'L3_PROPOSAL_ONLY'

export interface EvidenceLedgerEntry {
  claim: string
  source_id: string
  status: EvidenceClaimStatus
}

export interface KnownInterface {
  interface_id: string
  class: string
  target_component: string | null
  status: string
}

export interface MissingProperty {
  property: string
  knowledge_gap_id: string | null
  required_action: string
}

export interface MepqBlocker {
  domain: 'MANUFACTURING' | 'ENGINEERING' | 'PACKAGING' | 'QUALITY' | 'ELECTRICAL'
  code: string
  description: string
}

export interface GraphEdge {
  edge_id: string
  class: string
  interface_id: string | null
  source_comp_id: string
  target_comp_id: string | null
  status: string
  kind: string
}

export interface SimRecord {
  sim_id: string
  comp_id: string
  mass_kg: number | null
  cg_m: number[] | null
  inertia: null
  front_axle_share: number | null
  rear_axle_share: number | null
  mass_status: string
  mass_source: string | null
}

export interface TwinComponent {
  id: string
  display_name: string
  family: ComponentFamily
  category: string
  scene_group: string
  decon_group: DeconGroup
  data_status: DataStatus
  procedure_eligibility: ProcedureEligibility
  data_classification: string
  configuration_applicability: string
  evidence_ledger: EvidenceLedgerEntry[]
  known_interfaces: KnownInterface[]
  missing_properties: MissingProperty[]
  mepq_blockers: MepqBlocker[]
  dependency_highlights: {
    blocks_access_to: string[]
    must_disconnect_before: string[]
  }
  layer: string
  visible_in: VehicleState[]
  removable: boolean
  decon_intent?: string
  geometry_role: string
  explode_vector: number[]
  geometry_type: string
  mass_kg: number | null
  cg_m: number[] | null
  mass_status: string
  geo_id: string
  evd_id: string
  sim_id: string
  maturity: {
    identity_status: string
    geometry_status: string
    placement_status: string
    mass_status: string
    interface_status: string
  }
  /** Alias used in passport UI — same object as maturity. */
  maturity_matrix: {
    identity_status: string
    geometry_status: string
    placement_status: string
    mass_status: string
    interface_status: string
  }
  confidence_overlay_color?: string
}

export interface SceneTreeNode {
  id: string
  label: string
  component_ids: string[]
}

export interface TimelineStep {
  id: string
  label: string
  state: VehicleState
  action: string
  remove: string[]
  focus?: string
  add_proposal?: boolean
  note: string
}

export interface TimelineDoc {
  store: string
  id: string
  title: string
  honesty: string
  kind?: string
  steps: TimelineStep[]
}

export interface SimulationDoc {
  store: string
  id: string
  title: string
  status: string
  honesty: string
  required_before_enable: string[]
  demo_fields: {
    front_axle_delta_kg: number | null
    rear_axle_delta_kg: number | null
    cg_shift_mm: number | null
  }
  interacting_component_id: string | null
}

export interface Catalog {
  release: string
  decision: string
  schema: string
  architecture: string[]
  locked_configuration: {
    proposal_configuration_id: string
    kernel_configuration_id: string
    vehicle_instance_id: string
    summary: string
    model_year: number
  }
  honesty: {
    note: string
    known_dimensions_in: Record<
      string,
      { value: number; status: string; source: string }
    >
    handoff_sample_rejected: string[]
  }
  badge_colors: Record<DataStatus, string>
  states: VehicleState[]
  scene_tree: SceneTreeNode[]
  search_aliases: Record<string, string[]>
  chrome_policy: string
  components: TwinComponent[]
  prototype_status?: Record<string, string>
  storage_tiers?: Record<string, string>
}

/** Handoff badge / confidence heatmap colors. */
export const BADGE_COLORS: Record<DataStatus, string> = {
  VERIFIED: '#10B981',
  PHYSICALLY_MEASURED: '#06B6D4',
  ESTIMATED: '#F59E0B',
  PLACEHOLDER_GEOMETRY: '#6B7280',
  DESIGN_PROPOSAL: '#8B5CF6',
  UNKNOWN: '#EF4444',
  BLOCKED: '#DC2626',
}

/** Heatmap rank: green → red by research completeness (not confidence %). */
export const HEATMAP_COLORS: Record<DataStatus, string> = {
  VERIFIED: '#10B981',
  PHYSICALLY_MEASURED: '#34D399',
  ESTIMATED: '#F59E0B',
  DESIGN_PROPOSAL: '#FB923C',
  PLACEHOLDER_GEOMETRY: '#F97316',
  UNKNOWN: '#EF4444',
  BLOCKED: '#991B1B',
}

export const IN_TO_M = 0.0254
