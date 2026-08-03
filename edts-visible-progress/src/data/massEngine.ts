import type { TwinComponent } from '../types'
import { simulationMeta } from './joinCatalog'

export type MassEngineResult = {
  status: 'LIVE' | 'BLOCKED_UNTIL_MASS_EVIDENCE'
  total_mass_kg: number | null
  cg_z_m: number | null
  front_axle_kg: number | null
  rear_axle_kg: number | null
  components_with_mass: number
  components_missing_mass: number
  missing_comp_ids: string[]
  note: string
}

/**
 * Honest mass engine: only computes when every active component has a non-null mass
 * with mass_status PHYSICALLY_MEASURED or VERIFIED. Never invents axle splits.
 */
export function computeMassEngine(active: TwinComponent[]): MassEngineResult {
  const missing = active.filter(
    (c) =>
      c.mass_kg == null ||
      (c.mass_status !== 'PHYSICALLY_MEASURED' && c.mass_status !== 'VERIFIED'),
  )

  if (missing.length > 0 || active.length === 0) {
    return {
      status: 'BLOCKED_UNTIL_MASS_EVIDENCE',
      total_mass_kg: null,
      cg_z_m: null,
      front_axle_kg: null,
      rear_axle_kg: null,
      components_with_mass: active.length - missing.length,
      components_missing_mass: missing.length,
      missing_comp_ids: missing.map((c) => c.id),
      note:
        simulationMeta.honesty +
        ' Sample EDTSDemonstratorV2 live totals are not shown.',
    }
  }

  // Reachable only when evidence-backed masses exist for all active parts.
  let total = 0
  let weightedZ = 0
  for (const c of active) {
    const m = c.mass_kg as number
    const z = c.cg_m?.[2] ?? 0
    total += m
    weightedZ += m * z
  }
  const cgZ = total > 0 ? weightedZ / total : 0
  // Axle split requires measured lever arms — also blocked unless we have CG.
  // With verified masses + cg_z only, front/rear remain null until axle datum model locked.
  return {
    status: 'LIVE',
    total_mass_kg: total,
    cg_z_m: cgZ,
    front_axle_kg: null,
    rear_axle_kg: null,
    components_with_mass: active.length,
    components_missing_mass: 0,
    missing_comp_ids: [],
    note: 'Mass sum LIVE from verified/measured SIM records. Axle loads still require datum model — not invented.',
  }
}
