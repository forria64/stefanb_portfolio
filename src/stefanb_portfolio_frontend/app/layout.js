// File: src/stefanb_portfolio_frontend/app/layout.js

import './globals.css';
import { Outfit } from 'next/font/google';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { getMetadataYears } from 'utils/getMetadataYears';

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ],
});

// Retrieve metadata for the header on the server side
const { paintingYears, collaborationYears } = getMetadataYears();

export const metadata = {
  title: 'stefanb.art',
  description:
    'Self-taught artist focused on concept/visual design, now bringing my work on-chain through Internet Computer Protocol and Bitcoin. This site features my physical canvas paintings as digital twins, ready to become NFTs that certify authenticity for the originals, as well as all collaborative projects I\'ve been part of.',
  keywords: ['digital art', 'creative', 'portfolio', 'artist'],
  openGraph: {
    title: 'stefanb.art',
    description:
      'Self-taught artist focused on concept/visual design, now bringing my work on-chain through Internet Computer Protocol and Bitcoin.',
    url: 'https://stefanb.art',
    siteName: 'stefanb.art',
    images: [
      {
        url: 'https://stefanb.vercel.app/banner.png',
        width: 1200,
        height: 630,
        alt: 'stefanb.art Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'stefanb.art',
    description:
      'Self-taught artist focused on concept/visual design, now bringing my work on-chain through Internet Computer Protocol and Bitcoin.',
    images: ['https://stefanb.vercel.app/banner.png'],
    creator: '@stefanbdotart',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} bg-dark-primary min-h-screen`}>
        {/* Fixed header at the top */}
        <Header paintingYears={paintingYears} collaborationYears={collaborationYears} />
        {/* Main content: height calculated to fill viewport between header and footer */}
        <main
          className="flex items-center justify-center overflow-hidden"
          style={{ height: 'calc(100vh - 130px)' }}
        >
          {children}
        </main>
        {/* Fixed footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}

