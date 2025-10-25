import type { ComponentType } from "react";
import FPFantasy1 from "@/components/templates/luxury/fpFantasy/fpFantasy1";
import { CoupleInfo } from "@/types/invitation";

type TemplateProps = { data: CoupleInfo };
export const templates = {
    fpfantasy_1: FPFantasy1,
} as const satisfies Record<string, ComponentType<TemplateProps>>;

export type Template = keyof typeof templates;

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
  return templates[key];
}