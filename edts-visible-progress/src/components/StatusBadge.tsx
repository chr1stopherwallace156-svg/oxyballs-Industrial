import type { DataStatus } from '../types'
import { BADGE_COLORS } from '../types'

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
  const color = BADGE_COLORS[status]
  return (
    <span
      className={`badge badge-${status}`}
      title={status}
      style={{ color, borderColor: color }}
    >
      <span className="badge-dot" aria-hidden style={{ background: color }} />
      {LABELS[status]}
    </span>
  )
}
