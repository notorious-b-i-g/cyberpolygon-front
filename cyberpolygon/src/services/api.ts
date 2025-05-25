import axios from 'axios';
import { store } from '../store';
import { User, Task, VM } from '@/types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const API_PATH = process.env.REACT_APP_API_PATH || '/cyberpolygon/api';
const API_VERSION = process.env.REACT_APP_API_VERSION || '/v1';

const api = axios.create({
  baseURL: `${API_URL}${API_PATH}${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем ошибки
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если токен истек или недействителен, выходим из системы
      store.dispatch({ type: 'auth/logout' });
    }
    return Promise.reject(error);
  }
);

class ApiClient {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(username: string, email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data;
  }

  async getTask(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  }

  // VMs
  async createVM(taskId: string): Promise<VM> {
    const response = await api.post('/vms', { taskId });
    return response.data;
  }

  async getVM(id: string): Promise<VM> {
    const response = await api.get(`/vms/${id}`);
    return response.data;
  }

  async stopVM(id: string): Promise<void> {
    await api.post(`/vms/${id}/stop`);
  }

  async deleteVM(id: string): Promise<void> {
    await api.delete(`/vms/${id}`);
  }
}

export const apiClient = new ApiClient(); 