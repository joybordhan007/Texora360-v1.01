import { api } from "@/lib/api";
import { HangTagList } from "./hang-tag-list";

export default async function HangTagPage() {
  return <HangTagList rows={await api.hangTags()} />;
}
