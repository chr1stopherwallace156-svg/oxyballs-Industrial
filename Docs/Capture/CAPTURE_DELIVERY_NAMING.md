# Capture delivery naming rule

Owner-issued, permanent. Applies to **every** downloadable Capture handoff ZIP from this point
forward, unless the owner explicitly overrides it.

## The rule

| Item | Required value |
|---|---|
| ZIP filename | `elektron-capture-ios.zip` |
| Root folder inside the ZIP | `elektron-capture-ios/` |
| SHA-256 sidecar | `elektron-capture-ios.zip.sha256` |
| Direct download link | must end in `/elektron-capture-ios.zip` |

## Prohibited in the filename

Sprint names · repair numbers · timestamps · dates · branch names · a `DOWNLOAD-` prefix ·
`copy` · numeric suffixes · phase labels · commit SHAs · status words. The filename is a
constant, not a version string.

## Where version and history belong instead

- git branch name
- pull-request number
- commit SHA
- the `.sha256` sidecar
- the delivery notes committed alongside the ZIP

A delivery is identified by **branch + commit + digest**, never by its filename. Two deliveries
with the same filename and different digests are different artifacts, and the digest is what
distinguishes them.

## Consequence for consumers

The download URL is stable across deliveries; only the branch segment changes:

```
https://github.com/<owner>/<repo>/raw/<branch>/elektron-capture-ios.zip
```

Always verify the digest against the sidecar on the same branch before extracting — the
filename alone can no longer tell you which build you have.

## Scope

This rule governs Capture handoff deliveries. Pre-existing `DOWNLOAD-*.zip` artifacts already
committed to history are **not** renamed: they are immutable delivery records, and renaming them
would break every prior reference. The rule applies going forward.
