import { createHash } from 'node:crypto'
import type { VinDecodeEvidence, VpicFlatResult } from './types.js'

export const VPIC_EXTENDED_BASE =
  'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended'

export type DecodeVpicOptions = {
  vin: string
  timeoutMs?: number
  maxRetries?: number
  fetchImpl?: typeof fetch
  now?: () => Date
}

export class VpicNetworkError extends Error {
  readonly status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'VpicNetworkError'
    this.status = status
  }
}

export class VpicDecoderError extends Error {
  readonly errorCode: string | null
  readonly errorText: string | null
  constructor(message: string, errorCode: string | null, errorText: string | null) {
    super(message)
    this.name = 'VpicDecoderError'
    this.errorCode = errorCode
    this.errorText = errorText
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function isRetryableStatus(status: number) {
  return status === 408 || status === 429 || status >= 500
}

export function buildVpicUrl(vin: string): string {
  return `${VPIC_EXTENDED_BASE}/${encodeURIComponent(vin)}?format=json`
}

export function sha256Json(value: unknown): string {
  const canonical = JSON.stringify(value)
  return createHash('sha256').update(canonical).digest('hex')
}

export function extractFlatResult(payload: unknown): VpicFlatResult {
  if (!payload || typeof payload !== 'object') {
    throw new VpicDecoderError('Malformed vPIC response: not an object', null, null)
  }
  const obj = payload as Record<string, unknown>
  const results = obj.Results
  if (!Array.isArray(results) || results.length === 0) {
    throw new VpicDecoderError('Malformed vPIC response: empty Results', null, null)
  }
  const first = results[0]
  if (!first || typeof first !== 'object') {
    throw new VpicDecoderError('Malformed vPIC response: Results[0] invalid', null, null)
  }
  return first as VpicFlatResult
}

/** ErrorCode "0" or codes that still return usable fields are not hard failures. */
export function isHardDecoderFailure(errorCode: string | null): boolean {
  if (errorCode == null || errorCode === '') return false
  // NHTSA uses semicolon-separated codes; 1–7 often mean incomplete/invalid patterns
  const codes = errorCode.split(/[;,\s]+/).map((c) => c.trim()).filter(Boolean)
  // Hard fail only if every code indicates no usable decode AND no Make/ModelYear would exist
  // Code 11+ = invalid characters etc. For Extended, "1" can mean check digit issues already validated locally.
  return codes.some((c) => c === '11' || c === '12' || c === '13' || c === '14')
}

export function toEvidence(
  vin: string,
  endpoint: string,
  httpStatus: number,
  payload: unknown,
  now: Date,
): VinDecodeEvidence {
  const flat = extractFlatResult(payload)
  const obj = payload as Record<string, unknown>
  return {
    provider: 'NHTSA_VPIC',
    endpoint,
    retrieved_at_utc: now.toISOString(),
    request_vin: vin,
    response_vin: emptyToNull(flat.VIN) ,
    content_sha256: sha256Json(payload),
    http_status: httpStatus,
    count: typeof obj.Count === 'number' ? obj.Count : null,
    message: typeof obj.Message === 'string' ? obj.Message : null,
    search_criteria: typeof obj.SearchCriteria === 'string' ? obj.SearchCriteria : null,
    error_code: emptyToNull(flat.ErrorCode),
    error_text: emptyToNull(flat.ErrorText),
    additional_error_text: emptyToNull(flat.AdditionalErrorText),
    raw: payload,
  }
}

function emptyToNull(v: unknown): string | null {
  if (v == null) return null
  const s = String(v).trim()
  return s === '' ? null : s
}

export async function decodeVpic(options: DecodeVpicOptions): Promise<VinDecodeEvidence> {
  const {
    vin,
    timeoutMs = 15_000,
    maxRetries = 3,
    fetchImpl = fetch,
    now = () => new Date(),
  } = options

  const endpoint = buildVpicUrl(vin)
  let attempt = 0
  let lastError: Error | null = null

  while (attempt <= maxRetries) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetchImpl(endpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (!res.ok) {
        if (isRetryableStatus(res.status) && attempt < maxRetries) {
          attempt++
          await sleep(250 * 2 ** (attempt - 1))
          continue
        }
        throw new VpicNetworkError(`vPIC HTTP ${res.status}`, res.status)
      }

      let payload: unknown
      try {
        payload = await res.json()
      } catch {
        throw new VpicDecoderError('Malformed vPIC response: invalid JSON', null, null)
      }

      const evidence = toEvidence(vin, endpoint, res.status, payload, now())
      if (isHardDecoderFailure(evidence.error_code)) {
        throw new VpicDecoderError(
          evidence.error_text ?? 'vPIC hard decoder failure',
          evidence.error_code,
          evidence.error_text,
        )
      }
      return evidence
    } catch (err) {
      clearTimeout(timer)
      if (err instanceof VpicDecoderError) throw err
      if (err instanceof VpicNetworkError) {
        lastError = err
        if (attempt < maxRetries) {
          attempt++
          await sleep(250 * 2 ** (attempt - 1))
          continue
        }
        throw err
      }
      const name = err instanceof Error ? err.name : ''
      const msg = err instanceof Error ? err.message : String(err)
      if (name === 'AbortError' || /aborted|timeout/i.test(msg)) {
        lastError = new VpicNetworkError(`vPIC request timed out after ${timeoutMs}ms`)
        if (attempt < maxRetries) {
          attempt++
          await sleep(250 * 2 ** (attempt - 1))
          continue
        }
        throw lastError
      }
      lastError = new VpicNetworkError(msg)
      if (attempt < maxRetries) {
        attempt++
        await sleep(250 * 2 ** (attempt - 1))
        continue
      }
      throw lastError
    }
  }

  throw lastError ?? new VpicNetworkError('vPIC decode failed')
}
