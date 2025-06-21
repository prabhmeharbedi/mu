import { cn } from "@/lib/utils";
import { ChatAvatar } from "./chat-avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <div
      className={cn(
        "flex items-start gap-4 animate-fade-in",
        !isAssistant && "flex-row-reverse"
      )}
    >
      <ChatAvatar role={role} />
      <div
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[80%] md:max-w-[70%]",
          isAssistant
            ? "bg-secondary rounded-bl-none"
            : "bg-primary text-primary-foreground rounded-br-none"
        )}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-1 p-2">
            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
          </div>
        ) : (
          <ReactMarkdown
            className="font-body leading-relaxed"
            remarkPlugins={[remarkGfm]}
            components={{
              p({ node, ...props }) { return <p className="mb-0 last:mb-0" {...props} /> },
              ul({ node, ...props }) { return <ul className="list-disc list-inside space-y-1 pl-2" {...props} /> },
              strong({ node, ...props }) { return <strong className="font-bold" {...props} /> },
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
