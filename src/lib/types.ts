export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface UserProfile {
  age: number;
  location: string;
  language: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  initialQuestion: string;
}
