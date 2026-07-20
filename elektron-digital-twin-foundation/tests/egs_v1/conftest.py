from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
PROPOSAL = ROOT / "proposals" / "egs-v1"
if str(PROPOSAL) not in sys.path:
    sys.path.insert(0, str(PROPOSAL))

FIXTURES = PROPOSAL / "fixtures"
SAMPLES = PROPOSAL / "samples"


@pytest.fixture
def synthetic_edges() -> list[dict]:
    return json.loads((FIXTURES / "synthetic_edges.json").read_text())


@pytest.fixture
def f450_sample_doc() -> dict:
    return json.loads((SAMPLES / "f450_fl_door_edges_candidate_unverified.json").read_text())


@pytest.fixture
def f450_edges(f450_sample_doc: dict) -> list[dict]:
    return f450_sample_doc["edges"]
