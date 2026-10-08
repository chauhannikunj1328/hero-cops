import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Self-hosted variable fonts (OFL). No third-party font requests from visitors' browsers.
const archivo = localFont({
  src: "../fonts/archivo-var.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const sourceSerif = localFont({
  src: [
    { path: "../fonts/source-serif-4-var.woff2", style: "normal", weight: "200 900" },
    { path: "../fonts/source-serif-4-var-italic.woff2", style: "italic", weight: "200 900" },
  ],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hero Cops | Verified stories of officers serving beyond the call",
    template: "%s | Hero Cops",
  },
  description:
    "Hero Cops publishes verified stories of compassion, courage and service by law-enforcement officers. Departments and the public can submit a story for verification.",
  robots: { index: false, follow: false }, // test environment: keep out of search
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-surface focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to content
        </a>
        <div className="bg-ink text-[13px] text-white/80 text-center px-4 py-2">
          Test environment for the Hero Cops trial build. Not the live HeroCops.us site.
        </div>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
