import { ButtonLink } from "@/components/ui/button";
import { PrintButton } from "./print-button";

/** Header switcher shared by Cost Sheet / Visitors List / Feasibility pages. */
export function DevTabs({ id, active }: { id: string; active: "cost" | "visitors" | "feasibility" }) {
  const tab = (key: typeof active, label: string, href: string) => (
    <ButtonLink href={href} variant={active === key ? "primary" : "soft"} size="sm">
      {label}
    </ButtonLink>
  );
  return (
    <>
      {tab("cost", "Cost Sheet", `/development/${id}`)}
      {tab("visitors", "View Visitors List", `/development/${id}/visitors`)}
      {tab("feasibility", "Feasibility", `/development/${id}/feasibility`)}
      <PrintButton />
    </>
  );
}
