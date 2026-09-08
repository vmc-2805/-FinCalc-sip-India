import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import Donut from '../components/Donut';
import { ResultList, ResetButton, ChoiceGroup } from '../components/ui';
import { fdMaturity } from '../utils/finance';
import { formatINR } from '../utils/format';

const D = { principal: 100000, rate: 6.5, years: 5, months: 6, days: 30 };
const UNITS = [
  { value: 'YEARS', label: 'Years', min: 1, max: 25, step: 1, suffix: 'Yr' },
  { value: 'MONTHS', label: 'Months', min: 1, max: 11, step: 1, suffix: 'Mo' },
  { value: 'DAYS', label: 'Days', min: 1, max: 31, step: 1, suffix: 'Days' },
];

export default function FdCalculator() {
  const [principal, setPrincipal] = useState(D.principal);
  const [rate, setRate] = useState(D.rate);
  const [unit, setUnit] = useState('YEARS');
  const [period, setPeriod] = useState({ YEARS: D.years, MONTHS: D.months, DAYS: D.days });

  const u = UNITS.find((x) => x.value === unit);
  const r = useMemo(() => fdMaturity(principal, rate, period[unit], unit), [principal, rate, period, unit]);

  function reset() {
    setPrincipal(D.principal);
    setRate(D.rate);
    setUnit('YEARS');
    setPeriod({ YEARS: D.years, MONTHS: D.months, DAYS: D.days });
  }

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <SliderInput
            label="Total investment"
            value={principal}
            onChange={setPrincipal}
            min={5000}
            max={10000000}
            step={5000}
            prefix="₹"
          />
          <SliderInput
            label="Rate of interest (p.a)"
            value={rate}
            onChange={setRate}
            min={1}
            max={15}
            step={0.1}
            suffix="%"
          />
          <ChoiceGroup label="Time period in" value={unit} onChange={setUnit} options={UNITS} />
          <SliderInput
            key={unit}
            label="Time period"
            value={period[unit]}
            onChange={(v) => setPeriod((p) => ({ ...p, [unit]: v }))}
            min={u.min}
            max={u.max}
            step={u.step}
            suffix={u.suffix}
            hint={
              unit === 'YEARS'
                ? 'Interest compounded quarterly'
                : unit === 'MONTHS'
                  ? 'Simple interest up to 6 months, quarterly compounding after that'
                  : 'Simple interest for deposits in days'
            }
          />
        </div>
        <Donut
          segments={[
            { label: 'Total investment', value: principal, color: 'var(--chart-invested)' },
            { label: 'Total returns', value: r.interest, color: 'var(--chart-returns)' },
          ]}
        />
      </div>
      <div className="calc-footer">
        <ResultList
          rows={[
            { label: 'Invested amount', value: formatINR(principal) },
            { label: 'Est. returns', value: formatINR(r.interest) },
            { label: 'Total value', value: formatINR(r.maturity), highlight: true },
          ]}
        />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
