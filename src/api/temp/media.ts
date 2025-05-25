import axiosInstance from './axiosInstance';

interface MediaUploadResponse {
  id?: number;
  status: string;
  file_path: string;
  file_hash?: string;
  url?: string;
  type?: string;
}

// Типы медиа-файлов
type MediaType = 'avatar' | 'task' | 'course';

const mediaApi = {
  /**
   * Загрузка медиа-файла на сервер
   * @param file - Файл для загрузки
   * @param type - Тип медиа-файла (avatar, task, course)
   * @param relatedId - ID связанного объекта (курс, задание и т.д.)
   */
  upload: async (file: File, type?: MediaType, relatedId?: number): Promise<MediaUploadResponse> => {
    // Создаем FormData объект для отправки файла
    const formData = new FormData();
    formData.append('file', file);
    
    if (type) {
      formData.append('type', type);
    }
    
    if (relatedId) {
      formData.append('related_id', relatedId.toString());
    }
    
    const response = await axiosInstance.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  /**
   * Получение URL для медиафайла
   * @param path - Путь к файлу
   */
  getMediaUrl: (path: string): string => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Удаляем начальный слеш, если он есть
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    
    return `${axiosInstance.defaults.baseURL}/${normalizedPath}`;
  }
};

export default mediaApi; 