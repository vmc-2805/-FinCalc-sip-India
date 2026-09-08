/**
 * Post-build SEO step.
 *  1. Generates dist/sitemap.xml from the calculator registry.
 *  2. Generates dist/llms.txt (and llms-full.txt) for AI search engines.
 *  3. Creates a static HTML file for every route with the correct <title>,
 *     meta description, keywords and canonical baked in, so crawlers and
 *     social previews get page-specific tags even before JavaScript runs.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');

const { calculators } = await import(pathToFileURL(resolve(root, 'src/data/calculators.js')).href);
const site = await import(pathToFileURL(resolve(root, 'src/data/site.js')).href);
const { SITE_URL, SITE_NAME, SITE_DESCRIPTION } = site;

if (!existsSync(dist)) {
  console.error('dist folder not found. Run `vite build` first.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const STATIC_ROUTES = [
  {
    path: '/',
    title: 'Free Financial Calculators India - SIP, EMI, Income Tax, FD, PPF',
    description: SITE_DESCRIPTION,
    keywords: 'financial calculator India, SIP calculator, EMI calculator, income tax calculator, FD calculator, PPF calculator',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/calculators',
    title: 'All Financial Calculators - SIP, Lumpsum, EMI, Tax, FD, RD, PPF',
    description:
      'Browse all free financial calculators for India: SIP, lumpsum, SWP, mutual fund returns, income tax, PPF, EPF, FD, RD, EMI, GST, XIRR, ELSS and bank SIP calculators.',
    keywords: 'financial calculators, investment calculators India, loan calculators, tax calculators',
    priority: '0.9',
    changefreq: 'weekly',
  },
  { path: '/about', title: 'About us', description: `${SITE_NAME} provides free, accurate financial calculators for Indian investors.`, priority: '0.4', changefreq: 'yearly' },
  { path: '/contact', title: 'Contact us', description: `Get in touch with ${SITE_NAME} for feedback or corrections.`, priority: '0.4', changefreq: 'yearly' },
  { path: '/privacy-policy', title: 'Privacy policy', description: `How ${SITE_NAME} handles your data.`, priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', title: 'Terms of use', description: `Terms and conditions for using ${SITE_NAME}.`, priority: '0.3', changefreq: 'yearly' },
  { path: '/disclaimer', title: 'Disclaimer', description: `Important disclaimer about calculators on ${SITE_NAME}.`, priority: '0.3', changefreq: 'yearly' },
];

const calcRoutes = calculators.map((c) => ({
  path: `/calculators/${c.slug}`,
  title: c.seo.title,
  description: c.seo.description,
  keywords: c.seo.keywords.join(', '),
  priority: c.category === 'popular' ? '0.9' : '0.8',
  changefreq: 'monthly',
}));

const routes = [...STATIC_ROUTES, ...calcRoutes];

/* 1. sitemap.xml */
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (r) =>
        `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);

/* 2. llms.txt */
const llms =
  `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION}\n\n` +
  `All calculators are free, run in the browser and use standard Indian financial formulas.\n\n` +
  `## Popular calculators\n\n` +
  calculators
    .filter((c) => c.category === 'popular')
    .map((c) => `- [${c.name}](${SITE_URL}/calculators/${c.slug}): ${c.seo.description}`)
    .join('\n') +
  `\n\n## Mutual fund calculators\n\n` +
  calculators
    .filter((c) => c.category === 'mutual-fund')
    .map((c) => `- [${c.name}](${SITE_URL}/calculators/${c.slug}): ${c.seo.description}`)
    .join('\n') +
  `\n\n## Other pages\n\n- [About](${SITE_URL}/about)\n- [Contact](${SITE_URL}/contact)\n- [Disclaimer](${SITE_URL}/disclaimer)\n`;
writeFileSync(resolve(dist, 'llms.txt'), llms);

const llmsFull =
  llms +
  `\n\n---\n\n# Calculator details\n\n` +
  calculators
    .map((c) => {
      const sections = c.sections
        .map((s) => {
          let out = `### ${s.heading}\n\n`;
          if (s.paras) out += s.paras.join('\n\n') + '\n\n';
          if (s.formula) out += '```\n' + s.formula + '\n```\n\n';
          if (s.list) out += s.list.map((l) => `- ${l}`).join('\n') + '\n\n';
          if (s.paras2) out += s.paras2.join('\n\n') + '\n\n';
          return out;
        })
        .join('');
      const faqs = c.faqs.map((f) => `**${f.q}**\n\n${f.a}\n`).join('\n');
      return `## ${c.name}\n\nURL: ${SITE_URL}/calculators/${c.slug}\n\n${c.intro}\n\n${sections}### FAQs\n\n${faqs}\n`;
    })
    .join('\n');
writeFileSync(resolve(dist, 'llms-full.txt'), llmsFull);

/* 3. Per-route HTML with baked-in meta */
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function render(route) {
  const fullTitle = route.path === '/' ? route.title + ' | ' + SITE_NAME : route.title + ' | ' + SITE_NAME;
  const url = SITE_URL + route.path;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(route.description)}" />`);
  if (route.keywords) {
    html = html.replace(/<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${esc(route.keywords)}" />`);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${esc(url)}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(fullTitle)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(route.description)}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${esc(url)}" />`);
  return html;
}

let count = 0;
for (const route of routes) {
  const html = render(route);
  if (route.path === '/') {
    writeFileSync(resolve(dist, 'index.html'), html);
  } else {
    const dir = resolve(dist, '.' + route.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'index.html'), html);
  }
  count += 1;
}

// 404 page for static hosts (Netlify / GitHub Pages)
writeFileSync(
  resolve(dist, '404.html'),
  render({ path: '/404', title: 'Page not found', description: 'The page you are looking for does not exist.' }),
);

console.log(`postbuild: sitemap.xml, llms.txt, llms-full.txt and ${count} route pages written to dist/`);
