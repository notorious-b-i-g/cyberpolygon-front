import apiClient from './apiClient';

/**
 * Получение списка уведомлений для текущего пользователя
 * @param {Object} params - Параметры запроса
 * @param {number} params.page - Номер страницы
 * @param {number} params.limit - Количество записей на странице
 * @param {boolean} params.unreadOnly - Только непрочитанные
 * @returns {Promise<Object>} Список уведомлений и метаданные
 */
export const getUserNotifications = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.unreadOnly) queryParams.append('unreadOnly', params.unreadOnly);
    
    const url = `/notifications?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Ошибка при получении уведомлений:', error);
    throw error;
  }
};

/**
 * Получение количества непрочитанных уведомлений
 * @returns {Promise<Object>} Количество непрочитанных уведомлений
 */
export const getUnreadNotificationsCount = async () => {
  try {
    const response = await apiClient.get('/notifications/unread/count');
    return response;
  } catch (error) {
    console.error('Ошибка при получении количества непрочитанных уведомлений:', error);
    throw error;
  }
};

/**
 * Получение уведомления по ID
 * @param {string} notificationId - ID уведомления
 * @returns {Promise<Object>} Данные уведомления
 */
export const getNotificationById = async (notificationId) => {
  try {
    const response = await apiClient.get(`/notifications/${notificationId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при получении уведомления ${notificationId}:`, error);
    throw error;
  }
};

/**
 * Пометить уведомление как прочитанное
 * @param {string} notificationId - ID уведомления
 * @returns {Promise<Object>} Результат операции
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await apiClient.put(`/notifications/${notificationId}/read`);
    return response;
  } catch (error) {
    console.error(`Ошибка при отметке уведомления ${notificationId} как прочитанного:`, error);
    throw error;
  }
};

/**
 * Пометить все уведомления как прочитанные
 * @returns {Promise<Object>} Результат операции
 */
export const markAllNotificationsAsRead = async () => {
  try {
    const response = await apiClient.put('/notifications/read-all');
    return response;
  } catch (error) {
    console.error('Ошибка при отметке всех уведомлений как прочитанных:', error);
    throw error;
  }
};

/**
 * Удаление уведомления
 * @param {string} notificationId - ID уведомления
 * @returns {Promise<Object>} Результат операции
 */
export const deleteNotification = async (notificationId) => {
  try {
    const response = await apiClient.delete(`/notifications/${notificationId}`);
    return response;
  } catch (error) {
    console.error(`Ошибка при удалении уведомления ${notificationId}:`, error);
    throw error;
  }
};

/**
 * Подписка на веб-сокет для получения уведомлений в реальном времени
 * @param {function} onMessage - Функция обработки сообщения
 * @param {function} onOpen - Функция вызываемая при открытии соединения
 * @param {function} onError - Функция обработки ошибок
 * @param {function} onClose - Функция вызываемая при закрытии соединения
 * @returns {WebSocket} WebSocket соединение
 */
export const subscribeToNotifications = (onMessage, onOpen, onError, onClose) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('Токен авторизации не найден');
    return null;
  }
  
  const wsUrl = apiClient.getWsUrl(`/notifications?token=${token}`);
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
  if (onError) socket.onerror = onError;
  if (onClose) socket.onclose = onClose;
  
  return socket;
}; 