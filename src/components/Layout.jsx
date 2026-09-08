import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE_NAME, SITE_TAGLINE } from '../data/site';
import { calculators } from '../data/calculators';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/calculators/sip-calculator', label: 'SIP' },
  { to: '/calculators/lumpsum-calculator', label: 'Lumpsum' },
  { to: '/calculators/emi-calculator', label: 'EMI' },
  { to: '/calculators/income-tax-calculator', label: 'Income Tax' },
  { to: '/calculators/fd-calculator', label: 'FD' },
  { to: '/calculators', label: 'All Calculators' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand" aria-label={SITE_NAME + ' home'}>
          <span className="brand-mark">₹</span>
          <span>
            FinCalc <em>India</em>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={'main-nav' + (open ? ' open' : '')} aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const popular = calculators.filter((c) => c.category === 'popular').slice(0, 8);
  const mf = calculators.filter((c) => c.category === 'mutual-fund').slice(0, 8);
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{SITE_NAME}</h4>
            <p>
              {SITE_TAGLINE}. Plan your SIP, loans, tax and savings with simple, accurate calculators
              made for Indian investors.
            </p>
          </div>
          <div>
            <h4>Popular calculators</h4>
            <ul>
              {popular.map((c) => (
                <li key={c.slug}>
                  <Link to={'/calculators/' + c.slug}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Mutual fund calculators</h4>
            <ul>
              {mf.map((c) => (
                <li key={c.slug}>
                  <Link to={'/calculators/' + c.slug}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of use</Link>
              </li>
              <li>
                <Link to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <a href="/sitemap.xml">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Disclaimer: The calculators on this website are for information and education only. Results
            are estimates based on the values you enter and do not guarantee any returns. Mutual fund
            investments are subject to market risks. Please read all scheme related documents carefully
            and consult a SEBI registered advisor before investing.
          </p>
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
