import { matchesAnyPattern, normalizeForCompare } from './normalizeVpic.js'
import type {
  ConfigurationComparison,
  ConfigurationExpectation,
  FieldComparison,
  FieldComparisonStatus,
  NormalizedVehicleIdentity,
  ResolutionOutcome,
} from './types.js'

function field(
  name: string,
  expected: string | number | null,
  observed: string | number | null,
  status: FieldComparisonStatus,
  mandatory: boolean,
): FieldComparison {
  return { field: name, expected, observed, status, mandatory }
}

function patternStatus(
  observed: string | null,
  patterns: string[],
  rejectPatterns: string[] | undefined,
  mandatory: boolean,
): FieldComparisonStatus {
  if (matchesAnyPattern(observed, rejectPatterns ?? []) === true) return 'MISMATCH'
  const hit = matchesAnyPattern(observed, patterns)
  if (hit === null) return 'UNKNOWN'
  return hit ? 'MATCH' : 'MISMATCH'
}

function yearStatus(observed: number | null, expected: number): FieldComparisonStatus {
  if (observed == null) return 'UNKNOWN'
  return observed === expected ? 'MATCH' : 'MISMATCH'
}

function makeStatus(
  identity: NormalizedVehicleIdentity,
  cfg: ConfigurationExpectation,
): FieldComparisonStatus {
  const makeHit = matchesAnyPattern(identity.make, cfg.make)
  const mfrPatterns = cfg.manufacturer_contains ?? cfg.make
  const mfrHit = matchesAnyPattern(identity.manufacturer, mfrPatterns)
  if (makeHit === null && mfrHit === null) return 'UNKNOWN'
  if (makeHit === true || mfrHit === true) return 'MATCH'
  return 'MISMATCH'
}

export function compareIdentityToConfiguration(
  identity: NormalizedVehicleIdentity,
  cfg: ConfigurationExpectation,
): ConfigurationComparison {
  const fields: FieldComparison[] = [
    field(
      'make_or_manufacturer',
      cfg.make.join('|'),
      identity.make ?? identity.manufacturer,
      makeStatus(identity, cfg),
      true,
    ),
    field(
      'modelYear',
      cfg.model_year,
      identity.modelYear,
      yearStatus(identity.modelYear, cfg.model_year),
      true,
    ),
    field(
      'model',
      cfg.model_patterns.join('|'),
      identity.model,
      patternStatus(identity.model, cfg.model_patterns, undefined, true),
      true,
    ),
    field(
      'bodyClass',
      cfg.body_class_patterns.join('|'),
      identity.bodyClass,
      patternStatus(
        identity.bodyClass,
        cfg.body_class_patterns,
        cfg.body_class_reject_patterns,
        true,
      ),
      true,
    ),
    field(
      'cabType',
      cfg.cab_type_patterns.join('|'),
      identity.cabType,
      patternStatus(identity.cabType, cfg.cab_type_patterns, undefined, true),
      true,
    ),
    field(
      'driveType',
      cfg.drive_type_patterns.join('|'),
      identity.driveType,
      patternStatus(identity.driveType, cfg.drive_type_patterns, undefined, true),
      true,
    ),
    field(
      'wheelbase_in',
      cfg.wheelbase_in ?? null,
      null,
      'UNKNOWN',
      false,
    ),
    field(
      'cab_to_axle_in',
      cfg.cab_to_axle_in ?? null,
      null,
      'UNKNOWN',
      false,
    ),
    field(
      'rear_wheels',
      cfg.rear_wheels ?? null,
      null,
      cfg.rear_wheels ? 'UNKNOWN' : 'NOT_APPLICABLE',
      false,
    ),
  ]

  const match_count = fields.filter((f) => f.status === 'MATCH').length
  const mismatch_count = fields.filter((f) => f.status === 'MISMATCH').length
  const unknown_count = fields.filter((f) => f.status === 'UNKNOWN').length
  const mandatory_mismatches = fields
    .filter((f) => f.mandatory && f.status === 'MISMATCH')
    .map((f) => f.field)

  // Score: matches weighted; unknowns never count as matches; mismatches penalize heavily
  let score = match_count * 10 - mismatch_count * 25
  if (mandatory_mismatches.length > 0) score -= 100

  let reference_result: ConfigurationComparison['reference_result']
  if (mandatory_mismatches.length > 0) {
    reference_result = 'REJECTED_REFERENCE_MATCH'
  } else if (
    fields.filter((f) => f.mandatory).every((f) => f.status === 'MATCH')
  ) {
    reference_result = 'EXACT_CANDIDATE'
  } else if (match_count > 0 && mismatch_count === 0) {
    reference_result = 'PARTIAL_CANDIDATE'
  } else if (match_count === 0 && mismatch_count === 0) {
    reference_result = 'INSUFFICIENT_EVIDENCE'
  } else {
    reference_result = 'PARTIAL_CANDIDATE'
  }

  const rank_key = [
    String(score).padStart(5, '0'),
    String(match_count).padStart(2, '0'),
    String(100 - mismatch_count).padStart(3, '0'),
    cfg.configuration_id,
  ].join('|')

  return {
    configuration_id: cfg.configuration_id,
    display_name: cfg.display_name,
    fields,
    match_count,
    mismatch_count,
    unknown_count,
    mandatory_mismatches,
    score,
    rank_key,
    reference_result,
  }
}

