import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Grid, 
  Skeleton,
  Alert,
  TextField,
  InputAdornment,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import { getTests } from '../api/tests';
import { useAuth } from '../hooks/useAuth';
import { useNotify } from '../contexts/NotificationContext';

const TestCard = ({ test, completedTests }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isCompleted = completedTests && completedTests.includes(test.id);
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '8px',
        bgcolor: theme => theme.palette.mode === 'dark' 
          ? 'rgba(30, 30, 46, 0.7)'
          : 'rgba(255, 255, 255, 0.8)',
        boxShadow: theme => theme.shadows[isDark ? 4 : 2],
        borderColor: theme => theme.palette.mode === 'dark'
          ? 'rgba(106, 0, 255, 0.4)'
          : 'rgba(106, 0, 255, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme => theme.shadows[isDark ? 8 : 4],
          borderColor: 'rgba(106, 0, 255, 0.7)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {test.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Количество вопросов: {test.questions_count || 'Не указано'}
        </Typography>
        <Typography variant="body2">
          {test.description || 'Описание отсутствует'}
        </Typography>
        {isCompleted && (
          <Box sx={{ mt: 2 }}>
            <Alert 
              severity="success" 
              icon={false} 
              sx={{ 
                py: 0,
                bgcolor: theme => theme.palette.mode === 'dark' 
                  ? 'rgba(46, 125, 50, 0.2)'
                  : 'rgba(237, 247, 237, 0.9)'
              }}
            >
              Пройден
            </Alert>
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button 
          component={RouterLink} 
          to={`/tests/${test.id}`} 
          variant="contained" 
          fullWidth
          disabled={isCompleted}
        >
          {isCompleted ? 'Пройден' : 'Начать тест'}
        </Button>
      </CardActions>
    </Card>
  );
};

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const notify = useNotify();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsData = await getTests();
        setTests(testsData);
      } catch (err) {
        setError('Не удалось загрузить тесты');
        notify.error('Ошибка при загрузке тестов');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTests();
  }, [notify]);
  
  const filteredTests = tests.filter(test => 
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (test.description && test.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
        <Card sx={{ 
          height: '100%',
          bgcolor: theme => theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 46, 0.7)'
            : 'rgba(255, 255, 255, 0.8)',
          boxShadow: theme => theme.shadows[isDark ? 4 : 2]
        }}>
          <CardContent>
            <Skeleton variant="text" height={40} width="80%" />
            <Skeleton variant="text" height={20} width="40%" />
            <Skeleton variant="rectangular" height={100} />
          </CardContent>
          <CardActions>
            <Skeleton variant="rectangular" height={36} width="100%" />
          </CardActions>
        </Card>
      </Grid>
    ));
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 1 }}>
        Тесты
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Проверьте свои знания с помощью наших тестов по кибербезопасности.
      </Typography>
      
      {!loading && !error && (
        <TextField
          fullWidth
          placeholder="Поиск тестов"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      
      {loading ? (
        <Grid container spacing={3}>
          {renderSkeletons()}
        </Grid>
      ) : error ? (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2,
            bgcolor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(211, 47, 47, 0.2)'
              : 'rgba(253, 237, 237, 0.9)'
          }}
        >
          {error}
        </Alert>
      ) : filteredTests.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTests.map(test => (
            <Grid item xs={12} sm={6} md={4} key={test.id}>
              <TestCard 
                test={test} 
                completedTests={user?.completed_tests || []}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert 
          severity="info" 
          sx={{ 
            mt: 2,
            bgcolor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(2, 136, 209, 0.2)'
              : 'rgba(229, 246, 253, 0.9)'
          }}
        >
          {searchTerm 
            ? 'По вашему запросу не найдено тестов' 
            : 'Тесты скоро появятся'}
        </Alert>
      )}
    </Container>
  );
};

export default TestsPage; 