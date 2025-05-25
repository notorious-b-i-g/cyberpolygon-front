import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.css';
import API from '../api'; // Импортируем единый API
import CustomAlert from './CustomAlert';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await API.auth.apiRegister(
          formData.username,
          formData.email,
          formData.password
        );
        setShowAlert(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setErrors({
          submit: error.message || 'Ошибка при регистрации. Пожалуйста, попробуйте снова.'
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-box">
        <h2 className="text-center mb-4">Регистрация</h2>
        
        {showAlert && (
          <CustomAlert 
            message="Регистрация успешна! Перенаправление на страницу входа..." 
            show={showAlert} 
            type="success" 
            onClose={() => setShowAlert(false)} 
          />
        )}
        
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Имя пользователя</label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Зарегистрироваться</button>
        </form>
        
        <div className="mt-3 text-center">
          <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 