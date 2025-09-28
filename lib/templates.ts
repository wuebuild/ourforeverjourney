import FPAnimation1 from "@/components/templates/luxury/fpAnimation1";
import FPRomanticTemplate from "@/components/templates/luxury/fpRomantic";
import FPFantasy1 from "@/components/templates/luxury/fpFantasy/fpFantasy1";

export const templates = {
    fpromantic: FPRomanticTemplate,
    fpanimation_1: FPAnimation1,
    fpfantasy_1: FPFantasy1,
} as const;

export type Template = keyof typeof templates;