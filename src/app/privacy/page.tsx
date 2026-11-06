import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How CEYNX collects, uses and protects personal data.", path: "/privacy" });

export default function PrivacyPage() {
  const email = site.contact.email;
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="2026-11-06">
      <p>This policy explains how {site.legalName} (&quot;CEYNX&quot;, &quot;we&quot;) handles personal data when you visit this website or contact us. It does not cover data processed inside our SaaS platforms on behalf of our customers, which is governed by the relevant customer agreement.</p>
      <h2>Data we collect</h2>
      <ul>
        <li>Details you give us through forms: name, email, company, phone number, your area of interest and your message.</li>
        <li>Your email address if you subscribe to our newsletter.</li>
        <li>Basic technical data needed to deliver and secure the website, such as IP address and browser type, held in server logs.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and provide demos, proposals and support you request.</li>
        <li>To send the newsletter you subscribed to. Every email includes an unsubscribe link.</li>
        <li>To keep the website secure and prevent abuse.</li>
      </ul>
      <p>We rely on your consent and on our legitimate interest in responding to business enquiries. We do not sell personal data.</p>
      <h2>Sharing</h2>
      <p>We use trusted service providers for hosting, database storage and email delivery. They process data only on our instructions and under appropriate safeguards.</p>
      <h2>Retention</h2>
      <p>We keep enquiry data for as long as needed to handle your request and our business relationship, and then delete or anonymise it.</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct or delete your personal data, or withdraw consent at any time, by emailing <a href={`mailto:${email}`}>{email}</a>.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent to <a href={`mailto:${email}`}>{email}</a>.</p>
    </LegalPage>
  );
}
