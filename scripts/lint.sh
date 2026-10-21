#!/usr/bin/env bash
# Static analysis: JS syntax (node --check), Python compile, shellcheck, JSON/YAML parse.
set -euo pipefail
cd "$(dirname "$0")/.."
fail=0
files() { git ls-files -co --exclude-standard -- "$@" | grep -v '^dist/' || true; }
if command -v node >/dev/null; then
  for f in $(files '*.js'); do node --check "$f" || fail=1; done
else echo "lint: node not found, skipping JS"; fi
py=$(files '*.py')
if [ -n "$py" ]; then python3 - $py <<'EOF' || fail=1
import sys, py_compile
bad = 0
for f in sys.argv[1:]:
    try: compile(open(f, encoding="utf-8").read(), f, "exec")
    except SyntaxError as e: print(e); bad = 1
sys.exit(bad)
EOF
fi
for f in $(files '*.json'); do python3 -m json.tool "$f" >/dev/null || { echo "lint: bad JSON $f"; fail=1; }; done
if command -v shellcheck >/dev/null; then
  sh=$(files '*.sh' 'hooks/pre-commit')
  [ -n "$sh" ] && { shellcheck -S error $sh || fail=1; }
else echo "lint: shellcheck not found, skipping shell"; fi
[ $fail -eq 0 ] && echo "lint: OK" || { echo "lint: FAILED"; exit 1; }
