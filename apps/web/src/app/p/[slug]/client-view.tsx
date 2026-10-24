"use client";

import { cn } from "@/lib/cn";
import { num } from "@/lib/format";
import type { ClientProduct } from "@/lib/types";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const C = "/figma/client";

function Spec({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-1">
      <span className="rounded-[3px] bg-grey-100 p-0.5 md:p-1"><img src={icon} alt="" className="size-3.5 md:size-5" /></span>
      <div className="flex flex-col gap-1 text-[12px] leading-[1.2] font-medium md:text-[14px]">
        <span className="text-grey-600">{label}:</span>
        <span className="text-grey-800 md:text-[16px]">{value}</span>
      </div>
    </div>
  );
}

export function ClientView({ product }: { product: ClientProduct }) {
  const [slide, setSlide] = useState(0);
  const [qty, setQty] = useState(20000);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const tiers = product.tiers;
  const tier = [...tiers].reverse().find((t) => qty >= t.qty) ?? tiers[0];
  const step = 1000;
  const clamp = (n: number) => Math.max(product.moq, Math.min(n, tiers[tiers.length - 1].qty * 2));
  const tierIndex = tiers.indexOf(tier);
  const progress = (tierIndex / (tiers.length - 1)) * 100;

  return (
    <div className="mx-auto min-h-screen max-w-[820px] bg-page pb-24 md:bg-white md:pb-10">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-page px-4 md:static md:bg-white md:px-5">
        <button aria-label="Back" onClick={() => history.back()} className="md:hidden"><img src={`${C}/arrow-back.svg`} alt="" className="size-6" /></button>
        <div className="relative h-8 w-[115px] overflow-hidden md:mr-auto">
          <img src={`${C}/stellar-logo.png`} alt="Stellar Manufacturing" className="absolute top-[-35.49%] left-[-9.04%] h-[207.22%] w-[119.33%] max-w-none" />
        </div>
        <span className="size-6 md:hidden"><img src={`${C}/qr-scan.svg`} alt="" className="size-5" /></span>
      </header>

      <main className="flex flex-col gap-4 px-4 pt-4 md:gap-8 md:px-5">
        <section className="flex gap-2 md:gap-12">
          <div className="relative min-w-0 flex-1 rounded-[6px] bg-white p-2 shadow-e1 md:shadow-none">
            <div className="relative h-[266px] overflow-hidden rounded-[8px] md:h-[300px]">
              <Image src={product.images[slide]} alt={product.name} fill sizes="(min-width:768px) 380px, 50vw" className="object-contain" priority />
            </div>
            <div className="mt-1 flex justify-center gap-1.5">
              {product.images.map((_, i) => (
                <button key={i} aria-label={`Image ${i + 1}`} onClick={() => setSlide(i)} className={cn("size-1.5 rounded-full", i === slide ? "bg-warning" : "bg-[#fad28f]")} />
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 rounded-[6px] bg-white p-2 shadow-e1 md:gap-4 md:shadow-none">
            <div className="flex flex-col gap-1 text-[12px] leading-[1.2] font-medium md:text-[16px]">
              <p className="text-grey-700">STYLE: {product.style}</p>
              <p className="text-grey-800 md:text-[18px]">{product.name}</p>
            </div>
            <div className="flex flex-col gap-1.5 md:gap-2.5">
              <Spec icon={`${C}/ic-fabric.svg`} label="Fabric" value={product.fabric} />
              <Spec icon={`${C}/ic-finish.svg`} label="Finish" value={product.finish} />
              <Spec icon={`${C}/ic-color.svg`} label="Color" value={product.color} />
              <Spec icon={`${C}/ic-origin.svg`} label="Origin" value={product.origin} />
              <Spec icon={`${C}/ic-leadtime.svg`} label="Lead Time" value={product.leadTime} />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-[8px] bg-white p-3 shadow-e1 md:p-0 md:shadow-none">
          <div className="flex items-start justify-between">
            <p className="text-[14px] font-medium text-grey-800 md:text-[16px]">LIVE QUOTATION</p>
            <span className="flex items-center gap-1 rounded-[4px] bg-warning/20 px-2 py-1.5 text-[12px] font-medium text-warning">
              <img src={`${C}/star.svg`} alt="" className="size-4" /> Best Value
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px] font-medium text-grey-800">Quantity (PCS)</p>
            <div className="flex items-center justify-between gap-3">
              <button aria-label="Decrease" onClick={() => setQty(clamp(qty - step))} className="rounded-[4px] border border-quote p-1.5"><img src={`${C}/minus.svg`} alt="" className="size-5" /></button>
              <div className="flex h-8 flex-1 items-center justify-between overflow-hidden rounded-[4px] border border-border bg-[#f9fafb] pl-4">
                <input
                  inputMode="numeric"
                  aria-label="Quantity"
                  value={num(qty)}
                  onChange={(e) => setQty(Number(e.target.value.replace(/\D/g, "")) || 0)}
                  onBlur={() => setQty(clamp(qty))}
                  className="w-full bg-transparent text-[14px] font-medium text-grey-900 outline-none"
                />
                <span className="flex h-full items-center border-l border-border bg-white px-4 text-[10px] font-medium text-grey-800">PCs</span>
              </div>
              <button aria-label="Increase" onClick={() => setQty(clamp(qty + step))} className="rounded-[4px] border border-quote p-1.5"><img src={`${C}/plus.svg`} alt="" className="size-5" /></button>
            </div>

            <div className="px-2">
              <div className="relative flex h-5 items-center">
                <div className="absolute inset-x-0 h-1 rounded-full bg-page" />
                <div className="absolute left-0 h-1 rounded-full bg-warning" style={{ width: `${progress}%` }} />
                <div className="relative flex w-full items-center justify-between">
                  {tiers.map((t, i) => (
                    <button
                      key={t.qty}
                      aria-label={`${num(t.qty)} pieces`}
                      onClick={() => setQty(t.qty)}
                      className={cn("rounded-full", i === tierIndex ? "size-5 border-[2.5px] border-warning bg-page" : i < tierIndex ? "size-2.5 bg-warning" : "size-2.5 bg-page")}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-semibold text-grey-900">
                {tiers.map((t, i) => (
                  <span key={t.qty}>{num(t.qty)}{i === 0 ? " (MOQ)" : i === tiers.length - 1 ? "+" : ""}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0.5 rounded-[4px] border border-border bg-black/5 px-1 py-2.5 md:py-4">
            {[
              ["UNIT PRICE", `$${tier.unitPrice.toFixed(2)}`, "/PC"],
              ["EST. ORDER VALUE", `$${num(Math.round(tier.unitPrice * qty))}`, `/${num(qty)} PCS`],
              ["MOQ", num(product.moq), ""],
            ].map(([label, value, sub], i) => (
              <div key={label} className={cn("flex flex-1 flex-col items-center gap-1.5 leading-[1.2] whitespace-nowrap", i > 0 && "border-l border-black/10")}>
                <span className="text-[10px] font-medium text-grey-800 md:text-[16px]">{label}</span>
                <span className="text-[12px] font-semibold text-warning md:text-[18px]">{value}</span>
                <span className="min-h-3 text-[10px] text-grey-600 md:text-[14px]">{sub}</span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 rounded-[8px] border border-border bg-black/5 p-2">
            <img src={`${C}/info.svg`} alt="" className="size-5" />
            <p className="text-[12px] leading-[1.3] text-grey-800 md:text-[14px]">
              Prices are based on Non-Nominated Trims and Non-Nominated Fabric with Standard Packing. Any deviation or changes will impact the prices accordingly{" "}
              <span className="font-semibold text-grey-900">| Last Update: {product.lastUpdate}.</span>
            </p>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-[820px] bg-page px-4 pt-2 pb-4 md:static md:bg-white md:px-5 md:pt-6">
        <button onClick={() => setSending(true)} className="flex h-9 w-full items-center justify-center gap-1.5 rounded-[4px] bg-quote text-[12px] font-medium text-white uppercase md:h-11 md:text-[14px]">
          <img src={`${C}/mail.svg`} alt="" className="size-4" /> {sent ? "Quote sent · email again" : "email me"}
        </button>
      </div>

      {sending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={() => setSending(false)}>
          <form
            className="w-full max-w-[400px] rounded-[12px] bg-white p-4"
            onMouseDown={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              // POST /public/products/:slug/quote { to, cc, qty } once the API exists.
              setSent(true);
              setSending(false);
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-medium text-grey-900">Send this Quote</h2>
              <button type="button" aria-label="Close" onClick={() => setSending(false)} className="rounded-full bg-grey-100 p-1.5"><X size={16} /></button>
            </div>
            <label className="flex items-center gap-2 border-b border-border py-2 text-[13px] text-grey-800">
              To <input type="email" required multiple className="flex-1 outline-none" placeholder="you@company.com" />
            </label>
            <label className="flex items-center gap-2 border-b border-border py-2 text-[13px] text-grey-800">
              Cc <input type="email" multiple className="flex-1 outline-none" />
            </label>
            <div className="flex justify-center pt-5">
              <button type="submit" className="h-9 w-[150px] rounded-[4px] bg-warning text-[14px] font-medium text-white">Send</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
