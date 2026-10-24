# Texora360 – Development Costing

Monorepo for the Development Costing module (Figma: *Texora360 v1.01 › Development Costing*).

```
texora360/
├── apps/web/        Next.js 15 frontend (this phase)
└── services/api/    Go backend (next phase)
```

## Run the frontend

```bash
cd apps/web
pnpm install
pnpm dev            # http://localhost:3000
```

## Pages

| Route | Screen |
|---|---|
| `/dashboard` | Development Dashboard |
| `/development` | Development Costing list + Add Development modal |
| `/development/[id]` | Costing sheet (Draft / Pending / Reviewed / Approved), all Add & Details modals |
| `/development/[id]/feasibility` | Feasibility Report |
| `/development/[id]/visitors` | Visitors List (`?inquiries=1` on the costing sheet opens the Inquiry List) |
| `/requisition-sample` | Requisition list + details modal |
| `/quotes` | Quote List + Email List modal |
| `/events` | Events + Add Event |
| `/gallery` | Sample Gallery |
| `/hang-tag`, `/hang-tag/print?ids=` | Print / Bulk Print Hang Tag, printable 6×12 cm tags with QR |
| `/p/[style]` | Public Client View (opened from the hang-tag QR code) |
| `/settings` | Development Settings (master data) |
| `/login` | Sign in |

## Connecting the Go API

All data goes through `apps/web/src/lib/api.ts`. While `NEXT_PUBLIC_API_URL` is unset it returns the
Figma sample data from `src/lib/mock-data.ts`. Set it (e.g. `http://localhost:8080/api`) and the same
functions call the API; the JSON shapes are defined in `src/lib/types.ts`.

Costing numbers (COGS, CM, EPM, totals, P&L, feasibility) are **not** calculated in the frontend; the
API must return them.
