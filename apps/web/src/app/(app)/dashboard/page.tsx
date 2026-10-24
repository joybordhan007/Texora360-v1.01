import { api } from "@/lib/api";
import { DashboardView } from "./dashboard-view";

export default async function DashboardPage() {
  const data = await api.dashboard();
  return <DashboardView data={data} />;
}
