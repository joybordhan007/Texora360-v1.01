"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/field";
import { Card } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { num, usd } from "@/lib/format";
import type { DevelopmentDetail } from "@/lib/types";
import { Download, FileText, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, type ReactNode } from "react";

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line bg-table-head px-3 py-2.5 text-[14px] font-medium text-grey-800">{title}</div>
      <dl className="text-[13px]">{children}</dl>
    </Card>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid min-h-[34px] grid-cols-[1fr_1.4fr] border-b border-line last:border-b-0">
      <dt className="flex items-center px-3 text-grey-600">{label}</dt>
      <dd className="flex items-center gap-3 border-l border-line px-3 font-medium text-grey-900">{children}</dd>
    </div>
  );
}

function MiniInput({ placeholder = "-", className }: { placeholder?: string; className?: string }) {
  return <input placeholder={placeholder} className={cn("h-6 w-[56px] rounded-[4px] border border-border text-center text-[12px] outline-none focus:border-primary", className)} />;
}

export function OverviewCards({ dev, editable, paymentTerms }: { dev: DevelopmentDetail; editable: boolean; paymentTerms: string[] }) {
  const f = dev.financial;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
      <InfoCard title="Production Details">
        <Row label="Buyer">{dev.buyer}</Row>
        <Row label="Style">{dev.style}</Row>
        <Row label="Quantity & Pack">
          <span>{dev.quantity}</span>
          <span className="ml-auto text-grey-600">{dev.pack}</span>
        </Row>
        <Row label="MOQ">{editable ? <MiniInput /> : dev.moq ?? "-"}</Row>
        <Row label="Sample Qty">{dev.sampleQty}</Row>
        <Row label="Season">{dev.season}</Row>
      </InfoCard>

      <InfoCard title="Cost Details">
        <Row label="Revenue Per MC">
          <span className="text-success">{usd(dev.cost.revenuePerMc)}</span>
          <span className="text-grey-300">|</span>
          <span className="text-success">${num(dev.cost.revenuePerMcTotal)}</span>
        </Row>
        <Row label="EPM">{usd(dev.cost.epm)}</Row>
        <Row label="CM">${dev.cost.cm} ({dev.cost.cmPct}%)</Row>
        <Row label="Tech Pack"> </Row>
        {dev.cost.techPack && (
          <div className="p-2">
            <div className="flex items-center gap-2 rounded-[6px] bg-primary-soft px-2 py-1.5">
              <FileText size={18} className="text-danger" />
              <div className="flex-1 leading-tight">
                <p className="text-[12px] font-medium text-grey-900">{dev.cost.techPack.name}</p>
                <p className="text-[10px] text-grey-500">.pdf | {dev.cost.techPack.size}</p>
              </div>
              <button aria-label="Download tech pack" className="rounded bg-primary p-1 text-white"><Download size={14} /></button>
              {editable && <button aria-label="Remove tech pack" className="rounded border border-danger p-1 text-danger"><Trash2 size={14} /></button>}
            </div>
          </div>
        )}
      </InfoCard>

      <InfoCard title="Financial Details">
        <Row label="COGS">
          <span>{usd(f.cogs)}</span>
          <span className="ml-auto">{f.cogsPct}%</span>
        </Row>
        <Row label="Commercial + Finance">
          {editable ? (
            <><span>-</span><span className="text-grey-300">|</span><MiniInput /></>
          ) : (
            <><span>{f.commercialFinance != null ? usd(f.commercialFinance) : "-"}</span><span className="ml-auto">{f.commercialFinancePct ?? "-"}%</span></>
          )}
        </Row>
        <Row label="Buying Commission">
          {editable ? (
            <><span>-</span><span className="text-grey-300">|</span><MiniInput /></>
          ) : (
            <><span>{f.buyingCommission != null ? usd(f.buyingCommission) : "-"}</span><span className="ml-auto">{f.buyingCommissionPct ?? "-"}%</span></>
          )}
        </Row>
        <Row label="Payment Term">
          {editable ? <Select options={paymentTerms} placeholder="-" className="w-full [&_select]:h-7 [&_select]:border-0 [&_select]:px-0" /> : f.paymentTerm ?? "-"}
        </Row>
        <Row label="Dev Type">{dev.devType}</Row>
        <Row label="Requisition by">{f.requisitionBy}</Row>
      </InfoCard>

      <FobCard dev={dev} />
    </div>
  );
}

function FobCard({ dev }: { dev: DevelopmentDetail }) {
  const [slide, setSlide] = useState(0);
  const showConvert = dev.status === "reviewed" || dev.status === "approved";
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex items-center justify-between bg-ink px-3 py-2.5 text-[14px] font-medium text-white">
        <span>FOB</span>
        <span className="flex items-baseline gap-2">
          {dev.fob.previous.map((p) => (
            <span key={p} className="text-[12px] text-white/60 line-through">$ {p.toFixed(2)}</span>
          ))}
          <span>$ {dev.fob.current.toFixed(2)}</span>
        </span>
      </div>
      <div className="relative flex min-h-[180px] flex-1 items-center justify-center p-2">
        <Image src={dev.images[slide]} alt={dev.style} width={220} height={180} className="h-[170px] w-auto object-contain" />
        <a href={dev.images[slide]} download aria-label="Download image" className="absolute top-2 right-2 rounded-[4px] bg-primary p-1.5 text-white">
          <Download size={16} />
        </a>
        <div className="absolute bottom-2 flex gap-1.5">
          {dev.images.map((_, i) => (
            <button key={i} aria-label={`Image ${i + 1}`} onClick={() => setSlide(i)} className={cn("size-1.5 rounded-full", i === slide ? "bg-primary" : "bg-primary/30")} />
          ))}
        </div>
      </div>
      {showConvert && (
        <div className="p-2 pt-0">
          <Button variant="dark" size="sm" className="w-full">Convert to Confirm Order Costing</Button>
        </div>
      )}
    </Card>
  );
}
