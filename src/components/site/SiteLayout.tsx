import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import type { SiteSettings } from "@/lib/api";

export function SiteLayout({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings?: SiteSettings | null;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar
        brandName={settings?.brand_name ?? "Movara"}
        contactCtaLabel={settings?.hero_secondary_cta_label ?? "Book a Discovery Call"}
      />
      <main className="flex-1 pt-24">{children}</main>
      <Footer
        brandName={settings?.brand_name ?? "Movara"}
        tagline={
          settings?.tagline ??
          "Movement that meets you where you are. Practiced together, worldwide."
        }
        supportEmail={settings?.support_email ?? "hello@movara.studio"}
        supportPhone={settings?.support_phone ?? "+1 (000) 000-0000"}
        instagramUrl={settings?.instagram_url}
      />
    </div>
  );
}
