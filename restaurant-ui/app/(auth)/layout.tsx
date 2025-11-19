import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { NotifyProvider } from '@/providers/NotifyProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Auth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NotifyProvider>{children}</NotifyProvider>
      </body>
    </html>
  );
}
