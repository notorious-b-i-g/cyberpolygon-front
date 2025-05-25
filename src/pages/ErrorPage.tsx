import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  SvgIcon,
} from '@mui/material';
import { useTheme } from '../theme/ThemeContext';

interface ErrorPageProps {
  code: string;
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

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
            bgcolor: isDarkMode ? 'background.paper' : 'background.paper',
            color: 'text.primary',
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <SvgIcon
              sx={{
                fontSize: 80,
                color: 'error.main',
                mb: 2,
              }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </SvgIcon>
          </Box>

          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: isDarkMode 
                ? 'linear-gradient(45deg, #f44336 30%, #ff9800 90%)' 
                : 'linear-gradient(45deg, #f44336 30%, #ff5722 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {code}
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
            {message}
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
              borderRadius: 1.5,
              boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.15)',
              '&:hover': {
                boxShadow: isDarkMode ? '0 6px 25px rgba(0,0,0,0.6)' : '0 6px 25px rgba(0,0,0,0.2)',
              }
            }}
          >
            На главную
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorPage; 