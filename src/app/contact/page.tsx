import { ContactPageClient } from "./page.client";
import { getSiteSettings } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settingsState = await getSiteSettings();
  return <ContactPageClient settings={settingsState.data} />;
}
