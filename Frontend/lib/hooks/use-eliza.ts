"use client";

import { useState } from "react";

type Message = {
  text: string;
  sender: "user" | "assistant";
};

export function useEliza() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "안녕하세요! 암호화폐 여정에서 어떻게 도와드릴까요?",
      sender: "assistant",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // 사용자 메시지 추가
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setIsLoading(true);

    try {
      // 실제 구현에서는 여기서 백엔드 API를 호출합니다.
      // const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
      // const data = await response.json();
      
      // 임시 응답 (실제 백엔드 연결 전까지)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const responses = [
        "암호화폐에 관심을 가져주셔서 감사합니다. 더 구체적인 질문이 있으신가요?",
        "암호화폐 세계에 오신 것을 환영합니다! 어떤 부분이 궁금하신가요?",
        "블록체인 기술은 금융 세계를 혁신하고 있습니다. 특정 암호화폐에 대해 알고 싶으신가요?",
        "암호화폐 투자는 신중하게 접근하는 것이 중요합니다. 더 자세한 정보가 필요하신가요?",
        "암호화폐 지갑 설정에 도움이 필요하신가요?",
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
        { text: "죄송합니다, 오류가 발생했습니다. 나중에 다시 시도해주세요.", sender: "assistant" },
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