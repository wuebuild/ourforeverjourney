import type { ComponentType } from "react";
import type { CoupleInfo } from "@/features/invitation/types";

export type TemplateProps = { data: CoupleInfo };

export type TemplateTier = "luxury" | "premium" | "classic";

export type TemplateMeta = {
  /** Stable id — stored in the DB as `templateType`. Never rename. */
  id: string;
  /** Display name shown on the landing page and dashboard. */
  name: string;
  tier: TemplateTier;
  description: string;
  /** Opening video shown before the invitation, if the template has one. */
  previewVideo?: string;
  /** Poster/thumbnail used by showcase cards (public path or remote URL). */
  thumbnail?: string;
  /** Slug of a live invitation to link as a demo, e.g. "irawan-cindy". */
  demoSlug?: string;
};

export type TemplateDefinition = TemplateMeta & {
  component: ComponentType<TemplateProps>;
};
