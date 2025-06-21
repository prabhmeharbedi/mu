"use client";

import type { Topic } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SakhiLogo } from "./icons";
import { ArrowRight } from "lucide-react";

interface TopicSelectionProps {
  topics: Topic[];
  onSelect: (topic: Topic) => void;
}

export function TopicSelection({ topics, onSelect }: TopicSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left decorative panel */}
      <div className="relative flex flex-col items-center justify-center lg:w-1/2 bg-card p-8 lg:p-12 text-center text-foreground overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-full h-full opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl animate-[spin_20s_linear_infinite]"/>
        </div>
         <div className="absolute -right-1/4 -bottom-1/4 w-full h-full opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl animate-[spin_25s_linear_infinite_reverse]"/>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
                <SakhiLogo />
                <h1 className="font-headline text-6xl text-primary">Sakhi</h1>
            </div>
            <p className="font-body text-2xl max-w-md mx-auto mt-4">
              Every conversation is a journey. Let's take the first step, <span className="text-primary font-semibold">together</span>.
            </p>
            <p className="font-body text-lg text-muted-foreground max-w-sm mx-auto mt-6">
              I'm here to be your friend and guide, listening with care. Tell me, what's on your heart today, pyaari?
            </p>
        </div>
      </div>

      {/* Right topic selection panel */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
        <div className="w-full max-w-md mx-auto">
            <h2 className="font-headline text-3xl text-foreground mb-8 text-center lg:text-left">Let's start our conversation...</h2>
            <div className="space-y-4">
                {topics.map((topic) => (
                <Card
                    key={topic.id}
                    onClick={() => onSelect(topic)}
                    className="cursor-pointer group bg-card hover:bg-accent/20 border hover:border-primary transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                    <CardHeader className="flex flex-row items-center p-4 gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <topic.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="font-headline text-lg text-card-foreground">{topic.title}</CardTitle>
                        <CardDescription className="text-muted-foreground mt-1">{topic.description}</CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </CardHeader>
                </Card>
                ))}
            </div>
            <footer className="text-center mt-12 text-muted-foreground text-sm">
                <p>Your conversations are private and secure.</p>
                <p className="font-bold mt-1">यह medical advice नहीं है, doctor se baat करना हमेशा better होता है serious issues के लिए।</p>
            </footer>
        </div>
      </div>
    </div>
  );
}
