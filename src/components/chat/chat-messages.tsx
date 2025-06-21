"use client";

import type { Message } from "@/lib/types";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollableContainerRef} className="p-4 md:p-6 space-y-6 h-full overflow-y-auto">
      {messages.map((message, index) => (
        <ChatMessage key={message.id} {...message} />
      ))}
      {isLoading && messages[messages.length-1]?.role === 'user' && (
        <ChatMessage role="assistant" content="..." isLoading={true} />
      )}
    </div>
  );
}
