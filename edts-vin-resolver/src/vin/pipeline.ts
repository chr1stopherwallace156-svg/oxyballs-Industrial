import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  buildVerificationRequirements,
  calculateConfidenceExplanation,
  lifecycleFromOutcome,
} from './calculateConfidence.js'
import { decodeVpic, VpicDecoderError, VpicNetworkError } from './decodeVpic.js'
import { loadConfigurations } from './loadConfigurations.js'
import { normalizeVpic } from './normalizeVpic.js'
import {
  loadCachedEvidence,
  persistMarkdownReport,
  persistRawEvidence,
  persistVehicleRecord,
  vehicleIdForVin,
} from './persistVinEvidence.js'
import { formatMarkdownReport } from './report.js'
import {
  compareIdentityToConfiguration,
  rankComparisons,
  resolveOutcome,
  summarizeConflicts,
  summarizeUnknowns,
} from './resolveConfiguration.js'
import type {
  ResolveVinOptions,
  VehicleRecord,
  VinResolutionReport,
} from './types.js'
import { validateVin } from './validateVin.js'

export function defaultDataRoot(): string {
  const here = path.dirname(fileURLToPath(import.meta.url))
  return path.resolve(here, '..', '..', 'data')
}

const HONESTY = [
  'VIN decoding does not prove physical geometry.',
  'Absent vPIC fields are UNKNOWN — not invented.',
  'CONFIGURATION_CONFIRMED is forbidden from VIN evidence alone.',
  'No unsupported engineering claims (torque, frame holes, mass, measured WB/CA).',
]

function baseFail(
  vin: string,
  options: ResolveVinOptions,
  outcome: VinResolutionReport['outcome'],
  decode_status: VinResolutionReport['decode_status'],
  conflicts: string[],
  vin_validation: 'PASS' | 'FAIL' = 'PASS',
): VinResolutionReport {
  return {
    vin,
    vin_validation,
    decode_provider: 'NHTSA vPIC',
    decode_status,
    outcome,
    identity: null,
    comparisons: [],
    top_candidates: [],
    conflicts,
    unknowns: [],
    verification_requirements: [],
    confidence_explanation: conflicts,
    honesty: HONESTY,
    vehicle_id: null,
    evidence_path: null,
    vehicle_path: null,
    report_path: null,
    lifecycle_status: outcome === 'INVALID_VIN' ? null : 'REJECTED',
    compare_filter: options.compareConfigurationId ?? null,
  }
}

