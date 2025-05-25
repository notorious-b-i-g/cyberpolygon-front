import apiClient from './apiClient';

/**
 * Загрузка файла на сервер
 * @param {File} file - Файл для загрузки
 * @param {Object} options - Дополнительные параметры
 * @returns {Promise<Object>} Результат операции
 */
export const uploadFile = async (file, options = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Добавление дополнительных параметров в formData
    Object.keys(options).forEach(key => {
      formData.append(key, options[key]);
    });
    
    const response = await apiClient.post('/cyberpolygon/api/v1/files/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    throw error;
  }
};

/**
 * Скачивание файла с сервера
 * @param {string} fileId - Идентификатор файла
 * @returns {Promise<Blob>} Файл в виде Blob-объекта
 */
export const downloadFile = async (fileId) => {
  try {
    const response = await apiClient.get(`/cyberpolygon/api/v1/files/download/${fileId}/`, {
      responseType: 'blob'
    });
    
    return response.data;
  } catch (error) {
    console.error(`Ошибка при скачивании файла ${fileId}:`, error);
    throw error;
  }
};

/**
 * Получение списка файлов
 * @param {Object} params - Параметры запроса
 * @returns {Promise<Array>} Список файлов
 */
export const getFiles = async (params = {}) => {
  try {
    const response = await apiClient.get('/cyberpolygon/api/v1/files/', { params });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка файлов:', error);
    throw error;
  }
};

/**
 * Получение информации о файле
 * @param {string} fileId - Идентификатор файла
 * @returns {Promise<Object>} Информация о файле
 */
export const getFileInfo = async (fileId) => {
  try {
    const response = await apiClient.get(`/cyberpolygon/api/v1/files/${fileId}/`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении информации о файле ${fileId}:`, error);
    throw error;
  }
};

/**
 * Удаление файла
 * @param {string} fileId - Идентификатор файла
 * @returns {Promise<Object>} Результат операции
 */
export const deleteFile = async (fileId) => {
  try {
    const response = await apiClient.delete(`/cyberpolygon/api/v1/files/${fileId}/`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при удалении файла ${fileId}:`, error);
    throw error;
  }
}; 