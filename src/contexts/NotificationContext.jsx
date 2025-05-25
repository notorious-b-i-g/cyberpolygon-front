import React, { createContext, useContext, useCallback } from 'react';
import { useSnackbar } from 'notistack';

/**
 * Контекст для управления уведомлениями
 */
const NotificationContext = createContext(null);

/**
 * Провайдер для системы уведомлений
 */
export const NotificationProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Показать уведомление об успехе
   * @param {string} message - Текст уведомления
   */
  const success = useCallback((message) => {
    enqueueSnackbar(message, { variant: 'success' });
  }, [enqueueSnackbar]);

  /**
   * Показать уведомление об ошибке
   * @param {string} message - Текст уведомления
   */
  const error = useCallback((message) => {
    enqueueSnackbar(message, { variant: 'error' });
  }, [enqueueSnackbar]);

  /**
   * Показать информационное уведомление
   * @param {string} message - Текст уведомления
   */
  const info = useCallback((message) => {
    enqueueSnackbar(message, { variant: 'info' });
  }, [enqueueSnackbar]);

  /**
   * Показать предупреждение
   * @param {string} message - Текст уведомления
   */
  const warning = useCallback((message) => {
    enqueueSnackbar(message, { variant: 'warning' });
  }, [enqueueSnackbar]);

  // Значение контекста
  const contextValue = {
    success,
    error,
    info,
    warning
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Хук для использования системы уведомлений
 * @returns {Object} Методы для работы с уведомлениями
 */
export const useNotify = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    // Возвращаем заглушки вместо ошибки
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {}
    };
  }
  
  return context;
};

export default NotificationContext; 