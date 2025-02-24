// File: src/stefanb_portfolio_frontend/app/paintings/[year]/page.js

import ArtworkCarousel from 'components/ArtworkCarousel';
import { getArtwork } from 'utils/getArtwork';
import { notFound } from 'next/navigation';
import { getMetadataYears } from 'utils/getMetadataYears';

export function generateStaticParams() {
  const { paintingYears } = getMetadataYears();
  return paintingYears.map((year) => ({ year }));
}

export default function PaintingsPage({ params }) {
  const { year } = params;
  const allArtwork = getArtwork();
  const yearArtwork = allArtwork.filter(
    (art) => art.category === 'paintings' && art.year === year
  );

  if (yearArtwork.length === 0) {
    notFound();
  }

  return (
    <div className="w-full h-full">
      <ArtworkCarousel artwork={yearArtwork} loop={false} />
    </div>
  );
}

