#!/usr/bin/env bash
# Double-clickable macOS launcher. Resolves its own location; runs the script; keeps
# the window open. Works wherever the bundle is extracted.
cd "$(dirname "$0")" || exit 1
bash "./scripts/backup.sh" "$@"
status=$?
echo
[ $status -eq 0 ] && echo "Done (exit 0)." || echo "Finished with exit $status — read the messages above."
[ -t 0 ] && { printf "Press Return to close… "; read -r _; } || true
exit $status
