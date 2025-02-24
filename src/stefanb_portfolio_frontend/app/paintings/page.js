// File: src/stefanb_portfolio_frontend/app/paintings/page.js

import Header from 'components/Header';
import { getMetadataYears } from 'utils/getMetadataYears';

export default function Paintings() {
  const { paintingYears, collaborationYears } = getMetadataYears();
  
  return (
    <main>
      <Header paintingYears={paintingYears} collaborationYears={collaborationYears} />
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-3xl font-light mb-6 dark:text-white">Canvas Paintings</h1>
      </div>
    </main>
  );
}

