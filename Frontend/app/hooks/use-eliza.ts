"use client";

import { useState, useCallback } from "react";

// Define message types
export interface Message {
  sender: "user" | "assistant";
  text: string;
}

export interface ElizaResponse {
  text: string;
  [key: string]: any;
}

export function useEliza() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hello! I'm your Bango! crypto assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send message to Eliza backend
  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      setError(null);
      setIsLoading(true);

      // Add user message to state
      const updatedMessages = [...messages, { sender: "user", text: message }];
      setMessages(updatedMessages);

      try {
        // Hardcode the port to 3001 to ensure consistency
        const serverPort = 3001;
        const agentId = "CryptoSherpa"; // Matches the name in characters/strawberryagent.character.json

        console.log(
          `Sending message to http://localhost:${serverPort}/${agentId}/message`
        );

        // Send message to Eliza OS backend
        const response = await fetch(
          `http://localhost:${serverPort}/${agentId}/message`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: message,
              userId: "user",
              userName: "User",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received response:", data);

        // Process response data
        if (Array.isArray(data) && data.length > 0) {
          // Add all messages from the response
          const newMessages = [...updatedMessages];

          data.forEach((message: ElizaResponse) => {
            if (message.text) {
              newMessages.push({ sender: "assistant", text: message.text });
            }
          });

          setMessages(newMessages);
        } else {
          // Fallback if response format is unexpected
          setMessages([
            ...updatedMessages,
            {
              sender: "assistant",
              text: "Sorry, I couldn't process your request right now. Please try again later.",
            },
          ]);
        }
      } catch (error) {
        console.error("Error communicating with Eliza OS:", error);

        // Set error state
        setError(
          "Connection error: Please check that the Eliza OS server is running."
        );

        // Add error message
        setMessages([
          ...updatedMessages,
          {
            sender: "assistant",
            text: "Sorry, I'm having trouble connecting to my backend. Please check that the Eliza OS server is running.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  // Reset conversation
  const resetConversation = useCallback(() => {
    setMessages([
      {
        sender: "assistant",
        text: "Hello! I'm your crypto assistant. How can I help you today?",
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetConversation,
  };
}
