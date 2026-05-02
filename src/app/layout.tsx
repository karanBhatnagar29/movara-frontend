import type { Metadata } from "next";
import "@/styles.css";

export const metadata: Metadata = {
  title: "Movara — Move with grace. Live with vitality.",
  description:
    "Movara is a global movement and wellness platform offering live classes, discovery calls, and guided transformation programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
