import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: 'CineCatalog — Exclusive Movie Explorer',
  description:
    'Discover, search, and explore curated movies powered by catalog-api shared REST architecture.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
