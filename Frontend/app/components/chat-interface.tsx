"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, MicOff, Paperclip } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEliza } from "@/hooks/use-eliza";

export function ChatInterface() {
  const { messages, isLoading, sendMessage } = useEliza();
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isVoicePopupVisible, setIsVoicePopupVisible] = useState(false);
  const [voicePosition, setVoicePosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const message = inputValue;
    setInputValue("");
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Show voice popup
      setIsVoicePopupVisible(true);

      // Simulate voice recognition
      setTimeout(() => {
        setInputValue("Tell me about crypto wallets");
        setIsRecording(false);
        setIsVoicePopupVisible(false);
      }, 3000);
    } else {
      setIsVoicePopupVisible(false);
    }
  };

  const takeScreenshot = () => {
    alert(
      "File attachment clicked! (This is a simulation - in a real app, this would open a file picker)"
    );
  };

  const openGuide = () => {
    window.open("https://cryptosherpa.io", "_blank");
  };

  return (
    <div
      className="h-full flex flex-col backdrop-blur-md bg-white/5 rounded-2xl border border-white/20 overflow-hidden"
      style={{ minHeight: "300px", maxHeight: "100%" }}
      ref={containerRef}
    >
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">
          Interactive Assistant
        </h2>
        <p className="text-white/70 text-sm">
          Ask questions or get guidance on your crypto journey
        </p>
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{ minHeight: "150px" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-emerald-600/80 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-white/10 text-white">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-full ${
              isRecording
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={takeScreenshot}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            title="Attach File"
          >
            <Paperclip size={20} />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          <button
            onClick={handleSend}
            className="p-2 bg-emerald-600/80 text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Voice Assistant Popup */}
      <AnimatePresence>
        {isVoicePopupVisible && (
          <>
            {/* Full screen overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setIsVoicePopupVisible(false)}
            />

            {/* Centered animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center"
            >
              <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                <Image
                  src="/images/mic-animation.png"
                  alt="Voice Assistant"
                  width={300}
                  height={300}
                  className="animate-pulse"
                />
                <div className="absolute text-center mt-40">
                  <p className="text-white text-lg">Listening...</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
