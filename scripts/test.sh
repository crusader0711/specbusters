#!/usr/bin/env bash
# Smoke tests for the static site: required files exist and every local asset reference resolves.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tests/unit/test_site_refs.py
