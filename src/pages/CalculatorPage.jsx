import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import Faq from '../components/Faq';
import CalculatorCards from '../components/CalculatorCards';
import { getCalculator, calculatorMap } from '../data/calculators';
import { CALCULATOR_COMPONENTS } from '../calculators';
import { SITE_NAME, SITE_URL } from '../data/site';
import NotFound from './NotFound';

function Section({ s }) {
  return (
    <section>
      <h2>{s.heading}</h2>
      {s.table && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {s.table.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.paras?.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      {s.formula && <pre className="formula">{s.formula}</pre>}
      {s.list && (
        <ul>
          {s.list.map((li) => (
            <li key={li.slice(0, 40)}>{li}</li>
          ))}
        </ul>
      )}
      {s.paras2?.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      {s.formula2 && <pre className="formula">{s.formula2}</pre>}
    </section>
  );
}

export default function CalculatorPage() {
  const { slug } = useParams();
  const calc = getCalculator(slug);

  const jsonLd = useMemo(() => {
    if (!calc) return [];
    const url = `${SITE_URL}/calculators/${calc.slug}`;
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: calc.name,
        url,
        description: calc.seo.description,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: SITE_URL + '/calculators' },
          { '@type': 'ListItem', position: 3, name: calc.name, item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: calc.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ];
  }, [calc]);

  if (!calc) return <NotFound />;

  const Component = CALCULATOR_COMPONENTS[calc.component];
  const related = (calc.related || []).map((s) => calculatorMap[s]).filter(Boolean);

  return (
    <div className="page container">
      <Seo
        title={calc.seo.title}
        description={calc.seo.description}
        keywords={calc.seo.keywords}
        path={`/calculators/${calc.slug}`}
        jsonLd={jsonLd}
      />
      <div className="page-grid">
        <div className="page-main">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Calculators', to: '/calculators' },
              { label: calc.name },
            ]}
          />
          <h1>{calc.h1}</h1>
          <p className="page-intro">{calc.intro}</p>

          <Component key={calc.slug} {...(calc.props || {})} />

          <article className="article">
            {calc.sections.map((s) => (
              <Section key={s.heading} s={s} />
            ))}
            <Faq items={calc.faqs} />
            {related.length > 0 && (
              <section>
                <div className="section-title">
                  <h2>Related calculators</h2>
                  <Link to="/calculators">View all</Link>
                </div>
                <CalculatorCards items={related} compact />
              </section>
            )}
            <p className="note">
              Disclaimer: This calculator is for information purposes only. Results are estimates based on
              the inputs you provide and do not guarantee any returns. Please consult a qualified financial
              advisor before making investment or tax decisions.
            </p>
          </article>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
