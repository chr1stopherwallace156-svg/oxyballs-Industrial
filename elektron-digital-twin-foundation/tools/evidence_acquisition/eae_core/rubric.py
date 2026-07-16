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
                    "missing_inputs": missing or list(required),
                    "formula": metric.get("formula"),
                }
            )
            continue
        # Deterministic stub formulas only when all inputs present
        formula = metric.get("formula_id") or "IDENTITY"
        raw = inputs.get(metric["required_inputs"][0])
        score = _apply_formula(formula, raw, inputs, metric)
        metrics_out.append(
            {
                "metric_id": metric["metric_id"],
                "score": score,
                "scoring_status": "EVALUATED" if score is not None else "NOT_EXECUTED",
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
        return float(raw)
    if formula_id == "CLAMP_01":
        v = float(raw)
        return max(0.0, min(1.0, v))
    if formula_id == "INVERT_ERROR_MM":
        # score = max(0, 1 - abs(error_mm)/tolerance_mm)
        err = abs(float(inputs["dimensional_error_mm"]))
        tol = float(inputs.get("tolerance_mm") or metric.get("default_tolerance_mm") or 1.0)
        return max(0.0, 1.0 - (err / tol))
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
