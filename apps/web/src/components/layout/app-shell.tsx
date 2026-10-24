"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./sidebar";

const KEY = "texora.sidebar.collapsed";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(KEY) === "1");
    } catch {}
  }, []);

  const toggle = () =>
    setCollapsed((c) => {
      try {
        localStorage.setItem(KEY, c ? "0" : "1");
      } catch {}
      return !c;
    });

  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <main className="min-w-0 flex-1 pt-4">{children}</main>
    </div>
  );
}
