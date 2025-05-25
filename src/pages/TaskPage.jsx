import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTaskById, submitFlag } from '../api/tasks';
import ReactMarkdown from 'react-markdown';

const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [flag, setFlag] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);
        const taskData = await getTaskById(id);
        setTask(taskData);
      } catch (err) {
        setError('Не удалось загрузить задание');
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!flag.trim()) return;
    setError(null);
    setResult(null);
    setSubmitting(true);
    try {
      const result = await submitFlag(id, flag);
      if (result.correct) {
        setResult({
          status: 'correct',
          message: 'Флаг верный! Задание выполнено.'
        });
        setTask(prev => ({
          ...prev,
          is_solved: true
        }));
      } else {
        setResult({
          status: 'error',
          message: 'Неверный флаг. Попробуйте еще раз.'
        });
      }
    } catch (err) {
      setResult({
        status: 'error',
        message: err.message || 'Не удалось отправить флаг'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Загрузка задания...</div>
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(255, 68, 68, 0.1)',
          borderRadius: '8px',
          color: '#ff4444'
        }}>
          {error}
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-gray)' }}>Задание не найдено</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      {/* Хлебные крошки */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: 'var(--text-gray)',
        fontSize: '0.9rem'
      }}>
        <Link to="/tasks" style={{ color: 'var(--text-gray)', textDecoration: 'none' }}>Задания</Link>
        <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>/</span>
        <span style={{ color: 'var(--text-light)' }}>{task.title}</span>
      </div>
      
      {/* Шапка задания */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '2.2rem',
          background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          {task.title}
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: getDifficultyColor(task.difficulty),
            padding: '8px 15px',
            borderRadius: '5px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            border: `1px solid ${getDifficultyColor(task.difficulty)}`
          }}>
            {task.difficulty}
          </div>
          
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'var(--accent-blue)',
            padding: '8px 15px',
            borderRadius: '5px',
            fontSize: '0.9rem',
            border: '1px solid rgba(0, 240, 255, 0.3)'
          }}>
            {task.category}
          </div>
          
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: '#ffc107',
            padding: '8px 15px',
            borderRadius: '5px',
            fontSize: '0.9rem',
            border: '1px solid rgba(255, 193, 7, 0.3)'
          }}>
            {task.points} pts
          </div>
          
          {task.is_solved && (
            <div style={{
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              color: '#4caf50',
              padding: '8px 15px',
              borderRadius: '5px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: '1px solid rgba(76, 175, 80, 0.3)'
            }}>
              Решено
            </div>
          )}
        </div>
      </div>
      
      {/* Описание задания */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid rgba(106, 0, 255, 0.2)',
        marginBottom: '30px'
      }}>
        <div style={{
          color: 'var(--text-light)',
          lineHeight: '1.7',
          fontSize: '1rem'
        }} className="markdown-content">
          <ReactMarkdown>
            {task.description}
          </ReactMarkdown>
        </div>
        
        {/* Медиа-файлы задания */}
        {task.media && task.media.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            {task.media.map((item, index) => {
              if (item.type.startsWith('image/')) {
                return (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <img 
                      src={`http://localhost:8000${item.url}`} 
                      alt={`Изображение ${index + 1}`}
                      style={{
                        maxWidth: '100%',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <a 
                      href={`http://localhost:8000${item.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '10px 15px',
                        backgroundColor: 'rgba(106, 0, 255, 0.1)',
                        color: 'var(--accent-purple)',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        border: '1px solid rgba(106, 0, 255, 0.3)'
                      }}
                    >
                      Скачать файл {index + 1}
                    </a>
                  </div>
                );
              }
            })}
          </div>
        )}
        
        {/* Подсказка */}
        {task.hint && (
          <div style={{
            marginTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px'
          }}>
            <button
              onClick={() => setShowHint(!showHint)}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #ffc107',
                color: '#ffc107',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="#ffc107"/>
              </svg>
              {showHint ? 'Скрыть подсказку' : 'Показать подсказку'}
            </button>
            
            {showHint && (
              <div style={{
                marginTop: '20px',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                borderRadius: '8px',
                padding: '15px 20px'
              }}>
                <div style={{
                  color: '#ffc107',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  marginBottom: '10px'
                }}>
                  Подсказка
                </div>
                
                <p style={{
                  color: 'var(--text-light)',
                  margin: 0,
                  fontSize: '0.95rem'
                }}>
                  {task.hint}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Форма отправки флага */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid rgba(106, 0, 255, 0.2)'
      }}>
        <h2 style={{
          fontSize: '1.3rem',
          marginBottom: '20px',
          color: 'var(--text-light)'
        }}>
          Отправка флага
        </h2>
        
        {result && (
          <div className={`result ${result.status}`}>
            {result.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flag-form">
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="flag"
              style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--text-light)',
                fontSize: '0.9rem'
              }}
            >
              Флаг
            </label>
            <input
              type="text"
              id="flag"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              placeholder="Введите флаг в формате CTF{...}"
              disabled={task.is_solved || submitting}
              style={{
                padding: '12px 15px',
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
          
          <button
            type="submit"
            disabled={task.is_solved || submitting || flag.trim() === ''}
            style={{
              backgroundColor: task.is_solved ? '#4caf50' : 'var(--accent-purple)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: task.is_solved ? 'not-allowed' : submitting ? 'wait' : flag.trim() === '' ? 'not-allowed' : 'pointer',
              opacity: task.is_solved || flag.trim() === '' ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.95rem'
            }}
          >
            {task.is_solved ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                </svg>
                Задание решено
              </>
            ) : submitting ? (
              'Отправка...'
            ) : (
              'Отправить флаг'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Вспомогательные функции
const getDifficultyColor = (difficulty) => {
  switch(difficulty.toLowerCase()) {
    case 'easy':
    case 'легкий':
      return '#4caf50';
    case 'medium':
    case 'средний':
      return '#ffc107';
    case 'hard':
    case 'сложный':
      return '#ff4444';
    default:
      return 'var(--accent-blue)';
  }
};

export default TaskPage; 