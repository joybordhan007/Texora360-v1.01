"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { SearchBox } from "@/components/ui/field";
import { FilterDropdown } from "@/components/ui/menu";
import { Pagination, paginate } from "@/components/ui/pagination";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import type { Requisition, RequisitionDetail } from "@/lib/types";
import { Check, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { RequisitionDetailsModal } from "./requisition-details-modal";

const PER_PAGE = 26;
const uniq = (xs: string[]) => [...new Set(xs)];

export function RequisitionList({ initialRows, details }: { initialRows: Requisition[]; details: Record<string, RequisitionDetail> }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [buyer, setBuyer] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<RequisitionDetail | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        (!buyer || r.buyer === buyer) &&
        (!style || r.style === style) &&
        (!status || r.status === status.toLowerCase()) &&
        (!q || [r.rn, r.buyer, r.style, r.sampleType, r.washType].some((v) => v.toLowerCase().includes(q))),
    );
  }, [rows, query, buyer, style, status]);
  const { rows: visible, pages } = paginate(filtered, page, PER_PAGE);

  const setRowStatus = (id: string, s: Requisition["status"]) => setRows(rows.map((r) => (r.id === id ? { ...r, status: s } : r)));

  return (
    <>
      <PageHeader title="Requisition Sample" crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Requisition Sample" }]}>
        <SearchBox className="w-[391px] max-w-full" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <FilterDropdown label="Buyer" options={uniq(rows.map((r) => r.buyer))} value={buyer} onChange={setBuyer} />
        <FilterDropdown label="Style" options={uniq(rows.map((r) => r.style))} value={style} onChange={setStyle} />
        <FilterDropdown label="Status" options={["Pending", "Approved", "Inprogress"]} value={status} onChange={setStatus} />
        <button onClick={() => { setBuyer(null); setStyle(null); setStatus(null); setQuery(""); }} className="px-2 text-[14px] font-medium text-primary">Clear filters</button>
      </PageHeader>
      <PageBody>
        <Card>
          <Table className="text-[13px]">
            <THead>
              <tr>
                <Th className="w-[50px]">#</Th>
                <Th>RN ID</Th>
                <Th>Buyer</Th>
                <Th>Style</Th>
                <Th>Sample Type</Th>
                <Th>Wash Type</Th>
                <Th>Requisition Qty</Th>
                <Th>Status</Th>
                <Th className="w-[90px]">Action</Th>
              </tr>
            </THead>
            <tbody>
              {visible.map((r, i) => (
                <Tr key={r.id}>
                  <Td>{(page - 1) * PER_PAGE + i + 1}</Td>
                  <Td>{r.rn}</Td>
                  <Td>{r.buyer}</Td>
                  <Td>{r.style}</Td>
                  <Td>{r.sampleType}</Td>
                  <Td>{r.washType}</Td>
                  <Td>{r.qty} PCs</Td>
                  <Td><StatusBadge status={r.status} className="min-w-[72px] py-1" /></Td>
                  <Td>
                    <div className="flex items-center justify-center gap-1.5">
                      <button aria-label="View" onClick={() => setViewing(details[r.id] ? { ...details[r.id], status: r.status } : null)} className="rounded-[3px] bg-primary p-0.5 text-white"><Eye size={16} /></button>
                      {r.status === "pending" && (
                        <button aria-label="Approve" onClick={() => setRowStatus(r.id, "approved")} className="rounded-[3px] bg-teal p-0.5 text-white"><Check size={16} /></button>
                      )}
                    </div>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </Card>
      </PageBody>
      <RequisitionDetailsModal
        detail={viewing}
        onClose={() => setViewing(null)}
        onReceived={(id) => { setRowStatus(id, "inprogress"); setViewing(null); }}
      />
    </>
  );
}
