import { styled } from '@mui/material/styles';

/**
 * Стили для уведомлений
 */
export const NotificationContainer = styled('div')(({ theme, variant }) => ({
  '&.success .MuiSnackbarContent-root': {
    backgroundColor: theme.palette.success.main,
  },
  '&.error .MuiSnackbarContent-root': {
    backgroundColor: theme.palette.error.main,
  },
  '&.warning .MuiSnackbarContent-root': {
    backgroundColor: theme.palette.warning.main,
  },
  '&.info .MuiSnackbarContent-root': {
    backgroundColor: theme.palette.info.main,
  },
  '& .notification-icon': {
    marginRight: theme.spacing(1),
  },
  '& .notification-message': {
    display: 'flex',
    alignItems: 'center',
  },
}));

/**
 * Конфигурация для SnackbarProvider
 */
export const notistackConfig = {
  // Максимальное количество одновременных уведомлений
  maxSnack: 5,
  
  // Позиционирование уведомлений
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  
  // Продолжительность показа уведомлений
  autoHideDuration: 4000,
  
  // Опции анимации
  TransitionProps: {
    direction: 'up',
  },

  // Предотвращает дублирование уведомлений с одинаковым текстом
  preventDuplicate: true,
}; 