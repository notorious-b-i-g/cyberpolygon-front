import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Skeleton,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import rubricsApi from '../api/rubrics';
import { useNotify } from '../contexts/NotificationContext';

const RubricsPage = () => {
  const [rubrics, setRubrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notify = useNotify();

  useEffect(() => {
    const fetchRubrics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await rubricsApi.getRubrics();
        setRubrics(Array.isArray(data) ? data : []);
        
        if (!data || data.length === 0) {
          notify.info('Рубрики не найдены');
        }
      } catch (err) {
        console.error('Error loading rubrics:', err);
        setError('Не удалось загрузить рубрики');
        notify.error('Произошла ошибка при загрузке рубрик');
      } finally {
        setLoading(false);
      }
    };

    fetchRubrics();
  }, [notify]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Рубрики
        </Typography>
        <LinearProgress />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={80} />
                  <Skeleton variant="rectangular" height={30} sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Рубрики
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (rubrics.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Рубрики
        </Typography>
        <Alert severity="info">Рубрики не найдены</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Рубрики
      </Typography>
      
      <Grid container spacing={3}>
        {rubrics.map((rubric) => (
          <Grid item xs={12} md={4} key={rubric.id || rubric.name}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <CardActionArea 
                component={RouterLink} 
                to={`/rubrics/${rubric.name}`}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch'
                }}
              >
                <Box 
                  sx={{ 
                    height: 8, 
                    backgroundColor: rubric.color || '#6a00ff' 
                  }} 
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {rubric.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {rubric.description || 'Нет описания'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={`${rubric.articles_count || 0} статей`} 
                      size="small" 
                      sx={{ backgroundColor: 'rgba(106, 0, 255, 0.1)' }}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RubricsPage; 