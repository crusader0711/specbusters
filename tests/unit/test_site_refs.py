#!/usr/bin/env python3
"""Smoke test: required site files exist and every local src/href in index.html and js/*.js resolves."""
import os, re, sys, glob
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
os.chdir(ROOT)
errors = []
for req in ["index.html", "css/style.css", "js/app.js", "js/data.js"]:
    if not os.path.isfile(req):
        errors.append(f"missing {req}")
refs = set()
html = open("index.html", encoding="utf-8").read()
refs |= set(re.findall(r'(?:src|href)="([^"#:]+)"', html))
for js in glob.glob("js/*.js"):
    refs |= set(re.findall(r'["\'`]((?:\./)?assets/[^"\'`$]+\.(?:jpg|jpeg|png|svg|webp|gif))["\'`]', open(js, encoding="utf-8").read()))
for r in sorted(refs):
    p = r.split("?")[0].lstrip("./") if not r.startswith("../") else r
    if p and not os.path.exists(p):
        errors.append(f"broken reference: {r}")
for e in errors:
    print("FAIL:", e)
print(f"site refs: {len(refs)} checked, {len(errors)} problem(s)")
sys.exit(1 if errors else 0)
