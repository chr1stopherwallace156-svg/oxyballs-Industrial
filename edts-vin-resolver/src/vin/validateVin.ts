import type { VinValidationResult } from './types.js'

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/

/** ISO 3779 transliteration for check digit. */
const TRANSLITERATION: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
  '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
}

const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

export function normalizeVinInput(raw: string): string {
  return raw.trim().toUpperCase().replace(/[\s-]/g, '')
}

export function computeVinCheckDigit(vin17: string): string {
  let sum = 0
  for (let i = 0; i < 17; i++) {
    const ch = vin17[i]!
    const value = TRANSLITERATION[ch]
    if (value === undefined) throw new Error(`Cannot transliterate '${ch}'`)
    sum += value * WEIGHTS[i]!
  }
  const rem = sum % 11
  return rem === 10 ? 'X' : String(rem)
}

export function validateVin(raw: string): VinValidationResult {
  const errors: string[] = []
  const vin = normalizeVinInput(raw)

  if (!vin) {
    return { ok: false, vin: null, errors: ['VIN is empty'], checkDigitValid: null }
  }
  if (vin.length !== 17) {
    errors.push(`VIN length must be 17 (got ${vin.length})`)
  }
  if (/[IOQ]/.test(vin)) {
    errors.push('VIN must not contain I, O, or Q')
  }
  if (!/^[A-Z0-9]+$/.test(vin)) {
    errors.push('VIN must contain only A–Z and 0–9')
  } else if (vin.length === 17 && !VIN_REGEX.test(vin)) {
    errors.push('VIN contains forbidden characters')
  }

  let checkDigitValid: boolean | null = null
  if (errors.length === 0 && VIN_REGEX.test(vin)) {
    const expected = computeVinCheckDigit(vin)
    const actual = vin[8]!
    checkDigitValid = expected === actual
    if (!checkDigitValid) {
      errors.push(`Invalid check digit at position 9 (expected ${expected}, got ${actual})`)
    }
  }

  return {
    ok: errors.length === 0,
    vin: errors.length === 0 ? vin : vin || null,
    errors,
    checkDigitValid,
  }
}
