import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { VinDecodeEvidence, VehicleRecord, VinResolutionReport } from './types.js'

export function assertSafeVinSegment(vin: string): string {
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
    throw new Error('Unsafe VIN for filesystem path')
  }
  return vin
}

export function vehicleIdForVin(vin: string): string {
  return `VEH-${assertSafeVinSegment(vin)}`
}

export function evidencePath(dataRoot: string, vin: string): string {
  return path.join(dataRoot, 'evidence', 'vin', `${assertSafeVinSegment(vin)}.raw.json`)
}

export function vehiclePath(dataRoot: string, vin: string): string {
  return path.join(dataRoot, 'vehicles', `${vehicleIdForVin(vin)}.json`)
}

export function reportPath(dataRoot: string, vin: string): string {
  // reports/ lives beside data/ at package root
  const packageRoot = path.dirname(dataRoot)
  return path.join(packageRoot, 'reports', 'vin', `${assertSafeVinSegment(vin)}.md`)
}

async function atomicWriteJson(filePath: string, value: unknown): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
  const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`
  const body = `${JSON.stringify(value, null, 2)}\n`
  await writeFile(tmp, body, 'utf8')
  await rename(tmp, filePath)
}

async function atomicWriteText(filePath: string, body: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
  const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`
  await writeFile(tmp, body.endsWith('\n') ? body : `${body}\n`, 'utf8')
  await rename(tmp, filePath)
}

export async function persistRawEvidence(
  dataRoot: string,
  evidence: VinDecodeEvidence,
): Promise<string> {
  const file = evidencePath(dataRoot, evidence.request_vin)
  await atomicWriteJson(file, evidence)
  return file
}

export async function loadCachedEvidence(
  dataRoot: string,
  vin: string,
): Promise<VinDecodeEvidence | null> {
  const file = evidencePath(dataRoot, vin)
  try {
    const raw = await readFile(file, 'utf8')
    return JSON.parse(raw) as VinDecodeEvidence
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'ENOENT') return null
    throw err
  }
}

export async function persistVehicleRecord(
  dataRoot: string,
  record: VehicleRecord,
): Promise<string> {
  const file = vehiclePath(dataRoot, record.vin)
  let createdAt = record.created_at
  try {
    const existing = JSON.parse(await readFile(file, 'utf8')) as VehicleRecord
    if (existing.vin === record.vin && existing.created_at) {
      createdAt = existing.created_at
    }
  } catch {
    // new record
  }
  const next: VehicleRecord = { ...record, created_at: createdAt, updated_at: record.updated_at }
  await atomicWriteJson(file, next)
  return file
}

export async function persistMarkdownReport(
  dataRoot: string,
  vin: string,
  markdown: string,
): Promise<string> {
  const file = reportPath(dataRoot, vin)
  await atomicWriteText(file, markdown)
  return file
}

export function contentHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}
