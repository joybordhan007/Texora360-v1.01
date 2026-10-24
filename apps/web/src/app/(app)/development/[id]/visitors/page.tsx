import { PageBody, PageHeader } from "@/components/layout/page-header";
import { PeopleTable } from "@/components/people-table";
import { Card } from "@/components/ui/table";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { DevTabs } from "../dev-tabs";

export default async function VisitorsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [dev, visitors] = await Promise.all([api.development(id), api.visitors(id)]);
  if (!dev) notFound();
  return (
    <>
      <PageHeader
        title="Visitors List"
        crumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Development Costing", href: "/development" }, { label: dev.dn, href: `/development/${id}` }, { label: "View Visitors List" }]}
      >
        <DevTabs id={id} active="visitors" />
      </PageHeader>
      <PageBody>
        <Card>
          <PeopleTable rows={visitors} />
        </Card>
      </PageBody>
    </>
  );
}
