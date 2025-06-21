'use server';

import { answerQuestion } from '@/ai/flows/answer-question';
import { recommendNextTopic } from '@/ai/flows/recommend-next-topic';
import type { UserProfile, Message } from '@/lib/types';
import { z } from 'zod';

const actionSchema = z.object({
  messages: z.array(z.object({
    id: z.string(),
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })),
  userProfile: z.object({
    age: z.number(),
    location: z.string(),
    language: z.string(),
  }),
});

export async function getAiResponse(input: { messages: Message[]; userProfile: UserProfile }) {
  const validatedInput = actionSchema.safeParse(input);
  if (!validatedInput.success) {
    return { error: 'Invalid input.' };
  }

  const { messages, userProfile } = validatedInput.data;
  
  // Ensure there's at least one user message to process
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
  if (!lastUserMessage) {
    return { answer: "Please start the conversation." };
  }

  const currentQuestion = lastUserMessage.content;
  const conversationHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n');
  
  try {
    const [answerResponse, recommendationResponse] = await Promise.all([
      answerQuestion({
        question: currentQuestion,
        userProfile: {
          age: userProfile.age,
          location: userProfile.location,
          language: userProfile.language
        }
      }),
      recommendNextTopic({
        currentTopic: currentQuestion,
        conversationHistory
      }),
    ]);

    return {
      answer: answerResponse.answer,
      nextTopic: recommendationResponse.nextTopic,
      reason: recommendationResponse.reason,
    };
  } catch (error) {
    console.error('Error getting AI response:', error);
    return {
      error: 'I am having some trouble right now. Please try again in a moment.',
    };
  }
}
