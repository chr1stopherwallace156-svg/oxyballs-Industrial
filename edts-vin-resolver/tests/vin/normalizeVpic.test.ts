import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { toEvidence } from '../../src/vin/decodeVpic.js'
import { normalizeVpic, matchesAnyPattern } from '../../src/vin/normalizeVpic.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

describe('normalizeVpic', () => {
  it('maps empty strings to null', () => {
    const payload = JSON.parse(
      readFileSync(path.join(root, 'fixtures/vpic/ford_f450_chassis_cab_synthetic.json'), 'utf8'),
    )
    const evidence = toEvidence('1FDUF4HT0KDA00001', 'fixture', 200, payload, new Date('2026-07-22T00:00:00Z'))
    const id = normalizeVpic(evidence, '1FDUF4HT0KDA00001')
    expect(id.make).toBe('FORD')
    expect(id.modelYear).toBe(2019)
    expect(id.cabType).toBe('Regular')
    expect(id.trim).toBe('XL')
    expect(id.engineModel).toBeNull()
    expect(id.gvwrClass).toBe('Class 4')
  })

  it('treats empty vPIC values as null — never guessed', () => {
    const payload = {
      Count: 1,
      Message: 'ok',
      Results: [
        {
          VIN: '1HTKHPVK8KH805188',
          Make: '',
          Model: '',
          ModelYear: '2019',
          ErrorCode: '0',
          ErrorText: '0 - VIN decoded clean. Check Digit (9th position) is correct',
        },
      ],
    }
    const evidence = toEvidence('1HTKHPVK8KH805188', 'fixture', 200, payload, new Date())
    const id = normalizeVpic(evidence, '1HTKHPVK8KH805188')
    expect(id.make).toBeNull()
    expect(id.model).toBeNull()
    expect(id.modelYear).toBe(2019)
  })

  it('UNKNOWN pattern match returns null (not true)', () => {
    expect(matchesAnyPattern(null, ['FORD'])).toBeNull()
  })
})
