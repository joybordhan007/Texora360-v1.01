import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";
import { Icon } from "./icon";

// Table styling from the Figma list screens: #F9FAFB header, 4% black dividers, 14px medium #3E3E3E text.

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-[8px] bg-white shadow-e1", className)} {...props} />;
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse text-[14px] font-medium text-grey-800", className)} {...props} />
    </div>
  );
}

export function THead({ className, ...props }: ComponentProps<"thead">) {
  return <thead className={cn("bg-table-head", className)} {...props} />;
}

export function Th({ className, filter, children, ...props }: ComponentProps<"th"> & { filter?: boolean }) {
  return (
    <th
      className={cn(
        "h-11 border-b border-l border-line px-2 text-center font-medium whitespace-nowrap first:border-l-0",
        className,
      )}
      {...props}
    >
      {filter ? (
        <span className="flex items-center justify-between gap-2">
          {children}
          <span className="rounded-[4px] p-1 hover:bg-grey-100">
            <Icon src="/figma/filter-list.svg" size={16} className="text-grey-800" />
          </span>
        </span>
      ) : (
        children
      )}
    </th>
  );
}

export function Tr({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn("border-b border-line last:border-b-0 hover:bg-[#fafbfc]", className)} {...props} />;
}

export function Td({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("h-[46px] border-l border-line px-2 text-center first:border-l-0", className)} {...props} />;
}
