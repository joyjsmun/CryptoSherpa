"use client";

import { useState } from "react";

type Message = {
  text: string;
  sender: "user" | "assistant";
};

export function useEliza() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I help you on your cryptocurrency journey?",
      sender: "assistant",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setIsLoading(true);

    try {
      // In a real implementation, we would call the backend API here
      // const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
      // const data = await response.json();
      
      // Temporary responses (until we connect to the backend)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const responses = [
        "Thank you for your interest in cryptocurrency. Do you have any specific questions?",
        "Welcome to the world of cryptocurrency! What would you like to know more about?",
        "Blockchain technology is revolutionizing the financial world. Would you like to learn about a specific cryptocurrency?",
        "It's important to approach cryptocurrency investment carefully. Do you need more detailed information?",
        "Do you need help setting up a cryptocurrency wallet?",
      ];
      
      const randomIndex = Math.floor(Math.random() * responses.length);
      
      setMessages((prev) => [
        ...prev,
        { text: responses[randomIndex], sender: "assistant" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, an error occurred. Please try again later.", sender: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
} 