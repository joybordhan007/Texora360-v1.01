import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CostingView } from "./costing-view";

export default async function DevelopmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [dev, master, comments, inquiries] = await Promise.all([api.development(id), api.masterData(), api.comments(), api.inquiries(id)]);
  if (!dev) notFound();
  return (
    <Suspense>
      <CostingView initial={dev} master={master} comments={comments} inquiries={inquiries} />
    </Suspense>
  );
}
