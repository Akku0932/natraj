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
  title: "Natraj Electricals | Trusted Electrical Panel Distributor",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  description:
    "Trusted distributor and supplier of quality electrical control panels, automatic changeovers, busbar systems, and more from India's leading brands.",
  keywords: [
    "Natraj Electricals",
    "electrical control panels",
    "automatic changeovers",
    "busbar systems",
    "electrical distributor",
    "electrical supplier",
    "electrical panels Delhi",
    "Bhagirath Place",
    "power factor panels",
    "water level controllers",
    "solar panels",
    "Siemens distributor",
    "Schneider Electric distributor",
  ],
  authors: [{ name: "Natraj Electricals" }],
  openGraph: {
    title: "Natraj Electricals | Trusted Electrical Panel Distributor",
    description:
      "Trusted distributor and supplier of quality electrical control panels, automatic changeovers, busbar systems, and more from India's leading brands.",
    siteName: "Natraj Electricals",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natraj Electricals | Trusted Electrical Panel Distributor",
    description:
      "Trusted distributor and supplier of quality electrical control panels, automatic changeovers, busbar systems, and more from India's leading brands.",
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
    "description": "Trusted distributor and supplier of quality electrical control panels, automatic changeovers, busbar systems, and more from India's leading brands.",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of electrical panels does Natraj supply?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We supply a wide range including three-phase panels, automatic changeovers, busbar systems, temperature control panels, water level controllers, distribution panels, and more from India's leading brands."
        }
      },
      {
        "@type": "Question",
        "name": "Are the products you supply certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Natraj Electricals supplies only ISI-marked, BIS, and CE certified products from reputed manufacturers. Every product is quality-checked before delivery."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get custom panels for my specific needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We can source custom-configured panels from our manufacturing partners. Our team will work with you to find the right products for your specifications and budget."
        }
      },
      {
        "@type": "Question",
        "name": "What is the typical delivery timeline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard panels are typically delivered within 7-15 working days depending on the complexity and order size. Custom panels may take 15-30 days. We also offer expedited delivery for urgent orders."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide installation support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide detailed installation guidelines and technical support. For projects in Delhi NCR, our team can assist with on-site installation guidance as well."
        }
      },
      {
        "@type": "Question",
        "name": "What warranty do the products carry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All products we supply come with manufacturer warranty. Specific warranty terms vary by product and brand, and are communicated at the time of order confirmation."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer after-sales service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our dedicated support team provides after-sales service including troubleshooting, maintenance guidance, and spare parts availability. You can reach us via phone, email, or WhatsApp."
        }
      },
      {
        "@type": "Question",
        "name": "How can I get a price quote?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can request a quote through our contact form on the website, call us directly at +91 98682 25911, or message us on WhatsApp. We typically respond within 24 hours with a detailed quotation."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide installation support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide detailed installation guidelines and technical support for all products. For projects in Delhi NCR, our team can assist with on-site guidance as well."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept bank transfers (NEFT/RTGS), cheque payments, and UPI. For large orders, we offer flexible payment terms including partial advance and milestone-based payments."
        }
      }
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          defaultTheme="system"
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
