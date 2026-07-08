# OurForeverJourney — Architecture & Conventions

Digital wedding-invitation SaaS (ourforeverjourney.com). This doc is the map;
follow it when adding anything new.

## Stack

| Layer | Choice |
|---|---|
| Runtime / PM | **bun** (`bun install`, `bun run dev`) |
| Framework | Next.js 15 App Router, React 19 |
| UI library | **HeroUI v3** (`@heroui/react`) — compound components (`Card.Content`), no Provider needed |
| Styling | Tailwind CSS **v4** — tokens live in `app/globals.css` (`@theme`), there is **no tailwind.config.js** |
| Animation | framer-motion (HeroUI peer dep) |
| Icons | lucide-react |
| HTTP | axios via `shared/http/{client,server}.ts` (env: `NEXT_PUBLIC_API_BASE`, `API_BASE`) |

Dev server: `bun run dev` → http://localhost:4300. Quality gates:
`bun run typecheck && bun run lint && bun run build`.

## Folder structure (feature-first)

```
app/            Routes ONLY — every page.tsx is a one-line re-export of a feature component
  (marketing)/    /, /portofolio      → Navbar + Footer chrome
  (app)/          /login /register /myinvitation /gallery → Navbar chrome
  [couple]/       guest invitation renderer (SSR + OG metadata)
  api/            route handlers (S3 upload, auth proxy)
features/       One folder per product feature
  <feature>/components/   feature UI (pages live here, not in app/)
  <feature>/services/     client.ts (browser calls) + server.ts (RSC calls)
  <feature>/constants/    copy & data, e.g. landing content
  <feature>/types.ts      feature-owned types
shared/         Cross-feature code ONLY (used by 2+ features)
  components/     app chrome (Navbar) ; components/ui/ = WI* form primitives
  http/           axios instances    lib/  utils    types/  api.ts, global.d.ts
templates/      Invitation template library (product content, not a feature)
  registry.ts     id → { ...meta, component } — THE source of truth
  catalog.ts      metadata-only export, safe for marketing bundles
  types.ts        TemplateMeta / TemplateProps / TemplateDefinition
  <tier>/<name>/  index.tsx, meta.ts, sections/, assets/, styles.css
```

### Placement rules

1. New UI for one feature → `features/<feature>/components/`.
2. Used by two or more features → move it to `shared/`.
3. A route file in `app/` never contains JSX beyond a re-export; logic lives in the feature.
4. Landing copy/data changes go in `features/landing/constants/content.ts`, not in components.
5. Never import `templates/registry.ts` from marketing/dashboard code — use
   `templates/catalog.ts` (registry pulls every template component into the bundle).

## Design tokens

Defined in `app/globals.css`:

- Fonts (`next/font`, wired in `app/layout.tsx`): `font-heading` (Playfair Display),
  `font-script` / `font-imperial` (Imperial Script), `font-body` (Figtree).
- Brand colors: `ivory`, `champagne`, `blush`, `rosegold` (+ Tailwind `rose` scale).
- HeroUI semantic tokens are themed there too (`--accent` = deep rose): prefer
  `bg-surface`, `text-foreground`, `text-muted`, `border-border`, `text-accent`
  over hard-coded grays/pinks.

## HeroUI usage

- Components are **client-only**: any file importing `@heroui/react` needs `"use client"`.
- Buttons that navigate: `next/link` + `buttonVariants({ variant, size })` — not `<Button>`.
- Variants: `primary | secondary | tertiary | ghost | outline | danger`; sizes `sm | md | lg`.
- `cn()` (re-exported from `@heroui/react`) for conditional classes.

## Motion / UX bar

- Scroll reveals: wrap in `features/landing/components/Reveal.tsx` — it already
  handles `prefers-reduced-motion`; never add raw `whileInView` without a
  reduced-motion fallback.
- Videos below the fold: lazy (`preload="none"` + IntersectionObserver — see
  `TemplateShowcase.tsx`). Template opening videos preload via a React-19-hoisted
  `<link rel="preload">` inside the template that plays them, never in the root layout.
- No layout shift: sized media, `next/font` only.

## Adding an invitation template

See `.claude/skills/add-invitation-template/SKILL.md`. Short version:
`templates/<tier>/<name>/{index.tsx, meta.ts, sections/, assets/}` → register in
`templates/registry.ts` + `templates/catalog.ts`. The `id` is stored in the DB
(`templateType`) — pick it once, never rename. It appears on the landing page
automatically via the catalog.
