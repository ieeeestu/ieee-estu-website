import type { Metadata } from "next";
import { getLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://ieeeestu.org";
const siteName = "IEEE ESTÜ Student Branch";
const siteDescription =
  "Eskişehir Teknik Üniversitesi IEEE Öğrenci Kolu (IEEE ESTÜ). ESTÜ öğrenci kulübü olarak mühendislik, teknoloji, yazılım etkinlikleri, workshop'lar ve yarışmalar düzenliyoruz. ESTÜ öğrenci topluluğu.";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | IEEE ESTÜ",
  },
  description: siteDescription,
  applicationName: siteName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      tr: "/tr",
      en: "/en",
    },
  },
  keywords: [
    "IEEE ESTÜ",
    "IEEE Eskişehir",
    "Eskişehir Teknik Üniversitesi",
    "IEEE Öğrenci Kolu",
    "Eskişehir IEEE",
    "IEEE Student Branch",
    "ESTÜ IEEE",
    "Eskişehir öğrenci topluluğu",
    "mühendislik topluluğu",
    "teknoloji etkinlikleri",
    "ESTÜ öğrenci kulübü",
    "ESTÜ kulüp",
    "ESTÜ öğrenci kolu",
    "Eskişehir Teknik Üniversitesi öğrenci kulübü",
    "ESTÜ student club",
    "IEEE ESTU",
    "IEEE Eskisehir Technical University",
    "mühendislik öğrencileri",
    "teknoloji kulübü",
    "yazılım kulübü Eskişehir",
    "robotik kulübü ESTÜ",
    "IEEE workshop",
    "IEEE etkinlikleri",
    "ESTÜ IEEE etkinlikleri",
  ],
  authors: [{ name: "IEEE ESTÜ Student Branch", url: siteUrl }],
  creator: "IEEE ESTÜ Student Branch",
  publisher: "IEEE ESTÜ Student Branch",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/images/5a2336625723febf4e09060e22c79f4ed9fe253e.png",
        width: 512,
        height: 512,
        alt: "IEEE ESTÜ Student Branch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    site: "@ieeeestu",
    creator: "@ieeeestu",
    images: ["/images/5a2336625723febf4e09060e22c79f4ed9fe253e.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/images/5a2336625723febf4e09060e22c79f4ed9fe253e.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/images/5a2336625723febf4e09060e22c79f4ed9fe253e.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IEEE ESTÜ Student Branch",
    url: siteUrl,
    logo: `${siteUrl}/images/5a2336625723febf4e09060e22c79f4ed9fe253e.png`,
    sameAs: [
      "https://www.instagram.com/ieee.estu/",
      "https://www.linkedin.com/company/ieee-estu/",
      "https://twitter.com/ieeeestu",
      "https://medium.com/@ieee-estu",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Eskişehir",
      addressCountry: "TR",
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
