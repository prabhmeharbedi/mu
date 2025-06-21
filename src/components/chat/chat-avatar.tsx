import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { SakhiLogo } from "../icons";

interface ChatAvatarProps {
  role: 'user' | 'assistant' | 'system';
  className?: string;
}

export function ChatAvatar({ role, className }: ChatAvatarProps) {
  const isAssistant = role === "assistant";
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        isAssistant ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground",
        className
      )}
    >
      {isAssistant ? <SakhiLogo /> : <User className="h-5 w-5" />}
    </div>
  );
}
