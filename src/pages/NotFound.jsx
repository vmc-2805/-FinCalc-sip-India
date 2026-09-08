import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import CalculatorCards from '../components/CalculatorCards';
import { calculators } from '../data/calculators';

export default function NotFound() {
  return (
    <div className="page container">
      <Seo title="Page not found" description="The page you are looking for does not exist." path="/404" noindex />
      <h1>Page not found</h1>
      <p className="page-intro">
        Sorry, we could not find that page. Go back to the <Link to="/">home page</Link> or pick a
        calculator below.
      </p>
      <CalculatorCards items={calculators.filter((c) => c.category === 'popular').slice(0, 8)} />
    </div>
  );
}
