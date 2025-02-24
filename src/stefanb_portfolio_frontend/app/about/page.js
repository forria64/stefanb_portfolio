// File: src/stefanb_portfolio_frontend/app/about/page.js

import Header from 'components/Header';
import Image from 'next/image';
import { getMetadataYears } from 'utils/getMetadataYears';

export default function About() {
  const { paintingYears, collaborationYears } = getMetadataYears();
  
  return (
    <main className="flex flex-col flex-1 overflow-y-auto pt-[70px]">
      <Header paintingYears={paintingYears} collaborationYears={collaborationYears} />
      <div className="flex-1">
        <div className="text-center mx-auto max-w-2xl p-4 mt-12">
          <Image 
            src="/roundpfp.png"
            alt="Stefan Knapp"
            width={151}
            height={151}
            className="mx-auto rounded-full mb-8"
            priority
          />
          {/* Notice the change below: I've → I&apos;ve */}
          <p className="dark:text-gray-300 leading-relaxed">
            Self-taught artist focused on concept/visual design, now bringing my work on-chain 
            through Internet Computer Protocol and Bitcoin. This site features my physical 
            canvas paintings as digital twins, ready to become NFTs that certify authenticity 
            for the originals, as well as all collaborative projects I&apos;ve been part of, 
            which are mostly digital or phygital artworks.
          </p>
          <div className="flex flex-col gap-2 items-center mt-8">
            <a 
              href="https://x.com/stefanbdotart" 
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                         hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                         border border-transparent hover:border-accent"
            >
              <span className="text-gray-300 group-hover:text-accent">X&nbsp; (Twitter)</span>
            </a>
            
            <a 
              href="mailto:contact@stefanb.art" 
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                         hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                         border border-transparent hover:border-accent"
            >
              <span className="text-gray-300 group-hover:text-accent">E-mail</span>
            </a>

            <a 
              href="https://oc.app/community/3j5ya-myaaa-aaaaf-bnwxa-cai/channel/3367971697" 
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                         hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                         border border-transparent hover:border-accent"
            >
              <span className="text-gray-300 group-hover:text-accent">OpenChat</span>
            </a>

            <a 
              href="https://t.me/stefanbdotart" 
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-1 flex items-center justify-center px-4 py-2 bg-dark-secondary 
                         hover:bg-dark-tertiary rounded-lg w-48 transition-colors 
                         border border-transparent hover:border-accent"
            >
              <span className="text-gray-300 group-hover:text-accent">Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

