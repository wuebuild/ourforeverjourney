import WIButton from "@/components/ui/atoms/WIButton";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 Invitation", "Basic Templates", "Share via Link"],
    cta: "Get Started",
  },
  {
    name: "Premium",
    price: "$29",
    features: ["Unlimited Invitations", "All Templates", "Custom Domain", "Analytics"],
    cta: "Go Premium",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Simple Pricing
      </h2>
      <p className="mt-2 text-center text-gray-600">
        Start free, upgrade anytime to unlock more features.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl border border-gray-200 shadow hover:shadow-lg transition p-8 flex flex-col"
          >
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-4xl font-bold text-pink-600">{plan.price}</p>
            <ul className="mt-6 space-y-2 text-gray-600">
              {plan.features.map((f) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <WIButton variant="primary" href="/register">
                {plan.cta}
              </WIButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}