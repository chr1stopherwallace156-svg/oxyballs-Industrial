# Capture repository publish checklist

`elektron-capture-ios` was audited as a **local-only** clone (`PENDING_MANUAL_GITHUB_PUBLISH`).

Before creating `chr1stopherwallace156-svg/elektron-capture-ios` (verify exact owner/name):

1. Confirm no signing secrets, provisioning profiles, or API tokens are committed.  
2. Confirm no personal vehicle identifiers or real evidence packages are committed.  
3. Confirm `.gitignore` excludes Xcode user data / DerivedData.  
4. Push `main` + tags `capture-ios-phase0-approved-v0.1.3` and `capture-ios-phase1-directive-v0.1.4` **without moving tag digests**.  
5. Push `feature/phase1-single-still-runtime` @ `255ec41` (or successor).  
6. Verify remote tags resolve to expected peeled commits.  
7. Open PR: feature → `main` with status matrix (implemented on branch; device validation pending).  
8. After remote exists, set `source_remote_url` in EDTS `VENDOR_PROVENANCE.json` **without changing contract file bytes**.

Do not merge as “complete” until Xcode/device validation is recorded, unless branching policy explicitly allows implemented-but-unvalidated merges with honest status labels.
