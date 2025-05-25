import { useState, useCallback } from 'react';
import { useNotify } from '../contexts/NotificationContext';

/**
 * Хук для обработки API запросов с поддержкой состояния загрузки и ошибок
 * @returns {Object} Методы и состояние для обработки запросов
 */
export const useAxiosErrorHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const notify = useNotify();

  /**
   * Выполняет API запрос с обработкой ошибок и отображением уведомлений
   * @param {Function} apiCall - Функция API запроса
   * @param {Object} options - Опции для обработки запроса
   * @param {string} options.successMessage - Сообщение в случае успеха
   * @param {string} options.errorMessage - Сообщение в случае ошибки
   * @param {boolean} options.showSuccessNotify - Показывать ли уведомление об успехе
   * @param {boolean} options.showErrorNotify - Показывать ли уведомление об ошибке
   * @returns {Promise<any>} Результат API запроса
   */
  const handleApiCall = useCallback(
    async (apiCall, options = {}) => {
      const {
        successMessage = 'Операция выполнена успешно',
        errorMessage = 'Произошла ошибка при выполнении запроса',
        showSuccessNotify = false,
        showErrorNotify = true,
      } = options;

      try {
        setLoading(true);
        setError(null);
        
        const result = await apiCall();
        
        if (showSuccessNotify) {
          notify.success(successMessage);
        }
        
        return result;
      } catch (err) {
        setError(err);
        
        if (showErrorNotify) {
          // Уведомление будет показано через глобальный интерцептор
          // но можно добавить дополнительное сообщение здесь
          if (errorMessage !== 'default') {
            notify.error(errorMessage);
          }
        }
        
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [notify]
  );

  /**
   * Сбрасывает состояние ошибки
   */
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    handleApiCall,
    resetError,
  };
};

export default useAxiosErrorHandler; 