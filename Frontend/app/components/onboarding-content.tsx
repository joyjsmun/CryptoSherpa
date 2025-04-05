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

  const CurrentIcon = currentStep.icon

  return (
    <div className="h-full flex flex-col" ref={dragConstraintsRef}>
      {/* Main Steps Progress - Updated to 5 bars */}
      <div className="flex space-x-2 mb-6">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => selectMainStep(index)}
            className={`flex-1 h-1.5 rounded-full transition-all ${
              index === activeStep ? "bg-white" : completedSteps.includes(index) ? "bg-emerald-500" : "bg-white/30"
            }`}
            aria-label={`Go to ${step.title}`}
          />
        ))}
      </div>

      {/* Current Step Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <CurrentIcon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{currentStep.title}</h2>
        </div>
        <p className="text-white/80 ml-13">{currentStep.description}</p>
      </div>

      {/* Sub-steps Navigation */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {currentSubSteps.map((subStep, index) => (
          <button
            key={index}
            onClick={() => selectSubStep(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors text-sm ${
              index === activeSubStep
                ? "bg-white/20 text-white"
                : isSubStepCompleted(activeStep, index)
                  ? "bg-emerald-500/20 text-white"
                  : "bg-white/10 text-white/70"
            }`}
          >
            {isSubStepCompleted(activeStep, index) && (
              <CheckCircle2 className="inline-block h-4 w-4 mr-1 text-emerald-500" />
            )}
            <span>Step {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Current Sub-step Content */}
      <motion.div
        key={`${activeStep}-${activeSubStep}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 overflow-y-auto"
      >
        <h3 className="text-xl font-semibold text-white mb-4">{currentSubStep.title}</h3>
        <p className="text-white/90 leading-relaxed">{currentSubStep.content}</p>

        {/* Illustrative Icon - Fixed for mobile */}
        <div className="mt-8 flex justify-center">
          {activeStep === 0 && activeSubStep === 0 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 0 && activeSubStep === 1 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <FileText className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 0 && activeSubStep === 2 && (
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
                <FileText className="h-12 w-12 text-white/70" />
              </div>
            </div>
          )}
          {activeStep === 1 && activeSubStep === 0 && (
            <div className="flex space-x-4">
              <div className="h-16 w-16 rounded-lg bg-white/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white/70" />
              </div>
              <div className="h-16 w-16 rounded-lg bg-white/10 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-white/70" />
              </div>
            </div>
          )}
          {activeStep === 1 && activeSubStep === 1 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <Download className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 1 && activeSubStep === 2 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <Wallet className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 1 && activeSubStep === 3 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <Key className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 2 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowRight className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 3 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <Database className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 4 && activeSubStep === 0 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 4 && activeSubStep === 1 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <Lock className="h-12 w-12 text-white/70" />
            </div>
          )}
          {activeStep === 4 && activeSubStep === 2 && (
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-white/70" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Navigation Buttons with new buttons added */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevSubStep}
          disabled={activeStep === 0 && activeSubStep === 0}
          className="px-4 py-2 flex items-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>

        <div className="flex space-x-3">
          {/* CryptoSherpa Guide Button */}
          <button
            onClick={openGuide}
            className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
            title="CryptoSherpa Guide"
          >
            <ExternalLink className="h-5 w-5" />
          </button>

          {/* Screenshot Button */}
          <button
            onClick={takeScreenshot}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            title="Take Screenshot"
          >
            <Camera className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={nextSubStep}
          className="px-4 py-2 flex items-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          {activeStep === steps.length - 1 && activeSubStep === currentSubSteps.length - 1 ? "Complete" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
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

