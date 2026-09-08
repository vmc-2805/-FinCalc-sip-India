import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import CalculatorCards from '../components/CalculatorCards';
import Faq from '../components/Faq';
import { calculators } from '../data/calculators';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '../data/site';

const HOME_FAQS = [
  {
    q: 'Are these calculators free to use?',
    a: 'Yes. All calculators on FinCalc India are completely free. There is no sign-up, no login and no limit on usage.',
  },
  {
    q: 'How accurate are the results?',
    a: 'The calculators use the standard formulas followed by banks, mutual funds and the Income Tax Department. Results are estimates based on the values you enter. Actual returns may differ due to market movement, charges and taxes.',
  },
  {
    q: 'Do you store my data?',
    a: 'No. All calculations happen in your browser. We do not store or send the values you enter to any server.',
  },
  {
    q: 'Which calculator should I use for mutual fund SIP?',
    a: 'Use the SIP calculator for monthly investments and the lumpsum calculator for one-time investments. To find the actual return of an existing SIP, use the XIRR calculator.',
  },
];

export default function Home() {
  const popular = calculators.filter((c) => c.category === 'popular');
  const mf = calculators.filter((c) => c.category === 'mutual-fund');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: SITE_URL + '/favicon.svg',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Free Financial Calculators India - SIP, EMI, Income Tax, FD, PPF"
        description={SITE_DESCRIPTION}
        keywords={[
          'financial calculator India',
          'SIP calculator',
          'EMI calculator',
          'income tax calculator',
          'FD calculator',
          'PPF calculator',
          'mutual fund calculator',
          'online calculator India',
          'investment calculator',
        ]}
        path="/"
        jsonLd={jsonLd}
      />
      <section className="hero">
        <div className="container">
          <h1>Simple financial calculators for every Indian investor</h1>
          <p>
            Plan your SIP, loans, tax and savings with accurate, easy to use calculators. No login, no
            charges. Just enter your numbers and get instant results with clear charts.
          </p>
          <div className="hero-actions">
            <Link to="/calculators/sip-calculator" className="btn btn-primary">
              SIP calculator
            </Link>
            <Link to="/calculators/emi-calculator" className="btn btn-outline">
              EMI calculator
            </Link>
            <Link to="/calculators/income-tax-calculator" className="btn btn-outline">
              Income tax calculator
            </Link>
          </div>
        </div>
      </section>

      <div className="page container">
        <div className="section-title">
          <h2>Popular calculators</h2>
          <Link to="/calculators">View all calculators</Link>
        </div>
        <CalculatorCards items={popular} />

        <div className="section-title">
          <h2>Mutual fund calculators</h2>
        </div>
        <CalculatorCards items={mf} />

        <article className="article" style={{ marginTop: 36 }}>
          <h2>Why use an online financial calculator?</h2>
          <p>
            Money decisions become easy when you can see the numbers clearly. Whether you want to know how
            much your monthly SIP will grow, what EMI you can afford, or how much income tax you will pay
            this year, a calculator gives you the answer in seconds. It removes guesswork and helps you
            compare options before you commit your money.
          </p>
          <p>
            All calculators on {SITE_NAME} are built using the standard formulas used by banks, mutual fund
            houses and the Income Tax Department in India. They work on mobile and desktop and update
            results instantly as you move the sliders.
          </p>

          <h2>Plan your investments</h2>
          <p>
            Use the <Link to="/calculators/sip-calculator">SIP calculator</Link> to see the power of
            compounding on your monthly investment. The{' '}
            <Link to="/calculators/lumpsum-calculator">lumpsum calculator</Link> is for one-time
            investments, and the <Link to="/calculators/xirr-calculator">XIRR calculator</Link> tells you the
            real return of investments made on different dates. For tax saving, check the{' '}
            <Link to="/calculators/elss-calculator">ELSS calculator</Link>.
          </p>

          <h2>Guaranteed savings schemes</h2>
          <p>
            For safe, government backed savings use the{' '}
            <Link to="/calculators/ppf-calculator">PPF calculator</Link>,{' '}
            <Link to="/calculators/epf-calculator">EPF calculator</Link> and{' '}
            <Link to="/calculators/sukanya-samriddhi-yojana-calculator">
              Sukanya Samriddhi Yojana calculator
            </Link>
            . Bank deposits are covered by the <Link to="/calculators/fd-calculator">FD calculator</Link> and{' '}
            <Link to="/calculators/rd-calculator">RD calculator</Link>.
          </p>

          <h2>Loans and taxes</h2>
          <p>
            The <Link to="/calculators/emi-calculator">EMI calculator</Link> shows your monthly installment
            and total interest for home, car and personal loans. The{' '}
            <Link to="/calculators/income-tax-calculator">income tax calculator</Link> compares the new and
            old regime, and the <Link to="/calculators/gst-calculator">GST calculator</Link> helps you add
            or remove GST from any price.
          </p>

          <Faq items={HOME_FAQS} />
        </article>
      </div>
    </>
  );
}
