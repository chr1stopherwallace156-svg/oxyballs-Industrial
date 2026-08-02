# Owner directive_04 — M10 Engineering Verification & Stress Test (adversarial)

> Archived 1:1 as delivered by the owner (Constitution, Article I). An owner
> directive commissioning an independent adversarial verification of the frozen
> M10 (bounded Gate 05M-C3 rule engine, `engine/`). Cross-referenced from
> `../research_hunter/PROVENANCE.md`.

---

## Directive (owner)

**Role:** no longer the architect — act as an independent engineering verification
team whose sole purpose is to break the Elektron Build Engine. Assume Revision 07
and M10 are frozen. Do NOT redesign the architecture unless a flaw is proven.
Discover every weakness.

**Phase 1 — Architecture Audit:** database normalization; foreign-key integrity;
state machines; race conditions; concurrency; transaction safety; append-only
evidence; cryptographic chain; rule engine; deterministic behaviour; performance;
scalability; maintainability; extensibility. For every issue: Severity
(Critical/High/Medium/Low), Description, Example failure scenario, Engineering
consequence, Recommended correction, Impact on existing architecture.

**Phase 2 — Safety Attack Simulation:** attempt to bypass ConfigurationPacket
locking, runout authorization, evidence immutability, signed results, state
machine, gate transitions, configuration mismatch, supplier authority, engineering
approval, vehicle identity, VIN mapping, hash validation, procedure revision,
cryptographic signatures. If successful, explain exactly how; if blocked, identify
why.

**Phase 3 — Database Destruction Testing:** attempt orphan records, duplicate
records, invalid FKs, circular references, NULL attacks, race conditions, duplicate
signoffs, double approvals, hash mismatches, configuration drift, partial commits,
transaction failures, power loss during writes, rollback corruption, stale reads,
concurrent edits, multiple active cells, ghost authorizations, authorization
resurrection, overwrite of immutable evidence. Try to corrupt every table.

**Phase 4 — Rule Engine Verification:** execute thousands of hypothetical
scenarios; verify every rule always produces the same deterministic result — no
randomness, ambiguity, hidden state, dependence on AI memory or conversation
context. Identical input → identical output.

**Phase 5 — Edge Case Discovery:** clock skew; DST; expired signatures; deleted
suppliers; component supersession; VIN reuse; vehicle rebuilt; battery replaced;
firmware rollback; partial telemetry; sensor disagreement; missing evidence; two
technicians editing simultaneously; network interruption; SQLite locking; disk
full; hash-collision assumptions; incorrect units; float precision; rounding;
overflow; underflow; negative geometry; zero-length tracks; thousands of
annotations; millions of telemetry rows.

**Phase 6 — Performance Testing:** estimate for 10 / 100 / 1,000 / 10,000 /
100,000 vehicles — database size, query speed, bottlenecks, recommended indexes,
partition strategy, archival strategy, backup strategy, restore strategy.

**Phase 7 — Future Proofing:** can M10 support future additions without redesign —
multiple platforms (Class 3–6), Tesla/CATL batteries, different inverters/motors,
fleet telemetry, OTA, AI diagnostics, digital twin, 3D CAD, AR guidance, supplier
APIs, inventory, customer portal, service history, predictive maintenance. If
redesign is needed, identify exactly where.

**Phase 8 — Final Engineering Verdict:** score Architecture; Safety; Data
integrity; Database design; Rule engine; Maintainability; Scalability; Testing;
Fault tolerance; Documentation; Cyber resilience; Future expansion; Commercial
readiness; Prototype readiness; Production readiness — explaining every score.

**Final Deliverables:** Executive Summary; Critical Issues; High-Priority
Improvements; Medium Improvements; Minor Improvements; Architecture Score (/100);
Safety Score (/100); Database Score (/100); Enterprise Readiness Score (/100);
Technical Debt Report; Risk Register; Recommended M10.1 improvements. Do not
rewrite the architecture unless a flaw is demonstrated. Be adversarial. Attempt to
break everything. Assume this software may eventually control high-voltage vehicle
conversion records, so every recommendation must be deterministic, evidence-based,
and reproducible.
