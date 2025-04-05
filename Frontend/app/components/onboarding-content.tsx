"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Wallet,
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Key,
  Download,
  Lock,
  FileText,
  Smartphone,
  AlertTriangle,
  Database,
  ExternalLink,
  Camera,
  X,
  Mic,
} from "lucide-react"
import Image from "next/image"

interface OnboardingContentProps {
  activeStep: number
  setActiveStep: (step: number) => void
}

// Main steps - Updated to match menu order
const steps = [
  {
    id: "intro",
    title: "Crypto Introduction",
    description: "Learn the basics of cryptocurrency and blockchain technology.",
    icon: BookOpen,
    subSteps: [
      {
        title: "What is Cryptocurrency?",
        content:
          "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on a technology called blockchain. Unlike traditional currencies, cryptocurrencies are typically decentralized and not controlled by any central authority.",
      },
      {
        title: "How Blockchain Works",
        content:
          "Blockchain is a distributed ledger technology that records all transactions across a network of computers. Each block contains a number of transactions, and once completed, it's added to the chain chronologically, creating a permanent and immutable record.",
      },
      {
        title: "Types of Cryptocurrencies",
        content:
          "There are thousands of cryptocurrencies, each with different purposes. Bitcoin was the first, but others like Ethereum, Solana, and Cardano offer different features such as smart contracts and faster transaction speeds.",
      },
    ],
  },
  // Other steps remain the same...
  {
    id: "wallet",
    title: "Wallet Setup",
    description: "Create and configure your digital wallet to store cryptocurrency.",
    icon: Wallet,
    subSteps: [
      {
        title: "Choose Your Wallet Type",
        content:
          "There are several types of wallets: hardware wallets (physical devices), software wallets (desktop/mobile apps), and web wallets (browser-based). Hardware wallets offer the highest security, while software wallets balance security and convenience.",
      },
      {
        title: "Install and Setup",
        content:
          "Download your chosen wallet from the official source. Follow the installation instructions carefully. Never download wallet software from unofficial sources as they may contain malware.",
      },
      {
        title: "Create a New Wallet",
        content:
          "Open your wallet application and select 'Create New Wallet'. You'll be asked to set a strong password. This password protects access to your wallet application, but is not the same as your private keys.",
      },
      {
        title: "Backup Your Recovery Phrase",
        content:
          "Your wallet will generate a recovery phrase (usually 12-24 words). Write this down on paper and store it in a secure location. Never store it digitally or share it with anyone. This phrase can be used to restore your wallet if your device is lost or damaged.",
      },
    ],
  },
  {
    id: "transaction",
    title: "Transaction Assistant",
    description: "Learn how to buy, send, and receive cryptocurrency.",
    icon: ArrowRight,
    subSteps: [
      {
        title: "Buying Cryptocurrency",
        content:
          "You can buy cryptocurrency on exchanges like Coinbase, Binance, or Kraken. You'll need to create an account, complete identity verification, and link a payment method like a bank account or credit card.",
      },
      {
        title: "Receiving Crypto",
        content:
          "To receive cryptocurrency, share your wallet's public address with the sender. This address is a long string of letters and numbers. Many wallets also provide a QR code that can be scanned.",
      },
      {
        title: "Sending Crypto",
        content:
          "To send cryptocurrency, you'll need the recipient's public address. Double-check this address before confirming the transaction, as transactions cannot be reversed once confirmed.",
      },
      {
        title: "Understanding Fees",
        content:
          "Most cryptocurrency transactions require a fee, which goes to the miners or validators who process transactions. Fees can vary based on network congestion. Some wallets allow you to set custom fees.",
      },
    ],
  },
  {
    id: "defi",
    title: "DeFi Navigator",
    description: "Explore decentralized finance applications and opportunities.",
    icon: Database,
    subSteps: [
      {
        title: "What is DeFi?",
        content:
          "Decentralized Finance (DeFi) refers to financial applications built on blockchain technology that operate without centralized intermediaries like banks. DeFi applications aim to recreate traditional financial systems in a decentralized manner.",
      },
      {
        title: "DeFi Protocols",
        content:
          "There are various DeFi protocols offering services like lending, borrowing, trading, and yield farming. Popular platforms include Uniswap, Aave, Compound, and MakerDAO, each serving different financial needs.",
      },
      {
        title: "Yield Farming",
        content:
          "Yield farming involves lending or staking your crypto assets to generate returns. By providing liquidity to DeFi protocols, you can earn interest, fees, or additional tokens as rewards for your participation.",
      },
      {
        title: "Risks in DeFi",
        content:
          "While DeFi offers exciting opportunities, it comes with risks including smart contract vulnerabilities, impermanent loss, and market volatility. Always research thoroughly and only invest what you can afford to lose.",
      },
    ],
  },
  {
    id: "security",
    title: "Security Guardian",
    description: "Learn how to keep your crypto assets safe and secure.",
    icon: Shield,
    subSteps: [
      {
        title: "Protect Your Private Keys",
        content:
          "Your private keys are the most important security element. Never share them with anyone. Consider using a hardware wallet for cold storage of significant amounts of cryptocurrency.",
      },
      {
        title: "Enable Two-Factor Authentication",
        content:
          "Always enable 2FA on exchanges and wallet services that support it. Use an authenticator app rather than SMS where possible, as SMS can be vulnerable to SIM swapping attacks.",
      },
      {
        title: "Beware of Phishing Attempts",
        content:
          "Always verify URLs carefully. Bookmark official sites and don't click on links in emails or messages. Scammers often create convincing fake websites to steal your credentials and funds.",
      },
      {
        title: "Regular Software Updates",
        content:
          "Keep your wallet software, operating system, and antivirus up to date. Security vulnerabilities are regularly patched in software updates.",
      },
    ],
  },
]

