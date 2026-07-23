# LEGAL_LICENSES.md — L00 Legal and Licensing

**Rule:** Do not claim legal approval unless counsel or rights holder confirms.

## Status vocabulary

| Status | Meaning |
|--------|---------|
| DOCUMENTED | Terms/restrictions recorded from source |
| COUNSEL_REVIEW_REQUIRED | Needs legal review before reliance |
| RIGHTSHOLDER_PERMISSION_REQUIRED | Needs explicit permission |
| APPROVED | Counsel/rights holder confirmed |
| RESTRICTED | Use prohibited or severely limited |

---

## OEM geometry (Ford BBAS)

| Field | Value |
|-------|-------|
| **Status** | COUNSEL_REVIEW_REQUIRED |
| **Source** | Ford Pro BBAS — https://www.fordpro.com/en-us/upfit/bbas/ |
| **Documented restriction** | CAD and layout books typically **internal-use only**; public redistribution prohibited |
| **Can OEM geometry be used?** | Internally — **pending counsel confirmation** |
| **Redistribution** | RESTRICTED — do not commit OEM CAD/PDF to public repo without approval |
| **Attribution** | Required when citing dimensions — document title, page/table |

---

## Commercial 3D models

| Field | Value |
|-------|-------|
| **Status** | RESEARCH_REQUIRED |
| **Can models be modified?** | Unknown — vendor EULA review required per vendor |
| **Licensing costs** | UNVERIFIED |
| **Redistribution** | RIGHTSHOLDER_PERMISSION_REQUIRED until EULA reviewed |

---

## Scans (LiDAR / photogrammetry)

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Ownership** | Elektron-owned when captured in-house |
| **Redistribution** | Derived meshes may be publishable; raw scans may contain VIN/plate — policy TBD |
| **VIN / plate** | Redact in any published material |

---

## Third-party hosted OEM PDFs

| Field | Value |
|-------|-------|
| **Status** | DOCUMENTED |
| **Note** | marketingassociates / third-party mirrors used for reconciliation only — **official BBAS archive preferred** |
| **Legal use** | COUNSEL_REVIEW_REQUIRED for mirroring and citation |

---

## Summary

Legal use of OEM geometry for EDTS is **not approved** in this layer. Documentation records access terms and restrictions only.
