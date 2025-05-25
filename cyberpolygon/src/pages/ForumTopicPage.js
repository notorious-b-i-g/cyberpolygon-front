import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import API from '../api';
import '../styles/ForumTopicPage.css';
import CustomAlert from '../components/CustomAlert';

const ForumTopicPage = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });
  const replyFormRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        setIsLoading(true);
        
        // Получаем данные темы
        const topicData = await API.forums.getTopicById(topicId);
        setTopic(topicData);
        
        // Получаем ответы на тему
        const repliesData = await API.forums.getTopicReplies(topicId);
        setReplies(repliesData);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке темы:', error);
        setAlert({
          show: true,
          message: 'Ошибка при загрузке темы',
          type: 'error'
        });
        setIsLoading(false);
      }
    };

    fetchTopicData();
  }, [topicId]);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const scrollToReplyForm = () => {
    replyFormRef.current.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('reply-textarea').focus();
    }, 500);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    if (!replyContent.trim()) {
      setAlert({
        show: true,
        message: 'Ответ не может быть пустым',
        type: 'error'
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Отправляем ответ
      const newReply = await API.forums.createReply(topicId, {
        content: replyContent,
      });
      
      // Добавляем новый ответ в список
      setReplies([...replies, newReply]);
      
      // Очищаем форму
      setReplyContent('');
      setPreviewMode(false);
      
      setAlert({
        show: true,
        message: 'Ответ успешно добавлен',
        type: 'success'
      });
      
      setIsSubmitting(false);
    } catch (error) {
      console.error('Ошибка при отправке ответа:', error);
      setAlert({
        show: true,
        message: 'Ошибка при отправке ответа',
        type: 'error'
      });
      setIsSubmitting(false);
    }
  };

  const handleBackToForum = () => {
    navigate('/forum');
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Тема не найдена или была удалена.
        </div>
        <button 
          className="btn btn-primary mt-3" 
          onClick={handleBackToForum}
        >
          Вернуться к форуму
        </button>
      </div>
    );
  }

  return (
    <div className="forum-topic-page">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button 
            className="btn btn-outline-secondary" 
            onClick={handleBackToForum}
          >
            <i className="fas fa-arrow-left me-2"></i>Вернуться к форуму
          </button>
          <button 
            className="btn btn-primary" 
            onClick={scrollToReplyForm}
          >
            Ответить
          </button>
        </div>

        {alert.show && (
          <CustomAlert 
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert({...alert, show: false})} 
          />
        )}

        <div className="forum-topic-header mb-4">
          <h1 className="topic-title">{topic.title}</h1>
          <div className="topic-meta">
            <span className="badge bg-primary me-2">{topic.category_name}</span>
            <span className="topic-author">Автор: {topic.author_name}</span>
            <span className="topic-date">Создано: {new Date(topic.created_at).toLocaleString()}</span>
          </div>
        </div>

        <div className="forum-post main-post mb-4">
          <div className="post-author">
            <div className="author-avatar">
              <img src={topic.author_avatar || '/assets/default-avatar.png'} alt={topic.author_name} />
            </div>
            <div className="author-name">{topic.author_name}</div>
            <div className="author-role badge bg-secondary">{topic.author_role || 'Пользователь'}</div>
          </div>
          <div className="post-content">
            <div className="markdown-content">
              <ReactMarkdown>{topic.content}</ReactMarkdown>
            </div>
            <div className="post-footer">
              <div className="post-date">{new Date(topic.created_at).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {replies.length > 0 && (
          <div className="forum-replies mb-4">
            <h4 className="replies-title">Ответы ({replies.length})</h4>
            
            {replies.map((reply, index) => (
              <div className="forum-post reply-post mb-3" key={reply.id}>
                <div className="post-author">
                  <div className="author-avatar">
                    <img src={reply.author_avatar || '/assets/default-avatar.png'} alt={reply.author_name} />
                  </div>
                  <div className="author-name">{reply.author_name}</div>
                  <div className="author-role badge bg-secondary">{reply.author_role || 'Пользователь'}</div>
                </div>
                <div className="post-content">
                  <div className="markdown-content">
                    <ReactMarkdown>{reply.content}</ReactMarkdown>
                  </div>
                  <div className="post-footer">
                    <div className="post-date">{new Date(reply.created_at).toLocaleString()}</div>
                    <div className="post-number">#{index + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="forum-reply-form" ref={replyFormRef}>
          <h4 className="reply-form-title">Ответить на тему</h4>
          
          <div className="reply-tabs mb-3">
            <div className="btn-group" role="group">
              <button 
                className={`btn ${!previewMode ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPreviewMode(false)}
              >
                Редактировать
              </button>
              <button 
                className={`btn ${previewMode ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPreviewMode(true)}
              >
                Предпросмотр
              </button>
            </div>
          </div>
          
          {!previewMode ? (
            <form onSubmit={handleSubmitReply}>
              <div className="mb-3">
                <textarea 
                  id="reply-textarea"
                  className="form-control" 
                  rows="6" 
                  placeholder="Введите ваш ответ... Поддерживается Markdown разметка"
                  value={replyContent}
                  onChange={handleReplyChange}
                  required
                ></textarea>
              </div>
              
              <div className="markdown-tips mb-3">
                <details>
                  <summary>Подсказки по Markdown</summary>
                  <div className="markdown-tips-content">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><code>**жирный текст**</code></td>
                          <td><strong>жирный текст</strong></td>
                        </tr>
                        <tr>
                          <td><code>*курсив*</code></td>
                          <td><em>курсив</em></td>
                        </tr>
                        <tr>
                          <td><code>[ссылка](https://example.com)</code></td>
                          <td><a href="#">ссылка</a></td>
                        </tr>
                        <tr>
                          <td><code>- список</code></td>
                          <td><ul><li>список</li></ul></td>
                        </tr>
                        <tr>
                          <td><code>```код```</code></td>
                          <td><code>код</code></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </details>
              </div>
              
              <div className="d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={togglePreviewMode}
                >
                  Предпросмотр
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Отправка...
                    </>
                  ) : 'Отправить ответ'}
                </button>
              </div>
            </form>
          ) : (
            <div className="preview-container mb-3">
              <div className="card">
                <div className="card-header">
                  Предпросмотр ответа
                </div>
                <div className="card-body markdown-preview">
                  {replyContent ? (
                    <ReactMarkdown>{replyContent}</ReactMarkdown>
                  ) : (
                    <p className="text-muted">Ничего для предпросмотра...</p>
                  )}
                </div>
              </div>
              
              <div className="d-flex justify-content-between mt-3">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={togglePreviewMode}
                >
                  Вернуться к редактированию
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  disabled={isSubmitting || !replyContent.trim()}
                  onClick={handleSubmitReply}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Отправка...
                    </>
                  ) : 'Отправить ответ'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumTopicPage; 