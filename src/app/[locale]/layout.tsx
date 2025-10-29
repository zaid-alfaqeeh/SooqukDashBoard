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
  title: "Dashboard",
  description: "Dashboard with next-intl internationalization",
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
