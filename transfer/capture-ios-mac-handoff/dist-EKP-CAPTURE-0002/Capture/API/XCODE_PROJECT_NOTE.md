# Xcode project note

## Runnable iPhone app (Phase 1)

Preferred (workspace includes the local Swift package explicitly):

```bash
open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
# or
open Phase1StillCapture.xcworkspace
```

Also supported:

```bash
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

That app target links the **local** Swift package product `ElektronCapture`
(`Package.swift` at the repository root via `XCLocalSwiftPackageReference` `relativePath = ../..`
from `Apps/Phase1StillCapture/`).

## Prove handoff layout (no Xcode required)

```bash
./Scripts/verify-xcode-handoff.sh
# expects: HANDOFF_LAYOUT_OK
```

Clean-clone proof:

```bash
git clone elektron-capture-ios-complete.bundle /tmp/capture-clean
cd /tmp/capture-clean
git checkout cursor/canonicalization-failed-repair-d881
./Scripts/verify-xcode-handoff.sh
```

## Library / tests only

`Package.swift` still exposes the reusable library and unit tests. Opening
`Package.swift` alone does **not** install an app on a physical iPhone.

## Rules

1. Do not copy `App/` or `Contracts/` sources into the Xcode app target.
2. Do not point at a remote package URL for `ElektronCapture`.
3. Do not commit `xcuserdata/` or DerivedData.
4. Full AVFoundation / ARKit features beyond Phase 1 remain deferred per CAP-IOS-ADR-0004.
5. Do not mint a handoff bundle until `./Scripts/verify-xcode-handoff.sh` passes on a clean clone.

## Status (tip `005382b`)

```text
HANDOFF STRUCTURE: VERIFIED
MAC XCODE RESOLUTION: PENDING
PHYSICAL VALIDATION: PENDING
```

Mac gate before the next candidate bundle:

```text
verify handoff → HANDOFF_LAYOUT_OK
→ swift test
→ open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
→ PACKAGE_RESOLVED (ElektronCapture under Package Dependencies)
→ XCODE_BUILD_PASS (Phase1StillCapture scheme)
→ only then request a new bundle from exact commit 005382b
→ physical iPhone retest
```

See `Docs/PHYSICAL_IPHONE_VALIDATION_RUNBOOK.md`.
