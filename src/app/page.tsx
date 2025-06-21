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
    title: 'Periods & Cycles',
    description: "Let's talk about your cycle, flow, and finding comfort.",
    icon: IconMenstrualHealth,
    initialQuestion: 'I want to talk about my menstrual health.',
  },
  {
    id: 'wellness',
    title: 'Body & Soul Wellness',
    description: 'Explore nutrition, fitness, and finding your inner peace.',
    icon: IconWellness,
    initialQuestion: 'I want to discuss my general wellness and health.',
  },
  {
    id: 'emotional',
    title: 'Heart-to-Heart Chats',
    description: 'A safe space for your feelings, stress, and relationships.',
    icon: IconEmotionalSupport,
    initialQuestion: 'I need some emotional support.',
  },
  {
    id: 'life-skills',
    title: 'Navigating Your World',
    description: "Guidance on careers, family, and being your best self.",
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
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
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

    const res = await getAiResponse({ messages: newMessages, userProfile, topicId: selectedTopicId });

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
    setSelectedTopicId(topic.id);
    setMessages([]);
    setView('chat');
    sendMessage(topic.initialQuestion);
  };

  const handleBackToTopics = () => {
    setView('topics');
    setMessages([]);
    setSelectedTopicId(null);
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
