import { useMemo, useState } from 'react';
import SliderInput from '../components/SliderInput';
import { ResetButton } from '../components/ui';
import { epfMaturity } from '../utils/finance';
import { formatINR } from '../utils/format';

const D = { salary: 50000, age: 30, contrib: 12, increase: 5 };
const EPF_RATE = 8.25;
const RETIREMENT_AGE = 58;

export default function EpfCalculator() {
  const [salary, setSalary] = useState(D.salary);
  const [age, setAge] = useState(D.age);
  const [contrib, setContrib] = useState(D.contrib);
  const [increase, setIncrease] = useState(D.increase);

  const r = useMemo(
    () =>
      epfMaturity({
        monthlyBasic: salary,
        annualRate: EPF_RATE,
        currentAge: age,
        employeePct: contrib,
        annualIncrease: increase,
        retirementAge: RETIREMENT_AGE,
      }),
    [salary, age, contrib, increase],
  );

  function reset() {
    setSalary(D.salary);
    setAge(D.age);
    setContrib(D.contrib);
    setIncrease(D.increase);
  }

  return (
    <div className="calc-card">
      <div className="calc-inputs">
        <SliderInput
          label="Monthly salary (Basic + DA)"
          value={salary}
          onChange={setSalary}
          min={1000}
          max={500000}
          step={1000}
          prefix="₹"
        />
        <SliderInput label="Your age" value={age} onChange={setAge} min={15} max={58} step={1} suffix="Yr" />
        <SliderInput
          label="Your contribution to EPF"
          value={contrib}
          onChange={setContrib}
          min={12}
          max={20}
          step={1}
          suffix="%"
        />
        <SliderInput
          label="Annual increase in salary"
          value={increase}
          onChange={setIncrease}
          min={0}
          max={15}
          step={1}
          suffix="%"
        />
        <SliderInput label="Rate of interest" value={EPF_RATE} min={EPF_RATE} max={EPF_RATE} suffix="%" disabled />
      </div>
      <div className="result-big">
        <span>You will have accumulated</span>
        <strong>{formatINR(r.maturity)}</strong>
        <span>by the time you retire</span>
      </div>
      <p className="result-note" style={{ textAlign: 'center' }}>
        Retirement age {RETIREMENT_AGE} years. Employer contribution to EPF is 3.67% (plus the pension share above
        the ₹15,000 wage limit). Interest {EPF_RATE}% p.a.
      </p>
      <ResetButton onClick={reset} />
    </div>
  );
}
