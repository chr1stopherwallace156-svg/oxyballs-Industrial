#!/usr/bin/env python3
"""
Deterministic ELEKTRON standards HTML generator.

Renders a canonical Markdown master + its machine-readable metadata into a
self-contained, offline-viewable HTML presentation artifact.

Design contract (see docs/standards/EES/DECISIONS.md, EES-ADR-0001 / ROADMAP):
  * DETERMINISTIC — output is a pure function of (markdown bytes, the metadata
    fields consumed, --source-sha). No timestamps or environment leakage, so
    regeneration is byte-identical. This is what `make standards-verify` relies on.
  * DERIVED — the output carries a "DERIVED — DO NOT EDIT" notice plus provenance
    (canonical source path, document ID + version, source commit SHA).
  * NON-MUTATING — this script never writes to the canonical Markdown or metadata;
    it only writes --out.

Stdlib only (no third-party dependencies) so it runs identically in local and CI.
"""
import argparse
import html
import json
import re
import sys


# --------------------------------------------------------------------------- #
# Inline rendering
# --------------------------------------------------------------------------- #
def esc(text):
    return html.escape(text, quote=False)


def esc_attr(text):
    return html.escape(text, quote=True)


def inline(raw):
    """Render inline markdown (links, code, bold, italic) to safe HTML."""
    tokens = []

    def stash(rendered):
        tokens.append(rendered)
        return "\x00%d\x00" % (len(tokens) - 1)

    # Links first — link text may itself contain code/bold, so recurse.
    def link_repl(m):
        return stash('<a href="%s">%s</a>' % (esc_attr(m.group(2)), inline(m.group(1))))

    raw = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link_repl, raw)

    # Code spans.
    def code_repl(m):
        return stash("<code>%s</code>" % esc(m.group(1)))

    raw = re.sub(r"`([^`]+)`", code_repl, raw)

    # Escape the remaining literal text, then apply emphasis.
    raw = esc(raw)
    raw = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", raw)
    raw = re.sub(r"\*([^*]+?)\*", r"<em>\1</em>", raw)

    # Restore stashed (already-safe) HTML.
    raw = re.sub(r"\x00(\d+)\x00", lambda m: tokens[int(m.group(1))], raw)
    return raw


def slug(text):
    text = re.sub(r"`|\*|\[|\]", "", text)
    text = re.sub(r"\(([^)]*)\)", r"\1", text)
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text


# --------------------------------------------------------------------------- #
# Block parsing
# --------------------------------------------------------------------------- #
def strip_leading_comment(md):
    return re.sub(r"^\s*<!--.*?-->\s*", "", md, count=1, flags=re.DOTALL)


def render_table(rows):
    # rows: list of raw "| a | b |" lines; rows[1] is the separator.
    def cells(line):
        parts = line.strip().split("|")
        if parts and parts[0] == "":
            parts = parts[1:]
        if parts and parts[-1] == "":
            parts = parts[:-1]
        return [c.strip() for c in parts]

    header = cells(rows[0])
    aligns = []
    for spec in cells(rows[1]):
        left = spec.startswith(":")
        right = spec.endswith(":")
        aligns.append("center" if left and right else "right" if right else "left")
    out = ['<div class="tablewrap"><table>', "<thead><tr>"]
    for i, h in enumerate(header):
        a = aligns[i] if i < len(aligns) else "left"
        out.append('<th class="%s">%s</th>' % (a, inline(h)))
    out.append("</tr></thead><tbody>")
    for line in rows[2:]:
        out.append("<tr>")
        for i, c in enumerate(cells(line)):
            a = aligns[i] if i < len(aligns) else "left"
            out.append('<td class="%s">%s</td>' % (a, inline(c)))
        out.append("</tr>")
    out.append("</tbody></table></div>")
    return "".join(out)


