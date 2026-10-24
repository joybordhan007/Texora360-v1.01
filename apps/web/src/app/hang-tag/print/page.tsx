import { TagBack, TagFront, type TagData } from "@/components/hang-tag";
import { api } from "@/lib/api";
import { headers } from "next/headers";
import { PrintToolbar } from "./print-toolbar";

// Standalone print sheet (outside the app shell) so only the tags reach the printer.
export default async function HangTagPrintPage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const { ids = "" } = await searchParams;
  const wanted = new Set(ids.split(",").filter(Boolean));
  const [rows, product] = await Promise.all([api.hangTags(), api.clientProduct("")]);
  const host = (await headers()).get("host") ?? "localhost:3000";
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ (\d{4})$/, ", $1.");

  const tags: TagData[] = rows
    .filter((r) => wanted.has(r.id))
    .map((r) => ({
      name: product!.name,
      style: r.style,
      image: r.image,
      fabric: r.fabric,
      color: product!.color,
      finish: product!.finish,
      leadTime: product!.leadTime,
      origin: product!.origin,
      lastUpdate: product!.lastUpdate + ".",
      printDate: today,
      url: `http://${host}/p/${encodeURIComponent(r.style)}`,
    }));

  return (
    <div className="min-h-screen bg-[#7a7a7a] print:bg-white">
      <PrintToolbar count={tags.length} />
      <div className="flex flex-wrap justify-center gap-10 p-10 print:gap-4 print:p-4">
        {tags.map((t, i) => (
          <div key={i} className="flex break-inside-avoid gap-4 print:[zoom:1.03]">
            <TagFront />
            <TagBack data={t} />
          </div>
        ))}
        {tags.length === 0 && <p className="text-white">No hang tag selected.</p>}
      </div>
    </div>
  );
}
