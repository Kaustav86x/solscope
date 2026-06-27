import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import PrivyProvider from '@/components/providers/PrivyProvider';
import Navbar from '@/components/layout/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ChadWallet — Trade Memecoins Like a Chad',
  description:
    'Buy, sell, and discover the hottest Solana tokens — instantly, from your phone or the web. No wallet needed to start.',
  metadataBase: new URL('https://chadwallet.xyz'),
  openGraph: {
    title: 'ChadWallet — Trade Memecoins Like a Chad',
    description: 'The premier Solana memecoin trading platform.',
    images: ['/assets/light.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChadWallet',
    description: 'Trade memecoins like a chad.',
    images: ['/assets/light.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PrivyProvider>
          <Navbar />
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
