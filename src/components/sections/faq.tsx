import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is CEYNX built on the official WhatsApp API?",
    a: "Yes. CEYNX uses Meta's WhatsApp Business Platform (Cloud API). There are no unofficial apps or browser tricks, so your number isn't put at risk.",
  },
  {
    q: "Can I keep my existing WhatsApp number?",
    a: "Usually, yes. A number that is currently on the WhatsApp Business app can be moved to the platform during setup. We'll walk you through it when you connect.",
  },
  {
    q: "Who pays for WhatsApp messages?",
    a: "Meta charges for some message types, such as marketing templates. You add a payment method in Meta's WhatsApp Manager and Meta bills you directly. CEYNX adds no markup.",
  },
  {
    q: "How does the AI decide what to send?",
    a: "It doesn't send anything by itself. CEYNX AI prepares a plan or a draft and a person on your team approves it. Every message still passes the consent, template and 24-hour checks.",
  },
  {
    q: "Why do I register here instead of signing up in the app?",
    a: "We onboard every business personally so your workspace, number and templates are set up properly. Once you register, we email you a private link to your workspace.",
  },
  {
    q: "What happens to my data?",
    a: "Your workspace is isolated from every other business. You can set how long messages are kept, export everything, or delete your workspace at any time.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Questions businesses ask us</h2>
        <Accordion type="single" collapsible className="border-t">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
