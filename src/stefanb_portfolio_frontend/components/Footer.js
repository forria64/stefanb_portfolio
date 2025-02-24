// File: src/stefanb_portfolio_frontend/components/Footer.js
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-dark-primary z-50 h-[50px] md:h-[60px]">
      <div className="mx-auto w-full h-full px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm font-light text-gray-600">
              100% on-chain
            </span>
            <Image 
              src="/icp.svg"
              width={60}
              height={60}
              className="opacity-70"
              alt="Internet Computer Logo"
            />
          </div>
          <div className="flex items-center">
            <span className="text-xs md:text-sm font-light text-gray-700">
              © {new Date().getFullYear()} StefanB
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

