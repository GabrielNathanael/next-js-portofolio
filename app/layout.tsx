// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { siteConfig, jsonLdPerson } from "@/lib/seo/config";
import { Analytics } from "@vercel/analytics/next";
import ChatWidget from "@/components/chat/ChatWidget";
import { Karla, Inconsolata } from "next/font/google";

/* =========================
   Fonts
========================= */

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/* =========================
   Viewport
========================= */

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

/* =========================
   Metadata
========================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Full Stack Developer`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,

  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

/* =========================
   Root Layout
========================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Global Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPerson),
          }}
        />

        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.2088;106.8456" />
        <meta name="ICBM" content="-6.2088, 106.8456" />

        {/* Contentful Optimization */}
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://assets.ctfassets.net" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://assets.ctfassets.net" />
      </head>

      <body className={`${karla.variable} ${inconsolata.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" expand={false} richColors closeButton />
          <ChatWidget />
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
