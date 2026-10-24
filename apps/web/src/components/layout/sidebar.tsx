"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../ui/icon";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "/figma/nav-dashboard.svg" },
  { href: "/development", label: "Development", icon: "/figma/nav-development.svg" },
  { href: "/requisition-sample", label: "Requisition Sample", icon: "/figma/nav-requisition.svg" },
  { href: "/quotes", label: "Quote List", icon: "/figma/nav-quote.svg" },
  { href: "/events", label: "Events", icon: "/figma/nav-events.svg" },
  { href: "/gallery", label: "Sample Gallery", icon: "/figma/nav-gallery.svg" },
  { href: "/hang-tag", label: "Print Hang Tag", icon: "/figma/nav-hangtag.svg" },
  { href: "/settings", label: "Development Settings", icon: "/figma/nav-settings.svg" },
];

/** Logo assembled from the four Figma vector groups, positioned exactly as in "Logo 1" (163×44). */
function Logo() {
  const parts: [string, string][] = [
    ["/figma/logo-mark.svg", "9.38% 73.26% 9.37% 4.04%"],
    ["/figma/logo-text-1.svg", "16.34% 27.45% 53.84% 33.47%"],
    ["/figma/logo-text-2.svg", "16% 4.27% 54.03% 75.42%"],
    ["/figma/logo-text-3.svg", "65.49% 24.49% 15.81% 33.47%"],
  ];
  return (
    <div className="relative h-11 w-[163px] shrink-0 overflow-hidden" aria-label="Texora360 ERP Solutions">
      {parts.map(([src, inset]) => (
        <div key={src} className="absolute" style={{ inset }}>
          <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
        </div>
      ))}
    </div>
  );
}

function LogoMark() {
  return (
    <div className="relative h-11 w-9 overflow-hidden">
      <img src="/figma/logo-mark.svg" alt="Texora360" className="absolute inset-[9.38%_0_9.37%_0] m-auto block h-[81%]" />
    </div>
  );
}

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "no-print sticky top-0 flex h-screen shrink-0 flex-col justify-between overflow-y-auto bg-white pt-6 shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[300px]",
      )}
    >
      <div className="flex flex-col gap-8 px-2.5">
        <div className="flex flex-col gap-6">
          <div className={cn("flex items-center py-0.5", collapsed ? "flex-col gap-3" : "justify-between px-3")}>
            {collapsed ? <LogoMark /> : <Logo />}
            <button onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="rounded p-0.5 hover:bg-page">
              <Icon src="/figma/sidebar-toggle.svg" size={24} className="text-ink" />
            </button>
          </div>
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-[8px] p-3 text-[16px] leading-[1.2] font-medium",
                    active ? "bg-primary text-white" : "text-ink hover:bg-page",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon src={item.icon} size={24} />
                  {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        {!collapsed && <UpcomingEvent />}
      </div>

      <div className="flex flex-col gap-3 bg-white pb-6">
        <div className={cn("flex h-[59px] items-center justify-between border-t border-border py-3", collapsed ? "justify-center px-0" : "px-[22px]")}>
          <div className="flex items-center gap-3">
            <Image src="/figma/avatar.png" alt="" width={32} height={32} className="size-8 rounded-full border border-white object-cover" />
            {!collapsed && (
              <div className="flex w-[146px] flex-col gap-1 leading-[1.2] text-ink">
                <span className="text-[14px] font-medium">Joybordhan Sarkar</span>
                <span className="text-[12px]">Development Team</span>
              </div>
            )}
          </div>
          {!collapsed && <Icon src="/figma/arrow-forward.svg" size={24} className="text-ink" />}
        </div>
        <Link href="/login" className={cn("flex items-center gap-3 rounded-[8px] py-3 text-[16px] font-medium text-danger", collapsed ? "justify-center" : "px-[22px]")}>
          <Icon src="/figma/logout.svg" size={24} />
          {!collapsed && "Logout"}
        </Link>
      </div>
    </aside>
  );
}

function UpcomingEvent() {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] bg-primary-soft p-3">
      <span className="flex w-fit items-center gap-1 rounded-[7px] border border-primary/60 bg-primary/10 p-2 text-[12px] font-medium text-primary">
        <span className="size-1 rounded-full bg-primary" />
        Upcoming Event
      </span>
      <div className="flex flex-col gap-4">
        <p className="text-[14px] leading-[1.2] font-medium text-grey-800">13th International Yarn &amp; Fabrics Show - 2026</p>
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-grey-700">
          <img src="/figma/pin.svg" alt="" className="size-3" />
          Bashundhara (ICCB), Dhaka
        </p>
        <p className="flex items-end gap-1.5 text-[12px] font-medium text-grey-500">
          <img src="/figma/calendar-sm.svg" alt="" className="size-3" />
          August 13 - August 16, 2026
        </p>
      </div>
      <div className="relative h-[176px] w-full overflow-hidden rounded-[8px]">
        <Image src="/figma/event-cover.png" alt="Upcoming event venue" fill sizes="260px" className="object-cover" />
      </div>
    </div>
  );
}
