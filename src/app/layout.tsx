import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { site } from "@/lib/site";
import { heroImages } from "@/lib/site";
import { I18nProvider } from "@/lib/i18n";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  metadataBase: new URL("https://lamarquise-douala.vercel.app"),
  title: {
    default: "La Marquise | Restaurant & Lounge in Bonapriso, Douala",
    template: "%s · La Marquise Douala",
  },
  description: site.descriptionBilingual.en,
  keywords: [
    "La Marquise", "restaurant Douala", "Bonapriso restaurant", "restaurant gastronomique Douala",
    "fast food Douala", "gambas Douala", "Lebanese restaurant Douala", "lounge Douala",
    "restaurant Cameroun", "Rue Tokoto Douala",
  ],
  authors: [{ name: "La Marquise" }],
  category: "Restaurant",
  icons: { icon: "/icon.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "La Marquise — Restaurant & Lounge in Douala",
    description: site.descriptionBilingual.en,
    type: "website",
    locale: "en_CM",
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "La Marquise — Bonapriso, Douala" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Marquise — Restaurant & Lounge in Douala",
    description: site.descriptionBilingual.en,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { languages: { en: "/", fr: "/?lang=fr" } },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  image: ["https://lamarquise-douala.vercel.app/og.jpg"],
  telephone: site.phone.replace(/\s/g, ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "CM",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsUrl,
  servesCuisine: [...site.cuisinesBilingual.en],
  priceRange: "$$ - $$$$",
  menu: "https://lamarquise-douala.vercel.app/#menu",
  acceptsReservations: "True",
  openingHoursSpecification: site.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.open + ":00",
    closes: h.close + ":00",
  })),
  sameAs: [site.instagram, site.facebook],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CM-LT" />
        <meta name="geo.placename" content="Douala" />
        <meta name="geo.position" content={`${site.geo.lat};${site.geo.lng}`} />
        <meta name="theme-color" content="#5a1820" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href={heroImages.hero} fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body>
        <ErrorBoundary>
          <I18nProvider>{children}</I18nProvider>
        </ErrorBoundary>
        <noscript>
          <div style={{ textAlign: "center", padding: "20px", fontSize: 14, background: "#3b1016", color: "#fff" }}>
            La Marquise · Restaurant &amp; Lounge — Reserve via phone: {site.phone}
          </div>
        </noscript>
      </body>
    </html>
  );
}
