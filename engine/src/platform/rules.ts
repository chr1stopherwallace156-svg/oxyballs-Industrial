/**
 * Compatibility rule framework (Platform 001 slice) + the small set of rules whose
 * inputs are actually available. Each rule is a pure function of the platform +
 * candidate rows; it emits zero or more EvaluationDraft objects. No rule performs a
 * speculative physical calculation against data that does not exist — a missing
 * input yields BLOCKED_MISSING_DATA (never PASS) and a deterministic blocker.
 *
 * Minimum rule types represented:
 *   required-data-presence, applicability-match, component-revision-status,
 *   source-authority-presence, unit-validity, configuration-revision-lock.
 */
import { isKnownUnit } from '../units';
import { EvalResult, BOM_CATEGORIES } from './model';
import { BlockReasonRecord, PackageBlockReason } from './blockReasons';

export interface RuleContext {
  platform: any;              // VehiclePlatform row
  requestedRevision: string;  // the revision the caller asked to build against
  candidates: any[];          // ComponentCandidate rows in scope
}

export interface EvaluationDraft {
  ruleId: string;
  componentCandidateId: string | null;
  result: EvalResult;
  blocker: BlockReasonRecord | null;
  inputSnapshot: Record<string, unknown>;
  calculationSnapshot: Record<string, unknown>;
}

export interface Rule {
  id: string;
  type: string;
  evaluate(ctx: RuleContext): EvaluationDraft[];
}

function platformBlocker(code: PackageBlockReason, detail: string): BlockReasonRecord {
  return { code, scope: 'PLATFORM', subject: 'PLATFORM', detail };
}
function componentBlocker(code: PackageBlockReason, category: string, detail: string): BlockReasonRecord {
  return { code, scope: 'COMPONENT', subject: category, detail };
}

/** configuration-revision-lock: a package cannot be built against a changed revision. */
const revisionLock: Rule = {
  id: 'RULE_PLATFORM_REVISION_LOCK', type: 'configuration-revision-lock',
  evaluate(ctx) {
    const match = ctx.requestedRevision === ctx.platform.revision;
    return [{
      ruleId: this.id, componentCandidateId: null,
      result: match ? 'PASS' : 'FAIL',
      blocker: match ? null : platformBlocker(PackageBlockReason.PLATFORM_REVISION_CHANGED,
        `requested ${ctx.requestedRevision} != locked ${ctx.platform.revision}`),
      inputSnapshot: { requestedRevision: ctx.requestedRevision, platformRevision: ctx.platform.revision },
      calculationSnapshot: { match },
    }];
  },
};

/** required-data-presence + unit-validity: wheelbase present with an accepted unit. */
const wheelbasePresent: Rule = {
  id: 'RULE_PLATFORM_WHEELBASE_PRESENT', type: 'required-data-presence',
  evaluate(ctx) {
    const value = ctx.platform.wheelbase_value;
    const unit = ctx.platform.wheelbase_unit;
    let result: EvalResult; let blocker: BlockReasonRecord | null = null;
    if (value === null || value === undefined) {
      result = 'BLOCKED_MISSING_DATA';
      blocker = platformBlocker(PackageBlockReason.REQUIRED_PLATFORM_DATA_MISSING, 'wheelbase value missing');
    } else if (!unit || !isKnownUnit(unit)) {
      result = 'FAIL';
      blocker = platformBlocker(PackageBlockReason.UNKNOWN_UNIT, `wheelbase unit '${unit}' not accepted`);
    } else {
      result = 'PASS';
    }
    return [{
      ruleId: this.id, componentCandidateId: null, result, blocker,
      inputSnapshot: { wheelbase_value: value ?? null, wheelbase_unit: unit ?? null },
      calculationSnapshot: { present: value !== null && value !== undefined, unitAccepted: !!unit && isKnownUnit(unit) },
    }];
  },
};

