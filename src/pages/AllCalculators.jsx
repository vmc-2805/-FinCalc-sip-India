import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import CalculatorCards from '../components/CalculatorCards';
import { calculators } from '../data/calculators';

export default function AllCalculators() {
  const popular = calculators.filter((c) => c.category === 'popular');
  const mf = calculators.filter((c) => c.category === 'mutual-fund');
  return (
    <div className="page container">
      <Seo
        title="All Financial Calculators - SIP, Lumpsum, EMI, Tax, FD, RD, PPF"
        description="Browse all free financial calculators for India: SIP, lumpsum, SWP, mutual fund returns, income tax, PPF, EPF, FD, RD, EMI, GST, XIRR, ELSS and bank SIP calculators."
        keywords={['financial calculators', 'all calculators', 'investment calculators India', 'loan calculators', 'tax calculators']}
        path="/calculators"
      />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Calculators' }]} />
      <h1>All calculators</h1>
      <p className="page-intro">
        Choose a calculator below. Every tool is free, works instantly in your browser and shows results
        with a simple chart.
      </p>
      <h2>Popular calculators</h2>
      <CalculatorCards items={popular} />
      <h2>Mutual fund calculators</h2>
      <CalculatorCards items={mf} />
    </div>
  );
}
