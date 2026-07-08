---
name: frontend-conventions
description: Feature-first structure, HeroUI v3 usage, design tokens, and motion rules for this repo. Use before adding pages, components, features, or styling changes.
---

# Frontend conventions

Full map: [SKILLS.md](../../../SKILLS.md) at the repo root. The rules that prevent
real mistakes:

## Structure

- `app/` route files are one-line re-exports; the actual page component lives in
  `features/<feature>/components/`. New route = thin `page.tsx` + feature component.
- `shared/` only for code used by 2+ features. One consumer → keep it in the feature.
- Marketing/dashboard code imports template **metadata** from `templates/catalog.ts`;
  only the `[couple]` renderer goes through `templates/registry.ts` (registry drags
  all template components into the bundle).

## HeroUI v3 (not v2 — APIs differ)

- Client-only: importing `@heroui/react` requires `"use client"` in that file.
- Compound API: `Card` + `Card.Content`, `Chip`, `buttonVariants`, `cn`.
- Link-shaped buttons: `<Link className={buttonVariants({ variant: "primary", size: "lg" })}>`.
- No `HeroUIProvider` and no Tailwind plugin config — theme comes from
  `@import "@heroui/styles"` + overrides in `app/globals.css`.

## Styling

- Tailwind v4: tokens in `app/globals.css` under `@theme`; there is no
  `tailwind.config.js` — do not create one.
- Use semantic classes first (`bg-surface`, `text-foreground`, `text-muted`,
  `border-border`, `text-accent`), brand tokens second (`ivory`, `champagne`,
  `blush`, `rosegold`), raw palette last.
- Fonts via utilities only: `font-heading`, `font-script`, `font-imperial`, `font-body`.

## Motion & media

- Scroll reveals via `features/landing/components/Reveal.tsx` (handles
  `prefers-reduced-motion`); don't hand-roll `whileInView`.
- Below-fold `<video>`: `preload="none"` + play/pause with IntersectionObserver
  (see `TemplateShowcase.tsx`). Video preloads belong inside the component that
  renders the video (React 19 hoists `<link rel="preload">`), never the root layout.

## Verify

`bun run typecheck && bun run lint && bun run build`; dev server on
http://localhost:4300 (`bun run dev`).
