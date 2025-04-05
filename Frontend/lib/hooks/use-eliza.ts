"use client";

import { useState, useEffect } from "react";

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
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Initialize session on component mount
  useEffect(() => {
    // Create a unique session ID or retrieve from storage
    const newSessionId = localStorage.getItem('elizaSessionId') || `session-${Date.now()}`;
    localStorage.setItem('elizaSessionId', newSessionId);
    setSessionId(newSessionId);
  }, []);

  const sendMessage = async (text: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setIsLoading(true);

    try {
      if (!sessionId) {
        throw new Error("Session not initialized");
      }
      
      // Connect to the Eliza backend using the correct endpoint for client-direct
      console.log(`Attempting to connect to: http://localhost:3000/41380eba-0816-0e63-a91a-6d27f39cf120/message`);
      const response = await fetch('http://localhost:3000/41380eba-0816-0e63-a91a-6d27f39cf120/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          userId: sessionId,
          roomId: `room-${sessionId}`,
          userName: "User",
        }),
      });
      
      console.log(`Response status: ${response.status}`);
      
      if (!response.ok) {
        console.error(`Server error: ${response.status} ${response.statusText}`);
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      
      // Add the bot response to messages - the response is an array of content objects
      if (data && Array.isArray(data) && data.length > 0 && data[0].text) {
        console.log(`Adding assistant message: ${data[0].text}`);
        setMessages((prev) => [
          ...prev,
          { text: data[0].text, sender: "assistant" },
        ]);
      } else {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback to local responses if the server connection fails
      const fallbackResponses = [
        "Sorry, I'm having trouble connecting to my knowledge base. Can we try again?",
        "There seems to be a connection issue. Let's try a different question.",
        "I'm experiencing some technical difficulties. Please try again in a moment.",
      ];
      
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      
      setMessages((prev) => [
        ...prev,
        { text: fallbackResponses[randomIndex], sender: "assistant" },
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