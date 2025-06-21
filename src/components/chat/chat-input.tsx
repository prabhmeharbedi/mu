"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, Bot } from "lucide-react";
import { useState, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  recommendedTopic: { topic: string; reason: string } | null;
}

export function ChatInput({ onSendMessage, isLoading, recommendedTopic }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleTopicClick = (topic: string) => {
    onSendMessage(topic);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="space-y-4">
      {recommendedTopic && !isLoading && (
        <div className="animate-fade-in">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handleTopicClick(recommendedTopic.topic)}
                >
                  <Bot className="mr-2 shrink-0" />
                  <span className="truncate">{recommendedTopic.topic}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="start">
                <p className="font-bold">Next Topic Suggestion:</p>
                <p>{recommendedTopic.reason}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-start gap-4">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 resize-none"
          rows={1}
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
          <SendHorizonal className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
