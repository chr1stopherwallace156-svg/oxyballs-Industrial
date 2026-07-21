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

export interface TwinComponent {
  id: string
  display_name: string
  family: ComponentFamily
  category: string
  data_status: DataStatus
  configuration_applicability: string
  evidence_status: string
  known_interfaces: string[]
  missing_properties: string[]
  mepq_blockers: string[]
  layer: string
  visible_in: VehicleState[]
  removable: boolean
  decon_intent?: string
  geometry_role: string
}

export interface Catalog {
  release: string
  decision: string
  locked_configuration: {
    proposal_configuration_id: string
    kernel_configuration_id: string
    vehicle_instance_id: string
    summary: string
  }
  honesty: {
    note: string
    known_dimensions_in: Record<
      string,
      { value: number; status: string; source: string }
    >
  }
  states: VehicleState[]
  components: TwinComponent[]
}

/** Convert inches to meters for Three.js scene. */
export const IN_TO_M = 0.0254
