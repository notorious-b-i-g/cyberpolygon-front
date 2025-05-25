export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface VM {
  id: string;
  taskId: string;
  userId: string;
  status: 'running' | 'stopped' | 'error';
  ip: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

export interface VMState {
  vms: VM[];
  currentVM: VM | null;
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  tasks: TaskState;
  vms: VMState;
} 