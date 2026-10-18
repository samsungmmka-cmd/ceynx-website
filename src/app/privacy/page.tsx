import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

// GO-LIVE: have this reviewed by your lawyer before launch. Meta App Review requires a real policy URL.
export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" updated="18 October 2026">
      <p>This policy explains what this website collects when you register your interest in CEYNX, and how we use it.</p>
      <h2>What we collect</h2>
      <ul>
        <li>The details you type into the registration form: name, work email, company, WhatsApp number, team size, main use and your optional message.</li>
        <li>Basic technical data our hosting provider needs to serve the site and prevent abuse, such as IP address, kept only in short-lived logs.</li>
      </ul>
      <p>This website sets no advertising or analytics cookies and loads no third-party trackers.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To review your registration, set up your workspace and send you your sign-in link.</li>
        <li>To contact you by email or WhatsApp about your registration, which you agreed to on the form.</li>
      </ul>
      <p>We don&apos;t sell your data or use it for advertising.</p>
      <h2>Keeping and deleting your data</h2>
      <p>If you don&apos;t become a customer, we delete your registration within 12 months. You can ask us to delete it sooner, or to send you a copy, by emailing <a className="text-teal underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Using the CEYNX platform</h2>
      <p>Data you process inside the CEYNX platform, such as customer conversations, is covered by the customer agreement and the data-processing terms you accept when your workspace is created.</p>
      <h2>Contact</h2>
      <p>Questions about privacy: <a className="text-teal underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
