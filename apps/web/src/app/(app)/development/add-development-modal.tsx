"use client";

import { AddRowTitle } from "@/components/grid-form";
import { Button } from "@/components/ui/button";
import { CellInput, CellSelect } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { Download, Plus, Save, UploadCloud } from "lucide-react";
import { useState } from "react";

export type NewDevelopment = {
  buyer: string;
  style: string;
  purpose: string;
  quantity: string;
  color: string;
  sizes: Record<string, string>;
  sampleQty: string;
  season: string;
};

const blank = (): NewDevelopment => ({ buyer: "", style: "", purpose: "", quantity: "", color: "", sizes: {}, sampleQty: "", season: "" });
const th = "h-9 border-l border-line px-2 font-medium whitespace-nowrap first:border-l-0";

export function AddDevelopmentModal({
  open,
  onClose,
  onSubmit,
  buyers,
  seasons,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (rows: NewDevelopment[]) => void;
  buyers: string[];
  seasons: string[];
}) {
  const [rows, setRows] = useState<NewDevelopment[]>([blank()]);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L"]);
  const set = (i: number, patch: Partial<NewDevelopment>) => setRows(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const addSize = () => {
    const name = prompt("Size name (e.g. XL)")?.trim();
    if (name && !sizes.includes(name)) setSizes([...sizes, name]);
  };
  const close = () => {
    setRows([blank()]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={<AddRowTitle onAdd={() => setRows([...rows, blank()])}>Add Development Costing</AddRowTitle>}
      actions={
        <>
          <Button variant="soft" size="sm"><span>Export Excel Template</span><Download size={16} /></Button>
          <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[6px] border border-border bg-grey-100 px-3 text-[13px] font-medium text-grey-900 hover:bg-[#e4e4e4]">
            Upload Excel File <UploadCloud size={16} />
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
          </label>
          <Button variant="soft" size="sm" onClick={close}>Draft Save <Save size={16} /></Button>
        </>
      }
    >
      <div className="overflow-x-auto rounded-[6px] border border-border">
        <table className="w-full border-collapse text-[13px] text-grey-800">
          <thead className="bg-table-head">
            <tr className="border-b border-line">
              <th rowSpan={2} className={th}>SL</th>
              <th rowSpan={2} className={th}>Buyer Name</th>
              <th rowSpan={2} className={th}>Style Number</th>
              <th rowSpan={2} className={th}>Purpose</th>
              <th rowSpan={2} className={th}>Quantity <span className="text-[10px]">(PCs)</span></th>
              <th rowSpan={2} className={th}>
                <span className="inline-flex items-center gap-1">Color <Plus size={14} className="rounded-full bg-primary text-white" /></span>
              </th>
              <th colSpan={sizes.length} className={`${th} bg-[#ececec]`}>
                <span className="relative block">
                  Size
                  <button onClick={addSize} aria-label="Add size" className="absolute top-0 right-0 rounded-full bg-primary text-white">
                    <Plus size={14} />
                  </button>
                </span>
              </th>
              <th rowSpan={2} className={th}>Sample Qty <span className="text-[10px]">(PCs)</span></th>
              <th rowSpan={2} className={th}>Season</th>
            </tr>
            <tr className="border-b border-line bg-[#ececec]">
              {sizes.map((s) => (
                <th key={s} className="h-8 min-w-[70px] border-l border-line px-2 font-medium">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="h-10 border-b border-line last:border-b-0">
                <td className="px-2 text-right">{i + 1}</td>
                <td className="border-l border-line p-0">
                  <CellSelect options={buyers} placeholder="Enter or select a buyer" value={r.buyer} onChange={(e) => set(i, { buyer: e.target.value })} />
                </td>
                <td className="border-l border-line p-0"><CellInput placeholder="Enter your style number" value={r.style} onChange={(e) => set(i, { style: e.target.value })} /></td>
                <td className="border-l border-line p-0"><CellInput placeholder="Enter purpose" value={r.purpose} onChange={(e) => set(i, { purpose: e.target.value })} /></td>
                <td className="border-l border-line p-0"><CellInput type="number" placeholder="Enter Quantity" value={r.quantity} onChange={(e) => set(i, { quantity: e.target.value })} /></td>
                <td className="border-l border-line p-0"><CellInput placeholder="Enter a color name" value={r.color} onChange={(e) => set(i, { color: e.target.value })} /></td>
                {sizes.map((s) => (
                  <td key={s} className="border-l border-line p-0">
                    <CellInput type="number" className="min-w-[70px]" placeholder={`Enter ${s}`} value={r.sizes[s] ?? ""} onChange={(e) => set(i, { sizes: { ...r.sizes, [s]: e.target.value } })} />
                  </td>
                ))}
                <td className="border-l border-line p-0"><CellInput type="number" placeholder="Enter sample qty" value={r.sampleQty} onChange={(e) => set(i, { sampleQty: e.target.value })} /></td>
                <td className="border-l border-line p-0">
                  <CellSelect options={seasons} placeholder="Select a season" value={r.season} onChange={(e) => set(i, { season: e.target.value })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center pt-4">
        <Button size="lg" className="w-[176px]" onClick={() => onSubmit(rows.filter((r) => r.buyer || r.style))}>Submit</Button>
      </div>
    </Modal>
  );
}
