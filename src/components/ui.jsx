// Small shared UI pieces used across calculators.

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="calc-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={active === t.key}
          className={'calc-tab' + (active === t.key ? ' active' : '')}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function ResultList({ rows, note }) {
  return (
    <div>
      <div className="result-list">
        {rows.map((r) => (
          <div key={r.label} className={'result-row' + (r.highlight ? ' highlight' : '')}>
            <span className="label">{r.label}</span>
            <span className="value">{r.value}</span>
          </div>
        ))}
      </div>
      {note && <div className="result-note">{note}</div>}
    </div>
  );
}

export function ChoiceGroup({ label, options, value, onChange }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <div className="choice-group" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={'choice' + (value === o.value ? ' active' : '')}
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SelectField({ label, value, onChange, options }) {
  const id = 'sel-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ResetButton({ onClick }) {
  return (
    <div className="calc-actions">
      <button type="button" className="btn btn-primary" onClick={onClick}>
        Reset values
      </button>
    </div>
  );
}
