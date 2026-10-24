"use client";

import { Chip } from "@/components/ui/badge";
import { Card } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { num, price, usd } from "@/lib/format";
import type { CostCategory, CostItem, CostSectionSummary, Operation } from "@/lib/types";
import { ChevronUp, Plus } from "lucide-react";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { sectionMeta } from "./columns";

function SectionCard({ title, chips, onAdd, children }: { title: string; chips?: ReactNode; onAdd?: () => void; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 px-3 py-3">
        {onAdd && (
          <button onClick={onAdd} aria-label={`Add to ${title}`} className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Plus size={20} strokeWidth={2.5} />
          </button>
        )}
        <h2 className="text-[16px] font-medium whitespace-nowrap text-grey-900">{title}</h2>
        <div className="flex flex-wrap gap-1.5">{chips}</div>
        <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Collapse" : "Expand"} className="ml-auto rounded p-1 hover:bg-page">
          <ChevronUp size={18} className={cn("fill-grey-900 transition-transform", !open && "rotate-180")} />
        </button>
      </div>
      {open && <div className="overflow-x-auto">{children}</div>}
    </Card>
  );
}

const th = "h-10 border-l border-line px-2 font-medium whitespace-nowrap first:border-l-0";
const td = "h-12 border-l border-line px-2 first:border-l-0";

export function OperationsSection({ rows, onAdd }: { rows: Operation[]; onAdd?: () => void }) {
  return (
    <SectionCard title="Operational Breakdown:" onAdd={onAdd}>
      <table className="w-full border-collapse text-center text-[13px] text-grey-800">
        <thead className="bg-table-head">
          <tr>
            {["Department", "Product Type", "Item Name", "SMV", "MC/Line", "Efficiency %", "Required Day", "Avg. Production/Line", "EPM", "CM", "Revenue Per MC"].map((h) => (
              <th key={h} className={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-line">
              <td className={td}>{r.department}</td>
              <td className={td}>{r.productType}</td>
              <td className={td}>{r.itemName}</td>
              <td className={td}>{r.smv.toFixed(2)}</td>
              <td className={td}>{r.mcPerLine}</td>
              <td className={td}>{r.efficiencyPct}%</td>
              <td className={td}>{r.requiredDay}</td>
              <td className={td}>{num(r.avgProductionPerLine)} pcs</td>
              <td className={td}>{usd(r.epm)}</td>
              <td className={td}>${r.cm} ({r.cmPct}%)</td>
              <td className={td}>{usd(r.revenuePerMc)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

export function CostItemSection({
  category,
  items,
  summary,
  onAdd,
  onOpenItem,
}: {
  category: CostCategory;
  items: CostItem[];
  summary: CostSectionSummary;
  onAdd?: () => void;
  onOpenItem: (item: CostItem) => void;
}) {
  const meta = sectionMeta[category];
  const chips = (
    <>
      <Chip tone="rose">Single Unit Price: {usd(summary.singleUnitPrice)}</Chip>
      <Chip tone="amber">Avg Mat Price: {usd(summary.avgMatPrice)}</Chip>
      <Chip tone="lime">Total Qty: {summary.totalQty}</Chip>
      <Chip tone="teal">Total Cost: {usd(summary.totalCost)}</Chip>
      <Chip tone="green">Cost: {summary.costPct}%</Chip>
      <Chip tone="indigo">P&amp;L: {usd(summary.pnl)}</Chip>
    </>
  );
  return (
    <SectionCard title={meta.title} chips={chips} onAdd={onAdd}>
      <table className="w-full border-collapse text-center text-[13px] text-grey-800">
        <thead className="bg-table-head">
          <tr>
            {["USN Code", meta.nameHeader, meta.imageHeader, "Source", "Wastage", "Required Quantity", "Price", meta.valueHeader, "P&L"].map((h) => (
              <th key={h} className={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-t border-line">
              <td className={td}>
                <button onClick={() => onOpenItem(it)} className="text-primary hover:underline">{it.usnCode}</button>
              </td>
              <td className={td}>{it.name}</td>
              <td className={td}>
                {it.image && <Image src={it.image} alt={it.name} width={20} height={20} className="mx-auto size-5 rounded-[2px] object-cover" />}
              </td>
              <td className={td}>{it.source}</td>
              <td className={td}>{it.wastagePct}%</td>
              <td className={td}>{num(it.requiredQty)}{it.unit === "y" ? "y" : ` ${it.unit}`}</td>
              <td className={td}>{category === "finishing_trim" || category === "value_addition" ? usd(it.price, 4) : price(it.price)}</td>
              <td className={td}>{usd(it.totalValue)}</td>
              <td className={td}>{usd(it.pnl)}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={9} className="py-6 text-grey-500">No item added yet</td></tr>
          )}
        </tbody>
      </table>
    </SectionCard>
  );
}
