import { describe, expect, it } from 'vitest'
import { computeVinCheckDigit, validateVin } from '../../src/vin/validateVin.js'

describe('validateVin', () => {
  it('accepts a valid 17-character VIN with correct check digit', () => {
    const r = validateVin('1HTKHPVK8KH805188')
    expect(r.ok).toBe(true)
    expect(r.vin).toBe('1HTKHPVK8KH805188')
    expect(r.checkDigitValid).toBe(true)
  })

  it('rejects invalid length', () => {
    const r = validateVin('1HTKHPVK8KH80518')
    expect(r.ok).toBe(false)
    expect(r.errors.some((e) => /length/i.test(e))).toBe(true)
  })

  it('rejects forbidden characters I/O/Q', () => {
    expect(validateVin('1IOQHPVK8KH805188').ok).toBe(false)
    expect(validateVin('1HTKHPVK8KH80518O').errors.join(' ')).toMatch(/I, O, or Q/)
  })

  it('rejects invalid check digit', () => {
    const base = '1HTKHPVK8KH805188'
    const bad = `${base.slice(0, 8)}0${base.slice(9)}`
    const r = validateVin(bad)
    expect(r.ok).toBe(false)
    expect(r.checkDigitValid).toBe(false)
  })

  it('normalizes whitespace and lowercase', () => {
    const r = validateVin(' 1htkhpvk8kh805188 ')
    expect(r.ok).toBe(true)
    expect(r.vin).toBe('1HTKHPVK8KH805188')
  })

  it('computeVinCheckDigit matches position 9', () => {
    const vin = '1HTKHPVK8KH805188'
    expect(computeVinCheckDigit(vin)).toBe(vin[8])
  })
})
