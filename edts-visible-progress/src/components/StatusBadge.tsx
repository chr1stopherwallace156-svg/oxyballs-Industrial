import type { DataStatus } from '../types'

const LABELS: Record<DataStatus, string> = {
  VERIFIED: 'VERIFIED',
  PHYSICALLY_MEASURED: 'PHYSICALLY MEASURED',
  ESTIMATED: 'ESTIMATED',
  PLACEHOLDER_GEOMETRY: 'PLACEHOLDER GEOMETRY',
  DESIGN_PROPOSAL: 'DESIGN PROPOSAL',
  UNKNOWN: 'UNKNOWN',
  BLOCKED: 'BLOCKED',
}

export function StatusBadge({ status }: { status: DataStatus }) {
  return (
    <span className={`badge badge-${status}`} title={status}>
      <span className="badge-dot" aria-hidden />
      {LABELS[status]}
    </span>
  )
}
