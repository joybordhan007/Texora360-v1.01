"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { RowMenu, type MenuItem } from "@/components/ui/menu";
import { Pagination, paginate } from "@/components/ui/pagination";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import type { DevelopmentSummary } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AddDevelopmentModal, type NewDevelopment } from "./add-development-modal";

const PER_PAGE = 25;

export function DevelopmentList({ initialRows, buyers, seasons }: { initialRows: DevelopmentSummary[]; buyers: string[]; seasons: string[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => [r.dn, r.buyer, r.style, r.fabric, r.devType, r.status].some((v) => v.toLowerCase().includes(q)));
  }, [rows, query]);
  const { rows: visible, pages } = paginate(filtered, page, PER_PAGE);

  const menuFor = (r: DevelopmentSummary): MenuItem[] => {
    const open = (suffix = "") => router.push(`/development/${r.id}${suffix}`);
    const duplicate = { label: "Duplicate Costing", onSelect: () => setRows((all) => [...all, { ...r, id: String(all.length + 1), dn: `DN-${String(all.length + 1).padStart(2, "0")}`, status: "draft" }]) };
    const printTag = { label: "Print Hang-Tag", onSelect: () => router.push(`/hang-tag/print?ids=${r.id}`) };
    if (r.status === "draft")
      return [
        { label: "Edit Costing", onSelect: () => open() },
        printTag,
        duplicate,
        { label: "Delete Costing", danger: true, onSelect: () => confirm(`Delete ${r.dn}?`) && setRows((all) => all.filter((x) => x.id !== r.id)) },
      ];
    if (r.status === "pending") return [printTag, duplicate];
    return [{ label: "View Inquiry List", onSelect: () => open("?inquiries=1") }, printTag, duplicate];
  };

  const create = (items: NewDevelopment[]) => {
    setRows((all) => [
      ...items.map((it, i) => ({
        id: String(all.length + i + 1),
        dn: `DN-${String(all.length + i + 1).padStart(2, "0")}`,
        buyer: it.buyer,
        style: it.style,
        fabric: "-",
        devType: "Design Dev" as const,
        status: "draft" as const,
      })),
      ...all,
    ]);
    setAdding(false);
  };

  return (
    <>
      <PageHeader title="Development Costing" crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Development Costing" }]}>
        <SearchBox className="w-[391px] max-w-full" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <Button size="lg" className="ml-2" onClick={() => setAdding(true)}>
          <Icon src="/figma/plus.svg" size={24} />
          Add Development
        </Button>
      </PageHeader>
      <PageBody>
        <Card>
          <Table>
            <THead>
              <tr>
                <Th className="w-[50px] text-left text-[16px]">#</Th>
                <Th filter className="w-[200px]">DN ID</Th>
                <Th filter className="w-[200px]">Buyer</Th>
                <Th filter className="w-[200px]">Style</Th>
                <Th filter>Fabric</Th>
                <Th filter className="w-[200px]">Dev Type</Th>
                <Th filter className="w-[200px]">Status</Th>
                <Th className="w-[100px]">Action</Th>
              </tr>
            </THead>
            <tbody>
              {visible.map((r, i) => (
                <Tr key={r.id} className="cursor-pointer" onClick={() => router.push(`/development/${r.id}`)}>
                  <Td className="pl-4 text-left text-[16px]">{(page - 1) * PER_PAGE + i + 1}</Td>
                  <Td>{r.dn}</Td>
                  <Td>{r.buyer}</Td>
                  <Td>{r.style}</Td>
                  <Td>{r.fabric}</Td>
                  <Td>{r.devType}</Td>
                  <Td><StatusBadge status={r.status} /></Td>
                  <Td onClick={(e) => e.stopPropagation()}><RowMenu items={menuFor(r)} /></Td>
                </Tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={8} className="py-10 text-center text-grey-500">No development found</td></tr>
              )}
            </tbody>
          </Table>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </Card>
      </PageBody>
      <AddDevelopmentModal open={adding} onClose={() => setAdding(false)} onSubmit={create} buyers={buyers} seasons={seasons} />
    </>
  );
}
