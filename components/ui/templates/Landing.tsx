import HeroSection from "@/components/ui/organisms/HeroSection";
import FeaturesSection from "@/components/ui/organisms/FeaturesSection";
import TemplatesSection from "@/components/ui/organisms/TemplateSection";
import PricingSection from "@/components/ui/organisms/PricingSection";
import CTASection from "@/components/ui/organisms/CTASection";
import Footer from "@/components/ui/organisms/FooterSection";
import Nav from "@/components/ui/molecules/Nav";
// import TemplatesSection from "@/components/ui/organisms/TemplatesSection";
// import CTASection from "@/components/ui/organisms/CTASection";
// import Footer from "@/components/ui/organisms/Footer";

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