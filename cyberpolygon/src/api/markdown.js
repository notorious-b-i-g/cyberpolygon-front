import apiClient from './apiClient';

/**
 * Получение markdown поста
 * @param {Object} postData - Данные для получения поста
 * @returns {Promise<Object>} Markdown пост
 */
export const getMarkdownPost = async (postData) => {
  try {
    const response = await apiClient.post('/cyberpolygon/v1/get_markdown_post/', postData);
    return response;
  } catch (error) {
    console.error('Ошибка при получении markdown поста:', error);
    throw error;
  }
};

/**
 * Получение markdown поста по ID
 * @param {number} postId - ID поста
 * @returns {Promise<Object>} Markdown пост
 */
export const getMarkdownPostById = async (postId) => {
  try {
    // Предполагаем, что API принимает ID поста в теле запроса
    const response = await getMarkdownPost({ postId });
    return response;
  } catch (error) {
    console.error(`Ошибка при получении markdown поста ${postId}:`, error);
    throw error;
  }
};

/**
 * Получение markdown поста по пути файла
 * @param {string} filePath - Путь к файлу
 * @returns {Promise<Object>} Markdown пост
 */
export const getMarkdownPostByPath = async (filePath) => {
  try {
    // Предполагаем, что API принимает путь к файлу в теле запроса
    const response = await getMarkdownPost({ filePath });
    return response;
  } catch (error) {
    console.error(`Ошибка при получении markdown поста по пути ${filePath}:`, error);
    throw error;
  }
}; 