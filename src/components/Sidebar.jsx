import { NavLink } from 'react-router-dom';
import { calculators } from '../data/calculators';

function ListBox({ title, items }) {
  return (
    <div className="side-box">
      <h3>{title}</h3>
      <ul>
        {items.map((c) => (
          <li key={c.slug}>
            <NavLink to={'/calculators/' + c.slug}>{c.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sidebar() {
  const popular = calculators.filter((c) => c.category === 'popular');
  const mf = calculators.filter((c) => c.category === 'mutual-fund');
  return (
    <aside className="page-side" aria-label="Calculator navigation">
      <ListBox title="Popular Calculators" items={popular} />
      <ListBox title="Mutual Fund Calculators" items={mf} />
    </aside>
  );
}
