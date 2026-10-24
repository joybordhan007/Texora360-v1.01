"use client";

import { Card } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { usd } from "@/lib/format";
import type { ActivityStep, CostingSummaryPhase } from "@/lib/types";
import { CalendarClock, ChevronDown, ClipboardList, Package, PackageCheck, Ruler, Shirt, Truck, User } from "lucide-react";
import { useState } from "react";

export function CostingSummary({ phases }: { phases: CostingSummaryPhase[] }) {
  const [open, setOpen] = useState(true);
  return (
    <Card>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-3 py-3 text-[16px] font-medium text-grey-900">
        Costing Summary:
        <ChevronDown size={18} className={cn("transition-transform", !open && "-rotate-90")} />
      </button>
      {open && (
        <div className="flex flex-wrap gap-4 px-3 pb-4">
          {phases.map((p) => {
            const rows: [string, string, boolean?][] = [
              ["Total Order Value", usd(p.totalOrderValue)],
              ["COGS", usd(p.cogs)],
              ["Commercial & Interest", usd(p.commercialInterest)],
              ["Buying Commission", usd(p.buyingCommission)],
              ["CM", usd(p.cm)],
              ["Per Pcs CM", usd(p.perPcsCm)],
              ["MC Earning/Day", usd(p.mcEarningPerDay), true],
              ["MC Earning/Month", usd(p.mcEarningPerMonth), true],
              ["Planned Line", String(p.plannedLine)],
              ["Planned Machine", String(p.plannedMachine)],
            ];
            return (
              <div key={p.name} className="w-full max-w-[370px] overflow-hidden rounded-[6px] border border-border text-[13px]">
                <div className="bg-table-head px-3 py-2.5 font-medium text-grey-900">{p.name}</div>
                {rows.map(([label, value, red]) => (
                  <div key={label} className="grid grid-cols-2 border-t border-line">
                    <span className="px-3 py-2 text-grey-700">{label}</span>
                    <span className={cn("border-l border-line px-3 py-2 font-medium", red ? "text-danger" : "text-grey-900")}>{value}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

const stepIcons = [User, CalendarClock, Shirt, Ruler, Package, Truck, ClipboardList, PackageCheck];

export function CostingActivity({ steps }: { steps: ActivityStep[] }) {
  const doneCount = steps.filter((s) => s.done).length;
  return (
    <Card className="px-4 pt-3 pb-5">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[16px] font-medium text-grey-900">Costing Activity</h3>
        <button className="text-[13px] font-medium text-primary">View All</button>
      </div>
      <div className="overflow-x-auto">
        <div className="relative min-w-[900px]">
          <div className="absolute top-[14px] right-[6%] left-0 h-0.5 bg-grey-100" />
          <div className="absolute top-[14px] left-0 h-0.5 bg-teal" style={{ width: `${(doneCount / steps.length) * 6}%` }} />
          <span className="absolute top-[10px] left-0 size-2.5 rounded-full bg-teal" />
          <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
            {steps.map((s, i) => {
              const StepIcon = stepIcons[i % stepIcons.length];
              return (
                <li key={s.label} className="flex flex-col items-center gap-3 text-center">
                  <span className={cn("flex size-7 items-center justify-center rounded-full border bg-white", s.done ? "border-teal text-teal" : "border-border text-grey-600")}>
                    <StepIcon size={14} />
                  </span>
                  <div className="text-[12px] leading-snug">
                    <p className="font-medium text-grey-900">{s.label}</p>
                    <p className="text-grey-600">{s.by}</p>
                    <p className="text-grey-600">{s.at}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Card>
  );
}
