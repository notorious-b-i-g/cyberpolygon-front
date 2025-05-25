export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Начальный' | 'Средний' | 'Продвинутый';
  duration: number;
  imageUrl: string;
  progress?: number;
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number;
  order: number;
  completed?: boolean;
} 