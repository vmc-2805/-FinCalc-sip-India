// Calculator registry + SEO content.
// This file must stay plain JavaScript (no JSX) because the build script imports it in Node.

const sip = {
  slug: 'sip-calculator',
  icon: 'sip',
  name: 'SIP Calculator',
  shortName: 'SIP',
  tagline: 'Calculate returns on monthly SIP investments',
  category: 'popular',
  component: 'sip',
  props: { defaultMode: 'sip' },
  seo: {
    title: 'SIP Calculator - Calculate Mutual Fund SIP Returns Online',
    description:
      'Free SIP calculator to estimate the maturity value of your monthly SIP investment in mutual funds. Check invested amount, expected returns and total value instantly.',
    keywords: [
      'SIP calculator',
      'SIP calculator online',
      'mutual fund SIP calculator',
      'SIP return calculator',
      'monthly SIP calculator',
      'SIP investment calculator India',
      'systematic investment plan calculator',
      'SIP maturity calculator',
    ],
  },
  h1: 'SIP Calculator',
  intro:
    'A SIP calculator helps you find out how much wealth you can create by investing a fixed amount every month in mutual funds. Enter your monthly investment, expected return rate and time period to see the estimated maturity value in seconds.',
  sections: [
    {
      heading: 'What is a SIP?',
      paras: [
        'SIP stands for Systematic Investment Plan. It is a simple way to invest in mutual funds where you invest a fixed amount at regular intervals, usually every month. Instead of investing a big amount at one time, you invest small amounts step by step.',
        'SIP is very popular among Indian investors because you can start with as little as ₹500 per month. The money is automatically debited from your bank account on a fixed date, so you build the habit of saving without extra effort.',
      ],
    },
    {
      heading: 'How does the SIP calculator work?',
      paras: [
        'The SIP calculator uses the future value formula of an annuity. It assumes that you invest at the start of every month and that returns are compounded monthly.',
      ],
      formula: 'M = P × [ ( (1 + i)^n − 1 ) / i ] × (1 + i)',
      list: [
        'M = Maturity amount you receive at the end',
        'P = Amount you invest every month',
        'i = Monthly rate of return, worked out from the yearly rate as (1 + yearly rate)^(1/12) − 1',
        'n = Total number of monthly installments (years × 12)',
      ],
      paras2: [
        'Example: If you invest ₹25,000 every month for 10 years at an expected return of 12% per year, your total investment will be ₹30,00,000 and the estimated value at maturity will be around ₹56,00,000. The estimated return is about ₹26,00,000.',
      ],
    },
    {
      heading: 'How to use this SIP calculator',
      list: [
        'Enter the amount you plan to invest every month, or move the slider.',
        'Enter the expected yearly return rate. Equity mutual funds have historically given 10% to 14% per year over the long term.',
        'Select the number of years you want to stay invested.',
        'The calculator instantly shows the invested amount, estimated returns and total maturity value along with a chart.',
      ],
    },
    {
      heading: 'Benefits of using a SIP calculator',
      list: [
        'Helps you plan your financial goals like buying a house, child education or retirement.',
        'Shows how the power of compounding grows your money over time.',
        'Lets you compare different monthly amounts and time periods before investing.',
        'Saves time and avoids manual calculation mistakes.',
      ],
    },
    {
      heading: 'Advantages of SIP investment',
      list: [
        'Rupee cost averaging: You buy more units when the market is low and fewer units when it is high, so your average cost comes down.',
        'Disciplined investing: Fixed monthly investment builds a strong saving habit.',
        'Small start: You can begin with just ₹500 per month and increase later.',
        'Flexibility: You can pause, stop or increase your SIP anytime without penalty in most funds.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the minimum amount to start a SIP?',
      a: 'Most mutual funds in India allow you to start a SIP with ₹500 per month. Some funds even allow ₹100 per month.',
    },
    {
      q: 'Are SIP returns guaranteed?',
      a: 'No. SIP is a method of investing in mutual funds, and mutual fund returns depend on the market. The calculator only gives an estimate based on the return rate you enter.',
    },
    {
      q: 'What return rate should I use in the SIP calculator?',
      a: 'For equity funds, 10% to 12% per year is a reasonable long-term assumption. For debt funds, 6% to 8% is more realistic. Always be conservative in your estimate.',
    },
    {
      q: 'Can I change my SIP amount later?',
      a: 'Yes. You can increase your SIP through a step-up SIP or start a new SIP in the same fund. You can also reduce or stop the SIP at any time.',
    },
    {
      q: 'Is SIP better than lumpsum investment?',
      a: 'SIP is better when you have regular monthly income and want to reduce the risk of market timing. Lumpsum works well when you already have a large amount and a long time horizon. Many investors use both.',
    },
    {
      q: 'Does the SIP calculator consider expense ratio or exit load?',
      a: 'No. The calculator shows an estimate before fund charges and taxes. Actual returns may be slightly lower after deducting expense ratio, exit load and capital gains tax.',
    },
  ],
  related: ['lumpsum-calculator', 'mutual-fund-returns-calculator', 'swp-calculator', 'elss-calculator'],
};

const lumpsum = {
  slug: 'lumpsum-calculator',
  icon: 'lumpsum',
  name: 'Lumpsum Calculator',
  shortName: 'Lumpsum',
  tagline: 'Estimate returns on one-time mutual fund investment',
  category: 'popular',
  component: 'sip',
  props: { defaultMode: 'lumpsum' },
  seo: {
    title: 'Lumpsum Calculator - Calculate One-Time Investment Returns',
    description:
      'Use our free lumpsum calculator to find the future value of a one-time mutual fund investment. Enter amount, expected return and years to see maturity value instantly.',
    keywords: [
      'lumpsum calculator',
      'lumpsum investment calculator',
      'mutual fund lumpsum calculator',
      'one time investment calculator',
      'lumpsum return calculator',
      'lump sum calculator India',
      'compound interest investment calculator',
    ],
  },
  h1: 'Lumpsum Calculator',
  intro:
    'A lumpsum calculator shows how much a one-time investment will grow over a period of time at a given rate of return. It is useful when you receive a bonus, gift or maturity money and want to invest it in one go.',
  sections: [
    {
      heading: 'What is a lumpsum investment?',
      paras: [
        'A lumpsum investment means investing a large amount of money in a mutual fund or any other asset at one time, instead of spreading it over months. For example, investing ₹5,00,000 in an equity fund today is a lumpsum investment.',
        'Lumpsum investing works best when you have a long time horizon of 5 years or more, because the full amount starts compounding from day one.',
      ],
    },
    {
      heading: 'Lumpsum calculator formula',
      paras: ['The calculator uses the standard compound interest formula:'],
      formula: 'A = P × (1 + r)^n',
      list: [
        'A = Maturity amount',
        'P = Amount invested today',
        'r = Expected yearly rate of return (in decimal)',
        'n = Number of years',
      ],
      paras2: [
        'Example: ₹25,000 invested for 10 years at 12% per year grows to about ₹77,646. Your estimated gain is ₹52,646.',
      ],
    },
    {
      heading: 'How to use the lumpsum calculator',
      list: [
        'Enter the total amount you want to invest once.',
        'Enter the expected yearly return rate.',
        'Select the investment period in years.',
        'Read the invested amount, estimated returns and total value on the right side.',
      ],
    },
    {
      heading: 'Lumpsum vs SIP: which is better?',
      paras: [
        'There is no single right answer. Lumpsum gives higher returns when the market goes up after you invest. SIP protects you from investing everything at a market high. If you are not sure about the market, you can invest the lumpsum amount in a liquid fund and use a Systematic Transfer Plan (STP) to move it into an equity fund in parts.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the minimum lumpsum investment in mutual funds?',
      a: 'Most funds accept a minimum lumpsum investment of ₹1,000 to ₹5,000. Some funds allow as low as ₹100.',
    },
    {
      q: 'Is lumpsum investment risky?',
      a: 'The full amount is exposed to market movement from the first day. If the market falls right after you invest, your value can go down in the short term. Over long periods, the risk reduces.',
    },
    {
      q: 'How is lumpsum return calculated?',
      a: 'The return is calculated with compound interest: invested amount × (1 + rate)^years. This calculator does this automatically.',
    },
    {
      q: 'Can I add more money later to a lumpsum investment?',
      a: 'Yes. You can make additional purchases in the same fund at any time, or start a SIP along with your lumpsum investment.',
    },
    {
      q: 'Does the lumpsum calculator include tax?',
      a: 'No. The result is before tax. Equity funds attract long term capital gains tax on gains above ₹1.25 lakh per year when held for more than one year.',
    },
  ],
  related: ['sip-calculator', 'fd-calculator', 'mutual-fund-returns-calculator', 'xirr-calculator'],
};

const swp = {
  slug: 'swp-calculator',
  icon: 'swp',
  name: 'SWP Calculator',
  shortName: 'SWP',
  tagline: 'Plan monthly withdrawals from your mutual fund corpus',
  category: 'popular',
  component: 'swp',
  seo: {
    title: 'SWP Calculator - Systematic Withdrawal Plan Calculator Online',
    description:
      'Free SWP calculator to plan monthly withdrawals from mutual funds. See total withdrawal, final value and how long your corpus will last with a systematic withdrawal plan.',
    keywords: [
      'SWP calculator',
      'systematic withdrawal plan calculator',
      'SWP mutual fund calculator',
      'monthly withdrawal calculator',
      'SWP calculator India',
      'retirement income calculator',
      'mutual fund SWP calculator',
    ],
  },
  h1: 'SWP Calculator',
  intro:
    'A SWP calculator helps you plan a regular monthly income from your mutual fund investment. Enter your total investment, monthly withdrawal amount, expected return and time period to see how much you withdraw and what remains at the end.',
  sections: [
    {
      heading: 'What is SWP (Systematic Withdrawal Plan)?',
      paras: [
        'SWP is the opposite of SIP. In SIP you invest a fixed amount every month; in SWP you withdraw a fixed amount every month from your existing mutual fund investment. The remaining money stays invested and keeps earning returns.',
        'SWP is popular with retired people and anyone who wants a regular cash flow from their savings. It is also more tax efficient than a fixed deposit because only the gain portion of each withdrawal is taxed.',
      ],
    },
    {
      heading: 'How does the SWP calculator work?',
      paras: [
        'The calculator grows your investment at the expected rate and deducts a fixed withdrawal at the end of every month. The monthly rate is worked out from the yearly rate so that compounding stays consistent.',
      ],
      formula: 'Final value = P × (1 + R)^n − W × [ ((1 + i)^(12n) − 1) / i ]\ni = (1 + R)^(1/12) − 1',
      list: [
        'P = Total investment (the corpus you start with)',
        'W = Withdrawal per month',
        'R = Expected yearly return rate',
        'n = Time period in years',
        'Total withdrawal = W × 12 × n',
      ],
      paras2: [
        'Example: With ₹5,00,000 invested, withdrawing ₹10,000 per month for 5 years at 8% return, you withdraw ₹6,00,000 in total and about ₹5,218 remains at the end. If the final value is negative, the corpus finishes before the time period ends.',
      ],
    },
    {
      heading: 'Benefits of SWP',
      list: [
        'Regular monthly income without redeeming the full investment.',
        'Remaining money continues to grow with market returns.',
        'Better tax treatment compared to bank FD interest, especially for equity funds held over one year.',
        'You can change or stop the withdrawal amount at any time.',
      ],
    },
    {
      heading: 'Tips for a safe SWP',
      list: [
        'Keep the withdrawal rate below the expected return so the corpus does not finish early.',
        'Use hybrid or balanced funds for lower volatility.',
        'Review the plan every year and adjust for inflation.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is SWP good for retirement income?',
      a: 'Yes. SWP gives a fixed monthly cash flow while the rest of the corpus stays invested. It is one of the most common retirement income strategies in India.',
    },
    {
      q: 'How is SWP taxed?',
      a: 'Each withdrawal is treated as a redemption. Only the capital gain part of the withdrawal is taxed, not the full amount, which makes SWP tax efficient.',
    },
    {
      q: 'What happens if my corpus finishes before the time period?',
      a: 'The final value becomes negative, which means the withdrawals are more than what the corpus can support. Reduce the withdrawal amount, increase the corpus or expect a higher return to fix this.',
    },
    {
      q: 'Can I start SWP immediately after investing?',
      a: 'You can, but it is better to wait at least one year for equity funds to avoid exit load and short term capital gains tax.',
    },
  ],
  related: ['sip-calculator', 'lumpsum-calculator', 'fd-calculator', 'mutual-fund-returns-calculator'],
};

const mfReturns = {
  slug: 'mutual-fund-returns-calculator',
  icon: 'mf',
  name: 'Mutual Fund Returns Calculator',
  shortName: 'Mutual Fund Returns',
  tagline: 'Estimate SIP or one-time mutual fund returns',
  category: 'popular',
  component: 'sip',
  props: { defaultMode: 'lumpsum', showTabs: false, maxRate: 50 },
  seo: {
    title: 'Mutual Fund Returns Calculator - Calculate MF Returns Online',
    description:
      'Calculate mutual fund returns for SIP and lumpsum investments with our free online mutual fund calculator. Check estimated returns, total value and growth chart instantly.',
    keywords: [
      'mutual fund calculator',
      'mutual fund returns calculator',
      'mutual fund return calculator online',
      'MF calculator',
      'mutual fund investment calculator',
      'mutual fund growth calculator India',
      'mutual fund maturity calculator',
    ],
  },
  h1: 'Mutual Fund Returns Calculator',
  intro:
    'The mutual fund returns calculator estimates the future value of your mutual fund investment, whether you invest once (lumpsum) or every month (SIP). Simply enter the amount, expected return rate and time period.',
  sections: [
    {
      heading: 'What is a mutual fund?',
      paras: [
        'A mutual fund collects money from many investors and invests it in shares, bonds, gold or other assets. A professional fund manager takes the investment decisions. In return, the fund charges a small yearly fee called the expense ratio.',
        'Mutual funds are regulated by SEBI (Securities and Exchange Board of India). They are suitable for both small and large investors because you can start with ₹500 and get exposure to a diversified portfolio.',
      ],
    },
    {
      heading: 'Types of mutual fund returns',
      list: [
        'Absolute return: total gain in percentage without considering time. Useful for periods under one year.',
        'CAGR (Compound Annual Growth Rate): yearly growth rate for a lumpsum investment. This calculator uses CAGR for the one-time option.',
        'XIRR: yearly return when money goes in or out on different dates, such as in a SIP. Use our XIRR calculator for this.',
      ],
    },
    {
      heading: 'How to use the mutual fund calculator',
      list: [
        'Enter the total amount you are investing. For monthly investments use our SIP calculator.',
        'Enter the expected return rate. Look at the fund’s 5 year or 10 year past performance for a rough idea, but remember past returns do not guarantee future returns.',
        'Select the time period and see the estimated value.',
      ],
    },
    {
      heading: 'Things that affect mutual fund returns',
      list: [
        'Type of fund: equity funds carry higher risk and higher return potential than debt funds.',
        'Expense ratio: lower expenses mean more money stays invested for you.',
        'Time period: longer investment gives compounding more time to work.',
        'Market conditions and fund manager decisions.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is a good return from mutual funds?',
      a: 'Over 10 years or more, good equity funds in India have given around 12% to 15% per year. Debt funds usually give 6% to 8%. Returns vary every year.',
    },
    {
      q: 'Is this calculator for SIP or lumpsum?',
      a: 'This calculator is for a one-time (lumpsum) investment. For monthly investments, use the SIP calculator, which uses the monthly compounding formula.',
    },
    {
      q: 'Are mutual fund returns taxable?',
      a: 'Yes. Equity funds held for more than one year attract 12.5% long term capital gains tax on gains above ₹1.25 lakh per year. Short term gains are taxed at 20%. Debt fund gains are added to your income and taxed at slab rate.',
    },
    {
      q: 'Which is better, direct or regular plan?',
      a: 'Direct plans have a lower expense ratio because no distributor commission is paid, so returns are slightly higher. Regular plans are useful if you want help from a distributor.',
    },
  ],
  related: ['sip-calculator', 'lumpsum-calculator', 'xirr-calculator', 'elss-calculator'],
};

const ssy = {
  slug: 'sukanya-samriddhi-yojana-calculator',
  icon: 'ssy',
  name: 'Sukanya Samriddhi Yojana Calculator',
  shortName: 'Sukanya Samriddhi',
  tagline: 'Calculate maturity value of SSY account for your daughter',
  category: 'popular',
  component: 'ssy',
  seo: {
    title: 'Sukanya Samriddhi Yojana Calculator - SSY Maturity Calculator',
    description:
      'Free Sukanya Samriddhi Yojana (SSY) calculator. Enter yearly deposit and girl child age to calculate total interest, maturity year and maturity amount at 8.2% interest rate.',
    keywords: [
      'Sukanya Samriddhi Yojana calculator',
      'SSY calculator',
      'Sukanya Samriddhi calculator',
      'SSY maturity calculator',
      'Sukanya Samriddhi Yojana interest rate',
      'girl child savings scheme calculator',
      'SSY account calculator post office',
    ],
  },
  h1: 'Sukanya Samriddhi Yojana Calculator',
  intro:
    'The Sukanya Samriddhi Yojana calculator helps parents estimate the maturity amount of an SSY account opened for their daughter. Enter the yearly investment, girl’s age and start year to see total interest and the maturity year.',
  sections: [
    {
      heading: 'What is Sukanya Samriddhi Yojana?',
      paras: [
        'Sukanya Samriddhi Yojana (SSY) is a Government of India savings scheme launched under the Beti Bachao Beti Padhao campaign. It is meant for the education and marriage expenses of a girl child. The account can be opened at any post office or authorised bank.',
        'SSY offers one of the highest interest rates among small savings schemes, currently 8.2% per year, and the interest is completely tax free. Investment up to ₹1.5 lakh per year also qualifies for deduction under Section 80C.',
      ],
    },
    {
      heading: 'Key rules of the SSY account',
      list: [
        'Account can be opened for a girl child below 10 years of age by her parent or legal guardian.',
        'Maximum two accounts per family (three in case of twins or triplets).',
        'Minimum deposit ₹250 per year, maximum ₹1,50,000 per year.',
        'Deposits are required for 15 years from the date of opening.',
        'The account matures 21 years after opening, or on the girl’s marriage after she turns 18.',
        'Partial withdrawal of up to 50% is allowed for higher education after the girl turns 18.',
      ],
    },
    {
      heading: 'How is SSY maturity calculated?',
      paras: [
        'The calculator uses the compound interest formula at the current SSY rate of 8.2%. Your yearly deposit is treated as two half-yearly deposits that compound for 15 years, and the balance then keeps growing for 6 more years until the account matures at 21 years.',
      ],
      formula: 'A = P × (1 + r/n)^(n × t)',
      list: [
        'A = Maturity amount',
        'P = Deposit amount',
        'r = Rate of interest (8.2%)',
        'n = Number of times interest compounds in a year',
        't = Number of years',
      ],
      paras2: [
        'Example: Depositing ₹10,000 every year for 15 years at 8.2% gives a total investment of ₹1,50,000, total interest of about ₹3,11,838 and a maturity value of about ₹4,61,838 after 21 years. With the maximum ₹1,50,000 per year, the maturity value is about ₹69,27,578.',
      ],
    },
    {
      heading: 'Tax benefits of SSY',
      list: [
        'Deposit: deduction up to ₹1.5 lakh under Section 80C (old tax regime).',
        'Interest: fully tax free.',
        'Maturity amount: fully tax free.',
      ],
      paras: ['This EEE (Exempt-Exempt-Exempt) status makes SSY one of the best long term schemes for a girl child.'],
    },
  ],
  faqs: [
    {
      q: 'What is the current SSY interest rate?',
      a: 'The current Sukanya Samriddhi Yojana interest rate is 8.2% per year. The Government reviews the rate every quarter.',
    },
    {
      q: 'Can I open an SSY account online?',
      a: 'You need to visit a post office or an authorised bank branch with the girl’s birth certificate and your KYC documents. After opening, many banks allow online deposits.',
    },
    {
      q: 'What happens if I miss a yearly deposit?',
      a: 'The account becomes inactive. You can revive it by paying the minimum ₹250 for each missed year along with a penalty of ₹50 per year.',
    },
    {
      q: 'When can the money be withdrawn?',
      a: 'Full withdrawal is allowed at maturity (21 years from opening). Up to 50% can be withdrawn for higher education once the girl turns 18 or passes 10th standard.',
    },
    {
      q: 'Is SSY better than PPF?',
      a: 'SSY offers a higher interest rate than PPF and the same tax benefits, but it is only for a girl child and has a longer lock-in. PPF is open to everyone.',
    },
  ],
  related: ['ppf-calculator', 'fd-calculator', 'rd-calculator', 'sip-calculator'],
};

const incomeTax = {
  slug: 'income-tax-calculator',
  icon: 'tax',
  name: 'Income Tax Calculator',
  shortName: 'Income Tax',
  tagline: 'Compare tax under new and old regime',
  category: 'popular',
  component: 'incomeTax',
  seo: {
    title: 'Income Tax Calculator FY 2025-26 - New vs Old Regime Online',
    description:
      'Free income tax calculator for FY 2025-26 (AY 2026-27). Compare tax under the new and old tax regime, check slab-wise tax, rebate under 87A, cess and take-home income.',
    keywords: [
      'income tax calculator',
      'income tax calculator FY 2025-26',
      'income tax calculator AY 2026-27',
      'new tax regime calculator',
      'old vs new tax regime calculator',
      'tax calculator India',
      'salary tax calculator',
      'income tax slab calculator',
    ],
  },
  h1: 'Income Tax Calculator',
  intro:
    'Use this income tax calculator to estimate your tax under both the old and the new tax regime for AY 2024-25, 2025-26 and 2026-27. Enter your income, deductions and HRA details, click Calculate, and compare the total tax under both regimes in one go.',
  sections: [
    {
      heading: 'Income tax slabs under the new regime (FY 2025-26 onwards)',
      table: {
        head: ['Taxable income', 'Tax rate'],
        rows: [
          ['Up to ₹4,00,000', 'Nil'],
          ['₹4,00,001 to ₹8,00,000', '5%'],
          ['₹8,00,001 to ₹12,00,000', '10%'],
          ['₹12,00,001 to ₹16,00,000', '15%'],
          ['₹16,00,001 to ₹20,00,000', '20%'],
          ['₹20,00,001 to ₹24,00,000', '25%'],
          ['Above ₹24,00,000', '30%'],
        ],
      },
      paras: [
        'Under the new regime, salaried people get a standard deduction of ₹75,000. A rebate under Section 87A makes tax zero if your taxable income is up to ₹12 lakh. This means a salaried person with income up to ₹12.75 lakh pays no tax.',
      ],
    },
    {
      heading: 'Income tax slabs under the old regime',
      table: {
        head: ['Taxable income', 'Below 60 years', '60 to 80 years', 'Above 80 years'],
        rows: [
          ['Up to ₹2,50,000', 'Nil', 'Nil', 'Nil'],
          ['₹2,50,001 to ₹3,00,000', '5%', 'Nil', 'Nil'],
          ['₹3,00,001 to ₹5,00,000', '5%', '5%', 'Nil'],
          ['₹5,00,001 to ₹10,00,000', '20%', '20%', '20%'],
          ['Above ₹10,00,000', '30%', '30%', '30%'],
        ],
      },
      paras: [
        'The old regime allows deductions such as Section 80C (₹1.5 lakh), 80D (health insurance), HRA, home loan interest and a standard deduction of ₹50,000. Rebate under 87A is available if taxable income is up to ₹5 lakh.',
      ],
    },
    {
      heading: 'How to use the income tax calculator',
      list: [
        'Select the assessment year and your age category.',
        'Income: enter your gross salary, income from other sources, interest income, rental income and home loan interest paid.',
        'Deductions: enter your investments under 80C, NPS under 80CCD(1B), medical insurance under 80D, donations under 80G, education loan interest under 80E and savings interest under 80TTA/TTB. These apply only in the old regime.',
        'HRA exemption: enter your basic salary, DA, HRA received, rent paid and whether you live in a metro city.',
        'Click Calculate to see the total tax under the old regime and the new regime, including cess and surcharge. The calculator also tells you how much more you can save by using the full 80C limit.',
      ],
    },
    {
      heading: 'New regime vs old regime: which should you choose?',
      paras: [
        'The new regime has lower tax rates but very few deductions. The old regime has higher rates but lets you claim many deductions. As a simple rule, if your total deductions (80C, 80D, HRA, home loan interest etc.) are more than about ₹3.75 lakh to ₹4 lakh, the old regime may be better. Otherwise the new regime usually gives lower tax. Use the calculator to compare both with your actual numbers.',
      ],
    },
    {
      heading: 'Important notes',
      list: [
        'Standard deduction: ₹75,000 in the new regime and ₹50,000 in the old regime (₹50,000 in both for AY 2024-25).',
        'Rebate under 87A: tax is nil if taxable income is up to ₹12 lakh in the new regime for AY 2026-27 (₹7 lakh for earlier years) and up to ₹5 lakh in the old regime. Marginal relief applies just above the limit in the new regime.',
        'Surcharge of 10% applies on tax when taxable income exceeds ₹50 lakh and 15% above ₹1 crore, with marginal relief. Health and education cess of 4% applies on the total.',
        'For let-out property, 30% standard deduction on rent and the full home loan interest are allowed in the old regime. Home loan interest on a self-occupied house is limited to ₹2 lakh.',
        'The calculator supports taxable income up to ₹2 crore. This is an estimate for individual taxpayers. Please verify with the latest Finance Act or a tax professional before filing.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is income up to ₹12 lakh tax free?',
      a: 'Yes, under the new regime for FY 2025-26 onwards, the rebate under Section 87A makes tax zero if taxable income is up to ₹12 lakh. With the ₹75,000 standard deduction, salaried people with income up to ₹12.75 lakh pay no tax.',
    },
    {
      q: 'What is the standard deduction in the new regime?',
      a: 'The standard deduction for salaried individuals and pensioners under the new regime is ₹75,000. Under the old regime it is ₹50,000.',
    },
    {
      q: 'Can I switch between old and new regime every year?',
      a: 'Salaried individuals without business income can choose the regime every year while filing the return. People with business income have limited options to switch.',
    },
    {
      q: 'Which deductions are allowed in the new regime?',
      a: 'Mainly the standard deduction of ₹75,000 and employer contribution to NPS under Section 80CCD(2). Popular deductions like 80C, 80D and HRA are not allowed.',
    },
    {
      q: 'Does the calculator include surcharge and cess?',
      a: 'Yes. Surcharge is added for taxable income above ₹50 lakh (10%) and ₹1 crore (15%) with marginal relief, and a 4% health and education cess is added on the total tax.',
    },
  ],
  related: ['epf-calculator', 'ppf-calculator', 'elss-calculator', 'gst-calculator'],
};

const ppf = {
  slug: 'ppf-calculator',
  icon: 'ppf',
  name: 'PPF Calculator',
  shortName: 'PPF',
  tagline: 'Calculate Public Provident Fund maturity amount',
  category: 'popular',
  component: 'ppf',
  seo: {
    title: 'PPF Calculator - Public Provident Fund Maturity Calculator',
    description:
      'Free PPF calculator to calculate the maturity amount and interest of your Public Provident Fund account. Enter yearly deposit, interest rate (7.1%) and tenure of 15 years or more.',
    keywords: [
      'PPF calculator',
      'PPF calculator online',
      'public provident fund calculator',
      'PPF interest calculator',
      'PPF maturity calculator',
      'PPF calculator 15 years',
      'PPF interest rate 7.1',
      'post office PPF calculator',
    ],
  },
  h1: 'PPF Calculator',
  intro:
    'The PPF calculator shows the maturity value and total interest you will earn on your Public Provident Fund account. Enter your yearly deposit, interest rate and investment period to plan your tax-free savings.',
  sections: [
    {
      heading: 'What is PPF (Public Provident Fund)?',
      paras: [
        'PPF is a long term savings scheme backed by the Government of India. It is one of the safest investments because the returns are guaranteed and completely tax free. Any Indian resident can open a PPF account at a post office or bank.',
        'The scheme has a lock-in period of 15 years. After that, you can extend it in blocks of 5 years, with or without further deposits.',
      ],
    },
    {
      heading: 'Key features of PPF',
      list: [
        'Interest rate: 7.1% per year (reviewed by the Government every quarter).',
        'Minimum deposit ₹500 and maximum ₹1,50,000 per financial year.',
        'Interest is compounded yearly and credited at the end of the financial year.',
        'Deposit qualifies for Section 80C deduction. Interest and maturity are tax free (EEE status).',
        'Loan facility from the 3rd year and partial withdrawal from the 7th year.',
      ],
    },
    {
      heading: 'PPF calculation formula',
      paras: [
        'The calculator assumes the deposit is made at the start of every year. Interest is added on the closing balance each year.',
      ],
      formula: 'Balance(year) = [ Balance(year − 1) + Deposit ] × (1 + r)',
      paras2: [
        'Example: ₹10,000 deposited every year for 15 years at 7.1% gives a total investment of ₹1,50,000 and a maturity value of about ₹2,71,000.',
      ],
    },
    {
      heading: 'Tip to earn maximum PPF interest',
      paras: [
        'PPF interest is calculated on the lowest balance between the 5th and the last day of every month. So deposit your money before the 5th of the month, ideally in April, to earn interest for the full year.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the current PPF interest rate?',
      a: 'The PPF interest rate is 7.1% per year, compounded yearly. The Government can revise it every quarter.',
    },
    {
      q: 'Can I withdraw PPF before 15 years?',
      a: 'Partial withdrawal is allowed from the 7th financial year. Premature closure is allowed after 5 years only for specific reasons like serious illness or higher education, with a 1% lower interest rate.',
    },
    {
      q: 'Is PPF interest taxable?',
      a: 'No. PPF interest and maturity amount are fully tax free. The yearly deposit also gives a deduction under Section 80C in the old tax regime.',
    },
    {
      q: 'Can I open more than one PPF account?',
      a: 'No. A person can have only one PPF account in their own name. You can open a separate account for a minor child as guardian.',
    },
    {
      q: 'What happens after 15 years?',
      a: 'You can withdraw the full amount, or extend the account in blocks of 5 years with or without new deposits. The balance keeps earning interest during extension.',
    },
  ],
  related: ['epf-calculator', 'sukanya-samriddhi-yojana-calculator', 'fd-calculator', 'elss-calculator'],
};

const epf = {
  slug: 'epf-calculator',
  icon: 'epf',
  name: 'EPF Calculator',
  shortName: 'EPF',
  tagline: 'Estimate your Employee Provident Fund corpus at retirement',
  category: 'popular',
  component: 'epf',
  seo: {
    title: 'EPF Calculator - Employee Provident Fund Maturity Calculator',
    description:
      'Free EPF calculator to estimate your provident fund balance at retirement. Enter basic salary, age, contribution rate, salary growth and EPF interest rate (8.25%) to see your corpus.',
    keywords: [
      'EPF calculator',
      'PF calculator',
      'employee provident fund calculator',
      'EPF maturity calculator',
      'EPF interest calculator',
      'provident fund calculator India',
      'EPF calculator retirement',
      'EPFO calculator',
    ],
  },
  h1: 'EPF Calculator',
  intro:
    'The EPF calculator estimates how much money you will have in your Employee Provident Fund account when you retire. Enter your basic salary, age, contribution percentage and expected salary growth to see your retirement corpus.',
  sections: [
    {
      heading: 'What is EPF (Employee Provident Fund)?',
      paras: [
        'EPF is a retirement savings scheme managed by the Employees’ Provident Fund Organisation (EPFO). Every month, you contribute 12% of your basic salary plus dearness allowance, and your employer also contributes an equal 12%. Out of the employer’s share, 8.33% goes to the Employee Pension Scheme (EPS) and 3.67% goes to your EPF account.',
        'The EPF balance earns interest declared by the Government every year. The current EPF interest rate is 8.25% per year.',
      ],
    },
    {
      heading: 'How does the EPF calculator work?',
      paras: [
        'The calculator adds your contribution and the employer’s EPF share every month till you turn 58. Interest is calculated monthly on the contributions and credited to the account every year, which is how EPFO does it. Your salary increases every year by the percentage you enter.',
      ],
      list: [
        'Monthly salary: your basic salary plus DA',
        'Your contribution: 12% by default (up to 20% through VPF)',
        'Employer contribution to EPF: 3.67% of salary, plus the pension (EPS) share above the ₹15,000 wage ceiling, which also goes to EPF',
        'Annual salary increase: expected yearly increment',
        'Rate of interest: 8.25% (current EPF rate)',
        'Retirement age: 58 years',
      ],
      paras2: [
        'Example: With a monthly salary of ₹50,000 at age 30, 12% contribution and 5% yearly increment, you will have about ₹2.59 crore in your EPF account at 58.',
      ],
    },
    {
      heading: 'EPF tax benefits',
      list: [
        'Your contribution qualifies for deduction under Section 80C (old regime).',
        'Interest is tax free if your contribution is up to ₹2.5 lakh per year.',
        'Withdrawal after 5 years of continuous service is fully tax free.',
      ],
    },
    {
      heading: 'When can EPF be withdrawn?',
      list: [
        'Full withdrawal at retirement (58 years) or after 2 months of unemployment.',
        'Partial withdrawal for house purchase, marriage, education or medical treatment after a minimum service period.',
        'When you change jobs, transfer the EPF account instead of withdrawing to keep the tax benefit and compounding.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the current EPF interest rate?',
      a: 'The EPF interest rate for FY 2024-25 is 8.25% per year. EPFO declares the rate every year.',
    },
    {
      q: 'How much does the employer contribute to EPF?',
      a: 'The employer contributes 12% of basic salary plus DA, but only 3.67% goes to EPF. The remaining 8.33% goes to the Employee Pension Scheme (EPS), subject to a wage ceiling of ₹15,000.',
    },
    {
      q: 'Can I contribute more than 12% to EPF?',
      a: 'Yes. You can contribute more through the Voluntary Provident Fund (VPF). It earns the same interest as EPF. The employer’s share stays at 12%.',
    },
    {
      q: 'Is EPF withdrawal taxable?',
      a: 'Withdrawal is tax free if you have completed 5 years of continuous service. Before 5 years, the amount is taxable and TDS may be deducted.',
    },
    {
      q: 'How do I check my EPF balance?',
      a: 'You can check your balance on the EPFO member portal, the UMANG app, by giving a missed call to 9966044425 or by sending an SMS from your registered mobile number.',
    },
  ],
  related: ['ppf-calculator', 'income-tax-calculator', 'sip-calculator', 'fd-calculator'],
};

const fd = {
  slug: 'fd-calculator',
  icon: 'fd',
  name: 'FD Calculator',
  shortName: 'FD',
  tagline: 'Calculate fixed deposit maturity amount and interest',
  category: 'popular',
  component: 'fd',
  seo: {
    title: 'FD Calculator - Fixed Deposit Interest & Maturity Calculator',
    description:
      'Free FD calculator to calculate the maturity amount and interest on your fixed deposit. Compare monthly, quarterly and yearly compounding for any bank FD interest rate and tenure.',
    keywords: [
      'FD calculator',
      'fixed deposit calculator',
      'FD interest calculator',
      'FD maturity calculator',
      'bank FD calculator',
      'fixed deposit interest rate calculator',
      'FD calculator monthly interest',
      'post office FD calculator',
    ],
  },
  h1: 'FD Calculator',
  intro:
    'An FD calculator helps you find the maturity amount and total interest on a fixed deposit. Enter the deposit amount, interest rate and tenure, choose the compounding frequency, and see your returns instantly.',
  sections: [
    {
      heading: 'What is a fixed deposit?',
      paras: [
        'A fixed deposit (FD) is a savings product offered by banks, post offices and NBFCs. You deposit a lumpsum amount for a fixed tenure and the bank pays you a fixed interest rate. The rate does not change during the tenure, so your return is guaranteed.',
        'FDs are among the safest investment options in India. Bank deposits up to ₹5 lakh per bank are insured by DICGC.',
      ],
    },
    {
      heading: 'FD interest calculation formula',
      paras: ['For compound interest FDs (most bank FDs are compounded quarterly):'],
      formula: 'A = P × (1 + r/n)^(n × t)',
      list: [
        'A = Maturity amount',
        'P = Principal deposit',
        'r = Yearly interest rate (decimal)',
        'n = Number of compounding periods per year (4 for quarterly)',
        't = Tenure in years',
      ],
      paras2: [
        'For simple interest FDs (tenure of 6 months or less, or deposits in days): A = P + (P × r × t).',
        'Example: ₹1,00,000 for 5 years at 6.5% compounded quarterly gives a maturity amount of ₹1,38,042. Total interest earned is ₹38,042. You can enter the time period in years, months or days.',
      ],
    },
    {
      heading: 'Types of fixed deposits',
      list: [
        'Cumulative FD: interest is added to the principal and paid at maturity. Best for growing your money.',
        'Non-cumulative FD: interest is paid monthly, quarterly or yearly. Best for regular income.',
        'Tax saving FD: 5 year lock-in with Section 80C deduction up to ₹1.5 lakh.',
        'Senior citizen FD: usually 0.25% to 0.50% extra interest.',
      ],
    },
    {
      heading: 'Tax on FD interest',
      paras: [
        'FD interest is added to your income and taxed as per your slab. Banks deduct TDS at 10% if the interest in a year is more than ₹50,000 (₹1 lakh for senior citizens). You can submit Form 15G/15H if your total income is below the taxable limit.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How is FD interest calculated by banks?',
      a: 'Most banks compound FD interest quarterly. The interest earned every quarter is added to the principal and the next quarter’s interest is calculated on the new amount.',
    },
    {
      q: 'What is the minimum tenure for an FD?',
      a: 'Bank FDs usually start from 7 days and go up to 10 years. Post office time deposits are for 1, 2, 3 or 5 years.',
    },
    {
      q: 'Can I break my FD before maturity?',
      a: 'Yes, but the bank may charge a penalty of 0.5% to 1% on the interest rate. Tax saving FDs cannot be broken before 5 years.',
    },
    {
      q: 'Is FD interest taxable?',
      a: 'Yes. FD interest is fully taxable as per your income tax slab. TDS is deducted if interest exceeds the yearly limit.',
    },
    {
      q: 'Which is better, FD or RD?',
      a: 'FD is for a one-time lumpsum deposit. RD is for saving a fixed amount every month. Both give similar interest rates.',
    },
  ],
  related: ['rd-calculator', 'ppf-calculator', 'lumpsum-calculator', 'swp-calculator'],
};

const rd = {
  slug: 'rd-calculator',
  icon: 'rd',
  name: 'RD Calculator',
  shortName: 'RD',
  tagline: 'Calculate recurring deposit maturity amount',
  category: 'popular',
  component: 'rd',
  seo: {
    title: 'RD Calculator - Recurring Deposit Interest & Maturity Calculator',
    description:
      'Free RD calculator to find the maturity amount and interest earned on your recurring deposit. Enter monthly deposit, interest rate and tenure to calculate RD returns with quarterly compounding.',
    keywords: [
      'RD calculator',
      'recurring deposit calculator',
      'RD interest calculator',
      'RD maturity calculator',
      'post office RD calculator',
      'bank RD calculator',
      'monthly deposit calculator',
      'recurring deposit interest rate calculator',
    ],
  },
  h1: 'RD Calculator',
  intro:
    'The RD calculator tells you how much your recurring deposit will be worth at maturity. Enter your monthly deposit, interest rate and tenure to see the total investment, interest earned and maturity value.',
  sections: [
    {
      heading: 'What is a recurring deposit?',
      paras: [
        'A recurring deposit (RD) is a savings scheme where you deposit a fixed amount every month for a fixed period. At the end of the tenure, you receive your total deposits plus interest. RDs are offered by all banks and post offices.',
        'RD is a good option for people with a regular monthly income who want guaranteed returns and want to build a saving habit. The interest rate is fixed for the full tenure.',
      ],
    },
    {
      heading: 'RD maturity formula',
      paras: [
        'Banks compound RD interest every quarter. Each monthly installment earns interest for the remaining period. The calculator applies this formula to every installment and adds them up:',
      ],
      formula: 'M = Σ  P × (1 + r/4)^(4 × n/12)',
      list: [
        'M = Maturity amount',
        'P = Monthly deposit',
        'r = Yearly interest rate (decimal)',
        'n = Number of months remaining for each installment',
      ],
      paras2: [
        'Example: ₹50,000 per month for 3 years at 6.5% gives a total investment of ₹18,00,000, interest of ₹1,91,214 and a maturity value of ₹19,91,214. You can enter the time period in years or in months (3, 6, 9 or 12).',
      ],
    },
    {
      heading: 'Features of a recurring deposit',
      list: [
        'Tenure from 6 months to 10 years.',
        'Minimum monthly deposit is usually ₹100 (₹10 at post office).',
        'Interest rate similar to bank FDs; senior citizens get extra interest.',
        'Loan or overdraft facility against RD balance.',
        'Penalty for missed installments and premature closure.',
      ],
    },
    {
      heading: 'RD vs SIP',
      paras: [
        'RD gives fixed and guaranteed returns, which are fully taxable. SIP in mutual funds gives market linked returns that can be higher over the long term and are more tax efficient. Use RD for short term goals within 1 to 3 years and SIP for long term goals.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How is RD interest calculated?',
      a: 'RD interest is compounded quarterly. Each monthly deposit earns interest for the months remaining till maturity. Our calculator does this calculation for every installment.',
    },
    {
      q: 'Is RD interest taxable?',
      a: 'Yes. RD interest is added to your income and taxed at your slab rate. TDS applies if the interest exceeds ₹50,000 in a year (₹1 lakh for senior citizens).',
    },
    {
      q: 'What happens if I miss an RD installment?',
      a: 'Banks charge a small penalty for every missed installment. If several installments are missed, the account may be closed.',
    },
    {
      q: 'Can I close an RD early?',
      a: 'Yes. Premature closure is allowed, usually with a lower interest rate of 0.5% to 1% as penalty.',
    },
  ],
  related: ['fd-calculator', 'sip-calculator', 'ppf-calculator', 'sukanya-samriddhi-yojana-calculator'],
};

const emi = {
  slug: 'emi-calculator',
  icon: 'emi',
  name: 'EMI Calculator',
  shortName: 'EMI',
  tagline: 'Calculate home, car and personal loan EMI',
  category: 'popular',
  component: 'emi',
  seo: {
    title: 'EMI Calculator - Home Loan, Car Loan & Personal Loan EMI',
    description:
      'Free EMI calculator for home loan, car loan and personal loan. Enter loan amount, interest rate and tenure to calculate monthly EMI, total interest and year-wise repayment schedule.',
    keywords: [
      'EMI calculator',
      'home loan EMI calculator',
      'car loan EMI calculator',
      'personal loan EMI calculator',
      'loan EMI calculator',
      'EMI calculator online',
      'loan interest calculator',
      'housing loan EMI calculator',
    ],
  },
  h1: 'EMI Calculator',
  intro:
    'The EMI calculator helps you find the monthly installment for any loan. Enter the loan amount, interest rate and tenure to see your EMI, total interest payable and a year-wise repayment schedule for home, car and personal loans.',
  sections: [
    {
      heading: 'What is EMI?',
      paras: [
        'EMI stands for Equated Monthly Installment. It is the fixed amount you pay to the bank every month to repay a loan. Each EMI has two parts: interest on the outstanding loan and repayment of the principal. In the early years, the interest part is bigger; as the loan reduces, the principal part increases.',
      ],
    },
    {
      heading: 'EMI calculation formula',
      formula: 'EMI = P × r × (1 + r)^n / [ (1 + r)^n − 1 ]',
      list: [
        'P = Loan amount (principal)',
        'r = Monthly interest rate (yearly rate ÷ 12 ÷ 100)',
        'n = Loan tenure in months',
      ],
      paras2: [
        'Example: A home loan of ₹25,00,000 at 8.5% for 20 years has an EMI of about ₹21,696. Over 20 years you pay around ₹27,07,000 as interest.',
      ],
    },
    {
      heading: 'How to use the EMI calculator',
      list: [
        'Select the loan type: home, car or personal loan.',
        'Enter the loan amount you need.',
        'Enter the interest rate offered by the bank.',
        'Choose the tenure in years.',
        'See your monthly EMI, total interest and total payment. Click on “Show year-wise schedule” to see how the loan reduces every year.',
      ],
    },
    {
      heading: 'Factors that affect your EMI',
      list: [
        'Loan amount: higher loan means higher EMI.',
        'Interest rate: even a 0.5% difference changes the total interest a lot on long loans.',
        'Tenure: longer tenure reduces EMI but increases total interest paid.',
        'Prepayment: paying extra amount reduces the principal and saves interest.',
      ],
    },
    {
      heading: 'Tips to reduce your loan burden',
      list: [
        'Compare interest rates from multiple banks before taking a loan.',
        'Keep EMI below 40% of your monthly income.',
        'Make part-prepayments whenever you get a bonus or extra money.',
        'Choose a shorter tenure if you can afford a higher EMI.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is a good EMI to income ratio?',
      a: 'Banks generally prefer that all your EMIs together do not exceed 40% to 50% of your monthly take-home income.',
    },
    {
      q: 'Does the EMI change if the interest rate changes?',
      a: 'For floating rate loans, banks usually keep the EMI same and change the tenure. You can ask the bank to change the EMI instead.',
    },
    {
      q: 'Is there a penalty for prepaying a loan?',
      a: 'There is no prepayment penalty on floating rate home loans for individuals. Fixed rate loans and personal loans may have a charge of 2% to 5%.',
    },
    {
      q: 'What is the difference between flat rate and reducing balance rate?',
      a: 'In reducing balance, interest is charged only on the outstanding loan and the EMI formula above applies. In flat rate, interest is charged on the full loan for the whole tenure, which is much costlier. Always compare using the reducing balance rate.',
    },
    {
      q: 'Can I get tax benefit on loan EMI?',
      a: 'For home loans under the old tax regime, principal repayment gets deduction under Section 80C (up to ₹1.5 lakh) and interest under Section 24(b) (up to ₹2 lakh for self-occupied house).',
    },
  ],
  related: ['income-tax-calculator', 'fd-calculator', 'sip-calculator', 'gst-calculator'],
};

const gst = {
  slug: 'gst-calculator',
  icon: 'gst',
  name: 'GST Calculator',
  shortName: 'GST',
  tagline: 'Add or remove GST from any amount',
  category: 'popular',
  component: 'gst',
  seo: {
    title: 'GST Calculator - Calculate GST Inclusive & Exclusive Amount',
    description:
      'Free online GST calculator for India. Calculate GST amount, net price and total price for 5%, 12%, 18% and 28% slabs. Works for both GST inclusive and GST exclusive prices.',
    keywords: [
      'GST calculator',
      'GST calculator online',
      'GST calculator India',
      'GST inclusive calculator',
      'GST exclusive calculator',
      'reverse GST calculator',
      'GST amount calculator',
      'CGST SGST calculator',
    ],
  },
  h1: 'GST Calculator',
  intro:
    'This GST calculator helps you quickly find the GST amount and final price of goods or services. Choose whether your amount is excluding or including GST, select the tax slab, and see the total GST and post-GST amount instantly.',
  sections: [
    {
      heading: 'What is GST?',
      paras: [
        'GST (Goods and Services Tax) is a single indirect tax applied on the supply of goods and services in India. It replaced many taxes like VAT, service tax and excise duty from 1 July 2017. GST is charged at every stage of the supply chain, and businesses can claim credit for the tax paid on their purchases.',
      ],
    },
    {
      heading: 'GST rates in India',
      table: {
        head: ['GST rate', 'Common items'],
        rows: [
          ['0%', 'Fresh fruits and vegetables, milk, bread, education, healthcare'],
          ['5%', 'Packaged food, footwear below ₹1,000, small restaurants, economy air travel'],
          ['12%', 'Processed food, mobile phones (some), business class air travel'],
          ['18%', 'Most services, electronics, financial services, restaurants in hotels'],
          ['28%', 'Luxury goods, cars, tobacco, aerated drinks'],
        ],
      },
    },
    {
      heading: 'GST calculation formula',
      paras: ['Excluding GST (the amount you enter is before tax):'],
      formula: 'Total GST = Amount × Rate / 100\nPost-GST amount = Amount + Total GST',
      paras2: ['Including GST (the amount you enter already has tax in it):'],
      formula2: 'Total GST = Amount − Amount × 100 / (100 + Rate)\nPost-GST amount = Amount − Total GST',
    },
    {
      heading: 'Types of GST',
      list: [
        'CGST: Central GST, collected by the Central Government on sales within a state.',
        'SGST: State GST, collected by the State Government on sales within a state.',
        'IGST: Integrated GST, collected by the Centre on sales between two states and on imports.',
        'For an 18% sale within a state, the buyer pays 9% CGST + 9% SGST. For a sale to another state, the buyer pays 18% IGST.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How do I calculate GST on ₹1,000 at 18%?',
      a: 'GST = 1,000 × 18 / 100 = ₹180. Total price = ₹1,180. If ₹1,000 already includes 18% GST, the net price is ₹847.46 and the GST is ₹152.54.',
    },
    {
      q: 'What is a reverse GST calculation?',
      a: 'Reverse GST calculation means finding the original price and GST amount from a price that already includes GST. Use the “Including GST” tab for this.',
    },
    {
      q: 'Who needs to register for GST?',
      a: 'Businesses with yearly turnover above ₹40 lakh for goods (₹20 lakh for services, and lower limits in special category states) must register for GST.',
    },
    {
      q: 'What is input tax credit?',
      a: 'Input tax credit (ITC) lets a registered business reduce the GST it pays on sales by the GST it already paid on purchases.',
    },
  ],
  related: ['income-tax-calculator', 'emi-calculator', 'fd-calculator', 'sip-calculator'],
};

const xirrCalc = {
  slug: 'xirr-calculator',
  icon: 'xirr',
  name: 'XIRR Calculator',
  shortName: 'XIRR',
  tagline: 'Find annualised return on investments made on different dates',
  category: 'popular',
  component: 'xirr',
  seo: {
    title: 'XIRR Calculator - Calculate Annualised Return on SIP & Investments',
    description:
      'Free XIRR calculator to find the annualised return of mutual fund SIPs or any investment with cash flows on different dates. Add your investment dates and amounts to get XIRR instantly.',
    keywords: [
      'XIRR calculator',
      'XIRR calculator online',
      'XIRR calculator mutual fund',
      'SIP XIRR calculator',
      'XIRR return calculator',
      'annualised return calculator',
      'XIRR vs CAGR',
      'extended internal rate of return calculator',
    ],
  },
  h1: 'XIRR Calculator',
  intro:
    'The XIRR calculator finds the true yearly return of a recurring investment like a SIP. Select the investment frequency, start date, maturity date, the amount invested each time and the total maturity amount to get your XIRR along with a wealth projection.',
  sections: [
    {
      heading: 'What is XIRR?',
      paras: [
        'XIRR stands for Extended Internal Rate of Return. It is the single yearly rate of return that makes the present value of all your cash flows (investments and redemptions) equal to zero. In simple words, XIRR tells you the actual yearly return you earned when money went in and came out at different times.',
        'XIRR is the correct way to measure SIP returns because every SIP installment stays invested for a different period. CAGR only works when there is one investment and one redemption.',
      ],
    },
    {
      heading: 'How to use the XIRR calculator',
      list: [
        'Select the investment frequency: 14 days, monthly, quarterly, half yearly or yearly.',
        'Enter the start date of the investment and the maturity (or redemption) date.',
        'Enter the recurring investment amount, that is the amount invested on every date.',
        'Enter the total maturity amount you received or the current value of the investment.',
        'The calculator builds the cash flows for you (each investment as an outflow and the maturity amount as an inflow) and shows your XIRR with a year-wise wealth projection chart.',
      ],
    },
    {
      heading: 'XIRR formula',
      paras: ['XIRR solves the following equation for the rate r:'],
      formula: 'Σ  CFᵢ / (1 + r)^(dᵢ / 365) = 0',
      list: [
        'CFᵢ = each cash flow (negative for investment, positive for withdrawal)',
        'dᵢ = number of days between the first cash flow and cash flow i',
        'r = XIRR (yearly return)',
      ],
      paras2: [
        'There is no direct formula to find r, so the calculator uses a numerical method (Newton-Raphson) to solve the equation, just like the XIRR function in Excel.',
        'Example: Investing ₹10,000 every year from 1 January 2021 to 1 January 2024 (three installments, ₹30,000 invested) and receiving ₹60,000 on the maturity date gives an XIRR of about 38.92%.',
      ],
    },
    {
      heading: 'XIRR vs CAGR vs absolute return',
      table: {
        head: ['Measure', 'Use when', 'Considers time?'],
        rows: [
          ['Absolute return', 'Period is less than one year', 'No'],
          ['CAGR', 'One investment, one redemption', 'Yes'],
          ['XIRR', 'Multiple investments or withdrawals on different dates (SIP, SWP)', 'Yes'],
        ],
      },
    },
  ],
  faqs: [
    {
      q: 'Why is XIRR used for SIP returns?',
      a: 'In a SIP, every installment is invested on a different date and stays invested for a different time. XIRR accounts for the exact date of each cash flow and gives a single yearly return.',
    },
    {
      q: 'What is a good XIRR for mutual funds?',
      a: 'For equity mutual funds, an XIRR of 12% or more over 5 years or longer is considered good. For debt funds, 6% to 8% is normal.',
    },
    {
      q: 'Can XIRR be negative?',
      a: 'Yes. If the total value received is less than the total invested, XIRR will be negative, showing a loss.',
    },
    {
      q: 'Is XIRR the same as Excel XIRR?',
      a: 'Yes. This calculator uses the same method as the XIRR function in Microsoft Excel and Google Sheets.',
    },
  ],
  related: ['sip-calculator', 'mutual-fund-returns-calculator', 'lumpsum-calculator', 'swp-calculator'],
};

const elss = {
  slug: 'elss-calculator',
  icon: 'elss',
  name: 'ELSS Calculator',
  shortName: 'ELSS',
  tagline: 'Calculate returns on tax saving mutual funds',
  category: 'mutual-fund',
  component: 'sip',
  props: {
    defaultMode: 'sip',
    minYears: 3,
    note: 'ELSS has a lock-in of 3 years. Investment up to ₹1.5 lakh per year qualifies for Section 80C deduction.',
  },
  seo: {
    title: 'ELSS Calculator - Tax Saving Mutual Fund Return Calculator',
    description:
      'Free ELSS calculator to estimate returns on tax saving mutual funds through SIP or lumpsum. Plan your Section 80C investment of up to ₹1.5 lakh with a 3 year lock-in.',
    keywords: [
      'ELSS calculator',
      'ELSS SIP calculator',
      'tax saving mutual fund calculator',
      'ELSS return calculator',
      'equity linked savings scheme calculator',
      '80C investment calculator',
      'ELSS lumpsum calculator',
    ],
  },
  h1: 'ELSS Calculator',
  intro:
    'The ELSS calculator estimates the returns from Equity Linked Savings Scheme mutual funds, the only mutual funds that give tax deduction under Section 80C. Enter your SIP or lumpsum amount, expected return and period (minimum 3 years).',
  sections: [
    {
      heading: 'What is ELSS?',
      paras: [
        'ELSS (Equity Linked Savings Scheme) is a type of equity mutual fund that invests at least 80% of its money in shares. Investment in ELSS up to ₹1.5 lakh per year is eligible for deduction under Section 80C of the Income Tax Act (old tax regime).',
        'ELSS has the shortest lock-in among all 80C options, just 3 years, compared to 5 years for tax saving FD and 15 years for PPF. Because it invests in equity, it also has the potential to give higher returns.',
      ],
    },
    {
      heading: 'ELSS vs other tax saving options',
      table: {
        head: ['Option', 'Lock-in', 'Expected return', 'Tax on return'],
        rows: [
          ['ELSS', '3 years', '10% to 14% (market linked)', 'LTCG 12.5% above ₹1.25 lakh'],
          ['PPF', '15 years', '7.1%', 'Tax free'],
          ['Tax saving FD', '5 years', '6% to 7.5%', 'Taxable as per slab'],
          ['NSC', '5 years', '7.7%', 'Taxable as per slab'],
          ['NPS', 'Till 60 years', '9% to 12% (market linked)', 'Partly taxable'],
        ],
      },
    },
    {
      heading: 'How to use the ELSS calculator',
      list: [
        'Choose SIP for monthly investment or Lumpsum for one-time investment.',
        'Enter the amount. To use the full 80C limit, ₹12,500 per month or ₹1,50,000 per year is enough.',
        'Enter the expected return and the number of years (minimum 3).',
        'Check the estimated returns and total value.',
      ],
    },
    {
      heading: 'Points to remember',
      list: [
        'Each SIP installment in ELSS has its own 3 year lock-in.',
        'ELSS deduction is available only in the old tax regime.',
        'Gains above ₹1.25 lakh in a year are taxed at 12.5% as long term capital gains.',
        'Stay invested for 5 to 7 years or more for better results, even after the lock-in ends.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the lock-in period of ELSS?',
      a: 'ELSS has a lock-in of 3 years from the date of each investment. For SIP, every installment is locked for 3 years from its own date.',
    },
    {
      q: 'How much tax can I save with ELSS?',
      a: 'You can claim up to ₹1.5 lakh under Section 80C. In the 30% tax bracket this saves about ₹46,800 including cess. This benefit is only in the old tax regime.',
    },
    {
      q: 'Can I invest more than ₹1.5 lakh in ELSS?',
      a: 'Yes, there is no upper limit on investment. But the tax deduction is limited to ₹1.5 lakh per year.',
    },
    {
      q: 'Is ELSS better than PPF?',
      a: 'ELSS has a shorter lock-in and higher return potential but carries market risk. PPF gives guaranteed tax free returns. Many investors keep both.',
    },
  ],
  related: ['sip-calculator', 'income-tax-calculator', 'ppf-calculator', 'mutual-fund-returns-calculator'],
};

/* ------------------------------------------------------------------ */
/* Bank / AMC specific SIP calculators                                 */
/* ------------------------------------------------------------------ */

function bankSip({ slug, bank, amc, short, extra = [], about, color = '#3d7cc9' }) {
  return {
    slug,
    icon: 'bank',
    iconColor: color,
    name: `${bank} SIP Calculator`,
    shortName: `${short} SIP`,
    tagline: `Estimate SIP returns with ${amc}`,
    category: 'mutual-fund',
    component: 'sip',
    props: { defaultMode: 'sip' },
    seo: {
      title: `${bank} SIP Calculator - Calculate ${amc} SIP Returns`,
      description: `Free ${bank} SIP calculator to estimate the maturity value of your monthly SIP in ${amc} schemes. Enter amount, expected return and tenure to see invested amount and returns.`,
      keywords: [
        `${bank} SIP calculator`,
        `${amc} SIP calculator`,
        `${short} SIP calculator online`,
        `${short} mutual fund SIP calculator`,
        `${short} SIP return calculator`,
        `${short} SIP plan calculator`,
        'SIP calculator',
        'mutual fund SIP calculator',
      ],
    },
    h1: `${bank} SIP Calculator`,
    intro: `The ${bank} SIP calculator helps you estimate how much your monthly investment in ${amc} schemes can grow over time. Enter your SIP amount, expected return rate and investment period to see the maturity value.`,
    sections: [
      {
        heading: `About ${amc}`,
        paras: [
          about ||
            `${amc} is one of the well known asset management companies in India. It offers a wide range of mutual fund schemes across equity, debt, hybrid, index and solution oriented categories. Investors can start a SIP in any of its open ended schemes with a small monthly amount.`,
          ...extra,
        ],
      },
      {
        heading: `How does the ${bank} SIP calculator work?`,
        paras: [
          `This calculator uses the standard SIP formula that applies to all mutual fund SIPs, including ${amc} schemes. It assumes you invest at the start of every month and returns are compounded monthly.`,
        ],
        formula: 'M = P × [ ( (1 + i)^n − 1 ) / i ] × (1 + i)',
        list: [
          'M = Maturity amount',
          'P = Monthly SIP amount',
          'i = Monthly rate of return, worked out from the yearly rate as (1 + yearly rate)^(1/12) − 1',
          'n = Total number of installments',
        ],
        paras2: [
          `Example: A SIP of ₹5,000 per month in a ${amc} equity scheme for 15 years at an expected 12% return gives a total investment of ₹9,00,000 and an estimated value of about ₹25,00,000.`,
        ],
      },
      {
        heading: `How to start a SIP in ${amc}`,
        list: [
          'Complete your KYC with PAN, Aadhaar and bank details.',
          `Choose a ${amc} scheme that matches your goal and risk level.`,
          'Decide the monthly SIP amount and the date of debit.',
          `Register the SIP online through the ${amc} website or app, a registered distributor, or any investment platform.`,
          'Set up an auto-debit mandate (e-NACH) so the amount is invested automatically every month.',
        ],
      },
      {
        heading: `Benefits of SIP in ${amc} schemes`,
        list: [
          'Start with as little as ₹500 per month in most schemes.',
          'Rupee cost averaging reduces the impact of market ups and downs.',
          'Flexible: pause, increase or stop the SIP at any time.',
          'Wide choice of schemes for short, medium and long term goals.',
        ],
      },
      {
        heading: 'Points to keep in mind',
        list: [
          'Returns shown by the calculator are estimates, not guaranteed. Actual returns depend on market performance.',
          'Check the expense ratio and exit load of the scheme before investing.',
          'Choose direct plans for lower cost if you do not need distributor help.',
          'Review your SIP once a year and increase it with your income.',
        ],
      },
    ],
    faqs: [
      {
        q: `What is the minimum SIP amount in ${amc}?`,
        a: `Most ${amc} schemes allow a minimum SIP of ₹500 per month. Some schemes accept even lower amounts. Check the scheme information document for exact details.`,
      },
      {
        q: `Does the ${bank} SIP calculator give guaranteed returns?`,
        a: 'No. The calculator gives an estimate based on the return rate you enter. Mutual fund returns depend on the market and are not guaranteed.',
      },
      {
        q: `Can I stop my ${amc} SIP anytime?`,
        a: 'Yes. You can stop or pause a SIP at any time without penalty. Exit load may apply if you redeem units within the exit load period, usually one year for equity funds.',
      },
      {
        q: `Which ${amc} scheme is best for SIP?`,
        a: 'The right scheme depends on your goal, time period and risk appetite. For long term goals, diversified equity or index funds are common choices. For short term goals, debt or hybrid funds are safer. Consult a SEBI registered advisor if unsure.',
      },
      {
        q: 'Is a SIP in a bank mutual fund different from other SIPs?',
        a: `No. A SIP in ${amc} works exactly like a SIP in any other fund house. The bank name refers to the sponsor of the asset management company, not to a bank deposit.`,
      },
    ],
    related: ['sip-calculator', 'lumpsum-calculator', 'elss-calculator', 'xirr-calculator'],
  };
}

const bankSips = [
  bankSip({
    slug: 'sbi-sip-calculator',
    color: '#2d6cdf',
    bank: 'SBI',
    amc: 'SBI Mutual Fund',
    short: 'SBI',
    extra: [
      'SBI Mutual Fund is a joint venture between State Bank of India and Amundi, and is among the largest fund houses in the country by assets under management.',
    ],
  }),
  bankSip({
    slug: 'hdfc-sip-calculator',
    color: '#1a4f9c',
    bank: 'HDFC',
    amc: 'HDFC Mutual Fund',
    short: 'HDFC',
    extra: [
      'HDFC Asset Management Company is one of the oldest and largest fund houses in India, known for its long track record in equity and hybrid funds.',
    ],
  }),
  bankSip({
    slug: 'icici-sip-calculator',
    color: '#c9542b',
    bank: 'ICICI',
    amc: 'ICICI Prudential Mutual Fund',
    short: 'ICICI',
    extra: [
      'ICICI Prudential AMC is a joint venture between ICICI Bank and Prudential plc, offering a large basket of equity, debt, hybrid and thematic schemes.',
    ],
  }),
  bankSip({
    slug: 'axis-bank-sip-calculator',
    color: '#8a1c3a',
    bank: 'Axis Bank',
    amc: 'Axis Mutual Fund',
    short: 'Axis',
    extra: [
      'Axis Mutual Fund is sponsored by Axis Bank and is popular for its equity funds such as bluechip, midcap and ELSS schemes.',
    ],
  }),
  bankSip({
    slug: 'kotak-bank-sip-calculator',
    color: '#d03a3a',
    bank: 'Kotak Bank',
    amc: 'Kotak Mahindra Mutual Fund',
    short: 'Kotak',
    extra: [
      'Kotak Mahindra Asset Management Company is part of the Kotak Mahindra Group and offers schemes across equity, debt, hybrid and index categories.',
    ],
  }),
  bankSip({
    slug: 'nippon-india-sip-calculator',
    color: '#c8102e',
    bank: 'Nippon India',
    amc: 'Nippon India Mutual Fund',
    short: 'Nippon India',
    extra: [
      'Nippon India Mutual Fund (formerly Reliance Mutual Fund) is backed by Nippon Life Insurance of Japan and has one of the largest investor bases in India.',
    ],
  }),
  bankSip({
    slug: 'lic-sip-calculator',
    color: '#1b5fa8',
    bank: 'LIC',
    amc: 'LIC Mutual Fund',
    short: 'LIC',
    extra: [
      'LIC Mutual Fund is sponsored by Life Insurance Corporation of India and offers equity, debt, hybrid and index schemes for retail investors.',
    ],
  }),
  bankSip({
    slug: 'idbi-sip-calculator',
    color: '#0d7a5f',
    bank: 'IDBI',
    amc: 'IDBI Mutual Fund',
    short: 'IDBI',
    extra: [
      'IDBI Mutual Fund schemes were taken over by LIC Mutual Fund in 2023. Existing SIPs continue under LIC Mutual Fund with the same investment process.',
    ],
  }),
  bankSip({
    slug: 'pnb-sip-calculator',
    color: '#b0322b',
    bank: 'PNB',
    amc: 'PNB mutual fund schemes',
    short: 'PNB',
    about:
      'Punjab National Bank (PNB) distributes mutual fund SIPs of several leading fund houses through its branches, net banking and mobile app. The schemes of the earlier Principal PNB Asset Management were merged into Sundaram Mutual Fund in 2021.',
    extra: [
      'You can start a SIP through PNB in equity, debt, hybrid and index funds of partner AMCs. The returns depend on the scheme you choose, not on the bank.',
    ],
  }),
];

export const calculators = [
  sip,
  lumpsum,
  swp,
  mfReturns,
  ssy,
  incomeTax,
  ppf,
  epf,
  fd,
  rd,
  emi,
  gst,
  xirrCalc,
  elss,
  ...bankSips,
];

export const calculatorMap = Object.fromEntries(calculators.map((c) => [c.slug, c]));

export function getCalculator(slug) {
  return calculatorMap[slug] || null;
}
