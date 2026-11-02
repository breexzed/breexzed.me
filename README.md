# breexzed.me 1.5 (experiment)

Same content as `../breexzed.github.io`, restyled to match the plain Freenet/11ty "Hegemonikon" site: black page, monospace, green links, 800px column, no JS.

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
