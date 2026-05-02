import { MyClassesClientPage } from "./page.client";
import { getSiteSettings } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function MyClassesPage() {
  const settingsState = await getSiteSettings();
  return <MyClassesClientPage settings={settingsState.data} />;
}
