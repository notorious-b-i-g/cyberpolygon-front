import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CoursesPage.css';
import API from '../api'; // Импортируем единый API
import CustomAlert from '../components/CustomAlert';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await API.courses.getCourses();
        setCourses(fetchedCourses);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке курсов:', error);
        setAlert({
          show: true,
          message: 'Ошибка при загрузке курсов',
          type: 'error'
        });
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Заглушка для примера, если API еще не реализован
  const dummyCourses = [
    {
      id: 1,
      title: 'Основы кибербезопасности',
      description: 'Базовый курс по основам кибербезопасности, включающий обзор угроз, основные принципы защиты и методы противодействия.',
      level: 'Начальный',
      duration: '4 недели',
      image: '/assets/course1.jpg',
      link: '/course/1'
    },
    {
      id: 2,
      title: 'Веб-безопасность',
      description: 'Подробный курс по безопасности веб-приложений, включающий OWASP Top 10, методы защиты и практические примеры.',
      level: 'Средний',
      duration: '6 недель',
      image: '/assets/course2.jpg',
      link: '/course/2'
    },
    {
      id: 3,
      title: 'Этичный хакинг',
      description: 'Курс для изучения методов этичного хакинга, включающий пентестинг, анализ уязвимостей и методы социальной инженерии.',
      level: 'Продвинутый',
      duration: '8 недель',
      image: '/assets/course3.jpg',
      link: '/course/3'
    },
    {
      id: 4,
      title: 'Безопасность сетей',
      description: 'Курс по безопасности компьютерных сетей, включающий защиту от сетевых атак, настройку файрволов и систем обнаружения вторжений.',
      level: 'Средний',
      duration: '5 недель',
      image: '/assets/course4.jpg',
      link: '/course/4'
    },
    {
      id: 5,
      title: 'Криптография',
      description: 'Глубокий курс по криптографическим методам защиты информации, включающий симметричное и асимметричное шифрование, хеширование и PKI.',
      level: 'Продвинутый',
      duration: '7 недель',
      image: '/assets/course5.jpg',
      link: '/course/5'
    },
    {
      id: 6,
      title: 'Защита от социальной инженерии',
      description: 'Курс по противодействию методам социальной инженерии, фишингу и другим атакам, направленным на человеческий фактор.',
      level: 'Начальный',
      duration: '3 недели',
      image: '/assets/course6.jpg',
      link: '/course/6'
    }
  ];

  // Если курсы еще не загрузились из API, используем заглушку
  const displayCourses = courses.length > 0 ? courses : dummyCourses;

  return (
    <div className="courses-page">
      <CustomAlert 
        message={alert.message} 
        show={alert.show} 
        type={alert.type} 
        onClose={() => setAlert({...alert, show: false})} 
      />

      {/* Заголовок страницы */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Обучающие курсы по кибербезопасности</h1>
          <p className="lead">Изучайте кибербезопасность с нашими структурированными курсами</p>
        </div>
      </header>

      {/* Фильтры для курсов */}
      <section className="py-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <select className="form-select">
                <option selected>Все уровни</option>
                <option>Начальный</option>
                <option>Средний</option>
                <option>Продвинутый</option>
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select">
                <option selected>Все категории</option>
                <option>Веб-безопасность</option>
                <option>Сетевая безопасность</option>
                <option>Криптография</option>
                <option>Социальная инженерия</option>
              </select>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Поиск курсов..." />
                <button className="btn btn-primary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Список курсов */}
      <section className="py-5">
        <div className="container">
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p>Загрузка курсов...</p>
            </div>
          ) : (
            <div className="row">
              {displayCourses.map(course => (
                <div className="col-md-4" key={course.id}>
                  <div className="card mb-4 shadow-sm course-card">
                    <img src={course.image} className="card-img-top course-image" alt={course.title} />
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.description}</p>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className={`badge ${course.level === 'Начальный' ? 'bg-success' : course.level === 'Средний' ? 'bg-warning' : 'bg-danger'}`}>
                          {course.level}
                        </span>
                        <span className="text-muted">{course.duration}</span>
                      </div>
                      <Link to={course.link} className="btn btn-primary w-100">Начать обучение</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA-секция */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2>Не нашли нужный курс?</h2>
          <p className="lead">Напишите нам, и мы поможем подобрать программу обучения под ваши цели.</p>
          <button className="btn btn-light btn-lg">Связаться с нами</button>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage; 