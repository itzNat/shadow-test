import "@/app/globals.css";
import { Layout } from "@/components/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barry Bee Auto — Trusted Car Dealer in Benin City",
  description: "Buy, sell, swap and import cars in Benin City. Direct USA imports and flexible car savings plans.",
  icons: {
    icon: "/__l5e/assets-v1/6b916ba7-65af-4da6-ba4e-05d7fab8ae11/barry-bee-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
