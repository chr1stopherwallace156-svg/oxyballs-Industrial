# Elektron shell aliases — source from repo root:
#   source config/shell/elektron-aliases.sh

_EDE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"

alias elektron-start="(cd \"$_EDE_ROOT\" && npm run dashboard && echo && echo Next: npm run doctor)"
alias elektron-test="(cd \"$_EDE_ROOT\" && npm run check)"
alias elektron-build="(cd \"$_EDE_ROOT\" && npm run verify)"
alias elektron-db="(cd \"$_EDE_ROOT\" && npm run db:health)"
alias elektron-doctor="(cd \"$_EDE_ROOT\" && npm run doctor)"
alias elektron-backup="(cd \"$_EDE_ROOT\" && npm run backup)"

export ELEKTRON_ROOT="$_EDE_ROOT"
echo "Elektron aliases loaded (root=$ELEKTRON_ROOT)"
