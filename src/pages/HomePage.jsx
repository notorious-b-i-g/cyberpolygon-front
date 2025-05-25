import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme, Divider, Card, Chip } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import ErrorIcon from '@mui/icons-material/Error';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BugReportIcon from '@mui/icons-material/BugReport';
import { Loader } from '../components/ui';
import { FEATURES } from '../config/env';
import { useSnackbar } from 'notistack';

const FeatureCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 46, 0.7)'
    : 'rgba(255, 255, 255, 0.8)',
  borderColor: theme.palette.mode === 'dark'
    ? 'rgba(106, 0, 255, 0.4)'
    : 'rgba(106, 0, 255, 0.3)',
  boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 4 : 2],
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 8 : 4],
    borderColor: 'rgba(106, 0, 255, 0.7)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 50,
    color: theme.palette.primary.main,
  }
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0, 10),
  textAlign: 'center',
  background: 'transparent'
}));

const GradientText = styled(Typography)(({ theme }) => ({
  backgroundImage: 'linear-gradient(45deg, #6A60FF, #FF60B9)',
  backgroundSize: '100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2)
}));

const DebugCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(36, 37, 53, 0.9)'
    : 'rgba(244, 245, 247, 0.9)',
  border: `1px dashed ${theme.palette.mode === 'dark' ? '#6a60ff70' : '#6a60ff40'}`,
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[3],
  }
}));

const HomePage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleTestError = () => {
    navigate('/error');
  };

  const showNotification = (variant) => {
    enqueueSnackbar(`Это тестовое ${variant} уведомление`, { 
      variant,
      autoHideDuration: 3000
    });
  };

  const showDebugSection = FEATURES.IS_DEV || FEATURES.USE_MOCKS;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeroSection>
        <Container>
          <GradientText variant="h1" component="h1">
            Киберполигон
          </GradientText>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 5, 
              fontWeight: 'normal', 
              color: theme => theme.palette.text.secondary,
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            Начни обучение по кибербезопасности
          </Typography>
          <Button
            component={RouterLink}
            to="/auth"
            variant="contained"
            color="primary"
            size="large"
            sx={{ py: 1.5, px: 5, borderRadius: 2, fontWeight: 'bold' }}
          >
            НАЧАТЬ ОБУЧЕНИЕ
          </Button>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={isDark ? 4 : 2}>
              <FeatureIcon>
                <SchoolIcon />
              </FeatureIcon>
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Курсы
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Погрузитесь в мир кибербезопасности через интерактивные уроки и реальные примеры
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard elevation={isDark ? 4 : 2}>
              <FeatureIcon>
                <AssignmentIcon />
              </FeatureIcon>
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Задания
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Отточите навыки на практических заданиях разной сложности
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard elevation={isDark ? 4 : 2}>
              <FeatureIcon>
                <QuizIcon />
              </FeatureIcon>
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Тесты
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Проверьте свои знания в реальном времени
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={isDark ? 4 : 2} 
              sx={{ 
                p: 4, 
                height: '100%',
                backgroundColor: theme => theme.palette.mode === 'dark' 
                  ? 'rgba(30, 30, 46, 0.7)'
                  : 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
                Преимущества платформы
              </Typography>
              <Typography variant="body1" paragraph>
                Уникальный опыт практических киберучений в изолированной среде.
              </Typography>
              <Typography variant="body1">
                Интерактивные упражнения с мгновенной обратной связью и оценкой.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={isDark ? 4 : 2} 
              sx={{ 
                p: 4, 
                height: '100%',
                backgroundColor: theme => theme.palette.mode === 'dark' 
                  ? 'rgba(30, 30, 46, 0.7)'
                  : 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
                О платформе
              </Typography>
              <Typography variant="body1" paragraph>
                Киберполигон - это образовательная платформа, созданная для получения и совершенствования знаний в области информационной безопасности.
              </Typography>
              <Typography variant="body1">
                Наша цель - сделать обучение кибербезопасности доступным, интересным и эффективным для всех.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {showDebugSection && (
        <Box sx={{ mt: 10, mb: 5, backgroundColor: isDark ? 'rgba(30, 31, 48, 0.7)' : 'rgba(245, 247, 250, 0.7)', borderTop: `1px dashed ${isDark ? '#6A60FF40' : '#6A60FF30'}`, pt: 2, pb: 6 }}>
          <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
              <BugReportIcon sx={{ mr: 1, color: 'warning.main' }} />
              <Typography variant="h4" component="h2" fontWeight="bold" sx={{ flexGrow: 1 }}>
                Отладочная зона
              </Typography>
              <Chip 
                label={FEATURES.IS_DEV ? "Режим разработки" : "Режим моков"}
                color="warning"
                variant="outlined"
                size="small"
                sx={{ borderWidth: 2 }}
              />
            </Box>
            
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <DebugCard>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <ErrorIcon sx={{ mr: 1, color: 'error.main' }} />
                    Тест ошибок
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      onClick={handleTestError}
                      variant="outlined"
                      color="error"
                      fullWidth
                      size="medium"
                      sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 }, mb: 1 }}
                    >
                      Ошибка 500
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/non-existent-page"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="medium"
                      sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                    >
                      Страница 404
                    </Button>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', pt: 2 }}>
                    Переход на тестовые страницы ошибок
                  </Typography>
                </DebugCard>
              </Grid>
              
              <Grid item xs={12} md={6} lg={3}>
                <DebugCard>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <NotificationsIcon sx={{ mr: 1, color: 'info.main' }} />
                    Тест уведомлений
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Button onClick={() => showNotification('success')} variant="outlined" color="success" sx={{ borderWidth: 1 }}>
                      Успех
                    </Button>
                    <Button onClick={() => showNotification('error')} variant="outlined" color="error" sx={{ borderWidth: 1 }}>
                      Ошибка
                    </Button>
                    <Button onClick={() => showNotification('warning')} variant="outlined" color="warning" sx={{ borderWidth: 1 }}>
                      Предупреждение
                    </Button>
                    <Button onClick={() => showNotification('info')} variant="outlined" color="info" sx={{ borderWidth: 1 }}>
                      Информация
                    </Button>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', pt: 2 }}>
                    Проверка отображения уведомлений
                  </Typography>
                </DebugCard>
              </Grid>
              
              <Grid item xs={12} md={6} lg={3}>
                <DebugCard>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    Тест Loader (spinner)
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3, mb: 2 }}>
                    <Loader variant="spinner" />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', pt: 2 }}>
                    Анимированный спиннер загрузки
                  </Typography>
                </DebugCard>
              </Grid>
              
              <Grid item xs={12} md={6} lg={3}>
                <DebugCard>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    Тест Loader (skeleton)
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, mb: 2 }}>
                    <Loader variant="skeleton" width="100%" height={24} />
                    <Loader variant="skeleton" width="80%" height={24} />
                    <Loader variant="skeleton" width="60%" height={24} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', pt: 2 }}>
                    Скелетон для индикации загрузки данных
                  </Typography>
                </DebugCard>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default HomePage; 