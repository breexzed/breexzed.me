# breexzed.me

This is my home on the web: my writing, my build logs, and my portfolio. Every page starts as a markdown file in `content/`. A small build step turns those files into a site. Live at [breexzed.me](https://www.breexzed.me), portfolio at [breexzed.me/portfolio](https://www.breexzed.me/portfolio/).

| Path | What it is |
|---|---|
| `content/writing/*.md` | Posts, copied from `nodes/`. `parent:` makes a page a child (build-log stages). `date:` = first publish (verified against the old repo's git history and the linked commits). |
| `content/{index,about,portfolio}.md` | Home, whoami, portfolio. `{{latest_posts}}` / `{{writing_list}}` are filled at build time. |
| `css/style.css` | ~2KB, inlined into every page at build time (no stylesheet request). Reference stylesheet + soft accent, Departure Mono headings, hung `##` permalinks, greentext ramp, portfolio spacing. |
| `build.mjs` | ~120 lines: markdown -> `dist/**/index.html` with one template. |
| `static/` | Copied into `dist/` as-is: subset font (6KB), `portrait.webp` (2KB), `favicon.png` (0.5KB), roadmap SVG (lazy-loaded). |
| `assets-src/` | Originals (portrait SVG, full font). Not shipped; regenerate the static versions from these if they change. |

```bash
npm install
npm run serve    # build, then http://localhost:8081
npm run cards    # re-render link-preview cards (needs Chromium); commit static/assets/og/
```

Preview cards come from `assets-src/og/card.html`: `story` for home/about, `compressed` for the portfolio, `field` with the post's title + `formula` for each post. Card URLs carry a content hash, so Discord/X fetch a new card after a re-render instead of serving their cached one. Run `npm run cards` after adding a post or changing a title.

## Mirrors

The same site, in case the domain or a host goes away. Canonical links always point to breexzed.me.

| Where | How it updates |
|---|---|
| [breexzed.github.io/breexzed.me](https://breexzed.github.io/breexzed.me/) | Automatic on push to `main` (`.github/workflows/pages.yml`). |
| [breexzed.codeberg.page/breexzed.me](https://breexzed.codeberg.page/breexzed.me/) | `npm run pages:codeberg` from this machine (builds, force-pushes `dist/` to the Codeberg `pages` branch). |

Source is pushed to both GitHub and Codeberg by a plain `git push` (origin has two push URLs).
