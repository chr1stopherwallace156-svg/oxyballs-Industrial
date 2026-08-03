# API_CONTRACT.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Path A + Path B |
| Supersedes | (none) |

Canonical integration narrative: [`INTEGRATION_CONTRACT.md`](../../INTEGRATION_CONTRACT.md).

## Path A — Portable package

No network. Export directory conforming to Evidence Package Standard + Evidence Manifest v1.

## Path B — Capture API (target v1)

Base URL configured per environment. Auth: mutual TLS or OAuth — `DECISION_REQUIRED` with EDTS.

| Operation | Method | Notes |
|---|---|---|
| Fetch capture plan | `GET /v1/capture-plans/{id}` | Mocked locally now |
| Submit package metadata | `POST /v1/evidence-packages` | Not implemented live |
| Poll intake status | `GET /v1/evidence-packages/{id}` | Returns EDTS tokens only |

Client code lives behind `EDTSClient` protocol. Production implementation must not be the mock.

Forbidden responses from this app: Build Engine authorization tokens.
