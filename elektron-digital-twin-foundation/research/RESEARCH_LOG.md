# RESEARCH_LOG.md

Append-only log of research entries for the digital twin foundation.

---

## RL-001 — L00 reference vehicle dimension research

- **Date:** 2026-07-16
- **Layer:** L00
- **Agent:** Cursor Cloud Agent
- **Question:** What vehicle and configuration should anchor the digital twin?

### Findings

1. **Build Engine alignment:** Research map L1 targets Ford Super Duty F-450/F-550 with BBAS BBLB paths (CS-05, CS-07, CS-10 on docs branch). Frame alteration and fleet GVWR work assumes Class 4/5.

2. **F-450 Regular Cab 4x2 DRW (2019):** Wheelbase **141.6 in** from Ford Super Duty pickup dimension materials (2017–2019). Overall length ~231.8 in cited in third-party specs — requires OEM verification.

3. **F-150 alternative (2017 SuperCab 6.5 ft 4x2):** Wheelbase **145.0 in** per Ford 2020 F-150 Tech Specs. Matches Standard Conversion marketing tier but weaker Build Engine OEM path.

4. **Geometry sources:** Ford BBAS (https://www.fordpro.com/en-us/upfit/bbas/) is the canonical OEM path. Super Duty vehicle-specific BBLB not yet archived (DT-B003).

5. **Scanning:** Tiered strategy adopted in DT-D002 — OEM envelope first, targeted LiDAR for Tier A interfaces.

### Impact

- Provisional DT-D001: 2019 F-450 Super Duty Regular Cab 8 ft 4x2
- Variants DT-D001-A (4x4), DT-D001-B (F-150) documented

### Sources

| ID | Title | URL | Confidence |
|----|-------|-----|------------|
| S-001 | 2020 Ford F-150 Tech Specs | https://media.ford.com/content/dam/fordmedia/North%20America/US/product/2020/f150/2020-F150-TechSpecs.pdf | high (OEM) |
| S-002 | Ford Super Duty dimension guide (pickup) | BBAS / marketingassociates PDF | medium — verify token stability |
| S-003 | Build Engine RESEARCH_MAP L1 | branch `claude/docs-structure-large-projects-b6vxx5` | high (internal) |

### Status

Consolidated into [L00_REFERENCE_LOCK.md](../layers/L00_REFERENCE_LOCK.md) and DT-D001.
