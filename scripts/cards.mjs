// Render link-preview cards (1200x630 PNG) from assets-src/og/card.html with headless Chromium.
// Run by hand when a card's inputs change (`npm run cards`), then commit static/assets/og/.
// Separate from the build so the build never needs a browser.
//   home.png       story       -> home, about, writing index, 404
//   portfolio.png  compressed  -> portfolio
//   writing/<slug>.png  field  -> each post (title + formula)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'assets-src', 'og', 'card.html');
const OUT = path.join(ROOT, 'static', 'assets', 'og');
const CHROME = process.env.CHROME || 'chromium-browser';

function render(query, file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    '--virtual-time-budget=2000', '--window-size=1200,630',
    `--screenshot=${file}`, `file://${SRC}?${new URLSearchParams(query)}`,
  ], { stdio: 'ignore' });
  if (!fs.existsSync(file)) throw new Error(`render failed: ${file}`);
  console.log(`${String(fs.statSync(file).size).padStart(7)}  ${path.relative(ROOT, file)}`);
}

render({ v: 'story' }, path.join(OUT, 'home.png'));
render({ v: 'compressed' }, path.join(OUT, 'portfolio.png'));

const dir = path.join(ROOT, 'content', 'writing');
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (data.status && data.status !== 'published') continue;
  const slug = f.replace(/\.md$/, '');
  render({ v: 'field', title: data.title, formula: data.formula || '', path: `/writing/${slug}` },
    path.join(OUT, 'writing', `${slug}.png`));
}
