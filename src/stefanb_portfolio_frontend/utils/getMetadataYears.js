// File: src/stefanb_portfolio_frontend/utils/getMetadataYears.js
import fs from 'fs';
import path from 'path';

export function getMetadataYears() {
  const metadataPath = path.join(process.cwd(), 'public', 'artwork', 'metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  return {
    paintingYears: Object.keys(metadata.paintings).sort((a, b) => b.localeCompare(a)),
    collaborationYears: Object.keys(metadata.collaborations).sort((a, b) => b.localeCompare(a))
  };
}

