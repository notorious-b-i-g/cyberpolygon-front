import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
// Восстанавливаем импорт стилей
import '../styles/TrainingPage.css';
import API from '../api'; // Импортируем единый API

const TrainingPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });

  // Заглушка для примера, если API еще не реализован
  const dummyTasks = [
    {
      id: 1,
      title: 'Взлом веб-приложения',
      description: 'Проведите тестирование веб-приложения на наличие уязвимостей и научитесь их устранять.',
      category: 'Web-безопасность',
      difficulty: 'Средняя',
      link: '/task/1'
    },
    {
      id: 2,
      title: 'Анализ сетевого трафика',
      description: 'Проанализируйте сетевой трафик и найдите подозрительные активности, которые могут указывать на атаку.',
      category: 'Сетевая безопасность',
      difficulty: 'Сложная',
      link: '/task/2'
    },
    {
      id: 3,
      title: 'Защита от DDoS атак',
      description: 'Разработайте стратегию, а также защитите определенную систему от распределенной атаки отказа в обслуживании этой системы (DDoS).',
      category: 'Инфраструктурная безопасность',
      difficulty: 'Сложная',
      link: '/task/3'
    },
    {
      id: 4,
      title: 'Расследование инцидентов',
      description: 'Проведите расследование инцидента безопасности на основе предоставленных логов и доказательств.',
      category: 'Форензика',
      difficulty: 'Средняя',
      link: '/task/4'
    },
    {
      id: 5,
      title: 'Безопасная конфигурация',
      description: 'Создайте безопасную конфигурацию для веб-сервера и защитите его от основных типов атак.',
      category: 'Системное администрирование',
      difficulty: 'Начальная',
      link: '/task/5'
    },
    {
      id: 6,
      title: 'Обнаружение вредоносного ПО',
      description: 'Найдите и проанализируйте вредоносное ПО в предоставленной системе.',
      category: 'Анализ вредоносного ПО',
      difficulty: 'Сложная',
      link: '/task/6'
    }
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        // Используем API из импортированного модуля
        const response = await API.tasks.getTasks();
        
        // Если API вернуло данные, используем их, иначе - заглушку
        if (response && Array.isArray(response)) {
          setTasks(response);
        } else {
          setTasks(dummyTasks);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при получении заданий:', error);
        setAlert({
          show: true,
          message: 'Ошибка при загрузке заданий. Используем демо-данные.',
          type: 'error'
        });
        setTasks(dummyTasks);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [dummyTasks]);

  // Если задачи еще не загрузились из API, используем заглушку
  const displayTasks = tasks.length > 0 ? tasks : dummyTasks;

  return (
    <div className="training-page">
      <CustomAlert 
        message={alert.message} 
        show={alert.show} 
        type={alert.type} 
        onClose={() => setAlert({...alert, show: false})} 
      />

      {/* Заголовок страницы */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Задания по Кибербезопасности</h1>
          <p className="lead">Выберите задание, чтобы улучшить свои навыки!</p>
        </div>
      </header>

      {/* Раздел с заданиями */}
      <section className="py-5">
        <div className="container">
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p>Загрузка заданий...</p>
            </div>
          ) : (
            <div className="row">
              {displayTasks.map(task => (
                <div className="col-md-4" key={task.id}>
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <p className="card-text">{task.description}</p>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-info">{task.category}</span>
                        <span className={`badge ${task.difficulty === 'Начальная' ? 'bg-success' : task.difficulty === 'Средняя' ? 'bg-warning' : 'bg-danger'}`}>
                          {task.difficulty}
                        </span>
                      </div>
                      <Link to={task.link} className="btn btn-primary">Начать задание</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Раздел "Как это работает" */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Как это работает?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="fa fa-search fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title">Выберите задание</h3>
                  <p className="card-text">Просмотрите доступные задания и выберите то, которое соответствует вашим интересам и уровню подготовки.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="fa fa-code fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title">Решите задачу</h3>
                  <p className="card-text">Используйте свои знания и навыки для решения практических задач в изолированной среде.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="fa fa-certificate fa-3x text-primary"></i>
                  </div>
                  <h3 className="card-title">Получите результаты</h3>
                  <p className="card-text">Получите мгновенную обратную связь, узнайте правильные подходы и заработайте баллы за успешные решения.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingPage; 