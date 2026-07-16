# REFERENCE_SOURCES.md — L00 Dimensional References

Rules:
- Never invent dimensions. Unknown → mark RESEARCH_REQUIRED or UNVERIFIED.
- Prefer OEM sources (Ford BBAS vehicle‑specific BBLB, official spec tables).
- Third‑party sites are LEAD_ONLY until cross‑checked against OEM.

Primary OEM paths (Build Engine alignment):
- Ford Pro BBAS portal (Upfitter): https://www.fordpro.com/en-us/upfit/bbas/ (license‑restricted; login required)
- Super Duty vehicle‑specific BBLB (pickup) — RESEARCH_REQUIRED (obtain official PDF; mirror internally per license)
- Q‑356R2 Pickup Box Removal/Alterations Bulletin (Super Duty 2023+, platform context) — Candidate path via marketingassociates token (verification required)

Variant/light‑duty references (FOR COMPARISON ONLY — not part of main lock):
- 2020 Ford F‑150 Tech Specs (OEM PDF): https://media.ford.com/content/dam/fordmedia/North%20America/US/product/2020/f150/2020-F150-TechSpecs.pdf

Third‑party dimension aggregators (LEAD_ONLY):
- KBB model pages (F‑450 Crew/Regular Cab) — LEAD_ONLY
- TruckDimensions database — LEAD_ONLY

Traceability table (initial):

| Measure | Value | Source | Confidence | Verification |
|---|---:|---|---|---|
| Wheelbase (Reg Cab F‑450 pickup) | 141.6 in | Ford Super Duty pickup dimension guide (2017–2019) — OEM path via BBAS | medium | PENDING (official BBAS copy) |
| Overall length (Reg Cab 8 ft DRW) | ~231.8 in | Third‑party (KBB/aggregators) | low | RESEARCH_REQUIRED (OEM) |
| Width excl. mirrors (F‑450 pickup) | 105.9 in | Third‑party | low | RESEARCH_REQUIRED (OEM) |
| Track width (front/rear) | UNVERIFIED | — | — | RESEARCH_REQUIRED |
| Frame rail section dims | UNVERIFIED | — | — | RESEARCH_REQUIRED (BBLB) |
| Cab dims (door/hood/glass) | UNVERIFIED | — | — | RESEARCH_REQUIRED |
| Engine bay bbox | UNVERIFIED | — | — | RESEARCH_REQUIRED |

Next actions:
1) Secure BBAS access; download the vehicle‑specific Super Duty BBLB (pickup). 
2) Extract authoritative tables; update DIMENSION_DATABASE.md with citations.
3) File any contradictions as explicit entries.

