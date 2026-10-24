import { cn } from "@/lib/cn";

const tones = {
  draft: "bg-grey-800 text-white",
  pending: "bg-warning text-white",
  reviewed: "bg-success text-white",
  approved: "bg-success text-white",
  inprogress: "bg-primary text-white",
} as const;

const labels: Record<keyof typeof tones, string> = {
  draft: "Draft",
  pending: "Pending",
  reviewed: "Reviewed",
  approved: "Approved",
  inprogress: "Inprogress",
};

export type BadgeTone = keyof typeof tones;

export function StatusBadge({ status, className }: { status: BadgeTone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[70px] items-center justify-center rounded-full px-2.5 py-1.5 text-[12px] leading-none font-medium",
        tones[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}

/** Coloured summary chip used in costing section headers (e.g. "Total Cost: $26172.78"). */
export function Chip({ tone, children }: { tone: "rose" | "amber" | "lime" | "teal" | "green" | "indigo"; children: React.ReactNode }) {
  const palette = {
    rose: "bg-[#fbe9e4]",
    amber: "bg-[#fdf1d8]",
    lime: "bg-[#eef3d6]",
    teal: "bg-[#ddf1ec]",
    green: "bg-[#dcf3dc]",
    indigo: "bg-[#e3e3f7]",
  };
  return <span className={cn("rounded-[4px] px-2 py-1 text-[12px] text-grey-900", palette[tone])}>{children}</span>;
}
