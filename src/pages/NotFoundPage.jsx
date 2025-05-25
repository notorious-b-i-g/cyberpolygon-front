import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2
            }}
          >
            404
          </Typography>

          <Typography 
            variant="h6" 
            component="h2" 
            gutterBottom
            sx={{ 
              color: 'text.secondary',
              fontWeight: 400,
              mb: 4
            }}
          >
            Страница не существует
          </Typography>

          <Button
            onClick={handleGoHome}
            variant="contained"
            color="primary"
            size="large"
            sx={{ 
              mt: 2,
              px: 4,
              py: 1.2, 
              borderRadius: 1.5
            }}
          >
            На главную
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 