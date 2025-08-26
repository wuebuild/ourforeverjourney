import WIButton from "@/components/ui/atoms/WIButton";
import WILabel from "../atoms/WILabel";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20">
      <WILabel font="heading" className="text-5xl md:text-6xl font-extrabold text-pink-700">
        Create Your Dream Wedding Invitation
      </WILabel>
      <WILabel className="mt-6 max-w-2xl text-lg text-gray-700">
        Beautiful, customizable wedding invitations you can share instantly. Pick from stunning templates and make it yours.
      </WILabel>
      <div className="mt-8 flex gap-4">
        <WIButton variant="primary" href="/register">Get Started</WIButton>
        <WIButton variant="secondary" href="#templates">View Templates</WIButton>
      </div>
    </section>
  );
}