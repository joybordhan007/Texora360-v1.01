import { api } from "@/lib/api";
import { SettingsView } from "./settings-view";

export default async function SettingsPage() {
  return <SettingsView initial={await api.masterData()} />;
}
