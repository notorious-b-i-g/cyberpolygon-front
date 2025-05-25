import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Grid, Typography, Box, Card, CardContent, 
  CardActionArea, Chip, Button,
  Divider, Paper, Skeleton,
  Container, Breadcrumbs, Link, useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link as RouterLink } from 'react-router-dom';
import api from '../api';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Если есть slug в параметрах URL, то мы на странице рубрики
  const isRubricPage = !!slug;

  // Запрос на получение рубрики, если мы на странице рубрики
  const { 
    data: currentRubric,
    isLoading: rubricLoading,
    error: rubricError
  } = useQuery(
    ['rubric', slug],
    () => api.rubrics.getRubricBySlug(slug),
    {
      enabled: isRubricPage,
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching rubric:', error);
      },
      onSuccess: (data) => {
        if (!data) {
          // Рубрика не найдена, переадресуем на страницу ресурсов
          navigate('/resources', { replace: true });
        }
      }
    }
  );

  // Запрос на получение статей рубрики, если мы на странице рубрики
  const {
    data: rubricArticles,
    isLoading: articlesLoading,
    error: articlesError
  } = useQuery(
    ['articles', slug],
    () => api.articles.getArticlesByRubric(slug),
    {
      enabled: isRubricPage,
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching rubric articles:', error);
      }
    }
  );

  // Запрос на получение рубрик, если мы на главной странице статей
  const { 
    data: rubrics, 
    isLoading: rubricsLoading, 
    error: rubricsError 
  } = useQuery(
    ['rubrics'], 
    () => api.rubrics.getRubrics(), 
    {
      enabled: !isRubricPage,
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching rubrics:', error);
      },
      staleTime: 5 * 60 * 1000,
    }
  );

  const handleRubricClick = (rubricSlug) => {
    navigate(`/rubrics/${rubricSlug}`);
  };

  const handleArticleClick = (article) => {
    // Всегда используем числовой ID для API
    navigate(`/articles/${article.id}`);
  };

  const renderError = (error) => (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        bgcolor: 'error.light', 
        color: 'error.contrastText',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
    >
      <ErrorOutlineIcon color="error" />
      <Box>
        <Typography variant="h6" gutterBottom>Ошибка загрузки данных</Typography>
        <Typography variant="body2">
          {error?.message || 'Пожалуйста, попробуйте обновить страницу'}
        </Typography>
      </Box>
    </Paper>
  );

  const renderRubricSkeleton = () => (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" height={20} width="100%" />
              <Skeleton variant="text" height={20} width="60%" />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="rectangular" height={32} width={120} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderArticleSkeleton = () => (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card sx={{ height: '100%' }}>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Skeleton variant="rectangular" height={24} width={60} />
                <Skeleton variant="rectangular" height={24} width={80} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Рендеринг страницы со списком рубрик
  const renderRubricsList = () => (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <MenuBookIcon fontSize="large" color="primary" /> Статьи
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          Статьи по кибербезопасности
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* Ошибки */}
      {rubricsError && renderError(rubricsError)}

      {/* Загрузка */}
      {rubricsLoading && !rubricsError && renderRubricSkeleton()}

      {/* Список рубрик */}
      {!rubricsLoading && !rubricsError && (
        <Grid container spacing={3}>
          {rubrics && rubrics.length > 0 ? (
            rubrics.map((rubric) => (
              <Grid item xs={12} sm={6} md={4} key={rubric.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  bgcolor: theme => theme.palette.mode === 'dark' 
                    ? 'rgba(30, 30, 46, 0.7)'
                    : 'rgba(255, 255, 255, 0.8)',
                  borderColor: theme => theme.palette.mode === 'dark' 
                    ? 'rgba(106, 0, 255, 0.4)'
                    : 'rgba(106, 0, 255, 0.2)',
                  boxShadow: theme => theme.shadows[theme.palette.mode === 'dark' ? 4 : 2],
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme => theme.shadows[theme.palette.mode === 'dark' ? 8 : 4],
                    borderColor: 'rgba(106, 0, 255, 0.7)'
                  }
                }}>
                  <CardActionArea 
                    onClick={() => handleRubricClick(rubric.slug)}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                        {rubric.title || rubric.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {rubric.description || 'Нет описания'}
                      </Typography>
                      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label={`${rubric.article_count || 0} статей`} 
                          color="primary" 
                          size="small"
                          sx={{ borderRadius: '4px' }}
                        />
                        <Button 
                          variant="outlined" 
                          size="small" 
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRubricClick(rubric.slug);
                          }}
                        >
                          Перейти
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ py: 6, width: '100%', textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Статьи не найдены
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Статьи скоро появятся
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );

  // Рендеринг страницы со статьями конкретной рубрики
  const renderRubricArticles = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Хлебные крошки */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Typography color="text.primary">Статьи</Typography>
      </Breadcrumbs>

      {/* Кнопка назад */}
      <Button 
        component={RouterLink}
        to="/resources"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4 }}
      >
        Назад к статьям
      </Button>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <MenuBookIcon fontSize="large" color="primary" /> 
          {rubricLoading ? <Skeleton width={200} /> : (currentRubric?.title || currentRubric?.name || 'Статьи категории')}
        </Typography>
        {!rubricLoading && currentRubric?.description && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {currentRubric.description}
          </Typography>
        )}
        <Divider sx={{ mt: 2 }} />
      </Box>

      {/* Ошибки */}
      {(rubricError || articlesError) && renderError(rubricError || articlesError)}

      {/* Загрузка */}
      {(rubricLoading || articlesLoading) && !rubricError && !articlesError && renderArticleSkeleton()}

      {/* Список статей */}
      {!rubricLoading && !articlesLoading && !rubricError && !articlesError && (
        <Grid container spacing={3}>
          {rubricArticles && rubricArticles.length > 0 ? (
            rubricArticles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  bgcolor: theme => theme.palette.mode === 'dark' 
                    ? 'rgba(30, 30, 46, 0.7)'
                    : 'rgba(255, 255, 255, 0.8)',
                  borderColor: theme => theme.palette.mode === 'dark' 
                    ? 'rgba(106, 0, 255, 0.4)'
                    : 'rgba(106, 0, 255, 0.2)',
                  boxShadow: theme => theme.shadows[theme.palette.mode === 'dark' ? 4 : 2],
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme => theme.shadows[theme.palette.mode === 'dark' ? 8 : 4],
                    borderColor: 'rgba(106, 0, 255, 0.7)'
                  }
                }}>
                  <CardActionArea 
                    onClick={() => handleArticleClick(article)}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    {article.image && (
                      <Box 
                        sx={{ 
                          pt: '56.25%', 
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          component="img"
                          src={article.image}
                          alt={article.title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {article.excerpt || 'Нет описания'}
                      </Typography>
                      <Box sx={{ 
                        mt: 'auto', 
                        display: 'flex', 
                        gap: 1,
                        flexWrap: 'wrap'
                      }}>
                        {article.tags && article.tags.map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              borderRadius: '4px',
                              backgroundColor: theme => theme.palette.mode === 'dark' 
                                ? 'rgba(106, 0, 255, 0.2)' 
                                : 'rgba(106, 0, 255, 0.1)',
                              color: 'text.primary'
                            }} 
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ py: 6, width: '100%', textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Статьи не найдены
              </Typography>
              <Typography variant="body2" color="text.secondary">
                В данной рубрике пока нет статей
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );

  return isRubricPage ? renderRubricArticles() : renderRubricsList();
};

export default ResourcesPage; 