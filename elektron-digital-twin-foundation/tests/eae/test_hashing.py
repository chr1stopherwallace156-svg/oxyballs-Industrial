from __future__ import annotations

import hashlib
from pathlib import Path

from eae.core.hashing import asset_id_from_hash, content_address, sha256_hex_bytes, sha256_hex_file


def test_sha256_matches_known_value(cube_obj: Path):
    expected = hashlib.sha256(cube_obj.read_bytes()).hexdigest()
    actual = sha256_hex_file(cube_obj)
    assert actual == expected
    assert len(actual) == 64
    assert actual == actual.lower()


def test_sha256_deterministic_across_runs(cube_obj: Path):
    a = sha256_hex_file(cube_obj)
    b = sha256_hex_file(cube_obj)
    assert a == b


def test_content_address_and_asset_id_use_full_hash(cube_obj: Path):
    h = sha256_hex_file(cube_obj)
    assert content_address(h) == f"sha256:{h}"
    assert asset_id_from_hash(h) == f"AST-{h}"
    assert len(asset_id_from_hash(h)) == 4 + 64


def test_sha256_bytes_matches_file(cube_obj: Path):
    assert sha256_hex_bytes(cube_obj.read_bytes()) == sha256_hex_file(cube_obj)
