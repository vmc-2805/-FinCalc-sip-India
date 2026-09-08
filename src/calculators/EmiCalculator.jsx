import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import Donut from '../components/Donut';
import { ResultList } from '../components/ui';
import { calculateEMI, amortisationSchedule } from '../utils/finance';
import { formatINR } from '../utils/format';

const D = { amount: 1000000, rate: 6.5, years: 5 };

export default function EmiCalculator() {
  const [amount, setAmount] = useState(D.amount);
  const [rate, setRate] = useState(D.rate);
  const [years, setYears] = useState(D.years);
  const [showSchedule, setShowSchedule] = useState(false);

  const months = Math.round(years * 12);
  const emi = useMemo(() => calculateEMI(amount, rate, months), [amount, rate, months]);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;
  const schedule = useMemo(
    () => (showSchedule ? amortisationSchedule(amount, rate, months) : []),
    [showSchedule, amount, rate, months],
  );

  function reset() {
    setAmount(D.amount);
    setRate(D.rate);
    setYears(D.years);
  }

  return (
    <div className="calc-card">
      <div className="calc-grid">
        <div className="calc-inputs">
          <SliderInput
            label="Loan amount"
            value={amount}
            onChange={setAmount}
            min={100000}
            max={100000000}
            step={50000}
            prefix="₹"
          />
          <SliderInput
            label="Rate of interest (p.a)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.1}
            suffix="%"
          />
          <SliderInput label="Loan tenure" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yr" />
        </div>
        <Donut
          segments={[
            { label: 'Principal amount', value: amount, color: 'var(--chart-invested)' },
            { label: 'Interest amount', value: totalInterest, color: 'var(--chart-returns)' },
          ]}
        />
      </div>
      <div className="calc-footer">
        <ResultList
          rows={[
            { label: 'Monthly EMI', value: formatINR(emi), highlight: true },
            { label: 'Principal amount', value: formatINR(amount) },
            { label: 'Total interest', value: formatINR(totalInterest) },
            { label: 'Total amount', value: formatINR(totalPayment) },
          ]}
        />
        <div className="calc-actions" style={{ flexDirection: 'column', gap: 10 }}>
          <button type="button" className="btn btn-primary" onClick={reset}>
            Reset values
          </button>
          <button type="button" className="btn btn-outline" onClick={() => setShowSchedule((s) => !s)}>
            {showSchedule ? 'Hide' : 'Show'} amortization details (yearly)
          </button>
        </div>
      </div>
      {showSchedule && (
        <div className="table-wrap" style={{ marginTop: 26 }}>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Principal paid</th>
                <th>Interest paid</th>
                <th>Total payment</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{formatINR(row.principal)}</td>
                  <td>{formatINR(row.interest)}</td>
                  <td>{formatINR(row.principal + row.interest)}</td>
                  <td>{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
