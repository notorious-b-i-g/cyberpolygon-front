import axiosInstance from './axiosInstance';

const mediaApi = {
  /**
   * Загрузка медиа-файла на сервер
   * @param file - Файл для загрузки
   * @param type - Тип медиа-файла (avatar, task, course)
   * @param relatedId - ID связанного объекта (курс, задание и т.д.)
   */
  upload: async (file, type, relatedId) => {
    // Создаем FormData объект для отправки файла
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    if (relatedId) {
      formData.append('related_id', relatedId.toString());
    }
    
    const response = await axiosInstance.post('/cyberpolygon/v1/media/upload/', formData, {
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
  getMediaUrl: (path) => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Удаляем начальный слеш, если он есть
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    
    return `http://localhost:8000/${normalizedPath}`;
  }
};

export default mediaApi; 