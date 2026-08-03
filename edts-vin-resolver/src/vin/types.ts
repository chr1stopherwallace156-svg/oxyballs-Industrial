/** EDTS VIN resolver domain types (DT-D067). Missing values are null — never guessed. */

export type FieldComparisonStatus = 'MATCH' | 'MISMATCH' | 'UNKNOWN' | 'NOT_APPLICABLE'

export type ResolutionOutcome =
  | 'EXACT_CANDIDATE'
  | 'PARTIAL_CANDIDATE'
  | 'AMBIGUOUS'
  | 'NO_MATCH'
  | 'INVALID_VIN'
  | 'DECODER_ERROR'
  | 'NETWORK_ERROR'

export type VehicleLifecycleStatus =
  | 'VIN_DECODED'
  | 'CONFIGURATION_CANDIDATE'
  | 'PHYSICAL_VERIFICATION_REQUIRED'
  | 'CONFIGURATION_CONFIRMED'
  | 'REJECTED'

export type VinValidationResult = {
  ok: boolean
  vin: string | null
  errors: string[]
  checkDigitValid: boolean | null
}

export type VpicFlatResult = Record<string, string | number | null | undefined>

export type VinDecodeEvidence = {
  provider: 'NHTSA_VPIC'
  endpoint: string
  retrieved_at_utc: string
  request_vin: string
  response_vin: string | null
  content_sha256: string
  http_status: number
  count: number | null
  message: string | null
  search_criteria: string | null
  error_code: string | null
  error_text: string | null
  additional_error_text: string | null
  raw: unknown
}

export type NormalizedVehicleIdentity = {
  vin: string
  manufacturer: string | null
  make: string | null
  model: string | null
  modelYear: number | null
  series: string | null
  trim: string | null
  bodyClass: string | null
  vehicleType: string | null
  cabType: string | null
  driveType: string | null
  axleConfiguration: string | null
  numberOfAxles: number | null
  gvwr: string | null
  gvwrClass: string | null
  engineManufacturer: string | null
  engineModel: string | null
  engineCylinders: number | null
  displacementLiters: number | null
  fuelTypePrimary: string | null
  plantCity: string | null
  plantState: string | null
  plantCountry: string | null
  errorCode: string | null
  errorText: string | null
  /** Original Variable-style flat keys retained for audit */
  retained_raw_keys: Record<string, string | null>
}

export type ConfigurationExpectation = {
  configuration_id: string
  display_name: string
  make: string[]
  manufacturer_contains?: string[]
  model_year: number
  model_patterns: string[]
  body_class_patterns: string[]
  body_class_reject_patterns?: string[]
  cab_type_patterns: string[]
  drive_type_patterns: string[]
  rear_wheels?: string | null
  wheelbase_in?: number | null
  cab_to_axle_in?: number | null
  notes?: string[]
}

export type FieldComparison = {
  field: string
  expected: string | number | null
  observed: string | number | null
  status: FieldComparisonStatus
  mandatory: boolean
}

export type ConfigurationComparison = {
  configuration_id: string
  display_name: string
  fields: FieldComparison[]
  match_count: number
  mismatch_count: number
  unknown_count: number
  mandatory_mismatches: string[]
  score: number
  rank_key: string
  reference_result:
    | 'EXACT_CANDIDATE'
    | 'PARTIAL_CANDIDATE'
    | 'REJECTED_REFERENCE_MATCH'
    | 'INSUFFICIENT_EVIDENCE'
}

export type ConfigurationCandidate = {
  configuration_id: string
  score: number
  comparison: ConfigurationComparison
}

export type VerificationRequirement = {
  id: string
  description: string
  required: boolean
  reason: string
}

export type VinResolutionReport = {
  vin: string
  vin_validation: 'PASS' | 'FAIL'
  decode_provider: 'NHTSA vPIC'
  decode_status: 'SUCCESS' | 'FAIL' | 'OFFLINE_CACHE' | 'SKIPPED'
  outcome: ResolutionOutcome
  identity: NormalizedVehicleIdentity | null
  comparisons: ConfigurationComparison[]
  top_candidates: ConfigurationCandidate[]
  conflicts: string[]
  unknowns: string[]
  verification_requirements: VerificationRequirement[]
  confidence_explanation: string[]
  honesty: string[]
  vehicle_id: string | null
  evidence_path: string | null
  vehicle_path: string | null
  report_path: string | null
  lifecycle_status: VehicleLifecycleStatus | null
  compare_filter: string | null
}

export type VehicleRecord = {
  vehicle_id: string
  vin: string
  lifecycle_status: VehicleLifecycleStatus
  normalized_identity: NormalizedVehicleIdentity
  evidence_ref: string
  evidence_sha256: string
  candidate_configurations: ConfigurationCandidate[]
  conflicts: string[]
  unknown_fields: string[]
  required_physical_verification: VerificationRequirement[]
  resolution_outcome: ResolutionOutcome
  created_at: string
  updated_at: string
  decision: 'DT-D067'
  geometry_verified: false
  configuration_confirmed_from_vin_alone: false
}

export type ResolveVinOptions = {
  vin: string
  offline?: boolean
  forceRefresh?: boolean
  compareConfigurationId?: string | null
  json?: boolean
  dataRoot?: string
  fetchImpl?: typeof fetch
  now?: () => Date
  maxRetries?: number
  timeoutMs?: number
}
