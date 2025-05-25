import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api'; // Импортируем единый API
import CustomAlert from '../components/CustomAlert';
import Loading from '../components/Loading';
import '../styles/TaskDetailPage.css';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [isTaskStarted, setIsTaskStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [hint, setHint] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const data = await API.tasks.getTaskById(taskId);
        setTask(data);
        
        // Проверяем, начато ли уже задание
        if (data.status === 'started') {
          setIsTaskStarted(true);
          
          // Если задание уже начато, устанавливаем обратный отсчет
          if (data.endTime) {
            const endTime = new Date(data.endTime).getTime();
            const now = new Date().getTime();
            const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
            setCountdown(timeLeft);
          }
        }
      } catch (error) {
        setAlert({
          show: true,
          message: `Ошибка при загрузке задания: ${error.message}`,
          type: 'danger'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  // Обратный отсчет
  useEffect(() => {
    let timer;
    
    if (isTaskStarted && countdown !== null && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            // Время истекло, перенаправляем на страницу заданий
            navigate('/training');
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTaskStarted, countdown, navigate]);

  const handleStartTask = async () => {
    try {
      setIsLoading(true);
      const response = await API.tasks.startTask(taskId);
      
      if (response.success) {
        setIsTaskStarted(true);
        
        // Устанавливаем время окончания задания, если оно пришло с сервера
        if (response.endTime) {
          const endTime = new Date(response.endTime).getTime();
          const now = new Date().getTime();
          const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
          setCountdown(timeLeft);
        }
        
        setAlert({
          show: true,
          message: 'Задание успешно начато!',
          type: 'success'
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: `Ошибка при старте задания: ${error.message}`,
        type: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      setAlert({
        show: true,
        message: 'Введите ответ перед отправкой',
        type: 'warning'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await API.tasks.submitTaskAnswer(taskId, answer);
      
      if (response.success) {
        setAlert({
          show: true,
          message: 'Поздравляем! Ответ правильный.',
          type: 'success'
        });
        
        // Даем время пользователю увидеть сообщение об успехе
        setTimeout(() => {
          navigate('/training');
        }, 3000);
      } else {
        setAlert({
          show: true,
          message: response.message || 'Неверный ответ. Попробуйте еще раз.',
          type: 'danger'
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: `Ошибка при отправке ответа: ${error.message}`,
        type: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetHint = async () => {
    try {
      setIsHintLoading(true);
      const response = await API.tasks.getTaskHint(taskId);
      
      if (response.hint) {
        setHint(response.hint);
        setShowHint(true);
      } else {
        setAlert({
          show: true,
          message: 'Подсказка недоступна для этого задания',
          type: 'warning'
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: `Ошибка при получении подсказки: ${error.message}`,
        type: 'danger'
      });
    } finally {
      setIsHintLoading(false);
    }
  };

  // Форматирование времени
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (isLoading && !task) {
    return <Loading />;
  }

  return (
    <div className="task-detail-page">
      <CustomAlert 
        message={alert.message} 
        show={alert.show} 
        type={alert.type} 
        onClose={() => setAlert({...alert, show: false})} 
      />

      <div className="container py-5">
        {task ? (
          <>
            <div className="task-header mb-4">
              <h1>{task.title}</h1>
              <div className="d-flex align-items-center mt-3">
                <div className="me-3">
                  <span className="badge bg-info">{task.category}</span>
                </div>
                <div className="me-3">
                  <span className={`badge ${
                    task.difficulty === 'Начальная' ? 'bg-success' : 
                    task.difficulty === 'Средняя' ? 'bg-warning' : 
                    'bg-danger'
                  }`}>
                    {task.difficulty}
                  </span>
                </div>
                {isTaskStarted && countdown !== null && (
                  <div className="countdown-timer ms-auto">
                    <span className="countdown-label">Оставшееся время:</span>
                    <span className="countdown-value">{formatTime(countdown)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">Описание задания</h5>
                  </div>
                  <div className="card-body">
                    <p>{task.description}</p>

                    {task.instructions && (
                      <div className="instructions mt-4">
                        <h6>Инструкции:</h6>
                        <p>{task.instructions}</p>
                      </div>
                    )}

                    {showHint && hint && (
                      <div className="hint-box mt-4 p-3">
                        <h6>Подсказка:</h6>
                        <p>{hint}</p>
                      </div>
                    )}

                    {isTaskStarted ? (
                      <form onSubmit={handleSubmitAnswer} className="mt-4">
                        <div className="mb-3">
                          <label htmlFor="answer" className="form-label">Введите ответ:</label>
                          <textarea
                            id="answer"
                            className="form-control"
                            rows="3"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={isLoading}
                          ></textarea>
                        </div>
                        <div className="d-flex">
                          <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Отправка...' : 'Отправить ответ'}
                          </button>
                          
                          {!showHint && (
                            <button 
                              type="button" 
                              className="btn btn-outline-secondary ms-2"
                              onClick={handleGetHint}
                              disabled={isHintLoading}
                            >
                              {isHintLoading ? 'Загрузка...' : 'Получить подсказку'}
                            </button>
                          )}
                        </div>
                      </form>
                    ) : (
                      <div className="start-task-container mt-4">
                        <p className="mb-3">
                          Нажмите кнопку "Начать задание", чтобы приступить к его выполнению. 
                          {task.timeLimit && ` У вас будет ${task.timeLimit} минут на выполнение.`}
                        </p>
                        <button 
                          className="btn btn-primary"
                          onClick={handleStartTask}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Загрузка...' : 'Начать задание'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">Информация</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Категория:</span>
                        <span className="text-primary">{task.category}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Сложность:</span>
                        <span className={
                          task.difficulty === 'Начальная' ? 'text-success' : 
                          task.difficulty === 'Средняя' ? 'text-warning' : 
                          'text-danger'
                        }>{task.difficulty}</span>
                      </li>
                      {task.points && (
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Баллы:</span>
                          <span className="fw-bold">{task.points}</span>
                        </li>
                      )}
                      {task.completionRate && (
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Успешных решений:</span>
                          <span>{task.completionRate}%</span>
                        </li>
                      )}
                      {task.tags && task.tags.length > 0 && (
                        <li className="list-group-item">
                          <span className="d-block mb-2">Теги:</span>
                          <div>
                            {task.tags.map((tag, index) => (
                              <span key={index} className="badge bg-secondary me-1 mb-1">{tag}</span>
                            ))}
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {task.relatedResources && task.relatedResources.length > 0 && (
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="mb-0">Связанные ресурсы</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {task.relatedResources.map((resource, index) => (
                          <li key={index} className="list-group-item">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              {resource.title}
                            </a>
                            {resource.description && (
                              <p className="small text-muted mb-0">{resource.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p>Задание не найдено или произошла ошибка.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/training')}
            >
              Вернуться к списку заданий
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPage; 