import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { ReduxProvider } from "@/features/providers/ReduxProvider";
import { ReactQueryProvider } from "@/features/providers/ReactQueryProvider";
import { ToastProvider } from "@/components/Toast/Toast";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Sooquk - Jordan's Fashion Marketplace | Discover. Compare. Shop Locally",
    template: "%s | Sooquk",
  },
  description:
    "Sooquk is Jordan's premier fashion marketplace app. Browse hundreds of local clothing stores, boutiques, and brands in one convenient platform. Discover the latest fashion trends, compare prices, and shop effortlessly across Jordan. The Talabat of Fashion.",
  keywords: [
    "Sooquk",
    "Jordan fashion",
    "fashion marketplace",
    "clothing stores Jordan",
    "boutiques Amman",
    "online fashion shopping",
    "Jordan clothing app",
    "fashion discovery",
    "local fashion stores",
    "Jordan shopping app",
    "fashion comparison",
    "Amman boutiques",
    "Jordanian fashion",
    "fashion delivery Jordan",
  ],
  authors: [{ name: "Sooquk" }],
  creator: "Sooquk",
  publisher: "Sooquk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://sooquk.com"
  ),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_JO"],
    url: "/",
    siteName: "Sooquk",
    title:
      "Sooquk - Jordan's Fashion Marketplace | Discover. Compare. Shop Locally",
    description:
      "Jordan's premier fashion marketplace app. Browse hundreds of local clothing stores, boutiques, and brands in one convenient platform. Discover, compare, and shop effortlessly across Jordan.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sooquk - Jordan's Fashion Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sooquk - Jordan's Fashion Marketplace",
    description:
      "Discover, compare, and shop from hundreds of Jordanian clothing stores in one app. The Talabat of Fashion.",
    images: ["/twitter-image.jpg"],
    creator: "@Sooquk",
    site: "@Sooquk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    yandex: process.env.YANDEX_VERIFICATION_ID,
    yahoo: process.env.YAHOO_VERIFICATION_ID,
  },
  category: "E-commerce",
  classification: "Fashion Marketplace",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Sooquk",
    "mobile-web-app-capable": "yes",
    "theme-color": "#7c3aed",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <ReduxProvider>
            <ReactQueryProvider>
              <ToastProvider>
                <NextIntlClientProvider messages={messages}>
                  {children}
                </NextIntlClientProvider>
              </ToastProvider>
            </ReactQueryProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
