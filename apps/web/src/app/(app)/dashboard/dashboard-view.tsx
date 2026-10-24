"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { FilterDropdown } from "@/components/ui/menu";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import { usd } from "@/lib/format";
import type { DashboardData } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const filterDefs = [
  { key: "factory", label: "Factory", options: ["Stellar Unit 1", "Stellar Unit 2", "Stellar Washing"] },
  { key: "buyer", label: "Buyer", options: ["Redtape", "Bluewave", "Greenfield", "Yellowstone", "Blackstone"] },
  { key: "style", label: "Style", options: ["AFG-LW CK86", "AFG-LW CK87", "AFG-LW CK88"] },
  { key: "item", label: "Item Name", options: ["Shirt", "Denim pant", "Chino Pant", "Ladies Dress"] },
  { key: "event", label: "Event Name", options: ["13th International Yarn & Fabrics Show - 2026", "Dhaka International Trade Fair"] },
];

function RangeSelect() {
  return (
    <button className="flex items-center gap-2 rounded-[4px] border border-border bg-grey-100 px-2.5 py-1 text-[13px] font-medium text-grey-900">
      last 7 Days <ChevronDown size={14} />
    </button>
  );
}

function PanelTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[16px] font-medium text-grey-900">{children}</h2>
      {right}
    </div>
  );
}

export function DashboardView({ data }: { data: DashboardData }) {
  const [filters, setFilters] = useState<Record<string, string | null>>({});
  const total = data.categories.reduce((s, c) => s + c.count, 0);

  return (
    <>
      <PageHeader title="Development Dashboard" crumbs={[{ label: "Joybordhan Sarkar. Product Developer" }]}>
        {filterDefs.map((f) => (
          <FilterDropdown key={f.key} label={f.label} options={f.options} value={filters[f.key] ?? null} onChange={(v) => setFilters({ ...filters, [f.key]: v })} />
        ))}
        <button onClick={() => setFilters({})} className="px-2 text-[14px] font-medium text-primary">Clear filters</button>
      </PageHeader>

      <PageBody>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {data.kpis.map((k) => (
            <Card key={k.label} className="flex flex-col gap-2 px-6 py-6">
              <span className="text-[14px] font-medium text-grey-800">{k.label}</span>
              <span className="text-[20px] font-semibold text-grey-900">{k.value}</span>
            </Card>
          ))}
        </div>

        <Card>
          <div className="flex items-center justify-between px-4 py-4">
            <h2 className="text-[16px] font-medium text-grey-900">Development List</h2>
            <Link href="/development" className="text-[13px] font-medium text-grey-900 hover:text-primary">View All</Link>
          </div>
          <Table className="text-[13px]">
            <THead>
              <tr>
                {["DN", "Buyer", "Style", "Fabric", "Fabric YY", "Fabric Price", "FOB", "EPM"].map((h) => (
                  <Th key={h} className="border-l-0">{h}</Th>
                ))}
              </tr>
            </THead>
            <tbody>
              {data.developments.map((d) => (
                <Tr key={d.dn}>
                  <Td className="border-l-0">{d.dn}</Td>
                  <Td className="border-l-0">{d.buyer}</Td>
                  <Td className="border-l-0">{d.style}</Td>
                  <Td className="border-l-0">{d.fabric}</Td>
                  <Td className="border-l-0">{d.fabricYY}</Td>
                  <Td className="border-l-0">{usd(d.fabricPrice)}</Td>
                  <Td className="border-l-0">{usd(d.fob)}</Td>
                  <Td className="border-l-0">{usd(d.epm)}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="p-4">
            <PanelTitle right={<RangeSelect />}>Visitors Trend</PanelTitle>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.visitorsTrend} margin={{ left: -18, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b7cf6" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#8b7cf6" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#666" }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis domain={[90, 100]} ticks={[90, 92, 94, 96, 98, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: "#666" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Visitors"]} />
                  <Area isAnimationActive={false} type="linear" dataKey="value" stroke="#8b7cf6" strokeWidth={1.5} fill="url(#visitors)" dot={{ r: 3, fill: "white", stroke: "#8b7cf6" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <PanelTitle right={<RangeSelect />}>Fabric Interest</PanelTitle>
            <div className="flex flex-col gap-5 pt-1">
              {data.fabricInterest.map((f) => (
                <div key={f.name} className="grid grid-cols-[80px_1fr_40px] items-center gap-4 text-[13px] text-grey-900">
                  <span>{f.name}</span>
                  <div className="h-5 border-l border-grey-300">
                    <div className="h-full rounded-r-full" style={{ width: `${f.pct}%`, background: f.color }} />
                  </div>
                  <span className="text-right text-grey-600">{f.pct}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-[2fr_3fr]">
          <Card className="p-4">
            <PanelTitle>Category Development Overview</PanelTitle>
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative size-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie isAnimationActive={false} data={data.categories} dataKey="count" innerRadius={78} outerRadius={112} startAngle={90} endAngle={-270} stroke="white" strokeWidth={3}>
                      {data.categories.map((c) => (
                        <Cell key={c.name} fill={c.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[16px] text-grey-900">Total</span>
                  <span className="text-[16px] font-medium text-grey-900">{total}</span>
                  <span className="text-[11px] text-grey-500">Style</span>
                </div>
              </div>
              <ul className="flex min-w-[200px] flex-1 flex-col gap-4 text-[12px]">
                {data.categories.map((c) => (
                  <li key={c.name} className="flex items-center gap-2 text-grey-600">
                    <span className="size-2.5 rounded-full" style={{ background: c.color }} />
                    <span className="flex-1">{c.name}</span>
                    <span>{c.count} ({c.pct}%)</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="flex flex-wrap justify-between gap-6 p-4">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <h2 className="text-[20px] font-semibold text-grey-900">Users by Country</h2>
              <WorldMap />
            </div>
            <div className="flex w-full flex-col gap-6 sm:w-[330px]">
              <div className="flex items-center justify-between text-[#444]">
                <span className="text-[14px] font-semibold">Top Countries</span>
                <span className="text-[11px] font-medium">%</span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4">
                {data.countries.map((c) => (
                  <div key={c.name} className="flex flex-col gap-3">
                    <div className="flex justify-between text-[14px] font-semibold text-grey-600">
                      <span>{c.name}</span>
                      <span>{c.pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-[3px] bg-[#bad9ff]">
                      <div className="h-full rounded-[3px] bg-primary" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </PageBody>
    </>
  );
}

/** World map image with the highlighted regions overlaid at their Figma positions (500×304 artboard). */
function WorldMap() {
  const overlays: [string, number, number, number, number][] = [
    ["/figma/map/americas.svg", 2.5, 79.9, 153.221, 111.564],
    ["/figma/map/africa.svg", 208.5, 148.1, 95.5, 108.641],
    ["/figma/map/australia.svg", 389, 218.26, 56, 39.462],
    ["/figma/map/uk.svg", 357.5, 36.54, 21.5, 13.641],
  ];
  return (
    <div className="relative aspect-[500/304] w-full max-w-[500px]">
      <img src="/figma/map/world.png" alt="World map" className="absolute inset-0 size-full object-bottom" />
      {overlays.map(([src, x, y, w, h]) => (
        <img key={src} src={src} alt="" className="absolute" style={{ left: `${(x / 500) * 100}%`, top: `${(y / 304) * 100}%`, width: `${(w / 500) * 100}%`, height: `${(h / 304) * 100}%` }} />
      ))}
    </div>
  );
}
