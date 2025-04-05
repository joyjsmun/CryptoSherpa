"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { OnboardingContent } from "./onboarding-content"
import { NavigationMenu } from "./navigation-menu"
import { ChatInterface } from "./chat-interface"

export function MainLayout() {
  const [activeStep, setActiveStep] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Make sure everything is loaded properly on client-side
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-10 relative">
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image 
          src="/images/bango.png" 
          alt="Crypto Sherpa background" 
          priority
          fill
          style={{
            objectFit: 'cover',
          }}
          onLoad={() => console.log("Background image loaded")}
          onError={(e) => console.error("Background image error", e)}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="w-full max-w-7xl border-[6px] border-white rounded-3xl overflow-hidden relative">
        {/* Navigation Menu */}
        <NavigationMenu />

        {/* Main Content */}
        <div className="grid md:grid-cols-2 min-h-[80vh]">
          {/* Left Section - Split into top and bottom */}
          <div className="flex flex-col h-full">
            {/* Top Left - Introduction (30% smaller) */}
            <div className="p-8 md:p-12 flex flex-col justify-center" style={{ minHeight: "30%", height: "auto" }}>
              <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/20">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Crypto Journey</h1>
                <p className="text-lg text-white/80">
                  Begin your adventure into the world of cryptocurrency with our step-by-step guide.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveStep(0)}
                    className="px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30 hover:bg-white/30 transition-all"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Left - Interactive Chat (2x taller) */}
            <div className="p-8 md:p-12" style={{ minHeight: "70%", height: "auto", flex: "1" }}>
              <ChatInterface />
            </div>
          </div>

          {/* Right Section - Glassmorphism content area (unchanged) */}
          <div className="backdrop-blur-md bg-white/10 p-8 md:p-12 overflow-auto">
            <OnboardingContent activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>
        </div>
      </div>
    </div>
  )
}

