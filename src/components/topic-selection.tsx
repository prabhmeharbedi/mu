"use client";

import type { Topic } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SakhiLogo } from "./icons";

interface TopicSelectionProps {
  topics: Topic[];
  onSelect: (topic: Topic) => void;
}

export function TopicSelection({ topics, onSelect }: TopicSelectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <SakhiLogo />
          <h1 className="font-headline text-5xl text-primary">Sakhi</h1>
        </div>
        <p className="font-body text-xl text-muted-foreground max-w-lg mx-auto">
          Hey beautiful! I'm Sakhi, your AI bestie. A private, safe space for all your questions. What's on your mind today?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            onClick={() => onSelect(topic)}
            className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out group bg-card border-2 border-transparent hover:border-primary/50"
          >
            <CardHeader className="flex flex-col items-center text-center p-6">
              <div className="mb-4 text-primary transition-colors duration-300">
                <topic.icon className="w-16 h-16" />
              </div>
              <CardTitle className="font-headline text-xl text-card-foreground">{topic.title}</CardTitle>
              <CardDescription className="text-muted-foreground mt-1 h-12">{topic.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <footer className="text-center mt-12 text-muted-foreground text-sm">
        <p>Your conversations are private and secure.</p>
        <p className="font-bold mt-1">यह medical advice नहीं है, doctor se baat करना हमेशा better होता है serious issues के लिए।</p>
      </footer>
    </div>
  );
}
