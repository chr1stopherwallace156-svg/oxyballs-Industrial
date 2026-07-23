#!/usr/bin/env bash
# Shared helpers for checks (sourced). Safe to execute (no-op).
ede_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}
