#!/usr/bin/env bash
# Publish the site to Codeberg Pages: https://breexzed.codeberg.page/breexzed.me/
# Builds with the Codeberg base path, then force-pushes dist/ as the only commit on the
# `pages` branch of the Codeberg repo (the branch is output only; source lives on main).
# Needs: SSH key on Codeberg, the repo, and the Pages webhook (see README "Mirrors").
set -euo pipefail

REMOTE="${CODEBERG_REMOTE:-git@codeberg.org:Breexzed/breexzed.me.git}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
SRC_SHA="$(git rev-parse --short HEAD)"
[ -z "$(git status --porcelain -- content css static build.mjs)" ] || { echo "uncommitted site changes; commit first so the published build matches a commit" >&2; exit 1; }

BASE=/breexzed.me SITE_URL=https://breexzed.codeberg.page/breexzed.me node build.mjs

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"; node "$ROOT/build.mjs" >/dev/null' EXIT   # restore the normal dist/ afterwards
cp -r dist/. "$TMP"
git -C "$TMP" init -q -b pages
git -C "$TMP" add -A
git -C "$TMP" commit -q -m "Publish $SRC_SHA"
git -C "$TMP" push -f "$REMOTE" pages
echo "pushed build of $SRC_SHA to $REMOTE (pages). Live in a minute at https://breexzed.codeberg.page/breexzed.me/"