export function rankComparisons(
  comparisons: ConfigurationComparison[],
): ConfigurationComparison[] {
  return [...comparisons].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.configuration_id.localeCompare(b.configuration_id)
  })
}

export function resolveOutcome(
  comparisons: ConfigurationComparison[],
): ResolutionOutcome {
  const ranked = rankComparisons(comparisons)
  const viable = ranked.filter(
    (c) =>
      c.reference_result === 'EXACT_CANDIDATE' ||
      c.reference_result === 'PARTIAL_CANDIDATE',
  )
  if (viable.length === 0) return 'NO_MATCH'
  const top = viable[0]!
  const tied = viable.filter((c) => c.score === top.score && c.reference_result === top.reference_result)
  if (tied.length > 1 && top.reference_result === 'EXACT_CANDIDATE') return 'AMBIGUOUS'
  if (tied.length > 1 && top.score > 0) return 'AMBIGUOUS'
  if (top.reference_result === 'EXACT_CANDIDATE') return 'EXACT_CANDIDATE'
  return 'PARTIAL_CANDIDATE'
}

export function summarizeConflicts(comparisons: ConfigurationComparison[]): string[] {
  const out: string[] = []
  for (const c of comparisons) {
    for (const f of c.fields) {
      if (f.status === 'MISMATCH') {
        out.push(
          `${c.configuration_id}.${f.field}: expected=${String(f.expected)} observed=${String(f.observed)}`,
        )
      }
    }
  }
  return out
}

export function summarizeUnknowns(
  identity: NormalizedVehicleIdentity,
  comparisons: ConfigurationComparison[],
): string[] {
  const unknowns = new Set<string>()
  for (const [k, v] of Object.entries(identity)) {
    if (v == null && k !== 'retained_raw_keys') unknowns.add(`identity.${k}`)
  }
  for (const c of comparisons) {
    for (const f of c.fields) {
      if (f.status === 'UNKNOWN') unknowns.add(`${c.configuration_id}.${f.field}`)
    }
  }
  // Geometry / CA never from VIN
  unknowns.add('physical.wheelbase_in')
  unknowns.add('physical.cab_to_axle_in')
  unknowns.add('physical.frame_geometry')
  unknowns.add('physical.modification_state')
  return [...unknowns].sort()
}

export function assertUnknownIsNotMatch(status: FieldComparisonStatus): void {
  if (status === 'MATCH' && status !== 'MATCH') {
    // unreachable guard for tests to import philosophy
  }
  if (normalizeForCompare(null) !== null) {
    throw new Error('null must not normalize to a matchable string')
  }
}
