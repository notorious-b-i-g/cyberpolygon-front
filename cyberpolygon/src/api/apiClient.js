import API_CONFIG from '../config/api';

// Базовые настройки для fetch запросов
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Добавление токена авторизации в запрос, если он есть
const addAuthHeader = (options) => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return options;
};

// Обработка ответа от сервера
const handleResponse = async (response) => {
  // Для случаев, когда ответ пустой (например, при DELETE)
  if (response.status === 204) {
    return { success: true };
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Ошибка при парсинге ответа от сервера');
  }

  if (!response.ok) {
    // Если токен истек, редирект на страницу логина
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    throw new Error(data.error || 'Произошла ошибка при выполнении запроса');
  }

  return data;
};

// Основные методы для работы с API
const apiClient = {
  // GET запрос
  get: async (endpoint, options = {}) => {
    const url = `${API_CONFIG.getApiUrl()}${endpoint}`;
    const response = await fetch(url, addAuthHeader({
      ...defaultOptions,
      ...options,
      method: 'GET',
    }));
    return handleResponse(response);
  },

  // POST запрос
  post: async (endpoint, data, options = {}) => {
    const url = `${API_CONFIG.getApiUrl()}${endpoint}`;
    const response = await fetch(url, addAuthHeader({
      ...defaultOptions,
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }));
    return handleResponse(response);
  },

  // PUT запрос
  put: async (endpoint, data, options = {}) => {
    const url = `${API_CONFIG.getApiUrl()}${endpoint}`;
    const response = await fetch(url, addAuthHeader({
      ...defaultOptions,
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }));
    return handleResponse(response);
  },

  // PATCH запрос
  patch: async (endpoint, data, options = {}) => {
    const url = `${API_CONFIG.getApiUrl()}${endpoint}`;
    const response = await fetch(url, addAuthHeader({
      ...defaultOptions,
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }));
    return handleResponse(response);
  },

  // DELETE запрос
  delete: async (endpoint, options = {}) => {
    const url = `${API_CONFIG.getApiUrl()}${endpoint}`;
    const response = await fetch(url, addAuthHeader({
      ...defaultOptions,
      ...options,
      method: 'DELETE',
    }));
    return handleResponse(response);
  },

  // Получение WS URL
  getWsUrl: (endpoint) => {
    return `${API_CONFIG.getWsUrl()}${endpoint}`;
  },
};

export default apiClient; 