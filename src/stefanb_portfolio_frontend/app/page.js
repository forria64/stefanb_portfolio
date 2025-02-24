// File: src/stefanb_portfolio_frontend/app/page.js

import { getArtwork } from 'utils/getArtwork';
import ArtworkCarousel from 'components/ArtworkCarousel';

export default function Home() {
  // Filter to include only paintings that are "available"
  const artwork = getArtwork().filter(
    (art) => art.category === 'paintings' && art.available === 'available'
  );
  
  // Removed the unused destructure:
  // const { paintingYears, collaborationYears } = getMetadataYears();

  return (
    <div className="w-full h-full">
      <ArtworkCarousel artwork={artwork} showArrows={false} loop={false} />
    </div>
  );
}

