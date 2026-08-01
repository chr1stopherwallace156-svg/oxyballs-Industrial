#!/usr/bin/env python3
"""
JSON-heavy validation logic for the ELEKTRON standards verifier.

Invoked per-check by scripts/verify_standards.sh (the canonical entrypoint, run via
`make standards-verify`). Kept as a repository script so local and CI runs execute
identical logic — no validation rules live in the CI workflow YAML.

Each subcommand prints human-readable detail and exits 0 (pass) / 1 (fail).
Stdlib only.

Usage:
  verify_standards_checks.py schema      <schema.json> <data.json>
  verify_standards_checks.py unique-ids  <standards_root>
  verify_standards_checks.py objid       <objid_schema.json> <master.md>
  verify_standards_checks.py vocab       <metadata.json>
  verify_standards_checks.py header      <master.md> <metadata.json>
  verify_standards_checks.py links       <volume_dir>
"""
import json
import os
import re
import sys


# --------------------------------------------------------------------------- #
# Minimal JSON-Schema (draft-07 subset) validator
# --------------------------------------------------------------------------- #
def _vtype(t, v):
    if t == "object":
        return isinstance(v, dict)
    if t == "array":
        return isinstance(v, list)
    if t == "string":
        return isinstance(v, str)
    if t == "boolean":
        return isinstance(v, bool)
    if t == "null":
        return v is None
    if t == "integer":
        return isinstance(v, int) and not isinstance(v, bool)
    if t == "number":
        return isinstance(v, (int, float)) and not isinstance(v, bool)
    return True


def _resolve_ref(root, ref):
    node = root
    for part in ref.lstrip("#/").split("/"):
        node = node[part]
    return node


def _validate(root, s, v, path, errs):
    if "$ref" in s:
        _validate(root, _resolve_ref(root, s["$ref"]), v, path, errs)
        return
    if "oneOf" in s:
        matches = 0
        for sub in s["oneOf"]:
            sub_errs = []
            _validate(root, sub, v, path, sub_errs)
            if not sub_errs:
                matches += 1
        if matches != 1:
            errs.append("%s: matched %d of oneOf (need exactly 1)" % (path, matches))
        return
    if "type" in s:
        types = s["type"] if isinstance(s["type"], list) else [s["type"]]
        if not any(_vtype(t, v) for t in types):
            errs.append("%s: expected type %s, got %s" % (path, s["type"], type(v).__name__))
            return
    if "enum" in s and v not in s["enum"]:
        errs.append("%s: %r not in enum %s" % (path, v, s["enum"]))
    if "pattern" in s and isinstance(v, str) and not re.search(s["pattern"], v):
        errs.append("%s: %r does not match /%s/" % (path, v, s["pattern"]))
    if "minLength" in s and isinstance(v, str) and len(v) < s["minLength"]:
        errs.append("%s: shorter than minLength %d" % (path, s["minLength"]))
    if s.get("format") == "date" and isinstance(v, str) and not re.match(r"^\d{4}-\d{2}-\d{2}$", v):
        errs.append("%s: %r is not a date" % (path, v))
    if isinstance(v, dict):
        props = s.get("properties", {})
        for req in s.get("required", []):
            if req not in v:
                errs.append("%s: missing required '%s'" % (path, req))
        if s.get("additionalProperties", True) is False:
            for k in v:
                if k not in props:
                    errs.append("%s: unexpected property '%s'" % (path, k))
        for k, sub in props.items():
            if k in v:
                _validate(root, sub, v[k], "%s.%s" % (path, k), errs)
    if isinstance(v, list) and "items" in s:
        for idx, item in enumerate(v):
            _validate(root, s["items"], item, "%s[%d]" % (path, idx), errs)


def check_schema(schema_path, data_path):
    schema = json.load(open(schema_path, encoding="utf-8"))
    data = json.load(open(data_path, encoding="utf-8"))
    errs = []
    _validate(schema, schema, data, "$", errs)
    if errs:
        print("metadata does not conform to schema:")
        for e in errs:
            print("    - " + e)
        return 1
    print("%s conforms to %s" % (os.path.basename(data_path), os.path.basename(schema_path)))
    return 0


