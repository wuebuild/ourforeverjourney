---
name: add-invitation-template
description: Scaffold and register a new wedding-invitation template (folder shape, meta.ts, registry/catalog wiring, verification). Use when asked to add, create, or scaffold an invitation template or template variant.
---

# Add an invitation template

## Folder shape

Create `templates/<tier>/<name>/` (tier: `luxury` | `premium` | `classic`; name: kebab-case):

```
templates/luxury/my-template/
  index.tsx      # "use client" — root component: ({ data }: TemplateProps) => JSX
  meta.ts        # TemplateMeta (see below)
  sections/      # one file per invitation section: cover, love-story, event,
                 # carousel, rsvp, wishes, gift, end (reuse another template's
                 # sections via relative import when the design allows)
  assets/        # template-local images, imported statically for next/image
  styles.css     # only if the template needs bespoke CSS
```

## meta.ts

```ts
import type { TemplateMeta } from "../../types";

export const meta: TemplateMeta = {
  id: "my_template_1",   // stored in DB as templateType — pick once, NEVER rename
  name: "My Template",
  tier: "luxury",
  description: "One sentence shown on the landing showcase.",
  previewVideo: "/videos/my-template.mp4", // optional opening video in public/videos
  demoSlug: "some-couple",                 // optional live-demo invitation slug
} as const;
```

## Register (two files, both required)

1. `templates/registry.ts` — add `my_template_1: { ...myMeta, component: MyTemplate }`.
2. `templates/catalog.ts` — add the meta to `templateCatalog` (metadata-only file;
   do NOT import the component here — it must stay bundle-safe for the landing page).

The landing Template Showcase renders from the catalog automatically — no landing
code changes needed.

## Conventions inside a template

- `data: CoupleInfo` comes from `features/invitation/types.ts`; render guest name,
  events, gallery, gift accounts from it — no hard-coded couple data.
- Opening video: add a React-19-hoisted preload next to the `<video>`:
  `<link rel="preload" as="video" href="..." fetchPriority="high" />`
  (never in `app/layout.tsx` — it would tax every route).
- Fonts: use the `font-imperial` / `font-heading` utilities, don't add `<link>` font tags.
- Songs go in `public/songs/`, videos in `public/videos/` (they get immutable cache headers).

## Verify

```
bun run typecheck && bun run build
```

Then open a `[couple]` page whose `templateType` is the new id (or temporarily set
the fallback in `resolveTemplate`) on http://localhost:4300 and click through every
section on a mobile viewport.
