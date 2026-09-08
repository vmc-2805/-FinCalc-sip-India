// Income tax for individuals (India). Supports AY 2024-25, 2025-26 and 2026-27
// for both the old and the new regime, including standard deduction, rebate
// under 87A (with marginal relief in the new regime), surcharge with marginal
// relief up to ₹2 crore, and 4% health and education cess.

export const ASSESSMENT_YEARS = ['2026 - 2027', '2025 - 2026', '2024 - 2025'];
export const AGE_CATEGORIES = ['Below 60', '60 or Above 60', '80 or Above 80'];

const AY = { A24: '2024 - 2025', A25: '2025 - 2026', A26: '2026 - 2027' };
const AGE = { BELOW60: 'Below 60', ABOVE60: '60 or Above 60', ABOVE80: '80 or Above 80' };

export const LIMITS = {
  SEC_80C: 150000,
  SEC_80CCD1B: 50000,
  SEC_80D: { [AGE.BELOW60]: 75000, [AGE.ABOVE60]: 100000, [AGE.ABOVE80]: 100000 },
  SEC_80TTA: { [AGE.BELOW60]: 10000, [AGE.ABOVE60]: 50000, [AGE.ABOVE80]: 50000 },
  SEC_24B: 200000,
  TWO_CRORE: 20000000,
};

const STANDARD_DEDUCTION = { OLD: 50000, NEW: 75000 };
const CESS = 0.04;

const BASIC_EXEMPTION = {
  OLD: { [AGE.BELOW60]: 250000, [AGE.ABOVE60]: 300000, [AGE.ABOVE80]: 500000 },
  NEW: 700000,
  NEW_BUDGET_2025: 1200000,
};
const OLD_REBATE_LIMIT = 500000;

const OLD_SLABS = {
  [AGE.BELOW60]: [
    { min: 250001, max: 500000, rate: 5 },
    { min: 500001, max: 1000000, rate: 20 },
    { min: 1000001, max: Infinity, rate: 30 },
  ],
  [AGE.ABOVE60]: [
    { min: 300001, max: 500000, rate: 5 },
    { min: 500001, max: 1000000, rate: 20 },
    { min: 1000001, max: Infinity, rate: 30 },
  ],
  [AGE.ABOVE80]: [
    { min: 500001, max: 1000000, rate: 20 },
    { min: 1000001, max: Infinity, rate: 30 },
  ],
};

const NEW_SLABS = {
  [AY.A24]: [
    { min: 300001, max: 600000, rate: 5 },
    { min: 600001, max: 900000, rate: 10 },
    { min: 900001, max: 1200000, rate: 15 },
    { min: 1200001, max: 1500000, rate: 20 },
    { min: 1500001, max: Infinity, rate: 30 },
  ],
  [AY.A25]: [
    { min: 300001, max: 700000, rate: 5 },
    { min: 700001, max: 1000000, rate: 10 },
    { min: 1000001, max: 1200000, rate: 15 },
    { min: 1200001, max: 1500000, rate: 20 },
    { min: 1500001, max: Infinity, rate: 30 },
  ],
  [AY.A26]: [
    { min: 400001, max: 800000, rate: 5 },
    { min: 800001, max: 1200000, rate: 10 },
    { min: 1200001, max: 1600000, rate: 15 },
    { min: 1600001, max: 2000000, rate: 20 },
    { min: 2000001, max: 2400000, rate: 25 },
    { min: 2400001, max: Infinity, rate: 30 },
  ],
};

// Surcharge: 10% above ₹50 lakh, 15% above ₹1 crore (up to ₹2 crore).
// baseTax is the tax at the threshold, used for marginal relief.
const SURCHARGE = {
  NEW: {
    [AY.A26]: [
      { min: 5000000, max: 10000000, rate: 0.1, baseTax: 1080000 },
      { min: 10000000, max: 20000000, rate: 0.15, baseTax: 2838000 },
    ],
    [AY.A25]: [
      { min: 5000000, max: 10000000, rate: 0.1, baseTax: 1190000 },
      { min: 10000000, max: 20000000, rate: 0.15, baseTax: 2959000 },
    ],
    [AY.A24]: [
      { min: 5000000, max: 10000000, rate: 0.1, baseTax: 1200000 },
      { min: 10000000, max: 20000000, rate: 0.15, baseTax: 2970000 },
    ],
  },
  OLD: {
    [AGE.BELOW60]: [
      { min: 5000000, max: 10000000, rate: 0.1, baseTax: 1312500 },
      { min: 10000000, max: 20000000, rate: 0.15, baseTax: 3093750 },
    ],
    [AGE.ABOVE60]: [
      { min: 5000000, max: 10000000, rate: 0.1, baseTax: 1310000 },
      { min: 10000000, max: 20000000, rate: 0.15, baseTax: 3091000 },
    ],
    [AGE.ABOVE80]: [
      { min: 5000000, max: 10000000, rate: 0.1, baseTax: 1300000 },
      { min: 10000000, max: 20000000, rate: 0.15, baseTax: 3080000 },
    ],
  },
};

export const SLAB_TABLES = { OLD_SLABS, NEW_SLABS };

function slabTax(income, slabs, exemptionLimit) {
  if (income <= exemptionLimit) return 0;
  let tax = 0;
  for (const { min, max, rate } of slabs) {
    if (income <= min) break;
    tax += ((Math.min(income, max) - min) * rate) / 100;
  }
  return tax;
}

function newRegimeMarginalRelief(income, tax, ay) {
  const excess = income - (ay === AY.A26 ? BASIC_EXEMPTION.NEW_BUDGET_2025 : BASIC_EXEMPTION.NEW);
  return excess > 0 && tax > excess ? excess : tax;
}

