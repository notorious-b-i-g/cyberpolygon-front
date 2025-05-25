import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  LinearProgress,
} from '@mui/material';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'Легкий';
      case 'medium':
        return 'Средний';
      case 'hard':
        return 'Сложный';
      default:
        return difficulty;
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {task.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={getDifficultyLabel(task.difficulty)}
            color={getDifficultyColor(task.difficulty)}
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={task.category}
            variant="outlined"
            size="small"
          />
        </Box>
        {task.progress !== undefined && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Прогресс: {task.progress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={task.progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Начать
        </Button>
        {task.points && (
          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
            {task.points} очков
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default TaskCard; 