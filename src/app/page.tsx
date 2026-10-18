import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { ProductTour } from "@/components/sections/product-tour";
import { AiSection } from "@/components/sections/ai-section";
import { Guardrails } from "@/components/sections/guardrails";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Register } from "@/components/sections/register";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProductTour />
        <AiSection />
        <Guardrails />
        <HowItWorks />
        <Pricing />
        <Faq />
        <Register />
      </main>
      <SiteFooter />
    </>
  );
}
