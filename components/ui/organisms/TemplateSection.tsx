import CardTemplate from "@/components/ui/molecules/Card";
import WILabel from "../atoms/WILabel";

const templates = [
  { title: "Classic", description: "Timeless design with elegant flourishes.", link: `/to/dummy-classic` },
  { title: "Minimal", description: "Simple and modern for a clean look.", link: `/to/dummy-minimal` },
  { title: "Floral", description: "Romantic flowers and soft details.", link: `/to/floral-minimal` },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="py-20 bg-pink-50 px-6">
      <div className="text-center">
        <div>
          <WILabel font="heading" className="text-3xl font-bold text-center text-gray-900">
            Choose Your Style
          </WILabel>
        </div>
        <div>
          <WILabel className="mt-2 text-center text-gray-600">
            Pick from beautiful invitation templates and make them yours.
          </WILabel>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {templates.map((tpl) => (
          <CardTemplate
            key={tpl.title}
            title={tpl.title}
            description={tpl.description}
            link={tpl.link}
          />
        ))}
      </div>
    </section>
  );
}