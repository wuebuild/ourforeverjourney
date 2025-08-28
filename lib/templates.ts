import ExampleTemplate from "@/components/templates/example";
import FPRomanticTemplate from "@/components/templates/luxury/fpRomantic"

export const templates = {
    example: ExampleTemplate,
    fpromantic: FPRomanticTemplate
} as const;

export type Template = keyof typeof templates;