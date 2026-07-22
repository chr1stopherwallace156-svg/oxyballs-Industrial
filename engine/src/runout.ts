import { DB, sha256, canonicalSerialize, atomic } from './db';
import { BlockReason, BlockError, block } from './blockReasons';
import { isComponentAuthorityEligible } from './units';

/**
 * M10C — Runout engine. The canonical L_min equation exists in code (RC-340),
 * not only documentation.
 */
export const LMIN_TERMS = [
  'L_acceleration',
  'L_stabilization',
  'L_braking_target',
  'L_worst_case_coast_or_stop',
  'L_response_allowance',
  'L_measurement_uncertainty',
  'L_containment_margin',
] as const;
export type LminTerm = (typeof LMIN_TERMS)[number];

/** L_min = sum of the seven canonical terms (RC-340). */
export function lMinFromTerms(terms: Record<LminTerm, number>): number {
  return LMIN_TERMS.reduce((sum, t) => sum + (terms[t] ?? 0), 0);
}

interface DistanceComponentRow {
  distance_component_id: string;
  runout_calculations_id: string;
  zone_start_reference: number;
  zone_end_reference: number;
  distance_component_value: number;
  distance_component_method: string;
  distance_component_type: string | null;
  uncertainty_m: number;
  included_in_l_min: number;
  included_within_component_id: string | null;
  overlap_review_status: string;
  authority_status: string;
}

export interface AggregateInput {
  runoutCalculationsId: string;
  configurationPacketId: string;
  testCellAuthorizationId: string | null;
  availableTrackLength: number;
  approvedMinimumMargin: number;
  calculationVersion?: string;
  /** review_73 pt 10: L_min term categories that must be present among eligible components. */
  requiredTypes?: string[];
}

export interface AggregateResult {
  runoutAggregationResultId: string;
  calculatedLmin: number;
  availableTrackLength: number;
  remainingMargin: number;
  overlapCheckResult: 'PASS' | 'FAIL';
  unitConsistencyResult: 'PASS' | 'FAIL';
  requiredComponentCompletionResult: 'PASS' | 'FAIL';
  calculationHash: string;
  componentIds: string[];
}

function allComponents(db: DB, runoutId: string): DistanceComponentRow[] {
  return db
    .prepare('SELECT * FROM DistanceComponent WHERE runout_calculations_id = ?')
    .all(runoutId) as unknown as DistanceComponentRow[];
}

/** RC-401: eligible L_min members = included_in_l_min AND eligible authority. */
export function selectEligibleComponents(db: DB, runoutId: string): DistanceComponentRow[] {
  return allComponents(db, runoutId).filter(
    (c) => c.included_in_l_min === 1 && isComponentAuthorityEligible(c.authority_status),
  );
}

/**
 * Compute + freeze a RunoutAggregationResult snapshot (RC-372/401). Does NOT sign
 * release. Throws BlockError on the hard blocks that prevent a valid calculation.
 */
