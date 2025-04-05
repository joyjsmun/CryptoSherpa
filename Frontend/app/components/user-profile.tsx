"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserProfile() {
  const [greeting, setGreeting] = useState("Good morning")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning")
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [])

  return (
    <div className="p-6 border-b border-white/10">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-white/20">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback className="bg-emerald-600 text-white text-xl">JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-white">{greeting}, John</h2>
          <p className="text-white/70">Welcome to your crypto journey</p>
        </div>
      </div>
    </div>
  )
}

