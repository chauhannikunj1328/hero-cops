import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Inter variable, self-hosted (OFL). Same family the Framer template uses.
const inter = localFont({
  src: "../fonts/inter-var.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hero Cops | Verified stories of officers serving beyond the call",
    template: "%s | Hero Cops",
  },
  description:
    "Hero Cops publishes verified stories of compassion, courage and service by law-enforcement officers. Departments and the public can submit a story for verification.",
  robots: { index: false, follow: false }, // test environment
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-bg focus:px-4 focus:py-2">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
