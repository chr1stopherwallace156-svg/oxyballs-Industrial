# CTO_MASTER_ROADMAP.md

| Field | Value |
|---|---|
| Owner | CTO |
| Status | ACTIVE |
| EDE | 0.1.0 |
| Last updated | 2026-07-23 |

## North star

Reproducible Elektron engineering workstations + trustworthy EDTS/capture pipelines.

## Active tracks

| Track | Current focus | Next gate |
|---|---|---|
| EDE | Workstation bootstrap in-repo | `npm run ede:doctor` green on clean machine |
| EDTS foundation | Kernel / EAE / importer | Merge XREPO-CAP-EDTS importer; tag importer baseline |
| Capture iOS | Phase 1 runtime pending device | Physical still → XREPO-0001/0002 |
| Visible Progress / VIN | Prototype / research tooling | Keep isolated from capture contract |

## Sequencing rule

1. Contract / importer proof before camera scope expansion.  
2. EDE before undocumented laptop rituals.  
3. No ARKit/LiDAR until Phase 1 still is EDTS-committed.

## Non-goals (this roadmap slice)

- Rewriting application folder layout  
- Monorepo merge of `elektron-capture-ios` into this tree without a separate decision  
