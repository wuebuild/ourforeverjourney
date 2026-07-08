# OurForeverJourney

Digital wedding-invitation SaaS. Next.js 15 App Router + React 19 + HeroUI v3 +
Tailwind v4, package manager **bun**.

- Architecture map & conventions: read [SKILLS.md](SKILLS.md) before structural changes.
- Adding an invitation template: use the `add-invitation-template` skill.
- Component/styling rules: use the `frontend-conventions` skill.
- Quality gates: `bun run typecheck && bun run lint && bun run build`.
- Dev server: `bun run dev` (port 4300). Local builds need `.env.local`
  (see `shared/http/` for the required vars).
- Template ids in `templates/registry.ts` are stored in the DB — never rename them.
- The route `/portofolio` is intentionally spelled that way (live URL).
