import { describe, expect, it } from 'vitest'
import { validateVin } from '../../src/vin/validateVin.js'
import { decodeVpic } from '../../src/vin/decodeVpic.js'
import { normalizeVpic } from '../../src/vin/normalizeVpic.js'

const runLive = process.env.RUN_VPIC_INTEGRATION === 'true'

describe.runIf(runLive)('vPIC live integration (opt-in)', () => {
  it('decodes 1HTKHPVK8KH805188', async () => {
    expect(validateVin('1HTKHPVK8KH805188').ok).toBe(true)
    const evidence = await decodeVpic({ vin: '1HTKHPVK8KH805188', maxRetries: 1 })
    const id = normalizeVpic(evidence, '1HTKHPVK8KH805188')
    expect(id.modelYear).toBe(2019)
    expect(id.manufacturer).toBeTruthy()
  }, 30_000)
})
