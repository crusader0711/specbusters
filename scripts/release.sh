#!/usr/bin/env bash
# Builds, then writes RELEASE_MANIFEST.json + SHA256SUMS (template section 6). Tagging stays a human step.
set -euo pipefail
cd "$(dirname "$0")/.."
./scripts/build.sh
python3 - <<'EOF'
import hashlib, json, os, socket, subprocess, datetime, glob
name = "specbusters"
art = sorted(glob.glob("dist/*.tar.gz"))
version = os.path.basename(art[0])[len(name) + 1:-len(".tar.gz")] if art else "0.0.0"
sha = lambda p: hashlib.sha256(open(p, "rb").read()).hexdigest()
commit = subprocess.run(["git", "rev-parse", "--short", "HEAD"], capture_output=True, text=True).stdout.strip()
ci = os.environ.get("GITHUB_ACTIONS") == "true"
m = {
  "name": name, "version": version,
  "released": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
  "git_commit": commit,
  "artifacts": [{"path": p, "sha256": sha(p), "size_bytes": os.path.getsize(p)} for p in art],
  "provenance": {"built_by": "ci" if ci else "local", "builder_id": "github-actions" if ci else "local"},
}
open("RELEASE_MANIFEST.json", "w").write(json.dumps(m, indent=2) + "\n")
open("SHA256SUMS", "w").write("".join(f"{a['sha256']}  {a['path']}\n" for a in m["artifacts"]))
print(f"release: {name} {version} -> RELEASE_MANIFEST.json, SHA256SUMS ({len(art)} artifact(s))")
EOF
echo "release: verify with 'sha256sum -c SHA256SUMS'; tag manually: git tag -s v<version>"
