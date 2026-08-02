# elektron-capture-ios — layered operations entry point
# Default: make help
# Flow: HELP → DOCTOR → PREFLIGHT → ACTION → EVIDENCE → STATUS → SAFE RECOVERY

SHELL := /bin/bash
.DEFAULT_GOAL := help

ROOT := $(abspath .)
WORKSPACE := Phase1StillCapture.xcworkspace
SCHEME := Phase1StillCapture

.PHONY: help doctor verify verify-handoff open build test xcode-build \
	simulator-test device-build device-preflight device-check \
	package-check export-check repo-locator troubleshoot \
	evidence-status record-device-validation \
	repair-derived-data repair-package-cache repair-xcode-cache \
	package-help export-help help-system-check \
	ops-system-check diagnose clean \
	handoff handoff-verify handoff-prepare handoff-package \
	ekp-prepare ekp-package

help:
	@./Scripts/help.sh

doctor:
	@./Scripts/doctor.sh

verify:
	@./Scripts/verify-xcode-handoff.sh

verify-handoff:
	@./Scripts/verify-handoff.sh

# Two-stage handoff (see Docs/Governance/CHANGELOG_AND_HANDOFF_GOVERNANCE.md):
#   1) make handoff-prepare  → tracked Handoff/ metadata (commit these)
#   2) make handoff-package  → clean HEAD only → untracked dist/handoff-<id>/
handoff-prepare:
	@chmod +x ./Scripts/handoff-prepare.sh
	@./Scripts/handoff-prepare.sh

handoff-package:
	@chmod +x ./Scripts/handoff-package.sh
	@./Scripts/handoff-package.sh

# Elektron Knowledge Package (full subsystem snapshot — not a coding-session handoff)
#   1) make ekp-prepare   → living docs + KnowledgePackage/ (commit)
#   2) make ekp-package   → clean HEAD → dist/EKP-CAPTURE-XXXX/
ekp-prepare:
	@chmod +x ./Scripts/ekp-prepare.sh
	@./Scripts/ekp-prepare.sh

ekp-package:
	@chmod +x ./Scripts/ekp-package.sh
	@./Scripts/ekp-package.sh

# Deprecated single-shot path — refuses to recreate the circular-hash paradox
handoff:
	@echo "ERROR: single-shot 'make handoff' is retired (circular hash / dirty-tree paradox)."
	@echo "Use the two-stage model:"
	@echo "  make handoff-prepare   # Stage 1 — tracked metadata"
	@echo "  git add … && git commit"
	@echo "  make handoff-package   # Stage 2 — clean HEAD → dist/<HANDOFF_ID>/"
	@exit 1

handoff-verify:
	@echo "ERROR: 'make handoff-verify' is retired for in-tree Handoff/artifacts."
	@echo "Stage 2 'make handoff-package' performs DIGESTS_VERIFIED + RESTORATION_TEST_PASSED"
	@echo "against dist/<HANDOFF_ID>/SHA256SUMS.txt."
	@exit 1

open:
	@./Scripts/open-workspace.sh

build:
	@echo "==> swift build (ElektronCapture package only — not the iOS app)"
	@swift build

test:
	@echo "==> swift test (package unit + golden)"
	@swift test

xcode-build:
	@command -v xcodebuild >/dev/null 2>&1 || { \
	  echo "xcodebuild not available on this host (need Mac/Xcode)."; \
	  echo "Linux: use 'make build' / 'make test' / 'make verify' (layout only)."; \
	  echo "HANDOFF_XCODE_BUILD_SKIPPED"; \
	  exit 1; \
	}
	@echo "==> xcodebuild clean build (app target — does NOT claim runtime)"
	@mkdir -p Docs/Evidence/Runs; \
	RUN="Docs/Evidence/Runs/$$(date -u +%Y-%m-%dT%H%M%SZ)-xcode-build"; \
	mkdir -p "$$RUN"; \
	echo "$(ROOT)" >"$$RUN/repository-path.txt"; \
	xcodebuild \
	  -workspace "$(WORKSPACE)" \
	  -scheme "$(SCHEME)" \
	  -destination 'generic/platform=iOS' \
	  clean build 2>&1 | tee "$$RUN/xcode-build.log"; \
	echo "Evidence: $$RUN"

simulator-test:
	@command -v xcodebuild >/dev/null 2>&1 || { \
	  echo "xcodebuild not available (need Mac/Xcode)."; \
	  exit 1; \
	}
	@echo "==> xcodebuild test on iOS Simulator (NOT a physical device)"
	@xcodebuild test \
	  -workspace "$(WORKSPACE)" \
	  -scheme "$(SCHEME)" \
	  -destination 'platform=iOS Simulator,name=iPhone 16'

device-build:
	@command -v xcodebuild >/dev/null 2>&1 || { \
	  echo "xcodebuild not available (need Mac/Xcode)."; \
	  exit 1; \
	}
	@echo "==> xcodebuild -sdk iphoneos (compile/sign ONLY)"
	@echo "This does NOT install/run the app and does NOT prove capture/export."
	@xcodebuild \
	  -workspace "$(WORKSPACE)" \
	  -scheme "$(SCHEME)" \
	  -sdk iphoneos \
	  -destination 'generic/platform=iOS' \
	  build

device-preflight: device-check

device-check:
	@./Scripts/device-preflight.sh

package-check:
	@./Scripts/package-check.sh "$(PKG)"

export-check:
	@echo "Export runtime is manual on device. Use:"
	@echo "  make device-preflight"
	@echo "  (Xcode ⌘R → capture → approve → Share → Save to Files)"
	@echo "  make record-device-validation"
	@echo "  make package-check PKG=/path/to/file.edts-pkg"
	@./Scripts/help.sh export

repo-locator:
	@./Scripts/repo-locator.sh

troubleshoot:
	@./Scripts/help.sh troubleshoot

diagnose:
	@./Scripts/diagnose.sh "$(MSG)"

evidence-status:
	@./Scripts/evidence-status.sh

record-device-validation:
	@./Scripts/record-device-validation.sh

repair-derived-data:
	@./Scripts/repair-derived-data.sh

repair-xcode-cache: repair-package-cache

repair-package-cache:
	@./Scripts/repair-package-cache.sh

package-help:
	@./Scripts/help.sh package

export-help:
	@./Scripts/help.sh export

help-system-check:
	@./Scripts/verify-help-system.sh

ops-system-check:
	@./Scripts/verify-operations-system.sh

clean:
	@echo "make clean will remove ONLY repository-local build products:"
	@echo "  - $(ROOT)/.build"
	@echo "  - $(ROOT)/build   (if present)"
	@echo "  - $(ROOT)/Docs/Evidence/XCODE_APP_BUILD/DerivedData  (if present)"
	@echo "It will NOT delete global ~/Library/Developer/Xcode/DerivedData."
	@echo "For DerivedData repair with confirmation: make repair-derived-data"
	@if [[ -t 0 ]]; then \
	  read -r -p "Type yes to continue: " ans; \
	  if [[ "$$ans" != "yes" ]]; then echo "Aborted."; exit 1; fi; \
	else \
	  if [[ "$${CONFIRM:-}" != "yes" ]]; then \
	    echo "Non-interactive shell: re-run with CONFIRM=yes make clean"; \
	    exit 1; \
	  fi; \
	fi; \
	rm -rf "$(ROOT)/.build" "$(ROOT)/build" "$(ROOT)/Docs/Evidence/XCODE_APP_BUILD/DerivedData"; \
	echo "Clean complete."
