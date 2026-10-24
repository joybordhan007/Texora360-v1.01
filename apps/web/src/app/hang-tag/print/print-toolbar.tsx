"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

export function PrintToolbar({ count }: { count: number }) {
  const router = useRouter();
  return (
    <div className="no-print sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-3 shadow-e1">
      <Button variant="ghost" onClick={() => router.back()}><ArrowLeft size={18} /> Back</Button>
      <p className="text-[14px] text-grey-700">{count} hang tag{count === 1 ? "" : "s"} · Front &amp; Back · 6 × 12 cm</p>
      <Button onClick={() => window.print()} disabled={count === 0}><Printer size={18} /> Print</Button>
    </div>
  );
}
