import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { RootState } from '../store';
import { fetchCourses } from '../store/slices/coursesSlice';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state: RootState) => state.courses);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <Typography>Загрузка...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Ошибка: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Обучающие курсы
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Изучайте кибербезопасность с помощью структурированных курсов
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск курсов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={course.imageUrl}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={course.level}
                    color={course.level === 'Начальный' ? 'success' : course.level === 'Средний' ? 'warning' : 'error'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`${course.duration} часов`}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  Начать обучение
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCourses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Курсы не найдены
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CoursesPage; 