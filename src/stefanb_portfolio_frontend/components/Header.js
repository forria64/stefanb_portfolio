// File: src/stefanb_portfolio_frontend/components/Header.js
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header({ paintingYears, collaborationYears }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (pathname.startsWith('/paintings')) {
      setIsMenuOpen(true);
      setActiveSubmenu('paintings');
    } else if (pathname.startsWith('/collaborations')) {
      setIsMenuOpen(true);
      setActiveSubmenu('collaborations');
    } else if (pathname === '/about' || pathname === '/contact') {
      setIsMenuOpen(true);
      setActiveSubmenu(null);
    }
  }, [pathname]);

  function toggleSubmenu(menu) {
    setActiveSubmenu((prev) => (prev === menu ? null : menu));
  }

  function toggleMenu(e) {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && menuRef.current.contains(event.target)) return;
      if (!event.target.closest('button')) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white font-light border-gray-200 dark:bg-dark-primary">
        <div className="flex flex-wrap justify-between items-center mx-auto w-full p-4 pt-3">
          <Link href="/" className="flex text-md items-center rtl:space-x-reverse dark:text-white">
            <Image
              className="rounded-full mr-2"
              src="/logo.png"
              alt="Stefan B"
              width={42}
              height={42}
            />
            stefanb<span className="text-lg text-accent">.</span>art
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button
              onClick={toggleMenu}
              className={`text-md ${
                isMenuOpen ? 'dark:text-accent' : 'text-gray-500 dark:text-white'
              } hover:cursor-pointer`}
            >
              <span
                className={`text-lg ${
                  isMenuOpen ? 'dark:text-white' : 'dark:text-accent'
                } hover:cursor-pointer`}
              >
                .&nbsp;
              </span>
              menu
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <nav
          ref={menuRef}
          className="fixed w-full top-[70px] z-40 bg-gray-50 dark:bg-dark-secondary rounded-b-lg"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center w-full">
              <ul className="flex flex-row font-light mt-0 w-full justify-between text-md">
                {/* Paintings Menu */}
                <li
                  className={`flex-1 px-4 py-3 text-center relative group ${
                    activeSubmenu === 'paintings' ? 'bg-dark-tertiary' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleSubmenu('paintings')}
                    className={`w-full ${
                      pathname.startsWith('/paintings')
                        ? 'text-accent'
                        : 'text-gray-900 dark:text-white'
                    } dark:hover:text-accent`}
                  >
                    <span className="hidden sm:inline">canvas paintings</span>
                    <span className="sm:hidden">paintings</span>
                  </button>
                  {activeSubmenu === 'paintings' && (
                    <div className="absolute left-0 mt-3 z-50 rounded-b-xl bg-dark-tertiary w-full">
                      <div className="w-full">
                        <ul className="grid grid-cols-2 font-light w-full text-sm">
                          {paintingYears.map((year) => (
                            <li className="w-full text-center" key={year}>
                              <Link
                                href={`/paintings/${year}`}
                                className={`block py-3 ${
                                  pathname.includes(`/paintings/${year}`)
                                    ? 'text-accent'
                                    : 'text-gray-900 dark:text-white'
                                } dark:hover:text-accent`}
                              >
                                {year}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>

                {/* Collaborations Menu */}
                <li
                  className={`flex-1 px-4 py-3 text-center relative group ${
                    activeSubmenu === 'collaborations' ? 'bg-dark-tertiary' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleSubmenu('collaborations')}
                    className={`w-full ${
                      pathname.startsWith('/collaborations')
                        ? 'text-accent'
                        : 'text-gray-900 dark:text-white'
                    } dark:hover:text-accent`}
                  >
                    collaborations
                  </button>
                  {activeSubmenu === 'collaborations' && (
                    <div className="absolute left-0 mt-3 z-50 bg-dark-tertiary rounded-b-xl w-full">
                      <div className="w-full">
                        <ul className="grid grid-cols-2 font-light w-full text-sm">
                          {collaborationYears.map((year) => (
                            <li className="w-full text-center" key={year}>
                              <Link
                                href={`/collaborations/${year}`}
                                className={`block py-3 ${
                                  pathname.includes(`/collaborations/${year}`)
                                    ? 'text-accent'
                                    : 'text-gray-900 dark:text-white'
                                } dark:hover:text-accent`}
                              >
                                {year}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>

                <li className="flex-1 px-4 py-3 text-center">
                  <Link
                    href="/about"
                    onClick={() => setActiveSubmenu(null)}
                    className={`${
                      pathname === '/about' ? 'text-accent' : 'text-gray-900 dark:text-white'
                    } dark:hover:text-accent block`}
                  >
                    about
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

