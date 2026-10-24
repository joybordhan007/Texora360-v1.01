import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { ClientView } from "./client-view";

export default async function ClientProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await api.clientProduct(decodeURIComponent(slug));
  if (!product) notFound();
  return <ClientView product={{ ...product, style: decodeURIComponent(slug) || product.style }} />;
}
