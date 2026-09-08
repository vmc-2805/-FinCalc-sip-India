// All financial formulas used by the calculators.
// The formulas and rounding follow the conventions used by leading Indian
// investment platforms, so results match for the same inputs.

/* ------------------------------------------------------------------ */
/* Mutual funds                                                        */
/* ------------------------------------------------------------------ */

/**
 * SIP future value. Investment at the start of every month.
 * Monthly rate = (1 + R)^(1/12) - 1.
 */
export function sipFutureValue(monthly, annualRate, years) {
  const n = Math.round(years * 12);
  const r = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  if (n <= 0) return 0;
  if (r === 0) return monthly * n;
  return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}

/** Lumpsum future value with yearly compounding. */
export function lumpsumFutureValue(principal, annualRate, years) {
  return Math.round(principal * Math.pow(1 + annualRate / 100, years));
}

/**
 * Systematic Withdrawal Plan.
 * Withdrawal at the end of every month, monthly rate = (1 + R)^(1/12) - 1.
 * Final value can be negative when the withdrawals exceed the corpus.
 */
export function swpResult(principal, monthlyWithdrawal, annualRate, years) {
  const m = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const n = 12 * years;
  const growth = principal * Math.pow(1 + annualRate / 100, years);
  const withdrawals = m === 0 ? monthlyWithdrawal * n : (monthlyWithdrawal * (Math.pow(1 + m, n) - 1)) / m;
  return {
    totalWithdrawal: monthlyWithdrawal * n,
    finalValue: Math.round(growth - withdrawals),
  };
}

/* ------------------------------------------------------------------ */
/* Government schemes                                                  */
/* ------------------------------------------------------------------ */

/** PPF: deposit at the start of every year, yearly compounding. */
export function ppfMaturity(yearlyDeposit, annualRate, years) {
  const i = annualRate / 100;
  const invested = Math.round(yearlyDeposit * years);
  const maturity = Math.round(((yearlyDeposit * (Math.pow(1 + i, years) - 1)) / i) * (1 + i));
  return { invested, maturity, interest: maturity - invested };
}

/**
 * Sukanya Samriddhi Yojana at 8.2% p.a.
 * Yearly deposit is treated as two half-yearly deposits compounded half-yearly
 * for 15 years, then the balance grows for 6 more years (maturity at 21 years).
 */
export const SSY_RATE = 8.2;
export function ssyMaturity(yearlyDeposit, annualRate = SSY_RATE) {
  const h = annualRate / 200; // half-yearly rate
  const invested = 15 * yearlyDeposit;
  // Pre-computed factors for 8.2% keep the result identical to the reference calculator.
  const annuityNumerator = annualRate === SSY_RATE ? 2.33827327236724 : Math.pow(1 + h, 30) - 1;
  const growth = annualRate === SSY_RATE ? 1.6196036771733486 : Math.pow(1 + h, 12);
  const halfRate = annualRate === SSY_RATE ? 0.041 : h;
  const maturity = Math.round(((((yearlyDeposit / 2) * annuityNumerator) / halfRate) * growth) / 1e3 * 1e3);
  return { invested, maturity, interest: maturity - invested };
}

/**
 * EPF corpus at retirement.
 * Employee share = contribution % of salary. Employer share to EPF = 3.67%,
 * plus the part of the 8.33% EPS share above the ₹15,000 wage ceiling.
 * Salary increases at the start of every year; interest is calculated monthly
 * on the year's contributions and yearly on the accumulated corpus.
 */
