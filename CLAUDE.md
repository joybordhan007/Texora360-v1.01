# CLAUDE.md – Texora360 v1.01

> **Rule for Claude:** after finishing every feature (or any notable change), update this file —
> add it to *What has been built*, record any new decision under *Decisions*, and add a line to the
> *Changelog*. Keep entries short.

## Project

Texora360 is a garments/textile ERP. This repo is the **Development Costing** module (Figma file
*Texora360 v1.01 › Development Costing*): product development, costing sheets with an approval
workflow, sampling/requisitions, quotes, buyer events, a sample gallery, and printable hang tags with
a QR code that opens a public product page for clients.

```
Texora360 v1.01/
├── apps/web/        Next.js frontend (built)
└── services/api/    Go backend (planned, not started)
```

## Stack

| Area | Choice |
|---|---|
| Framework | Next.js 15.5 (App Router), React 19.1, TypeScript 5 |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`), `clsx` + `tailwind-merge` via `cn()` |
| Font | Inter via `next/font/google` |
| Charts | `recharts` (dashboard) |
| QR | `qrcode.react` (hang tags) |
| Icons | Figma-exported SVG/PNG in `public/figma/`, `lucide-react` for extras |
| Installed, not yet used | `react-hook-form`, `zod`, `@hookform/resolvers`, `@tanstack/react-table` |
| Package manager | **pnpm** (`apps/web/pnpm-lock.yaml`) |
| Backend (planned) | Go REST API |

### Commands (run in `apps/web`)

```bash
pnpm install
pnpm dev      # http://localhost:3000 (also auto-starts via VS Code task "web: dev")
pnpm build
pnpm lint
```

## Decisions

1. **Monorepo layout** – `apps/web` for the frontend, `services/api` reserved for the Go backend.
2. **Figma is the source of truth** – layout, spacing, colours and assets match the Figma page.
   Design tokens (colours, shadow) live in `globals.css` `@theme`; use those classes
   (`bg-primary`, `text-grey-800`, `bg-page`, `shadow-e1`, …) instead of raw hex values.
3. **Single data-access layer** – pages read data only through `src/lib/api.ts`. While
   `NEXT_PUBLIC_API_URL` is unset it returns Figma sample data from `src/lib/mock-data.ts`; when set,
   the same functions `fetch` the Go API (`cache: "no-store"`, `credentials: "include"`).
   JSON shapes are defined in `src/lib/types.ts` – this is the contract the Go API must follow.
4. **No business calculations in the frontend** – COGS, CM, EPM, totals, P&L and feasibility numbers
   come from the API; the UI only displays them.
5. **Server pages, client views** – each route's `page.tsx` is an async Server Component that loads
   data via `api` and passes it to a `"use client"` view component (`*-view.tsx`, `*-list.tsx`)
   that owns interactivity and modals.
6. **Route groups** – `(app)` routes share `AppShell` (sidebar + header). `login`, `hang-tag/print`
   and the public `p/[slug]` page sit outside it.
7. **Monochrome icons via CSS mask** – `<Icon src=…>` renders Figma SVGs with `.icon-mask` so they
   follow `currentColor`.
8. **Shared UI kit** in `src/components/ui/` (Button/ButtonLink variants, Badge, Field/Input, Modal,
   Menu, Pagination, Table). Reuse these before adding new primitives.
9. **Printing** – hang tags are 6×12 cm, printed via the browser (`@media print`, `.no-print`).
10. **Auth** – login screen is a placeholder (not in Figma); it will call `POST /auth/login` on the
    Go API.
11. Path alias `@/*` → `apps/web/src/*`. Sidebar collapsed state is kept in `localStorage`.

## What has been built

Frontend (`apps/web`), all on mock data:

| Route | Screen |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Development dashboard (stats, charts, world map) |
| `/development` | Development Costing list + Add Development modal |
| `/development/[id]` | Costing sheet – Draft / Pending / Reviewed / Approved, cost sections, overview cards, summary & activity, comments panel, item add/details modals, print |
| `/development/[id]?inquiries=1` | Inquiry List on the costing sheet |
| `/development/[id]/feasibility` | Feasibility report |
| `/development/[id]/visitors` | Visitors list |
| `/requisition-sample` | Requisition list + details modal |
| `/quotes` | Quote list + Email List modal |
| `/events` | Events + Add Event |
| `/gallery` | Sample gallery |
| `/hang-tag`, `/hang-tag/print?ids=` | Hang tag list, single/bulk print with QR |
| `/p/[slug]` | Public client product view (opened from hang-tag QR) |
| `/settings` | Development settings (master data) |
| `/login` | Sign-in placeholder |

Not built yet: Go API, real auth, persisting form submissions (modals don't save anywhere yet).

## Changelog

- **2026-10-24** – Initial Development Costing frontend (Next.js 15 + Tailwind) from Figma, on mock data.
- **2026-10-27** – Added this CLAUDE.md.
- **2026-10-27** – Fixed hydration error caused by browser extensions (Grammarly/ColorZilla) adding attributes to `<body>`: `suppressHydrationWarning` on `<body>` in `src/app/layout.tsx`.
