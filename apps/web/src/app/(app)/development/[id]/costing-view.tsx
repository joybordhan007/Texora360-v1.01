"use client";

import { GridFormModal, type GridRow } from "@/components/grid-form";
import { PageBody, PageHeader } from "@/components/layout/page-header";
import { PeopleTable } from "@/components/people-table";
import { StatusBadge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Comment, CostCategory, CostItem, DevelopmentDetail, Operation, Visitor } from "@/lib/types";
import { Download, Pencil, Printer } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { addColumns, operationColumns, sectionMeta } from "./columns";
import { CostItemSection, OperationsSection } from "./cost-sections";
import { ItemDetailsModal } from "./item-details-modal";
import { OverviewCards } from "./overview-cards";
import { CostingActivity, CostingSummary } from "./summary-activity";

const categories = Object.keys(sectionMeta) as CostCategory[];

export function CostingView({
  initial,
  master,
  comments,
  inquiries,
}: {
  initial: DevelopmentDetail;
  master: Record<string, string[]>;
  comments: Comment[];
  inquiries: Visitor[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [dev, setDev] = useState(initial);
  const [adding, setAdding] = useState<CostCategory | "operation" | null>(null);
  const [openItem, setOpenItem] = useState<CostItem | null>(null);
  const editable = dev.status === "draft";
  const cols = addColumns(master);

  // Rows from the add modals are stored as-is; prices/values will be computed by the Go API.
  const addItems = (category: CostCategory, rows: GridRow[]) => {
    const fresh: CostItem[] = rows
      .filter((r) => Object.values(r).some(Boolean))
      .map((r) => ({
        id: crypto.randomUUID(),
        category,
        usnCode: "NEW-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        name: r.itemName || r.fiberComposition || "New item",
        source: (r.source as CostItem["source"]) || "Nominated",
        wastagePct: Number(r.wastage) || 0,
        requiredQty: 0,
        unit: r.unit || r.uom || r.um || "pcs",
        price: Number(r.price) || 0,
        totalValue: 0,
        pnl: 0,
      }));
    setDev({ ...dev, items: [...dev.items, ...fresh] });
  };

  const addOperations = (rows: GridRow[]) => {
    const fresh: Operation[] = rows
      .filter((r) => r.department || r.itemName)
      .map((r) => ({
        id: crypto.randomUUID(),
        department: r.department,
        productType: r.productType,
        itemName: r.itemName,
        smv: Number(r.smv) || 0,
        mcPerLine: Number(r.mcPerLine) || 0,
        efficiencyPct: 0,
        requiredDay: 0,
        avgProductionPerLine: 0,
        epm: 0,
        cm: 0,
        cmPct: 0,
        revenuePerMc: 0,
      }));
    setDev({ ...dev, operations: [...dev.operations, ...fresh] });
  };

  const submitForReview = () => {
    setDev({ ...dev, status: "pending" });
    alert(`${dev.dn} submitted for review.`);
  };

  const closeInquiries = () => router.replace(`/development/${dev.id}`, { scroll: false });

  return (
    <>
      <PageHeader
        title="Development Costing"
        badge={<StatusBadge status={dev.status} className="min-w-0 px-3 py-1" />}
        crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Development Costing", href: "/development" }, { label: dev.dn }]}
      >
        <ButtonLink href={`/development/${dev.id}/visitors`} variant="soft" size="sm">View Visitors List</ButtonLink>
        <ButtonLink href={`/development/${dev.id}/feasibility`} variant="soft" size="sm">Feasibility</ButtonLink>
        <Button variant="soft" size="sm">Export <Download size={16} /></Button>
        <Button variant="soft" size="sm" onClick={() => window.print()}>Print <Printer size={16} /></Button>
        {editable && <Button size="sm" onClick={submitForReview}>Submit to Review</Button>}
        {editable && (
          <button aria-label="Edit" className="p-2 text-grey-900"><Pencil size={20} /></button>
        )}
      </PageHeader>

      <PageBody>
        <OverviewCards dev={dev} editable={editable} paymentTerms={master.paymentTerms} />
        <OperationsSection rows={dev.operations} onAdd={editable ? () => setAdding("operation") : undefined} />
        {categories.map((c) => (
          <CostItemSection
            key={c}
            category={c}
            items={dev.items.filter((i) => i.category === c)}
            summary={dev.sections[c]}
            onAdd={editable ? () => setAdding(c) : undefined}
            onOpenItem={setOpenItem}
          />
        ))}
        <CostingSummary phases={dev.summary} />
        {editable && (
          <div className="no-print flex justify-center gap-4 py-2">
            <Button variant="soft" size="lg" className="w-[147px]" onClick={() => alert("Saved as draft")}>Save as Draft</Button>
            <Button size="lg" className="w-[176px]" onClick={submitForReview}>Submit to Review</Button>
          </div>
        )}
        <CostingActivity steps={dev.activity} />
      </PageBody>

      <GridFormModal
        open={adding === "operation"}
        onClose={() => setAdding(null)}
        title="Add Operational Breakdown"
        columns={operationColumns(master)}
        onSubmit={addOperations}
        maxWidth={1000}
      />
      {categories.map((c) => (
        <GridFormModal
          key={c}
          open={adding === c}
          onClose={() => setAdding(null)}
          title={sectionMeta[c].addTitle}
          columns={cols[c]}
          onSubmit={(rows) => addItems(c, rows)}
          maxWidth={sectionMeta[c].modalWidth}
        />
      ))}

      <ItemDetailsModal
        item={openItem}
        comments={comments}
        editable={editable}
        onClose={() => setOpenItem(null)}
        onDelete={(item) => {
          setDev({ ...dev, items: dev.items.filter((i) => i.id !== item.id) });
          setOpenItem(null);
        }}
      />

      <Modal open={params.get("inquiries") === "1"} onClose={closeInquiries} title="Inquiry List" style={{ maxWidth: 1086 }}>
        <div className="overflow-hidden rounded-[6px] border border-border">
          <PeopleTable rows={inquiries} showInquiryDate={false} perPage={10} />
        </div>
      </Modal>
    </>
  );
}
