import ExampleTemplate from "@/components/templates/example";

export const templates = {
    example: ExampleTemplate
} as const;

export type Template = keyof typeof templates;