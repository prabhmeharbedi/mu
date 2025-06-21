"use client";

import type { Message, UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Settings } from "lucide-react";
import { SakhiLogo } from "@/components/icons";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ProfileSettings } from "../profile-settings";

interface ChatLayoutProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onBack: () => void;
  recommendedTopic: { topic: string; reason: string } | null;
}

export function ChatLayout({
  messages,
  isLoading,
  onSendMessage,
  userProfile,
  onUpdateProfile,
  onBack,
  recommendedTopic,
}: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2">
          <SakhiLogo />
          <span className="font-headline text-2xl text-primary">Sakhi AI</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <ProfileSettings
            profile={userProfile}
            onUpdateProfile={onUpdateProfile}
          />
        </Sheet>
      </header>
      <main className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </main>
      <footer className="p-4 border-t">
        <ChatInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          recommendedTopic={recommendedTopic}
        />
      </footer>
    </div>
  );
}
