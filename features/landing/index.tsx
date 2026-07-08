import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import TemplateShowcase from "./components/TemplateShowcase";
import HowItWorks from "./components/HowItWorks";
import PricingSection from "./components/PricingSection";
import CTASection from "./components/CTASection";

/** Landing page sections — navbar and footer come from the (marketing) layout. */
export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <FeaturesSection />
      <TemplateShowcase />
      <HowItWorks />
      <PricingSection />
      <CTASection />
    </main>
  );
}