export function aggregate(db: DB, input: AggregateInput): AggregateResult {
  const all = allComponents(db, input.runoutCalculationsId);
  block(all.length > 0, BlockReason.MISSING_RUNOUT_COMPONENT, 'no distance components for runout');

  // RC-373 geometry: value ≈ (end - start) within uncertainty; host exists + same runout.
  const byId = new Map(all.map((c) => [c.distance_component_id, c]));
  let overlapPass = true;
  for (const c of all) {
    const span = c.zone_end_reference - c.zone_start_reference;
    if (Math.abs(c.distance_component_value - span) > Math.max(c.uncertainty_m, 1e-9)) {
      throw new BlockError(
        BlockReason.DISTANCE_GEOMETRY_INVALID,
        `${c.distance_component_id}: value ${c.distance_component_value} != span ${span} (±${c.uncertainty_m})`,
      );
    }
    if (c.overlap_review_status === 'INCLUDED_IN_OTHER_COMPONENT') {
      const host = c.included_within_component_id ? byId.get(c.included_within_component_id) : undefined;
      if (!host || host.runout_calculations_id !== c.runout_calculations_id) {
        overlapPass = false;
        throw new BlockError(
          BlockReason.OVERLAP_HOST_INVALID,
          `${c.distance_component_id}: host missing or in a different RunoutCalculations`,
        );
      }
    }
  }

  // review_73 pt 11: circular nesting detection (A includes B includes A ...).
  for (const start of all) {
    const seen = new Set<string>();
    let cur: DistanceComponentRow | undefined = start;
    while (cur && cur.included_within_component_id) {
      if (seen.has(cur.distance_component_id)) {
        throw new BlockError(BlockReason.OVERLAP_HOST_INVALID, `circular nesting at ${cur.distance_component_id}`);
      }
      seen.add(cur.distance_component_id);
      cur = byId.get(cur.included_within_component_id);
    }
  }

  // review_73 pt 11: two separately-included components covering the same physical
  // metre (overlapping [start,end) ranges) would double-count the track.
  const separate = all.filter((c) => c.included_in_l_min === 1 && c.overlap_review_status === 'INCLUDED_SEPARATELY');
  for (let i = 0; i < separate.length; i += 1) {
    for (let j = i + 1; j < separate.length; j += 1) {
      const a = separate[i]; const b = separate[j];
      const overlapLen = Math.min(a.zone_end_reference, b.zone_end_reference) - Math.max(a.zone_start_reference, b.zone_start_reference);
      if (overlapLen > 1e-9) {
        overlapPass = false;
        throw new BlockError(
          BlockReason.OVERLAP_CHECK_FAILED,
          `${a.distance_component_id} and ${b.distance_component_id} both count the same track segment (overlap ${overlapLen} m)`,
        );
      }
    }
  }

  // Required-component completion (RC-383): a component marked for inclusion but
  // carrying an ineligible authority status is an incomplete required component.
  const requiredIncomplete = all.some(
    (c) => c.included_in_l_min === 1 && !isComponentAuthorityEligible(c.authority_status),
  );
  const requiredComponentCompletionResult: 'PASS' | 'FAIL' = requiredIncomplete ? 'FAIL' : 'PASS';

  const unitConsistencyResult: 'PASS' | 'FAIL' = all.every((c) => Number.isFinite(c.distance_component_value))
    ? 'PASS'
    : 'FAIL';
  const overlapCheckResult: 'PASS' | 'FAIL' = overlapPass ? 'PASS' : 'FAIL';

  const eligible = all.filter(
    (c) => c.included_in_l_min === 1 && isComponentAuthorityEligible(c.authority_status),
  );

  // review_73 pt 10: verify all required L_min term categories are present.
  if (input.requiredTypes && input.requiredTypes.length > 0) {
    const present = new Set(eligible.map((c) => c.distance_component_type).filter((t): t is string => !!t));
    const missing = input.requiredTypes.filter((t) => !present.has(t));
    block(missing.length === 0, BlockReason.REQUIRED_COMPONENT_INCOMPLETE, `missing L_min terms: ${missing.join(', ')}`);
  }

  const calculatedLmin = eligible.reduce((s, c) => s + c.distance_component_value, 0);
  const remainingMargin = input.availableTrackLength - calculatedLmin;

  const componentIds = eligible.map((c) => c.distance_component_id).sort();
  const calculationHash = sha256(
    canonicalSerialize({
      runout: input.runoutCalculationsId,
      config: input.configurationPacketId,
      componentIds,
      calculatedLmin,
      availableTrackLength: input.availableTrackLength,
      version: input.calculationVersion ?? '1',
    }),
  );

  const id = `RAR_${calculationHash.slice(0, 16)}`;
  // FINDING M1 (atomicity): the aggregation result and its frozen component-membership
  // snapshot are one indivisible unit. If the snapshot loop fails partway, the whole
  // aggregation rolls back — never a result row with a partial/absent frozen snapshot.
  atomic(db, () => {
    db.prepare(
      `INSERT INTO RunoutAggregationResult
        (runout_aggregation_result_id, runout_calculations_id, configuration_packet_id,
         test_cell_authorization_id, calculated_l_min, available_track_length, remaining_margin,
         approved_minimum_margin, overlap_check_result, unit_consistency_result,
         required_component_completion_result, calculation_version, calculation_hash, authorization_status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?, 'DRAFT')`,
    ).run(
      id, input.runoutCalculationsId, input.configurationPacketId, input.testCellAuthorizationId,
      calculatedLmin, input.availableTrackLength, remainingMargin, input.approvedMinimumMargin,
      overlapCheckResult, unitConsistencyResult, requiredComponentCompletionResult,
      input.calculationVersion ?? '1', calculationHash,
    );

    // RC-400/417: freeze the component membership snapshot (junction, composite PK).
    const ins = db.prepare(
      'INSERT INTO RunoutAggregationComponent (runout_aggregation_result_id, distance_component_id) VALUES (?,?)',
    );
    for (const cid of componentIds) ins.run(id, cid);
  });

  return {
    runoutAggregationResultId: id,
    calculatedLmin,
    availableTrackLength: input.availableTrackLength,
    remainingMargin,
    overlapCheckResult,
    unitConsistencyResult,
    requiredComponentCompletionResult,
    calculationHash,
    componentIds,
  };
}

/** Assert an aggregation result satisfies every runout gate (RC-372/383). */
export function assertRunoutValid(db: DB, aggregationResultId: string): void {
  const r = db
    .prepare('SELECT * FROM RunoutAggregationResult WHERE runout_aggregation_result_id = ?')
    .get(aggregationResultId) as any;
  block(!!r, BlockReason.ORPHANED_REFERENCE, 'RunoutAggregationResult not found');
  block(r.available_track_length >= r.calculated_l_min, BlockReason.INSUFFICIENT_TRACK_LENGTH,
    `available ${r.available_track_length} < L_min ${r.calculated_l_min}`);
  block(r.remaining_margin >= r.approved_minimum_margin, BlockReason.INSUFFICIENT_REMAINING_MARGIN,
    `margin ${r.remaining_margin} < ${r.approved_minimum_margin}`);
  block(r.overlap_check_result === 'PASS', BlockReason.OVERLAP_CHECK_FAILED);
  block(r.unit_consistency_result === 'PASS', BlockReason.UNIT_CONSISTENCY_FAILED);
  block(r.required_component_completion_result === 'PASS', BlockReason.REQUIRED_COMPONENT_INCOMPLETE);
}

/** RC-372: move an aggregation result to SIGNED_RELEASE only if every gate passes. */
export function signRelease(db: DB, aggregationResultId: string): void {
  assertRunoutValid(db, aggregationResultId);
  db.prepare(
    "UPDATE RunoutAggregationResult SET authorization_status = 'SIGNED_RELEASE' WHERE runout_aggregation_result_id = ?",
  ).run(aggregationResultId);
}
