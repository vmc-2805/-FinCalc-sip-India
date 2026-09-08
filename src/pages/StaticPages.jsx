import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import { SITE_NAME } from '../data/site';

function Page({ title, description, path, children }) {
  return (
    <div className="page container">
      <Seo title={title} description={description} path={path} />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: title }]} />
      <article className="static-page">
        <h1>{title}</h1>
        {children}
      </article>
    </div>
  );
}

export function About() {
  return (
    <Page
      title="About us"
      description={`${SITE_NAME} provides free, accurate financial calculators for Indian investors covering SIP, loans, tax, FD, PPF and more.`}
      path="/about"
    >
      <p>
        {SITE_NAME} was started with one simple goal: to help every Indian understand their money better.
        Financial planning should not need a degree in finance. Our calculators turn complex formulas into
        simple sliders and clear charts so you can take decisions with confidence.
      </p>
      <h2>What we offer</h2>
      <ul>
        <li>Investment calculators for SIP, lumpsum, SWP, mutual fund returns, ELSS and XIRR.</li>
        <li>Savings scheme calculators for PPF, EPF, Sukanya Samriddhi Yojana, FD and RD.</li>
        <li>Loan and tax calculators for EMI, income tax and GST.</li>
        <li>Easy explanations, formulas and FAQs in simple English with every calculator.</li>
      </ul>
      <h2>Our promise</h2>
      <p>
        All tools are free to use, need no login and never store your data. We use the standard formulas
        followed by banks, mutual fund houses and the Income Tax Department, and we update rates such as
        PPF, EPF and SSY interest when the Government revises them.
      </p>
      <p>
        We do not sell financial products and do not give personal investment advice. Please consult a SEBI
        registered advisor for advice specific to your situation.
      </p>
    </Page>
  );
}

export function Contact() {
  return (
    <Page
      title="Contact us"
      description={`Get in touch with ${SITE_NAME} for feedback, corrections or partnership queries.`}
      path="/contact"
    >
      <p>
        We would love to hear from you. If you found a mistake, have a suggestion for a new calculator or
        want to report a problem, please write to us.
      </p>
      <p>
        Send us your feedback along with the calculator name and the values you entered, so we can check it
        quickly. We usually reply within 2 working days.
      </p>
      {/* Add your contact form or contact details here when ready. */}
      <h2>Please note</h2>
      <p>
        We cannot give personal investment, loan or tax advice. For advice on your specific situation, please
        consult a SEBI registered investment advisor or a chartered accountant.
      </p>
    </Page>
  );
}

export function Privacy() {
  return (
    <Page
      title="Privacy policy"
      description={`Read how ${SITE_NAME} handles your data. We do not collect or store the values you enter in our calculators.`}
      path="/privacy-policy"
    >
      <p>Last updated: September 2026</p>
      <h2>Information we collect</h2>
      <p>
        The values you enter in our calculators are processed only in your browser. They are not sent to
        our servers and are not stored anywhere. We do not ask you to create an account.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        We may use standard web analytics tools to understand which pages are popular and to improve the
        website. These tools may use cookies and collect anonymous data such as browser type, device type
        and pages visited. You can disable cookies in your browser settings.
      </p>
      <h2>Advertising</h2>
      <p>
        If advertisements are shown on this website, third party ad networks may use cookies to show
        relevant ads. We do not share any personal data with them.
      </p>
      <h2>Contact</h2>
      <p>For any privacy related question, please reach us through the Contact page.</p>
    </Page>
  );
}

export function Terms() {
  return (
    <Page
      title="Terms of use"
      description={`Terms and conditions for using the calculators and content on ${SITE_NAME}.`}
      path="/terms"
    >
      <p>
        By using {SITE_NAME}, you agree to the following terms. Please read them carefully.
      </p>
      <h2>Use of calculators</h2>
      <p>
        The calculators and content on this website are provided for general information and education
        only. They are not financial, investment, tax or legal advice. Results depend on the inputs you
        provide and are estimates only.
      </p>
      <h2>No guarantee</h2>
      <p>
        We try to keep formulas, interest rates and tax rules up to date, but we do not guarantee that the
        information is complete, accurate or current at all times. Interest rates and tax rules change from
        time to time.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        {SITE_NAME} and its team are not responsible for any loss or damage arising from the use of this
        website or reliance on its results. Always verify with the concerned bank, fund house or a
        professional before taking a decision.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All content, design and code on this website belong to {SITE_NAME} unless stated otherwise. You may
        not copy or reproduce the content without written permission.
      </p>
    </Page>
  );
}

export function Disclaimer() {
  return (
    <Page
      title="Disclaimer"
      description={`Important disclaimer about the calculators and information published on ${SITE_NAME}.`}
      path="/disclaimer"
    >
      <p>
        Mutual fund investments are subject to market risks. Please read all scheme related documents
        carefully before investing. Past performance is not an indicator of future returns.
      </p>
      <p>
        The calculators on this website give estimates based on the values you enter. They do not consider
        charges such as expense ratio, exit load, stamp duty, brokerage or taxes unless clearly mentioned.
        Actual returns, EMIs or tax liability may differ.
      </p>
      <p>
        Interest rates of PPF, EPF, SSY, FD and RD are revised by the Government and banks from time to
        time. Income tax slabs and rules change with every Finance Act. Please confirm the latest figures
        from official sources.
      </p>
      <p>
        {SITE_NAME} is not a SEBI registered investment advisor and does not sell any financial product. Bank
        and fund house names used on this website belong to their respective owners and are used only to
        describe the calculators. We are not associated with any bank or asset management company.
      </p>
    </Page>
  );
}
