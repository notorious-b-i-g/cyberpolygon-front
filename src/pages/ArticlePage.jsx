import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Skeleton,
  Chip,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactMarkdown from 'react-markdown';
import api from '../api';
import { useNotify } from '../contexts/NotificationContext';
import '../styles/markdown.css';

const ArticlePage = () => {
  // Получаем id из параметров URL
  const { id } = useParams();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notify = useNotify();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Преобразуем id в число, если возможно
        const articleId = !isNaN(parseInt(id)) ? parseInt(id) : id;
        const data = await api.articles.getArticleById(articleId);
        setArticle(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading article:', err);
        setError('Не удалось загрузить статью');
        notify.error('Статья не найдена или произошла ошибка при загрузке');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, notify]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Главная
          </Link>
          <Link component={RouterLink} to="/resources" color="inherit">
            Статьи
          </Link>
          <Skeleton width={100} />
        </Breadcrumbs>
        
        <Skeleton variant="text" height={60} width="80%" />
        <Skeleton variant="text" height={30} width="40%" sx={{ mb: 4 }} />
        
        <Paper 
          sx={{ 
            p: 4,
            bgcolor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(30, 30, 46, 0.7)'
              : 'rgba(255, 255, 255, 0.8)',
            boxShadow: theme.shadows[isDark ? 4 : 2],
          }}
        >
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30} width="80%" />
        </Paper>
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Главная
          </Link>
          <Link component={RouterLink} to="/resources" color="inherit">
            Статьи
          </Link>
          <Typography color="text.primary">Ошибка</Typography>
        </Breadcrumbs>
        
        <Typography color="error" variant="h5">
          {error || 'Статья не найдена'}
        </Typography>
        
        <Button 
          component={RouterLink}
          to="/resources"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3 }}
        >
          Вернуться к статьям
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Главная
        </Link>
        <Link component={RouterLink} to="/resources" color="inherit">
          Статьи
        </Link>
        <Link 
          component={RouterLink} 
          to={`/rubrics/${article.rubric_name}`} 
          color="inherit"
        >
          {article.rubric_name === 'network-security' && 'Сетевая безопасность'}
          {article.rubric_name === 'crypto' && 'Криптография'}
          {article.rubric_name === 'web-security' && 'Веб-безопасность'}
          {article.rubric_name === 'forensic' && 'Форензика'}
          {article.rubric_name === 'osint' && 'OSINT'}
          {article.rubric_name === 'WEB' && 'Web-технологии'}
          {article.rubric_name === 'Mobile' && 'Мобильная безопасность'}
          {!['network-security', 'crypto', 'web-security', 'forensic', 'osint', 'WEB', 'Mobile'].includes(article.rubric_name) && article.rubric_name}
        </Link>
        <Typography color="text.primary">
          {article.title}
        </Typography>
      </Breadcrumbs>
      
      <Button 
        component={RouterLink}
        to={`/rubrics/${article.rubric_name}`}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 4 }}
      >
        Назад к категории
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2 }}>
        {article.title}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Chip 
          label={
            article.rubric_name === 'network-security' ? 'Сетевая безопасность' :
            article.rubric_name === 'crypto' ? 'Криптография' :
            article.rubric_name === 'web-security' ? 'Веб-безопасность' :
            article.rubric_name === 'forensic' ? 'Форензика' :
            article.rubric_name === 'osint' ? 'OSINT' :
            article.rubric_name === 'WEB' ? 'Web-технологии' :
            article.rubric_name === 'Mobile' ? 'Мобильная безопасность' :
            article.rubric_name
          } 
          color="primary" 
          component={RouterLink}
          to={`/rubrics/${article.rubric_name}`}
          clickable
        />
        <Typography variant="body2" color="text.secondary">
          {new Date(article.created_at).toLocaleDateString()}
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      <Paper 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: '8px', 
          bgcolor: theme => theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 46, 0.7)'
            : 'rgba(255, 255, 255, 0.8)',
          boxShadow: theme => theme.shadows[theme.palette.mode === 'dark' ? 4 : 2]
        }}
      >
        <div className="markdown-content">
          <ReactMarkdown>
            {article.content}
          </ReactMarkdown>
        </div>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          component={RouterLink}
          to={`/rubrics/${article.rubric_name}`}
          startIcon={<ArrowBackIcon />}
        >
          Назад к категории
        </Button>
      </Box>
    </Container>
  );
};

export default ArticlePage; 