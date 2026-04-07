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
  return (
    <html lang="en" suppressHydrationWarning>
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
