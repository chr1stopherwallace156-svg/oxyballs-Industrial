"""Canonical JSON matching elektron-capture-ios Docs/Validation/CANONICAL_JSON.md."""

from __future__ import annotations

import json
import math
from typing import Any


def _normalize(value: Any) -> Any:
    if isinstance(value, dict):
        if len(value) != len({str(k) for k in value}):
            raise ValueError("duplicate object keys after string coercion")
        return {str(k): _normalize(value[k]) for k in sorted(value, key=lambda x: str(x))}
    if isinstance(value, list):
        return [_normalize(v) for v in value]
    if isinstance(value, bool) or value is None:
        return value
    if isinstance(value, int) and not isinstance(value, bool):
        return value
    if isinstance(value, float):
        if not math.isfinite(value):
            raise ValueError("non-finite float rejected by canonical JSON policy")
        if value.is_integer() and abs(value) <= 2**53:
            return int(value)
        return value
    if isinstance(value, str):
        return value
    raise TypeError(f"unsupported canonical JSON type: {type(value)!r}")


def dumps_canonical(obj: Any) -> bytes:
    """UTF-8 canonical JSON bytes: sorted keys, compact separators, ensure_ascii=True."""
    normalized = _normalize(obj)
    text = json.dumps(
        normalized,
        sort_keys=True,
        separators=(",", ":"),
        ensure_ascii=True,
        allow_nan=False,
    )
    return text.encode("utf-8")


def loads_json_object(raw: bytes) -> Any:
    return json.loads(raw.decode("utf-8"))
