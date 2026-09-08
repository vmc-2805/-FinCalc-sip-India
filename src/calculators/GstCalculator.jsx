import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import Donut from '../components/Donut';
import { Tabs, ResultList, ResetButton, ChoiceGroup } from '../components/ui';
import { gstCalc } from '../utils/finance';
import { formatINR } from '../utils/format';

const D = { amount: 25000, rate: 12 };
const RATES = [0.25, 3, 5, 12, 18, 28].map((v) => ({ value: v, label: v + '%' }));

export default function GstCalculator() {
  const [excluding, setExcluding] = useState(true);
  const [amount, setAmount] = useState(D.amount);
  const [rate, setRate] = useState(D.rate);

  const r = useMemo(() => gstCalc(amount, rate, excluding), [amount, rate, excluding]);

  function reset() {
    setAmount(D.amount);
    setRate(D.rate);
    setExcluding(true);
  }

  return (
    <div className="calc-card">
      <Tabs
        tabs={[
          { key: 'excluding', label: 'Excluding GST' },
          { key: 'including', label: 'Including GST' },
        ]}
        active={excluding ? 'excluding' : 'including'}
        onChange={(k) => setExcluding(k === 'excluding')}
      />
      <div className="calc-grid">
        <div className="calc-inputs">
          <SliderInput
            label="Total amount"
            value={amount}
            onChange={setAmount}
            min={5000}
            max={500000}
            step={3000}
            prefix="₹"
          />
          <SliderInput label="Tax slab" value={rate} onChange={setRate} min={1} max={30} step={1} suffix="%" />
          <ChoiceGroup value={rate} onChange={setRate} options={RATES} label="GST slabs" />
        </div>
        <Donut
          segments={[
            { label: excluding ? 'Amount' : 'Pre-GST amount', value: excluding ? amount : r.amount, color: 'var(--chart-invested)' },
            { label: 'Total GST', value: r.totalGST, color: 'var(--chart-returns)' },
          ]}
        />
      </div>
      <div className="calc-footer">
        <ResultList
          rows={[
            { label: 'Total GST', value: formatINR(r.totalGST) },
            { label: 'Post-GST amount', value: formatINR(r.amount), highlight: true },
          ]}
          note={
            excluding
              ? `Post-GST amount is the price you pay after adding ${rate}% GST.`
              : `Post-GST amount is the base price after removing ${rate}% GST from the total.`
          }
        />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