export function epfMaturity({
  monthlyBasic,
  annualRate = 8.25,
  currentAge,
  employeePct = 12,
  annualIncrease = 5,
  retirementAge = 58,
}) {
  let salary = monthlyBasic;
  let corpus = 0;
  const monthlyRate = annualRate / 12;
  for (let year = currentAge; year < retirementAge; year++) {
    let yearContribution = 0;
    let yearInterest = 0;
    salary += Math.round((salary * annualIncrease) / 100);
    for (let m = 0; m < 12; m++) {
      const employee = Math.round((employeePct * salary) / 100);
      let employer;
      if (salary > 15000) {
        const epf = Math.round((3.67 * salary) / 100);
        employer = Math.round((8.33 * salary) / 100) - Math.round(1249.5) + epf;
      } else {
        employer = Math.round((3.67 * salary) / 100);
      }
      yearInterest += Math.round((yearContribution * monthlyRate) / 100);
      yearContribution += employee + employer;
    }
    corpus += yearContribution + yearInterest;
    corpus += Math.round((corpus * annualRate) / 100);
  }
  return { maturity: corpus, years: Math.max(0, retirementAge - currentAge) };
}

/* ------------------------------------------------------------------ */
/* Bank deposits                                                       */
/* ------------------------------------------------------------------ */

/**
 * Fixed deposit maturity.
 * unit = 'YEARS' | 'MONTHS' | 'DAYS'. Quarterly compounding for tenures of
 * more than 6 months, simple interest for shorter tenures (bank practice).
 */
export function fdMaturity(principal, annualRate, period, unit = 'YEARS') {
  let maturity;
  if (unit === 'YEARS') {
    maturity = Math.round(principal * Math.pow(1 + annualRate / 400, 4 * period));
  } else if (unit === 'MONTHS') {
    const years = Number((period / 12).toFixed(2));
    maturity =
      period <= 6
        ? Math.round(principal + (principal * annualRate * years) / 100)
        : Math.round(principal * Math.pow(1 + annualRate / 400, 4 * years));
  } else {
    const years = Number((period / 365).toFixed(3));
    maturity = Math.round(principal + (principal * annualRate * years) / 100);
  }
  return { maturity, interest: maturity - principal };
}

/** Recurring deposit with quarterly compounding (standard bank formula). */
export function rdMaturity(monthlyDeposit, annualRate, months) {
  let maturity = 0;
  for (let i = 1; i <= months; i++) {
    maturity = Math.round(maturity + monthlyDeposit * Math.pow(1 + annualRate / 400, (4 * i) / 12));
  }
  const invested = monthlyDeposit * months;
  return { maturity, invested, interest: Math.round(maturity - invested) };
}

/* ------------------------------------------------------------------ */
/* Loans                                                               */
/* ------------------------------------------------------------------ */

/** Loan EMI (reducing balance). */
export function calculateEMI(principal, annualRate, months) {
  const r = annualRate / 1200;
  if (months <= 0) return 0;
  if (r === 0) return principal / months;
  return principal * r * (Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1));
}

