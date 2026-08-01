# ELEKTRON repository Makefile.
# Canonical local commands; CI calls these same targets so local and CI never drift.

.PHONY: standards-verify standards-generate

## standards-verify: run the full ELEKTRON standards verification suite (Phase 0 gate).
standards-verify:
	@bash scripts/verify_standards.sh

## standards-generate: regenerate the derived EES presentation HTML from the canonical master.
standards-generate:
	@python3 scripts/generate_standards_html.py \
		--markdown docs/standards/EES/ELEK-QUAL-STD-0000.md \
		--metadata docs/standards/EES/document-metadata.json \
		--source-sha "$$(git rev-parse HEAD)" \
		--out docs/standards/EES/generated/ELEK-QUAL-STD-0000.html
