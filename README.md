# My Portfolio

A Next.js (App Router) portfolio site — monolith structure with pages,
components, data, and API routes all in one app.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/            # Routes (pages + API routes)
├── components/     # ui/, layout/, sections/
├── lib/            # utils, constants
├── data/           # projects.ts, experience.ts — edit these to update content
├── types/          # shared TypeScript types
└── hooks/          # custom React hooks
```

## Editing Content

- **Projects**: edit `src/data/projects.ts`
- **Experience / About**: edit `src/data/experience.ts` and `src/app/about/page.tsx`
- **Site name, email, social links**: edit `src/lib/constants.ts`
- **Colors**: edit CSS variables in `src/app/globals.css`

## UI Components (shadcn/ui)

This project uses [shadcn/ui](https://ui.shadcn.com) — components are copied
directly into `src/components/ui/` as plain, editable source (not an npm
package), so you own and can customize every component.

Already included: `button`, `card`, `input`, `textarea`, `label`.

To add more components later:

```bash
npx shadcn@latest add dialog dropdown-menu avatar badge
```

Theme colors live as CSS variables in `src/app/globals.css` under `:root`
(light mode) and `.dark` (dark mode). Edit those HSL values to change the
whole site's palette at once.

## Contact Form

The form posts to `src/app/api/contact/route.ts`, which currently just logs
the submission. To actually send emails, install an email provider (e.g.
`npm install resend`) and follow the TODO comment in that file. Add any
required secret to `.env.local` (see `.env.local.example`).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import
   the repo.
3. Vercel auto-detects Next.js, no config needed.
4. Add environment variables (if any) under **Settings → Environment Variables**.
5. Deploy. Every push to `main` redeploys automatically.
