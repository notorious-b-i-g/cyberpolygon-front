export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
  progress?: number;
  content: string;
  hints: string[];
  solution: string;
  createdAt: string;
  updatedAt: string;
} 