import Link from "next/link";

type CardTemplateProps = {
  title: string;
  description: string;
  link: string;
};

export default function Card({ title, description, link }: CardTemplateProps) {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
      <div className="h-48 bg-pink-100 flex items-center justify-center text-2xl font-bold text-pink-700">
        {title}
      </div>
      <div className="p-6 flex flex-col gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <Link href={link} className="mt-auto text-pink-600 font-medium hover:underline">
          Try this template →
        </Link>
      </div>
    </div>
  );
}