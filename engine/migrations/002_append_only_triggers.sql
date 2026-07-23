-- M10E — Append-only evidence ledger (RC-374/410/422, Constitution Article I).
-- Signed evidence is INSERT-only. Corrections are appended as new linked records
-- (TestResultAnnotation: ANNOTATION | SUPERSESSION | APPLICABILITY_CHANGE), never
-- UPDATE/DELETE on a signed row. These triggers are the mechanical enforcement.

-- ── SignoffRecord: INSERT-only ───────────────────────────────────────────────
CREATE TRIGGER trg_signoff_no_update BEFORE UPDATE ON SignoffRecord
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:SignoffRecord is INSERT-only'); END;
CREATE TRIGGER trg_signoff_no_delete BEFORE DELETE ON SignoffRecord
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:SignoffRecord is INSERT-only'); END;

-- ── AuthorizationTransition: INSERT-only ─────────────────────────────────────
CREATE TRIGGER trg_authtrans_no_update BEFORE UPDATE ON AuthorizationTransition
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:AuthorizationTransition is INSERT-only'); END;
CREATE TRIGGER trg_authtrans_no_delete BEFORE DELETE ON AuthorizationTransition
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:AuthorizationTransition is INSERT-only'); END;

-- ── DocumentArchive (raw artifacts): INSERT-only ─────────────────────────────
CREATE TRIGGER trg_docarchive_no_update BEFORE UPDATE ON DocumentArchive
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:DocumentArchive is INSERT-only'); END;
CREATE TRIGGER trg_docarchive_no_delete BEFORE DELETE ON DocumentArchive
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:DocumentArchive is INSERT-only'); END;

-- ── TelemetryLog: INSERT-only ────────────────────────────────────────────────
CREATE TRIGGER trg_telemetry_no_update BEFORE UPDATE ON TelemetryLog
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:TelemetryLog is INSERT-only'); END;
CREATE TRIGGER trg_telemetry_no_delete BEFORE DELETE ON TelemetryLog
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:TelemetryLog is INSERT-only'); END;

-- ── TestResultAnnotation: INSERT-only (annotations are themselves immutable) ──
CREATE TRIGGER trg_tra_no_update BEFORE UPDATE ON TestResultAnnotation
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:TestResultAnnotation is INSERT-only'); END;
CREATE TRIGGER trg_tra_no_delete BEFORE DELETE ON TestResultAnnotation
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:TestResultAnnotation is INSERT-only'); END;

-- ── RunoutAggregationComponent: the frozen calculation snapshot is INSERT-only
--    (review_73 pt 17 — the component membership that built L_min must not change).
CREATE TRIGGER trg_rac_no_update BEFORE UPDATE ON RunoutAggregationComponent
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:RunoutAggregationComponent snapshot is INSERT-only'); END;
CREATE TRIGGER trg_rac_no_delete BEFORE DELETE ON RunoutAggregationComponent
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:RunoutAggregationComponent snapshot is INSERT-only'); END;

-- ── TestResult: a SIGNED result is frozen (RC-374). Pre-sign rows may still be
--    edited (e.g. NEEDS_REVIEW -> SIGNED_PASS); once SIGNED_PASS/SIGNED_FAIL the
--    row is immutable and DELETE is always blocked. Applicability changes and
--    supersession are appended as TestResultAnnotation records.
CREATE TRIGGER trg_testresult_signed_no_update BEFORE UPDATE ON TestResult
WHEN OLD.result_status IN ('SIGNED_PASS','SIGNED_FAIL')
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:signed TestResult is immutable; append a TestResultAnnotation'); END;
CREATE TRIGGER trg_testresult_no_delete BEFORE DELETE ON TestResult
BEGIN SELECT RAISE(ABORT, 'APPEND_ONLY_VIOLATION:TestResult is never deleted'); END;
