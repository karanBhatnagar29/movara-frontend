import { notFound } from "next/navigation";
import { EnrollmentClientPage } from "./page.client";
import { getBatches, getServiceBySlug, getSiteSettings } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function EnrollPage({ params }: { params: Promise<{ batchId: string }> }) {
  const { batchId } = await params;
  const [settingsState, batchesState] = await Promise.all([getSiteSettings(), getBatches()]);
  const batch = batchesState.data.find((item) => item.id === batchId);

  if (!batch) {
    notFound();
  }

  const serviceSlug = batch.services?.slug;
  const serviceState = serviceSlug ? await getServiceBySlug(serviceSlug) : null;

  return (
    <EnrollmentClientPage
      settings={settingsState.data}
      batch={batch}
      service={serviceState?.data ?? null}
    />
  );
}
