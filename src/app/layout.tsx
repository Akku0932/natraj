import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natraj Electricals | Premium Electrical Control Panels",
  description:
    "ISO 9001:2015 certified manufacturer of premium electrical control panels, automatic changeovers, busbar systems, and more.",
  keywords: [
    "Natraj Electricals",
    "electrical control panels",
    "automatic changeovers",
    "busbar systems",
    "ISO 9001:2015",
    "electrical panels",
    "control panels manufacturer",
    "Delhi electrical",
    "Bhagirath Place",
    "power factor panels",
    "water level controllers",
    "solar panels",
  ],
  authors: [{ name: "Natraj Electricals" }],
  openGraph: {
    title: "Natraj Electricals | Premium Electrical Control Panels",
    description:
      "ISO 9001:2015 certified manufacturer of premium electrical control panels, automatic changeovers, busbar systems, and more.",
    siteName: "Natraj Electricals",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natraj Electricals | Premium Electrical Control Panels",
    description:
      "ISO 9001:2015 certified manufacturer of premium electrical control panels, automatic changeovers, busbar systems, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Natraj Electricals",
    "description": "ISO 9001:2015 certified manufacturer of premium electrical control panels, automatic changeovers, busbar systems, and more.",
    "url": "https://natrajelectricals.com",
    "telephone": ["+91-11-23873532", "+91-9868225911"],
    "email": "natrajenterprises14@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1547/3, Jai Hind Building, Bhagirath Place",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110006",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6508,
      "longitude": 77.2345
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "priceRange": "$$",
    "image": "/images/logo.PNG"
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
