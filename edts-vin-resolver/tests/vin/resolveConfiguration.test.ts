import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { toEvidence } from '../../src/vin/decodeVpic.js'
import { normalizeVpic } from '../../src/vin/normalizeVpic.js'
import {
  compareIdentityToConfiguration,
  resolveOutcome,
  rankComparisons,
} from '../../src/vin/resolveConfiguration.js'
import type { ConfigurationExpectation } from '../../src/vin/types.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const cfg = JSON.parse(
  readFileSync(
    path.join(root, 'data/configurations/CFG-2019-F450-REG-CAB-4X2-60CA-DRW.json'),
    'utf8',
  ),
) as ConfigurationExpectation

describe('resolveConfiguration', () => {
  it('rejects manufacturer mismatch even when model year matches', () => {
    const payload = JSON.parse(
      readFileSync(path.join(root, 'fixtures/vpic/1HTKHPVK8KH805188.json'), 'utf8'),
    )
    const evidence = toEvidence('1HTKHPVK8KH805188', 'fixture', 200, payload, new Date())
    const id = normalizeVpic(evidence, '1HTKHPVK8KH805188')
    const cmp = compareIdentityToConfiguration(id, cfg)
    const make = cmp.fields.find((f) => f.field === 'make_or_manufacturer')!
    const year = cmp.fields.find((f) => f.field === 'modelYear')!
    expect(year.status).toBe('MATCH')
    expect(make.status).toBe('MISMATCH')
    expect(cmp.reference_result).toBe('REJECTED_REFERENCE_MATCH')
    expect(resolveOutcome([cmp])).toBe('NO_MATCH')
  })

  it('UNKNOWN does not equal MATCH', () => {
    const payload = {
      Count: 1,
      Message: 'ok',
      Results: [
        {
          VIN: '1FDUF4HT0KDA00001',
          Make: 'FORD',
          Manufacturer: 'FORD MOTOR COMPANY',
          Model: 'F-450',
          ModelYear: '2019',
          BodyClass: '',
          DriveType: '',
          BodyCabType: '',
          ErrorCode: '0',
          ErrorText: '0 - ok',
        },
      ],
    }
    const id = normalizeVpic(
      toEvidence('1FDUF4HT0KDA00001', 'fixture', 200, payload, new Date()),
      '1FDUF4HT0KDA00001',
    )
    const cmp = compareIdentityToConfiguration(id, cfg)
    const body = cmp.fields.find((f) => f.field === 'bodyClass')!
    expect(body.status).toBe('UNKNOWN')
    expect(body.status).not.toBe('MATCH')
    expect(cmp.reference_result).not.toBe('EXACT_CANDIDATE')
  })

  it('scores Ford chassis cab synthetic as EXACT_CANDIDATE', () => {
    const payload = JSON.parse(
      readFileSync(
        path.join(root, 'fixtures/vpic/ford_f450_chassis_cab_synthetic.json'),
        'utf8',
      ),
    )
    const id = normalizeVpic(
      toEvidence('1FDUF4HT0KDA00001', 'fixture', 200, payload, new Date()),
      '1FDUF4HT0KDA00001',
    )
    const cmp = compareIdentityToConfiguration(id, cfg)
    expect(cmp.reference_result).toBe('EXACT_CANDIDATE')
    expect(resolveOutcome([cmp])).toBe('EXACT_CANDIDATE')
  })

  it('handles ambiguous equal top scores deterministically', () => {
    const cfg2: ConfigurationExpectation = {
      ...cfg,
      configuration_id: 'CFG-2019-F450-ALT',
      display_name: 'Alt',
    }
    const payload = JSON.parse(
      readFileSync(
        path.join(root, 'fixtures/vpic/ford_f450_chassis_cab_synthetic.json'),
        'utf8',
      ),
    )
    const id = normalizeVpic(
      toEvidence('1FDUF4HT0KDA00001', 'fixture', 200, payload, new Date()),
      '1FDUF4HT0KDA00001',
    )
    const a = compareIdentityToConfiguration(id, cfg)
    const b = compareIdentityToConfiguration(id, cfg2)
    const ranked = rankComparisons([b, a])
    expect(resolveOutcome([a, b])).toBe('AMBIGUOUS')
    expect(ranked[0]!.configuration_id < ranked[1]!.configuration_id || ranked[0]!.score >= ranked[1]!.score).toBe(
      true,
    )
  })
})
