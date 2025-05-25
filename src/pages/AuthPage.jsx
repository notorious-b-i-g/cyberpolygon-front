import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography 
} from '@mui/material';
import { Loader } from '../components/ui';

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/auth/providers');
    }, 800);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Loader />
        <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
          Подготовка системы авторизации
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPage; 