/** Year-wise amortisation schedule for a loan. */
export function amortisationSchedule(principal, annualRate, months) {
  const emi = calculateEMI(principal, annualRate, months);
  const r = annualRate / 1200;
  let balance = principal;
  const rows = [];
  let yearPrincipal = 0;
  let yearInterest = 0;
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const princ = Math.min(emi - interest, balance);
    balance -= princ;
    yearPrincipal += princ;
    yearInterest += interest;
    if (m % 12 === 0 || m === months) {
      rows.push({
        year: Math.ceil(m / 12),
        principal: yearPrincipal,
        interest: yearInterest,
        balance: Math.max(0, balance),
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/* GST                                                                 */
/* ------------------------------------------------------------------ */

/** GST. excluding=true means the amount is before GST. */
export function gstCalc(amount, ratePct, excluding) {
  if (excluding) {
    const gst = (amount * ratePct) / 100;
    return { totalGST: gst, amount: amount + gst };
  }
  const gst = amount - (100 / (100 + ratePct)) * amount;
  return { totalGST: gst, amount: amount - gst };
}

/* ------------------------------------------------------------------ */
/* XIRR                                                                */
/* ------------------------------------------------------------------ */

export const XIRR_FREQUENCIES = ['14 Days', 'Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
const FREQUENCY_DAYS = { '14 Days': 14, Monthly: 30, Quarterly: 90, 'Half Yearly': 182, Yearly: 365 };

export function nextDate(date, frequency) {
  const d = new Date(date);
  switch (frequency) {
    case '14 Days':
      d.setDate(d.getDate() + 14);
      break;
    case 'Monthly':
      d.setMonth(d.getMonth() + 1);
      break;
    case 'Quarterly':
      d.setMonth(d.getMonth() + 3);
      break;
    case 'Half Yearly':
      d.setMonth(d.getMonth() + 6);
      break;
    default:
      d.setFullYear(d.getFullYear() + 1);
  }
  return d;
}

/** Builds the cash flows for a recurring investment ending with one maturity amount. */
export function buildXirrCashFlows(startDate, maturityDate, amount, maturityAmount, frequency) {
  const flows = [];
  let d = new Date(startDate);
  const end = new Date(maturityDate);
  let guard = 0;
  while (d < end && guard < 5000) {
    flows.push({ date: new Date(d), amount: -Math.abs(amount) });
    d = nextDate(d, frequency);
    guard += 1;
  }
  flows.push({ date: new Date(end), amount: Math.abs(maturityAmount) });
  return flows;
}

/**
 * XIRR (same method as spreadsheet XIRR): Newton-Raphson with bisection guard.
 * values: array of amounts, dates: array of Date. Returns rate as a fraction or null.
 */
export function xirr(values, dates, guess = 0.1, maxIterations = 100, tolerance = 1e-6) {
  let low = -0.99;
  let high = 10;
  let rate = guess;
  const base = new Date(dates[0]);
  const yearsFrom = (i) => (dates[i].getTime() - base.getTime()) / 31536e6;
  const npv = (r) => values.reduce((sum, v, i) => sum + v / Math.pow(1 + r, yearsFrom(i)), 0);
  const dnpv = (r) =>
    values.reduce((sum, v, i) => {
      const t = yearsFrom(i);
      return sum + (-t * v) / Math.pow(1 + r, t + 1);
    }, 0);

  for (let i = 0; i < maxIterations; i++) {
    const f = npv(rate);
    const df = dnpv(rate);
    if (Math.abs(f) < tolerance) return rate;
    if (df === 0) {
      rate = (low + high) / 2;
    } else {
      const next = rate - f / df;
      rate = next <= low || next >= high ? (low + high) / 2 : next;
    }
    if (npv(rate) > 0) low = rate;
    else high = rate;
  }
  return null;
}

/** XIRR from a list of {date, amount}. Returns percentage or null. */
export function xirrFromFlows(flows) {
  const clean = flows.filter((f) => Number.isFinite(f.amount) && f.amount !== 0 && !Number.isNaN(new Date(f.date).getTime()));
  if (clean.length < 2) return null;
  if (!clean.some((f) => f.amount < 0) || !clean.some((f) => f.amount > 0)) return null;
  const r = xirr(
    clean.map((f) => f.amount),
    clean.map((f) => new Date(f.date)),
  );
  return r == null ? null : r * 100;
}

/** Year-wise wealth projection for the XIRR chart. */
export function xirrProjection(amount, xirrPct, startDate, maturityDate, frequency) {
  const days = FREQUENCY_DAYS[frequency] || 365;
  const periodRate = Math.pow(1 + xirrPct / 100, 1 / (365 / days)) - 1;
  const rows = [];
  let value = 0;
  let invested = 0;
  let d = new Date(startDate);
  const end = new Date(maturityDate);
  let guard = 0;
  while (d <= end && guard < 5000) {
    invested += amount;
    value = (value + amount) * (1 + periodRate);
    rows.push({ date: new Date(d), invested, value });
    d = nextDate(d, frequency);
    guard += 1;
  }
  // Keep one point per year (first entry of each calendar year)
  const byYear = [];
  const seen = new Set();
  for (const row of rows) {
    const y = row.date.getFullYear();
    if (!seen.has(y)) {
      seen.add(y);
      byYear.push({ year: y, invested: row.invested, value: Math.round(row.value) });
    }
  }
  return byYear;
}

/** CAGR in percent. */
export function cagr(initial, final, years) {
  if (initial <= 0 || years <= 0) return 0;
  return (Math.pow(final / initial, 1 / years) - 1) * 100;
}
