import React, { useState } from 'react';

const TasksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  // Примеры заданий
  const tasks = [
    {
      id: 1,
      title: 'SQL-инъекции: основы',
      description: 'Изучите основные техники SQL-инъекций и методы защиты от них. Научитесь находить и использовать уязвимости в веб-приложениях.',
      difficulty: 'Легкий',
      category: 'Web',
      points: 100,
      completed: false
    },
    {
      id: 2,
      title: 'Анализ сетевого трафика',
      description: 'Научитесь анализировать сетевой трафик с помощью Wireshark. Найдите скрытые данные и отследите активность злоумышленников.',
      difficulty: 'Средний',
      category: 'Network',
      points: 200,
      completed: true
    },
    {
      id: 3,
      title: 'Расшифровка криптографических сообщений',
      description: 'Используйте криптографические методы для расшифровки закодированных сообщений. Освойте основы криптоанализа.',
      difficulty: 'Сложный',
      category: 'Crypto',
      points: 300,
      completed: false
    },
    {
      id: 4,
      title: 'Реверс-инжиниринг простой программы',
      description: 'Проведите анализ исполняемого файла, определите его функциональность и найдите скрытую информацию.',
      difficulty: 'Средний',
      category: 'Reverse',
      points: 250,
      completed: false
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === '' || task.difficulty === difficultyFilter;
    
    return matchesSearch && matchesDifficulty;
  });

  const difficultyColors = {
    'Легкий': 'var(--accent-blue)',
    'Средний': '#ffc107',
    'Сложный': '#ff4444'
  };

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
        Задания
      </h1>
      
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto 30px',
        color: 'var(--text-gray)',
        fontSize: '1.1rem'
      }}>
        Решайте практические задания по кибербезопасности и получайте баллы.
        Развивайте навыки в безопасной среде.
      </p>
      
      {/* Фильтры */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <input
          type="text"
          placeholder="Поиск заданий..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 15px',
            fontSize: '0.9rem',
            borderRadius: '8px',
            border: '1px solid rgba(106, 0, 255, 0.3)',
            background: 'rgba(26, 28, 41, 0.8)',
            color: 'white',
            flexGrow: 1,
            fontFamily: 'JetBrains Mono, monospace'
          }}
        />
        
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          style={{
            padding: '10px 15px',
            fontSize: '0.9rem',
            borderRadius: '8px',
            border: '1px solid rgba(106, 0, 255, 0.3)',
            background: 'rgba(26, 28, 41, 0.8)',
            color: 'white',
            width: '200px',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          <option value="">Все уровни сложности</option>
          <option value="Легкий">Легкий</option>
          <option value="Средний">Средний</option>
          <option value="Сложный">Сложный</option>
        </select>
      </div>
      
      {/* Сетка заданий */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
        marginTop: '20px'
      }}>
        {filteredTasks.map(task => (
          <div key={task.id} style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: 'var(--card-shadow)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(106, 0, 255, 0.2)',
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }} className="card">
            {task.completed && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(76, 175, 80, 0.9)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                Решено
              </div>
            )}
            
            <div style={{ padding: '20px', flexGrow: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <span style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: difficultyColors[task.difficulty],
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  border: `1px solid ${difficultyColors[task.difficulty]}`
                }}>
                  {task.difficulty}
                </span>
                <span style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: 'var(--accent-blue)',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(0, 240, 255, 0.3)'
                }}>
                  {task.points} pts
                </span>
              </div>
              
              <h3 style={{
                fontSize: '1.2rem',
                marginBottom: '10px',
                color: 'var(--text-light)'
              }}>
                {task.title}
              </h3>
              
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-gray)',
                marginBottom: '15px',
                lineHeight: '1.5'
              }}>
                {task.description.length > 100
                  ? `${task.description.substring(0, 100)}...`
                  : task.description}
              </p>
              
              <span style={{
                display: 'inline-block',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'var(--text-gray)',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '0.8rem',
                marginTop: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {task.category}
              </span>
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
                {task.completed ? 'Подробнее' : 'Приступить'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage; 