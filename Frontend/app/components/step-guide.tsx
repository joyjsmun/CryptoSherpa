"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Wallet, Shield, BookOpen, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

interface StepGuideProps {
  currentStep: number
  completedSteps: number[]
  nextStep: () => void
  prevStep: () => void
}

const steps = [
  {
    id: "intro",
    title: "Introduction to Crypto",
    description: "Learn the basics of cryptocurrency and blockchain technology.",
    icon: BookOpen,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-4">What is Cryptocurrency?</h3>
        <p className="mb-4">
          Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on a
          technology called blockchain.
        </p>
        <h3 className="text-xl font-semibold mb-4">Key Benefits:</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Decentralized - not controlled by any central authority</li>
          <li>Secure - uses advanced cryptography</li>
          <li>Transparent - all transactions are recorded on a public ledger</li>
          <li>Global - can be used anywhere in the world</li>
        </ul>
        <p>This guide will help you set up your wallet, secure your assets, and make your first transaction.</p>
      </>
    ),
  },
  {
    id: "wallet",
    title: "Wallet Setup",
    description: "Create and configure your digital wallet to store cryptocurrency.",
    icon: Wallet,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-4">Setting Up Your Wallet</h3>
        <p className="mb-4">
          A cryptocurrency wallet is a digital tool that allows you to store, send, and receive digital currency.
        </p>
        <h3 className="text-xl font-semibold mb-4">Steps to Create Your Wallet:</h3>
        <ol className="list-decimal pl-5 space-y-2 mb-4">
          <li>Choose a wallet type (hardware, software, or paper)</li>
          <li>Download from official sources or purchase from authorized retailers</li>
          <li>Follow the setup instructions and create a new wallet</li>
          <li>Securely back up your recovery phrase</li>
          <li>Set up additional security features</li>
        </ol>
        <p>Remember: Never share your private keys or recovery phrase with anyone!</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security Essentials",
    description: "Learn how to keep your crypto assets safe and secure.",
    icon: Shield,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-4">Protecting Your Crypto</h3>
        <p className="mb-4">
          Security is paramount in the crypto world. Follow these best practices to keep your assets safe.
        </p>
        <h3 className="text-xl font-semibold mb-4">Security Checklist:</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Enable two-factor authentication (2FA) on all accounts</li>
          <li>Use a hardware wallet for large amounts</li>
          <li>Create strong, unique passwords</li>
          <li>Be cautious of phishing attempts</li>
          <li>Keep your software and devices updated</li>
          <li>Consider using a dedicated device for crypto transactions</li>
        </ul>
        <p>Remember: If something seems too good to be true, it probably is. Always verify before taking action.</p>
      </>
    ),
  },
  {
    id: "transaction",
    title: "First Transaction",
    description: "Learn how to buy, send, and receive cryptocurrency.",
    icon: ArrowRight,
    content: (
      <>
        <h3 className="text-xl font-semibold mb-4">Making Your First Transaction</h3>
        <p className="mb-4">
          Now that you have a wallet and understand security, let's learn how to make transactions.
        </p>
        <h3 className="text-xl font-semibold mb-4">Transaction Basics:</h3>
        <ol className="list-decimal pl-5 space-y-2 mb-4">
          <li>To receive crypto, share your public address (never your private key)</li>
          <li>To send crypto, you'll need the recipient's public address</li>
          <li>Double-check addresses before confirming any transaction</li>
          <li>Be aware of network fees which vary based on network congestion</li>
          <li>Start with small amounts until you're comfortable with the process</li>
        </ol>
        <p>Congratulations! You're now ready to participate in the crypto economy.</p>
      </>
    ),
  },
]

export function StepGuide({ currentStep, completedSteps, nextStep, prevStep }: StepGuideProps) {
  const CurrentIcon = steps[currentStep].icon

  return (
    <div className="p-6 md:p-10 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Crypto Onboarding</h2>
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentStep ? "bg-white" : completedSteps.includes(index) ? "bg-emerald-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`flex-shrink-0 p-4 w-48 backdrop-blur-md ${
              index === currentStep
                ? "bg-white/20 border-emerald-500"
                : completedSteps.includes(index)
                  ? "bg-white/10 border-emerald-500/50"
                  : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center mb-2">
              {completedSteps.includes(index) ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" />
              ) : (
                <step.icon className={`h-5 w-5 ${index === currentStep ? "text-white" : "text-white/70"} mr-2`} />
              )}
              <div className={`text-sm font-medium ${index === currentStep ? "text-white" : "text-white/70"}`}>
                Step {index + 1}
              </div>
            </div>
            <div className={`text-base font-semibold ${index === currentStep ? "text-white" : "text-white/70"}`}>
              {step.title}
            </div>
          </Card>
        ))}
      </div>

      <Card className="flex-1 backdrop-blur-md bg-white/10 border-white/20 p-6 overflow-auto">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
              <CurrentIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{steps[currentStep].title}</h3>
              <p className="text-white/70">{steps[currentStep].description}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">{steps[currentStep].content}</div>
        </motion.div>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="border-white/20 bg-white/10 text-white hover:bg-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

