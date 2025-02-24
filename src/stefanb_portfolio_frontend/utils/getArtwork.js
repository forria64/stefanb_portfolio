// File: src/stefanb_portfolio_frontend/utils/getArtwork.js
import fs from 'fs';
import path from 'path';

export function getArtwork() {
  const artworkData = [];
  const categories = ['paintings', 'collaborations'];
  const metadataPath = path.join(process.cwd(), 'public', 'artwork', 'metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  categories.forEach((category) => {
    const categoryPath = path.join(process.cwd(), 'public', 'artwork', category);

    // Get all year directories
    const yearDirs = fs
      .readdirSync(categoryPath)
      .filter((dir) => fs.statSync(path.join(categoryPath, dir)).isDirectory());

    yearDirs.forEach((year) => {
      const yearPath = path.join(categoryPath, year);
      const files = fs
        .readdirSync(yearPath)
        .filter(
          (file) =>
            file.endsWith('.jpg') ||
            file.endsWith('.jpeg') ||
            file.endsWith('.png') ||
            file.endsWith('.webp')
        );

      files.forEach((file) => {
        const baseName = path.parse(file).name;
        const artworkMetadata = metadata[category]?.[year]?.[baseName] || {
          description: ''
        };

        artworkData.push({
          ...artworkMetadata,
          year,
          category,
          imagePath: `/artwork/${category}/${year}/${file}`,
          available: artworkMetadata.available
        });
      });
    });
  });

  // Sort descending by year
  return artworkData.sort((a, b) => b.year.localeCompare(a.year));
}