function withSurcharge(income, tax, table) {
  for (const { min, max, rate, baseTax } of table) {
    if (income > min && income <= max) {
      const surcharge = tax * rate;
      const total = tax + surcharge;
      const extraTax = total - baseTax;
      const extraIncome = income - min;
      if (extraTax > extraIncome) return tax + (surcharge - (extraTax - extraIncome));
      return total;
    }
  }
  return tax;
}

const withCess = (tax) => tax + tax * CESS;

function newRegimeTax(ay, income) {
  const slabs = NEW_SLABS[ay] || NEW_SLABS[AY.A26];
  const exemption = ay === AY.A26 ? BASIC_EXEMPTION.NEW_BUDGET_2025 : BASIC_EXEMPTION.NEW;
  let tax = slabTax(income, slabs, exemption);
  tax = newRegimeMarginalRelief(income, tax, ay);
  return withCess(withSurcharge(income, tax, SURCHARGE.NEW[ay] || SURCHARGE.NEW[AY.A26]));
}

function oldRegimeTax(age, income) {
  let tax = slabTax(income, OLD_SLABS[age], BASIC_EXEMPTION.OLD[age]);
  if (income <= OLD_REBATE_LIMIT) tax = 0;
  return withCess(withSurcharge(income, tax, SURCHARGE.OLD[age]));
}

function salaryAfterStandardDeduction(ay, gross) {
  let oldRegime = gross;
  let newRegime = gross;
  if (ay === AY.A24) {
    if (newRegime >= STANDARD_DEDUCTION.OLD) newRegime -= STANDARD_DEDUCTION.OLD;
  } else if (newRegime >= STANDARD_DEDUCTION.NEW) {
    newRegime -= STANDARD_DEDUCTION.NEW;
  }
  if (oldRegime >= STANDARD_DEDUCTION.OLD) oldRegime -= STANDARD_DEDUCTION.OLD;
  return { oldRegime, newRegime };
}

function totalIncome(form) {
  const gross = Number(form.grossSalary) || 0;
  const other = Number(form.otherSourceIncome) || 0;
  const interest = Number(form.interestIncome) || 0;
  const rental = Number(form.rentalIncome) || 0;
  const selfLoan = Number(form.selfHomeLoanInterest) || 0;
  const letoutLoan = Number(form.letoutHomeLoanInterest) || 0;
  const salary = salaryAfterStandardDeduction(form.assessmentYear, gross);
  const houseOld = rental - (30 * rental) / 100 - Math.min(selfLoan, LIMITS.SEC_24B) - letoutLoan;
  const houseNew = rental - letoutLoan;
  return {
    oldRegime: salary.oldRegime + other + interest + houseOld,
    newRegime: salary.newRegime + other + interest + houseNew,
  };
}

function chapterVIA(form) {
  const age = form.ageCategory;
  const c80 = Math.min(Number(form.deduction80c) || 0, LIMITS.SEC_80C);
  const ccd = Math.min(Number(form.deduction80ccd) || 0, LIMITS.SEC_80CCD1B);
  const d80 = Math.min(Number(form.deduction80d) || 0, LIMITS.SEC_80D[age]);
  const tta = Math.min(Number(form.deduction80tta) || 0, LIMITS.SEC_80TTA[age]);
  const g80 = Number(form.deduction80g) || 0;
  const e80 = Number(form.deduction80e) || 0;
  return c80 + ccd + d80 + tta + g80 + e80;
}

export function hraExemption(form) {
  const basic = Number(form.basicSalary) || 0;
  const da = Number(form.dearnessAllowance) || 0;
  const hra = Number(form.hraReceived) || 0;
  const rent = Number(form.rentPaid) || 0;
  const cityLimit = form.isMetroCity === 'Yes' ? (50 * basic) / 100 : (40 * basic) / 100;
  return Math.max(0, Math.min(hra, cityLimit, rent - basic / 10 + da));
}

/**
 * Full result for the income tax calculator.
 * Returns tax under both regimes plus the extra 80C investment that could
 * reduce old regime tax further.
 */
export function incomeTaxBothRegimes(form) {
  const income = totalIncome(form);
  const deductions = chapterVIA(form);
  const hra = hraExemption(form);
  const taxableOld = income.oldRegime - deductions - hra;
  const taxableNew = income.newRegime;

  if (taxableOld > LIMITS.TWO_CRORE || taxableNew > LIMITS.TWO_CRORE) {
    return {
      oldRegime: 0,
      newRegime: 0,
      remaining80c: 0,
      fullDeductionOldRegime: 0,
      taxableOld,
      taxableNew,
      isAboveTwoCrore: true,
    };
  }

  const oldTax = oldRegimeTax(form.ageCategory, taxableOld);
  const newTax = newRegimeTax(form.assessmentYear, taxableNew);

  const c80 = Number(form.deduction80c) || 0;
  const remaining80c = c80 < LIMITS.SEC_80C ? LIMITS.SEC_80C - c80 : 0;
  const deductionsWithFull80C = chapterVIA({ ...form, deduction80c: LIMITS.SEC_80C });
  const oldTaxWithFull80C = oldRegimeTax(form.ageCategory, income.oldRegime - deductionsWithFull80C - hra);

  return {
    oldRegime: Math.ceil(oldTax),
    newRegime: Math.ceil(newTax),
    remaining80c: Math.ceil(income.oldRegime < 650000 ? income.oldRegime - 500000 : remaining80c),
    fullDeductionOldRegime: Math.ceil(oldTaxWithFull80C),
    taxableOld: Math.max(0, taxableOld),
    taxableNew: Math.max(0, taxableNew),
    isAboveTwoCrore: false,
  };
}
