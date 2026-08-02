# BACKUP AND RECOVERY

Three independent protections. Keep the first two off the machine.

## 1. Source snapshot ZIP (delivered separately)

Complete tracked source at a commit, with its own manifest + checksums. Inspect /
share / recover source. No git history.

## 2. Git recovery bundle (delivered with this package)

`Elektron-Industrial_git-recovery_2026-07-23_42efa8c.bundle` — full history, all
branches, all tags (including `v0.1.0-rc1`). Its **default checkout is `main`**, so
recovery is unmistakable:

```
git bundle verify Elektron-Industrial_git-recovery_2026-07-23_42efa8c.bundle
git clone Elektron-Industrial_git-recovery_2026-07-23_42efa8c.bundle Elektron-Recovered
cd Elektron-Recovered
git log --oneline -1        # main = b232de1 (the merged release-candidate line)
git tag                     # includes v0.1.0-rc1
git checkout claude/docs-structure-large-projects-b6vxx5   # 42efa8c: + the non-destructive engine fix
```
`main` (`b232de1`) is the merged mainline; the branch tip (`42efa8c`) additionally
carries the non-destructive Platform 001 engine fix that this runtime is built from
(a reviewable commit, not yet merged to main).

> Note on the repository name: the GitHub repo is literally `Elektron-Indsutrial`
> (a spelling fixed at creation time). Deliverable filenames use the corrected
> `Elektron-Industrial`; the bundle's internal remote refs still point at the real
> repo name. Renaming the GitHub repo requires owner action and is out of scope here.

## 3. Local install backups (Backup Elektron.command)

Writes a **checksum-sealed** `.local/backups/elektron-backup-<date>.tar.gz`
containing the engine database, generated outputs, and any `.local/data`. Sealing
uses the portable `shasum`/`sha256sum` (macOS BSD compatible) and the backup
**fails loudly** if sealing fails — it never produces an unsealed backup. Source is
not included (that lives in #1 and #2).

### Restore (guarded)

`Restore Elektron.command` (or `bash scripts/restore.sh [file] [--force]`):
1. validates the archive listing and **rejects absolute paths, `..`, symlinks, and
   unexpected top-levels before extracting**;
2. **aborts on a checksum mismatch by default** (`--force` to override deliberately);
3. makes an automatic **pre-restore safety backup**;
4. restores through a private staging directory (atomic-ish replace of the db + output);
5. runs a **post-restore** `PRAGMA integrity_check` (if `sqlite3` present) and an
   engine build+test.

## Moving to another Mac

Copy the whole folder, then run **Install Elektron.command** on the new Mac. Do
**not** copy `.local/venv` or `engine/node_modules` — they contain absolute paths /
platform binaries; Install rebuilds them offline from `vendor/`.

## Disaster recovery order

1. Have the folder → **Install Elektron.command**.
2. Lost the folder → unzip the source snapshot (#1) or `git clone` the bundle (#2), then Install.
3. Lost local data → **Restore Elektron.command**, or just re-run **Generate Platform 001** (deterministic).