def md_to_html(md):
    md = strip_leading_comment(md)
    lines = md.split("\n")
    i, n = 0, len(lines)
    body = []
    toc = []

    def is_table_row(s):
        return s.lstrip().startswith("|")

    while i < n:
        line = lines[i]
        stripped = line.strip()

        # Blank line
        if stripped == "":
            i += 1
            continue

        # Horizontal rule
        if stripped == "---":
            body.append("<hr>")
            i += 1
            continue

        # Fenced code
        if stripped.startswith("```"):
            i += 1
            buf = []
            while i < n and lines[i].strip() != "```":
                buf.append(lines[i])
                i += 1
            i += 1  # closing fence
            body.append("<pre class=\"blueprint\">%s</pre>" % esc("\n".join(buf)))
            continue

        # Headings
        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            level = len(m.group(1))
            text = m.group(2).strip()
            if level == 1:
                body.append("<h1>%s</h1>" % inline(text))
            else:
                sid = slug(text)
                body.append('<h%d id="%s">%s</h%d>' % (level, sid, inline(text), level))
                if level == 2:
                    toc.append((sid, text))
            i += 1
            continue

        # Blockquote
        if stripped.startswith(">"):
            buf = []
            while i < n and lines[i].strip().startswith(">"):
                buf.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            # Split into paragraphs on blank lines.
            paras, cur = [], []
            for bl in buf:
                if bl.strip() == "":
                    if cur:
                        paras.append(" ".join(cur))
                        cur = []
                else:
                    cur.append(bl.strip())
            if cur:
                paras.append(" ".join(cur))
            body.append(
                '<blockquote class="callout">%s</blockquote>'
                % "".join("<p>%s</p>" % inline(p) for p in paras)
            )
            continue

        # Table
        if is_table_row(line) and i + 1 < n and re.match(r"^\s*\|?[\s:|-]+\|?\s*$", lines[i + 1]) and "-" in lines[i + 1]:
            rows = []
            while i < n and is_table_row(lines[i]):
                rows.append(lines[i])
                i += 1
            body.append(render_table(rows))
            continue

        # Lists (ordered / unordered)
        list_m = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)$", line)
        if list_m:
            ordered = bool(re.match(r"\d+\.", list_m.group(2)))
            items = []
            while i < n:
                lm = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)$", lines[i])
                if lm:
                    items.append(lm.group(3).strip())
                    i += 1
                elif lines[i].strip() == "":
                    break
                elif lines[i].startswith((" ", "\t")):
                    # continuation of the previous item
                    if items:
                        items[-1] += " " + lines[i].strip()
                    i += 1
                else:
                    break
            tag = "ol" if ordered else "ul"
            body.append(
                "<%s>%s</%s>"
                % (tag, "".join("<li>%s</li>" % inline(it) for it in items), tag)
            )
            continue

        # Paragraph
        buf = []
        while i < n and lines[i].strip() != "" and not lines[i].strip().startswith(
            ("#", ">", "```", "|", "---")
        ) and not re.match(r"^(\s*)([-*]|\d+\.)\s+", lines[i]):
            buf.append(lines[i].strip())
            i += 1
        if buf:
            body.append("<p>%s</p>" % inline(" ".join(buf)))
        else:
            i += 1

    return "\n".join(body), toc


