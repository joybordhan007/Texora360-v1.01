"use client";

import { PageBody, PageHeader } from "@/components/layout/page-header";
import { SearchBox } from "@/components/ui/field";
import type { GalleryItem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function GalleryView({ items }: { items: GalleryItem[] }) {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase();
  const visible = items.filter((i) => !q || i.style.toLowerCase().includes(q) || i.name.toLowerCase().includes(q));

  return (
    <>
      <PageHeader title="Sample Gallery" crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Sample Gallery" }]}>
        <SearchBox className="w-[391px] max-w-full" value={query} onChange={(e) => setQuery(e.target.value)} />
      </PageHeader>
      <PageBody>
        {/* Masonry layout: column count follows width, card heights come from the Figma grid. */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
          {visible.map((item) => (
            <figure key={item.id} className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[8px] bg-[#bfc2cb]" style={{ height: item.height }}>
              <Image src={item.image} alt={item.name} fill sizes="(min-width:1536px) 20vw, (min-width:1280px) 25vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              <Link
                href={`/hang-tag/print?ids=${item.id}`}
                aria-label="Print hang tag"
                className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-primary"
              >
                <img src="/figma/print-badge.svg" alt="" className="size-5" />
              </Link>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pt-10 pb-4 text-[13px] leading-snug font-medium text-white">
                <p>STYLE: {item.style}</p>
                <p>{item.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageBody>
    </>
  );
}
