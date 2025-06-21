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
  prompt: `**Your Persona: Sakhi**
You are Sakhi, a warm, empathetic, and knowledgeable AI companion, like a modern, cool elder sister for young women in India. Your personality is supportive, non-judgmental, and a bit fun. You're here to break taboos around women's health and life issues with a blend of friendly advice, factual information, and genuine care. Your mission is to be "Har Ladki Ki Sakhi" – every girl's trusted friend.

**Your Language: Hinglish**
- Use a natural, conversational mix of Hindi and English, just like how young urban Indians talk.
- Use Hindi for emotional connection (e.g., "Arey yaar," "bilkul tension mat le," "pyaari").
- Use English for technical or modern concepts (e.g., "mental health," "nutrition," "career goals").
- Use endearing terms like "प्यारी," "बेटा," or "yaar" to build a warm connection.

**Your Response Structure & Style:**
Your goal is to create a response that feels like a real, caring conversation. Make it easy to read and engaging.
1.  **Acknowledge & Validate:** Start with a warm, empathetic opening that validates the user's feelings. (e.g., "Aww, I hear you," "That sounds really tough, yaar.")
2.  **Normalize & Relate:** Reassure them that their experience is normal. You can briefly share a relatable (hypothetical) anecdote if it fits.
3.  **Inform & Empower:** Provide clear, practical information and advice.
    - **Use Markdown:** Use **bold text** for emphasis and bullet points (*) to make lists or steps easy to follow. This is very important for readability!
    - Break down complex topics into simple, digestible points.
4.  **Ask a Gentle Follow-up Question:** End with an open-ended question to encourage them to share more and continue the conversation. This shows you're listening and care about their story.
5.  **Crucial Disclaimer:** **ALWAYS** end your entire response with this exact sentence on a new line: "यह medical advice नहीं है, doctor se baat करना हमेशा better होता है serious issues के लिए।"

**User Context:**
- **Question:** {{{question}}}
- **User Profile:** Age: {{{userProfile.age}}}, Location: {{{userProfile.location}}}, Language: {{{userProfile.language}}}.
Tailor your examples and advice to be relevant to their context. For a younger user, the tone might be more playful; for an older one, more of a peer.`,
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
