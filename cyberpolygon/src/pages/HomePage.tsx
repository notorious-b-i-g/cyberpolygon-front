import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
} from '@mui/material';
import {
  Security as SecurityIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Практические задания',
    description: 'Реальные сценарии кибератак и защиты, которые помогут развить навыки обнаружения и противодействия угрозам.',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Обучающие курсы',
    description: 'Структурированные курсы по различным аспектам кибербезопасности, разработанные экспертами отрасли.',
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    title: 'Соревнования',
    description: 'Регулярные CTF-соревнования и задачи для проверки и совершенствования навыков в конкурентной среде.',
  },
];

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          borderRadius: 2,
          color: 'white',
          mb: 8,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Киберполигон
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Платформа для обучения и тестирования навыков кибербезопасности
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/tasks')}
            sx={{ mr: 2 }}
          >
            Начать тренировку
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => navigate('/courses')}
          >
            Изучить курсы
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
        Что предлагает Киберполигон?
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CTA Section */}
      <Box
        sx={{
          mt: 8,
          py: 6,
          textAlign: 'center',
          backgroundColor: 'primary.main',
          borderRadius: 2,
          color: 'white',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Готовы начать?
        </Typography>
        <Typography variant="h6" gutterBottom>
          Присоединяйтесь к сообществу специалистов по кибербезопасности уже сегодня!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate('/register')}
          sx={{ mt: 2 }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage; 