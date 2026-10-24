"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <Button variant="soft" size="sm" onClick={() => window.print()}>
      Print <Printer size={16} />
    </Button>
  );
}
