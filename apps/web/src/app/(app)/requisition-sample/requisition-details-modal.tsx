"use client";

import { CommentsPanel } from "@/components/comments-panel";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { RequisitionDetail } from "@/lib/types";
import { Download, FileText, MessageSquareText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function MiniTable({ title, nameHeader, rows }: { title: string; nameHeader: string; rows: { name: string; physical: boolean }[] }) {
  return (
    <div className="rounded-[6px] p-3 shadow-e1">
      <p className="mb-3 text-[13px] font-medium text-grey-900">{title}</p>
      <table className="w-full text-[13px] text-grey-800">
        <thead className="bg-table-head">
          <tr>
            <th className="h-9 w-12 px-3 text-left font-medium">#</th>
            <th className="border-l border-line font-medium">{nameHeader}</th>
            <th className="w-[130px] border-l border-line font-medium">Physical Sample</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className="h-9 border-t border-line">
              <td className="px-3">{i + 1}</td>
              <td className="border-l border-line text-center">{r.name}</td>
              <td className="border-l border-line text-center">{r.physical ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RequisitionDetailsModal({ detail, onClose, onReceived }: { detail: RequisitionDetail | null; onClose: () => void; onReceived: (id: string) => void }) {
  const [comments, setComments] = useState(false);
  if (!detail) return null;
  const totals = detail.sizes.map((_, i) => detail.sizeBreakdown.reduce((s, r) => s + r.qty[i], 0));
  const info: [string, string][] = [
    ["Buyer", detail.buyer],
    ["Style", detail.style],
    ["Requisition Qty", `${detail.qty} PCs`],
    ["No. of Color", String(detail.colors)],
    ["Season", detail.season],
    ["Physical Sample", detail.physicalSample ? "Yes" : "No"],
    ["Sample Type", detail.sampleType],
    ["Wash Type", detail.washType],
  ];

  return (
    <Modal
      open
      onClose={onClose}
      style={{ maxWidth: comments ? 1540 : 1200 }}
      title={<>Requisition Development Details <StatusBadge status={detail.status} className="min-w-0 py-1" /></>}
      actions={
        <button aria-label="Comments" className="relative" onClick={() => setComments((c) => !c)}>
          <MessageSquareText size={20} />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-danger-strong" />
        </button>
      }
    >
      <div className="flex gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap gap-6">
            <Image src={detail.image} alt={detail.style} width={275} height={335} className="h-[335px] w-[275px] rounded-[6px] bg-[#9fb0b3] object-cover" />
            <div className="min-w-[300px] flex-1 space-y-5">
              <div className="grid grid-cols-3 gap-5">
                {info.map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[14px] text-grey-600">{k}:</p>
                    <p className="text-[16px] font-medium text-grey-900">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[14px] text-grey-600">Note:</p>
                <p className="text-[14px] text-grey-900">{detail.note}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <MiniTable title="Name of Fabric" nameHeader="Fabric Name" rows={detail.fabrics} />
            <MiniTable title="Name of Stitching Trims" nameHeader="Stitching Trims Name" rows={detail.stitchingTrims} />
            <MiniTable title="Name of Packing Trims" nameHeader="Packing Trims Name" rows={detail.packingTrims} />
            <div className="space-y-3 rounded-[6px] p-3 shadow-e1">
              {detail.files.map((f) => (
                <div key={f.label}>
                  <p className="mb-2 text-[12px] font-medium text-grey-900">{f.label}</p>
                  <div className="flex items-center gap-3 rounded-[6px] border border-border bg-grey-100 px-3 py-2">
                    <FileText size={26} className="text-danger" />
                    <div className="flex-1 text-[12px]">
                      <p className="text-grey-900">{f.name}</p>
                      <p className="text-grey-500">{f.size}</p>
                    </div>
                    <button aria-label={`Download ${f.label}`} className="text-primary"><Download size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[6px] p-3 shadow-e1">
            <p className="mb-3 text-[12px] font-medium text-grey-900">Sample Size</p>
            <table className="w-full text-center text-[13px] text-grey-800">
              <thead className="bg-[#e7e7e7]">
                <tr>
                  <th rowSpan={2} className="w-[170px] font-medium">Color</th>
                  <th colSpan={detail.sizes.length} className="h-8 border-l border-white font-medium">Size</th>
                </tr>
                <tr className="bg-table-head">
                  {detail.sizes.map((s) => (
                    <th key={s} className="h-8 border-l border-line font-normal">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail.sizeBreakdown.map((r) => (
                  <tr key={r.color} className="h-10 border-t border-line">
                    <td>{r.color}</td>
                    {r.qty.map((q, i) => (
                      <td key={i} className="border-l border-line">{q}</td>
                    ))}
                  </tr>
                ))}
                <tr className="h-10 border-t border-line bg-grey-100">
                  <td>Total</td>
                  {totals.map((t, i) => (
                    <td key={i} className="border-l border-line">{t}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="w-[170px]" onClick={() => onReceived(detail.id)}>Received</Button>
          </div>
        </div>
        {comments && <CommentsPanel initial={[]} onClose={() => setComments(false)} />}
      </div>
    </Modal>
  );
}
