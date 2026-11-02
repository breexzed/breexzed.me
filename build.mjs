// Static build: content/*.md -> dist/**/index.html, wrapped in one template.
// Deliberately small: no framework, no client JS. Mirrors the shape of the
// Freenet/11ty reference site (header + nav, plain <main>, signed footer).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const CONTENT = path.join(ROOT, 'content');
const OUT = path.join(ROOT, 'dist');
const SITE = {
  name: 'Breexzed',
  subtitle: 'Infrastructure engineering · Linux, Go, from the kernel up',
  tagline: 'Building Linux infrastructure in Go, from the kernel up.',
  url: 'https://www.breexzed.me', // absolute URLs are required for link-preview cards
  card: '/assets/og/home.png',    // default card; per-page cards rendered by `npm run cards`
};

// First real paragraph of a markdown body, flattened to ~160 chars, for preview descriptions.
const summarize = (md) => {
  const para = md.split(/\n\s*\n/).map((b) => b.trim()).find((b) => b && !/^(#|>|```|\||-|!\[|<)/.test(b)) || '';
  const text = para.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
  return text.length > 160 ? text.slice(0, 157).replace(/\s+\S*$/, '') + '…' : text;
};

// Every heading gets a stable id; h2s also carry a "##" permalink (hung in the margin by CSS).
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
marked.use({
  renderer: {
    heading(text, level, raw) {
      const id = slugify(raw);
      const mark = level === 2 ? `<a class="hx" href="#${id}" aria-label="Link to this section"><span>#</span><span>#</span></a> ` : '';
      return `<h${level} id="${id}">${mark}${text}</h${level}>\n`;
    },
    // Content images never block first paint.
    image(href, title, text) {
      return `<img src="${href}" alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy" decoding="async">`;
    },
  },
});

// CSS is ~2KB: inlining it saves a render-blocking round trip on every first visit.
const CSS = fs.readFileSync(path.join(ROOT, 'css', 'style.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>+])\s*/g, '$1').replace(/;}/g, '}').trim();

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Card URL carries a short content hash: previewers (Discord, X) cache by URL, so a
// re-rendered card gets a new URL and is fetched fresh instead of serving the stale one.
function cardUrl(card) {
  const file = path.join(ROOT, 'static', card);
  if (!fs.existsSync(file)) { console.warn(`missing card ${card}, falling back to default (run npm run cards)`); return cardUrl(SITE.card); }
  const v = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
  return `${SITE.url}${card}?v=${v}`;
}

function page({ title, description, body, cls = '', rel = '', type = 'website', card = SITE.card }) {
  const pageUrl = SITE.url + '/' + (rel ? rel + '/' : '');
  const ogTitle = esc(title === 'Home' ? SITE.name : `${title} · ${SITE.name}`);
  const desc = esc(description || SITE.tagline);
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)} | ${SITE.name}</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${pageUrl}">
    <meta name="theme-color" content="#4fd66b">
    <meta property="og:type" content="${type}">
    <meta property="og:site_name" content="${SITE.name}">
    <meta property="og:title" content="${ogTitle}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${cardUrl(card)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${SITE.name}: ${esc(SITE.tagline)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@breexzed_">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="preload" href="/fonts/departure-mono/DepartureMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
    <style>${CSS}</style>
</head>
<body${cls ? ` class="${cls}"` : ''}>
    <div class="container">
        <header>
            <h1><a href="/">${SITE.name}</a></h1>
            <p class="subtitle">${esc(SITE.subtitle)}</p>
            <nav>
                <a href="/">Home</a>
                <a href="/writing/">Writing</a>
                <a href="/portfolio/">Portfolio</a>
                <a href="/about/">About</a>
            </nav>
        </header>

        <main>
${body}
        </main>

        <footer>
            <hr>
            <p>Signed: <strong>${SITE.name}</strong></p>
            <p>Static HTML, built from markdown. No tracking, no client-side JavaScript.</p>
            <p><small>Source: <code>github.com/breexzed/breexzed.github.io</code></small></p>
        </footer>
    </div>
</body>
</html>
`;
}

function write(rel, html) {
  const file = path.join(OUT, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function copyDir(src, dst) {
  fs.cpSync(src, dst, { recursive: true });
}

// --- load writing ---------------------------------------------------------
const posts = fs.readdirSync(path.join(CONTENT, 'writing'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(CONTENT, 'writing', f), 'utf8'));
    if (data.status && data.status !== 'published') return null;
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || '');
    return { slug: f.replace(/\.md$/, ''), id: data.id, parent: data.parent, data, content, date };
  })
  .filter(Boolean);

const byId = new Map(posts.map((p) => [p.id, p]));
const url = (p) => `/writing/${p.slug}/`;
// Top-level = parent is root (or absent). Children (e.g. build-log stages) hang off their parent.
const topLevel = posts
  .filter((p) => !p.parent || p.parent === 'root' || !byId.has(p.parent))
  .sort((a, b) => b.date.localeCompare(a.date) || a.data.title.localeCompare(b.data.title));
const childrenOf = (p) => posts.filter((c) => c.parent === p.id).sort((a, b) => a.slug.localeCompare(b.slug));

const postItem = (p) => `- **[${p.data.title}](${url(p)})** — *${p.date}*`;
const listMd = (ps) => ps.map(postItem).join('\n\n'); // loose list = <li><p>, as in the reference

// --- reset output ---------------------------------------------------------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyDir(path.join(ROOT, 'static'), OUT);

// --- writing pages --------------------------------------------------------
for (const p of posts) {
  const parent = byId.get(p.parent);
  const kids = childrenOf(p);
  let md = '';
  if (parent) md += `[← ${parent.data.title}](${url(parent)})\n\n`;
  md += `# ${p.data.title}\n\n`;
  md += `*${p.date}*${p.data.tags ? ' · ' + p.data.tags.map((t) => `\`${t}\``).join(' ') : ''}\n\n`;
  if (p.data.visual) md += `![${p.data.title}](${p.data.visual})\n\n`;
  md += p.content.trim() + '\n';
  if (kids.length) md += `\n## Stages\n\n${listMd(kids)}\n`;
  write(`writing/${p.slug}`, page({ title: p.data.title, description: p.data.excerpt || summarize(p.content), body: marked.parse(md), rel: `writing/${p.slug}`, type: 'article', card: `/assets/og/writing/${p.slug}.png` }));
}

