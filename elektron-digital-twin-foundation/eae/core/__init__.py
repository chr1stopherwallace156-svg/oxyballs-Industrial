"""EAE CORE INGESTION — local-file accept / hash / quarantine / manifest / idempotency."""

from .ingest import ingest_local_file
from .policy import INGESTION_POLICY_VERSION, MANIFEST_VERSION

__all__ = [
    "ingest_local_file",
    "INGESTION_POLICY_VERSION",
    "MANIFEST_VERSION",
]