/** source-authority-presence: the platform must carry a source authority. */
const sourceAuthorityPresent: Rule = {
  id: 'RULE_PLATFORM_SOURCE_AUTHORITY', type: 'source-authority-presence',
  evaluate(ctx) {
    const ok = !!ctx.platform.source_authority && String(ctx.platform.source_authority).trim().length > 0;
    return [{
      ruleId: this.id, componentCandidateId: null,
      result: ok ? 'PASS' : 'FAIL',
      blocker: ok ? null : platformBlocker(PackageBlockReason.SOURCE_AUTHORITY_MISSING, 'no source_authority'),
      inputSnapshot: { source_authority: ctx.platform.source_authority ?? null },
      calculationSnapshot: { present: ok },
    }];
  },
};

/** applicability-match: a candidate's type must be a required category for this package. */
const applicabilityMatch: Rule = {
  id: 'RULE_COMPONENT_APPLICABILITY', type: 'applicability-match',
  evaluate(ctx) {
    return ctx.candidates.map((c) => {
      const applicable = BOM_CATEGORIES.includes(c.component_type);
      return {
        ruleId: this.id, componentCandidateId: c.component_candidate_id,
        result: (applicable ? 'PASS' : 'NOT_APPLICABLE') as EvalResult,
        blocker: null,
        inputSnapshot: { component_type: c.component_type },
        calculationSnapshot: { applicable },
      };
    });
  },
};

/** component-revision-status: UNVERIFIED/RESEARCH_REQUIRED cannot pass; SUPERSEDED cannot be selected. */
const componentStatus: Rule = {
  id: 'RULE_COMPONENT_ENGINEERING_STATUS', type: 'component-revision-status',
  evaluate(ctx) {
    return ctx.candidates.map((c) => {
      const s = c.engineering_status;
      let result: EvalResult = 'PASS'; let blocker: BlockReasonRecord | null = null;
      if (s === 'SUPERSEDED') {
        result = 'FAIL';
        blocker = componentBlocker(PackageBlockReason.SUPERSEDED_COMPONENT_SELECTED, c.component_type, `status=${s}`);
      } else if (s === 'UNVERIFIED' || s === 'RESEARCH_REQUIRED' || s === 'CONFLICT') {
        result = 'FAIL';
        blocker = componentBlocker(PackageBlockReason.COMPONENT_UNVERIFIED, c.component_type, `status=${s}`);
      }
      return {
        ruleId: this.id, componentCandidateId: c.component_candidate_id, result, blocker,
        inputSnapshot: { engineering_status: s },
        calculationSnapshot: { passableStatus: result === 'PASS' },
      };
    });
  },
};

/** required-data-presence: a candidate cannot pass platform compatibility with absent dimensions. */
const componentDimensions: Rule = {
  id: 'RULE_COMPONENT_DIMENSIONS_PRESENT', type: 'required-data-presence',
  evaluate(ctx) {
    return ctx.candidates.map((c) => {
      const present = c.dimensions !== null && c.dimensions !== undefined;
      return {
        ruleId: this.id, componentCandidateId: c.component_candidate_id,
        result: (present ? 'PASS' : 'BLOCKED_MISSING_DATA') as EvalResult,
        blocker: present ? null
          : componentBlocker(PackageBlockReason.DIMENSIONS_REQUIRED, c.component_type, 'dimensions missing'),
        inputSnapshot: { dimensions: c.dimensions ?? null },
        calculationSnapshot: { present },
      };
    });
  },
};

/** The active rule set, in a fixed order (determinism). */
export const RULES: readonly Rule[] = [
  revisionLock,
  wheelbasePresent,
  sourceAuthorityPresent,
  applicabilityMatch,
  componentStatus,
  componentDimensions,
];

/** Run every rule; returns the drafts in a stable order (rule order → candidate order). */
export function runRules(ctx: RuleContext): EvaluationDraft[] {
  const out: EvaluationDraft[] = [];
  for (const r of RULES) out.push(...r.evaluate(ctx));
  return out;
}
