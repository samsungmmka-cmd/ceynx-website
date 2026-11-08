import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Terms of Service", description: "Terms that apply to use of the CEYNX website.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms" updated="2026-11-06">
      <p>These terms apply to your use of this website. Use of CEYNX SaaS platforms and custom development services is governed by the separate agreement you sign with us.</p>
      <h2>Use of the website</h2>
      <p>You may browse and use this website for lawful purposes. You must not attempt to disrupt it, gain unauthorised access, or submit false or harmful information through its forms.</p>
      <h2>Content</h2>
      <p>The text, design, graphics and trademarks on this website belong to {site.legalName} unless stated otherwise. Product descriptions are for general information and may change; features and pricing are confirmed in your agreement.</p>
      <h2>Third-party names</h2>
      <p>WhatsApp is a trademark of its respective owner. CEYNX Connect works with the WhatsApp Business Platform and is not affiliated with or endorsed by WhatsApp.</p>
      <h2>Liability</h2>
      <p>The website is provided &quot;as is&quot;. To the extent permitted by law, we are not liable for losses arising from reliance on its content.</p>
      <h2>Changes</h2>
      <p>We may update these terms. The date at the top of this page shows the latest version.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
    </LegalPage>
  );
}
