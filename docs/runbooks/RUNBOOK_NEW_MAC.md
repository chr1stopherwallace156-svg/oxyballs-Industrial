# RUNBOOK_NEW_MAC.md

## Goal

Turn a clean Mac into an Elektron workstation using only repository scripts.

## Steps

1. Install Xcode CLT: `xcode-select --install`  
2. Install Homebrew (optional but recommended).  
3. Install Node 20+: `brew install node` (or nvm).  
4. Install Python 3.11+: `brew install python`  
5. Clone this repository.  
6. From repo root:

```bash
./scripts/setup.sh
npm run doctor
```

7. Open the folder in Cursor/VS Code; install recommended extensions when prompted.  
8. `source config/shell/elektron-aliases.sh` (add to `~/.zshrc` if desired).

## Capture-iOS note

Physical camera work requires a separate `elektron-capture-ios` checkout and Xcode app target. EDE does not replace that toolchain.