export function OnboardingContent({ activeStep, setActiveStep }: OnboardingContentProps) {
  const [activeSubStep, setActiveSubStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [completedSubSteps, setCompletedSubSteps] = useState<{ [key: number]: number[] }>({})
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [voiceMessage, setVoiceMessage] = useState("")
  const [voicePosition, setVoicePosition] = useState({ x: 0, y: 0 })
  const dragConstraintsRef = useRef(null)

  const currentStep = steps[activeStep]
  const currentSubSteps = currentStep.subSteps
  const currentSubStep = currentSubSteps[activeSubStep]
  const CurrentIcon = currentStep.icon

  const nextSubStep = () => {
    // Mark current sub-step as completed
    const currentCompleted = completedSubSteps[activeStep] || []
    if (!currentCompleted.includes(activeSubStep)) {
      setCompletedSubSteps({
        ...completedSubSteps,
        [activeStep]: [...currentCompleted, activeSubStep],
      })
    }

    if (activeSubStep < currentSubSteps.length - 1) {
      // Move to next sub-step
      setActiveSubStep(activeSubStep + 1)
    } else {
      // Mark main step as completed
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps([...completedSteps, activeStep])
      }

      // Move to next main step if available
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1)
        setActiveSubStep(0)
      }
    }
  }

  const prevSubStep = () => {
    if (activeSubStep > 0) {
      setActiveSubStep(activeSubStep - 1)
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1)
      setActiveSubStep(steps[activeStep - 1].subSteps.length - 1)
    }
  }

  const selectMainStep = (index: number) => {
    setActiveStep(index)
    setActiveSubStep(0)
  }

  const selectSubStep = (index: number) => {
    setActiveSubStep(index)
  }

  const isSubStepCompleted = (stepIndex: number, subStepIndex: number) => {
    return (completedSubSteps[stepIndex] || []).includes(subStepIndex)
  }

  const toggleVoiceAssistant = () => {
    if (!isVoiceActive) {
      // Set initial position in the center of the screen
      setVoicePosition({
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
      })

      // Simulate voice recognition
      setVoiceMessage("Listening...")
      setTimeout(() => {
        setVoiceMessage("How can I help you with crypto today?")
      }, 2000)
    }

    setIsVoiceActive(!isVoiceActive)
  }

  const takeScreenshot = () => {
    alert("Screenshot captured! (This is a simulation - in a real app, this would capture the screen)")
  }

  const openGuide = () => {
    window.open("https://cryptosherpa.io", "_blank")
  }

  return (
    <div className="text-white" ref={dragConstraintsRef}>
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mr-4">
            <CurrentIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{currentStep.title}</h2>
        </div>
        <p className="text-white/80">{currentStep.description}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex mb-6 space-x-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => selectMainStep(index)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              activeStep === index
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/15"
            } ${completedSteps.includes(index) ? "border border-green-500/50" : ""}`}
          >
            {completedSteps.includes(index) && (
              <CheckCircle2 className="w-4 h-4 inline-block mr-1 text-green-500" />
            )}
            Step {index + 1}
          </button>
        ))}
      </div>

      {/* Sub-steps */}
      <div className="mb-6">
        {currentSubSteps.map((subStep, index) => (
          <button
            key={index}
            onClick={() => selectSubStep(index)}
            className={`block w-full text-left px-4 py-3 mb-2 rounded-lg transition-all ${
              activeSubStep === index
                ? "bg-white/20 backdrop-blur-md"
                : "bg-white/10 hover:bg-white/15"
            } ${isSubStepCompleted(activeStep, index) ? "border border-green-500/30" : ""}`}
          >
            <div className="flex items-center">
              {isSubStepCompleted(activeStep, index) ? (
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
              ) : (
                <div
                  className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                    activeSubStep === index ? "bg-white text-black" : "bg-white/30 text-white"
                  }`}
                >
                  {index + 1}
                </div>
              )}
              <span className="font-medium">{subStep.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeStep}-${activeSubStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6"
        >
          <h3 className="text-xl font-semibold mb-4">{currentSubStep.title}</h3>
          <p className="text-white/90 leading-relaxed mb-4">{currentSubStep.content}</p>

          {/* Additional content or interactions can go here */}
          {activeStep === 1 && activeSubStep === 3 && (
            <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                <p className="text-sm text-white/90">
                  <strong>Important:</strong> Your recovery phrase is the only way to restore your wallet if you lose access.
                  Write it down and store it securely. Never share it with anyone or store it digitally.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevSubStep}
          className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full flex items-center hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Previous
        </button>

        <button
          onClick={nextSubStep}
          className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full flex items-center hover:bg-white/20 transition-all"
        >
          Next <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex space-x-3">
        <button
          onClick={takeScreenshot}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          title="Take Screenshot"
        >
          <Camera className="w-5 h-5" />
        </button>
        <button
          onClick={toggleVoiceAssistant}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          title="Voice Assistant"
        >
          {isVoiceActive ? <X className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <button
          onClick={openGuide}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          title="Open Guide"
        >
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {/* Voice Assistant Popup */}
      <AnimatePresence>
        {isVoiceActive && (
          <>
            {/* Full screen overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setIsVoiceActive(false)}
            />

            {/* Centered animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="relative w-[300px] h-[300px] flex flex-col items-center justify-center">
                <Image
                  src="/images/mic-animation.png"
                  alt="Voice Assistant"
                  width={300}
                  height={300}
                  className="animate-pulse"
                />
                <div className="absolute text-center mt-40">
                  <p className="text-white text-lg">{voiceMessage}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