# --------------------------------------------------------------------------- #
# Page assembly
# --------------------------------------------------------------------------- #
CSS = """
:root{--ground:#F5F7FA;--surface:#FFFFFF;--surface-2:#EDF1F6;--ink:#0F172A;--ink-2:#334155;--ink-3:#64748B;--line:#D5DEE8;--slate:#1E293B;--accent:#0284C7;--good:#0F766E;--warn:#B45309;--crit:#B91C1C;--mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;--sans:Arial,"Helvetica Neue",Helvetica,system-ui,sans-serif;--maxw:60rem;--bp-bg:#0F172A;--bp-ink:#93C5FD;--bp-line:#1E3A5F;}
@media (prefers-color-scheme:dark){:root{--ground:#0B1120;--surface:#111a2b;--surface-2:#152034;--ink:#E7EDF5;--ink-2:#B7C4D6;--ink-3:#8697AD;--line:#243450;--accent:#38BDF8;--bp-bg:#0A1424;--bp-ink:#7DD3FC;--bp-line:#1E3A5F;}}
:root[data-theme="light"]{--ground:#F5F7FA;--surface:#FFFFFF;--surface-2:#EDF1F6;--ink:#0F172A;--ink-2:#334155;--ink-3:#64748B;--line:#D5DEE8;--accent:#0284C7;--bp-bg:#0F172A;--bp-ink:#93C5FD;}
:root[data-theme="dark"]{--ground:#0B1120;--surface:#111a2b;--surface-2:#152034;--ink:#E7EDF5;--ink-2:#B7C4D6;--ink-3:#8697AD;--line:#243450;--accent:#38BDF8;--bp-bg:#0A1424;--bp-ink:#7DD3FC;}
*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.62}
.shell{max-width:var(--maxw);margin:0 auto;padding:0 1.5rem 5rem}
.derived{background:var(--slate);color:#E2E8F0;border-bottom:2px solid var(--accent);font-family:var(--mono);font-size:.7rem}
.derived .in{max-width:var(--maxw);margin:0 auto;padding:.5rem 1.5rem;display:flex;flex-wrap:wrap;gap:.4rem 1.2rem;justify-content:space-between}
.derived b{color:#fff}
.derived .warn{color:#FBBF24;font-weight:700;letter-spacing:.1em}
h1{font-size:clamp(1.8rem,4vw,2.7rem);letter-spacing:-.02em;margin:2.4rem 0 .6rem;text-wrap:balance}
h2{font-size:clamp(1.3rem,3vw,1.8rem);letter-spacing:-.015em;margin:2.6rem 0 1rem;padding-top:.6rem;border-top:1px solid var(--line);text-wrap:balance}
h3{font-size:1.12rem;margin:1.8rem 0 .6rem;color:var(--ink)}
p{margin:0 0 1rem;color:var(--ink-2);max-width:44rem}
a{color:var(--accent)}
strong{color:var(--ink);font-weight:700}
code{font-family:var(--mono);font-size:.86em;background:var(--surface-2);padding:.08em .38em;border-radius:4px;color:var(--accent);border:1px solid var(--line)}
hr{border:none;border-top:1px solid var(--line);margin:2rem 0 0}
ul,ol{color:var(--ink-2);max-width:44rem;padding-left:1.3rem}
li{margin:.3rem 0}
.tablewrap{overflow-x:auto;margin:1.2rem 0;border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:.86rem;background:var(--surface);min-width:32rem}
th{background:var(--slate);color:#E2E8F0;font-family:var(--mono);font-size:.68rem;letter-spacing:.05em;text-transform:uppercase;font-weight:700;padding:.6rem .85rem;border-bottom:2px solid var(--accent)}
td{padding:.55rem .85rem;border-bottom:1px solid var(--line);color:var(--ink-2);vertical-align:top}
tr:last-child td{border-bottom:none}
th.center,td.center{text-align:center}
th.right,td.right{text-align:right;font-variant-numeric:tabular-nums}
th.left,td.left{text-align:left}
pre.blueprint{background:var(--bp-bg);border:1px solid var(--bp-line);border-radius:10px;padding:1.1rem 1.2rem;margin:1.2rem 0;overflow-x:auto;font-family:var(--mono);font-size:.76rem;line-height:1.5;color:var(--bp-ink);white-space:pre}
blockquote.callout{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border:1px solid color-mix(in srgb,var(--accent) 30%,var(--line));border-left:3px solid var(--accent);border-radius:8px;padding:.4rem 1.1rem;margin:1.4rem 0}
blockquote.callout p{color:var(--ink-2)}
nav.toc{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:1rem 1.2rem;margin:1.6rem 0}
nav.toc h2{font-family:var(--mono);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);margin:0 0 .6rem;border:none;padding:0}
nav.toc ol{list-style:none;padding:0;margin:0;columns:2;column-gap:2rem}
nav.toc li{break-inside:avoid;margin:.1rem 0}
nav.toc a{text-decoration:none;color:var(--ink-2);font-size:.86rem}
nav.toc a:hover{color:var(--accent)}
footer{margin-top:3rem;padding-top:1.4rem;border-top:1px solid var(--line);font-family:var(--mono);font-size:.72rem;color:var(--ink-3)}
footer .k{color:var(--accent)}
@media (max-width:640px){nav.toc ol{columns:1}}
"""


