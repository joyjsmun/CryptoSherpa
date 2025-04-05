"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function NavigationMenu() {
  const [journeyOpen, setJourneyOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (journeyOpen) setJourneyOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // For now, prevent default navigation since we're not setting up routes yet
    e.preventDefault()
    console.log("Navigation clicked:", e.currentTarget.href)
  }

  return (
    <div className="w-full flex justify-between items-center p-3 sm:p-4 md:p-6 lg:p-8 relative z-20">
      <div className="flex items-center">
        <div className="h-8 sm:h-10 md:h-12">
          <Image
            src="/images/logo.png"
            alt="CryptoSherpa Logo"
            width={150}
            height={48}
            priority
            className="h-full w-auto"
          />
        </div>
      </div>

      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden text-white p-2 rounded-md hover:bg-white/10"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
        <Link 
          href="#" 
          className="text-white hover:text-emerald-300 transition-colors text-xs sm:text-sm md:text-base"
          onClick={handleNavClick}
        >
          HOME
        </Link>

        {/* Journey Dropdown */}
        <div className="relative">
          <button
            onClick={() => setJourneyOpen(!journeyOpen)}
            className="text-white hover:text-emerald-300 transition-colors flex items-center text-xs sm:text-sm md:text-base"
          >
            JOURNEY
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 w-3 h-3 sm:w-4 sm:h-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {journeyOpen && (
            <div className="absolute right-0 mt-2 w-48 sm:w-56 md:w-64 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-10">
              <div className="py-1 sm:py-2">
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                  onClick={handleNavClick}
                >
                  Crypto Introduction
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                  onClick={handleNavClick}
                >
                  Wallet Setup
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                  onClick={handleNavClick}
                >
                  Transaction Assistant
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                  onClick={handleNavClick}
                >
                  DeFi Navigator
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                  onClick={handleNavClick}
                >
                  Security Guardian
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link 
          href="#" 
          className="text-white hover:text-emerald-300 transition-colors text-xs sm:text-sm md:text-base"
          onClick={handleNavClick}
        >
          ABOUT
        </Link>
        <Link 
          href="#" 
          className="text-white hover:text-emerald-300 transition-colors text-xs sm:text-sm md:text-base"
          onClick={handleNavClick}
        >
          GITHUB
        </Link>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 z-30">
          <div className="flex flex-col p-4">
            <Link
              href="#"
              className="text-white py-3 px-4 hover:bg-white/10 rounded-md"
              onClick={(e) => {
                handleNavClick(e);
                setMobileMenuOpen(false);
              }}
            >
              HOME
            </Link>

            <button
              onClick={() => setJourneyOpen(!journeyOpen)}
              className="text-white py-3 px-4 hover:bg-white/10 rounded-md text-left flex justify-between items-center"
            >
              JOURNEY
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${journeyOpen ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {journeyOpen && (
              <div className="ml-4 border-l border-white/20 pl-4 py-2">
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    handleNavClick(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  Crypto Introduction
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    handleNavClick(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  Wallet Setup
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    handleNavClick(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  Transaction Assistant
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    handleNavClick(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  DeFi Navigator
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    handleNavClick(e);
                    setMobileMenuOpen(false);
                  }}
                >
                  Security Guardian
                </Link>
              </div>
            )}

            <Link
              href="#"
              className="text-white py-3 px-4 hover:bg-white/10 rounded-md"
              onClick={(e) => {
                handleNavClick(e);
                setMobileMenuOpen(false);
              }}
            >
              ABOUT
            </Link>
            <Link
              href="#"
              className="text-white py-3 px-4 hover:bg-white/10 rounded-md"
              onClick={(e) => {
                handleNavClick(e);
                setMobileMenuOpen(false);
              }}
            >
              GITHUB
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

