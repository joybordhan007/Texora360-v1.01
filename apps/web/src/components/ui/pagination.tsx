"use client";

import { cn } from "@/lib/cn";

const btn = "flex h-8 min-w-8 items-center justify-center rounded-[4px] px-2.5 text-[14px] font-medium";

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  const nums = pages <= 5 ? Array.from({ length: pages }, (_, i) => i + 1) : [...new Set([1, 2, page, pages].filter((n) => n >= 1 && n <= pages))].sort((a, b) => a - b);
  return (
    <nav className="flex items-center justify-end gap-2 px-4 pt-4 pb-4" aria-label="Pagination">
      <button className={cn(btn, "border border-border text-grey-500 disabled:opacity-60")} disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      {nums.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - nums[i - 1] > 1 && <span className={cn(btn, "text-grey-900")}>...</span>}
          <button
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(btn, n === page ? "bg-ink text-white" : "border border-border text-grey-900 hover:bg-page")}
          >
            {n}
          </button>
        </span>
      ))}
      <button className={cn(btn, "border border-border text-grey-900 disabled:opacity-60")} disabled={page === pages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}

export function paginate<T>(rows: T[], page: number, perPage: number) {
  return { rows: rows.slice((page - 1) * perPage, page * perPage), pages: Math.max(1, Math.ceil(rows.length / perPage)) };
}
