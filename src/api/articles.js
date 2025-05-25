import axiosInstance from './axiosInstance';

const ARTICLES_URL = '/articles';

/**
 * Получить список всех статей
 * @param {string} rubricSlug - Slug рубрики для фильтрации (опционально)
 * @returns {Promise<Array>} Массив статей
 */
export const getArticles = async (rubricSlug = null) => {
  const url = rubricSlug ? `${ARTICLES_URL}/?rubric=${rubricSlug}` : `${ARTICLES_URL}/`;
  const response = await axiosInstance.get(url);
  return response.data;
};

/**
 * Получить детальную информацию о статье по ID или slug
 * @param {number|string} idOrSlug - ID или slug статьи
 * @returns {Promise<Object>} Объект с информацией о статье
 */
export const getArticleById = async (id) => {
  const response = await axiosInstance.get(`${ARTICLES_URL}/${id}/`);
  return response.data;
};

/**
 * Получить статью по её названию
 * @param {string} title - Название статьи
 * @returns {Promise<Object>} Объект со статьей и её Markdown-содержимым
 */
export const getArticleByTitle = async (title) => {
  const response = await axiosInstance.post(`${ARTICLES_URL}/markdown/`, { title });
  return response.data;
};

/**
 * Получить список статей по slug рубрики
 * @param {string} rubricSlug - Slug рубрики
 * @returns {Promise<Array>} Массив статей в рубрике
 */
export const getArticlesByRubric = async (rubricSlug) => {
  try {
    // При запросе API ожидает параметр rubric, который должен быть slug рубрики
    const response = await axiosInstance.get(`${ARTICLES_URL}/?rubric=${rubricSlug}`);
    return response.data;
  } catch (error) {
    // Возвращаем пустой массив при ошибке, чтобы UI мог корректно отобразить сообщение
    return [];
  }
};

/**
 * Получить список статей по названию рубрики через специальный эндпоинт
 * @param {string} rubricName - Название рубрики
 * @returns {Promise<Array>} Массив статей в рубрике
 */
export const getArticlesByRubricName = async (rubricName) => {
  try {
    const encodedName = encodeURIComponent(rubricName);
    const response = await axiosInstance.get(`${ARTICLES_URL}/rubric/${encodedName}/`);
    return response.data;
  } catch (error) {
    return [];
  }
};

/**
 * Получить список популярных статей
 * @param {number} limit - Ограничение количества
 * @returns {Promise<Array>} Массив популярных статей
 */
export const getPopularArticles = async (limit = 5) => {
  const response = await axiosInstance.get(`${ARTICLES_URL}/?limit=${limit}`);
  return response.data;
};

/**
 * Получить список тегов для статей
 * @returns {Promise<Array>} Массив тегов
 */
export const getTags = async () => {
  const response = await axiosInstance.get(`${ARTICLES_URL}/tags/`);
  return response.data;
};

/**
 * Получить обработанный Markdown контент статьи
 * @param {string} title - Название статьи
 * @returns {Promise<Object>} Объект с обработанным HTML
 */
export const getMarkdownHtml = async (title) => {
  const response = await axiosInstance.post(`${ARTICLES_URL}/markdown/`, { title });
  return response.data;
};

export const createArticle = async (data) => {
  const response = await axiosInstance.post(`${ARTICLES_URL}/`, data);
  return response.data;
};

export const updateArticle = async (id, data) => {
  const response = await axiosInstance.patch(`${ARTICLES_URL}/${id}/`, data);
  return response.data;
};

export const deleteArticle = async (id) => {
  const response = await axiosInstance.delete(`${ARTICLES_URL}/${id}/`);
  return response.data;
};

const articlesApi = {
  getArticles,
  getArticleById,
  getArticleByTitle,
  getArticlesByRubric,
  getArticlesByRubricName,
  getPopularArticles,
  getTags,
  getMarkdownHtml,
  createArticle,
  updateArticle,
  deleteArticle
};

export default articlesApi; 