import { Link } from 'react-router-dom';
import CalcIcon from './Icons';

export default function CalculatorCards({ items, compact = false }) {
  return (
    <div className={'calc-cards' + (compact ? ' compact' : '')}>
      {items.map((c) => (
        <Link key={c.slug} to={'/calculators/' + c.slug} className="calc-card-link">
          <strong>{compact ? c.name : c.shortName || c.name}</strong>
          <span className="calc-card-desc">{c.tagline}</span>
          <CalcIcon name={c.icon} color={c.iconColor} />
        </Link>
      ))}
    </div>
  );
}
