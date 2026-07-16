from __future__ import annotations

from pathlib import Path

from eae.core.detection import detect_format


def test_cube_obj_detected_heuristic(cube_obj: Path):
    d = detect_format(cube_obj)
    assert d["detected_format"] == "OBJ"
    assert d["format_detection_method"] == "CONTENT_HEURISTIC"
    assert d["format_detection_confidence"] in {"HIGH", "MEDIUM"}
    assert d["extension_claim"] == "obj"


def test_type_mismatch_content_is_obj_not_glb(type_mismatch_glb: Path):
    d = detect_format(type_mismatch_glb)
    assert d["detected_format"] == "OBJ"
    assert d["extension_claim"] == "glb"


def test_executable_magic(tmp_path: Path):
    p = tmp_path / "tool.exe"
    p.write_bytes(b"MZ" + b"\x00" * 64)
    d = detect_format(p)
    assert d["detected_format"] == "PE_EXECUTABLE"
    assert d["format_detection_method"] == "BINARY_MAGIC"
