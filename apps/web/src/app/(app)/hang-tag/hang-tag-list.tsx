"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/field";
import { Pagination, paginate } from "@/components/ui/pagination";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import type { HangTagRow } from "@/lib/types";
import { Eye, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const PER_PAGE = 25;
const check = "size-4 cursor-pointer rounded-[3px] accent-primary";

export function HangTagList({ rows }: { rows: HangTagRow[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((r) => !q || [r.dn, r.buyer, r.style, r.fabric, r.devType].some((v) => v.toLowerCase().includes(q)));
  }, [rows, query]);
  const { rows: visible, pages } = paginate(filtered, page, PER_PAGE);

  const allOnPage = visible.length > 0 && visible.every((r) => selected.has(r.id));
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const toggleAll = () => {
    const next = new Set(selected);
    visible.forEach((r) => (allOnPage ? next.delete(r.id) : next.add(r.id)));
    setSelected(next);
  };
  const print = (ids: string[]) => router.push(`/hang-tag/print?ids=${ids.join(",")}`);
  const bulk = selected.size > 0;

  return (
    <>
      <PageHeader title={bulk ? "Bulk Print Hang Tag" : "Print Hang Tag"} crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: bulk ? "Bulk Print Hang Tag" : "Print Hang Tag" }]}>
        <SearchBox className="w-[391px] max-w-full" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <Button size="lg" variant={bulk ? "dark" : "soft"} disabled={!bulk} className={bulk ? "" : "bg-grey-500 text-white opacity-100"} onClick={() => print([...selected])}>
          <Printer size={20} /> {bulk ? `Bulk Print now (${selected.size})` : "Print"}
        </Button>
      </PageHeader>
      <PageBody>
        <Card>
          <Table className="text-[13px]">
            <THead>
              <tr>
                <Th className="w-[50px]"><input type="checkbox" aria-label="Select all" className={check} checked={allOnPage} onChange={toggleAll} /></Th>
                <Th filter className="text-left">DN</Th>
                <Th filter>Buyer</Th>
                <Th filter>Style</Th>
                <Th filter>Fabric</Th>
                <Th>Sample Image</Th>
                <Th filter>Dev Type</Th>
                <Th className="w-[90px]">Action</Th>
              </tr>
            </THead>
            <tbody>
              {visible.map((r) => (
                <Tr key={r.id}>
                  <Td><input type="checkbox" aria-label={`Select ${r.dn}`} className={check} checked={selected.has(r.id)} onChange={() => toggle(r.id)} /></Td>
                  <Td><Link href={`/development/${r.id}`} className="text-primary">{r.dn}</Link></Td>
                  <Td>{r.buyer}</Td>
                  <Td className="text-primary">{r.style}</Td>
                  <Td>{r.fabric}</Td>
                  <Td><Image src={r.image} alt="" width={36} height={36} className="mx-auto size-9 rounded-[2px] object-cover" /></Td>
                  <Td>{r.devType}</Td>
                  <Td>
                    <div className="flex items-center justify-center gap-1.5">
                      <button aria-label="Print" onClick={() => print([r.id])} className="rounded-[3px] bg-teal p-0.5 text-white"><Printer size={16} /></button>
                      <Link aria-label="View client page" href={`/p/${encodeURIComponent(r.style)}`} target="_blank" className="rounded-[3px] bg-primary p-0.5 text-white"><Eye size={16} /></Link>
                    </div>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </Card>
      </PageBody>
    </>
  );
}
