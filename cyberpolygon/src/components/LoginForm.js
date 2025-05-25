import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';
import API from '../api'; // Импортируем единый API
import CustomAlert from './CustomAlert';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      setShowAlert(true);
      return;
    }
    
    try {
      // Используем API из единого модуля
      const response = await API.auth.apiLogin(formData.username, formData.password);
      
      // Если успешно авторизовались, перенаправляем на главную страницу
      if (response) {
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Ошибка авторизации. Проверьте логин и пароль.');
      setShowAlert(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-box">
        <h2 className="text-center mb-4">Вход в систему</h2>
        
        {showAlert && (
          <CustomAlert 
            message="Вход успешно выполнен!" 
            show={showAlert} 
            type="success" 
            onClose={() => setShowAlert(false)} 
          />
        )}
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Имя пользователя</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Войти</button>
        </form>
        
        <div className="mt-3 text-center">
          <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 