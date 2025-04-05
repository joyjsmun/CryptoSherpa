"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const backgrounds = ["/images/forest-mist.png", "/images/ferns-dark.png"]

export function BackgroundImage() {
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length)
    }, 30000) // 30초마다 배경 변경

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: currentBg === index ? 1 : 0,
          }}
        >
          <Image src={bg || "/placeholder.svg"} alt="Natural background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  )
}

