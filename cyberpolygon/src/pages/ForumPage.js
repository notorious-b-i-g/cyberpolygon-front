import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import API from '../api';
import '../styles/ForumPage.css';
import CustomAlert from '../components/CustomAlert';

const ForumPage = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        const topicsResponse = await API.forums.getTopics();
        setTopics(topicsResponse);
        
        const categoriesResponse = await API.categories.getCategories();
        setCategories(categoriesResponse);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке тем форума:', error);
        setAlert({
          show: true,
          message: 'Ошибка при загрузке тем форума',
          type: 'error'
        });
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleCreateTopic = () => {
    navigate('/forum/create');
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const filteredTopics = activeCategory === 'all' 
    ? topics 
    : topics.filter(topic => topic.category === activeCategory);

  return (
    <div className="forum-page">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Форум</h1>
          <button 
            className="btn btn-primary" 
            onClick={handleCreateTopic}
          >
            Создать тему
          </button>
        </div>

        {alert.show && (
          <CustomAlert 
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert({...alert, show: false})} 
          />
        )}

        <div className="forum-categories mb-4">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                Все
              </button>
            </li>
            {categories.map(category => (
              <li className="nav-item" key={category.id}>
                <button 
                  className={`nav-link ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {isLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        ) : (
          <>
            {filteredTopics.length === 0 ? (
              <div className="alert alert-info">
                В этой категории пока нет тем. Вы можете создать первую!
              </div>
            ) : (
              <div className="forum-topics">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Тема</th>
                        <th>Категория</th>
                        <th>Автор</th>
                        <th>Ответов</th>
                        <th>Просмотров</th>
                        <th>Последнее сообщение</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTopics.map(topic => (
                        <tr key={topic.id} className="forum-topic-row">
                          <td>
                            <Link to={`/forum/topic/${topic.id}`} className="topic-title">
                              {topic.title}
                            </Link>
                            <div className="topic-preview">
                              <ReactMarkdown>{topic.content.substring(0, 100)}...</ReactMarkdown>
                            </div>
                          </td>
                          <td>{topic.category_name}</td>
                          <td>{topic.author_name}</td>
                          <td>{topic.replies_count}</td>
                          <td>{topic.views_count}</td>
                          <td>
                            <div>{new Date(topic.last_reply_date).toLocaleDateString()}</div>
                            <div className="text-muted small">{topic.last_reply_author}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForumPage; 