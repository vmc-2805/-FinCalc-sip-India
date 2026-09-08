export default function Faq({ items }) {
  if (!items || !items.length) return null;
  return (
    <section className="faq" aria-label="Frequently asked questions">
      <h2>Frequently asked questions</h2>
      {items.map((f, i) => (
        <details className="faq-item" key={f.q} open={i === 0}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  );
}
