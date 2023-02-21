import "@/styles/globals.css";

import AnalyticsWrapper from "../components/analytics";
import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`"scroll-smooth" ${inter.variable}`}>
      <body className="bg-white leading-normal text-zinc-600 antialiased dark:bg-zinc-900 dark:text-zinc-400">
        <main>{children}</main>

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
