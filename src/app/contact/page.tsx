import { Icon } from "@/components/icon";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { site, whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Talk to CEYNX about SaaS platforms, AI agents or a custom software project. Let's talk.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappLink();
  const { email, phone, address, bookingUrl } = site.contact;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your workflow"
        intro="Tell us what you want to automate or build. We reply within one business day."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <section className="section" aria-label="Contact options">
        <div className="container-site grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="glass p-6 sm:p-9">
            <h2 className="text-2xl font-extrabold text-ink">Send us a message</h2>
            <p className="mt-2 text-muted">Fields marked * are required.</p>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>
          <aside className="space-y-5" aria-label="Other ways to reach us">
            {bookingUrl ? (
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-4 p-6">
                <Icon name="clock" className="size-6 text-mint-soft" />
                <span>
                  <span className="block font-bold text-ink">Book a call</span>
                  <span className="text-sm text-muted">Pick a time that suits you</span>
                </span>
              </a>
            ) : null}
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="glass glass-hover flex items-center gap-4 p-6">
                <Icon name="chat" className="size-6 text-mint-soft" />
                <span>
                  <span className="block font-bold text-ink">Chat on WhatsApp</span>
                  <span className="text-sm text-muted">Fast replies during business hours</span>
                </span>
              </a>
            ) : null}
            {email ? (
              <a href={`mailto:${email}`} className="glass glass-hover flex items-center gap-4 p-6">
                <Icon name="mail" className="size-6 text-mint-soft" />
                <span>
                  <span className="block font-bold text-ink">Email</span>
                  <span className="text-sm text-muted">{email}</span>
                </span>
              </a>
            ) : null}
            {phone ? (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="glass glass-hover flex items-center gap-4 p-6">
                <Icon name="phone" className="size-6 text-mint-soft" />
                <span>
                  <span className="block font-bold text-ink">Phone</span>
                  <span className="text-sm text-muted">{phone}</span>
                </span>
              </a>
            ) : null}
            {address ? (
              <div className="glass flex items-center gap-4 p-6">
                <Icon name="pin" className="size-6 text-mint-soft" />
                <span>
                  <span className="block font-bold text-ink">Office</span>
                  <span className="text-sm text-muted">{address}</span>
                </span>
              </div>
            ) : null}
            <div className="glass p-6">
              <p className="font-bold text-ink">What happens next?</p>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                <li><span className="font-semibold text-mint-soft">1.</span> We read your message and reply within one business day.</li>
                <li><span className="font-semibold text-mint-soft">2.</span> A short discovery call to understand your goals.</li>
                <li><span className="font-semibold text-mint-soft">3.</span> A recommendation: SaaS plan, AI agent or custom build.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
