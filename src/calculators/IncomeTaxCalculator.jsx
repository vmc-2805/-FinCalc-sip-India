import { useState } from 'react';
import { SelectField } from '../components/ui';
import { incomeTaxBothRegimes, ASSESSMENT_YEARS, AGE_CATEGORIES, LIMITS } from '../utils/tax';
import { formatINR } from '../utils/format';

const EMPTY = {
  assessmentYear: ASSESSMENT_YEARS[0],
  ageCategory: AGE_CATEGORIES[0],
  grossSalary: '',
  otherSourceIncome: '',
  interestIncome: '',
  rentalIncome: '',
  selfHomeLoanInterest: '',
  letoutHomeLoanInterest: '',
  deduction80c: '',
  deduction80ccd: '',
  deduction80d: '',
  deduction80g: '',
  deduction80e: '',
  deduction80tta: '',
  basicSalary: '',
  dearnessAllowance: '',
  hraReceived: '',
  rentPaid: '',
  isMetroCity: 'Yes',
};

const INCOME_FIELDS = [
  { key: 'grossSalary', label: 'Gross salary income' },
  { key: 'otherSourceIncome', label: 'Annual income from other sources' },
  { key: 'interestIncome', label: 'Annual income from interest' },
  { key: 'rentalIncome', label: 'Annual income from let-out house property (rental income)' },
  { key: 'selfHomeLoanInterest', label: 'Annual interest paid on home loan (self-occupied)' },
  { key: 'letoutHomeLoanInterest', label: 'Annual interest paid on home loan (let-out)' },
];

const DEDUCTION_FIELDS = [
  { key: 'deduction80c', label: 'Basic deductions u/s 80C', max: () => LIMITS.SEC_80C },
  { key: 'deduction80ccd', label: 'Contribution to NPS u/s 80CCD(1B)', max: () => LIMITS.SEC_80CCD1B },
  { key: 'deduction80d', label: 'Medical insurance premium u/s 80D', max: (age) => LIMITS.SEC_80D[age] },
  { key: 'deduction80g', label: 'Donation to charity u/s 80G' },
  { key: 'deduction80e', label: 'Interest on educational loan u/s 80E' },
  { key: 'deduction80tta', label: 'Interest on deposits in saving account u/s 80TTA/TTB', max: (age) => LIMITS.SEC_80TTA[age] },
];

const HRA_FIELDS = [
  { key: 'basicSalary', label: 'Basic salary received per annum' },
  { key: 'dearnessAllowance', label: 'Dearness allowance (DA) received per annum' },
  { key: 'hraReceived', label: 'HRA received per annum' },
  { key: 'rentPaid', label: 'Total rent paid per annum' },
];

function MoneyField({ field, value, onChange, ageCategory }) {
  const max = field.max ? field.max(ageCategory) : Infinity;
  return (
    <div className="field">
      <label htmlFor={'tax-' + field.key}>
        {field.label}
        {Number.isFinite(max) && <small className="limit"> (max {formatINR(max)})</small>}
      </label>
      <div className="money-input">
        <span>₹</span>
        <input
          id={'tax-' + field.key}
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="XX,XXX"
          value={value}
          onChange={(e) => {
            let v = e.target.value.replace(/^0+(?=\d)/, '');
            if (Number.isFinite(max) && Number(v) > max) v = String(max);
            onChange(field.key, v);
          }}
        />
      </div>
    </div>
  );
}

function Section({ title, open, onToggle, children }) {
  return (
    <div className={'accordion' + (open ? ' open' : '')}>
      <button type="button" className="accordion-head" onClick={onToggle} aria-expanded={open}>
        <span>{title}</span>
        <span className="accordion-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}

export default function IncomeTaxCalculator() {
  const [form, setForm] = useState(EMPTY);
  const [open, setOpen] = useState({ income: true, deductions: false, hra: false });
  const [result, setResult] = useState(null);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  function calculate() {
    setResult(incomeTaxBothRegimes(form));
  }
  function reset() {
    setForm(EMPTY);
    setResult(null);
  }

  return (
    <div className="calc-card tax-card">
      <div className="tax-top">
        <SelectField
          label="Assessment year"
          value={form.assessmentYear}
          onChange={(v) => set('assessmentYear', v)}
          options={ASSESSMENT_YEARS.map((y) => ({ value: y, label: y }))}
        />
        <SelectField
          label="Age category"
          value={form.ageCategory}
          onChange={(v) => set('ageCategory', v)}
          options={AGE_CATEGORIES.map((a) => ({ value: a, label: a }))}
        />
      </div>

      <Section title="Income" open={open.income} onToggle={() => toggle('income')}>
        <div className="field-grid">
          {INCOME_FIELDS.map((f) => (
            <MoneyField key={f.key} field={f} value={form[f.key]} onChange={set} ageCategory={form.ageCategory} />
          ))}
        </div>
      </Section>

      <Section title="Deductions (old regime)" open={open.deductions} onToggle={() => toggle('deductions')}>
        <div className="field-grid">
          {DEDUCTION_FIELDS.map((f) => (
            <MoneyField key={f.key} field={f} value={form[f.key]} onChange={set} ageCategory={form.ageCategory} />
          ))}
        </div>
      </Section>

      <Section title="HRA exemption (old regime)" open={open.hra} onToggle={() => toggle('hra')}>
        <div className="field-grid">
          {HRA_FIELDS.map((f) => (
            <MoneyField key={f.key} field={f} value={form[f.key]} onChange={set} ageCategory={form.ageCategory} />
          ))}
          <div className="field">
            <label>Do you live in a metro city?</label>
            <div className="choice-group">
              {['Yes', 'No'].map((v) => (
                <button
                  key={v}
                  type="button"
                  className={'choice' + (form.isMetroCity === v ? ' active' : '')}
                  onClick={() => set('isMetroCity', v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="tax-actions">
        <button type="button" className="btn btn-primary" onClick={calculate}>
          Calculate
        </button>
        <button type="button" className="btn btn-outline" onClick={reset}>
          Reset
        </button>
      </div>

      {result && result.isAboveTwoCrore && (
        <p className="alert">This calculator supports income tax calculation for taxable income up to ₹2 crore only.</p>
      )}

      {result && !result.isAboveTwoCrore && (
        <div className="tax-result">
          <div className="tax-result-row">
            <span>Total tax (Old regime)</span>
            <strong>{formatINR(result.oldRegime)}</strong>
          </div>
          <div className="tax-result-row">
            <span>Total tax (New regime)</span>
            <strong>{formatINR(result.newRegime)}</strong>
          </div>
          <div className="tax-result-row muted">
            <span>Taxable income (Old / New)</span>
            <strong>
              {formatINR(result.taxableOld)} / {formatINR(result.taxableNew)}
            </strong>
          </div>
          <p className="tax-verdict">
            {result.oldRegime === result.newRegime
              ? 'Both regimes give the same tax for these values.'
              : result.newRegime < result.oldRegime
                ? `The new regime saves you ${formatINR(result.oldRegime - result.newRegime)}.`
                : `The old regime saves you ${formatINR(result.newRegime - result.oldRegime)}.`}
          </p>
          {result.remaining80c > 0 && result.oldRegime - result.fullDeductionOldRegime > 0 && (
            <p className="note">
              You can reduce tax to <strong>{formatINR(result.fullDeductionOldRegime)}</strong> and save{' '}
              <strong>{formatINR(result.oldRegime - result.fullDeductionOldRegime)}</strong> by investing{' '}
              <strong>{formatINR(result.remaining80c)}</strong> more under Section 80C (ELSS, PPF, EPF, life
              insurance etc.) as per the old tax regime.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
