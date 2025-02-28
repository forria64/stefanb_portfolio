// File: src/stefanb_portfolio_frontend/app/about/page.js
import Header from 'components/Header';
import Image from 'next/image';
import { getMetadataYears } from 'utils/getMetadataYears';

export default function About() {
  const { paintingYears, collaborationYears } = getMetadataYears();

  return (
    // Center the about content both vertically and horizontally
    <main className="min-h-screen flex items-center justify-center bg-dark-primary">
      <div className="text-center mx-auto max-w-2xl p-4">
        <Image 
          src="/roundpfp.png"
          alt="Stefan Knapp"
          width={151}
          height={151}
          className="mx-auto rounded-full mb-8"
          priority
        />
        <p className="dark:text-gray-300 text-base leading-relaxed">
          Self-taught artist focused on concept/visual design, now bringing my work on-chain 
          through Internet Computer Protocol and Bitcoin. This site features my physical 
          canvas paintings as digital twins, ready to become NFTs that certify authenticity 
          for the originals, as well as all collaborative projects I've been part of, 
          which are mostly digital or phygital artworks.
        </p>
        <div className="flex flex-col gap-2 items-center mt-8">
          <a 
            href="&#104;&#116;&#116;&#112;&#115;&#58;&#47;&#47;&#120;&#46;&#99;&#111;&#109;&#47;&#115;&#116;&#101;&#102;&#97;&#110;&#98;&#100;&#111;&#116;&#97;&#114;&#116;" 
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                       hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                       border border-transparent hover:border-accent"
          >
            <span className="text-gray-300 group-hover:text-accent text-base">X&nbsp;(Twitter)</span>
          </a>
          <a 
            href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#99;&#111;&#110;&#116;&#97;&#99;&#116;&#64;&#115;&#116;&#101;&#102;&#97;&#110;&#98;&#46;&#97;&#114;&#116;" 
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                       hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                       border border-transparent hover:border-accent"
          >
            <span className="text-gray-300 group-hover:text-accent text-base">E-mail</span>
          </a>
          <a 
            href="&#104;&#116;&#116;&#112;&#115;&#58;&#47;&#47;&#111;&#99;&#46;&#97;&#112;&#112;&#47;&#99;&#111;&#109;&#109;&#117;&#110;&#105;&#116;&#121;&#47;&#51;&#106;&#53;&#121;&#97;&#45;&#109;&#121;&#97;&#97;&#97;&#45;&#97;&#97;&#97;&#97;&#102;&#45;&#98;&#110;&#119;&#120;&#97;&#45;&#99;&#97;&#105;&#47;&#99;&#104;&#97;&#110;&#110;&#101;&#108;&#47;&#51;&#51;&#54;&#55;&#57;&#55;&#49;&#54;&#57;&#55;" 
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                       hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                       border border-transparent hover:border-accent"
          >
            <span className="text-gray-300 group-hover:text-accent text-base">OpenChat</span>
          </a>
          <a 
            href="&#104;&#116;&#116;&#112;&#115;&#58;&#47;&#47;&#116;&#46;&#109;&#101;&#47;&#115;&#116;&#101;&#102;&#97;&#110;&#98;&#100;&#111;&#116;&#97;&#114;&#116;" 
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                       hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                       border border-transparent hover:border-accent"
          >
            <span className="text-gray-300 group-hover:text-accent text-base">Telegram</span>
          </a>
        </div>
      </div>
    </main>
  );
}

