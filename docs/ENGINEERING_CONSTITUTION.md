# ENGINEERING CONSTITUTION

**Scope:** Elektron Build Engine — all revisions, all milestones.
**Stability:** These articles almost never change. Amending this document
requires an explicit entry in the [Decision Register](DECISION_REGISTER.md)
and a corresponding [Changelog](CHANGELOG.md) entry.

This document outranks every specification, roadmap, and instruction file
in this repository. Where any other document conflicts with the
Constitution, the Constitution wins.

---

## Article I — Evidence is immutable

Evidence, once recorded, is never edited, overwritten, or deleted.
Corrections are made by recording new evidence that supersedes the old;
the original record remains in the history. Deleting evidence is a
constitutional violation regardless of intent.

## Article II — Safety before convenience

Where a design choice trades safety margin, validation rigor, or
traceability for speed or convenience, safety wins. No deadline,
milestone, or user request overrides this.

## Article III — No AI authority

AI tooling (including Claude Code) has no engineering authority. It may
draft, analyze, propose, and implement under instruction, but it may not
approve specifications, authorize deviations, invent engineering values,
or sign off on evidence. Research informs; **evidence authorizes**.

## Article IV — Deterministic state machines

All Build Engine workflows are governed by explicit, deterministic state
machines. Every state and transition is defined in the active
specification. No code path may move a build between states outside the
defined transitions, and no transition may be bypassed.

## Article V — Configuration locking

Once a configuration is locked, it cannot be modified — only superseded
by a new, versioned configuration through the defined unlock/supersede
process in the active specification. Locked configurations are part of
the evidence record.

## Article VI — Version everything

Specifications, schemas, configurations, roadmaps, and decisions are all
versioned. Superseded versions are archived, never deleted, so that any
past build can be traced to the exact doctrine it was built under.

## Article VII — Unknown data creates obligations, not guesses

Unknown or missing engineering data must never be filled in by
estimation, inference, or AI generation. It must create an
**OpenDataRequirement** in the
[Open Research Register](research/OpenResearchRegister.md) and block any
dependent validation until real evidence resolves it.

## Article VIII — One active specification

Exactly one revision in `/docs/specifications/` is marked
`ACTIVE_SPECIFICATION` at any time. All work is performed against the
active revision. When a new revision is approved, the old one is archived
in place and the new one becomes active; the transition is recorded in
the Decision Register and Changelog.
