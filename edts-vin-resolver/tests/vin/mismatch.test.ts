import { mkdtemp, mkdir, writeFile, readFile, cp } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { toEvidence } from '../../src/vin/decodeVpic.js'
import { resolveVin } from '../../src/vin/pipeline.js'
import { persistRawEvidence, loadCachedEvidence } from '../../src/vin/persistVinEvidence.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

async function tempDataRoot() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'edts-vin-'))
  const data = path.join(dir, 'data')
  await mkdir(path.join(data, 'configurations'), { recursive: true })
  await mkdir(path.join(data, 'evidence', 'vin'), { recursive: true })
  await mkdir(path.join(data, 'vehicles'), { recursive: true })
  await mkdir(path.join(dir, 'reports', 'vin'), { recursive: true })
  await cp(
    path.join(root, 'data/configurations/CFG-2019-F450-REG-CAB-4X2-60CA-DRW.json'),
    path.join(data, 'configurations/CFG-2019-F450-REG-CAB-4X2-60CA-DRW.json'),
  )
  return data
}

describe('mismatch + pipeline fixtures', () => {
  it('manufacturer mismatch → REJECTED_REFERENCE_MATCH / NO_MATCH via pipeline', async () => {
    const dataRoot = await tempDataRoot()
    const payload = JSON.parse(
      await readFile(path.join(root, 'fixtures/vpic/1HTKHPVK8KH805188.json'), 'utf8'),
    )
    const { report, exitCode } = await resolveVin({
      vin: '1HTKHPVK8KH805188',
      dataRoot,
      fetchImpl: async () =>
        new Response(JSON.stringify(payload), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
    })
    expect(exitCode).toBe(0)
    expect(report.outcome).toBe('NO_MATCH')
    expect(report.comparisons[0]?.reference_result).toBe('REJECTED_REFERENCE_MATCH')
    expect(report.lifecycle_status).toBe('REJECTED')
    expect(report.honesty.some((h) => /geometry/i.test(h))).toBe(true)
    expect(report.vehicle_id).toBe('VEH-1HTKHPVK8KH805188')
  })

  it('network timeout surfaces NETWORK_ERROR', async () => {
    const dataRoot = await tempDataRoot()
    const { report, exitCode } = await resolveVin({
      vin: '1HTKHPVK8KH805188',
      dataRoot,
      maxRetries: 0,
      timeoutMs: 50,
      fetchImpl: async () => {
        const err = new Error('aborted')
        err.name = 'AbortError'
        throw err
      },
    })
    expect(exitCode).toBe(2)
    expect(report.outcome).toBe('NETWORK_ERROR')
  })

  it('malformed API response → DECODER_ERROR', async () => {
    const dataRoot = await tempDataRoot()
    const { report, exitCode } = await resolveVin({
      vin: '1HTKHPVK8KH805188',
      dataRoot,
      fetchImpl: async () =>
        new Response(JSON.stringify({ Count: 1, Results: [] }), { status: 200 }),
    })
    expect(exitCode).toBe(2)
    expect(report.outcome).toBe('DECODER_ERROR')
  })

  it('offline uses cache and fails honestly when missing', async () => {
    const dataRoot = await tempDataRoot()
    const miss = await resolveVin({
      vin: '1HTKHPVK8KH805188',
      dataRoot,
      offline: true,
    })
    expect(miss.exitCode).toBe(2)

    const payload = JSON.parse(
      await readFile(path.join(root, 'fixtures/vpic/1HTKHPVK8KH805188.json'), 'utf8'),
    )
    const evidence = toEvidence(
      '1HTKHPVK8KH805188',
      'fixture',
      200,
      payload,
      new Date('2026-07-22T00:00:00Z'),
    )
    await persistRawEvidence(dataRoot, evidence)
    const hit = await resolveVin({
      vin: '1HTKHPVK8KH805188',
      dataRoot,
      offline: true,
    })
    expect(hit.exitCode).toBe(0)
    expect(hit.report.decode_status).toBe('OFFLINE_CACHE')
  })

  it('repeat execution is idempotent on vehicle_id and preserves created_at', async () => {
    const dataRoot = await tempDataRoot()
    const payload = JSON.parse(
      await readFile(path.join(root, 'fixtures/vpic/1HTKHPVK8KH805188.json'), 'utf8'),
    )
    const fetchImpl: typeof fetch = async () =>
      new Response(JSON.stringify(payload), { status: 200 })

    const a = await resolveVin({
      vin: '1HTKHPVK8KH805188',
      dataRoot,
      fetchImpl,
      now: () => new Date('2026-07-22T01:00:00Z'),
    })
    const b = await resolveVin({
      vin: '1HTKHPVK8KH805188',
      dataRoot,
      fetchImpl,
      now: () => new Date('2026-07-22T02:00:00Z'),
    })
    expect(a.report.vehicle_id).toBe(b.report.vehicle_id)
    const record = JSON.parse(
      await readFile(path.join(dataRoot, 'vehicles/VEH-1HTKHPVK8KH805188.json'), 'utf8'),
    )
    expect(record.created_at).toBe('2026-07-22T01:00:00.000Z')
    expect(record.updated_at).toBe('2026-07-22T02:00:00.000Z')
    expect(record.configuration_confirmed_from_vin_alone).toBe(false)
    expect(record.geometry_verified).toBe(false)
  })

  it('atomic persistence writes readable JSON evidence', async () => {
    const dataRoot = await tempDataRoot()
    const payload = { Count: 1, Message: 'ok', Results: [{ VIN: '1HTKHPVK8KH805188', ErrorCode: '0', ErrorText: '0', Make: 'GM', ModelYear: '2019' }] }
    const evidence = toEvidence('1HTKHPVK8KH805188', 'fixture', 200, payload, new Date())
    const p = await persistRawEvidence(dataRoot, evidence)
    const loaded = await loadCachedEvidence(dataRoot, '1HTKHPVK8KH805188')
    expect(loaded?.content_sha256).toBe(evidence.content_sha256)
    expect(p).toContain('1HTKHPVK8KH805188.raw.json')
  })
})