# --------------------------------------------------------------------------- #
# Unique ELEK-IDs across all standards volumes
# --------------------------------------------------------------------------- #
def check_unique_ids(standards_root):
    seen = {}
    dupes = []
    for dirpath, _dirs, files in os.walk(standards_root):
        for f in files:
            if f == "document-metadata.json":
                p = os.path.join(dirpath, f)
                meta = json.load(open(p, encoding="utf-8"))
                eid = meta.get("elek_id")
                if eid in seen:
                    dupes.append("%s duplicated in %s and %s" % (eid, seen[eid], p))
                else:
                    seen[eid] = p
    if dupes:
        for d in dupes:
            print("    - " + d)
        return 1
    print("unique ELEK-IDs: %s" % ", ".join(sorted(seen)))
    return 0


# --------------------------------------------------------------------------- #
# OBJ-ID format checks
# --------------------------------------------------------------------------- #
def check_objid(objid_schema_path, master_path):
    schema = json.load(open(objid_schema_path, encoding="utf-8"))
    pattern = schema["properties"]["object_id"]["pattern"]
    rx = re.compile(pattern)
    bad = []
    # 1) the schema's own examples must pass its pattern
    for ex in schema.get("examples", []):
        oid = ex.get("object_id", "")
        if not rx.search(oid):
            bad.append("schema example %r fails pattern" % oid)
    # 2) OBJ-IDs appearing in the master must be well-formed
    prefixes = "|".join(schema["properties"]["entity_code"]["enum"])
    md = open(master_path, encoding="utf-8").read()
    # Entity code must start a real token — not appear mid-hyphenated-token
    # (e.g. DOS-FLEET-0012 is a Dossier ID, not a FLEET OBJ-ID).
    found = set(re.findall(r"(?<![A-Za-z0-9-])(?:%s)-[0-9A-Za-z.\-]+" % prefixes, md))
    # only treat tokens that look like real IDs (contain a digit run) as OBJ-IDs
    checked = 0
    for tok in sorted(found):
        if re.search(r"-[0-9]", tok) or tok.startswith("FW-SOFT-v"):
            checked += 1
            if not rx.search(tok):
                bad.append("master OBJ-ID %r fails pattern" % tok)
    if bad:
        for b in bad:
            print("    - " + b)
        return 1
    print("OBJ-IDs valid (%d schema examples + %d in master)"
          % (len(schema.get("examples", [])), checked))
    return 0


# --------------------------------------------------------------------------- #
# Lifecycle / validation vocabulary + honesty rules
# --------------------------------------------------------------------------- #
LIFECYCLE = {"DRAFT", "BASELINE", "CONTROLLED_BASELINE", "VALIDATED", "LEGACY", "DEPRECATED", "ARCHIVED"}
VALIDATION = {"PENDING", "PENDING_VALIDATION", "IN_REVIEW", "SATISFIED", "VALIDATED"}


def check_vocab(metadata_path):
    meta = json.load(open(metadata_path, encoding="utf-8"))
    errs = []
    ls = meta.get("lifecycle_state")
    vs = meta.get("validation_state")
    ver = meta.get("version", "")
    if ls not in LIFECYCLE:
        errs.append("lifecycle_state %r not in %s" % (ls, sorted(LIFECYCLE)))
    if vs not in VALIDATION:
        errs.append("validation_state %r not in %s" % (vs, sorted(VALIDATION)))
    approvals = meta.get("approvals", {})
    all_signed = all(approvals.get(k) for k in ("author", "reviewer", "final_approval_easb"))
    # Honesty: a 0.x.x version must not be VALIDATED; VALIDATED requires all approvals.
    if ver.startswith("0.") and ls == "VALIDATED":
        errs.append("version %s (0.x) must not be lifecycle_state VALIDATED" % ver)
    if ls == "VALIDATED" and not all_signed:
        errs.append("lifecycle_state VALIDATED requires all s7.2 approvals to be recorded")
    if vs == "VALIDATED" and not all_signed:
        errs.append("validation_state VALIDATED requires all s7.2 approvals to be recorded")
    if errs:
        for e in errs:
            print("    - " + e)
        return 1
    print("vocabulary valid: lifecycle_state=%s validation_state=%s version=%s" % (ls, vs, ver))
    return 0


