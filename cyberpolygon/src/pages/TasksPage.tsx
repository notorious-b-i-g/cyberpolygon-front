import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { RootState } from '../store';
import { fetchTasks } from '../store/slices/tasksSlice';
import TaskCard from '../components/TaskCard';

const TasksPage: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || task.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = Array.from(new Set(tasks.map(task => task.category)));
  const difficulties = ['easy', 'medium', 'hard'];

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
          Практические задания
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Выберите задание для практики навыков кибербезопасности
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Поиск заданий..."
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
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Сложность</InputLabel>
            <Select
              value={difficultyFilter}
              label="Сложность"
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {difficulties.map((diff) => (
                <MenuItem key={diff} value={diff}>
                  {diff === 'easy' ? 'Легкий' : diff === 'medium' ? 'Средний' : 'Сложный'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              value={categoryFilter}
              label="Категория"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>

      {filteredTasks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Задания не найдены
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default TasksPage; 