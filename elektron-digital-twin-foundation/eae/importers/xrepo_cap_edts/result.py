"""Dual-gate importer result — never collapse to a vague PACKAGE_INVALID."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class DualGateResult:
    canonical_compatibility: str  # PASS | FAIL | NOT_RUN
    secure_ingestion: str  # PASS | FAIL | NOT_RUN
    committed: bool
    reason_codes: list[str] = field(default_factory=list)
    ingestion_id: str | None = None
    details: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        xrepo = {
            "XREPO-CAP-EDTS-0001": self.canonical_compatibility,
            "XREPO-CAP-EDTS-0002": self.secure_ingestion,
        }
        out: dict[str, Any] = {
            "canonical_compatibility": self.canonical_compatibility,
            "secure_ingestion": self.secure_ingestion,
            "committed": self.committed,
            "reason_codes": list(self.reason_codes),
            "xrepo_gates": xrepo,
            "details": self.details,
        }
        if self.ingestion_id is not None:
            out["ingestion_id"] = self.ingestion_id
        # Convenience singular when exactly one code (diagnostics still keep list).
        if len(self.reason_codes) == 1:
            out["reason_code"] = self.reason_codes[0]
        return out

    @property
    def ok_to_commit(self) -> bool:
        return (
            self.canonical_compatibility == "PASS"
            and self.secure_ingestion == "PASS"
            and not self.committed
        )
