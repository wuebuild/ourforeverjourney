import { resolveTemplate } from "@/lib/templates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCoupleBySlug, listCoupleSlugs } from "@/lib/couples";

export const revalidate = 60;

type PageParams = { couple: string };

// --- SSG (optional)
export async function generateStaticParams() {
  const slugs = await listCoupleSlugs();
  return slugs.map((slug) => ({ couple: slug }));
}

// --- Metadata: params is a Promise → await it
export async function generateMetadata(
  props: { params: Promise<PageParams> }
): Promise<Metadata> {
  const { couple } = await props.params;
  const data = await getCoupleBySlug(couple);
  if (!data) return {};

  const title = `${data.names} — Wedding Invitation`;
  const description = data.summary ?? `${data.names} Wedding Invitation`;
  const url = `https://ourforeverjourney.com/${data.slug}`;
  const ogImage = data.coverImage.startsWith("http")
    ? data.coverImage
    : `https://ourforeverjourney.com${data.coverImage}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// --- Page: params is a Promise here too → await it
export default async function CouplePage(props: { params: Promise<PageParams> }) {
  const { couple } = await props.params;

  const data = await getCoupleBySlug(couple);
  if (!data) return notFound();

  const TemplateComponent = resolveTemplate(data.templateType, "fpfantasy_1");
  return <TemplateComponent data={data} />;
}
