import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { NotifyProvider } from '@/providers/NotifyProvider';
import { UserProvider } from '@/providers/UserProvider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Restaurant food ordering',
  description: 'Restaurant food ordering app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <UserProvider>
            <NotifyProvider>
              <Navbar />
              {children}
            </NotifyProvider>
            <Footer />
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
