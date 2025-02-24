// File: src/stefanb_portfolio_frontend/app/collaborations/[year]/page.js

import ArtworkCarousel from 'components/ArtworkCarousel';
import { getArtwork } from 'utils/getArtwork';
import { notFound } from 'next/navigation';
import { getMetadataYears } from 'utils/getMetadataYears';

export function generateStaticParams() {
  const { collaborationYears } = getMetadataYears();
  return collaborationYears.map((year) => ({ year }));
}

export default function CollaborationsPage({ params }) {
  const { year } = params;
  const allArtwork = getArtwork();
  const yearArtwork = allArtwork.filter(
    (art) => art.category === 'collaborations' && art.year === year
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

