from __future__ import annotations

from pathlib import Path


def parse_obj(path: Path) -> dict:
    verts = 0
    faces = 0
    objects: list[str] = []
    errors: list[str] = []
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as exc:
        return {"status": "FAIL", "errors": [str(exc)], "vertex_count": None, "face_count": None, "objects": []}

    if not text.strip():
        return {"status": "FAIL", "errors": ["empty file"], "vertex_count": 0, "face_count": 0, "objects": []}

    for i, line in enumerate(text.splitlines(), 1):
        s = line.strip()
        if not s or s.startswith("#"):
            continue
        if s.startswith("v "):
            parts = s.split()
            if len(parts) < 4:
                errors.append(f"line {i}: malformed vertex")
            else:
                try:
                    float(parts[1]); float(parts[2]); float(parts[3])
                    verts += 1
                except ValueError:
                    errors.append(f"line {i}: non-numeric vertex")
        elif s.startswith("f "):
            parts = s.split()[1:]
            if len(parts) < 3:
                errors.append(f"line {i}: malformed face")
            else:
                faces += 1
        elif s.startswith("o ") or s.startswith("g "):
            objects.append(s[2:].strip())

    status = "PASS" if verts > 0 and not errors else ("FAIL" if errors and verts == 0 else ("PASS_WITH_WARNINGS" if errors else "PASS"))
    if verts == 0 and not errors:
        status = "FAIL"
        errors.append("no vertices")
    return {
        "status": status,
        "format": "OBJ",
        "vertex_count": verts,
        "face_count": faces,
        "objects": objects,
        "errors": errors,
    }
