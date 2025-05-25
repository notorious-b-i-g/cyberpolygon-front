import axiosInstance from './axiosInstance';

interface Course {
  id: number;
  slug: string;
  title: string;
  short_description?: string;
  content?: string;
  author?: {
    username: string;
    id: number;
  };
  created_at: string;
  updated_at: string;
  category: string;
  media?: {
    type: string;
    url: string;
  }[];
}

interface CourseListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
}

const coursesApi = {
  // Получение списка всех курсов
  list: async (category?: string, page?: number, size?: number): Promise<CourseListResponse> => {
    let url = '/courses/';
    const params: Record<string, string | number> = {};
    
    if (category) params.category = category;
    if (page) params.page = page;
    if (size) params.size = size;
    
    const response = await axiosInstance.get(url, { params });
    return response.data;
  },
  
  // Получение детальной информации о курсе по slug
  get: async (slug: string): Promise<Course> => {
    const response = await axiosInstance.get(`/courses/${slug}/`);
    return response.data;
  },
  
  // Создание нового курса (требуются права)
  create: async (courseData: {
    title: string;
    content: string;
    category: string;
    slug: string;
  }): Promise<Course> => {
    const response = await axiosInstance.post('/courses/', courseData);
    return response.data;
  }
};

export default coursesApi; 