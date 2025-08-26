import { Gift, Smartphone, Share2 } from "lucide-react";

const features = [
  {
    icon: Gift,
    title: "Beautiful Designs",
    desc: "Choose from modern, elegant, and traditional wedding invitation templates.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Your invitation looks stunning on any device — phone, tablet, or desktop.",
  },
  {
    icon: Share2,
    title: "Instant Sharing",
    desc: "Share with your guests instantly via link, QR code, or social media.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Why Choose Us?
      </h2>
      <p className="mt-2 text-center text-gray-600">
        Everything you need to create the perfect digital wedding invitation.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100"
          >
            <Icon className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600 mt-2">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}