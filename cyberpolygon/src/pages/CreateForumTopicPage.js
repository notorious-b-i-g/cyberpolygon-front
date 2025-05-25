import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import API from '../api';
import '../styles/CreateForumTopicPage.css';
import CustomAlert from '../components/CustomAlert';

const CreateForumTopicPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await API.categories.getCategories();
        setCategories(categoriesData);
        
        if (categoriesData.length > 0) {
          setFormData(prev => ({
            ...prev,
            category: categoriesData[0].id
          }));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        setAlert({
          show: true,
          message: 'Ошибка при загрузке категорий',
          type: 'error'
        });
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      setAlert({
        show: true,
        message: 'Заполните все поля формы',
        type: 'error'
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newTopic = await API.forums.createTopic({
        title: formData.title,
        category: formData.category,
        content: formData.content
      });
      
      setIsSubmitting(false);
      
      // Переходим на страницу созданной темы
      navigate(`/forum/topic/${newTopic.id}`);
      
    } catch (error) {
      console.error('Ошибка при создании темы:', error);
      setAlert({
        show: true,
        message: 'Ошибка при создании темы',
        type: 'error'
      });
      setIsSubmitting(false);
    }
  };

  const handleBackToForum = () => {
    navigate('/forum');
  };

  return (
    <div className="create-forum-topic-page">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Создание новой темы</h1>
          <button 
            className="btn btn-outline-secondary" 
            onClick={handleBackToForum}
          >
            <i className="fas fa-arrow-left me-2"></i>Вернуться к форуму
          </button>
        </div>

        {alert.show && (
          <CustomAlert 
            message={alert.message} 
            type={alert.type} 
            onClose={() => setAlert({...alert, show: false})} 
          />
        )}

        {isLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <div className="topic-form-tabs mb-4">
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
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Заголовок темы</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="title" 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Введите заголовок темы"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Категория</label>
                    <select 
                      className="form-select" 
                      id="category" 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">Содержание</label>
                    <textarea 
                      className="form-control" 
                      id="content" 
                      name="content"
                      rows="10" 
                      placeholder="Введите содержание темы... Поддерживается Markdown разметка"
                      value={formData.content}
                      onChange={handleInputChange}
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
                          Создание...
                        </>
                      ) : 'Создать тему'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="preview-container">
                  <div className="card">
                    <div className="card-header">
                      <h5>{formData.title || 'Заголовок темы'}</h5>
                      <div className="small">
                        Категория: {categories.find(c => c.id === formData.category)?.name || 'Не выбрана'}
                      </div>
                    </div>
                    <div className="card-body markdown-preview">
                      {formData.content ? (
                        <ReactMarkdown>{formData.content}</ReactMarkdown>
                      ) : (
                        <p className="text-muted">Содержание темы будет отображено здесь...</p>
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
                      disabled={isSubmitting || !formData.title.trim() || !formData.content.trim() || !formData.category}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Создание...
                        </>
                      ) : 'Создать тему'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateForumTopicPage; 