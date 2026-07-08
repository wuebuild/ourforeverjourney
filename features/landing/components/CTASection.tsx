import WIButton from "@/shared/components/ui/WIButton";
import WILabel from "@/shared/components/ui/WILabel";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-400 text-white text-center px-6">
      <WILabel font="heading" color="white" className="text-3xl md:text-4xl font-bold">
        Ready to Create Your Wedding Invitation?
      </WILabel>
      <p className="mt-4 max-w-xl mx-auto text-lg text-pink-100">
        Join thousands of couples making their special day unforgettable with stunning digital invitations.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <WIButton variant="primary" href="/register" className="bg-white text-pink-600 hover:bg-pink-100">
          Get Started Free
        </WIButton>
        <WIButton variant="secondary" href="#templates" className="border-white text-white hover:bg-pink-700">
          Browse Templates
        </WIButton>
      </div>
    </section>
  );
}