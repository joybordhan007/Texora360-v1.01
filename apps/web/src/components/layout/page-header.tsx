import Link from "next/link";
import { Fragment, type ReactNode } from "react";

export type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  badge,
  crumbs,
  children,
}: {
  title: string;
  badge?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="no-print flex flex-wrap items-center justify-between gap-4 px-4 py-1.5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] leading-[1.2] font-semibold whitespace-nowrap text-grey-900">{title}</h1>
          {badge}
        </div>
        <p className="text-[14px] leading-[1.2] font-medium text-grey-600">
          {crumbs.map((c, i) => (
            <Fragment key={i}>
              {i > 0 && " > "}
              {i === crumbs.length - 1 ? (
                <span className="text-ink">{c.label}</span>
              ) : c.href ? (
                <Link href={c.href} className="hover:text-primary">{c.label}</Link>
              ) : (
                c.label
              )}
            </Fragment>
          ))}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        <HeaderIcons />
      </div>
    </header>
  );
}

function HeaderIcons() {
  return (
    <div className="flex items-center">
      <button aria-label="Notifications" className="relative p-[11px]">
        <img src="/figma/notifications.svg" alt="" className="size-6" />
        <span className="absolute top-[13px] left-6 size-2 rounded-full border border-page bg-danger-strong" />
      </button>
      <button aria-label="Messages" className="relative p-[11px]">
        <img src="/figma/message.svg" alt="" className="size-6" />
        <span className="absolute top-[11px] left-[27px] size-2 rounded-full border border-page bg-danger-strong" />
      </button>
    </div>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 px-4 pt-4 pb-4">{children}</div>;
}
