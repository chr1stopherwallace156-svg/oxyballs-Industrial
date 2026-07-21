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
}

export interface SceneTreeNode {
  id: string
  label: string
  component_ids: string[]
}

export interface Catalog {
  release: string
  decision: string
  schema: string
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
  components: TwinComponent[]
}

/** Handoff badge color table (UI chrome only — does not change evidence maturity). */
export const BADGE_COLORS: Record<DataStatus, string> = {
  VERIFIED: '#10B981',
  PHYSICALLY_MEASURED: '#06B6D4',
  ESTIMATED: '#F59E0B',
  PLACEHOLDER_GEOMETRY: '#6B7280',
  DESIGN_PROPOSAL: '#8B5CF6',
  UNKNOWN: '#EF4444',
  BLOCKED: '#DC2626',
}

/** Convert inches to meters for Three.js scene. */
export const IN_TO_M = 0.0254
