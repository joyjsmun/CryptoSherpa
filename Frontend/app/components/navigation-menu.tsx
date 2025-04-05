"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function NavigationMenu() {
  const [journeyOpen, setJourneyOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (journeyOpen) setJourneyOpen(false)
  }

  return (
    <div className="w-full flex justify-between items-center p-3 sm:p-4 md:p-6 lg:p-8 relative z-20">
      <div className="flex items-center">
        <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
          <span className="text-white font-bold text-sm sm:text-base md:text-xl">C</span>
        </div>
        <span className="ml-2 sm:ml-3 text-white font-bold text-sm sm:text-base md:text-xl">CryptoSherpa</span>
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
        <Link href="#" className="text-white hover:text-emerald-300 transition-colors text-xs sm:text-sm md:text-base">
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
                >
                  Crypto Introduction
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                >
                  Wallet Setup
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                >
                  Transaction Assistant
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                >
                  DeFi Navigator
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/10"
                >
                  Security Guardian
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link href="#" className="text-white hover:text-emerald-300 transition-colors text-xs sm:text-sm md:text-base">
          ABOUT
        </Link>
        <Link href="#" className="text-white hover:text-emerald-300 transition-colors text-xs sm:text-sm md:text-base">
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
              onClick={() => setMobileMenuOpen(false)}
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Crypto Introduction
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wallet Setup
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Transaction Assistant
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  DeFi Navigator
                </Link>
                <Link
                  href="#"
                  className="block py-2 text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Security Guardian
                </Link>
              </div>
            )}

            <Link
              href="#"
              className="text-white py-3 px-4 hover:bg-white/10 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="#"
              className="text-white py-3 px-4 hover:bg-white/10 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              GITHUB
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

