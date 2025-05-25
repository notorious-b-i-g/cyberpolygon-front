import apiClient from './apiClient';

/**
 * Получение списка доступных сред
 * @param {Object} params - Параметры запроса
 * @param {number} params.page - Номер страницы
 * @param {number} params.limit - Количество записей на странице
 * @param {string} params.taskId - ID задания (опционально)
 * @returns {Promise<Object>} Список сред
 */
export const getEnvironments = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.taskId) queryParams.append('taskId', params.taskId);
    
    const url = `/environments?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении списка сред:', error);
    throw error;
  }
};

/**
 * Получение информации о конкретной среде
 * @param {string} envId - ID среды
 * @returns {Promise<Object>} Информация о среде
 */
export const getEnvironmentById = async (envId) => {
  try {
    const response = await apiClient.get(`/environments/${envId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении информации о среде ${envId}:`, error);
    throw error;
  }
};

/**
 * Создание новой среды
 * @param {Object} envData - Данные для создания среды
 * @param {string} envData.taskId - ID задания
 * @param {string} envData.type - Тип среды
 * @param {Object} envData.configuration - Конфигурация среды
 * @returns {Promise<Object>} Созданная среда
 */
export const createEnvironment = async (envData) => {
  try {
    const response = await apiClient.post('/environments', envData);
    return response;
  } catch (error) {
    console.error('Ошибка при создании среды:', error);
    throw error;
  }
};

/**
 * Запуск виртуальной среды
 * @param {string} envId - ID среды
 * @returns {Promise<Object>} Результат операции
 */
export const startEnvironment = async (envId) => {
  try {
    const response = await apiClient.post(`/environments/${envId}/start`);
    return response;
  } catch (error) {
    console.error(`Ошибка при запуске среды ${envId}:`, error);
    throw error;
  }
};

/**
 * Остановка виртуальной среды
 * @param {string} envId - ID среды
 * @returns {Promise<Object>} Результат операции
 */
export const stopEnvironment = async (envId) => {
  try {
    const response = await apiClient.post(`/environments/${envId}/stop`);
    return response;
  } catch (error) {
    console.error(`Ошибка при остановке среды ${envId}:`, error);
    throw error;
  }
};

/**
 * Перезагрузка виртуальной среды
 * @param {string} envId - ID среды
 * @returns {Promise<Object>} Результат операции
 */
export const restartEnvironment = async (envId) => {
  try {
    const response = await apiClient.post(`/environments/${envId}/restart`);
    return response;
  } catch (error) {
    console.error(`Ошибка при перезагрузке среды ${envId}:`, error);
    throw error;
  }
};

/**
 * Удаление виртуальной среды
 * @param {string} envId - ID среды
 * @returns {Promise<Object>} Результат операции
 */
export const deleteEnvironment = async (envId) => {
  try {
    const response = await apiClient.delete(`/environments/${envId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении среды ${envId}:`, error);
    throw error;
  }
};

/**
 * Получение логов виртуальной среды
 * @param {string} envId - ID среды
 * @param {Object} params - Параметры запроса
 * @param {number} params.limit - Количество строк
 * @param {string} params.startTime - Время начала (ISO формат)
 * @returns {Promise<Object>} Логи среды
 */
export const getEnvironmentLogs = async (envId, params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.startTime) queryParams.append('startTime', params.startTime);
    
    const url = `/environments/${envId}/logs?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении логов среды ${envId}:`, error);
    throw error;
  }
};

/**
 * Выполнение команды в среде
 * @param {string} envId - ID среды
 * @param {Object} commandData - Данные команды
 * @param {string} commandData.command - Команда для выполнения
 * @returns {Promise<Object>} Результат выполнения команды
 */
export const executeCommand = async (envId, commandData) => {
  try {
    const response = await apiClient.post(`/environments/${envId}/exec`, commandData);
    return response;
  } catch (error) {
    console.error(`Ошибка при выполнении команды в среде ${envId}:`, error);
    throw error;
  }
};

/**
 * Проверка состояния виртуальной среды
 * @param {string} envId - ID среды
 * @returns {Promise<Object>} Состояние среды
 */
export const checkEnvironmentStatus = async (envId) => {
  try {
    const response = await apiClient.get(`/environments/${envId}/status`);
    return response;
  } catch (error) {
    console.error(`Ошибка при проверке состояния среды ${envId}:`, error);
    throw error;
  }
};

/**
 * Получение снимка экрана виртуальной среды
 * @param {string} envId - ID среды
 * @returns {Promise<Object>} URL снимка экрана
 */
export const getEnvironmentScreenshot = async (envId) => {
  try {
    const response = await apiClient.get(`/environments/${envId}/screenshot`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении снимка экрана среды ${envId}:`, error);
    throw error;
  }
};

/**
 * Подключение к WebSocket для мониторинга среды
 * @param {string} envId - ID среды
 * @param {function} onMessage - Обработчик сообщений
 * @param {function} onOpen - Обработчик открытия соединения
 * @param {function} onClose - Обработчик закрытия соединения
 * @param {function} onError - Обработчик ошибок
 * @returns {WebSocket} WebSocket соединение
 */
export const subscribeToEnvironmentEvents = (envId, onMessage, onOpen, onClose, onError) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('Токен авторизации не найден');
    return null;
  }
  
  const wsUrl = apiClient.getWsUrl(`/environments/${envId}/events?token=${token}`);
  const socket = new WebSocket(wsUrl);
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Ошибка при обработке сообщения:', error);
    }
  };
  
  if (onOpen) socket.onopen = onOpen;
  if (onClose) socket.onclose = onClose;
  if (onError) socket.onerror = onError;
  
  return socket;
}; 