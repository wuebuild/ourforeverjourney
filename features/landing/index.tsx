import HeroSection from "@/features/landing/components/HeroSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import TemplatesSection from "@/features/landing/components/TemplateSection";
import PricingSection from "@/features/landing/components/PricingSection";
import CTASection from "@/features/landing/components/CTASection";
import Footer from "@/features/landing/components/FooterSection";
import Nav from "@/shared/components/Nav";
// import TemplatesSection from "@/features/landing/components/TemplatesSection";
// import CTASection from "@/features/landing/components/CTASection";
// import Footer from "@/features/landing/components/Footer";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Nav />
      <div className="pt-32"/>
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <PricingSection />
      <CTASection />
      <Footer/>
    </main>
  );
}