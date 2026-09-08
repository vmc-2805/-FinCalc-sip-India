import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import Donut from '../components/Donut';
import { Tabs, ResultList, ResetButton } from '../components/ui';
import { sipFutureValue, lumpsumFutureValue } from '../utils/finance';
import { formatINR } from '../utils/format';

const DEFAULTS = { monthly: 25000, lumpsum: 25000, rate: 12, years: 10 };

/**
 * SIP / Lumpsum calculator (also used for bank SIP pages, ELSS and MF returns).
 */
export default function SipCalculator({
  defaultMode = 'sip',
  showTabs = true,
  minYears = 1,
  maxYears = 40,
  maxRate = 30,
  defaultYears,
  note,
}) {
  const [mode, setMode] = useState(defaultMode);
  const [monthly, setMonthly] = useState(DEFAULTS.monthly);
  const [lumpsum, setLumpsum] = useState(DEFAULTS.lumpsum);
  const [rate, setRate] = useState(DEFAULTS.rate);
  const [years, setYears] = useState(defaultYears || Math.max(minYears, DEFAULTS.years));

  const result = useMemo(() => {
    if (mode === 'sip') {
      const invested = monthly * years * 12;
      const total = sipFutureValue(monthly, rate, years);
      return { invested, total, returns: total - invested };
    }
    const total = lumpsumFutureValue(lumpsum, rate, years);
    return { invested: lumpsum, total, returns: total - lumpsum };
  }, [mode, monthly, lumpsum, rate, years]);

  function reset() {
    setMonthly(DEFAULTS.monthly);
    setLumpsum(DEFAULTS.lumpsum);
    setRate(DEFAULTS.rate);
    setYears(defaultYears || Math.max(minYears, DEFAULTS.years));
  }

  return (
    <div className="calc-card">
      {showTabs && (
        <Tabs
          tabs={[
            { key: 'sip', label: 'SIP' },
            { key: 'lumpsum', label: 'Lumpsum' },
          ]}
          active={mode}
          onChange={setMode}
        />
      )}
      <div className="calc-grid">
        <div className="calc-inputs">
          {mode === 'sip' ? (
            <SliderInput
              label="Monthly investment"
              value={monthly}
              onChange={setMonthly}
              min={100}
              max={1000000}
              step={500}
              prefix="₹"
            />
          ) : (
            <SliderInput
              label="Total investment"
              value={lumpsum}
              onChange={setLumpsum}
              min={500}
              max={10000000}
              step={500}
              prefix="₹"
            />
          )}
          <SliderInput
            label="Expected return rate (p.a)"
            value={rate}
            onChange={setRate}
            min={1}
            max={maxRate}
            step={0.1}
            suffix="%"
          />
          <SliderInput
            label="Time period"
            value={years}
            onChange={setYears}
            min={minYears}
            max={maxYears}
            step={1}
            suffix="Yr"
            hint={minYears > 1 ? `Minimum ${minYears} years (lock-in period)` : undefined}
          />
        </div>
        <Donut
          segments={[
            { label: 'Invested amount', value: result.invested, color: 'var(--chart-invested)' },
            { label: 'Est. returns', value: result.returns, color: 'var(--chart-returns)' },
          ]}
        />
      </div>
      <div className="calc-footer">
        <ResultList
          rows={[
            { label: 'Invested amount', value: formatINR(result.invested) },
            { label: 'Est. returns', value: formatINR(result.returns) },
            { label: 'Total value', value: formatINR(result.total), highlight: true },
          ]}
          note={note}
        />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
