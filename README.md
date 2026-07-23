# Elektron Industrial

Gas-to-EV conversion services — Victorville, CA.

This repository holds coordinated bodies of work plus the public site:

- **Build Engine** — `engine/` (code) + `docs/` governance trees (constitution, specs, research, status). A deterministic,
  evidence-governed engine for vehicle-conversion validation.
- **Digital Twin Foundation** — [`elektron-digital-twin-foundation/`](elektron-digital-twin-foundation/README.md).
  Layer-governed 3D digital-twin documentation. Current stage: **L00 Reference Lock**.
- **Local Runtime** — macOS offline installers (`.command`), `scripts/setup-macos.sh`, `scripts/doctor.sh`, sealed `scripts/backup.sh` → `.local/backups/`.
- **Developer Environment (EDE)** — `scripts/setup.sh`, `scripts/dev/ede/`, `config/`, `dev/`, plus `docs/cto`, `docs/runbooks`, and related manifests.
  Reproducible workstation bootstrap (`./scripts/setup.sh` / `npm run setup`). Additive infrastructure only.
- **Website** — static site: [`index.html`](index.html).

> **Nothing may bypass guardrails, state machines, evidence requirements, or
> configuration locking.** The Build Engine turns missing knowledge into an exact
> work queue; it does not approve, certify, or claim safety. All build packages are
> DRAFT until evidence closes them.

---

## Developer environment (EDE)

Clone → configure workstation:

```bash
./scripts/setup.sh
# or
npm run setup
npm run ede:doctor
npm run dashboard
```

EDE commands are namespaced (`ede:doctor`, `ede:snapshot`). Generic `npm run doctor` / `npm run backup` belong to the **Local Runtime**.

See [`ENVIRONMENT.md`](ENVIRONMENT.md), [`docs/README.md`](docs/README.md) (EDE index), and [`PROJECT_MANIFEST.json`](PROJECT_MANIFEST.json).  
EDE does **not** move application folders.

---

## Build Engine — current baseline

| | |
|---|---|
| Active specification | [Revision 07](docs/specifications/Revision_07.md) |
| M10 — bounded Gate 05M-C3 rule engine | Built + adversarially verified (prototype-grade; DRAFT only) |
| Latest milestone | Platform 001 Build Package v0.1 — `DRAFT_INCOMPLETE` |
| Claims | None: no approval / procurement / fabrication / energization / safety claim |

The Build Engine is governed by the Engineering Constitution and the approved
specifications under [`/docs`](docs/). It is updated **by proposal, never silently**.

## Read in this order

1. [Engineering Constitution](docs/ENGINEERING_CONSTITUTION.md) — rules that almost never change
2. [Project Instructions](docs/AI_INSTRUCTIONS.md) — permanent operating manual for AI assistance
3. [Current Revision Specification](docs/specifications/Revision_07.md) — the active engineering doctrine
4. [Platform 001 Status](docs/status/PLATFORM_001_STATUS.md) — the latest built milestone
5. [Research Register](docs/research/OpenResearchRegister.md) — what evidence is still missing

## Run the Build Engine

```
cd engine && npm ci
npm run migrate            # 5 migrations, 40 tables
npm test                   # full test suite
npm run platform001:generate   # writes output/platform-001/build-package.{md,json}
```

## Repository layout

```
README.md                         Entry point (this file)
AGENTS.md                         Cross-agent rules + handoff protocol
.cursor/rules/                    Cursor rule mirroring AGENTS.md
ENVIRONMENT.md                    EDE required tooling / versions
PROJECT_MANIFEST.json             EDE folder ownership map
package.json                      Root scripts: runtime doctor/backup + EDE ede:* 
index.html                        Public static site
elektron-digital-twin-foundation/ Layer-governed 3D digital-twin docs (L00 Reference Lock)
scripts/doctor.sh backup.sh       Local Runtime operator tools → .local/backups/
scripts/dev/ede/                  EDE workstation doctor + development snapshot
artifacts/ede-snapshots/          EDE development snapshots (gitignored)
scripts/setup.sh config/ dev/     EDE workstation bootstrap + checks
docs/
    ENGINEERING_CONSTITUTION.md   Rules that rarely change (Articles I–VIII)
    AI_INSTRUCTIONS.md            How AI tooling must behave
    DECISION_REGISTER.md          Record of engineering decisions (D-001..)
    CHANGELOG.md                  Documented change history
    audits/                       Point-in-time review artifacts
    doctrine/                     Cross-cutting engineering doctrine
    handoffs/                     Live + archived cross-agent handoffs
    research/                     Open research register, source claims, immutable raw batches
    roadmaps/                     Per-milestone plans (M10, M11, ingestion, gates)
    specifications/               Revision 07 (active) + its modules
    status/                       Phase, ledger, blockers, PLATFORM_001_STATUS
    cto/ runbooks/ architecture/  EDE CTO docs + runbooks (additive)
    contracts/ history/           EDE contract + history indexes
engine/
    migrations/                   Versioned SQL schema (001..005)
    src/                          Rule engine + platform build-package layer
    scripts/                      migrate / seed / verify / platform001:generate
    verify/                       Adversarial + determinism + perf harnesses
    test/                         node:test integration suites
    output/                       Generated build packages (demonstration)
    EVIDENCE_PACK.md              M10 adversarial evidence reconciliation
    VERIFICATION_REPORT.md        M10 verification findings + scores
```

## Maintaining this README

This README is the entry point, not the doctrine. It is updated **by proposal,
never silently**: when a milestone completes or a revision supersedes the active
specification, an update to the baseline table above is proposed, reviewed, and
committed with the milestone. Detailed rules and revision content live in `/docs`.
