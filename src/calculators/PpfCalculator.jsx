import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import Donut from '../components/Donut';
import { ResultList, ResetButton } from '../components/ui';
import { ppfMaturity } from '../utils/finance';
import { formatINR } from '../utils/format';

const D = { yearly: 10000, years: 15 };
const PPF_RATE = 7.1;

export default function PpfCalculator() {
  const [yearly, setYearly] = useState(D.yearly);
  const [years, setYears] = useState(D.years);

  const r = useMemo(() => ppfMaturity(yearly, PPF_RATE, years), [yearly, years]);

  function reset() {
    setYearly(D.yearly);
    setYears(D.years);
  }

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <SliderInput
            label="Yearly investment"
            value={yearly}
            onChange={setYearly}
            min={500}
            max={150000}
            step={500}
            prefix="₹"
          />
          <SliderInput
            label="Time period (in years)"
            value={years}
            onChange={setYears}
            min={15}
            max={50}
            step={1}
            suffix="Yr"
          />
          <SliderInput label="Rate of interest" value={PPF_RATE} min={PPF_RATE} max={PPF_RATE} suffix="%" disabled />
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
            { label: 'Total interest', value: formatINR(r.interest) },
            { label: 'Maturity value', value: formatINR(r.maturity), highlight: true },
          ]}
        />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
