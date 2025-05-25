import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Box, 
  Paper,
  Divider
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { FEATURES } from '../config/env';
import { useSnackbar } from 'notistack';

const AuthProvidersPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // ... реализация только реальной авторизации через API ...

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{ 
            p: 5, 
            width: '100%', 
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Вход
          </Typography>
          <Stack spacing={2.5} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              onClick={() => {/* реализация через API */}}
              sx={{ 
                py: 1.5, 
                borderRadius: 1.5,
                borderWidth: 1,
                color: 'inherit',
                borderColor: 'rgba(0, 0, 0, 0.23)', 
                justifyContent: 'flex-start', 
                px: 3
              }}
            >
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                GitHub
              </Box>
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<MailOutlineIcon />}
              onClick={() => {/* реализация через API */}}
              sx={{ 
                py: 1.5, 
                borderRadius: 1.5,
                borderWidth: 1,
                color: '#F24E1E',
                borderColor: '#F24E1E', 
                justifyContent: 'flex-start', 
                px: 3,
                '&:hover': {
                  borderColor: '#F24E1E',
                  backgroundColor: 'rgba(242, 78, 30, 0.04)',
                }
              }}
            >
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                Yandex
              </Box>
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={() => {/* реализация через API */}}
              sx={{ 
                py: 1.5, 
                borderRadius: 1.5,
                borderWidth: 1,
                color: '#4285F4',
                borderColor: '#4285F4', 
                justifyContent: 'flex-start', 
                px: 3,
                '&:hover': {
                  borderColor: '#4285F4',
                  backgroundColor: 'rgba(66, 133, 244, 0.04)',
                }
              }}
            >
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                Google
              </Box>
            </Button>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            Вход означает согласие с правилами платформы
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthProvidersPage; 