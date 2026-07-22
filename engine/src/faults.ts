import { DB } from './db';
import { BlockReason, block } from './blockReasons';

export type ExecutionDomain =
  | 'SIL_ONLY' | 'HIL_ONLY' | 'STATIC_VEHICLE_ONLY' | 'LIFTED_WHEEL_ONLY'
  | 'LOWEST_MOVING_CELL_ALLOWED' | 'HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS';

/**
 * RC-380/347: a fault may only be executed in the domain it is authorized for, and
 * only when its procedure is signed. Throws otherwise.
 */
export function assertFaultExecutionAuthorized(db: DB, feaId: string, currentDomain: ExecutionDomain): void {
  const fea = db.prepare('SELECT * FROM FaultExecutionAuthorization WHERE fault_execution_authorization_id = ?').get(feaId) as any;
  block(!!fea, BlockReason.ORPHANED_REFERENCE, `FaultExecutionAuthorization ${feaId} not found`);
  block(fea.procedure_approval_status === 'APPROVED', BlockReason.FAULT_EXECUTION_UNSIGNED,
    `procedure_approval_status=${fea.procedure_approval_status}`);
  block(fea.status === 'AUTHORIZED' || fea.status === 'ACTIVE', BlockReason.FAULT_EXECUTION_UNSIGNED,
    `status=${fea.status}`);
  block(fea.execution_domain === currentDomain, BlockReason.FAULT_EXECUTED_OUTSIDE_AUTHORIZED_DOMAIN,
    `authorized for ${fea.execution_domain}, attempted in ${currentDomain}`);
}

export interface PairedFaultInput {
  pairedFaultAuthorizationId: string;
  hazardAnalysisId: string | null;
  allowedExecutionDomain: ExecutionDomain;
  activeTestCellId: string;
  fault1Id: string;
  fault1ComponentId: string | null;
  fault2Id: string;
  fault2ComponentId: string | null;
  targetInjectionOrder: 'FAULT_1_THEN_FAULT_2' | 'FAULT_2_THEN_FAULT_1';
}

/**
 * RC-363/381/405: create a paired-fault authorization. Requires a HazardAnalysis_ID
 * (RC-363) and, where component ids are given, they must reference the
 * VehicleComponentInstance registry — never track geometry (RC-405).
 */
export function createPairedFaultAuthorization(db: DB, input: PairedFaultInput): void {
  block(!!input.hazardAnalysisId, BlockReason.PAIRED_FAULT_HAZARD_ANALYSIS_MISSING, 'HazardAnalysis_ID is required');

  for (const cid of [input.fault1ComponentId, input.fault2ComponentId]) {
    if (!cid) continue;
    const c = db.prepare('SELECT component_id FROM VehicleComponentInstance WHERE component_id = ?').get(cid);
    block(!!c, BlockReason.PAIRED_FAULT_COMPONENT_REGISTRY_INVALID,
      `${cid} is not a VehicleComponentInstance (fault components reference vehicle hardware, not track geometry)`);
  }

  db.prepare(
    `INSERT INTO PairedFaultAuthorization
      (paired_fault_authorization_id, hazard_analysis_id, allowed_execution_domain, active_test_cell_id,
       fault_1_id, fault_1_component_id, fault_2_id, fault_2_component_id, target_injection_order)
     VALUES (?,?,?,?,?,?,?,?,?)`,
  ).run(
    input.pairedFaultAuthorizationId, input.hazardAnalysisId, input.allowedExecutionDomain, input.activeTestCellId,
    input.fault1Id, input.fault1ComponentId, input.fault2Id, input.fault2ComponentId, input.targetInjectionOrder,
  );
}
