# FinCalc India – Financial Calculators (React + Vite)

A professional collection of free Indian financial calculators with SEO content on every page.

## Calculators included

**Popular:** SIP, Lumpsum, SWP, Mutual Fund Returns, Sukanya Samriddhi Yojana, Income Tax (new vs old regime), PPF, EPF, FD, RD, EMI (home / car / personal with year-wise schedule), GST, XIRR

**Mutual fund:** ELSS, SBI SIP, HDFC SIP, ICICI SIP, Axis Bank SIP, Kotak Bank SIP, Nippon India SIP, LIC SIP, IDBI SIP, PNB SIP

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # builds to dist/ and runs scripts/postbuild.mjs
npm run preview    # serve the dist/ folder locally
```

The post-build step generates, inside `dist/`:

- `sitemap.xml` – every route with priority and change frequency
- `llms.txt` and `llms-full.txt` – content summary for AI search engines
- `<route>/index.html` for every page with page-specific `<title>`, meta description, keywords, canonical and Open Graph tags baked in (so crawlers and link previews get correct tags without JavaScript)
- `404.html` for static hosts

`public/` already contains `robots.txt`, `manifest.webmanifest`, `humans.txt`, `favicon.svg`, `og-image.svg` and `_redirects` (Netlify SPA rule). `vercel.json` contains the SPA rewrite and cache headers for Vercel.

## Before you deploy

1. Open `src/data/site.js` and change `SITE_URL` and `SITE_NAME` to your real values. Add your contact details on the Contact page in `src/pages/StaticPages.jsx` if needed.
2. Update the domain in `public/robots.txt` (Sitemap line) and in `index.html` (canonical / og:url / og:image).
3. Optionally replace `public/og-image.svg` with a 1200×630 PNG for better social previews and update `DEFAULT_OG_IMAGE`.
4. Run `npm run build` and upload the `dist/` folder to Vercel, Netlify, Cloudflare Pages or any static host. All of these serve `dist/<route>/index.html` directly, so every calculator URL works on a hard refresh.
5. Submit `https://your-domain/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Project structure

```
src/
  calculators/   one component per calculator (SipCalculator is reused for Lumpsum, MF returns, ELSS and bank SIP pages)
  components/    SliderInput, Donut chart, Sidebar, Layout, Seo, FAQ, cards
  data/
    calculators.js   registry + all SEO content, formulas text and FAQs (plain JS, also used by the build script)
    site.js          site-wide settings
  pages/         Home, All calculators, Calculator page, static pages, 404
  utils/         finance.js (all formulas), format.js (₹ Indian formatting)
scripts/postbuild.mjs   sitemap, llms.txt and per-route HTML generation
scripts/test-ui.mjs     headless Chrome test of every calculator's output
```

## Formulas and accuracy

All formulas live in `src/utils/finance.js` (investments, deposits, loans, GST, XIRR) and `src/utils/tax.js` (income tax). They follow the conventions used by leading Indian investment platforms, so the outputs match for the same inputs, for example:

| Calculator | Inputs | Output |
|---|---|---|
| SIP | ₹25,000 / 12% / 10 yr | Total value ₹56,00,897 |
| Lumpsum | ₹25,000 / 12% / 10 yr | Total value ₹77,646 |
| SWP | ₹5,00,000 / ₹10,000 per month / 3% / 5 yr | Final value ₹-66,173 |
| SSY | ₹10,000 per year | Maturity ₹4,61,839 |
| PPF | ₹1,50,000 / 15 yr / 7.1% | Maturity ₹40,68,209 |
| FD | ₹1,00,000 / 6.5% / 5 yr | Total value ₹1,38,042 |
| GST | ₹25,000 @ 12% excluding | Total GST ₹3,000, post-GST ₹28,000 |

`scripts/test-ui.mjs` drives every calculator in the built site with headless Chrome and checks 43 outputs. Run `npm run build`, start `npx vite preview --port 4173` in one terminal and `npm run test:ui` in another (needs Google Chrome installed; set `CHROME` env var if it is not in the default path). The core formulas can also be checked quickly with `node --input-type=module -e "import('./src/utils/finance.js').then(f => console.log(f.sipFutureValue(25000, 12, 10)))"`.

## Updating rates and tax slabs

- PPF and EPF interest rates: constants at the top of `src/calculators/PpfCalculator.jsx` and `EpfCalculator.jsx`. SSY rate: `SSY_RATE` in `src/utils/finance.js`.
- Income tax slabs, standard deduction, rebate and surcharge: `src/utils/tax.js` (add a new assessment year there) and the slab tables in `src/data/calculators.js`.
