import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseBySlug } from '../api/courses';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

const CoursePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseBySlug(slug);
        setCourse(data);
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке курса');
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Курс не найден</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {course.title}
      </Typography>
      
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" paragraph>
          {course.description}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {course.lessons?.map((lesson) => (
          <Grid item xs={12} key={lesson.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {lesson.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {lesson.description}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate(`/courses/${slug}/lessons/${lesson.slug}`)}
                >
                  Начать урок
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursePage; 