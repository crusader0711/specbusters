#!/usr/bin/env bash
# Copies the static site (served from repo root by GitHub Pages) into dist/site and packages a tarball.
set -euo pipefail
cd "$(dirname "$0")/.."
name=specbusters
version=$(sed -n 's/^## \[\([0-9][^]]*\)\].*/\1/p' CHANGELOG.md | head -1); version=${version:-0.0.0}
rm -rf dist && mkdir -p dist/site
cp -R index.html css js assets dist/site/
[ -f .nojekyll ] && cp .nojekyll dist/site/
tar -C dist -cf - site | gzip -n > "dist/${name}-${version}.tar.gz"
echo "build: dist/${name}-${version}.tar.gz"
