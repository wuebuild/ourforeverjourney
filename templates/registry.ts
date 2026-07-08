import FPFantasy1 from "@/templates/luxury/fantasy-1";
import { meta as fantasy1Meta } from "@/templates/luxury/fantasy-1/meta";
import FPFantasy2 from "@/templates/luxury/fantasy-2";
import { meta as fantasy2Meta } from "@/templates/luxury/fantasy-2/meta";
import type { TemplateDefinition } from "./types";

/**
 * Single source of truth for invitation templates.
 * Keys are the `templateType` values stored in the DB — never rename them.
 * The landing page Template Showcase renders from this list too, so a new
 * template registered here automatically appears on the homepage.
 */
export const templates = {
  fpfantasy_1: { ...fantasy1Meta, component: FPFantasy1 },
  fpfantasy_2: { ...fantasy2Meta, component: FPFantasy2 },
} as const satisfies Record<string, TemplateDefinition>;

export type Template = keyof typeof templates;

export const templateList: TemplateDefinition[] = Object.values(templates);

// Narrow unknown -> Template
export function isTemplateId(x: unknown): x is Template {
  return typeof x === "string" && Object.prototype.hasOwnProperty.call(templates, x);
}

// Optional helper: get component with fallback
export function resolveTemplate(
  templateType: unknown,
  fallback: Template = "fpfantasy_1"
) {
  const key: Template = isTemplateId(templateType) ? templateType : fallback;
  return templates[key].component;
}
