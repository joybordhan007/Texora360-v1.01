"use client";

import { CellInput, CellSelect } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ImagePlus, MessageSquareText, Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";

export type GridColumn = {
  key: string;
  label: string;
  placeholder?: string;
  options?: string[];
  type?: "text" | "number" | "image";
  width?: number;
};

export type GridRow = Record<string, string>;

const emptyRow = (cols: GridColumn[]): GridRow => Object.fromEntries(cols.map((c) => [c.key, ""]));

/** Spreadsheet-like entry table used by every "Add …" modal on the costing screen. */
export function GridTable({ columns, rows, setRows, actions = true }: { columns: GridColumn[]; rows: GridRow[]; setRows: (r: GridRow[]) => void; actions?: boolean }) {
  const update = (i: number, key: string, value: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [key]: value } : r)));
  return (
    <div className="overflow-x-auto rounded-[6px] border border-border">
      <table className="w-full border-collapse text-[13px]">
        <thead className="bg-table-head text-grey-800">
          <tr>
            <th className="h-9 w-10 border-b border-line px-2 font-medium">SL</th>
            {columns.map((c) => (
              <th key={c.key} className="h-9 border-b border-l border-line px-2 font-medium whitespace-nowrap" style={{ minWidth: c.width }}>
                {c.label}
              </th>
            ))}
            {actions && <th className="h-9 border-b border-l border-line px-2 font-medium">Action</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="h-10 border-b border-line last:border-b-0">
              <td className="px-2 text-center text-grey-800">{i + 1}</td>
              {columns.map((c) => (
                <td key={c.key} className="h-10 border-l border-line p-0">
                  {c.type === "image" ? (
                    <label className="flex h-full cursor-pointer items-center justify-center gap-1 px-2 text-[12px] whitespace-nowrap text-primary">
                      <ImagePlus size={14} />
                      {row[c.key] || c.placeholder || "Upload a Image"}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => update(i, c.key, e.target.files?.[0]?.name ?? "")} />
                    </label>
                  ) : c.options ? (
                    <CellSelect options={c.options} placeholder={c.placeholder ?? `Select ${c.label.toLowerCase()}`} value={row[c.key]} onChange={(e) => update(i, c.key, e.target.value)} />
                  ) : (
                    <CellInput
                      type={c.type === "number" ? "number" : "text"}
                      placeholder={c.placeholder ?? `Enter ${c.label.toLowerCase()}`}
                      value={row[c.key]}
                      onChange={(e) => update(i, c.key, e.target.value)}
                    />
                  )}
                </td>
              ))}
              {actions && (
                <td className="border-l border-line px-2">
                  <div className="flex items-center justify-center gap-2">
                    <button aria-label="Add note" className="text-grey-900 hover:text-primary"><MessageSquareText size={18} /></button>
                    <button aria-label="Remove row" className="text-danger disabled:opacity-30" disabled={rows.length === 1} onClick={() => setRows(rows.filter((_, j) => j !== i))}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AddRowTitle({ children, onAdd }: { children: ReactNode; onAdd: () => void }) {
  return (
    <>
      {children}
      <button onClick={onAdd} aria-label="Add row" className="flex size-6 items-center justify-center rounded-full bg-primary text-white">
        <Plus size={16} strokeWidth={3} />
      </button>
    </>
  );
}

export function GridFormModal({
  open,
  onClose,
  title,
  columns,
  onSubmit,
  submitLabel = "Add Now",
  maxWidth = 1620,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  columns: GridColumn[];
  onSubmit: (rows: GridRow[]) => void;
  submitLabel?: string;
  maxWidth?: number;
}) {
  const [rows, setRows] = useState<GridRow[]>(() => [emptyRow(columns)]);
  const close = () => {
    setRows([emptyRow(columns)]);
    onClose();
  };
  return (
    <Modal open={open} onClose={close} style={{ maxWidth }} title={<AddRowTitle onAdd={() => setRows([...rows, emptyRow(columns)])}>{title}</AddRowTitle>}>
      <GridTable columns={columns} rows={rows} setRows={setRows} />
      <div className="flex justify-center pt-4">
        <Button size="lg" className="w-[147px]" onClick={() => { onSubmit(rows); close(); }}>
          {submitLabel}
        </Button>
      </div>
    </Modal>
  );
}
