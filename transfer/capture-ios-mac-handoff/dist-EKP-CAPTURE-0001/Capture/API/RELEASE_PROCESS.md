# RELEASE_PROCESS.md

A release is more than a green Xcode build.

## Checklist

- [ ] Automated tests pass
- [ ] `./Scripts/validate-contracts` pass
- [ ] Schema migrations (if any) pass
- [ ] Golden packages verify
- [ ] Security checks pass
- [ ] Supported iPhone profile tested (when hardware phase starts)
- [ ] Supported iOS range recorded
- [ ] `KNOWN_LIMITATIONS.md` updated
- [ ] `CHANGELOG.md` updated
- [ ] `INTEGRATION_STATUS.md` updated
- [ ] SemVer bumped

## Versioning

Independent SemVer for `elektron-capture-ios`. Compatibility JSON recorded in README + package_meta.
