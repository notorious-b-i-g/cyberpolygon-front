import axiosInstance from './axiosInstance';

interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  category: string;
  difficulty: string;
  is_solved: boolean;
  hint?: string;
  media?: {
    type: string;
    url: string;
  }[];
}

interface TaskSubmitResponse {
  status: 'correct' | 'incorrect' | 'already_solved';
  message: string;
  points?: number;
}

const tasksApi = {
  // Получение списка всех заданий
  list: async (category?: string, difficulty?: string): Promise<Task[]> => {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (difficulty) params.difficulty = difficulty;
    
    const response = await axiosInstance.get('/tasks/', { params });
    return response.data;
  },
  
  // Получение детальной информации о задании по id
  get: async (id: string | number): Promise<Task> => {
    const response = await axiosInstance.get(`/tasks/${id}/`);
    return response.data;
  },
  
  // Отправка флага для проверки
  submit: async (id: string | number, flag: string): Promise<TaskSubmitResponse> => {
    const response = await axiosInstance.post(`/tasks/check_flag`, { 
      task: id,
      username: localStorage.getItem('username') || '',
      flag
    });
    return response.data;
  }
};

export default tasksApi; 