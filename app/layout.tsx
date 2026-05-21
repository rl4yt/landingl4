import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Navbar from "@/components/layout/navbar";

export const metadata = {
  title: "L4 Engenharia — Controladoria de obras com IA",
  description:
    "Pipeline de auditoria EVM com 6 agentes IA: CPI, SPI, EAC, alertas defensáveis em auditoria. Para construtoras de alto padrão.",
  metadataBase: new URL("https://l4-landing.vercel.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={cx(sfPro.variable, inter.variable, "bg-white")}>
        <Suspense fallback="...">
          <Navbar />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center">
          {children}
        </main>
        <Footer />
        <VercelAnalytics />
      </body>
    </html>
  );
}
