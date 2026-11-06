import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Cookie Policy", description: "How the CEYNX website uses cookies and similar technologies.", path: "/cookies" });

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" path="/cookies" updated="2026-11-06">
      <p>This website currently uses no advertising or analytics cookies, so no cookie banner is shown.</p>
      <h2>What we use</h2>
      <ul>
        <li><strong>Strictly necessary storage:</strong> technical data the website needs to load pages and keep forms secure.</li>
      </ul>
      <h2>If this changes</h2>
      <p>If we add analytics or marketing tools, we will update this policy and ask for your consent before setting any non-essential cookies.</p>
      <h2>Managing cookies</h2>
      <p>You can block or delete cookies in your browser settings at any time.</p>
      <h2>Contact</h2>
      <p>Questions can be sent to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
    </LegalPage>
  );
}
