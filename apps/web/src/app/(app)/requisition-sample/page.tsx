import { api } from "@/lib/api";
import { RequisitionList } from "./requisition-list";

export default async function RequisitionPage() {
  const rows = await api.requisitions();
  const details = Object.fromEntries((await Promise.all(rows.map((r) => api.requisition(r.id)))).filter(Boolean).map((d) => [d!.id, d!]));
  return <RequisitionList initialRows={rows} details={details} />;
}
