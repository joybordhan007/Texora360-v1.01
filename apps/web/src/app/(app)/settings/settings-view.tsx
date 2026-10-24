"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { Trash2 } from "lucide-react";
import { useState } from "react";

// Not designed in Figma yet: master data lists that feed every dropdown in the costing screens.
const labels: Record<string, string> = {
  buyers: "Buyers",
  departments: "Departments",
  productTypes: "Product Types",
  seasons: "Seasons",
  fabricCategories: "Fabric Categories",
  fabricTypes: "Fabric Types",
  dyeTypes: "Dye Types",
  finishTypes: "Finish Types",
  trimCategories: "Trim Categories",
  trimTypes: "Trim Types",
  constructions: "Constructions",
  uoms: "Units (UOM)",
  sources: "Sources",
  suppliers: "Develop Suppliers",
  paymentTerms: "Payment Terms",
};

export function SettingsView({ initial }: { initial: Record<string, string[]> }) {
  const [data, setData] = useState(initial);
  const [tab, setTab] = useState(Object.keys(initial)[0]);
  const [value, setValue] = useState("");
  const items = data[tab] ?? [];

  const add = () => {
    const v = value.trim();
    if (!v || items.includes(v)) return;
    setData({ ...data, [tab]: [...items, v] });
    setValue("");
  };

  return (
    <>
      <PageHeader title="Development Settings" crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Development Settings" }]} />
      <PageBody>
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <Card className="h-fit p-2">
            {Object.keys(data).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={cn("flex w-full items-center justify-between rounded-[6px] px-3 py-2.5 text-left text-[14px] font-medium", k === tab ? "bg-primary text-white" : "text-grey-900 hover:bg-page")}
              >
                {labels[k] ?? k}
                <span className={cn("text-[12px]", k === tab ? "text-white/80" : "text-grey-500")}>{data[k].length}</span>
              </button>
            ))}
          </Card>
          <Card>
            <form className="flex flex-wrap items-center gap-3 p-4" onSubmit={(e) => { e.preventDefault(); add(); }}>
              <h2 className="mr-auto text-[18px] font-medium text-grey-900">{labels[tab] ?? tab}</h2>
              <Input className="w-[280px]" placeholder={`New ${(labels[tab] ?? tab).toLowerCase()}`} value={value} onChange={(e) => setValue(e.target.value)} />
              <Button type="submit">Add</Button>
            </form>
            <Table>
              <THead>
                <tr>
                  <Th className="w-[60px]">#</Th>
                  <Th className="text-left">Name</Th>
                  <Th className="w-[100px]">Action</Th>
                </tr>
              </THead>
              <tbody>
                {items.map((it, i) => (
                  <Tr key={it}>
                    <Td>{i + 1}</Td>
                    <Td className="text-left">{it}</Td>
                    <Td>
                      <button aria-label={`Delete ${it}`} onClick={() => setData({ ...data, [tab]: items.filter((x) => x !== it) })} className="text-danger">
                        <Trash2 size={18} />
                      </button>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </PageBody>
    </>
  );
}
