"use client"

import { useState } from "react"
import { UserProfile } from "./user-profile"
import { ChatInterface } from "./chat-interface"
import { StepGuide } from "./step-guide"

export function OnboardingInterface() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const nextStep = () => {
    if (currentStep < 3) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Left Side - User Profile and Chat */}
      <div className="flex flex-col h-screen backdrop-blur-md bg-black/40 border-r border-white/10">
        {/* User Profile Section */}
        <UserProfile />

        {/* Chat Interface */}
        <ChatInterface currentStep={currentStep} nextStep={nextStep} goToStep={goToStep} />
      </div>

      {/* Right Side - Step Guide */}
      <div className="h-screen overflow-auto backdrop-blur-sm bg-black/20">
        <StepGuide currentStep={currentStep} completedSteps={completedSteps} nextStep={nextStep} prevStep={prevStep} />
      </div>
    </div>
  )
}

