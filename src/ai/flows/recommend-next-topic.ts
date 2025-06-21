'use server';

/**
 * @fileOverview A flow that recommends the next topic to discuss with Sakhi, based on the current topic.
 *
 * - recommendNextTopic - A function that handles the recommendation of the next topic.
 * - RecommendNextTopicInput - The input type for the recommendNextTopic function.
 * - RecommendNextTopicOutput - The return type for the recommendNextTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendNextTopicInputSchema = z.object({
  currentTopic: z
    .string()
    .describe('The topic that the user and Sakhi are currently discussing.'),
  conversationHistory: z
    .string()
    .describe('The history of the conversation between the user and Sakhi.'),
});
export type RecommendNextTopicInput = z.infer<typeof RecommendNextTopicInputSchema>;

const RecommendNextTopicOutputSchema = z.object({
  nextTopic: z
    .string()
    .describe('The next topic that Sakhi recommends for the user to discuss.'),
  reason: z
    .string()
    .describe('The reason why Sakhi recommends this topic.'),
});
export type RecommendNextTopicOutput = z.infer<typeof RecommendNextTopicOutputSchema>;

export async function recommendNextTopic(input: RecommendNextTopicInput): Promise<RecommendNextTopicOutput> {
  return recommendNextTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendNextTopicPrompt',
  input: {schema: RecommendNextTopicInputSchema},
  output: {schema: RecommendNextTopicOutputSchema},
  prompt: `You are Sakhi, a warm and caring AI companion. Based on the current topic and conversation history, recommend a related topic that the user might find helpful.

Current Topic: {{{currentTopic}}}
Conversation History: {{{conversationHistory}}}

Recommend a next topic and explain why it would be helpful for the user to discuss it.

Output in the following JSON format: { \"nextTopic\": \"<next topic>\", \"reason\": \"<reason>\" }`,
});

const recommendNextTopicFlow = ai.defineFlow(
  {
    name: 'recommendNextTopicFlow',
    inputSchema: RecommendNextTopicInputSchema,
    outputSchema: RecommendNextTopicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
