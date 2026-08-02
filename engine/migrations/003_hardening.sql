-- M10.1 hardening (owner directive_04 verification). Closes proven adversarial
-- findings by moving enforcement from the service layer into the database, so a
-- direct SQL write can no longer bypass the state machine or resurrect authority.

-- ── FINDING A1/A2 (Critical): state machine is now DB-enforced ────────────────
-- The allowed authorization transitions as data (single source of truth mirrors
-- src/stateMachine.ts). A status UPDATE that is not in this table is rejected.
CREATE TABLE AllowedAuthTransition (
  from_status TEXT NOT NULL,
  to_status   TEXT NOT NULL,
  PRIMARY KEY (from_status, to_status)
);
INSERT INTO AllowedAuthTransition (from_status, to_status) VALUES
  ('DRAFT','APPROVAL_REQUIRED'),
  ('APPROVAL_REQUIRED','AUTHORIZED'), ('APPROVAL_REQUIRED','DRAFT'),
  ('AUTHORIZED','ACTIVE'), ('AUTHORIZED','SUSPENDED'), ('AUTHORIZED','REVOKED'),
  ('AUTHORIZED','EXPIRED'), ('AUTHORIZED','SUPERSEDED'),
  ('ACTIVE','SUSPENDED'), ('ACTIVE','REVOKED'),
  ('SUSPENDED','AUTHORIZED'), ('SUSPENDED','REVOKED'), ('SUSPENDED','EXPIRED'),
  ('REVOKED','SUPERSEDED'),
  ('EXPIRED','SUPERSEDED');

CREATE TRIGGER trg_tca_status_transition
BEFORE UPDATE OF status ON TestCellAuthorization
WHEN NEW.status != OLD.status
  AND NOT EXISTS (SELECT 1 FROM AllowedAuthTransition WHERE from_status = OLD.status AND to_status = NEW.status)
BEGIN
  SELECT RAISE(ABORT, 'ILLEGAL_STATE_TRANSITION');
END;

-- ── FINDING A6 (High): single-ACTIVE enforced at the DB for NULL sessions too ─
CREATE TRIGGER trg_tca_single_active_update
BEFORE UPDATE OF status ON TestCellAuthorization
WHEN NEW.status = 'ACTIVE'
  AND EXISTS (
    SELECT 1 FROM TestCellAuthorization t
     WHERE t.status = 'ACTIVE'
       AND t.individual_vehicle_id = NEW.individual_vehicle_id
       AND t.subgate_id = NEW.subgate_id
       AND IFNULL(t.test_session_id, char(0)) = IFNULL(NEW.test_session_id, char(0))
       AND t.test_cell_authorization_id != NEW.test_cell_authorization_id)
BEGIN
  SELECT RAISE(ABORT, 'MULTIPLE_ACTIVE_TEST_CELLS');
END;

-- A row may only be *inserted* in an authoring state; post-authoring states
-- (ACTIVE/SUSPENDED/REVOKED/SUPERSEDED/EXPIRED) can only be *reached* via a
-- governed UPDATE transition — closing the "insert a ready-made ACTIVE cell" vector.
CREATE TRIGGER trg_tca_initial_status_insert
BEFORE INSERT ON TestCellAuthorization
WHEN NEW.status NOT IN ('DRAFT','APPROVAL_REQUIRED','AUTHORIZED')
BEGIN
  SELECT RAISE(ABORT, 'ILLEGAL_INITIAL_STATUS');
END;

-- FINDING A1 (Critical, residual): the transition graph alone is not enough — a
-- direct AUTHORIZED->ACTIVE write must also satisfy the activation PRECONDITIONS
-- (runout signed release, procedure approved, readiness flags), not only the graph.
CREATE TRIGGER trg_tca_activation_preconditions
BEFORE UPDATE OF status ON TestCellAuthorization
WHEN NEW.status = 'ACTIVE' AND OLD.status = 'AUTHORIZED'
  AND (
    NEW.runout_aggregation_result_id IS NULL
    OR NOT EXISTS (SELECT 1 FROM RunoutAggregationResult r
                    WHERE r.runout_aggregation_result_id = NEW.runout_aggregation_result_id
                      AND r.authorization_status = 'SIGNED_RELEASE')
    OR NEW.procedure_approval_id IS NULL
    OR NOT EXISTS (SELECT 1 FROM ProcedureApproval p
                    WHERE p.procedure_approval_id = NEW.procedure_approval_id
                      AND p.status = 'APPROVED')
    OR NEW.environmental_window_valid != 1
    OR NEW.thermal_state_valid != 1
    OR NEW.personnel_assigned != 1
    OR NEW.containment_ready != 1
  )
BEGIN
  SELECT RAISE(ABORT, 'ACTIVATION_PRECONDITIONS_NOT_MET');
END;

-- ── FINDING A4 (Medium): a revoked runout release cannot be resurrected ───────
CREATE TRIGGER trg_rar_no_resurrect
BEFORE UPDATE OF authorization_status ON RunoutAggregationResult
WHEN OLD.authorization_status IN ('REVOKED','REVOKED_PENDING_RECALCULATION')
  AND NEW.authorization_status IN ('SIGNED_RELEASE','DRAFT')
BEGIN
  SELECT RAISE(ABORT, 'RUNOUT_RELEASE_RESURRECTION_FORBIDDEN');
END;
CREATE TRIGGER trg_rar_no_delete
BEFORE DELETE ON RunoutAggregationResult
BEGIN
  SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:RunoutAggregationResult is never deleted');
END;

-- ── FINDING A8 (Medium): a VIN maps to at most one IndividualVehicle ──────────
CREATE UNIQUE INDEX ux_individual_vehicle_vin ON IndividualVehicle(vin) WHERE vin IS NOT NULL;

-- ── FINDING A12 (High): an enforced, verifiable evidence hash chain ───────────
-- Append-only ledger; each row links to the previous by hash so deletion or
-- reordering of evidence is detectable (verifyLedgerChain in src/ledger.ts).
CREATE TABLE EvidenceLedger (
  seq          INTEGER PRIMARY KEY AUTOINCREMENT,
  record_type  TEXT NOT NULL,
  record_id    TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  prev_hash    TEXT NOT NULL,
  record_hash  TEXT NOT NULL,
  signer_identity TEXT NOT NULL,
  created_at   TEXT NOT NULL
);
CREATE TRIGGER trg_ledger_no_update BEFORE UPDATE ON EvidenceLedger
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:EvidenceLedger is INSERT-only'); END;
CREATE TRIGGER trg_ledger_no_delete BEFORE DELETE ON EvidenceLedger
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:EvidenceLedger is INSERT-only'); END;
