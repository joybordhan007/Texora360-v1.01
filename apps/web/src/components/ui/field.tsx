import { cn } from "@/lib/cn";
import { ChevronDown, Search } from "lucide-react";
import type { ComponentProps } from "react";

const control =
  "h-10 w-full rounded-[6px] border border-border bg-white px-3 text-[14px] text-grey-900 outline-none placeholder:text-black/30 focus:border-primary";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, className)} {...props} />;
}

export function Select({
  options,
  placeholder,
  className,
  ...props
}: ComponentProps<"select"> & { options: string[]; placeholder?: string }) {
  return (
    <div className={cn("relative", className)}>
      <select className={cn(control, "appearance-none pr-8 invalid:text-black/30")} defaultValue="" required {...props}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o} className="text-grey-900">{o}</option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-grey-800" />
    </div>
  );
}

export function SearchBox({ className, ...props }: ComponentProps<"input">) {
  return (
    <label className={cn("flex h-[46px] items-center gap-1 rounded-[8px] border border-black/20 bg-white px-3", className)}>
      <Search size={20} className="text-black/30" />
      <input className="w-full bg-transparent text-[16px] text-grey-900 outline-none placeholder:text-black/20" placeholder="Search now" {...props} />
    </label>
  );
}

/** Borderless cell editor used inside the "Add …" grid modals. */
export function CellInput({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn("h-full w-full min-w-[110px] bg-transparent px-2 text-center text-[13px] text-grey-900 outline-none placeholder:text-black/30 focus:bg-primary-soft", className)}
      {...props}
    />
  );
}

export function CellSelect({ options, placeholder, ...props }: ComponentProps<"select"> & { options: string[]; placeholder: string }) {
  return (
    <div className="relative h-full min-w-[120px]">
      <select
        className="h-full w-full appearance-none bg-transparent pr-6 pl-2 text-[13px] text-grey-900 outline-none invalid:text-black/30 focus:bg-primary-soft"
        defaultValue=""
        required
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} className="text-grey-900">{o}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-grey-800" />
    </div>
  );
}
