# RELEASE ROADMAP

How the project's evolution is communicated through version tags. Milestone-anchored
and honest: **while Prototype 001 does not physically exist, releases are candidates
(`-rcN`), not finals.** A version goes final only when its milestone is validated by
evidence — never on software completeness alone.

## Philosophy

- The software foundation is strong; the *product* is still being validated.
- Release candidates (`v0.1.0-rc1`, …) communicate exactly that: "engineering-ready,
  not product-proven."
- A tag is a claim. It must be backed by the same evidence discipline as everything
  else (Article VII) — no tag asserts safety, approval, or physical readiness.

## Version line

| Version | Name | Meaning | State |
|---|---|---|---|
| **v0.1** | Engineering Foundation | Governance + deterministic M10 rule engine + adversarial verification + evidence pack | **v0.1.0-rc1 tagged** (this merge) |
| **v0.2** | Platform 001 Engineering | Turn the locked reference vehicle into controlled engineering output: build package, compatibility, ODRs, BOM, calculators (Weight→CG→…→Gradeability) | In progress — the Platform 001 Build Package v0.1 has landed; calculators next |
| **v0.3** | Reference Vehicle Characterization | Close the donor's open-data requirements with evidence: baseline axle weights, GVWR, frame geometry, verified component data | Not started |
| **v0.4** | Prototype 001 Assembly | Guided physical build workflow (scan → measure → photos → disassembly → evidence → validation) | Not started |
| **v0.5** | Prototype Validation | On-vehicle validation against the staged gate ladder; signed evidence | Not started |
| **v0.6** | Pilot Customer | First real customer conversion under the validated process | Not started |
| **v1.0** | Commercial Engineering Platform | Repeatable, validated, multi-platform commercial capability | Not started |

## Tagging rules

- Tags are **annotated** and point at a commit on `main`.
- Pre-product milestones tag as `-rcN`; increment `N` for each candidate of the same
  milestone. A milestone drops the `-rcN` suffix only when its defining evidence
  exists (e.g. `v0.4.0` final requires an actual assembled Prototype 001).
- Each release records, in `docs/CHANGELOG.md`, what it contains, what it does NOT,
  and what remains blocked.
- No release may claim approval, certification, procurement, or physical safety.

## Current position

`v0.1.0-rc1` — **Engineering Foundation (release candidate).** Deterministic engine +
governance + the first Platform 001 build package are in `main`. Prototype 001 does
not exist. The next unit of engineering progress is v0.2/v0.3: closing the donor's
open-data requirements (ODR-004..006 — baseline axle weights + GVWR) and building the
first calculators (Weight→CG).
