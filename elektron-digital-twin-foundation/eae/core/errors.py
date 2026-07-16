"""Structured result codes for EAE CORE INGESTION."""

from __future__ import annotations


class EAEError(Exception):
    """Base error for CORE INGESTION."""

    def __init__(self, code: str, message: str):
        self.code = code
        self.message = message
        super().__init__(f"{code}: {message}")


class ManifestConflictError(EAEError):
    def __init__(self, message: str):
        super().__init__(REGISTRY_INTEGRITY_CONFLICT, message)


# Terminal result codes
ACCEPTED = "ACCEPTED"
ALREADY_INGESTED = "ALREADY_INGESTED"
REJECT_UNSUPPORTED = "REJECT_UNSUPPORTED"
QUARANTINE_TYPE_MISMATCH = "QUARANTINE_TYPE_MISMATCH"
REJECT_MALFORMED = "REJECT_MALFORMED"
REJECT_SECURITY = "REJECT_SECURITY"
REGISTRY_INTEGRITY_CONFLICT = "REGISTRY_INTEGRITY_CONFLICT"
