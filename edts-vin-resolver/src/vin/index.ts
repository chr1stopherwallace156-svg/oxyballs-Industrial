export { validateVin, normalizeVinInput, computeVinCheckDigit } from './validateVin.js'
export {
  decodeVpic,
  buildVpicUrl,
  toEvidence,
  extractFlatResult,
  VpicNetworkError,
  VpicDecoderError,
  VPIC_EXTENDED_BASE,
} from './decodeVpic.js'
export { normalizeVpic, matchesAnyPattern, normalizeForCompare } from './normalizeVpic.js'
export {
  compareIdentityToConfiguration,
  rankComparisons,
  resolveOutcome,
  summarizeConflicts,
  summarizeUnknowns,
} from './resolveConfiguration.js'
export {
  calculateConfidenceExplanation,
  buildVerificationRequirements,
  lifecycleFromOutcome,
} from './calculateConfidence.js'
export {
  persistRawEvidence,
  loadCachedEvidence,
  persistVehicleRecord,
  persistMarkdownReport,
  vehicleIdForVin,
  evidencePath,
  vehiclePath,
  reportPath,
} from './persistVinEvidence.js'
export { loadConfigurations } from './loadConfigurations.js'
export { formatCliReport, formatMarkdownReport } from './report.js'
export { resolveVin, defaultDataRoot } from './pipeline.js'
export type * from './types.js'
