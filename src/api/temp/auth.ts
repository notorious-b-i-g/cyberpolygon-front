import axiosInstance from './axiosInstance';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

interface AuthResponse {
  access: string;
  refresh?: string;
  id?: number;
  username?: string;
  email?: string;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  telegram_id?: string;
  roles?: string[];
  teams?: {
    id: number;
    name: string;
    role: string;
  }[];
  bio?: string;
}

const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login/', credentials);
    const data = response.data;
    
    if (data.access) {
      localStorage.setItem('token', data.access);
      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh);
      }
    }
    
    return data;
  },
  
  refreshToken: async (): Promise<AuthResponse> => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) throw new Error('No refresh token available');
    
    const response = await axiosInstance.post('/token/refresh/', { refresh });
    const data = response.data;
    
    if (data.access) {
      localStorage.setItem('token', data.access);
    }
    
    return data;
  },
  
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signup/', userData);
    const data = response.data;
    
    if (data.access) {
      localStorage.setItem('token', data.access);
      if (data.refresh) {
        localStorage.setItem('refreshToken', data.refresh);
      }
    }
    
    return data;
  },
  
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/auth/logout/');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  },
  
  getCurrentUser: async (): Promise<UserProfile | null> => {
    try {
      const response = await axiosInstance.get('/profile/');
      return response.data;
    } catch (error) {
      return null;
    }
  },
  
  updateProfile: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await axiosInstance.patch('/profile/', profileData);
    return response.data;
  }
};

export default authApi; 