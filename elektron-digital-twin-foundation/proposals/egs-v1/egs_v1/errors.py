"""EGS-v1 errors."""


class EgsValidationError(ValueError):
    """Raised when an edge fails proposal validation rules."""

    def __init__(self, message: str, *, errors: list[str] | None = None):
        super().__init__(message)
        self.errors = errors or [message]


class EgsGraphError(ValueError):
    """Raised for graph query/construction failures."""
