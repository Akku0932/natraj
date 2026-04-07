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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of electrical panels does Natraj manufacture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We manufacture a wide range including three-phase panels, automatic changeovers, busbar systems, temperature control panels, water level controllers, distribution panels, and more. Each panel is custom-designed to meet specific requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Are your panels ISI marked and certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Natraj Electricals is an ISO 9001:2015 certified company. Our panels are manufactured using premium-grade components from reputed brands and undergo rigorous quality testing before delivery."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get custom panels designed for my specific needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We specialize in custom solutions. Our experienced engineering team will work with you to design panels tailored to your exact specifications, load requirements, and budget."
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
        "name": "What warranty do your products carry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All our electrical panels come with a comprehensive warranty. Specific warranty terms vary by product category and are communicated at the time of order confirmation."
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
        "name": "Do you provide installation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our team provides professional installation support and commissioning services for all our electrical panels. We ensure proper setup and testing before handover."
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
