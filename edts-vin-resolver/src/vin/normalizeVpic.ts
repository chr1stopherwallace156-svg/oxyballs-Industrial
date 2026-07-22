import type { NormalizedVehicleIdentity, VinDecodeEvidence, VpicFlatResult } from './types.js'
import { extractFlatResult } from './decodeVpic.js'

function emptyToNull(v: unknown): string | null {
  if (v == null) return null
  const s = String(v).trim()
  if (s === '' || /^not applicable$/i.test(s)) return null
  return s
}

function parseIntOrNull(v: unknown): number | null {
  const s = emptyToNull(v)
  if (s == null) return null
  const n = Number.parseInt(s, 10)
  return Number.isFinite(n) ? n : null
}

function parseFloatOrNull(v: unknown): number | null {
  const s = emptyToNull(v)
  if (s == null) return null
  const n = Number.parseFloat(s)
  return Number.isFinite(n) ? n : null
}

/** Prefer BodyCabType when CabType absent (vPIC Extended often uses BodyCabType). */
function resolveCabType(flat: VpicFlatResult): string | null {
  return emptyToNull(flat.CabType) ?? emptyToNull(flat.BodyCabType)
}

function extractGvwrClass(gvwr: string | null): string | null {
  if (!gvwr) return null
  const m = gvwr.match(/Class\s+(\d+)/i)
  return m ? `Class ${m[1]}` : null
}

const RETAIN_KEYS = [
  'Make',
  'MakeID',
  'Manufacturer',
  'ManufacturerId',
  'Model',
  'ModelID',
  'ModelYear',
  'Series',
  'Trim',
  'BodyClass',
  'VehicleType',
  'CabType',
  'BodyCabType',
  'DriveType',
  'AxleConfiguration',
  'Axles',
  'GVWR',
  'EngineManufacturer',
  'EngineModel',
  'EngineCylinders',
  'DisplacementL',
  'FuelTypePrimary',
  'PlantCity',
  'PlantState',
  'PlantCountry',
  'ErrorCode',
  'ErrorText',
  'AdditionalErrorText',
  'VIN',
] as const

export function normalizeVpic(
  evidence: VinDecodeEvidence,
  requestVin: string,
): NormalizedVehicleIdentity {
  const flat = extractFlatResult(evidence.raw)
  const gvwr = emptyToNull(flat.GVWR)

  const retained: Record<string, string | null> = {}
  for (const key of RETAIN_KEYS) {
    retained[key] = emptyToNull(flat[key])
  }

  return {
    vin: emptyToNull(flat.VIN) ?? requestVin,
    manufacturer: emptyToNull(flat.Manufacturer),
    make: emptyToNull(flat.Make),
    model: emptyToNull(flat.Model),
    modelYear: parseIntOrNull(flat.ModelYear),
    series: emptyToNull(flat.Series),
    trim: emptyToNull(flat.Trim),
    bodyClass: emptyToNull(flat.BodyClass),
    vehicleType: emptyToNull(flat.VehicleType),
    cabType: resolveCabType(flat),
    driveType: emptyToNull(flat.DriveType),
    axleConfiguration: emptyToNull(flat.AxleConfiguration),
    numberOfAxles: parseIntOrNull(flat.Axles),
    gvwr,
    gvwrClass: extractGvwrClass(gvwr),
    engineManufacturer: emptyToNull(flat.EngineManufacturer),
    engineModel: emptyToNull(flat.EngineModel),
    engineCylinders: parseIntOrNull(flat.EngineCylinders),
    displacementLiters: parseFloatOrNull(flat.DisplacementL),
    fuelTypePrimary: emptyToNull(flat.FuelTypePrimary),
    plantCity: emptyToNull(flat.PlantCity),
    plantState: emptyToNull(flat.PlantState),
    plantCountry: emptyToNull(flat.PlantCountry),
    errorCode: emptyToNull(flat.ErrorCode),
    errorText: emptyToNull(flat.ErrorText),
    retained_raw_keys: retained,
  }
}

/** Case-insensitive contains / synonym-aware token match for configuration comparison. */
export function normalizeForCompare(value: string | null | undefined): string | null {
  if (value == null) return null
  const s = value.trim().toLowerCase().replace(/\s+/g, ' ')
  return s === '' ? null : s
}

export function matchesAnyPattern(
  observed: string | null,
  patterns: string[],
): boolean | null {
  const o = normalizeForCompare(observed)
  if (o == null) return null
  return patterns.some((p) => {
    const pat = normalizeForCompare(p)
    if (!pat) return false
    return o.includes(pat) || pat.includes(o)
  })
}
