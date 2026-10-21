#!/usr/bin/env bash
# Idempotent: installs git hooks (no network, no package installs).
set -euo pipefail
cd "$(dirname "$0")/.."
chmod +x hooks/pre-commit scripts/*.sh
git config core.hooksPath hooks/
echo "setup: hooks installed (core.hooksPath=hooks/)"
command -v gitleaks >/dev/null || echo "setup: note - gitleaks not installed; pre-commit secret scan will be skipped"
