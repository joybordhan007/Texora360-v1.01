import { api } from "@/lib/api";
import { DevelopmentList } from "./development-list";

export default async function DevelopmentPage() {
  const [rows, master] = await Promise.all([api.developments(), api.masterData()]);
  return <DevelopmentList initialRows={rows} buyers={master.buyers} seasons={master.seasons} />;
}
