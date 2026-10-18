import { ShieldCheck } from "lucide-react";
import { AiComposer } from "@/components/ai-composer";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="lagoon-field relative overflow-hidden pt-28 pb-20 text-white sm:pt-32 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="text-[2.6rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl lg:text-[3.6rem]">
            Say what you want sent. CEYNX handles the WhatsApp part.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-white/75">
            One shared inbox, campaigns, automations and WhatsApp Flows on the official WhatsApp Business Platform. Type
            an instruction in plain words and get a plan that already respects consent, approved templates and
            WhatsApp&apos;s 24-hour reply window.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#register">Get early access</a>
            </Button>
            <Button size="lg" variant="outlineLight" asChild>
              <a href="#product">See the product</a>
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <ShieldCheck aria-hidden className="size-4 text-signal" />
            Messages go only to contacts who opted in. Opt-outs stop instantly.
          </p>
        </div>

        <AiComposer />
      </div>
    </section>
  );
}
