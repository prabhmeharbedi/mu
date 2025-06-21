"use client";

import type { Topic } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SakhiLogo } from "./icons";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopicSelectionProps {
  topics: Topic[];
  onSelect: (topic: Topic) => void;
}

export function TopicSelection({ topics, onSelect }: TopicSelectionProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center text-foreground overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <div className="absolute -left-1/4 -top-1/4 w-full h-full opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl animate-[spin_20s_linear_infinite]"/>
        </div>
        <div className="absolute -right-1/4 -bottom-1/4 w-full h-full opacity-20">
            <div className="absolute w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl animate-[spin_25s_linear_infinite_reverse]"/>
        </div>
        <div className="relative z-10 flex flex-col items-center animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
                <SakhiLogo />
                <h1 className="font-headline text-6xl md:text-7xl text-primary">Sakhi</h1>
            </div>
            <p className="font-body text-2xl max-w-md mx-auto mt-4">
              Every conversation is a journey. Let's take the first step, <span className="text-primary font-semibold">together</span>.
            </p>
            <p className="font-body text-lg text-muted-foreground max-w-sm mx-auto mt-6">
              I'm here to be your friend and guide, listening with care. Tell me, what's on your heart today, pyaari?
            </p>
            <a
              href="#topics"
              className={cn(buttonVariants({ size: "lg" }), "mt-12")}
            >
              Let's Talk
              <ArrowRight className="w-5 h-5" />
            </a>
        </div>
         <div className="absolute bottom-8 text-primary animate-bounce z-10">
            <a href="#topics" aria-label="Scroll to topics">
                <ChevronDown className="w-8 h-8" />
            </a>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="flex flex-col justify-center p-8 lg:p-16 bg-background">
        <div className="w-full max-w-xl mx-auto">
            <h2 className="font-headline text-4xl text-foreground mb-12 text-center">Let's start our conversation...</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topics.map((topic, index) => (
                <Card
                    key={topic.id}
                    onClick={() => onSelect(topic)}
                    className="cursor-pointer group relative bg-card hover:bg-accent/20 border hover:border-primary transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}
                >
                    <CardHeader className="flex flex-col items-center text-center p-6 gap-4">
                      <div className="p-4 bg-primary/10 rounded-full text-primary transition-all duration-300 group-hover:scale-110">
                          <topic.icon className="w-10 h-10" />
                      </div>
                      <div className="flex-1">
                          <CardTitle className="font-headline text-xl text-card-foreground">{topic.title}</CardTitle>
                          <CardDescription className="text-muted-foreground mt-2">{topic.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <div className="absolute bottom-4 right-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 opacity-0 group-hover:opacity-100">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                </Card>
                ))}
            </div>
            <footer className="text-center mt-16 text-muted-foreground text-sm">
                <p>Your conversations are private and secure.</p>
                <p className="font-bold mt-1">यह medical advice नहीं है, doctor se baat करना हमेशा better होता है serious issues के लिए।</p>
            </footer>
        </div>
      </section>
    </div>
  );
}
