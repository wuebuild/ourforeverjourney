import { meta as fantasy1 } from "./luxury/fantasy-1/meta";
import { meta as fantasy2 } from "./luxury/fantasy-2/meta";
import type { TemplateMeta } from "./types";

/**
 * Metadata-only view of the template library for marketing and dashboard
 * surfaces. Importing this does NOT pull template component code into the
 * bundle — use templates/registry.ts only where a template is rendered.
 */
export const templateCatalog: TemplateMeta[] = [fantasy1, fantasy2];
