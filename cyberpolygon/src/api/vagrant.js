import apiClient from './apiClient';

/**
 * Запуск Vagrant
 * @returns {Promise<Object>} Результат операции
 */
export const startVagrant = async () => {
  try {
    const response = await apiClient.post('/v1/vagrant/start/');
    return response;
  } catch (error) {
    console.error('Ошибка при запуске Vagrant:', error);
    throw error;
  }
};

/**
 * Остановка Vagrant
 * @returns {Promise<Object>} Результат операции
 */
export const stopVagrant = async () => {
  try {
    const response = await apiClient.post('/v1/vagrant/stop/');
    return response;
  } catch (error) {
    console.error('Ошибка при остановке Vagrant:', error);
    throw error;
  }
};

/**
 * Перезагрузка Vagrant
 * @returns {Promise<Object>} Результат операции
 */
export const reloadVagrant = async () => {
  try {
    const response = await apiClient.post('/v1/vagrant/reload/');
    return response;
  } catch (error) {
    console.error('Ошибка при перезагрузке Vagrant:', error);
    throw error;
  }
};

/**
 * Получение статуса Vagrant
 * @returns {Promise<Object>} Статус Vagrant
 */
export const getVagrantStatus = async () => {
  try {
    const response = await apiClient.get('/v1/vagrant/status/');
    return response;
  } catch (error) {
    console.error('Ошибка при получении статуса Vagrant:', error);
    throw error;
  }
}; 