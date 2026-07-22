/**
 * Open-data requirement engine (Platform 001 slice). Turns each missing input the
 * package needs — a null-valued engineering claim, an unverified component, a
 * component with absent dimensions/mass, and the always-required physical frame
 * measurement — into a deterministic, tracked OpenDataRequirement. This is the
 * core value of the slice: missing knowledge becomes an exact, ordered work queue
 * instead of a silent gap. IDs are pure functions of (category, subject, rule).
 */
import { OdrCategory, odrId } from './model';

export interface OdrDraft {
  odrId: string;
  category: OdrCategory;
  subject: string;
  reason: string;
  requiredForRule: string | null;
  requiredEvidenceType: string;
  blockingScope: string;
}

const CLAIM_TYPE_TO_CATEGORY: Record<string, OdrCategory> = {
  BASELINE_AXLE_WEIGHT: 'BASELINE_AXLE_WEIGHT',
  VEHICLE_GEOMETRY: 'VEHICLE_GEOMETRY',
  COMPONENT_MASS: 'COMPONENT_MASS',
  COMPONENT_DIMENSIONS: 'COMPONENT_DIMENSIONS',
};

function push(map: Map<string, OdrDraft>, d: OdrDraft): void {
  map.set(d.odrId, d); // dedupe by deterministic id
}

/**
 * Produce the ODR set for a platform + its claims + its candidates. Deterministic
 * and order-stable (sorted by odr_id at the end).
 */
export function generateOdrs(packageId: string, platform: any, claims: any[], candidates: any[]): OdrDraft[] {
  const map = new Map<string, OdrDraft>();

  // (1) Every engineering claim with no value → a research/measurement requirement.
  for (const c of claims) {
    if (c.value !== null && c.value !== undefined) continue;
    const category = CLAIM_TYPE_TO_CATEGORY[c.claim_type] ?? 'SUPPLIER_DOCUMENTATION';
    push(map, {
      odrId: odrId(packageId, category, c.subject, null),
      category, subject: c.subject,
      reason: `engineering claim '${c.subject}' has no verified value (status ${c.status})`,
      requiredForRule: null,
      requiredEvidenceType: category === 'BASELINE_AXLE_WEIGHT' ? 'MANUFACTURER_DOCUMENT_OR_SCALE_MEASUREMENT'
        : 'MANUFACTURER_DOCUMENT',
      blockingScope: 'PLATFORM',
    });
  }

  // (2) The nominal frame geometry is not physically verified — always require it.
  push(map, {
    odrId: odrId(packageId, 'PHYSICAL_MEASUREMENT', 'vehicle_frame_geometry', null),
    category: 'PHYSICAL_MEASUREMENT', subject: 'vehicle_frame_geometry',
    reason: 'platform geometry is nominal (owner-locked reference), not physically measured on the donor',
    requiredForRule: null,
    requiredEvidenceType: 'PHYSICAL_MEASUREMENT',
    blockingScope: 'PLATFORM',
  });

  // (3) Per component candidate: missing dimensions, missing mass, unverified status.
  for (const c of candidates) {
    if (c.dimensions === null || c.dimensions === undefined) {
      push(map, {
        odrId: odrId(packageId, 'COMPONENT_DIMENSIONS', c.component_type, 'RULE_COMPONENT_DIMENSIONS_PRESENT'),
        category: 'COMPONENT_DIMENSIONS', subject: c.component_type,
        reason: `component candidate ${c.component_candidate_id} has no dimensions`,
        requiredForRule: 'RULE_COMPONENT_DIMENSIONS_PRESENT',
        requiredEvidenceType: 'SUPPLIER_DOCUMENTATION', blockingScope: 'COMPONENT',
      });
    }
    if (c.mass === null || c.mass === undefined) {
      push(map, {
        odrId: odrId(packageId, 'COMPONENT_MASS', c.component_type, null),
        category: 'COMPONENT_MASS', subject: c.component_type,
        reason: `component candidate ${c.component_candidate_id} has no mass`,
        requiredForRule: null, requiredEvidenceType: 'SUPPLIER_DOCUMENTATION', blockingScope: 'COMPONENT',
      });
    }
    if (c.engineering_status === 'UNVERIFIED' || c.engineering_status === 'RESEARCH_REQUIRED') {
      push(map, {
        odrId: odrId(packageId, 'SUPPLIER_DOCUMENTATION', c.component_type, 'RULE_COMPONENT_ENGINEERING_STATUS'),
        category: 'SUPPLIER_DOCUMENTATION', subject: c.component_type,
        reason: `component candidate ${c.component_candidate_id} is ${c.engineering_status}; needs supplier documentation`,
        requiredForRule: 'RULE_COMPONENT_ENGINEERING_STATUS',
        requiredEvidenceType: 'SUPPLIER_DOCUMENTATION', blockingScope: 'COMPONENT',
      });
    }
  }

  return [...map.values()].sort((a, b) => a.odrId.localeCompare(b.odrId));
}
