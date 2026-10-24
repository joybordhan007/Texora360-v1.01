"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { FilterDropdown } from "@/components/ui/menu";
import { Modal } from "@/components/ui/modal";
import { Pagination, paginate } from "@/components/ui/pagination";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import type { Quote } from "@/lib/types";
import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";

const PER_PAGE = 24;

function EmailGroup({ label, emails }: { label: string; emails: string[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (e: string) => {
    await navigator.clipboard?.writeText(e);
    setCopied(e);
    setTimeout(() => setCopied(null), 1200);
  };
  return (
    <div className="overflow-hidden bg-[#fafafa]">
      <p className="bg-[#e1e1e1] px-4 py-3.5 text-[14px] font-semibold text-grey-800">{label}:</p>
      <ul className="space-y-3 px-4 py-4 text-[13px] text-grey-900">
        {emails.map((e) => (
          <li key={e} className="flex items-center gap-3">
            {e}
            <button aria-label={`Copy ${e}`} onClick={() => copy(e)} className="text-grey-800 hover:text-primary">
              {copied === e ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QuoteList({ rows }: { rows: Quote[] }) {
  const [style, setStyle] = useState<string | null>(null);
  const [item, setItem] = useState<string | null>(null);
  const [event, setEvent] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [emails, setEmails] = useState<Quote | null>(null);

  const filtered = useMemo(
    () => rows.filter((r) => (!style || r.styleNo === style) && (!item || r.itemName === item) && (!event || r.eventName === event)),
    [rows, style, item, event],
  );
  const { rows: visible, pages } = paginate(filtered, page, PER_PAGE);

  return (
    <>
      <PageHeader title="Quote List" crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Quote List" }]}>
        <FilterDropdown label="Style" options={rows.map((r) => r.styleNo)} value={style} onChange={setStyle} />
        <FilterDropdown label="Item Name" options={rows.map((r) => r.itemName)} value={item} onChange={setItem} />
        <FilterDropdown label="Event Name" options={rows.map((r) => r.eventName)} value={event} onChange={setEvent} />
        <button onClick={() => { setStyle(null); setItem(null); setEvent(null); }} className="px-2 text-[14px] font-medium text-primary">Clear filters</button>
      </PageHeader>
      <PageBody>
        <Card>
          <Table className="text-[13px]">
            <THead>
              <tr>
                <Th className="w-[50px]">#</Th>
                <Th>Item Name</Th>
                <Th>Style No</Th>
                <Th>Email Address</Th>
                <Th>Email Location</Th>
                <Th>Event Name</Th>
                <Th>Email Time</Th>
              </tr>
            </THead>
            <tbody>
              {visible.map((q, i) => (
                <Tr key={q.id}>
                  <Td>{(page - 1) * PER_PAGE + i + 1}</Td>
                  <Td>{q.itemName}</Td>
                  <Td>{q.styleNo}</Td>
                  <Td className="text-left">
                    <span className="flex items-center justify-between gap-2">
                      <span className="max-w-[170px] truncate">{q.email}</span>
                      <button onClick={() => setEmails(q)} className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] whitespace-nowrap text-white">+{q.moreEmails} More</button>
                    </span>
                  </Td>
                  <Td>{q.location}</Td>
                  <Td>{q.eventName}</Td>
                  <Td>{q.emailTime}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </Card>
      </PageBody>
      <Modal open={!!emails} onClose={() => setEmails(null)} title="Email List" style={{ maxWidth: 646 }}>
        {emails && (
          <div className="space-y-4 pt-2">
            <EmailGroup label="TO" emails={emails.to} />
            <EmailGroup label="CC" emails={emails.cc} />
          </div>
        )}
      </Modal>
    </>
  );
}
