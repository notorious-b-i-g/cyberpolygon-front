import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Box, Typography, CircularProgress, Alert } from '@mui/material';
import authApi from '../api/auth';
import { useNotify } from '../contexts/NotificationContext';
import { setUser } from '../redux/userSlice';
import { oauthCallback } from '../features/auth/authSlice';

const AuthCallbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const notify = useNotify();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const stateParam = urlParams.get('state');
        
        let provider;
        try {
          if (stateParam) {
            const stateObj = JSON.parse(stateParam);
            provider = stateObj.provider;
          }
        } catch (e) {}

        if (!code || !provider) {
          throw new Error('Отсутствуют необходимые параметры в URL');
        }

        // Используем thunk для авторизации
        const resultAction = await dispatch(oauthCallback({ code, provider }));
        
        if (oauthCallback.fulfilled.match(resultAction)) {
          notify.success(`Вы успешно вошли через ${provider}`);
          
          // Получим данные пользователя
          try {
            const userData = await authApi.getCurrentUser();
            if (userData) {
              dispatch(setUser(userData));
            }
          } catch (userError) {}
          
          navigate('/dashboard');
        } else {
          throw new Error(resultAction.error?.message || 'Ошибка при авторизации');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err.response?.data?.detail || err.message || 'Ошибка при авторизации');
        setLoading(false);
        // Redirect to login page after a delay
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleCallback();
  }, [dispatch, location, navigate, notify]);

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }} variant="body1">
            Завершаем авторизацию...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
          <Typography variant="body1">
            Перенаправление на страницу входа...
          </Typography>
        </Box>
      </Container>
    );
  }

  return null;
};

export default AuthCallbackPage; 