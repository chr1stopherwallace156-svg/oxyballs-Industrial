from __future__ import annotations

from typing import Any


def evaluate_rubric(profile: dict, inputs: dict[str, Any]) -> dict[str, Any]:
    """Evaluate a rubric profile. Missing inputs → score null + NOT_EXECUTED. Never invent 0."""
    metrics_out = []
    evaluated = 0
    applicable = 0
    for metric in profile.get("metrics", []):
        applicable += 1
        required = metric.get("required_inputs") or []
        missing = [k for k in required if inputs.get(k) is None]
        if missing or inputs.get("_force_missing"):
            metrics_out.append(
                {
                    "metric_id": metric["metric_id"],
                    "score": None,
                    "scoring_status": "NOT_EXECUTED",
                    "evaluation_status": "NOT_EXECUTED",
                    "missing_inputs": missing or list(required),
                    "formula": metric.get("formula"),
                }
            )
            continue
        formula = metric.get("formula_id") or "IDENTITY"
        raw = inputs.get(metric["required_inputs"][0])
        score = _apply_formula(formula, raw, inputs, metric)
        metrics_out.append(
            {
                "metric_id": metric["metric_id"],
                "score": score,
                "scoring_status": "EVALUATED" if score is not None else "NOT_EXECUTED",
                "evaluation_status": "EVALUATED" if score is not None else "NOT_EXECUTED",
                "missing_inputs": [],
                "formula": metric.get("formula"),
            }
        )
        if score is not None:
            evaluated += 1

    coverage = (evaluated / applicable) if applicable else 0.0
    any_evaluated = evaluated > 0
    return {
        "rubric_id": profile.get("rubric_id"),
        "rubric_version": profile.get("rubric_version"),
        "evaluated_axes": evaluated,
        "applicable_axes": applicable,
        "coverage_ratio": coverage,
        "confidence_status": "NOT_EVALUATED" if not any_evaluated else ("PARTIAL" if coverage < 1.0 else "FULL"),
        "aggregate_score": None if not any_evaluated else _weighted(metrics_out, profile),
        "metrics": metrics_out,
        "execution_status": "NOT_EXECUTED" if not any_evaluated else "EXECUTED",
    }


def _apply_formula(formula_id: str, raw: Any, inputs: dict, metric: dict) -> float | None:
    if formula_id == "IDENTITY_FLOAT":
        # Role-declared metrics may pass a string enum into required_inputs[0].
        if isinstance(raw, str):
            allowed = {
                "CLOSED_SOLID",
                "OPEN_SURFACE",
                "SCAN_REFERENCE",
                "VISUAL_SHELL",
                "COLLISION_MESH",
            }
            return 1.0 if raw in allowed else None
        return float(raw)
    if formula_id == "CLAMP_01":
        return max(0.0, min(1.0, float(raw)))
    if formula_id == "INVERT_ERROR_MM":
        err = abs(float(inputs["dimensional_error_mm"]))
        tol = float(inputs.get("tolerance_mm") or metric.get("default_tolerance_mm") or 1.0)
        if tol == 0:
            return None
        return max(0.0, 1.0 - (err / tol))
    if formula_id == "RELATIVE_ERROR_CLAMPED":
        if not inputs.get("comparability_gate_pass"):
            return None
        nominal = float(inputs["nominal_dim"])
        measured = float(inputs["measured_dim"])
        if nominal == 0:
            return None
        relative_error = abs(measured - nominal) / abs(nominal)
        return max(0.0, 1.0 - relative_error)
    if formula_id == "COMPARABILITY_GATE":
        flags = [
            "same_property",
            "same_coordinate_frame",
            "same_datum",
            "same_units",
            "same_configuration_id",
            "physical_state_declared",
        ]
        if all(bool(inputs.get(f)) for f in flags):
            return 1.0
        return None
    if formula_id == "POLY_BUDGET_RELATIVE":
        count = float(inputs["polygon_count"])
        budget = float(inputs["target_poly_budget"])
        denom = max(abs(budget), 1.0)
        return max(0.0, min(1.0, 1.0 - abs(count - budget) / denom))
    if formula_id == "ROLE_TOPOLOGY_PROFILE":
        # Role-aware topology suite is specified but not activated for live assets.
        # Stub remains NOT_EXECUTED until parser diagnostics are wired.
        return None
    return None


def _weighted(metrics_out: list, profile: dict) -> float | None:
    weights = {m["metric_id"]: m.get("weight", 1.0) for m in profile.get("metrics", [])}
    num = 0.0
    den = 0.0
    for m in metrics_out:
        if m["score"] is None:
            continue
        w = float(weights.get(m["metric_id"], 1.0))
        num += m["score"] * w
        den += w
    return (num / den) if den else None