export async function resolveVin(options: ResolveVinOptions): Promise<{
  report: VinResolutionReport
  exitCode: number
}> {
  const dataRoot = options.dataRoot ?? defaultDataRoot()
  const now = options.now ?? (() => new Date())
  const validation = validateVin(options.vin)

  if (!validation.ok || !validation.vin) {
    return {
      report: baseFail(
        validation.vin ?? options.vin.trim().toUpperCase(),
        options,
        'INVALID_VIN',
        'SKIPPED',
        validation.errors,
        'FAIL',
      ),
      exitCode: 1,
    }
  }

  const vin = validation.vin

  let configs
  try {
    configs = await loadConfigurations(dataRoot, options.compareConfigurationId)
  } catch (err) {
    return {
      report: baseFail(vin, options, 'DECODER_ERROR', 'SKIPPED', [
        err instanceof Error ? err.message : String(err),
      ]),
      exitCode: 4,
    }
  }

  let evidence
  let decodeStatus: VinResolutionReport['decode_status']

  try {
    if (options.offline) {
      const cached = await loadCachedEvidence(dataRoot, vin)
      if (!cached) {
        return {
          report: baseFail(vin, options, 'NETWORK_ERROR', 'FAIL', [
            `No cached evidence for ${vin} (offline mode)`,
          ]),
          exitCode: 2,
        }
      }
      evidence = cached
      decodeStatus = 'OFFLINE_CACHE'
    } else {
      const cached = options.forceRefresh
        ? null
        : await loadCachedEvidence(dataRoot, vin)
      // Always refresh from network unless offline; forceRefresh is explicit.
      // Cached file is overwritten atomically after successful decode.
      void cached
      evidence = await decodeVpic({
        vin,
        fetchImpl: options.fetchImpl,
        now,
        maxRetries: options.maxRetries,
        timeoutMs: options.timeoutMs,
      })
      decodeStatus = 'SUCCESS'
    }
  } catch (err) {
    if (err instanceof VpicNetworkError) {
      return {
        report: baseFail(vin, options, 'NETWORK_ERROR', 'FAIL', [err.message]),
        exitCode: 2,
      }
    }
    if (err instanceof VpicDecoderError) {
      return {
        report: baseFail(vin, options, 'DECODER_ERROR', 'FAIL', [err.message]),
        exitCode: 2,
      }
    }
    throw err
  }

  let evidenceFile: string
  try {
    evidenceFile = await persistRawEvidence(dataRoot, evidence)
  } catch (err) {
    return {
      report: {
        ...baseFail(vin, options, 'DECODER_ERROR', decodeStatus, [
          err instanceof Error ? err.message : String(err),
        ]),
        decode_status: decodeStatus,
      },
      exitCode: 3,
    }
  }

  const identity = normalizeVpic(evidence, vin)
  const comparisons = rankComparisons(
    configs.map((cfg) => compareIdentityToConfiguration(identity, cfg)),
  )
  const outcome = resolveOutcome(comparisons)
  const conflicts = summarizeConflicts(comparisons)
  const unknowns = summarizeUnknowns(identity, comparisons)
  const verification = buildVerificationRequirements(outcome, comparisons)
  let lifecycle = lifecycleFromOutcome(outcome)
  if (lifecycle === 'CONFIGURATION_CONFIRMED') {
    lifecycle = 'PHYSICAL_VERIFICATION_REQUIRED'
  }

  const top_candidates = comparisons
    .filter(
      (c) =>
        c.reference_result === 'EXACT_CANDIDATE' ||
        c.reference_result === 'PARTIAL_CANDIDATE',
    )
    .map((c) => ({
      configuration_id: c.configuration_id,
      score: c.score,
      comparison: c,
    }))

  const vehicle_id = vehicleIdForVin(vin)
  const updated = now().toISOString()

  const record: VehicleRecord = {
    vehicle_id,
    vin,
    lifecycle_status: lifecycle,
    normalized_identity: identity,
    evidence_ref: evidenceFile,
    evidence_sha256: evidence.content_sha256,
    candidate_configurations: top_candidates,
    conflicts,
    unknown_fields: unknowns,
    required_physical_verification: verification,
    resolution_outcome: outcome,
    created_at: updated,
    updated_at: updated,
    decision: 'DT-D067',
    geometry_verified: false,
    configuration_confirmed_from_vin_alone: false,
  }

  try {
    const vehicleFile = await persistVehicleRecord(dataRoot, record)
    const reportDraft: VinResolutionReport = {
      vin,
      vin_validation: 'PASS',
      decode_provider: 'NHTSA vPIC',
      decode_status: decodeStatus,
      outcome,
      identity,
      comparisons,
      top_candidates,
      conflicts,
      unknowns,
      verification_requirements: verification,
      confidence_explanation: calculateConfidenceExplanation(
        identity,
        outcome,
        comparisons,
      ),
      honesty: HONESTY,
      vehicle_id,
      evidence_path: evidenceFile,
      vehicle_path: vehicleFile,
      report_path: null,
      lifecycle_status: lifecycle,
      compare_filter: options.compareConfigurationId ?? null,
    }
    const reportFile = await persistMarkdownReport(
      dataRoot,
      vin,
      formatMarkdownReport(reportDraft),
    )
    reportDraft.report_path = reportFile
    return { report: reportDraft, exitCode: 0 }
  } catch (err) {
    return {
      report: {
        vin,
        vin_validation: 'PASS',
        decode_provider: 'NHTSA vPIC',
        decode_status: decodeStatus,
        outcome,
        identity,
        comparisons,
        top_candidates,
        conflicts: [
          ...conflicts,
          err instanceof Error ? err.message : String(err),
        ],
        unknowns,
        verification_requirements: verification,
        confidence_explanation: calculateConfidenceExplanation(
          identity,
          outcome,
          comparisons,
        ),
        honesty: HONESTY,
        vehicle_id,
        evidence_path: evidenceFile,
        vehicle_path: null,
        report_path: null,
        lifecycle_status: lifecycle,
        compare_filter: options.compareConfigurationId ?? null,
      },
      exitCode: 3,
    }
  }
}
