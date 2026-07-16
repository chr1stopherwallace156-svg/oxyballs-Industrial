from __future__ import annotations

import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

FIXTURES = Path(__file__).resolve().parent / "fixtures"


@pytest.fixture
def fixtures_dir() -> Path:
    return FIXTURES


@pytest.fixture
def cube_obj(fixtures_dir: Path) -> Path:
    return fixtures_dir / "cube.obj"


@pytest.fixture
def malformed_obj(fixtures_dir: Path) -> Path:
    return fixtures_dir / "malformed.obj"


@pytest.fixture
def type_mismatch_glb(fixtures_dir: Path) -> Path:
    return fixtures_dir / "type_mismatch.glb"


@pytest.fixture
def store_root(tmp_path: Path) -> Path:
    root = tmp_path / "eae_store"
    root.mkdir()
    return root
