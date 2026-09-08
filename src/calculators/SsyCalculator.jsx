import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import Donut from '../components/Donut';
import { ResultList, ResetButton } from '../components/ui';
import { ssyMaturity, SSY_RATE } from '../utils/finance';
import { formatINR } from '../utils/format';

const CURRENT_YEAR = new Date().getFullYear();
const D = { yearly: 10000, age: 5, startYear: CURRENT_YEAR };

export default function SsyCalculator() {
  const [yearly, setYearly] = useState(D.yearly);
  const [age, setAge] = useState(D.age);
  const [startYear, setStartYear] = useState(D.startYear);

  const r = useMemo(() => ssyMaturity(yearly), [yearly]);
  const maturityYear = startYear + 21;

  function reset() {
    setYearly(D.yearly);
    setAge(D.age);
    setStartYear(D.startYear);
  }

  return (
    <div className="calc-card">
      <div className="rate-banner">Latest SSY Rate = {SSY_RATE}%</div>
      <div className="calc-grid">
        <div className="calc-inputs">
          <SliderInput
            label="Yearly investment"
            value={yearly}
            onChange={setYearly}
            min={250}
            max={150000}
            step={250}
            prefix="₹"
          />
          <SliderInput label="Girl's age" value={age} onChange={setAge} min={1} max={10} step={1} suffix="Yr" />
          <SliderInput
            label="Start period"
            value={startYear}
            onChange={setStartYear}
            min={2018}
            max={CURRENT_YEAR + 5}
            step={1}
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
            { label: 'Total investment', value: formatINR(r.invested) },
            { label: 'Total interest', value: formatINR(r.interest) },
            { label: 'Maturity year', value: String(maturityYear) },
            { label: 'Maturity value', value: formatINR(r.maturity), highlight: true },
          ]}
          note={`Deposits for 15 years, maturity after 21 years. Girl's age at maturity: ${age + 21} years.`}
        />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
