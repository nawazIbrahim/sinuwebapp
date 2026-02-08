import type { Metadata } from 'next';
import './globals.css';
import { Preloader } from '@/components/preloader/Preloader';

export const metadata: Metadata = {
  title: 'MyDigiLink - Digital Profile',
  description: 'Professional digital profile platform',
  manifest: '/manifest.json',
  themeColor: '#136dec',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
