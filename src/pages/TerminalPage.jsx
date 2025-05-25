import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { getTasks } from '../api/tasks';
import { TerminalWebSocket, getTerminalUrl } from '../api/terminal';
import { useNotify } from '../contexts/NotificationContext';

const TerminalPage = () => {
  const [selectedTask, setSelectedTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [output, setOutput] = useState('');
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [terminalConnected, setTerminalConnected] = useState(false);
  const socketInstanceRef = useRef(null);
  const notify = useNotify();
  
  // Загружаем список заданий при первой загрузке страницы
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
        if (tasksData.length > 0) {
          setSelectedTask(tasksData[0].id.toString());
        }
      } catch (err) {
        setError('Ошибка при загрузке заданий');
        notify.error('Не удалось загрузить список заданий');
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, [notify]);
  
  // Подключаемся к терминалу при выборе задания
  useEffect(() => {
    // Отключаемся от прошлого терминала
    if (socketInstanceRef.current) {
      socketInstanceRef.current.close();
      socketInstanceRef.current = null;
    }
    
    if (selectedTask) {
      const connectToTerminal = async () => {
        try {
          setTerminalConnected(false);
          setOutput('Подключение к терминалу...\n');
          
          // Получаем URL для WebSocket подключения
          const wsUrl = await getTerminalUrl(selectedTask);
          
          // Создаем новое подключение
          const socket = new TerminalWebSocket(
            wsUrl,
            // Обработчик сообщений
            (event) => {
              setOutput(prev => `${prev}${event.data}\n`);
            },
            // Обработчик ошибок
            (error) => {
              notify.error('Ошибка соединения с терминалом');
              setTerminalConnected(false);
              setError('Потеряно соединение с терминалом');
            },
            // Обработчик закрытия соединения
            () => {
              setTerminalConnected(false);
            },
            // Обработчик открытия соединения
            () => {
              setTerminalConnected(true);
              setError(null);
              setOutput(prev => `${prev}Соединение установлено. Можно вводить команды.\n`);
            }
          );
          
          socketInstanceRef.current = socket;
          socket.connect();
        } catch (err) {
          setError('Не удалось подключиться к терминалу');
          notify.error('Ошибка подключения к терминалу');
        }
      };
      
      connectToTerminal();
    }
    
    // Очищаем ресурсы при размонтировании компонента
    return () => {
      if (socketInstanceRef.current) {
        socketInstanceRef.current.close();
      }
    };
  }, [selectedTask, notify]);
  
  // Обработка отправки команды
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    if (socketInstanceRef.current && terminalConnected) {
      // Добавляем команду в вывод с префиксом $
      setOutput(prev => `${prev}$ ${command}\n`);
      
      // Отправляем команду на сервер
      socketInstanceRef.current.send(command);
      
      // Очищаем поле ввода
      setCommand('');
    } else {
      notify.error('Терминал не подключен');
    }
  };
  
  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Терминал
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Выберите задание и используйте терминал для практики. Все команды выполняются в изолированной среде.
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="task-select-label">Выберите задание</InputLabel>
            <Select
              labelId="task-select-label"
              value={selectedTask}
              onChange={handleTaskChange}
              label="Выберите задание"
            >
              {tasks.map((task) => (
                <MenuItem key={task.id} value={task.id.toString()}>
                  {task.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Paper 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: '#1a1a2e',
              color: '#00ff00',
              fontFamily: 'monospace',
              height: '400px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Box component="pre" sx={{ margin: 0 }}>
              {output || 'Выберите задание для начала работы с терминалом.'}
            </Box>
          </Paper>
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Введите команду..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                disabled={!terminalConnected}
                autoComplete="off"
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'monospace',
                  }
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                disabled={!terminalConnected}
                sx={{ px: 4 }}
              >
                Отправить
              </Button>
            </Box>
          </form>
        </>
      )}
    </Container>
  );
};

export default TerminalPage; 