import { PageBody, PageHeader } from "@/components/layout/page-header";
import { Card, Table, Td, Th, THead, Tr } from "@/components/ui/table";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { num } from "@/lib/format";
import { Info } from "lucide-react";
import { notFound } from "next/navigation";
import { DevTabs } from "../dev-tabs";

export default async function FeasibilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [dev, data] = await Promise.all([api.development(id), api.feasibility(id)]);
  if (!dev) notFound();
  const totals = data.plan.reduce(
    (t, r) => ({ days: t.days + r.days, eff: t.eff + r.targetEff, prod: t.prod + r.productionPerDay, setup: t.setup + r.setupLossHour, util: t.util + r.utilizedHour }),
    { days: 0, eff: 0, prod: 0, setup: 0, util: 0 },
  );
  const tone = (h?: "red" | "amber") => cn(h === "red" && "text-danger", h === "amber" && "text-warning");

  return (
    <>
      <PageHeader
        title="Feasibility Report"
        crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Development Costing", href: "/development" }, { label: dev.dn, href: `/development/${id}` }, { label: "Feasibility" }]}
      >
        <DevTabs id={id} active="feasibility" />
      </PageHeader>
      <PageBody>
        <Card>
          <Table>
            <THead>
              <tr>
                <Th className="w-[96px]">SL No</Th>
                <Th className="text-left">Production &amp; Costing Parameters</Th>
                <Th className="w-[180px]">Unit</Th>
                <Th className="w-[210px]">Accountings</Th>
              </tr>
            </THead>
            <tbody className="text-[13px]">
              {data.rows.map((r, i) => (
                <Tr key={r.label}>
                  <Td className="h-9">{i + 1}</Td>
                  <Td className={cn("h-9 text-left", tone(r.highlight))}>{r.label}</Td>
                  <Td className="h-9">{r.unit}</Td>
                  <Td className={cn("h-9", tone(r.highlight))}>{r.value}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card className="overflow-hidden">
          <Table>
            <THead>
              <tr>
                <Th className="w-[66px]">#</Th>
                <Th>Days</Th>
                <Th>
                  <span className="inline-flex items-center gap-1.5">Target Eff% <Info size={14} /></span>
                </Th>
                <Th>Production/Day</Th>
                <Th>Set-up Loss Hour</Th>
                <Th>Utilized Hour</Th>
              </tr>
            </THead>
            <tbody className="text-[13px]">
              {data.plan.map((r, i) => (
                <Tr key={i}>
                  <Td className="h-9">{i + 1}</Td>
                  <Td className="h-9">{r.days.toFixed(2)}</Td>
                  <Td className="h-9">{r.targetEff.toFixed(2)}</Td>
                  <Td className="h-9">{r.productionPerDay.toFixed(2)}</Td>
                  <Td className="h-9">{r.setupLossHour.toFixed(2)}</Td>
                  <Td className="h-9">{r.utilizedHour.toFixed(2)}</Td>
                </Tr>
              ))}
              <tr className="bg-table-head">
                <Td className="h-10 text-grey-600">Total</Td>
                <Td className="h-10">{totals.days.toFixed(2)}</Td>
                <Td className="h-10">{(totals.eff / data.plan.length).toFixed(2)}</Td>
                <Td className="h-10">{num(totals.prod)}.00</Td>
                <Td className="h-10">{totals.setup.toFixed(2)}</Td>
                <Td className="h-10">{totals.util.toFixed(2)}</Td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </PageBody>
    </>
  );
}
