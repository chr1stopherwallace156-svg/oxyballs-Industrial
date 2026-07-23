from __future__ import annotations

import hashlib
import json
from typing import Any


def _canonical(obj: Any) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def event_hash(event: dict) -> str:
    payload = {k: v for k, v in event.items() if k != "event_hash"}
    digest = hashlib.sha256(_canonical(payload).encode("utf-8")).hexdigest()
    return f"sha256:{digest}"


def append_event(history: list[dict], event: dict) -> list[dict]:
    """Append-only: returns new list; never mutates prior event bodies."""
    prev_hash = history[-1]["event_hash"] if history else None
    seq = (history[-1]["sequence"] + 1) if history else 1
    new_event = {
        **event,
        "sequence": seq,
        "previous_event_hash": prev_hash,
    }
    new_event["event_hash"] = event_hash(new_event)
    return history + [new_event]


def project_current_state(history: list[dict]) -> dict:
    """Deterministic projection from immutable events. No deletion."""
    state: dict[str, Any] = {
        "geometry_asset_ids": [],
        "geometry_roles": [],
        "superseded_event_ids": [],
        "active_event_ids": [],
    }
    active: dict[str, dict] = {}
    for ev in history:
        eid = ev.get("event_id")
        if ev.get("event_type") == "SUPERSEDE":
            target = ev.get("supersedes_event_id")
            if target in active:
                state["superseded_event_ids"].append(target)
                del active[target]
            continue
        if ev.get("event_type") == "ADD_GEOMETRY_ROLE":
            active[eid] = ev
    state["active_event_ids"] = list(active.keys())
    for ev in active.values():
        data = ev.get("data") or {}
        gid = data.get("geometry_asset_id")
        if gid and gid not in state["geometry_asset_ids"]:
            state["geometry_asset_ids"].append(gid)
        if data.get("role"):
            state["geometry_roles"].append(
                {
                    "geometry_asset_id": gid,
                    "role": data.get("role"),
                    "role_status": data.get("role_status", "PROVISIONAL"),
                    "from_event_id": ev.get("event_id"),
                }
            )
    return state
