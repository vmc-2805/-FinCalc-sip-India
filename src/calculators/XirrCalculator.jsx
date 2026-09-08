import { useMemo, useState } from 'react';
import { buildXirrCashFlows, xirrFromFlows, xirrProjection, XIRR_FREQUENCIES } from '../utils/finance';
import { formatINR, formatPercent } from '../utils/format';

const D = {
  frequency: 'Yearly',
  startDate: '2021-01-01',
  maturityDate: '2024-01-01',
  investmentAmount: 10000,
  maturityAmount: 60000,
};

function ProjectionChart({ rows }) {
  if (!rows.length) return null;
  const W = 520;
  const H = 260;
  const pad = { l: 56, r: 16, t: 16, b: 34 };
  const maxY = Math.max(...rows.map((r) => Math.max(r.invested, r.value)), 1);
  const x = (i) => pad.l + (rows.length === 1 ? 0 : (i / (rows.length - 1)) * (W - pad.l - pad.r));
  const y = (v) => H - pad.b - (v / maxY) * (H - pad.t - pad.b);
  const path = (key) => rows.map((r, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(r[key]).toFixed(1)}`).join(' ');
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * maxY);
  const short = (v) => (v >= 1e7 ? (v / 1e7).toFixed(1) + 'Cr' : v >= 1e5 ? (v / 1e5).toFixed(1) + 'L' : v >= 1e3 ? Math.round(v / 1e3) + 'K' : Math.round(v));
  return (
    <div className="xirr-chart">
      <div className="chart-legend" style={{ justifyContent: 'center', marginBottom: 8 }}>
        <span>
          <i style={{ background: 'var(--chart-returns)' }} /> Investment amount
        </span>
        <span>
          <i style={{ background: 'var(--primary)' }} /> Portfolio growth (returns)
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Wealth projection chart">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#e9e9eb" strokeDasharray="4 4" />
            <text x={pad.l - 8} y={y(t) + 4} fontSize="11" fill="#7c7e8c" textAnchor="end">
              {short(t)}
            </text>
          </g>
        ))}
        {rows.map((r, i) => (
          <text key={r.year} x={x(i)} y={H - 10} fontSize="11" fill="#7c7e8c" textAnchor="middle">
            {r.year}
          </text>
        ))}
        <path d={path('invested')} fill="none" stroke="var(--chart-returns)" strokeWidth="2.5" />
        <path d={path('value')} fill="none" stroke="var(--primary)" strokeWidth="2.5" />
        {rows.map((r, i) => (
          <g key={'p' + r.year}>
            <circle cx={x(i)} cy={y(r.invested)} r="3.5" fill="var(--chart-returns)" />
            <circle cx={x(i)} cy={y(r.value)} r="3.5" fill="var(--primary)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function XirrCalculator() {
  const [frequency, setFrequency] = useState(D.frequency);
  const [form, setForm] = useState({ ...D });

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const result = useMemo(() => {
    const amount = Number(form.investmentAmount);
    const maturity = Number(form.maturityAmount);
    const start = new Date(form.startDate);
    const end = new Date(form.maturityDate);
    if (!amount || !maturity || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return { error: true };
    }
    const flows = buildXirrCashFlows(start, end, amount, maturity, frequency);
    const value = xirrFromFlows(flows);
    if (value == null || !Number.isFinite(value)) return { error: true };
    const invested = flows.filter((f) => f.amount < 0).reduce((s, f) => s - f.amount, 0);
    return {
      error: false,
      value,
      invested,
      installments: flows.length - 1,
      projection: xirrProjection(amount, value, start, end, frequency),
    };
  }, [form, frequency]);

  return (
    <div className="calc-card">
      <div className="calc-grid xirr-grid">
        <div>
          <div className="field">
            <label>Investment frequency</label>
            <div className="choice-group" role="radiogroup" aria-label="Investment frequency">
              {XIRR_FREQUENCIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={'choice' + (frequency === f ? ' active' : '')}
                  onClick={() => setFrequency(f)}
                  aria-checked={frequency === f}
                  role="radio"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="xirr-start">Start date</label>
            <input id="xirr-start" type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="xirr-end">Maturity date</label>
            <input id="xirr-end" type="date" value={form.maturityDate} onChange={(e) => update('maturityDate', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="xirr-amount">Recurring investment amount</label>
            <div className="money-input">
              <span>₹</span>
              <input
                id="xirr-amount"
                type="number"
                min={0}
                value={form.investmentAmount}
                onChange={(e) => update('investmentAmount', e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="xirr-maturity">Total maturity amount</label>
            <div className="money-input">
              <span>₹</span>
              <input
                id="xirr-maturity"
                type="number"
                min={0}
                value={form.maturityAmount}
                onChange={(e) => update('maturityAmount', e.target.value)}
              />
            </div>
          </div>
          <button type="button" className="btn btn-outline btn-small" onClick={() => { setForm({ ...D }); setFrequency(D.frequency); }}>
            Reset values
          </button>
        </div>
        <div>
          {result.error ? (
            <div className="xirr-error">
              <strong>Unable to calculate XIRR</strong>
              <p>We could not calculate your XIRR. Please check your inputs and try again. The maturity date must be after the start date and both amounts must be more than zero.</p>
            </div>
          ) : (
            <>
              <div className="xirr-result">
                <span>Your XIRR</span>
                <strong className={result.value >= 0 ? 'positive' : 'negative'}>{formatPercent(result.value)}</strong>
              </div>
              <div className="stat-grid">
                <div className="stat">
                  <small>Total invested</small>
                  <strong>{formatINR(result.invested)}</strong>
                </div>
                <div className="stat">
                  <small>Installments</small>
                  <strong>{result.installments}</strong>
                </div>
                <div className="stat accent">
                  <small>Maturity amount</small>
                  <strong>{formatINR(Number(form.maturityAmount))}</strong>
                </div>
              </div>
              <h3 style={{ marginTop: 22, fontSize: 16 }}>Wealth projection</h3>
              <ProjectionChart rows={result.projection} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
