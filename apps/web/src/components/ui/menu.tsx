"use client";

import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icon";

function useOutsideClose(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && close();
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, close]);
  return ref;
}

export type MenuItem = { label: string; onSelect: () => void; danger?: boolean };

/** Kebab (⋮) row action menu from the Development list. */
export function RowMenu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative inline-flex">
      <button aria-label="Actions" onClick={() => setOpen((o) => !o)} className="rounded p-1 hover:bg-grey-100">
        <Icon src="/figma/dots-vertical.svg" size={24} className="text-ink" />
      </button>
      {open && (
        <div className="absolute top-full right-0 z-30 mt-1 w-[190px] overflow-hidden rounded-[8px] bg-white py-1 text-left shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={() => {
                setOpen(false);
                it.onSelect();
              }}
              className={cn("block w-full px-4 py-2.5 text-left text-[14px] font-medium hover:bg-page", it.danger ? "text-danger" : "text-grey-900")}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Grey dropdown filter button used in page headers (Factory / Buyer / Style …). */
export function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-[46px] items-center gap-3 rounded-[6px] border border-border px-4 text-[14px] font-medium text-grey-900",
          value ? "bg-primary-soft border-primary/40" : "bg-grey-100",
        )}
      >
        <span className="max-w-[140px] truncate">{value ?? label}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute top-full right-0 z-30 mt-1 max-h-72 w-[220px] overflow-y-auto rounded-[8px] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                onChange(o === value ? null : o);
                setOpen(false);
              }}
              className={cn("block w-full truncate px-4 py-2 text-left text-[14px] hover:bg-page", o === value && "font-semibold text-primary")}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Popover({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && <div className="absolute top-full right-0 z-30 mt-1">{children}</div>}
    </div>
  );
}
