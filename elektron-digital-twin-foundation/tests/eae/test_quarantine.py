from __future__ import annotations

import zipfile
from pathlib import Path

from eae.core.quarantine import inspect_zip_security, safe_extract_zip_to_quarantine


def _write_zip(path: Path, members: dict[str, bytes]) -> None:
    with zipfile.ZipFile(path, "w") as zf:
        for name, data in members.items():
            zf.writestr(name, data)


def test_zip_path_traversal_rejected(tmp_path: Path):
    zpath = tmp_path / "evil.zip"
    _write_zip(zpath, {"../../escape.txt": b"pwned", "ok.txt": b"hi"})
    safety = inspect_zip_security(zpath)
    assert safety["safe"] is False
    assert any(".." in e for e in safety["unsafe_entries"])

    outside = tmp_path / "outside"
    outside.mkdir()
    marker = outside / "escape.txt"
    q = tmp_path / "quarantine"
    result = safe_extract_zip_to_quarantine(zpath, q)
    assert result["status"] == "REJECT_SECURITY"
    assert not marker.exists()
    # Nothing written under quarantine from unsafe archive
    assert not any(q.rglob("*")) or result["status"] == "REJECT_SECURITY"


def test_absolute_archive_path_rejected(tmp_path: Path):
    zpath = tmp_path / "abs.zip"
    _write_zip(zpath, {"/tmp/evil.txt": b"nope"})
    safety = inspect_zip_security(zpath)
    assert safety["safe"] is False
    result = safe_extract_zip_to_quarantine(zpath, tmp_path / "q")
    assert result["status"] == "REJECT_SECURITY"


def test_safe_zip_extracts_inside_quarantine(tmp_path: Path):
    zpath = tmp_path / "safe.zip"
    _write_zip(zpath, {"nested/a.txt": b"ok"})
    q = tmp_path / "q"
    result = safe_extract_zip_to_quarantine(zpath, q)
    assert result["status"] == "EXTRACTED"
    assert (q / "nested" / "a.txt").read_bytes() == b"ok"
