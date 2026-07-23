/**
 * Draft BOM generator (Platform 001 slice). Produces exactly one slot per required
 * category (BOM_CATEGORIES). A slot with no candidate is UNSELECTED (blocker:
 * CANDIDATE_NOT_SELECTED); a slot whose candidate is disqualified by the rules is
 * BLOCKED (carrying that candidate's blockers). No slot is ever fabricated with a
 * part number, and none may be marked approved. Fully deterministic.
 */
import { BOM_CATEGORIES, SelectionStatus, bomItemId } from './model';
import { BlockReasonRecord, PackageBlockReason } from './blockReasons';
import { EvaluationDraft } from './rules';
import { OdrDraft } from './odr';

export interface BomDraft {
  bomItemId: string;
  category: string;
  selectedComponentId: string | null;
  selectionStatus: SelectionStatus;
  quantity: number | null;   // null = unknown (never assumed)
  unit: string | null;
  requiredByRule: string;
  sourceAuthority: string | null;
  openDataRequirementIds: string[];
  blockers: BlockReasonRecord[];
}

export function generateBom(
  packageId: string,
  candidates: any[],
  evaluations: EvaluationDraft[],
  odrs: OdrDraft[],
): BomDraft[] {
  const out: BomDraft[] = [];

  for (const category of BOM_CATEGORIES) {
    const cands = candidates
      .filter((c) => c.component_type === category)
      .sort((a, b) => String(a.component_candidate_id).localeCompare(String(b.component_candidate_id)));

    const categoryOdrs = odrs.filter((o) => o.subject === category).map((o) => o.odrId).sort();
    const id = bomItemId(packageId, category);

    if (cands.length === 0) {
      out.push({
        bomItemId: id, category, selectedComponentId: null, selectionStatus: 'UNSELECTED',
        quantity: null, unit: null, requiredByRule: 'RULE_BOM_CATEGORY_REQUIRED',
        sourceAuthority: 'ELEKTRON_CONVERSION_ARCHITECTURE', openDataRequirementIds: categoryOdrs,
        blockers: [{ code: PackageBlockReason.CANDIDATE_NOT_SELECTED, scope: 'COMPONENT', subject: category, detail: 'no candidate' }],
      });
      continue;
    }

    const cand = cands[0];
    const candEvals = evaluations.filter((e) => e.componentCandidateId === cand.component_candidate_id);
    const blockers = candEvals.filter((e) => e.blocker).map((e) => e.blocker as BlockReasonRecord);
    const superseded = blockers.some((b) => b.code === PackageBlockReason.SUPERSEDED_COMPONENT_SELECTED);
    const disqualified = candEvals.some((e) => e.result === 'FAIL' || e.result === 'BLOCKED_MISSING_DATA');
    const verified = cand.engineering_status === 'VERIFIED_DOCUMENT' || cand.engineering_status === 'VERIFIED_PHYSICAL';

    let status: SelectionStatus;
    let selected: string | null;
    if (superseded) {
      // A superseded revision cannot be selected.
      status = 'BLOCKED'; selected = null;
    } else if (disqualified) {
      status = 'BLOCKED'; selected = cand.component_candidate_id;
    } else if (verified) {
      status = 'VERIFIED_CANDIDATE'; selected = cand.component_candidate_id;
    } else {
      status = 'CANDIDATE'; selected = cand.component_candidate_id;
    }

    out.push({
      bomItemId: id, category, selectedComponentId: selected, selectionStatus: status,
      quantity: null, unit: null, requiredByRule: 'RULE_BOM_CATEGORY_REQUIRED',
      sourceAuthority: 'ELEKTRON_CONVERSION_ARCHITECTURE', openDataRequirementIds: categoryOdrs,
      blockers,
    });
  }

  return out;
}
