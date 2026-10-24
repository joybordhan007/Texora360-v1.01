"use client";

import { CommentsPanel } from "@/components/comments-panel";
import { StatusBadge } from "@/components/ui/badge";
import { usd } from "@/lib/format";
import type { Comment, CostItem } from "@/lib/types";
import { MessageSquareText, Pencil, Printer, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

type Field = { label: string; value: ReactNode; link?: boolean };

function Delta({ value, tone }: { value: string; tone: "red" | "green" }) {
  return <sup className={tone === "red" ? "text-danger" : "text-success"}>({value})</sup>;
}

function Grid({ title, fields, cols = 5 }: { title: string; fields: Field[]; cols?: number }) {
  return (
    <section className="space-y-3">
      <h4 className="text-[16px] font-medium text-grey-900">{title}</h4>
      <div className="grid gap-x-6 gap-y-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {fields.map((f) => (
          <div key={f.label} className="text-[13px]">
            <p className={f.link ? "text-primary underline" : "text-grey-600"}>{f.label}:</p>
            <p className="font-medium whitespace-pre-line text-grey-900">{f.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Field layout per category follows the Figma "… Details" modals. */
function sectionsFor(item: CostItem): { title: string; fields: Field[]; cols?: number }[] {
  const req: Field[] = [
    { label: "Required Qty", value: "12000" },
    { label: "PI Qty", value: <>15000<Delta value="3000" tone="red" /></> },
    { label: "Received Qty", value: "12000" },
    { label: "Utilize Qty", value: <>10000 Yrd<Delta value="3000" tone="green" /></> },
    { label: "Acceptance Qty", value: "12000 Yrd" },
    { label: "Stock Qty", value: <>2000 Yrd<Delta value="3000" tone="red" /></> },
  ];
  const consumption: Field[] = [
    { label: "Costing Consumption", value: "1.5000y" },
    { label: "Approved Consumption", value: "1.5000y" },
    { label: "Actual Consumption", value: "1.5000y" },
  ];

  if (item.category === "fabric") {
    return [
      { title: "Product Information:", cols: 4, fields: Object.entries(item.attributes ?? {}).map(([label, value]) => ({ label, value })) },
      { title: "Consumption Information:", cols: 4, fields: [{ label: "Costed Consumption (Wastage)", value: <>1.5000y <span className="text-[11px] text-grey-500">({item.wastagePct}%)</span></> }, { label: "Approved Consumption", value: "1.5000y", link: true }, { label: "Actual Consumption", value: "1.5000y" }] },
      { title: "Quantity & Requirement Details:", cols: 5, fields: [{ label: "Costed Qty", value: "12000" }, { label: "Required Qty", value: "12000" }, { label: "PI Qty", value: <>15000<Delta value="3000" tone="red" /></> }, { label: "Supplementary Qty", value: "12000" }, { label: "Received Qty", value: "12000" }, { label: "Utilised Qty", value: <>10000 Yrd<Delta value="3000" tone="green" /></> }, { label: "LC Acceptance", value: "12000 Yrd" }, { label: "Stock Qty", value: <>2000 Yrd<Delta value="3000" tone="red" /></> }] },
      { title: "Pricing Details:", cols: 4, fields: [{ label: "Budget", value: "$1.2" }, { label: "Costed Unit Price", value: "$1.2" }, { label: "Approved", value: "$0.2", link: true }, { label: "PI", value: "$1.5" }] },
      { title: "Value Summary:", cols: 5, fields: [{ label: "Budget", value: "$12000" }, { label: "Costed Amount", value: "$12000" }, { label: "PI", value: "$12000" }, { label: "LC", value: "$12000" }, { label: "LC Acceptance", value: "$12000" }, { label: "P&L", value: "$12000" }] },
    ];
  }
  if (item.category === "value_addition" || item.category === "other_charge") {
    const base: Field[] = [
      { label: "Item Name", value: item.name },
      { label: "Description", value: "58*33 CM" },
      { label: "Source", value: item.source },
      { label: "UM", value: "PC" },
    ];
    const extra: Field[] =
      item.category === "value_addition"
        ? [{ label: "Wastage", value: `${item.wastagePct}%` }, { label: "Consumption", value: "0.200 PC" }, { label: "Price", value: usd(item.price, 4) }, { label: "Required Quantity", value: `${item.requiredQty}${item.unit}` }, { label: "Amount", value: usd(item.totalValue) }, { label: "Cost%", value: "0.00%" }]
        : [{ label: "Price", value: usd(item.price, 4) }, { label: "Total", value: usd(item.totalValue) }, { label: "Amount", value: usd(item.totalValue) }];
    return [{ title: "General Information:", cols: 3, fields: [...base, ...extra] }];
  }
  return [
    {
      title: "General Information:",
      cols: 5,
      fields: [
        { label: "Item Name", value: item.name },
        { label: "Category", value: "Fabrics" },
        { label: "Type", value: "Denim Types | Rigid Denim" },
        { label: "Construction", value: "15" },
        { label: "Tex / Finish Type", value: "Mechanical" },
        { label: "UOM", value: "PCs" },
        { label: "Base Unit", value: "PCs" },
        { label: "Consumption/GMT", value: "190.0000m" },
        { label: "GSM", value: "-" },
        { label: "Develop Supplier", value: "Zara" },
        { label: "Source", value: item.source, link: true },
        { label: "Item description", value: "58*33 CM" },
        { label: "Measurement", value: "LENGTH: 28 Inc\nWIDTH: 60 Inc" },
        { label: "Wastage", value: `${item.wastagePct}%` },
        { label: "UM", value: "Yard" },
      ],
    },
    { title: "Consumption Details:", cols: 5, fields: consumption },
    { title: "Requirement Details:", cols: 6, fields: req },
    { title: "Price Details:", cols: 5, fields: [{ label: "Costed Price", value: "$1.2" }, { label: "Approved Price", value: "$0.2" }, { label: "PI Price", value: "$1.5" }] },
    { title: "Value Details:", cols: 5, fields: [{ label: "Costed Value", value: "$12000" }, { label: "PI Value", value: "$12000" }, { label: "LC Value", value: "$12000" }, { label: "Acceptance Value", value: "$12000" }] },
  ];
}

export function ItemDetailsModal({
  item,
  comments,
  editable,
  onClose,
  onDelete,
}: {
  item: CostItem | null;
  comments: Comment[];
  editable: boolean;
  onClose: () => void;
  onDelete: (item: CostItem) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  useEffect(() => setShowComments(item?.category === "fabric"), [item]);
  if (!item) return null;
  const hasImage = item.category !== "value_addition" && item.category !== "other_charge";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 p-4 pt-[60px]" onMouseDown={onClose}>
      <div className="flex w-full max-w-[1250px] overflow-hidden rounded-[8px] bg-white shadow-xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between bg-grey-100 px-4 py-3">
            <p className="flex items-center gap-3 text-[16px] text-grey-700">
              USN Code: <span className="font-medium text-grey-900">{item.usnCode}</span>
              {item.status && <StatusBadge status={item.status} />}
            </p>
            <div className="flex items-center gap-4 text-grey-900">
              <button aria-label="Print" onClick={() => window.print()}><Printer size={18} /></button>
              {editable && <button aria-label="Edit"><Pencil size={18} /></button>}
              {editable && <button aria-label="Delete" onClick={() => onDelete(item)}><Trash2 size={18} /></button>}
              <button aria-label="Comments" className="relative" onClick={() => setShowComments((s) => !s)}>
                <MessageSquareText size={18} />
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-danger-strong" />
              </button>
              <button aria-label="Close" onClick={onClose}><X size={20} /></button>
            </div>
          </div>
          <div className="flex gap-6 p-4">
            <div className="flex-1 space-y-6">
              {sectionsFor(item).map((s) => (
                <Grid key={s.title} {...s} />
              ))}
            </div>
            {hasImage && item.image && (
              <Image src={item.image} alt={item.name} width={75} height={88} className="h-[88px] w-[75px] shrink-0 rounded-[4px] object-cover" />
            )}
          </div>
        </div>
        {showComments && <CommentsPanel initial={comments} onClose={() => setShowComments(false)} />}
      </div>
    </div>
  );
}
