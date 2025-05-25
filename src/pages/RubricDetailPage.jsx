import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
  Breadcrumbs,
  Link,
  Divider,
  Alert,
  Button
} from '@mui/material';
import rubricsApi from '../api/rubrics';
import articlesApi from '../api/articles';
import { useNotify } from '../contexts/NotificationContext';

const RubricDetailPage = () => {
  const { slug } = useParams();
  const [rubric, setRubric] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notify = useNotify();

  useEffect(() => {
    const fetchRubricAndArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Получаем информацию о рубрике по slug
        const rubricData = await rubricsApi.getRubricBySlug(slug);
        setRubric(rubricData);
        
        // Получаем статьи по данной рубрике
        const articlesData = await articlesApi.getArticlesByRubric(slug);
        setArticles(Array.isArray(articlesData) ? articlesData : []);
        
        if (!articlesData || articlesData.length === 0) {
          notify.info('В этой рубрике пока нет статей');
        }
      } catch (err) {
        console.error('Error loading rubric data:', err);
        setError('Не удалось загрузить информацию о рубрике');
        notify.error('Рубрика не найдена или произошла ошибка при загрузке');
      } finally {
        setLoading(false);
      }
    };

    fetchRubricAndArticles();
  }, [slug, notify]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Главная
          </Link>
          <Link component={RouterLink} to="/rubrics" color="inherit">
            Рубрики
          </Link>
          <Typography color="text.primary">Загрузка...</Typography>
        </Breadcrumbs>
        <Skeleton variant="text" height={60} width="70%" />
        <Skeleton variant="text" height={40} width="90%" sx={{ mb: 4 }} />
        <LinearProgress />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={80} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error || !rubric) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Главная
          </Link>
          <Link component={RouterLink} to="/rubrics" color="inherit">
            Рубрики
          </Link>
          <Typography color="text.primary">Ошибка</Typography>
        </Breadcrumbs>
        <Alert severity="error">
          {error || 'Рубрика не найдена'}
        </Alert>
        <Box sx={{ mt: 3 }}>
          <Button 
            component={RouterLink} 
            to="/rubrics" 
            variant="contained"
          >
            Вернуться к списку рубрик
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Link component={RouterLink} to="/rubrics" color="inherit">
          Рубрики
        </Link>
        <Typography color="text.primary">{rubric.title}</Typography>
      </Breadcrumbs>
      
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {rubric.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {rubric.description}
        </Typography>
        <Chip 
          label={`${articles.length} статей`}
          sx={{ mt: 2, backgroundColor: rubric.color || 'primary.main', color: 'white' }} 
        />
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Статьи в рубрике
      </Typography>
      
      {articles.length === 0 ? (
        <Alert severity="info">В этой рубрике пока нет статей</Alert>
      ) : (
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} key={article.id}>
              <Card 
                sx={{ 
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardActionArea component={RouterLink} to={`/articles/${article.id}`}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.content && article.content.length > 150 
                        ? `${article.content.substring(0, 150)}...` 
                        : article.content || 'Нет описания'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {article.created_at && new Date(article.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RubricDetailPage; 