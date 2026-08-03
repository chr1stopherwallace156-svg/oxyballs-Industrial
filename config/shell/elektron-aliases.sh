# Elektron shell aliases — source from repo root:
#   source config/shell/elektron-aliases.sh
#
# EDE (workstation) vs Local Runtime are intentionally separate:
#   elektron-ede-*     → npm run ede:*
#   elektron-runtime-* → npm run doctor / backup (operator runtime)

_EDE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"

alias elektron-start="(cd \"$_EDE_ROOT\" && npm run dashboard && echo && echo Next: npm run ede:doctor)"
alias elektron-test="(cd \"$_EDE_ROOT\" && npm run check)"
alias elektron-build="(cd \"$_EDE_ROOT\" && npm run verify)"
alias elektron-db="(cd \"$_EDE_ROOT\" && npm run db:health)"
alias elektron-ede-doctor="(cd \"$_EDE_ROOT\" && npm run ede:doctor)"
alias elektron-ede-snapshot="(cd \"$_EDE_ROOT\" && npm run ede:snapshot)"
alias elektron-runtime-doctor="(cd \"$_EDE_ROOT\" && npm run doctor)"
alias elektron-runtime-backup="(cd \"$_EDE_ROOT\" && npm run backup)"

# Explicit — do not alias generic elektron-doctor/backup (ambiguous across products).

export ELEKTRON_ROOT="$_EDE_ROOT"
echo "Elektron aliases loaded (root=$ELEKTRON_ROOT)"
echo "  EDE:     elektron-ede-doctor | elektron-ede-snapshot"
echo "  Runtime: elektron-runtime-doctor | elektron-runtime-backup"
