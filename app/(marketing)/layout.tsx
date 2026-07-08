import Navbar from "@/shared/components/Navbar";
import FooterSection from "@/features/landing/components/FooterSection";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      {children}
      <FooterSection />
    </div>
  );
}
