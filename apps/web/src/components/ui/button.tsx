import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  dark: "bg-ink text-white hover:bg-black",
  primary: "bg-primary text-white hover:bg-[#1574ea]",
  soft: "bg-grey-100 text-grey-900 border border-border hover:bg-[#e4e4e4]",
  outline: "bg-white text-grey-900 border border-border hover:bg-page",
  danger: "bg-[#ff3b30] text-white hover:bg-[#e8302a]",
  teal: "bg-teal text-white hover:bg-[#0b7a6b]",
  ghost: "text-grey-800 hover:bg-page",
} as const;

const sizes = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-[6px]",
  md: "h-[38px] px-4 text-[14px] gap-2 rounded-[6px]",
  lg: "h-[43px] px-4 text-[16px] gap-2 rounded-[6px]",
} as const;

type Common = { variant?: keyof typeof variants; size?: keyof typeof sizes };

const base = "inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

export function Button({ variant = "dark", size = "md", className, ...props }: ComponentProps<"button"> & Common) {
  return <button type="button" className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({ variant = "dark", size = "md", className, ...props }: ComponentProps<typeof Link> & Common) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
