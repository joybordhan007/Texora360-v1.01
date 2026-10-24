import { api } from "@/lib/api";
import { GalleryView } from "./gallery-view";

export default async function GalleryPage() {
  return <GalleryView items={await api.gallery()} />;
}
