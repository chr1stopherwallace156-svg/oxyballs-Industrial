from __future__ import annotations

import io
import stat
import struct
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

    marker = tmp_path / "escape.txt"
    q = tmp_path / "quarantine"
    result = safe_extract_zip_to_quarantine(zpath, q)
    assert result["status"] == "REJECT_SECURITY"
    assert not marker.exists()


def test_absolute_archive_path_rejected(tmp_path: Path):
    zpath = tmp_path / "abs.zip"
    _write_zip(zpath, {"/tmp/evil.txt": b"nope"})
    safety = inspect_zip_security(zpath)
    assert safety["safe"] is False
    result = safe_extract_zip_to_quarantine(zpath, tmp_path / "q")
    assert result["status"] == "REJECT_SECURITY"


def test_windows_style_traversal_rejected(tmp_path: Path):
    zpath = tmp_path / "win.zip"
    _write_zip(zpath, {"..\\..\\escape.txt": b"pwn", "C:\\Windows\\evil.txt": b"nope"})
    safety = inspect_zip_security(zpath)
    assert safety["safe"] is False
    assert len(safety["unsafe_entries"]) >= 1
    assert safe_extract_zip_to_quarantine(zpath, tmp_path / "q")["status"] == "REJECT_SECURITY"


def test_symlink_entry_rejected(tmp_path: Path):
    zpath = tmp_path / "link.zip"
    with zipfile.ZipFile(zpath, "w") as zf:
        info = zipfile.ZipInfo("link_to_etc")
        info.create_system = 3  # Unix
        info.external_attr = (stat.S_IFLNK | 0o777) << 16
        zf.writestr(info, b"/etc/passwd")
        zf.writestr("ok.txt", b"hi")
    safety = inspect_zip_security(zpath)
    assert safety["safe"] is False
    assert "link_to_etc" in safety["symlink_entries"]
    assert safe_extract_zip_to_quarantine(zpath, tmp_path / "q")["status"] == "REJECT_SECURITY"


def test_duplicate_destination_paths_rejected(tmp_path: Path):
    zpath = tmp_path / "dup.zip"
    # Two names that normalize to the same destination
    _write_zip(zpath, {"dir/a.txt": b"one", "dir//a.txt": b"two"})
    safety = inspect_zip_security(zpath)
    assert safety["safe"] is False
    assert safety["duplicate_destinations"]


def test_excessive_compression_ratio_rejected(tmp_path: Path):
    """Craft a ZIP member claiming huge uncompressed size (zip-bomb signal)."""
    zpath = tmp_path / "bomb.zip"
    # Use ZipInfo with forged file_size while tiny payload
    with zipfile.ZipFile(zpath, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        data = b"0" * 64
        info = zipfile.ZipInfo("huge.bin")
        # writestr will set sizes from data; we patch after via raw rewrite is hard.
        # Instead compress highly compressible data that expands ratio when large.
        huge = b"A" * (2 * 1024 * 1024)  # 2 MiB of zeros-like
        zf.writestr(info, huge, compress_type=zipfile.ZIP_DEFLATED)
    safety = inspect_zip_security(zpath)
    # 2MiB compressible may or may not exceed ratio 100; force by manually editing ZipInfo in a custom zip
    # Build minimal zip with mismatched sizes using ZipFile + mutate is unreliable.
    # Use inspect logic unit: craft via low-level if needed.
    if safety["safe"]:
        # Fallback crafted archive: write a zip then reopen and check ratio path with synthetic inspect
        from eae.core import quarantine as qmod

        # Directly verify ratio guard helper via a fake ZipInfo-like path by writing
        # a zip where compress_size is tiny relative to file_size using ZIP64 tricks.
        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", compression=zipfile.ZIP_STORED) as zf:
            zf.writestr("pad.bin", b"x" * 10)
        # Re-open and monkeypatch by calling inspect on a zip we build with ZipInfo.file_size override
        # Python allows setting file_size before writestr only if we use ZipInfo carefully:
        buf2 = io.BytesIO()
        with zipfile.ZipFile(buf2, "w") as zf:
            info = zipfile.ZipInfo("bomb.bin")
            payload = b"B" * 100
            # After writestr sizes match; so call ratio check function via constructing safety manually
            assert qmod.MAX_COMPRESSION_RATIO == 100.0
        # Create zip with extreme declared size using structural write
        zpath2 = tmp_path / "bomb2.zip"
        _write_zip_with_forged_size(zpath2, "bomb.bin", payload=b"tiny", claimed_size=5 * 1024 * 1024)
        safety2 = inspect_zip_security(zpath2)
        assert safety2["safe"] is False
        assert safety2["ratio_violations"]
    else:
        assert safety["ratio_violations"] or safety["total_uncompressed_bytes"] > 0


def _write_zip_with_forged_size(path: Path, name: str, payload: bytes, claimed_size: int) -> None:
    """Write a ZIP local file header with forged uncompressed size (for ratio tests)."""
    # Local file header + data + central directory with matching forged sizes
    comp = payload  # stored
    fname = name.encode("utf-8")
    crc = zipfile.crc32(payload) & 0xFFFFFFFF

    def local_header(uncomp: int) -> bytes:
        return struct.pack(
            "<IHHHHHIIIHH",
            0x04034B50,
            20,
            0,
            0,  # stored
            0,
            0,
            crc,
            len(comp),
            uncomp,
            len(fname),
            0,
        ) + fname + comp

    def central_header(uncomp: int, offset: int) -> bytes:
        return struct.pack(
            "<IHHHHHHIIIHHHHHII",
            0x02014B50,
            20,
            20,
            0,
            0,
            0,
            0,
            crc,
            len(comp),
            uncomp,
            len(fname),
            0,
            0,
            0,
            0,
            0,
            offset,
        ) + fname

    local = local_header(claimed_size)
    central = central_header(claimed_size, 0)
    end = struct.pack("<IHHHHIIH", 0x06054B50, 0, 0, 1, 1, len(central), len(local), 0)
    path.write_bytes(local + central + end)


def test_safe_zip_extracts_inside_quarantine(tmp_path: Path):
    zpath = tmp_path / "safe.zip"
    _write_zip(zpath, {"nested/a.txt": b"ok"})
    q = tmp_path / "q"
    result = safe_extract_zip_to_quarantine(zpath, q)
    assert result["status"] == "EXTRACTED"
    assert (q / "nested" / "a.txt").read_bytes() == b"ok"
