import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

const AuthPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Авторизация
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Страница авторизации в разработке
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;
