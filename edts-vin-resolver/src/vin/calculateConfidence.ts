import type {
  ConfigurationComparison,
  NormalizedVehicleIdentity,
  ResolutionOutcome,
  VerificationRequirement,
  VehicleLifecycleStatus,
} from './types.js'

export function calculateConfidenceExplanation(
  identity: NormalizedVehicleIdentity | null,
  outcome: ResolutionOutcome,
  comparisons: ConfigurationComparison[],
): string[] {
  const lines: string[] = [
    'VIN decoding uses manufacturer-reported NHTSA vPIC data only.',
    'Absent fields are UNKNOWN — never invented.',
    'VIN evidence alone cannot mark configuration CONFIGURATION_CONFIRMED or geometry Verified.',
  ]

  if (!identity) {
    lines.push('No normalized identity available.')
    return lines
  }

  lines.push(`Outcome: ${outcome}`)
  const top = comparisons[0]
  if (top) {
    lines.push(
      `Top comparison ${top.configuration_id}: matches=${top.match_count} mismatches=${top.mismatch_count} unknowns=${top.unknown_count} score=${top.score}`,
    )
    if (top.mandatory_mismatches.length) {
      lines.push(`Mandatory mismatches: ${top.mandatory_mismatches.join(', ')}`)
    }
  }

  if (identity.errorText) {
    lines.push(`Decoder note: ${identity.errorText}`)
  }

  lines.push(
    'Further physical verification required before engineering twin claims (labels, WB/CA, axle, drivetrain observation).',
  )
  return lines
}

export function buildVerificationRequirements(
  outcome: ResolutionOutcome,
  comparisons: ConfigurationComparison[],
): VerificationRequirement[] {
  const reqs: VerificationRequirement[] = [
    {
      id: 'certification-label-photograph',
      description: 'Driver-side door jamb / certification label photograph',
      required: true,
      reason: 'NHTSA notes labels may carry information not present in vPIC',
    },
    {
      id: 'wheelbase-measurement',
      description: 'Wheelbase measurement (laser tape / caliper method)',
      required: true,
      reason: 'Exact WB is not reliably proven by VIN decode alone',
    },
    {
      id: 'cab-to-axle-measurement',
      description: 'Cab-to-axle (CA) measurement',
      required: true,
      reason: 'CA typically absent from vPIC for chassis-cab packages',
    },
    {
      id: 'axle-configuration-observation',
      description: 'Axle configuration observation (e.g. DRW vs SRW)',
      required: true,
      reason: 'Rear-wheel configuration must be physically confirmed',
    },
    {
      id: 'drivetrain-observation',
      description: 'Drivetrain observation (4x2 vs 4x4)',
      required: true,
      reason: 'Confirm decoded DriveType against vehicle',
    },
  ]

  const rejected = comparisons.some((c) => c.reference_result === 'REJECTED_REFERENCE_MATCH')
  if (rejected || outcome === 'NO_MATCH') {
    reqs.push({
      id: 'cross-configuration-documentation',
      description: 'Document that this VIN is outside the EDTS reference configuration lock',
      required: true,
      reason: 'Manufacturer/model mismatch against registered CFG expectations',
    })
  }

  return reqs
}

export function lifecycleFromOutcome(outcome: ResolutionOutcome): VehicleLifecycleStatus {
  switch (outcome) {
    case 'EXACT_CANDIDATE':
    case 'PARTIAL_CANDIDATE':
    case 'AMBIGUOUS':
      return 'PHYSICAL_VERIFICATION_REQUIRED'
    case 'NO_MATCH':
      return 'REJECTED'
    case 'INVALID_VIN':
    case 'DECODER_ERROR':
    case 'NETWORK_ERROR':
      return 'REJECTED'
    default:
      return 'VIN_DECODED'
  }
}

/** Map CLI-facing reference result label for the locked CFG comparison. */
export function referenceMatchLabel(
  comparison: ConfigurationComparison | undefined,
): string {
  if (!comparison) return 'NO_COMPARISON'
  return comparison.reference_result
}
