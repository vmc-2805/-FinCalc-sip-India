// Usage: npm run build && npx vite preview --port 4173  (in another terminal)  then: node scripts/test-ui.mjs
// Drives the built site in headless Chrome through the DevTools protocol and
// checks that every calculator shows the expected numbers in the real UI.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { buildXirrCashFlows, xirrFromFlows } from '../src/utils/finance.js';
const xirrExpect = (freq, mat) => xirrFromFlows(buildXirrCashFlows(new Date('2021-01-01'), new Date('2024-01-01'), 10000, mat, freq)).toFixed(2) + '%';

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://localhost:4173';
const PORT = 9333;
const OUT = process.env.SHOT_DIR || '.';

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`, '--window-size=1300,1000', '--user-data-dir=' + OUT + '/chrome-profile', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForChrome() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return r.json();
    } catch {}
    await sleep(200);
  }
  throw new Error('chrome did not start');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.events = []; ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && this.pending.has(d.id)) { const { res, rej } = this.pending.get(d.id); this.pending.delete(d.id); d.error ? rej(new Error(JSON.stringify(d.error))) : res(d.result); } else this.events.push(d); }; }
  send(method, params = {}) { const id = ++this.id; return new Promise((res, rej) => { this.pending.set(id, { res, rej }); this.ws.send(JSON.stringify({ id, method, params })); }); }
  async eval(expr) { const r = await this.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + JSON.stringify(r.exceptionDetails.exception?.description)); return r.result.value; }
  async goto(url) { await this.send('Page.navigate', { url }); await sleep(900); }
  async shot(name) { const r = await this.send('Page.captureScreenshot', { format: 'png' }); writeFileSync(`${OUT}/${name}.png`, Buffer.from(r.data, 'base64')); }
}

// Helpers injected in the page
const HELPERS = `
window.__t = {
  text: () => document.body.innerText,
  click: (label) => { const b=[...document.querySelectorAll('button')].find(b=>b.innerText.trim().toLowerCase().split(String.fromCharCode(10))[0]===label.toLowerCase()); if(!b) throw new Error('no button '+label); b.click(); return true; },
  setNumber: (label, value) => { const inp=[...document.querySelectorAll('input')].find(i=>i.getAttribute('aria-label')===label || (i.labels && [...i.labels].some(l=>l.innerText.trim().startsWith(label)))); if(!inp) throw new Error('no input '+label); const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; setter.call(inp,String(value)); inp.dispatchEvent(new Event('input',{bubbles:true})); inp.dispatchEvent(new Event('blur',{bubbles:true})); return true; },
  setById: (id, value) => { const inp=document.getElementById(id); const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; setter.call(inp,String(value)); inp.dispatchEvent(new Event('input',{bubbles:true})); return true; },
  setSelect: (id, value) => { const s=document.getElementById(id); const setter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set; setter.call(s,value); s.dispatchEvent(new Event('change',{bubbles:true})); return true; },
  row: (label) => { const rows=[...document.querySelectorAll('.result-row, .tax-result-row, .stat')]; const r=rows.find(x=>x.innerText.trim().startsWith(label)); return r ? r.innerText.replace(/\\s+/g,' ').trim() : null; },
};
true;`;

const results = [];
function check(name, actual, expected) {
  const ok = typeof expected === 'string' ? String(actual).includes(expected) : expected(actual);
  results.push({ name, ok, actual });
  console.log((ok ? 'PASS ' : 'FAIL ') + name + '  ->  ' + String(actual).replace(/\s+/g,' ').slice(0, 90));
}

const info = await waitForChrome();
const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
const cdp = new CDP(ws);
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');

async function open(path) {
  await cdp.goto(BASE + path);
  await cdp.eval(HELPERS);
}

// SIP / Lumpsum
await open('/calculators/sip-calculator');
check('SIP default total', await cdp.eval("__t.row('Total value')"), '₹56,00,897');
check('SIP default returns', await cdp.eval("__t.row('Est. returns')"), '₹26,00,897');
await cdp.eval("__t.click('Lumpsum')"); await sleep(300);
check('Lumpsum default total', await cdp.eval("__t.row('Total value')"), '₹77,646');
await cdp.eval("__t.setNumber('Total investment', 100000)"); await sleep(300);
check('Lumpsum 1L typed', await cdp.eval("__t.row('Total value')"), '₹3,10,585');

// SWP
await open('/calculators/swp-calculator');
check('SWP default withdrawal', await cdp.eval("__t.row('Total withdrawal')"), '₹6,00,000');
check('SWP default final', await cdp.eval("__t.row('Final value')"), '₹5,218');
await cdp.eval("__t.setNumber('Expected return rate (p.a)', 3)"); await sleep(300);
check('SWP 3% final', await cdp.eval("__t.row('Final value')"), '₹-66,173');
await cdp.shot('t-swp');

// SSY
await open('/calculators/sukanya-samriddhi-yojana-calculator');
check('SSY maturity', await cdp.eval("__t.row('Maturity value')"), '₹4,61,839');
check('SSY interest', await cdp.eval("__t.row('Total interest')"), '₹3,11,839');

// PPF
await open('/calculators/ppf-calculator');
check('PPF maturity', await cdp.eval("__t.row('Maturity value')"), '₹2,71,214');

// EPF
await open('/calculators/epf-calculator');
check('EPF accumulated', await cdp.eval("document.querySelector('.result-big strong').innerText"), '₹2,59,41,394');
await cdp.shot('t-epf');

// FD
await open('/calculators/fd-calculator');
check('FD years', await cdp.eval("__t.row('Total value')"), '₹1,38,042');
await cdp.eval("__t.click('Months')"); await sleep(300);
check('FD 6 months', await cdp.eval("__t.row('Total value')"), '₹1,03,250');
await cdp.eval("__t.click('Days')"); await sleep(300);
check('FD 30 days', await cdp.eval("__t.row('Total value')"), '₹1,00,533');

// RD
await open('/calculators/rd-calculator');
check('RD 3 years', await cdp.eval("__t.row('Total value')"), '₹19,91,214');
await cdp.eval("__t.click('Months')"); await sleep(300);
check('RD 6 months', await cdp.eval("__t.row('Invested amount')"), '₹3,00,000');

// EMI
await open('/calculators/emi-calculator');
check('EMI monthly', await cdp.eval("__t.row('Monthly EMI')"), '₹19,566');
check('EMI total interest', await cdp.eval("__t.row('Total interest')"), '₹1,73,969');
await cdp.eval("__t.click('Show amortization details (yearly)')"); await sleep(300);
check('EMI schedule rows', await cdp.eval("document.querySelectorAll('tbody tr').length"), (n) => n === 5);

// GST
await open('/calculators/gst-calculator');
check('GST excl total', await cdp.eval("__t.row('Total GST')"), '₹3,000');
check('GST excl post', await cdp.eval("__t.row('Post-GST amount')"), '₹28,000');
await cdp.eval("__t.click('Including GST')"); await sleep(300);
check('GST incl total', await cdp.eval("__t.row('Total GST')"), '₹2,679');
check('GST incl post', await cdp.eval("__t.row('Post-GST amount')"), '₹22,321');
await cdp.eval("__t.click('18%')"); await sleep(300);
check('GST incl 18%', await cdp.eval("__t.row('Total GST')"), '₹3,814');

// XIRR
await open('/calculators/xirr-calculator');
const xr = "document.querySelector('.xirr-result strong').innerText";
check('XIRR default (yearly 10k -> 60k)', await cdp.eval(xr), '38.92%');
await cdp.eval("__t.click('Monthly')"); await sleep(300);
check('XIRR monthly 10k -> 60k = ' + xirrExpect('Monthly', 60000), await cdp.eval(xr), xirrExpect('Monthly', 60000));
await cdp.eval("__t.setById('xirr-maturity', 500000)"); await sleep(300);
check('XIRR monthly 10k -> 5L = ' + xirrExpect('Monthly', 500000), await cdp.eval(xr), xirrExpect('Monthly', 500000));
await cdp.eval("__t.click('Quarterly')"); await sleep(300);
check('XIRR quarterly 10k -> 5L = ' + xirrExpect('Quarterly', 500000), await cdp.eval(xr), xirrExpect('Quarterly', 500000));
await cdp.eval("__t.setById('xirr-maturity', 20000)"); await sleep(300);
check('XIRR negative shown', await cdp.eval(xr), (t) => t.startsWith('-'));
await cdp.eval("__t.setById('xirr-maturity', 0)"); await sleep(300);
check('XIRR error state', await cdp.eval("document.querySelector('.xirr-error strong').innerText"), 'Unable to calculate XIRR');
await cdp.eval("__t.setById('xirr-maturity', 60000)"); await cdp.eval("__t.click('Yearly')"); await sleep(300);
await cdp.shot('t-xirr');

// Income tax
await open('/calculators/income-tax-calculator');
await cdp.eval("__t.setById('tax-grossSalary', 1800000)");
await cdp.eval("__t.click('Calculate')"); await sleep(300);
check('Tax 18L new', await cdp.eval("__t.row('Total tax (New regime)')"), '₹1,50,800');
check('Tax 18L old', await cdp.eval("__t.row('Total tax (Old regime)')"), '₹3,51,000');
check('Tax 80C hint', await cdp.eval("document.querySelector('.tax-result .note').innerText"), 'reduce tax to ₹3,04,200');
await cdp.eval("__t.click('Deductions (old regime)')"); await sleep(200);
await cdp.eval("__t.setById('tax-deduction80c', 150000)");
await cdp.eval("__t.setById('tax-deduction80d', 25000)");
await cdp.eval("__t.click('Calculate')"); await sleep(300);
check('Tax 18L old w/ 80C+80D', await cdp.eval("__t.row('Total tax (Old regime)')"), '₹2,96,400');
await cdp.eval("__t.setSelect('sel-assessment-year', '2025 - 2026')");
await cdp.eval("__t.click('Calculate')"); await sleep(300);
check('Tax 18L new AY25-26', await cdp.eval("__t.row('Total tax (New regime)')"), '₹2,15,800');
await cdp.shot('t-tax');

// MF returns (lumpsum only, no tabs)
await open('/calculators/mutual-fund-returns-calculator');
check('MF returns no tabs', await cdp.eval("document.querySelectorAll('.calc-tab').length"), (n) => n === 0);
check('MF returns total', await cdp.eval("__t.row('Total value')"), '₹77,646');

// ELSS min 3 years
await open('/calculators/elss-calculator');
check('ELSS min years', await cdp.eval("document.querySelector('input[type=range][aria-label=\"Time period slider\"]').min"), '3');

// Bank SIP page renders
await open('/calculators/axis-bank-sip-calculator');
check('Axis SIP h1', await cdp.eval("document.querySelector('h1').innerText"), 'Axis Bank SIP Calculator');
check('Axis SIP total', await cdp.eval("__t.row('Total value')"), '₹56,00,897');

// SEO tags
check('SEO title', await cdp.eval('document.title'), 'Axis Bank SIP Calculator');
check('SEO canonical', await cdp.eval("document.querySelector('link[rel=canonical]').href"), '/calculators/axis-bank-sip-calculator');
check('JSON-LD blocks', await cdp.eval("document.querySelectorAll('script[type=\"application/ld+json\"]').length"), (n) => n === 3);

ws.close();
chrome.kill();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
