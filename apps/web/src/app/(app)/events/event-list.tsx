"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input, SearchBox } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { RowMenu } from "@/components/ui/menu";
import { ConfirmDialog, Modal } from "@/components/ui/modal";
import { Pagination, paginate } from "@/components/ui/pagination";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import type { EventItem } from "@/lib/types";
import { CalendarDays, ImagePlus, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const PER_PAGE = 25;
const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ (\d{4})$/, ", $1");

type Draft = { name: string; location: string; start: string; end: string; image: string };
const blank: Draft = { name: "", location: "", start: "", end: "", image: "" };

export function EventList({ initialRows }: { initialRows: EventItem[] }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<{ id: string | null; draft: Draft } | null>(null);
  const [confirmClose, setConfirmClose] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = rows.filter((r) => !q || r.name.toLowerCase().includes(q) || r.location.toLowerCase().includes(q));
    if (sortAsc === null) return list;
    return [...list].sort((a, b) => (new Date(a.start).getTime() - new Date(b.start).getTime()) * (sortAsc ? 1 : -1));
  }, [rows, query, sortAsc]);
  const { rows: visible, pages } = paginate(filtered, page, PER_PAGE);

  const dirty = editing && JSON.stringify(editing.draft) !== JSON.stringify(blank);
  const requestClose = () => (dirty ? setConfirmClose(true) : setEditing(null));

  const save = () => {
    if (!editing) return;
    const d = editing.draft;
    if (!d.name || !d.start || !d.end) return alert("Event name, start date and end date are required.");
    const days = Math.max(1, Math.round((new Date(d.end).getTime() - new Date(d.start).getTime()) / 86_400_000) + 1);
    const item: EventItem = { id: editing.id ?? crypto.randomUUID(), name: d.name, location: d.location, start: fmt(d.start), end: fmt(d.end), days, image: d.image || "/figma/event-cover.png" };
    setRows(editing.id ? rows.map((r) => (r.id === editing.id ? item : r)) : [item, ...rows]);
    setEditing(null);
  };

  const set = (patch: Partial<Draft>) => editing && setEditing({ ...editing, draft: { ...editing.draft, ...patch } });

  return (
    <>
      <PageHeader title="Events" crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Events" }]}>
        <SearchBox className="w-[391px] max-w-full" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <Button size="lg" onClick={() => setEditing({ id: null, draft: blank })}>
          <Icon src="/figma/plus.svg" size={24} /> Add Event
        </Button>
        <Button variant="soft" size="lg" onClick={() => setSortAsc((s) => (s === null ? true : !s))}>
          Date <CalendarDays size={16} />
        </Button>
      </PageHeader>
      <PageBody>
        <Card>
          <Table className="text-[13px]">
            <THead>
              <tr>
                <Th className="w-[50px]">#</Th>
                <Th>Event Name</Th>
                <Th>Event Image</Th>
                <Th>Event Location</Th>
                <Th>Event Start Date</Th>
                <Th>Event End Date</Th>
                <Th>Event on Days</Th>
                <Th className="w-[70px]">Action</Th>
              </tr>
            </THead>
            <tbody>
              {visible.map((e, i) => (
                <Tr key={e.id}>
                  <Td>{(page - 1) * PER_PAGE + i + 1}</Td>
                  <Td>{e.name}</Td>
                  <Td><Image src={e.image} alt="" width={34} height={34} unoptimized={e.image.startsWith("blob:")} className="mx-auto size-[34px] rounded-[2px] object-cover" /></Td>
                  <Td>{e.location}</Td>
                  <Td>{e.start}</Td>
                  <Td>{e.end}</Td>
                  <Td>{String(e.days).padStart(2, "0")}</Td>
                  <Td>
                    <RowMenu
                      items={[
                        { label: "Edit Event", onSelect: () => setEditing({ id: e.id, draft: { name: e.name, location: e.location, start: "", end: "", image: e.image } }) },
                        { label: "Delete Event", danger: true, onSelect: () => confirm(`Delete "${e.name}"?`) && setRows(rows.filter((r) => r.id !== e.id)) },
                      ]}
                    />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </Card>
      </PageBody>

      <Modal open={!!editing} onClose={requestClose} title={editing?.id ? "Edit Event" : "Add Event"} style={{ maxWidth: 908 }}>
        {editing && (
          <div className="space-y-5 pt-2">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                <label className="space-y-2 text-[13px] text-grey-900">
                  <span>Event Name</span>
                  <Input placeholder="Enter your event name" value={editing.draft.name} onChange={(e) => set({ name: e.target.value })} />
                </label>
                <label className="space-y-2 text-[13px] text-grey-900">
                  <span>Event Location</span>
                  <Input placeholder="Enter event location" value={editing.draft.location} onChange={(e) => set({ location: e.target.value })} />
                </label>
                <label className="space-y-2 text-[13px] text-grey-900">
                  <span>Event Start Date</span>
                  <Input type="date" value={editing.draft.start} onChange={(e) => set({ start: e.target.value })} />
                </label>
                <label className="space-y-2 text-[13px] text-grey-900">
                  <span>Event End Date</span>
                  <Input type="date" min={editing.draft.start} value={editing.draft.end} onChange={(e) => set({ end: e.target.value })} />
                </label>
              </div>
              <div className="space-y-2 text-[13px] text-grey-900">
                <span>Event Image</span>
                <label className="flex h-[135px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[6px] border border-dashed border-primary/40 bg-primary-soft text-center">
                  {editing.draft.image ? (
                    <Image src={editing.draft.image} alt="" width={120} height={90} unoptimized={editing.draft.image.startsWith("blob:")} className="h-[90px] w-auto rounded object-cover" />
                  ) : (
                    <>
                      <span className="flex size-8 items-center justify-center rounded-full bg-white text-primary"><ImagePlus size={18} /></span>
                      <span className="text-[12px] font-medium">Upload Event Image</span>
                      <span className="text-[10px] text-grey-500">Drag and drop files here</span>
                    </>
                  )}
                  <span className="flex items-center gap-1 rounded-[4px] border border-primary bg-white px-2 py-0.5 text-[11px] text-primary"><UploadCloud size={12} /> Choose File</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) set({ image: URL.createObjectURL(f) }); }} />
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="w-[147px]" onClick={save}>{editing.id ? "Save" : "Add Now"}</Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={confirmClose}
        message="Are you sure you want to close this window?"
        onConfirm={() => { setConfirmClose(false); setEditing(null); }}
        onCancel={() => setConfirmClose(false)}
      />
    </>
  );
}
