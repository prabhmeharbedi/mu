import { config } from 'dotenv';
config();

import '@/ai/flows/answer-question.ts';
import '@/ai/flows/summarize-conversation.ts';
import '@/ai/flows/recommend-next-topic.ts';