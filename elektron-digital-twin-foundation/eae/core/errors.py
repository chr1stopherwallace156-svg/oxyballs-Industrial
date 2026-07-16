"""Structured result codes for EAE CORE INGESTION."""

from __future__ import annotations


class EAEError(Exception):
    """Base error for CORE INGESTION."""

    def __init__(self, code: str, message: str):
        self.code = code
        self.message = message
        super().__init__(f"{code}: {message}")


# Terminal result codes (also used as successful non-exception outcomes)
ACCEPTED = "ACCEPTED"
ALREADY_INGESTED = "ALREADY_INGESTED"
REJECT_UNSUPPORTED = "REJECT_UNSUPPORTED"
QUARANTINE_TYPE_MISMATCH = "QUARANTINE_TYPE_MISMATCH"
REJECT_MALFORMED = "REJECT_MALFORMED"
REJECT_SECURITY = "REJECT_SECURITY"