def build_page(meta, body, toc, source_sha, canonical_source):
    doc_id = meta["elek_id"]
    version = meta.get("version", "")
    lifecycle = meta.get("lifecycle_state", "")
    validation = meta.get("validation_state", "")
    title = meta.get("title", doc_id)

    toc_html = ""
    if toc:
        items = "".join('<li><a href="#%s">%s</a></li>' % (sid, esc(t)) for sid, t in toc)
        toc_html = '<nav class="toc"><h2>Contents</h2><ol>%s</ol></nav>' % items

    markers = (
        "<!-- GENERATED FILE - DO NOT EDIT BY HAND. -->\n"
        "<!-- Regenerate: scripts/generate_standards_html.py (or `make standards-verify`). -->\n"
        "<!-- source-canonical: %s -->\n"
        "<!-- source-elek-id: %s -->\n"
        "<!-- source-version: %s -->\n"
        "<!-- source-commit-sha: %s -->\n"
        % (canonical_source, doc_id, version, source_sha)
    )

    derived_bar = (
        '<div class="derived"><div class="in">'
        '<span class="warn">DERIVED - DO NOT EDIT</span>'
        "<span><b>Source:</b> %s</span>"
        "<span><b>%s</b> v%s &middot; %s / %s</span>"
        "<span><b>Commit:</b> %s</span>"
        "</div></div>"
        % (esc(canonical_source), esc(doc_id), esc(version), esc(lifecycle), esc(validation), esc(source_sha))
    )

    footer = (
        "<footer>"
        "<div>DERIVED presentation artifact - not the canonical source.</div>"
        '<div><span class="k">Canonical:</span> %s</div>'
        '<div><span class="k">Document:</span> %s v%s (%s / %s)</div>'
        '<div><span class="k">Source commit:</span> %s</div>'
        '<div><span class="k">Generator:</span> scripts/generate_standards_html.py</div>'
        "</footer>"
        % (esc(canonical_source), esc(doc_id), esc(version), esc(lifecycle), esc(validation), esc(source_sha))
    )

    return (
        "<!doctype html>\n"
        '<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        "%s"
        "<title>%s v%s (DERIVED)</title>\n"
        "<style>%s</style>\n</head>\n<body>\n"
        "%s\n"
        '<div class="shell">\n%s\n%s\n%s\n</div>\n'
        "</body>\n</html>\n"
        % (markers, esc(title), esc(version), CSS, derived_bar, toc_html, body, footer)
    )


def main():
    ap = argparse.ArgumentParser(description="Deterministic ELEKTRON standards HTML generator")
    ap.add_argument("--markdown", required=True)
    ap.add_argument("--metadata", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--source-sha", default="UNKNOWN",
                    help="Provenance commit SHA to stamp into the output.")
    args = ap.parse_args()

    with open(args.metadata, "r", encoding="utf-8") as fh:
        meta = json.load(fh)
    with open(args.markdown, "r", encoding="utf-8") as fh:
        md = fh.read()

    canonical_source = meta.get("canonical_source", args.markdown)
    body, toc = md_to_html(md)
    page = build_page(meta, body, toc, args.source_sha, canonical_source)

    with open(args.out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(page)
    return 0


if __name__ == "__main__":
    sys.exit(main())