// archive
write('writing', page({
  rel: 'writing',
  title: 'Writing',
  body: marked.parse(`# Writing\n\n${topLevel.map((p) => {
    const kids = childrenOf(p);
    return postItem(p) + (kids.length ? '\n' + kids.map((k) => '  ' + postItem(k)).join('\n') : '');
  }).join('\n')}\n`),
}));

// --- standalone pages -----------------------------------------------------
const vars = {
  latest_posts: listMd(topLevel.slice(0, 5)),
  writing_list: topLevel.map((p) => `- [${p.data.title}](${url(p)})`).join('\n'),
};
for (const [file, rel] of [['index.md', ''], ['about.md', 'about'], ['portfolio.md', 'portfolio']]) {
  const { data, content } = matter(fs.readFileSync(path.join(CONTENT, file), 'utf8'));
  const md = content.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
  write(rel, page({ title: data.title, description: data.description, body: marked.parse(md), cls: rel || 'home', rel, card: rel === 'portfolio' ? '/assets/og/portfolio.png' : SITE.card }));
}

// 404 for static hosts (GitHub Pages / Vercel both pick up 404.html)
fs.writeFileSync(path.join(OUT, '404.html'), page({
  title: 'Not found',
  body: marked.parse('# 404\n\nYou found an unmade room. This page has not taken shape yet.\n\n[Return home](/)\n'),
}));

console.log(`built ${posts.length} writing pages + archive + home/about/portfolio/404 -> ${path.relative(process.cwd(), OUT) || OUT}`);
