import React, { forwardRef } from 'react';
import { Slide, Box } from '@mui/material';
import { NotificationContainer } from '../../theme/NotificationStyles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

/**
 * Эффект слайда для анимации появления уведомлений
 */
export const SlideTransition = forwardRef((props, ref) => {
  return <Slide ref={ref} {...props} direction="up" />;
});

/**
 * Получает иконку в зависимости от типа уведомления
 * @param {string} variant - Тип уведомления
 * @returns {React.ReactNode} Компонент иконки
 */
const getNotificationIcon = (variant) => {
  switch (variant) {
    case 'success':
      return <CheckCircleIcon fontSize="small" />;
    case 'error':
      return <ErrorIcon fontSize="small" />;
    case 'warning':
      return <WarningIcon fontSize="small" />;
    case 'info':
      return <InfoIcon fontSize="small" />;
    default:
      return null;
  }
};

/**
 * Кастомный компонент уведомления для notistack
 */
const NotificationSnack = forwardRef((props, ref) => {
  const { message, variant, ...other } = props;

  // Получаем иконку для текущего типа уведомления
  const icon = getNotificationIcon(variant);

  return (
    <NotificationContainer ref={ref} {...other} className={variant}>
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: 1,
          p: 1.5,
          bgcolor: variant === 'success' ? 'success.main' : 
                  variant === 'error' ? 'error.main' :
                  variant === 'warning' ? 'warning.main' :
                  'info.main',
          color: 'white',
        }}
      >
        {icon && (
          <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }} className="notification-icon">
            {icon}
          </Box>
        )}
        <Box sx={{ fontWeight: 500 }} className="notification-message">{message}</Box>
      </Box>
    </NotificationContainer>
  );
});

export default NotificationSnack; 