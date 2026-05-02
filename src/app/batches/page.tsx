import { BatchesClientPage } from "./page.client";
import { getBatches, getSiteSettings } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function BatchesPage() {
  const [batchesState, settingsState] = await Promise.all([getBatches(), getSiteSettings()]);

  return <BatchesClientPage batches={batchesState.data} settings={settingsState.data} />;
}
