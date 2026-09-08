import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import { ResultList, ResetButton } from '../components/ui';
import { swpResult } from '../utils/finance';
import { formatINR } from '../utils/format';

const D = { principal: 500000, withdrawal: 10000, rate: 8, years: 5 };

export default function SwpCalculator() {
  const [principal, setPrincipal] = useState(D.principal);
  const [withdrawal, setWithdrawal] = useState(D.withdrawal);
  const [rate, setRate] = useState(D.rate);
  const [years, setYears] = useState(D.years);

  const r = useMemo(() => swpResult(principal, withdrawal, rate, years), [principal, withdrawal, rate, years]);

  function reset() {
    setPrincipal(D.principal);
    setWithdrawal(D.withdrawal);
    setRate(D.rate);
    setYears(D.years);
  }

  return (
    <div className="calc-card">
      <div className="calc-inputs">
        <SliderInput
          label="Total investment"
          value={principal}
          onChange={setPrincipal}
          min={10000}
          max={10000000}
          step={10000}
          prefix="₹"
        />
        <SliderInput
          label="Withdrawal per month"
          value={withdrawal}
          onChange={setWithdrawal}
          min={500}
          max={1000000}
          step={500}
          prefix="₹"
        />
        <SliderInput
          label="Expected return rate (p.a)"
          value={rate}
          onChange={setRate}
          min={1}
          max={30}
          step={0.1}
          suffix="%"
        />
        <SliderInput label="Time period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yr" />
      </div>
      <div className="calc-footer">
        <ResultList
          rows={[
            { label: 'Total investment', value: formatINR(principal) },
            { label: 'Total withdrawal', value: formatINR(r.totalWithdrawal) },
            { label: 'Final value', value: formatINR(r.finalValue), highlight: true },
          ]}
          note={
            r.finalValue < 0
              ? 'A negative final value means the corpus will finish before the time period ends. Reduce the monthly withdrawal or increase the investment.'
              : undefined
          }
        />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
