import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import Donut from '../components/Donut';
import { ResultList, ResetButton, ChoiceGroup } from '../components/ui';
import { rdMaturity } from '../utils/finance';
import { formatINR } from '../utils/format';

const D = { monthly: 50000, rate: 6.5, years: 3, months: 6 };
const UNITS = [
  { value: 'YEARS', label: 'Years', min: 1, max: 10, step: 1, suffix: 'Yr' },
  { value: 'MONTHS', label: 'Months', min: 3, max: 12, step: 3, suffix: 'Mo' },
];

export default function RdCalculator() {
  const [monthly, setMonthly] = useState(D.monthly);
  const [rate, setRate] = useState(D.rate);
  const [unit, setUnit] = useState('YEARS');
  const [period, setPeriod] = useState({ YEARS: D.years, MONTHS: D.months });

  const u = UNITS.find((x) => x.value === unit);
  const months = unit === 'YEARS' ? period.YEARS * 12 : period.MONTHS;
  const r = useMemo(() => rdMaturity(monthly, rate, months), [monthly, rate, months]);

  function reset() {
    setMonthly(D.monthly);
    setRate(D.rate);
    setUnit('YEARS');
    setPeriod({ YEARS: D.years, MONTHS: D.months });
  }

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <SliderInput
            label="Monthly investment"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={1000000}
            step={500}
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
            hint="Interest is compounded quarterly, as followed by Indian banks"
          />
        </div>
        <Donut
          segments={[
            { label: 'Total investment', value: r.invested, color: 'var(--chart-invested)' },
            { label: 'Total interest', value: r.interest, color: 'var(--chart-returns)' },
          ]}
        />
      </div>
      <div className="calc-footer">
        <ResultList
          rows={[
            { label: 'Invested amount', value: formatINR(r.invested) },
            { label: 'Est. returns', value: formatINR(r.interest) },
            { label: 'Total value', value: formatINR(r.maturity), highlight: true },
          ]}
        />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
