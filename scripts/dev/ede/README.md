# EDE development scripts (namespaced)

These are **workstation / development** tools. They are not the local-runtime
operator tools at `scripts/doctor.sh` and `scripts/backup.sh`.

| Script | npm command | Purpose |
|---|---|---|
| `doctor.sh` | `npm run ede:doctor` | Source-workstation prerequisites |
| `snapshot.sh` | `npm run ede:snapshot` | Dev snapshot of CTO docs/config/scaffold |

Runtime / operator (do not use these for EDE validation):

- `scripts/doctor.sh` → `npm run doctor`
- `scripts/backup.sh` → `npm run backup` (writes `.local/backups/`)
