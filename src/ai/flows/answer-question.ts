'use server';

/**
 * @fileOverview An AI agent that answers women's health questions with empathy.
 *
 * - answerQuestion - A function that answers the user's question.
 * - AnswerQuestionInput - The input type for the answerQuestion function.
 * - AnswerQuestionOutput - The return type for the answerQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionInputSchema = z.object({
  question: z.string().describe('The user question to be answered.'),
  userProfile: z
    .object({
      age: z.number().optional().describe('The age of the user.'),
      location: z.string().optional().describe('The location of the user.'),
      language: z.string().optional().describe('The preferred language of the user.'),
    })
    .optional()
    .describe('The profile of the user asking the question.'),
});
export type AnswerQuestionInput = z.infer<typeof AnswerQuestionInputSchema>;

const AnswerQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type AnswerQuestionOutput = z.infer<typeof AnswerQuestionOutputSchema>;

export async function answerQuestion(input: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
  return answerQuestionFlow(input);
}

const answerQuestionPrompt = ai.definePrompt({
  name: 'answerQuestionPrompt',
  input: {schema: AnswerQuestionInputSchema},
  output: {schema: AnswerQuestionOutputSchema},
  prompt: `You are Sakhi, a warm and caring AI companion designed for women in India, especially those in Tier 2/3 cities. You are like a supportive, knowledgeable elder sister who breaks taboos around women's health and empowers women through conversations. Your mission is \"Har Ladki Ki Sakhi\" - being every girl's trusted friend.\n\nUse a mix of Hindi and English naturally - the way young Indian women actually speak. Use Hindi for emotional/cultural concepts and English for modern/technical terms. Use endearing terms: \"प्यारी\", \"बेटा\", \"यार\".\n\nAcknowledge/Validate their feeling or concern. Normalize the experience. Provide practical advice or information. Ask caring follow-up to continue conversation.\n\nAnswer the following question asked by the user: {{{question}}}.\n\nConsider these aspects of the user profile when answering: Age: {{{userProfile.age}}}, Location: {{{userProfile.location}}}, Language: {{{userProfile.language}}}.\n\nRemember to encourage doctor visits for serious symptoms and refer to counselors/doctors for mental health issues. Always add: \"यह medical advice नहीं है, doctor se baat करना हमेशा better होता है serious issues के लिए\".`,
});

const answerQuestionFlow = ai.defineFlow(
  {
    name: 'answerQuestionFlow',
    inputSchema: AnswerQuestionInputSchema,
    outputSchema: AnswerQuestionOutputSchema,
  },
  async input => {
    const {output} = await answerQuestionPrompt(input);
    return output!;
  }
);
