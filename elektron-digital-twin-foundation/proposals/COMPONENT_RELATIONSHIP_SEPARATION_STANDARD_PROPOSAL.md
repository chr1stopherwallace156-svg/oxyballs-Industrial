# COMPONENT_RELATIONSHIP_SEPARATION_STANDARD_PROPOSAL

**Status:** `PROPOSAL` (normative intent accepted; schemas not expanded under freeze)  
**Hard rule:** Relationships must **not** be inferred from CAD hierarchy alone.

## Principle

CAD hierarchy may suggest a discovery candidate. It cannot establish:

* physical containment
* electrical / fluid connection
* attachment method
* removal order
* service procedure
* functional dependency

Those require separate evidence-bound relationship records.

## Record classes

| Class | Purpose | Examples |
|---|---|---|
| Assembly relationship | Structural membership / attachment | `IS_PART_OF`, `ATTACHED_TO`, `STRUCTURALLY_CONTAINS` |
| Connection relationship | Functional connections | `ELECTRICALLY_CONNECTED_TO`, `MOVES_WITH` |
| Procedure dependency | Service sequencing | `MUST_DISCONNECT_BEFORE_REMOVAL`, `MUST_REMOVE_BEFORE`, `REQUIRES_TOOL`, `REQUIRES_VERIFICATION` |
| Discovery only | Low-trust CAD suggestion | `CAD_PARENT_CHILD_CANDIDATE` |

`CAD_PARENT_CHILD_CANDIDATE` must never become operational remove/install logic until promoted through verification.

## Unresearched edges

Unset procedure/connection edges remain `NOT_EVALUATED`.  
Do not seed “remove door requires harness/mirror/hinges” without a verified procedure record.

## Passport role

The Component Passport (rc1) may list `links.relationship_ids` for assembly relationships that exist.  
It must not embed relationship bodies or invent procedure dependency IDs.
