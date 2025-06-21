"use client";

import React, { useState, useEffect } from 'react';
import type { Message, UserProfile, Topic } from '@/lib/types';
import { getAiResponse } from './actions';
import { TopicSelection } from '@/components/topic-selection';
import { ChatLayout } from '@/components/chat/chat-layout';
import { nanoid } from 'nanoid';
import { useToast } from "@/hooks/use-toast"
import { IconEmotionalSupport, IconLifeSkills, IconMenstrualHealth, IconWellness } from '@/components/icons';

const topics: Topic[] = [
  {
    id: 'menstrual',
    title: 'Menstrual Health',
    description: 'Talk about periods, pain, and hygiene.',
    icon: IconMenstrualHealth,
    initialQuestion: 'I want to talk about my menstrual health.',
  },
  {
    id: 'wellness',
    title: 'Wellness & Health',
    description: 'Discuss nutrition, exercise, and mental peace.',
    icon: IconWellness,
    initialQuestion: 'I want to discuss my general wellness and health.',
  },
  {
    id: 'emotional',
    title: 'Emotional Support',
    description: 'Share feelings about stress, confidence, and relationships.',
    icon: IconEmotionalSupport,
    initialQuestion: 'I need some emotional support.',
  },
  {
    id: 'life-skills',
    title: 'Life Skills',
    description: 'Get guidance on career, family, and social situations.',
    icon: IconLifeSkills,
    initialQuestion: 'I would like to get some guidance on life skills.',
  },
];

export default function SakhiApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 25,
    location: 'Tier 2 City',
    language: 'Hinglish',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] =useState<'topics' | 'chat'>('topics');
  const [recommendedTopic, setRecommendedTopic] = useState<{ topic: string, reason: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (view === 'chat' && messages.length === 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: nanoid(),
            role: 'assistant',
            content: "Hello प्यारी! How are you feeling today? I'm here to listen.",
          },
        ]);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [view, messages.length]);

  const sendMessage = async (content: string) => {
    const newMessages: Message[] = [
      ...messages,
      { id: nanoid(), role: 'user', content },
    ];
    setMessages(newMessages);
    setIsLoading(true);
    setRecommendedTopic(null);

    const res = await getAiResponse({ messages: newMessages, userProfile });

    if (res.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: res.error,
      });
    } else {
      setMessages((prev) => [
        ...prev,
        { id: nanoid(), role: 'assistant', content: res.answer! },
      ]);
      if (res.nextTopic && res.reason) {
        setRecommendedTopic({ topic: res.nextTopic, reason: res.reason });
      }
    }
    
    setIsLoading(false);
  };
  
  const handleTopicSelect = (topic: Topic) => {
    setMessages([]);
    setView('chat');
    sendMessage(topic.initialQuestion);
  };

  const handleBackToTopics = () => {
    setView('topics');
    setMessages([]);
    setRecommendedTopic(null);
  };

  if (view === 'topics') {
    return <TopicSelection topics={topics} onSelect={handleTopicSelect} />;
  }

  return (
    <ChatLayout
      messages={messages}
      isLoading={isLoading}
      onSendMessage={sendMessage}
      userProfile={userProfile}
      onUpdateProfile={setUserProfile}
      onBack={handleBackToTopics}
      recommendedTopic={recommendedTopic}
    />
  );
}
