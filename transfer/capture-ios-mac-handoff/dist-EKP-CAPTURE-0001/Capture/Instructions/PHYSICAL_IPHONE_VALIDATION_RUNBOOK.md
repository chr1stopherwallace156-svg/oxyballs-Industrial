# PHYSICAL_IPHONE_VALIDATION_RUNBOOK.md

Beginner guide for the first **physical iPhone** rehearsal of Elektron Capture Phase 1.

| Field | Value |
|---|---|
| Session type | `DEVICE_VALIDATION_REHEARSAL` |
| Authority | `NON_AUTHORITATIVE` |
| Content status | `CONTENT_UNVERIFIED` (always for this session) |
| Goal | Prove camera → bytes → `.edts-pkg` → Mac → EDTS importer |

This is **not** the full F-450 guided photography procedure.

---

## 1. Which folder

On your Mac, locate the local clone:

```text
elektron-capture-ios/
```

Confirm branch `feature/phase1-single-still-runtime` if you use git.

## 2–3. What to open in Xcode

From the Xcode welcome screen, click **Open Existing Project…**  
(Do **not** click Create New Project.)

Navigate to and open **exactly**:

```text
elektron-capture-ios/Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

| Do open | Do not open as the Run target |
|---|---|
| `Phase1StillCapture.xcodeproj` | A blank new iOS App |
| | `Package.swift` alone (library/tests only) |

Wait for Xcode to finish indexing and resolving the local package `ElektronCapture`.

## 4. What you should see (left sidebar)

Under the project navigator:

- Project **Phase1StillCapture**
- App sources: `Phase1StillCaptureApp.swift`, `Phase1CaptureRootView.swift`, `Info.plist`
- Package **ElektronCapture** (local, from the repo root)

## 5. Scheme (top toolbar)

Select scheme:

```text
Phase1StillCapture
```

## 6–8. Connect the iPhone

1. Plug the iPhone into the Mac with a USB cable.
2. Unlock the iPhone.
3. Tap **Trust** if asked; enter the passcode.
4. If needed: **Settings → Privacy & Security → Developer Mode → On** (phone may restart).

## 9. Apple ID in Xcode

```text
Xcode → Settings… → Accounts → + → Apple ID
```

Sign in with your Apple Account.

## 10–12. Signing

1. Click the blue project icon **Phase1StillCapture** in the sidebar.
2. Under **TARGETS**, select **Phase1StillCapture**.
3. Open **Signing & Capabilities**.
4. Check **Automatically manage signing**.
5. **Team**: your Personal Team / Apple ID team.
6. Bundle ID default: `com.elektronindustrial.phase1capture`  
   If Xcode says unavailable, change to something unique, e.g.  
   `com.elektronindustrial.YOURNAME.phase1capture`  
   (Changing the bundle ID does **not** change the `.edts-pkg` evidence contract.)

## 13. Select the physical phone

In the top destination menu, choose **your iPhone name** — not any “iPhone Simulator”.

## 14. Run

Press the triangular **Run** button (or ⌘R).

## 15. Normal first-build notes

- Package resolution / indexing can take a few minutes the first time.
- Signing prompts are normal.
- “AppIcon” or unused asset warnings may appear; they are not blockers if the app installs.
- Simulator downloads in Xcode are optional for this rehearsal.

## 16. Untrusted Developer on the phone

If iOS says the developer is untrusted:

```text
Settings → General → VPN & Device Management
→ your Apple ID / developer profile → Trust
```

Then launch the app again.

## 17. Camera permission

When prompted, tap **Allow** / **OK** for camera access.  
Photos are **not** saved to the Photo Library.

## 18. First screen

You should see:

- Title **Elektron Capture** / **Phase 1 Still**
- Label mentioning rehearsal / `CONTENT_UNVERIFIED`
- Button **Capture & Export**
- Status fields (package id, hash, path)
- EDTS XREPO lines showing `NOT_RUN` (correct — EDTS does that later)

## 19–21. One test picture + original bytes + package

1. Point at any well-lit non-critical subject (desk, wall — **not** the truck campaign yet).
2. Tap **Capture & Export**.
3. Wait until status shows capture-side OK / `PACKAGE_EXPORTED`.
4. Artifact SHA-256 field should fill with a hex digests.
5. Package path should end in `.edts-pkg`.

Original JPEG bytes come from AVFoundation `fileDataRepresentation()` inside the package — not a Photos-library re-export.

## 22–23. Where the package is + transfer to Mac

- On device: Documents / `Phase1Exports/` (also exposed to Files because file sharing is enabled).
- In the app: tap **Share .edts-pkg** → **AirDrop** to your Mac (or Save to Files).

Save the file somewhere easy on the Mac, e.g. Desktop.

## 24. If something fails — preserve evidence

- Screenshot the Xcode error and the phone screen.
- In Xcode: **View → Debug Area → Activate Console**; copy the log.
- Note: branch, commit (`git rev-parse HEAD`), device model, iOS version, time (UTC).
- Do **not** delete the app’s Documents until you have copied any `.edts-pkg`.

## 25. How to stop without losing evidence

1. Finish or cancel the capture.
2. AirDrop / share any successful `.edts-pkg` first.
3. Stop the Xcode Run session (□ stop).
4. Leave the project open or quit Xcode — your repo files stay on disk.
5. Fill `Docs/DEVICE_VALIDATION_REHEARSAL_CHECKLIST.md`.

## After transfer — EDTS ingest (on the industrial Mac/Linux clone)

```bash
cd elektron-digital-twin-foundation
python3 -c "
from pathlib import Path
from eae.importers.xrepo_cap_edts import ingest_edts_pkg
r = ingest_edts_pkg(Path('PATH/TO/your.edts-pkg'), Path('/tmp/edts-store'), commit=True)
print(r)
"
```

Expect:

```text
INGESTED_INTEGRITY_VERIFIED
CONTENT_UNVERIFIED
```

Never treat rehearsal photos as authoritative vehicle evidence.
