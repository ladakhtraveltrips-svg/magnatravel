import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AnalyticsHead, AnalyticsNoScript } from "@/components/Analytics";
import ClickTracker from "@/components/ClickTracker";
import { BUSINESS, SITE_URL } from "@/lib/constants";
import { SEO } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.title, template: `%s | ${BUSINESS.name}` },
  description: SEO.description,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: { telephone: false, email: false, address: false },
  category: "travel",
};

export const viewport = {
  themeColor: "#123B3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <AnalyticsNoScript />
        {children}
        <ClickTracker />
        <AnalyticsHead />
      </body>
    </html>
  );
}
