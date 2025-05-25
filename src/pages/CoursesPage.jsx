import React, { useState } from 'react';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Вспомогательные функции - размещаю их в начале компонента
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Начинающий':
        return 'rgba(40, 167, 69, 0.8)';
      case 'Средний':
        return 'rgba(255, 193, 7, 0.8)';
      case 'Продвинутый':
        return 'rgba(220, 53, 69, 0.8)';
      default:
        return 'rgba(106, 0, 255, 0.8)';
    }
  };

  function getLessonText(count) {
    if (count === 1) {
      return 'урок';
    } else if (count >= 2 && count <= 4) {
      return 'урока';
    } else {
      return 'уроков';
    }
  }

  // Примеры курсов
  const courses = [
    {
      id: 1,
      title: 'Основы кибербезопасности',
      description: 'Вводный курс по основам кибербезопасности. Изучение базовых концепций, терминологии и принципов защиты информации.',
      image_url: 'https://source.unsplash.com/random?cybersecurity',
      difficulty: 'Начинающий',
      tags: ['основы', 'теория', 'безопасность'],
      lessons_count: 12,
    },
    {
      id: 2,
      title: 'Веб-уязвимости',
      description: 'Подробный курс по поиску и эксплуатации уязвимостей в веб-приложениях. OWASP Top 10, XSS, CSRF, SQL-инъекции и многое другое.',
      image_url: 'https://source.unsplash.com/random?hacking',
      difficulty: 'Средний',
      tags: ['веб', 'практика', 'OWASP'],
      lessons_count: 8,
    },
    {
      id: 3,
      title: 'Криптография и шифрование',
      description: 'Изучение принципов и алгоритмов шифрования. Симметричное и асимметричное шифрование, хеширование, цифровые подписи.',
      image_url: 'https://source.unsplash.com/random?encryption',
      difficulty: 'Продвинутый',
      tags: ['криптография', 'шифрование', 'алгоритмы'],
      lessons_count: 10,
    },
    {
      id: 4,
      title: 'Сетевая безопасность',
      description: 'Защита сетевой инфраструктуры от атак. Анализ трафика, обнаружение вторжений, защита периметра, VPN, брандмауэры.',
      image_url: 'https://source.unsplash.com/random?network',
      difficulty: 'Средний',
      tags: ['сети', 'анализ', 'защита'],
      lessons_count: 9,
    },
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.5rem'
      }}>
        Доступные курсы
      </h1>
      
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto 30px',
        color: 'var(--text-gray)',
        fontSize: '1.1rem'
      }}>
        Выберите курс для изучения основ и продвинутых техник кибербезопасности.
        Все курсы содержат теоретические материалы и практические задания.
      </p>
      
      {/* Строка поиска */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Поиск курсов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 20px',
            width: '100%',
            fontSize: '0.9rem',
            borderRadius: '8px',
            border: '1px solid rgba(106, 0, 255, 0.3)',
            background: 'rgba(26, 28, 41, 0.8)',
            color: 'white',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        />
      </div>
      
      {/* Сетка курсов */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
        marginTop: '20px'
      }}>
        {filteredCourses.map(course => (
          <div key={course.id} style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: 'var(--card-shadow)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(106, 0, 255, 0.2)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }} className="card">
            {/* Изображение курса */}
            <div style={{
              height: '160px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={course.image_url}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.7)'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: getDifficultyColor(course.difficulty),
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {course.difficulty}
              </div>
            </div>
            
            {/* Содержимое карточки */}
            <div style={{ padding: '20px', flexGrow: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '10px',
                  color: 'var(--text-light)'
                }}>
                  {course.title}
                </h3>
                <span style={{
                  color: 'var(--accent-blue)',
                  fontSize: '0.9rem'
                }}>
                  {course.lessons_count} {getLessonText(course.lessons_count)}
                </span>
              </div>
              
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-gray)',
                marginBottom: '15px',
                lineHeight: '1.5'
              }}>
                {course.description.length > 120
                  ? `${course.description.substring(0, 120)}...`
                  : course.description}
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginTop: '10px'
              }}>
                {course.tags.map((tag, index) => (
                  <span key={index} style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: 'var(--text-gray)',
                    padding: '4px 8px',
                    borderRadius: '5px',
                    fontSize: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ padding: '0 20px 20px' }}>
              <button style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'var(--accent-purple)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}>
                Начать обучение
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '50px 0',
          color: 'var(--text-gray)'
        }}>
          Курсы не найдены
        </div>
      )}
    </div>
  );
};

export default CoursesPage; 