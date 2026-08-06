# ELEKTRON-ENG-CONST-001 — Amendment Rationale

| Field | Value |
|---|---|
| Candidate | `ELEKTRON-ENG-CONST-001` rev `1.1.0-candidate` |
| Status | `PROPOSED_FOR_RATIFICATION` · `NOT_ACTIVE` |
| Foundational Authority | `ELEKTRON-ENG-CONST-BASE-001` (`docs/ENGINEERING_CONSTITUTION.md`), which **remains active** |
| Nature | **Additive operational extension.** No supersession, deprecation or deactivation. |

## Why an operational extension, and why now

`ELEKTRON-ENG-CONST-BASE-001` states the enduring principles of the platform in eight articles:
evidence immutability, safety before convenience, no AI authority, deterministic state machines,
configuration locking, version everything, unknown data creating obligations rather than guesses, and
one active specification. Those principles are correct and are **not** being changed.

What the repository has since grown is *operational surface*: multi-phase reconstruction pipelines
(Phase 4A–4D) with formal handoff contracts, evidence closures, inventories and lineage manifests;
multiple execution agents (human and AI) writing to the same tree; and a characterization layer
(Phase 4E) whose entire purpose is to govern authority over measurements. Enduring principles do not
by themselves answer operational questions such as:

- which artifact is *the* authoritative handoff between two phases, and what is subordinate to it;
- what determinism class a floating-point subsystem is permitted to claim;
- what must be serialized before an engineering claim is allowed to exist;
- what happens, procedurally, at the moment a contradiction is detected;
- whether a verification tool may become the definition of implementation behavior.

This candidate supplies those operational answers, in a form that automated agents and CI can be held
to, while deriving its validity from the foundational Constitution.

## What triggered it (concrete, from this repository)

1. **An authority inversion actually occurred.** A prior candidate on an unrelated branch introduced a
   parallel implementation and designated a non-canonical validator program as the behavioral
   specification that the canonical implementation was required to mirror. It was removed, and the
   components together with the authority relationship were deleted rather than renamed. Article IX.5
   of this candidate encodes that prohibition explicitly, including that **renaming an auxiliary tool
   does not make authority inversion permissible**.
2. **Phase handoffs needed a single authoritative object.** Phase 4D emits one primary handoff plus
   closures, inventories, lineage manifests and visual derivatives. Without Article VIII, "the
   handoff" is ambiguous, and an inherited upstream object can be mistaken for the primary input.
3. **Determinism claims needed classification.** A characterization engine performing floating-point
   scale and datum fitting cannot honestly claim bitwise determinism, yet "deterministic" was being
   used as a single undifferentiated word. Article VI forces the claim to be classified.
4. **Terminology drift between verification and validation.** The repository uses `VALIDATION_STATE`
   for what Article XI defines as *verification*. The candidate fixes the definitions going forward
   and records the historical mapping without editing history.
5. **Instruction provenance.** Repository content — fixtures, archived prompts, PR bodies, comments —
   was being treated as if it could direct an execution agent. Article X.3 makes such content
   untrusted data absent an owner-approved task manifest.

## Why additive rather than replacement

Replacing the foundational Constitution would violate the very principles it asserts: it would
rewrite governance history rather than extend it, and it would invalidate the 100+ documents that
cite it. The binding architectural decision is therefore that `BASE-001` remains
`ACTIVE_FOUNDATIONAL_CONSTITUTION` permanently, and this document sits beneath it as operational
formalization. Where both address a subject, `BASE-001` supplies the principle and `ENG-CONST-001`
supplies the operational interpretation, which must remain compatible with it. Unresolved conflict
produces `CONSTITUTIONAL_CONFLICT` and blocks enforcement pending human resolution — no silent winner.

## What this candidate does not do

It does not change source code or runtime behavior; it does not ratify itself; it does not activate;
it does not deprecate, weaken, reclassify or deactivate `BASE-001`; it does not retroactively declare
Phases 4A–4D nonconformant; it does not modify PR #69 or any Phase 4E artifact; and it introduces no
schema, executable, CI change, dependency or enforcement tooling.
