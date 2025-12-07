import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { NotifyProvider } from '@/providers/NotifyProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { UserProvider } from '@/providers/UserProvider';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <NotifyProvider>
            <Navbar />
            {children}
          </NotifyProvider>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
