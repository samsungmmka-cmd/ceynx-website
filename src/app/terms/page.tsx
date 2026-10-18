import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of service", alternates: { canonical: "/terms" } };

// GO-LIVE: replace with terms reviewed by your lawyer.
export default function Terms() {
  return (
    <LegalPage title="Terms of service" updated="18 October 2026">
      <p>These terms cover your use of this website. Use of the CEYNX platform is governed by the customer agreement you accept when your workspace is created.</p>
      <h2>Registration</h2>
      <p>Registering doesn&apos;t create an account or a contract. We may accept or decline registrations, for example when a use case doesn&apos;t meet WhatsApp&apos;s Business and Commerce policies.</p>
      <h2>Acceptable use</h2>
      <ul>
        <li>Give accurate information about yourself and your business.</li>
        <li>Don&apos;t try to disrupt, probe or overload the website.</li>
        <li>Don&apos;t submit someone else&apos;s details without their permission.</li>
      </ul>
      <h2>Features in early access</h2>
      <p>Features described as early access, including CEYNX AI, may change, be limited to some workspaces, or be released later than planned.</p>
      <h2>Trademarks</h2>
      <p>WhatsApp and Meta are trademarks of their owners. CEYNX is not affiliated with or endorsed by Meta.</p>
      <h2>Contact</h2>
      <p><a className="text-teal underline" href={`mailto:${site.email}`}>{site.email}</a></p>
    </LegalPage>
  );
}
