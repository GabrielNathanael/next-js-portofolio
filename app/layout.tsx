// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { siteConfig, jsonLdPerson } from "@/lib/seo/config";
import { Analytics } from "@vercel/analytics/next";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Full Stack Developer`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,

  // Other
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Global Person Schema - Helps Google recognize brand across all pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPerson),
          }}
        />

        {/* Geographic Meta Tags for Local SEO */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.2088;106.8456" />
        <meta name="ICBM" content="-6.2088, 106.8456" />

        {/* Preconnect to Contentful CDN - reduce resource load delay */}
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://assets.ctfassets.net" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://assets.ctfassets.net" />
      </head>
      <body className={urbanist.className}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" expand={false} richColors closeButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