# --------------------------------------------------------------------------- #
# Canonical Markdown header <-> metadata agreement
# --------------------------------------------------------------------------- #
def _header_value(md, field):
    m = re.search(r"^\|\s*\*\*%s\*\*\s*\|\s*(.*?)\s*\|\s*$" % re.escape(field), md, re.MULTILINE)
    return m.group(1) if m else None


def check_header(master_path, metadata_path):
    md = open(master_path, encoding="utf-8").read()
    meta = json.load(open(metadata_path, encoding="utf-8"))
    errs = []

    def cell_code(field):
        raw = _header_value(md, field)
        if raw is None:
            return None
        m = re.search(r"`([^`]+)`", raw)
        return m.group(1) if m else raw

    ver = cell_code("Repository version")
    if ver != meta.get("version"):
        errs.append("Repository version: master %r != metadata %r" % (ver, meta.get("version")))
    ls = cell_code("Lifecycle state")
    if ls != meta.get("lifecycle_state"):
        errs.append("Lifecycle state: master %r != metadata %r" % (ls, meta.get("lifecycle_state")))
    vs = cell_code("Validation state")
    if vs != meta.get("validation_state"):
        errs.append("Validation state: master %r != metadata %r" % (vs, meta.get("validation_state")))
    doc_id = _header_value(md, "Document ID") or ""
    if meta.get("elek_id") not in doc_id:
        errs.append("Document ID: master %r does not contain metadata elek_id %r"
                    % (doc_id, meta.get("elek_id")))
    if errs:
        for e in errs:
            print("    - " + e)
        return 1
    print("master header agrees with metadata (version/lifecycle/validation/elek_id)")
    return 0


# --------------------------------------------------------------------------- #
# Internal Markdown reference integrity
# --------------------------------------------------------------------------- #
def check_links(volume_dir):
    broken = []
    total = 0
    for dirpath, _dirs, files in os.walk(volume_dir):
        for f in files:
            if not f.endswith(".md"):
                continue
            p = os.path.join(dirpath, f)
            text = open(p, encoding="utf-8").read()
            # strip fenced code so ASCII diagrams don't create false links
            text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
            for m in re.finditer(r"\[[^\]]+\]\(([^)]+)\)", text):
                target = m.group(1).strip()
                if target.startswith(("http://", "https://", "mailto:", "#")):
                    continue
                total += 1
                target = target.split("#", 1)[0]
                if not target:
                    continue
                resolved = os.path.normpath(os.path.join(dirpath, target))
                if not os.path.exists(resolved):
                    broken.append("%s -> %s (missing)" % (os.path.relpath(p), target))
    if broken:
        for b in broken:
            print("    - " + b)
        return 1
    print("internal markdown links OK (%d local links resolved)" % total)
    return 0


# --------------------------------------------------------------------------- #
def main(argv):
    if not argv:
        print("no check specified", file=sys.stderr)
        return 2
    cmd, rest = argv[0], argv[1:]
    table = {
        "schema": lambda: check_schema(rest[0], rest[1]),
        "unique-ids": lambda: check_unique_ids(rest[0]),
        "objid": lambda: check_objid(rest[0], rest[1]),
        "vocab": lambda: check_vocab(rest[0]),
        "header": lambda: check_header(rest[0], rest[1]),
        "links": lambda: check_links(rest[0]),
    }
    if cmd not in table:
        print("unknown check %r" % cmd, file=sys.stderr)
        return 2
    return table[cmd]()


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
