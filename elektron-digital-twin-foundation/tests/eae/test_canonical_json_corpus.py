"""Byte-identity lock for the shared cross-language canonical JSON corpus."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from eae.importers.xrepo_cap_edts.canonical_json import dumps_canonical

CORPUS_DIR = (
    Path(__file__).resolve().parents[2]
    / "verification"
    / "xrepo_cap_edts"
    / "canonical_corpus"
)


def test_python_canonical_bytes_match_checked_in_golden():
    semantic = json.loads((CORPUS_DIR / "corpus.semantic.json").read_text(encoding="utf-8"))
    actual = dumps_canonical(semantic)
    expected = (CORPUS_DIR / "corpus.python.canonical.json").read_bytes()
    assert actual == expected, _first_diff(actual, expected)
    digest = hashlib.sha256(actual).hexdigest()
    assert digest == (CORPUS_DIR / "corpus.python.canonical.sha256").read_text().strip()


def test_corpus_includes_difficult_cases():
    semantic = json.loads((CORPUS_DIR / "corpus.semantic.json").read_text(encoding="utf-8"))
    for key in (
        "ascii",
        "unicode",
        "escaped",
        "null_value",
        "true_value",
        "false_value",
        "integer",
        "negative_integer",
        "zero",
        "array",
        "nested",
        "empty_string",
        "empty_object",
        "empty_array",
        "timestamp_utc",
        "finite_float",
    ):
        assert key in semantic


def test_key_reordering_does_not_change_bytes():
    semantic = json.loads((CORPUS_DIR / "corpus.semantic.json").read_text(encoding="utf-8"))
    shuffled = {k: semantic[k] for k in sorted(semantic.keys(), reverse=True)}
    assert dumps_canonical(semantic) == dumps_canonical(shuffled)


def _first_diff(actual: bytes, expected: bytes) -> str:
    n = min(len(actual), len(expected))
    for i in range(n):
        if actual[i] != expected[i]:
            return (
                f"first differing byte at offset {i}: "
                f"actual=0x{actual[i]:02x} expected=0x{expected[i]:02x}; "
                f"actual_len={len(actual)} expected_len={len(expected)}"
            )
    return f"length mismatch actual={len(actual)} expected={len(expected)}"
